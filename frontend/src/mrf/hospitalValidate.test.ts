import { describe, expect, it } from "vitest";
import { applyHospitalMapping } from "./hospital";
import { injectHospitalRateDrift } from "./hospitalDrift";
import { validateHospitalMappingValue, validateHospitalRepairValue } from "./hospitalValidate";
import { digest } from "./sha256";
import { agentPreset } from "../registry/agentPresets";
import { defaultSchema } from "../registry/schemas";
// @ts-ignore -- test-only Node builtins
import { readFileSync } from "node:fs";
const load = (name: string) => JSON.parse(readFileSync(`../fixtures/${name}`, "utf8"));
const mapping = load("hospital-golden-mapping.json");
const slice = load("hospital-v3-slice.json");
const golden = load("hospital-golden-result.json");

describe("hospital Builder validation and injected drift", () => {
  it("accepts the golden hospital mapping and preserves the pinned result", () => {
    expect(validateHospitalMappingValue(mapping, slice).ok).toBe(true);
    expect(digest(applyHospitalMapping(slice, mapping).rows)).toBe(golden.digest);
  });

  it("names fields.rate when injected drift removes the mapped dollar key", () => {
    const before = JSON.stringify(slice);
    const drift = injectHospitalRateDrift(slice);
    expect(drift.injected_drift).toMatch(/^injected:/);
    expect(JSON.stringify(slice)).toBe(before);
    expect(injectHospitalRateDrift(slice)).toEqual(drift);
    expect(drift).toEqual(load("hospital-v3-slice-drift.json"));
    expect(JSON.stringify(drift)).not.toContain('"standard_charge_dollar":');
    expect(JSON.stringify(drift)).toContain('"standard_charge_amount":');
    const result = validateHospitalMappingValue(mapping, drift);
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected the named drift check to fail");
    expect(result.error).toContain("fields.rate");
    expect(result.error).toContain("standard_charge_dollar");
  });

  it("accepts the golden one-field repair and restores pinned counts and digest", () => {
    const drift = injectHospitalRateDrift(slice);
    const repair = load("hospital-golden-repair.json");
    expect(validateHospitalMappingValue(repair, drift).ok).toBe(true);
    const applied = applyHospitalMapping(drift, repair);
    for (const [key, value] of Object.entries(golden.counts)) expect(applied[key as keyof typeof applied]).toBe(value);
    expect(digest(applied.rows)).toBe(golden.digest);
    expect(validateHospitalMappingValue(repair, slice).ok).toBe(false);
  });

  it.each([
    ["collection", { collection: "note" }],
    ["code_selector.list", { code_selector: { ...mapping.code_selector, list: "note" } }],
    ["code_selector.type_field", { code_selector: { ...mapping.code_selector, type_field: "HCPCS" } }],
    ["code_selector.code_field", { code_selector: { ...mapping.code_selector, code_field: "99213" } }],
    ["charge_list", { charge_list: "note" }],
    ["payer_list", { payer_list: "note" }],
    ["gross_key", { gross_key: "note" }],
    ["cash_key", { cash_key: "note" }],
  ])("rejects wrong source path %s with a named hint", (name, patch) => {
    const result = validateHospitalMappingValue({ ...mapping, ...patch }, slice);
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected named error");
    expect(result.error).toContain(name);
  });

  it.each(["description", "payer_name", "plan_name", "billing_class", "rate"])("names fields.%s", (target) => {
    const result = validateHospitalMappingValue({ ...mapping, fields: { ...mapping.fields, [target]: "note" } }, slice);
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected named error");
    expect(result.error).toContain(`fields.${target}`);
  });

  it.each(["mrf-hospital-builder", "mrf-hospital-maintainer"])("gives %s a v3 contract and named validator hint", (id) => {
    const prompt = agentPreset(id)?.rolePrompt;
    expect(prompt).toContain("Wrong:");
    expect(prompt).toContain("Right:");
    expect(prompt).toContain("fields.rate");
    expect(prompt).toContain("standard_charge_dollar");
    expect(prompt).toContain("standard_charge_information");
    expect(prompt).toContain("injected");
    expect(defaultSchema(id).id).toBe(id.endsWith("builder") ? "mrf.mapping.v2-hospital" : "mrf.repair.v2-hospital");
  });

  it("validates actual Maintainer decisions against the selected drifted slice", () => {
    const drift = injectHospitalRateDrift(slice);
    const repair = load("hospital-golden-repair.json");
    expect(validateHospitalRepairValue({ action: "replace_mapping", mapping: repair }, drift))
      .toEqual({ ok: true, repair: { action: "replace_mapping", mapping: repair } });
    expect(validateHospitalRepairValue({ action: "replace_mapping", mapping }, drift))
      .toMatchObject({ ok: false, error: expect.stringContaining("fields.rate") });
    expect(validateHospitalRepairValue({ action: "fail", reason_code: "insufficient_evidence" }, drift))
      .toEqual({ ok: true, repair: { action: "fail", reason_code: "insufficient_evidence" } });
    expect(validateHospitalRepairValue({ action: "fail", reason_code: "invented" }, drift).ok).toBe(false);
    expect(validateHospitalRepairValue({ action: "replace_mapping", mapping: repair, extra: 1 }, drift).ok).toBe(false);
  });

  it("rejects undocumented mapping fields, malformed paths, and an empty source", () => {
    expect(validateHospitalMappingValue({ ...mapping, fields: { ...mapping.fields, extra: "description" } }, slice))
      .toMatchObject({ ok: false, error: expect.stringContaining("fields.extra") });
    expect(validateHospitalMappingValue({ ...mapping, collection: [] }, slice).ok).toBe(false);
    expect(validateHospitalMappingValue(mapping, {}).ok).toBe(false);
  });
});
