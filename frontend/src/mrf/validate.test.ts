import { describe, expect, it } from "vitest";
import { MRF_GOLDEN_MAPPING, MRF_GOLDEN_REPAIR, MRF_GOLDEN_REPAIR_REPLY } from "./data";
import { interpretMrfReply, parseModelJson, validateMappingValue, validateRepairValue } from "./validate";

describe("MRF proposal validation", () => {
  it("accepts the golden mapping and repair objects", () => {
    expect(validateMappingValue(MRF_GOLDEN_MAPPING).ok).toBe(true);
    expect(validateRepairValue(MRF_GOLDEN_REPAIR_REPLY).ok).toBe(true);
  });

  it("rejects extra keys, markdown, and truncated JSON", () => {
    expect(parseModelJson("```json\n{}\n```").ok).toBe(false);
    expect(parseModelJson("{").ok).toBe(false);
    expect(validateMappingValue({ ...MRF_GOLDEN_MAPPING, extra: true }).ok).toBe(false);
    expect(validateRepairValue({ action: "replace_mapping", mapping: MRF_GOLDEN_MAPPING, extra: 1 }).ok).toBe(false);
  });

  it("classifies builder vs maintainer replies", () => {
    expect(interpretMrfReply("mrf-builder", JSON.stringify(MRF_GOLDEN_MAPPING))).toMatchObject({ ok: true });
    expect(interpretMrfReply("mrf-builder", "not-json")).toMatchObject({ ok: false, error: "invalid_json" });
    expect(interpretMrfReply("mrf-maintainer", JSON.stringify({ action: "fail", reason_code: "insufficient_evidence" })))
      .toMatchObject({ ok: true, mapping: null });
  });

  it("names the field when a sample value is used instead of a source key path", () => {
    const billed = validateMappingValue({
      ...MRF_GOLDEN_MAPPING,
      fields: { ...MRF_GOLDEN_MAPPING.fields, billing_code: "99213" },
    });
    expect(billed.ok).toBe(false);
    if (billed.ok) throw new Error("expected a named field error");
    expect(billed.error).toMatch(/fields\.billing_code/);
    expect(billed.error).toMatch(/99213/);

    const payer = validateMappingValue({
      ...MRF_GOLDEN_MAPPING,
      fields: { ...MRF_GOLDEN_MAPPING.fields, payer_name: "SynPayer A" },
    });
    expect(payer.ok).toBe(false);
    if (payer.ok) throw new Error("expected a named field error");
    expect(payer.error).toMatch(/fields\.payer_name/);
    expect(payer.error).toMatch(/SynPayer A/);

    const typed = validateMappingValue({
      ...MRF_GOLDEN_MAPPING,
      fields: { ...MRF_GOLDEN_MAPPING.fields, rate: "string" },
    });
    expect(typed.ok).toBe(false);
    if (typed.ok) throw new Error("expected a named field error");
    expect(typed.error).toMatch(/fields\.rate/);

    const hospital = validateMappingValue({
      ...MRF_GOLDEN_MAPPING,
      collection: "Synthetic Mercy Demo Hospital",
    });
    expect(hospital.ok).toBe(false);
    if (hospital.ok) throw new Error("expected a named field error");
    expect(hospital.error).toMatch(/collection/);
    expect(hospital.error).toMatch(/Synthetic Mercy Demo Hospital/);

    const wrongKey = validateMappingValue({
      ...MRF_GOLDEN_MAPPING,
      collection: "hospital_name",
    });
    expect(wrongKey.ok).toBe(false);
    if (wrongKey.ok) throw new Error("expected a named field error");
    expect(wrongKey.error).toMatch(/collection/);
    expect(wrongKey.error).toMatch(/hospital_name/);
  });

  it("still accepts the golden mapping and the drift repair key path", () => {
    expect(validateMappingValue(MRF_GOLDEN_MAPPING)).toMatchObject({ ok: true });
    expect(validateMappingValue(MRF_GOLDEN_REPAIR).ok).toBe(true);
  });

  it("rejects the live excerpt-label mapping with every named error", () => {
    const result = validateMappingValue({
      ...MRF_GOLDEN_MAPPING,
      fields: { ...MRF_GOLDEN_MAPPING.fields, billing_code: "standard_charge_codes", description: "note" },
      standard_charge_lookup: "standard_charge_codes",
      dedupe_key: ["billing_code", "payer_name"],
    });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected named errors");
    for (const name of ["fields.billing_code", "fields.description", "standard_charge_lookup", "dedupe_key"]) {
      expect(result.error).toContain(name);
    }
  });

  it.each([
    ["collection", { collection: "missing" }],
    ["rate_groups", { rate_groups: "missing" }],
    ["prices", { prices: "missing" }],
    ["standard_charge_lookup", { standard_charge_lookup: "note" }],
    ["null_policy.rate.fill_from", { null_policy: { rate: { fill_from: "note", by: "billing_code" } } }],
    ["null_policy.rate.by", { null_policy: { rate: { fill_from: "standard_charges", by: "note" } } }],
    ["dedupe_key", { dedupe_key: ["billing_code", "billing_class"] }],
    ["dedupe_key[3]", { dedupe_key: ["billing_code", "payer_name", "billing_class", "missing"] }],
  ])("checks %s against its source scope", (name, patch) => {
    const result = validateMappingValue({ ...MRF_GOLDEN_MAPPING, ...patch });
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error("expected named error");
    expect(result.error).toContain(name);
  });

  it.each(["billing_code", "description", "payer_name", "billing_class", "negotiated_type", "rate"])(
    "checks fields.%s against its source scope", (target) => {
      const result = validateMappingValue({
        ...MRF_GOLDEN_MAPPING, fields: { ...MRF_GOLDEN_MAPPING.fields, [target]: "note" },
      });
      expect(result.ok).toBe(false);
      if (result.ok) throw new Error("expected named error");
      expect(result.error).toContain(`fields.${target}`);
    },
  );
});
