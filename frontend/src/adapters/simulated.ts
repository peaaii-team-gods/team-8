import type { RhmAdapter, RunHandle, RunOutcome } from "./RhmAdapter";
export class SimulatedAdapter implements RhmAdapter {
  mode = "simulated" as const;
  async capabilities() { return { capabilities: { run_execution: { status: "available" }, run_cancellation: { status: "available" }, shell_execution: { status: "unavailable", reason_code: "shell_execution_not_verified" }, tool_execution: { status: "unavailable" }, approval_tier3_elevation: { status: "unavailable" } } }; }
  async run(nodeId: string): Promise<RunHandle> { return { nodeId, runId: `sim-${nodeId}` }; }
  async poll(h: RunHandle): Promise<RunOutcome> {
    return { nodeId: h.nodeId, status: "succeeded", basis: "simulated", output: "Simulated summary (agent_reported): bounded review complete on synthetic inputs." };
  }
  async cancel() { /* simulated: nothing to cancel */ }
}
