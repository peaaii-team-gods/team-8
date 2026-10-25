import { describe, expect, it } from "vitest";
import { compileGraph } from "../compile/toWorkflow";
import { fixtureFor } from "../fixtures/lakes";
import { defaultSchema } from "./schemas";
import { scenarioById } from "./scenarios";
import type { CanvasNode } from "../state/store";

describe("MRF scenario registry", () => {
  it("adds an MRF scenario without changing existing ones", () => {
    const mrf = scenarioById("mrf-pipeline")!;
    const pilot = scenarioById("pilot-storyboard")!;
    expect(mrf.title).toBe("MRF price file");
    expect(pilot.blurb).toContain("Clinical lab");
    const built = mrf.build((p) => `${p}-1`);
    expect(built.nodes.map((n) => n.data.presetId)).toEqual(["hospital-mrf", "mrf-builder", "mrf-maintainer"]);
  });

  it("gives Builder/Maintainer the MRF mapping schema and grants no tools", () => {
    expect(defaultSchema("mrf-builder").id).toBe("mrf.mapping.v1");
    expect(defaultSchema("mrf-maintainer").id).toBe("mrf.repair.v1");
    expect(defaultSchema("builder").id).toBe("mapping.v1");
    const sc = scenarioById("mrf-pipeline")!.build((p) => `${p}-x`);
    const compiled = compileGraph(sc.nodes as CanvasNode[], sc.edges, "mrf01");
    expect(compiled).toHaveLength(2);
    expect(compiled.every((c) => c.workflow.allowed_tools.length === 0)).toBe(true);
    expect(JSON.stringify(compiled[0].workflow.inputs.evidence)).toContain("synthetic excerpt");
    expect(JSON.stringify(compiled[0].workflow.inputs.evidence)).not.toContain("Electrocardiogram");
  });

  it("feeds birds a short excerpt rather than the full nested file", () => {
    const excerpt = JSON.stringify(fixtureFor("hospital-mrf"));
    expect(excerpt).toContain("negotiated_rate");
    expect(excerpt).not.toContain("SynPayer B");
    expect(excerpt).not.toContain("Electrocardiogram");
    expect(excerpt).not.toContain("Comprehensive metabolic panel");
  });
});
