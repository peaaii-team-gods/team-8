/** Structured flatten mapping. Model output is data; fixed code applies it. */

export const MRF_MAPPING_VERSION = "mrf.mapping.v1" as const;

export const MRF_FIELD_TARGETS = [
  "billing_code",
  "description",
  "payer_name",
  "billing_class",
  "negotiated_type",
  "rate",
] as const;

export type MrfFieldTarget = (typeof MRF_FIELD_TARGETS)[number];

export interface MrfNullFill {
  fill_from: string;
  by: string;
}

export interface MrfMapping {
  schema_version: typeof MRF_MAPPING_VERSION;
  collection: string;
  rate_groups: string;
  prices: string;
  fields: Record<MrfFieldTarget, string>;
  standard_charge_lookup: string;
  null_policy: { rate: MrfNullFill };
  dedupe_key: string[];
}

export interface WarehouseRow {
  billing_code: string;
  description: string;
  payer_name: string;
  billing_class: string;
  negotiated_type: string;
  negotiated_rate: number | null;
}

export interface ApplyResult {
  rows: WarehouseRow[];
  flattened: WarehouseRow[];
  flattened_row_count: number;
  nulls_repaired: number;
  inserted_row_count: number;
}

export interface NamedCheck {
  name: string;
  pass: boolean;
  expected: string | number;
  actual: string | number;
  evidence: Record<string, unknown>;
}
