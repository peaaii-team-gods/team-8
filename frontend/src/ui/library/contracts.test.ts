import { describe, expect, it } from "vitest";
import { OUTPUT_SCHEMAS } from "../../registry/schemas";
import { listContracts } from "./contracts";

describe("contract library", () => {
  it("lists every registry schema and names the agent that starts from it", () => {
    const cards = listContracts();
    expect(cards.map((card) => card.id)).toEqual(OUTPUT_SCHEMAS.map((schema) => schema.id));
    const mapping = cards.find((card) => card.id === "mapping.v1");
    expect(mapping?.presets).toEqual([{ id: "builder", title: "Builder" }]);
    expect(mapping?.json).toContain("reading_column");
    expect(mapping?.json).not.toMatch(/password|authorization|bearer/i);
  });
});
