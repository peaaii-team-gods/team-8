import { describe, expect, it } from "vitest";
import { defaultSchema, defaultSchemaText, matchingSchemaId, outputSchemaInput, parseSchemaText } from "./schemas";

describe("predefined output schemas", () => {
  it("prefills Builder with the mapping contract", () => {
    expect(defaultSchema("builder").id).toBe("mapping.v1");
    expect(defaultSchemaText("builder")).toContain('"schema_version"');
    expect(outputSchemaInput(defaultSchemaText("builder"))).toContain("mapping.v1");
  });

  it("falls back to the custom object for an unknown preset", () => {
    expect(defaultSchema("nope").id).toBe("custom.v1");
  });

  it("rejects JSON that is not an object", () => {
    expect(parseSchemaText("{").ok).toBe(false);
    expect(parseSchemaText("[]").ok).toBe(false);
    expect(outputSchemaInput("{")).toBeUndefined();
    expect(outputSchemaInput("  ")).toBeUndefined();
  });

  it("recognizes an unedited preset and a hand edit", () => {
    const text = defaultSchemaText("maintainer");
    expect(matchingSchemaId(text)).toBe("repair.v1");
    expect(matchingSchemaId(text.replace("fail", "stop"))).toBeUndefined();
  });
});
