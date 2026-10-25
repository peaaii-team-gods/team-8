import { expect, it } from "vitest";
import { applyHospitalMapping } from "./hospital";
import { digest } from "./sha256";
// @ts-ignore -- test-only Node builtins
import { readFileSync } from "node:fs";
const load = (name: string) => JSON.parse(readFileSync(`../fixtures/${name}`, "utf8"));

it("matches the Python hospital golden including joined gross/cash", () => {
  const result = applyHospitalMapping(load("hospital-v3-slice.json"), load("hospital-golden-mapping.json"));
  const golden = load("hospital-golden-result.json");
  for (const [key, value] of Object.entries(golden.counts)) expect(result[key as keyof typeof result]).toBe(value);
  expect(digest(result.rows)).toBe(golden.digest);
  expect(result.rows.every(r => r.gross_charge !== null && r.discounted_cash !== null)).toBe(true);
});

it("quarantines bad codes and counts no-dollar payers without using gross as a rate", () => {
  const mapping = load("hospital-golden-mapping.json");
  const item = {description: "test", code_information: [{type: "HCPCS", code: "12345"}],
    standard_charges: [{billing_class: "facility", payers_information: [{payer_name: "A", plan_name: "B", standard_charge_dollar: 12}, {standard_charge_algorithm: "x"}]}]};
  const gross = {...item, standard_charges: [{gross_charge: 30, discounted_cash: 20}]};
  const bad = {...item, code_information: [{type: "HCPCS", code: "A1234"}]};
  const result = applyHospitalMapping({standard_charge_information: [item, bad, gross]}, mapping);
  expect(result.quarantined_row_count).toBe(1);
  expect(result.skipped_no_dollar_count).toBe(1);
  expect(result.rows).toEqual([{billing_code: "12345", description: "test", payer_name: "A", plan_name: "B",
    billing_class: "facility", negotiated_rate: 12, gross_charge: 30, discounted_cash: 20}]);
});
