import { describe, expect, it, vi } from "vitest";
import { runNodes } from "./runNodes";
import type { RhmAdapter, RunOutcome } from "../adapters/RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import { emptyUsage, parseEvents } from "./telemetry";

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
