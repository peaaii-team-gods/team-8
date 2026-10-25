import { parseMapping } from "./apply";
import { MRF_FIELD_TARGETS, MRF_MAPPING_VERSION, type MrfMapping } from "./types";

const MAPPING_KEYS = [
  "schema_version", "collection", "rate_groups", "prices", "fields",
  "standard_charge_lookup", "null_policy", "dedupe_key",
] as const;

export type InvalidKind = "invalid_json" | "invalid_proposal";

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;

export function parseModelJson(text: string | undefined): { ok: true; value: unknown } | { ok: false; error: "invalid_json" } {
  if (typeof text !== "string") return { ok: false, error: "invalid_json" };
  const trimmed = text.trim();
  if (!trimmed || trimmed.length > 8192) return { ok: false, error: "invalid_json" };
  try {
    return { ok: true, value: JSON.parse(trimmed) };
  } catch {
    return { ok: false, error: "invalid_json" };
  }
}

function extraKeys(rec: Record<string, unknown>, allowed: readonly string[]): string[] {
  return Object.keys(rec).filter((k) => !allowed.includes(k));
}

export function validateMappingValue(value: unknown): { ok: true; mapping: MrfMapping } | { ok: false; error: string } {
  const rec = asRecord(value);
  if (!rec) return { ok: false, error: "mapping must be an object" };
  if (extraKeys(rec, MAPPING_KEYS).length) return { ok: false, error: "mapping has extra keys" };
  const fields = asRecord(rec.fields);
  if (!fields || extraKeys(fields, MRF_FIELD_TARGETS).length) return { ok: false, error: "mapping.fields has extra keys" };
  try {
    return { ok: true, mapping: parseMapping(value) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "invalid_mapping" };
  }
}

export type RepairDecision =
  | { action: "replace_mapping"; mapping: MrfMapping }
  | { action: "fail"; reason_code: "unsupported_schema" | "insufficient_evidence" };

export function validateRepairValue(value: unknown): { ok: true; repair: RepairDecision } | { ok: false; error: string } {
  const rec = asRecord(value);
  if (!rec) return { ok: false, error: "repair must be an object" };
  if (rec.action === "fail") {
    if (extraKeys(rec, ["action", "reason_code"]).length) return { ok: false, error: "repair has extra keys" };
    if (rec.reason_code !== "unsupported_schema" && rec.reason_code !== "insufficient_evidence") {
      return { ok: false, error: "invalid reason_code" };
    }
    return { ok: true, repair: { action: "fail", reason_code: rec.reason_code } };
  }
  if (rec.action !== "replace_mapping") return { ok: false, error: "invalid repair action" };
  if (extraKeys(rec, ["action", "mapping"]).length) return { ok: false, error: "repair has extra keys" };
  const mapping = validateMappingValue(rec.mapping);
  if (!mapping.ok) return mapping;
  return { ok: true, repair: { action: "replace_mapping", mapping: mapping.mapping } };
}

export function interpretMrfReply(presetId: string, output: string | undefined):
  | { ok: true; mapping: MrfMapping; declined?: undefined }
  | { ok: true; mapping: null; declined: RepairDecision }
  | { ok: false; error: InvalidKind; detail: string } {
  const parsed = parseModelJson(output);
  if (!parsed.ok) return { ok: false, error: "invalid_json", detail: "Reply was not one JSON object." };
  if (presetId === "mrf-builder") {
    const mapping = validateMappingValue(parsed.value);
    if (!mapping.ok) return { ok: false, error: "invalid_proposal", detail: mapping.error };
    return { ok: true, mapping: mapping.mapping };
  }
  if (presetId === "mrf-maintainer") {
    const repair = validateRepairValue(parsed.value);
    if (!repair.ok) return { ok: false, error: "invalid_proposal", detail: repair.error };
    if (repair.repair.action === "fail") return { ok: true, mapping: null, declined: repair.repair };
    return { ok: true, mapping: repair.repair.mapping };
  }
  return { ok: false, error: "invalid_proposal", detail: "not an MRF agent" };
}

export const isMrfPreset = (presetId: string | undefined) =>
  presetId === "mrf-builder" || presetId === "mrf-maintainer";
