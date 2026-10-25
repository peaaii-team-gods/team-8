import { describe, expect, it, vi } from "vitest";
import { runNodes } from "./runNodes";
import type { RhmAdapter, RunOutcome } from "../adapters/RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import { emptyUsage, parseEvents } from "./telemetry";
import { MRF_CHUNK, MRF_GOLDEN_MAPPING, MRF_GOLDEN_REPAIR_REPLY } from "../mrf/data";
import type { CanvasNode } from "../state/store";
import { MRF_RETRY_HINT } from "../mrf/oracle";

const compiled = [{ nodeId: "a", workflow: { workspace_id: "canvas_test" } as WorkflowV1 }];
const adapter = (): RhmAdapter => ({
  mode: "simulated",
  capabilities: async () => null,
  run: async () => ({ nodeId: "a", runId: "r" }),
  poll: async () => ({ nodeId: "a", status: "succeeded", basis: "agent_reported" }),
  cancel: vi.fn(async () => undefined),
});

describe("run lifecycle", () => {
  it("cancels a handle created after stop without polling or delivering output", async () => {
    let release!: (value: { nodeId: string; runId: string }) => void;
    const a = adapter();
    a.run = () => new Promise((resolve) => { release = resolve; });
    a.poll = vi.fn(a.poll);
    let stopped = false;
    const outcome = vi.fn();
    const run = runNodes(a, compiled, { onStatus: vi.fn(), shouldStop: () => stopped, onOutcome: outcome });
    stopped = true;
    release({ nodeId: "a", runId: "r-late" });
    await run;
    expect(a.cancel).toHaveBeenCalledWith({ nodeId: "a", runId: "r-late" });
    expect(a.poll).not.toHaveBeenCalled();
    expect(outcome).not.toHaveBeenCalled();
  });

  it("reports one failed terminal outcome despite intermediate usage events", async () => {
    const a = adapter();
    const states: RunOutcome[] = [
      { nodeId: "a", status: "unknown", state: "running" },
      { nodeId: "a", status: "failed", basis: "agent_reported", usage: emptyUsage("simulated") },
    ];
    a.poll = async () => states.shift()!;
    a.events = async () => parseEvents({ events: [{ seq: 1, type: "model_tick", payload: { prompt_tokens: 8 } }] });
    const outcome = vi.fn();
    const telemetry = vi.fn();
    await runNodes(a, compiled, { onStatus: vi.fn(), onTelemetry: telemetry, onOutcome: outcome }, { sleep: async () => undefined });
    expect(telemetry.mock.calls.length).toBeGreaterThan(1);
    expect(outcome).toHaveBeenCalledTimes(1);
    expect(outcome).toHaveBeenCalledWith("a", expect.objectContaining({ status: "failed", basis: "agent_reported" }));
  });
});

const mrfNode = (id: string, presetId: string): CanvasNode => ({
  id, type: "agent", position: { x: 0, y: 0 },
  data: { kind: "agent", presetId, title: presetId, description: "", color: "emerald" },
});

describe("MRF apply/check after a bird reply", () => {
  it("retries invalid JSON once, then reports invalid proposal", async () => {
    const a = adapter();
    const replies = ["not-json", "still-not-json"];
    a.run = vi.fn(async (nodeId) => ({ nodeId, runId: `r-${replies.length}` }));
    a.poll = async (h) => ({ nodeId: h.nodeId, status: "succeeded", basis: "agent_reported", output: replies.shift() });
    const evaluated = vi.fn();
    const status = vi.fn();
    await runNodes(a, [{ nodeId: "b", workflow: { inputs: { evidence: "excerpt" } } as unknown as WorkflowV1 }], {
      onStatus: status,
      graph: { nodes: [mrfNode("b", "mrf-builder")], edges: [] },
      mrf: { fixture: MRF_CHUNK, onEvaluated: evaluated },
    }, { sleep: async () => undefined });
    expect(a.run).toHaveBeenCalledTimes(2);
    expect((a.run as ReturnType<typeof vi.fn>).mock.calls[1][1].inputs.retry).toBe(MRF_RETRY_HINT);
    expect(status).toHaveBeenCalledWith("b", "error", "invalid proposal");
    expect(evaluated).toHaveBeenCalledWith("b", expect.objectContaining({ invalidProposal: true, retried: true }));
  });

  it("retries a sample-value mapping once with a message that names the wrong field", async () => {
    const a = adapter();
    const bad = JSON.stringify({
      ...MRF_GOLDEN_MAPPING,
      fields: { ...MRF_GOLDEN_MAPPING.fields, billing_code: "99213" },
    });
    const replies = [bad, JSON.stringify(MRF_GOLDEN_MAPPING)];
    a.run = vi.fn(async (nodeId) => ({ nodeId, runId: `r-${replies.length}` }));
    a.poll = async (h) => ({ nodeId: h.nodeId, status: "succeeded", basis: "agent_reported", output: replies.shift() });
    const evaluated = vi.fn();
    await runNodes(a, [{ nodeId: "b", workflow: { inputs: { evidence: "excerpt" } } as unknown as WorkflowV1 }], {
      onStatus: vi.fn(),
      graph: { nodes: [mrfNode("b", "mrf-builder")], edges: [] },
      mrf: { fixture: MRF_CHUNK, onEvaluated: evaluated },
    }, { sleep: async () => undefined });
    expect(a.run).toHaveBeenCalledTimes(2);
    const retry = (a.run as ReturnType<typeof vi.fn>).mock.calls[1][1].inputs.retry as string;
    expect(retry).toMatch(/fields\.billing_code/);
    expect(retry).toMatch(/99213/);
    expect(retry).not.toBe(MRF_RETRY_HINT);
    expect(evaluated).toHaveBeenCalledWith("b", expect.objectContaining({ passed: true, retried: true, invalidProposal: false }));
  });

  it("applies a valid mapping, runs pinned checks, and hands mapping+checks (not stuffed prompt) to Maintainer", async () => {
    const a = adapter();
    const workflows: WorkflowV1[] = [];
    a.run = vi.fn(async (nodeId, wf) => { workflows.push(wf); return { nodeId, runId: `r-${nodeId}` }; });
    a.poll = async (h) => ({
      nodeId: h.nodeId,
      status: "succeeded",
      basis: "agent_reported",
      output: h.nodeId === "b" ? JSON.stringify(MRF_GOLDEN_MAPPING) : JSON.stringify(MRF_GOLDEN_REPAIR_REPLY),
    });
    const evaluated = vi.fn();
    await runNodes(
      a,
      [
        { nodeId: "b", workflow: { inputs: { evidence: "excerpt" } } as unknown as WorkflowV1 },
        { nodeId: "m", workflow: { inputs: { evidence: "excerpt" } } as unknown as WorkflowV1 },
      ],
      {
        onStatus: vi.fn(),
        graph: {
          nodes: [mrfNode("b", "mrf-builder"), mrfNode("m", "mrf-maintainer")],
          edges: [{ id: "e1", source: "b", target: "m" }],
        },
        mrf: { fixture: MRF_CHUNK, onEvaluated: evaluated },
      },
      { sleep: async () => undefined },
    );
    expect(evaluated.mock.calls[0][1]).toMatchObject({ passed: true, invalidProposal: false });
    expect(workflows[0].inputs.handoff).toBeUndefined();
    expect(workflows[1].inputs.handoff).toBeUndefined();
    expect(workflows[1].inputs.previous_mapping).toContain("mrf.mapping.v1");
    expect(JSON.parse(workflows[1].inputs.failing_checks)).toEqual([]);
  });
});

