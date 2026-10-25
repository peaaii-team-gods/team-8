import { describe, expect, it, vi } from "vitest";
import { failingChecks } from "./checks";
import { MRF_CHUNK_DRIFT, MRF_GOLDEN_MAPPING, MRF_GOLDEN_REPAIR_REPLY } from "./data";
import { recheckMapping } from "./drift";
import { runNodes } from "../run/runNodes";
import type { RhmAdapter } from "../adapters/RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import type { CanvasNode } from "../state/store";

const maintainer: CanvasNode = {
  id: "m", type: "agent", position: { x: 0, y: 0 },
  data: { kind: "agent", presetId: "mrf-maintainer", title: "MRF Maintainer", description: "", color: "purple" },
};

describe("MRF upstream drift", () => {
  it("fails a named check with the current mapping, then passes after one repair mapping", () => {
    const drifted = recheckMapping("drift", MRF_GOLDEN_MAPPING);
    expect(drifted.passed).toBe(false);
    expect(failingChecks(drifted.checks).map((c) => c.name)).toContain("nulls_repaired");
    expect(recheckMapping("drift", MRF_GOLDEN_REPAIR_REPLY.mapping).passed).toBe(true);
  });

  it("hands Maintainer the previous mapping and failing checks, then rechecks one repair", async () => {
    const drifted = recheckMapping("drift", MRF_GOLDEN_MAPPING);
    const workflows: WorkflowV1[] = [];
    const adapter: RhmAdapter = {
      mode: "simulated",
      capabilities: async () => null,
      run: async (nodeId, wf) => { workflows.push(wf); return { nodeId, runId: "r-m" }; },
      poll: async (h) => ({
        nodeId: h.nodeId, status: "succeeded", basis: "agent_reported",
        output: JSON.stringify(MRF_GOLDEN_REPAIR_REPLY),
      }),
      cancel: vi.fn(async () => undefined),
    };
    const evaluated = vi.fn();
    await runNodes(adapter, [{ nodeId: "m", workflow: { inputs: { evidence: "excerpt" } } as unknown as WorkflowV1 }], {
      onStatus: vi.fn(),
      graph: { nodes: [maintainer], edges: [] },
      mrf: {
        fixture: MRF_CHUNK_DRIFT,
        initialMapping: MRF_GOLDEN_MAPPING,
        initialChecks: drifted.checks,
        onEvaluated: evaluated,
      },
    }, { sleep: async () => undefined });
    expect(workflows[0].inputs.handoff).toBeUndefined();
    expect(workflows[0].inputs.previous_mapping).toContain("negotiated_rate");
    expect(JSON.parse(workflows[0].inputs.failing_checks).some((c: { name: string }) => c.name === "nulls_repaired")).toBe(true);
    expect(evaluated).toHaveBeenCalledWith("m", expect.objectContaining({ passed: true, invalidProposal: false }));
  });

  it("keeps a failed repair visible instead of inventing a pass", async () => {
    const drifted = recheckMapping("drift", MRF_GOLDEN_MAPPING);
    const adapter: RhmAdapter = {
      mode: "simulated",
      capabilities: async () => null,
      run: async (nodeId) => ({ nodeId, runId: "r-m" }),
      poll: async (h) => ({
        nodeId: h.nodeId, status: "succeeded", basis: "agent_reported",
        output: JSON.stringify({ action: "replace_mapping", mapping: MRF_GOLDEN_MAPPING }),
      }),
      cancel: vi.fn(async () => undefined),
    };
    const evaluated = vi.fn();
    await runNodes(adapter, [{ nodeId: "m", workflow: { inputs: {} } as unknown as WorkflowV1 }], {
      onStatus: vi.fn(),
      graph: { nodes: [maintainer], edges: [] },
      mrf: { fixture: MRF_CHUNK_DRIFT, initialMapping: MRF_GOLDEN_MAPPING, initialChecks: drifted.checks, onEvaluated: evaluated },
    }, { sleep: async () => undefined });
    expect(evaluated.mock.calls[0][1].passed).toBe(false);
    expect(failingChecks(evaluated.mock.calls[0][1].checks).map((c: { name: string }) => c.name)).toContain("nulls_repaired");
  });
});
