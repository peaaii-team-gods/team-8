import { parseMapping } from "./apply";
import { MRF_FIELD_TARGETS, type MrfMapping } from "./types";
import { LAKE_FIXTURES } from "../fixtures/lakes";

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

/** Source scopes come from the supplied synthetic excerpts, including the injected drift. */
const excerpts = ["hospital-mrf", "hospital-mrf-drift"]
  .flatMap((id) => LAKE_FIXTURES[id]).map(asRecord).filter((r) => r !== null);
const items = excerpts.map((excerpt) => asRecord(excerpt.sample_item)).filter((r) => r !== null);
const arrayChildren = (records: Record<string, unknown>[]) => records.flatMap((record) =>
  Object.values(record).filter(Array.isArray).flat().map(asRecord).filter((r) => r !== null));
const groups = arrayChildren(items);
const prices = arrayChildren(groups);
const keys = (records: Record<string, unknown>[], arrays = false): string[] =>
  [...new Set(records.flatMap((record) => Object.keys(record)
    .filter((key) => arrays ? Array.isArray(record[key]) : !Array.isArray(record[key]))))];
const topKeys = [...new Set(excerpts.flatMap((excerpt) => excerpt.top_level_keys as string[]))];
const outputKeys = ["billing_code", "description", "payer_name", "billing_class", "negotiated_type", "negotiated_rate"];

/** Name every mapping path absent from its actual source scope; excerpt labels are not source keys. */
export function namedKeyPathError(mapping: MrfMapping): string | null {
  const hits: string[] = [];
  const check = (path: string, value: string, allowed: readonly string[]) => {
    if (!allowed.includes(value)) {
      hits.push(`${path} uses ${JSON.stringify(value)}; expected a source key path from ${allowed.join(", ")}`);
    }
  };
  check("collection", mapping.collection, topKeys.filter((key) => !["hospital_name", "last_updated_on"].includes(key)));
  check("rate_groups", mapping.rate_groups, keys(items, true));
  check("prices", mapping.prices, keys(groups, true));
  check("standard_charge_lookup", mapping.standard_charge_lookup, topKeys);
  check("null_policy.rate.fill_from", mapping.null_policy.rate.fill_from, topKeys);
  check("null_policy.rate.by", mapping.null_policy.rate.by, keys(items));
  for (const target of MRF_FIELD_TARGETS) {
    const scope = target === "billing_code" || target === "description" ? items : target === "payer_name" ? groups : prices;
    check(`fields.${target}`, mapping.fields[target], keys(scope));
  }
  mapping.dedupe_key.forEach((key, i) => check(`dedupe_key[${i}]`, key, outputKeys));
  if (!["payer_name", "billing_class"].every((key) => mapping.dedupe_key.includes(key))) {
    hits.push("dedupe_key must include payer_name and billing_class (payer and billing_class)");
  }
  return hits.length ? hits.join("; ") : null;
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
