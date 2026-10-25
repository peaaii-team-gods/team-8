/** Hospital v3 mapping interpreter. Mapping paths are data, never expressions. */
export interface HospitalMapping {
  schema_version: "mrf.mapping.v2-hospital";
  collection: string;
  code_selector: {list: string; type_field: string; code_field: string; accept_types: ["HCPCS"]; pattern: "^\\d{5}$"};
  charge_list: string;
  payer_list: string;
  fields: Record<"description" | "payer_name" | "plan_name" | "billing_class" | "rate", string>;
  gross_key: string;
  cash_key: string;
}
export interface HospitalRow {
  billing_code: string; description: string; payer_name: string; plan_name: string; billing_class: string;
  negotiated_rate: number; gross_charge: number | null; discounted_cash: number | null;
}
const rec = (v: unknown): Record<string, unknown> => v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : {};
const arr = (v: unknown): unknown[] => Array.isArray(v) ? v : [];
const str = (v: unknown): string => typeof v === "string" ? v : "";
const num = (v: unknown): number | null => typeof v === "number" && Number.isFinite(v) ? v : null;

export function parseHospitalMapping(value: unknown): HospitalMapping {
  const m = rec(value), selector = rec(m.code_selector), fields = rec(m.fields);
  if (m.schema_version !== "mrf.mapping.v2-hospital") throw new Error("unsupported mapping schema_version");
  for (const [obj, keys] of [[m, ["collection", "charge_list", "payer_list", "gross_key", "cash_key"]],
    [selector, ["list", "type_field", "code_field"]], [fields, ["description", "payer_name", "plan_name", "billing_class", "rate"]]] as const) {
    if (keys.some(k => typeof obj[k] !== "string" || !obj[k])) throw new Error("mapping paths must be non-empty strings");
  }
  if (JSON.stringify(selector.accept_types) !== '["HCPCS"]' || selector.pattern !== "^\\d{5}$") {
    throw new Error("code_selector requires HCPCS and five-digit codes");
  }
  return value as HospitalMapping;
}

export function applyHospitalMapping(fixture: unknown, mappingInput: unknown) {
  const m = parseHospitalMapping(mappingInput), s = m.code_selector, f = m.fields;
  if (!fixture || typeof fixture !== "object" || Array.isArray(fixture)) throw new Error("fixture must be an object");
  const selected: [string, Record<string, unknown>][] = [], quarantined: {item_index: number; reason: string}[] = [];
  const joined = new Map<string, {gross_charge: number | null; discounted_cash: number | null}>();
  arr(rec(fixture)[m.collection]).forEach((item, index) => {
    const i = rec(item);
    const codes = [...new Set(arr(i[s.list]).map(rec).filter(c => s.accept_types.includes(str(c[s.type_field]) as "HCPCS")
      && /^[0-9]{5}$/.test(str(c[s.code_field]))).map(c => str(c[s.code_field])))];
    if (!codes.length) quarantined.push({item_index: index, reason: "bad_code"});
    for (const code of codes) {
      selected.push([code, i]);
      const values = joined.get(code) ?? {gross_charge: null, discounted_cash: null};
      for (const charge of arr(i[m.charge_list]).map(rec)) {
        for (const [target, key] of [["gross_charge", m.gross_key], ["discounted_cash", m.cash_key]] as const) {
          const value = num(charge[key]);
          if (value !== null) {
            if (values[target] !== null && values[target] !== value) throw new Error(`conflicting ${target} for code ${code}`);
            values[target] = value;
          }
        }
      }
      joined.set(code, values);
    }
  });
  const rows: HospitalRow[] = [];
  let skipped = 0;
  for (const [code, item] of selected) {
    for (const charge of arr(item[m.charge_list]).map(rec)) {
      for (const payer of arr(charge[m.payer_list]).map(rec)) {
        const rate = num(payer[f.rate]);
        if (rate === null) { skipped++; continue; }
        rows.push({billing_code: code, description: str(item[f.description]), payer_name: str(payer[f.payer_name]),
          plan_name: str(payer[f.plan_name]), billing_class: str(charge[f.billing_class]), negotiated_rate: rate, ...joined.get(code)!});
      }
    }
  }
  return {rows, flattened: rows, flattened_row_count: rows.length, inserted_row_count: rows.length, nulls_repaired: 0,
    skipped_no_dollar_count: skipped, quarantined_row_count: quarantined.length, quarantined};
}
