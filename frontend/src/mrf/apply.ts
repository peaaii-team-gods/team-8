import { MRF_FIELD_TARGETS, MRF_MAPPING_VERSION, type ApplyResult, type MrfMapping, type WarehouseRow } from "./types";

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;

const asArray = (value: unknown): unknown[] => Array.isArray(value) ? value : [];

const readString = (obj: Record<string, unknown> | null, key: string): string => {
  const v = obj?.[key];
  return typeof v === "string" ? v : "";
};

const readRate = (obj: Record<string, unknown> | null, key: string): { present: boolean; value: number | null } => {
  if (!obj || !(key in obj)) return { present: false, value: null };
  const v = obj[key];
  if (v === null) return { present: true, value: null };
  if (typeof v === "number" && Number.isFinite(v)) return { present: true, value: v };
  return { present: true, value: null };
};

/** Parse a mapping object. Invalid shapes throw; callers should schema-validate first. */
export function parseMapping(value: unknown): MrfMapping {
  const rec = asRecord(value);
  if (!rec) throw new Error("mapping must be an object");
  const fields = asRecord(rec.fields);
  if (!fields) throw new Error("mapping.fields must be an object");
  const nullPolicy = asRecord(rec.null_policy);
  const ratePolicy = asRecord(nullPolicy?.rate);
  if (!ratePolicy || typeof ratePolicy.fill_from !== "string" || typeof ratePolicy.by !== "string") {
    throw new Error("mapping.null_policy.rate must name fill_from and by");
  }
  if (rec.schema_version !== MRF_MAPPING_VERSION) throw new Error("unsupported mapping schema_version");
  if (typeof rec.collection !== "string" || typeof rec.rate_groups !== "string" || typeof rec.prices !== "string") {
    throw new Error("mapping collection paths must be strings");
  }
  if (typeof rec.standard_charge_lookup !== "string") throw new Error("mapping.standard_charge_lookup must be a string");
  if (!Array.isArray(rec.dedupe_key) || rec.dedupe_key.some((k) => typeof k !== "string") || rec.dedupe_key.length === 0) {
    throw new Error("mapping.dedupe_key must be a non-empty string array");
  }
  const mapped = {} as MrfMapping["fields"];
  for (const target of MRF_FIELD_TARGETS) {
    const src = fields[target];
    if (typeof src !== "string" || !src) throw new Error(`mapping.fields.${target} must be a string`);
    mapped[target] = src;
  }
  return {
    schema_version: MRF_MAPPING_VERSION,
    collection: rec.collection,
    rate_groups: rec.rate_groups,
    prices: rec.prices,
    fields: mapped,
    standard_charge_lookup: rec.standard_charge_lookup,
    null_policy: { rate: { fill_from: ratePolicy.fill_from, by: ratePolicy.by } },
    dedupe_key: rec.dedupe_key as string[],
  };
}

/**
 * Apply a structured mapping to a nested MRF excerpt.
 * Fixed code only — the mapping is data, never executed.
 */
export function applyMapping(fixture: unknown, mappingInput: unknown): ApplyResult {
  const mapping = parseMapping(mappingInput);
  const doc = asRecord(fixture);
  if (!doc) throw new Error("fixture must be an object");
  const lookup = asRecord(doc[mapping.standard_charge_lookup]) ?? {};
  const flattened: WarehouseRow[] = [];
  let nullsRepaired = 0;

  for (const item of asArray(doc[mapping.collection])) {
    const rec = asRecord(item);
    const billingCode = readString(rec, mapping.fields.billing_code);
    const description = readString(rec, mapping.fields.description);
    for (const group of asArray(rec?.[mapping.rate_groups])) {
      const groupRec = asRecord(group);
      const payer = readString(groupRec, mapping.fields.payer_name);
      for (const price of asArray(groupRec?.[mapping.prices])) {
        const priceRec = asRecord(price);
        const rateRead = readRate(priceRec, mapping.fields.rate);
        let rate = rateRead.value;
        if (rate === null) {
          const fillKey = billingCode;
          const fill = lookup[fillKey];
          if (typeof fill === "number" && Number.isFinite(fill)) {
            rate = fill;
            nullsRepaired += 1;
          }
        }
        flattened.push({
          billing_code: billingCode,
          description,
          payer_name: payer,
          billing_class: readString(priceRec, mapping.fields.billing_class),
          negotiated_type: readString(priceRec, mapping.fields.negotiated_type),
          negotiated_rate: rate,
        });
      }
    }
  }

  const seen = new Set<string>();
  const rows: WarehouseRow[] = [];
  for (const row of flattened) {
    const key = mapping.dedupe_key.map((k) => String((row as unknown as Record<string, unknown>)[k] ?? "")).join("\0");
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push(row);
  }

  return {
    rows,
    flattened,
    flattened_row_count: flattened.length,
    nulls_repaired: nullsRepaired,
    inserted_row_count: rows.length,
  };
}
