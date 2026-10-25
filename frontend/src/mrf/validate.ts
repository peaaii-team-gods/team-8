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

const JSON_TYPE_NAMES = new Set(["string", "number", "boolean", "object", "array", "null", "integer"]);
const WRONG_COLLECTION = new Set([
  "hospital_name", "last_updated_on", "note", "top_level_keys", "price_object_keys",
  "standard_charge_codes", "sample_item", "key_path_example",
]);

function isSampleValue(value: string): boolean {
  return JSON_TYPE_NAMES.has(value) || /^\d+(\.\d+)?$/.test(value) || /\s/.test(value);
}

/** Names the first mapping field that holds a sample value or the hospital name instead of a source key path. */
export function namedKeyPathError(mapping: MrfMapping): string | null {
  const hits: string[] = [];
  const check = (path: string, value: string) => {
    if (isSampleValue(value) || (path === "collection" && WRONG_COLLECTION.has(value))) {
      hits.push(`${path} uses ${JSON.stringify(value)}`);
    }
  };
  check("collection", mapping.collection);
  check("rate_groups", mapping.rate_groups);
  check("prices", mapping.prices);
  check("standard_charge_lookup", mapping.standard_charge_lookup);
  check("null_policy.rate.fill_from", mapping.null_policy.rate.fill_from);
  check("null_policy.rate.by", mapping.null_policy.rate.by);
  for (const target of MRF_FIELD_TARGETS) check(`fields.${target}`, mapping.fields[target]);
  mapping.dedupe_key.forEach((key, i) => check(`dedupe_key[${i}]`, key));
  if (!hits.length) return null;
  return `${hits[0]}; that field needs a source key path (in_network, negotiated_rates, negotiated_prices, negotiated_rate, collection/rate_groups), not a sample value.`;
}

export function validateMappingValue(value: unknown): { ok: true; mapping: MrfMapping } | { ok: false; error: string } {
  const rec = asRecord(value);
  if (!rec) return { ok: false, error: "mapping must be an object" };
  if (extraKeys(rec, MAPPING_KEYS).length) return { ok: false, error: "mapping has extra keys" };
  const fields = asRecord(rec.fields);
  if (!fields || extraKeys(fields, MRF_FIELD_TARGETS).length) return { ok: false, error: "mapping.fields has extra keys" };
  try {
    const mapping = parseMapping(value);
    const named = namedKeyPathError(mapping);
    if (named) return { ok: false, error: named };
    return { ok: true, mapping };
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
