import { describe, expect, it } from "vitest";
import { PROPOSAL_MARK, compareOutputs, presentOutput } from "./outputView";

const labelled = (body: string) => `${body} ${PROPOSAL_MARK}`;

describe("output inspector view", () => {
  it("pretty-prints proposal JSON and does not treat it as verification", () => {
    const view = presentOutput({
      id: "a",
      title: "Builder",
      presetId: "builder",
      output: labelled('{"reading_column":"reading"}'),
    });
    expect(view.proposal).toBe(true);
    expect(view.json).toBe(true);
    expect(view.text).toContain('"reading_column": "reading"');
    expect(view.text).not.toContain("not verification");
  });

  it("says when two proposals differ", () => {
    const left = presentOutput({ id: "a", title: "Builder", presetId: "builder", output: labelled('{"reading_column":"reading"}') });
    const right = presentOutput({ id: "b", title: "Maintainer", presetId: "maintainer", output: labelled('{"reading_column":"value"}') });
    const empty = presentOutput({ id: "c", title: "Assay QC", presetId: "assay-qc" });
    expect(compareOutputs(left, right)).toMatch(/differs/);
    expect(compareOutputs(left, left)).toMatch(/matches/);
    expect(compareOutputs(empty, empty)).toMatch(/has output yet/i);
  });
});
