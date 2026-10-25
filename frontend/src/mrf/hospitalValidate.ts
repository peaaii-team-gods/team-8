import { parseHospitalMapping, type HospitalMapping } from "./hospital";

const rec = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const children = (records: Record<string, unknown>[], key: string): Record<string, unknown>[] =>
  records.flatMap(record => Array.isArray(record[key]) ? record[key] as unknown[] : []).map(rec);
const keys = (records: Record<string, unknown>[], arrays = false) => [...new Set(records.flatMap(record =>
  Object.keys(record).filter(key => arrays ? Array.isArray(record[key]) : !Array.isArray(record[key]))))];
const mappingKeys = ["schema_version", "collection", "code_selector", "charge_list", "payer_list", "fields", "gross_key", "cash_key"];
const selectorKeys = ["list", "type_field", "code_field", "accept_types", "pattern"];
const fieldKeys = ["description", "payer_name", "plan_name", "billing_class", "rate"];

/** Validate source paths against the selected slice, never against model-supplied labels. */
export function validateHospitalMappingValue(value: unknown, fixture: unknown):
  { ok: true; mapping: HospitalMapping } | { ok: false; error: string } {
  const input = rec(value), errors: string[] = [];
  for (const [path, object, allowed] of [["mapping", input, mappingKeys],
    ["code_selector", rec(input.code_selector), selectorKeys], ["fields", rec(input.fields), fieldKeys]] as const) {
    for (const key of Object.keys(object)) if (!allowed.includes(key)) errors.push(`${path}.${key} is not allowed`);
  }
  try {
    const mapping = parseHospitalMapping(value), selector = mapping.code_selector;
    const root = [rec(fixture)], items = children(root, mapping.collection);
    const codes = children(items, selector.list), charges = children(items, mapping.charge_list);
    const payers = children(charges, mapping.payer_list);
    const check = (path: string, source: string, allowed: string[]) => {
      if (!allowed.includes(source)) errors.push(`${path} uses ${JSON.stringify(source)}; expected a source key from ${allowed.join(", ") || "the selected slice"}`);
    };
    check("collection", mapping.collection, keys(root, true));
    check("code_selector.list", selector.list, keys(items, true));
    check("code_selector.type_field", selector.type_field, keys(codes));
    check("code_selector.code_field", selector.code_field, keys(codes));
    check("charge_list", mapping.charge_list, keys(items, true));
    check("payer_list", mapping.payer_list, keys(charges, true));
    check("gross_key", mapping.gross_key, keys(charges));
    check("cash_key", mapping.cash_key, keys(charges));
    for (const target of fieldKeys as (keyof HospitalMapping["fields"])[]) {
      const scope = target === "description" ? items : target === "billing_class" ? charges : payers;
      check(`fields.${target}`, mapping.fields[target], keys(scope));
    }
    return errors.length ? { ok: false, error: errors.join("; ") } : { ok: true, mapping };
  } catch (error) {
    return { ok: false, error: [...errors, error instanceof Error ? error.message : "invalid_mapping"].join("; ") };
  }
}

export type HospitalRepair = { action: "replace_mapping"; mapping: HospitalMapping }
  | { action: "fail"; reason_code: "unsupported_schema" | "insufficient_evidence" };

export function validateHospitalRepairValue(value: unknown, fixture: unknown):
  { ok: true; repair: HospitalRepair } | { ok: false; error: string } {
  const input = rec(value);
  if (input.action === "fail") {
    if (Object.keys(input).some(key => !["action", "reason_code"].includes(key))) return { ok: false, error: "repair has extra keys" };
    if (input.reason_code !== "unsupported_schema" && input.reason_code !== "insufficient_evidence") return { ok: false, error: "invalid reason_code" };
    return { ok: true, repair: { action: "fail", reason_code: input.reason_code } };
  }
  if (input.action !== "replace_mapping") return { ok: false, error: "invalid repair action" };
  if (Object.keys(input).some(key => !["action", "mapping"].includes(key))) return { ok: false, error: "repair has extra keys" };
  const validated = validateHospitalMappingValue(input.mapping, fixture);
  return validated.ok ? { ok: true, repair: { action: "replace_mapping", mapping: validated.mapping } } : validated;
}
