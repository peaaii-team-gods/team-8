import type { RhmAdapter, RunHandle, RunOutcome } from "./RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import type { UsageMetrics, WorkspaceChange } from "../run/telemetry";

const REPLIES: Record<string, string> = {
  builder: '{"schema_version":"mapping.v1","id_column":"sensor_id","reading_column":"reading"}',
  maintainer: '{"decision":"replace_mapping","schema_version":"mapping.v1","id_column":"sensor_id","reading_column":"value"}',
  "denial-predictor": '{"risk":"medium","flags":["modifier_mismatch"],"note":"synthetic audit only"}',
  "policy-audit": '{"compliant":false,"rule":"reading_column_must_exist","action":"repair"}',
  "custom-agent": '{"status":"reviewed","note":"bounded synthetic reply"}',
};

const FILES: Record<string, WorkspaceChange[]> = {
  builder: [
    { path: "contracts/mapping.proposal.json", kind: "added", summary: "Builder field-mapping proposal" },
    { path: "work/baseline-notes.md", kind: "changed", summary: "Recorded which columns were selected" },
  ],
  maintainer: [
    { path: "contracts/mapping.repair.json", kind: "added", summary: "One bounded replace_mapping repair" },
    { path: "contracts/mapping.proposal.json", kind: "changed", summary: "reading_column renamed to value" },
  ],
  "denial-predictor": [{ path: "work/denial-flags.json", kind: "added", summary: "Synthetic denial flags" }],
  "policy-audit": [{ path: "work/policy-findings.json", kind: "added", summary: "Policy rule hits" }],
  "custom-agent": [{ path: "work/custom-review.json", kind: "added", summary: "Custom agent notes" }],
};

const hash = (s: string) => Array.from(s).reduce((a, c) => (a + c.charCodeAt(0)) % 97, 17);

const usageFor = (nodeId: string, workflow: WorkflowV1): UsageMetrics => {
  const n = hash(nodeId + (workflow.objective ?? ""));
  const promptTokens = 120 + n;
  const completionTokens = 40 + (n % 30);
  return { promptTokens, completionTokens, totalTokens: promptTokens + completionTokens, costUsd: 0, source: "simulated" };
};

export class SimulatedAdapter implements RhmAdapter {
  mode = "simulated" as const;
  private workflows = new Map<string, WorkflowV1>();
  async capabilities() { return { capabilities: { run_execution: { status: "available" }, run_cancellation: { status: "available" }, shell_execution: { status: "unavailable", reason_code: "shell_execution_not_verified" }, tool_execution: { status: "unavailable" }, approval_tier3_elevation: { status: "unavailable" } } }; }
  async run(nodeId: string, workflow: WorkflowV1): Promise<RunHandle> {
    this.workflows.set(nodeId, workflow);
    return { nodeId, runId: `sim-${nodeId}` };
  }
  async poll(h: RunHandle): Promise<RunOutcome> {
    // Browser demos pause so the packet can travel; tests stay instant.
    const pause = import.meta.env.MODE === "test" ? 0 : 1800;
    if (pause) await new Promise((r) => setTimeout(r, pause));
    const wf = this.workflows.get(h.nodeId);
    const key = Object.keys(REPLIES).find((k) => (wf?.workspace_id ?? "").includes(k) || (wf?.objective ?? "").toLowerCase().includes(k.replace("-", " "))) ?? "custom-agent";
    const files = (FILES[key] ?? FILES["custom-agent"]).map((f) => ({ ...f, agentId: h.nodeId }));
    return {
      nodeId: h.nodeId,
      status: "succeeded",
      basis: "simulated",
      output: REPLIES[key] ?? REPLIES["custom-agent"],
      usage: usageFor(h.nodeId, wf ?? { objective: "" } as WorkflowV1),
      workspace: files,
    };
  }
  async cancel() { /* simulated: nothing to cancel */ }
}
