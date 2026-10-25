import type { RhmAdapter, RunHandle, RunOutcome } from "./RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import type { UsageMetrics, WorkspaceChange } from "../run/telemetry";
import { MRF_GOLDEN_MAPPING, MRF_GOLDEN_REPAIR_REPLY } from "../mrf/data";

const REPLIES: Record<string, string> = {
  builder: '{"schema_version":"mapping.v1","id_column":"specimen_id","reading_column":"reading"}',
  maintainer: '{"action":"replace_mapping","mapping":{"schema_version":"mapping.v1","id_column":"specimen_id","reading_column":"value"}}',
  "mrf-builder": JSON.stringify(MRF_GOLDEN_MAPPING),
  "mrf-maintainer": JSON.stringify(MRF_GOLDEN_REPAIR_REPLY),
  "denial-predictor": '{"risk":"medium","flags":["modifier_mismatch"],"note":"synthetic audit only"}',
  "policy-audit": '{"compliant":false,"rule":"reading_column_must_exist","action":"repair"}',
  "assay-qc": '{"outcome":"pass","flags":["vehicle_ok"],"note":"synthetic plate QC"}',
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
  "policy-audit": [{ path: "work/policy-findings.json", kind: "added", summary: "Protocol rule hits" }],
  "assay-qc": [{ path: "work/assay-qc.json", kind: "added", summary: "Assay QC outcome" }],
  "custom-agent": [{ path: "work/custom-review.json", kind: "added", summary: "Custom agent notes" }],
  "mrf-builder": [{ path: "contracts/mrf-mapping.proposal.json", kind: "added", summary: "MRF flatten-mapping proposal" }],
  "mrf-maintainer": [{ path: "contracts/mrf-mapping.repair.json", kind: "added", summary: "One MRF mapping repair" }],
};

const hash = (s: string) => Array.from(s).reduce((a, c) => (a + c.charCodeAt(0)) % 97, 17);

const usageFor = (nodeId: string, workflow: WorkflowV1): UsageMetrics => {
  const n = hash(nodeId + (workflow.objective ?? ""));
  const promptTokens = 120 + n;
  const completionTokens = 40 + (n % 30);
  return { promptTokens, completionTokens, totalTokens: promptTokens + completionTokens, costUsd: 0, source: "simulated" };
};

const presetKey = (wf: WorkflowV1 | undefined): string => {
  const blob = `${wf?.workspace_id ?? ""} ${wf?.objective ?? ""}`.toLowerCase();
  const keys = Object.keys(REPLIES).sort((a, b) => b.length - a.length);
  return keys.find((k) => blob.includes(k) || blob.includes(k.replace("-", " "))) ?? "custom-agent";
};

export class SimulatedAdapter implements RhmAdapter {
  mode = "simulated" as const;
  private workflows = new Map<string, WorkflowV1>();
  async capabilities() {
    return {
      capabilities: {
        run_execution: { status: "available" },
        run_cancellation: { status: "available" },
        shell_execution: { status: "unavailable", reason_code: "shell_execution_not_verified" },
        tool_execution: { status: "unavailable" },
        approval_tier3_elevation: { status: "unavailable" },
      },
    };
  }
  async run(nodeId: string, workflow: WorkflowV1): Promise<RunHandle> {
    this.workflows.set(nodeId, workflow);
    return { nodeId, runId: `sim-${nodeId}` };
  }
  async poll(h: RunHandle): Promise<RunOutcome> {
    const pause = import.meta.env.MODE === "test" ? 0 : 1800;
    if (pause) await new Promise((r) => setTimeout(r, pause));
    const wf = this.workflows.get(h.nodeId);
    const key = presetKey(wf);
    const files = (FILES[key] ?? FILES["custom-agent"]).map((f) => ({ ...f, agentId: h.nodeId }));
    return {
      nodeId: h.nodeId,
      status: "succeeded",
      basis: "agent_reported",
      output: REPLIES[key] ?? REPLIES["custom-agent"],
      usage: usageFor(h.nodeId, wf ?? { objective: "" } as WorkflowV1),
      workspace: files,
    };
  }
  async cancel() { /* simulated: nothing to cancel */ }
}
