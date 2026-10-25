import { describe, expect, it } from "vitest";
import { MRF_GOLDEN_MAPPING, MRF_GOLDEN_REPAIR_REPLY } from "./data";
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
});
