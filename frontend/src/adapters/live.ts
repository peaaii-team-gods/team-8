import type { RhmAdapter, RunHandle, RunOutcome } from "./RhmAdapter";
import type { IdentitySession } from "./identity";
import type { WorkflowV1, WorkspaceBinding } from "../compile/toWorkflow";
import { parseEvents, parseWorkspaceList, usageFromUnknown, type ParsedTelemetry, type WorkspaceChange } from "../run/telemetry";
// Live mode targets a local loopback stack with operator-allowlisted origins. No proxy, no credential logging.
// Backend contract (integrate-backend app/main.py:327-401, public_models.py):
// workflows are created as {workflow}, runs as {workflow_id}; RunResponse
// has no outputs — text outputs live on GET /v1/runs/{id}/outputs.
const TERMINAL = ["succeeded", "failed", "cancelled", "halted_by_agent", "outcome_unknown", "halted_emergency", "context_limit_exceeded"];
export class LiveAdapter implements RhmAdapter {
  mode = "live" as const;
  private paidConsent = false;
  setPaidInferenceConsent(value: boolean) { this.paidConsent = value; }
  constructor(private apiBase: string, private session: IdentitySession) {}
  private headers() { return { "content-type": "application/json", ...(this.session.token ? { authorization: `Bearer ${this.session.token}` } : {}) }; }
  async capabilities() {
    const r = await fetch(`${this.apiBase}/v1/capabilities`, { headers: this.headers() });
    return r.ok ? (await r.json()) as Record<string, unknown> : null;
  }
  /** B3 owner-scoped bindings; a failed fetch binds nothing. */
  async workspaces(): Promise<WorkspaceBinding[]> {
    try {
      const r = await fetch(`${this.apiBase}/v1/workspaces`, { headers: this.headers() });
      if (!r.ok) return [];
      const list = ((await r.json()) as { workspaces?: WorkspaceBinding[] }).workspaces ?? [];
      return list.filter((w) => w && w.workspace_id && w.project_id && w.task_id);
    } catch { return []; }
  }
  async run(nodeId: string, workflow: WorkflowV1): Promise<RunHandle> {
    const w = await fetch(`${this.apiBase}/v1/workflows`, { method: "POST", headers: this.headers(), body: JSON.stringify({ workflow }) });
    if (!w.ok) throw new Error(`workflow create failed (${w.status})`);
    const wid = ((await w.json()) as { workflow_id?: string; id?: string }).workflow_id ?? "";
    const r = await fetch(`${this.apiBase}/v1/runs`, { method: "POST", headers: this.headers(), body: JSON.stringify({ workflow_id: wid, paid_inference_consent: this.paidConsent }) });
    if (!r.ok) throw new Error(`run create failed (${r.status})`);
    const runId = ((await r.json()) as { run_id?: string; id?: string }).run_id ?? "";
    return { nodeId, runId };
  }
  async poll(h: RunHandle): Promise<RunOutcome> {
    const r = await fetch(`${this.apiBase}/v1/runs/${h.runId}`, { headers: this.headers() });
    if (!r.ok) return { nodeId: h.nodeId, status: "unknown", state: `http-${r.status}` };
    const j = await r.json() as Record<string, unknown>;
    const state = String(j.status ?? "unknown").toLowerCase();
    const done = TERMINAL.includes(state);
    let output: string | undefined;
    if (done && state === "succeeded") {
      try {
        const o = await fetch(`${this.apiBase}/v1/runs/${h.runId}/outputs`, { headers: this.headers() });
        if (o.ok) {
          const outs = ((await o.json()) as { outputs?: { content?: string }[] }).outputs ?? [];
          output = outs.map((x) => x.content ?? "").join("\n").slice(0, 500) || undefined;
        }
      } catch { /* outputs are best-effort; status/basis already known */ }
    }
    // Non-terminal states stay "unknown" with the raw state passed through;
    // basis is passed through untouched — never a verification claim.
    const status = done && ["succeeded", "failed", "cancelled"].includes(state) ? (state as RunOutcome["status"]) : done ? "failed" : "unknown";
    const usage = usageFromUnknown(j, "live");
    const workspace = parseWorkspaceList(j.workspace ?? j.files, h.nodeId);
    return { nodeId: h.nodeId, status, state, basis: String(j.completion_basis ?? "agent_reported"), output, usage, workspace };
  }
  async events(h: RunHandle, afterSeq: number): Promise<ParsedTelemetry> {
    try {
      const r = await fetch(`${this.apiBase}/v1/runs/${h.runId}/events?after_seq=${afterSeq}`, { headers: this.headers() });
      if (!r.ok) return parseEvents({ events: [] }, h.nodeId);
      return parseEvents(await r.json(), h.nodeId);
    } catch {
      return parseEvents({ events: [] }, h.nodeId);
    }
  }
  async workspaceChanges(workspaceId: string, agentId: string): Promise<WorkspaceChange[]> {
    const paths = [
      `${this.apiBase}/v1/workspaces/${encodeURIComponent(workspaceId)}/files`,
      `${this.apiBase}/v1/workspaces/${encodeURIComponent(workspaceId)}/changes`,
    ];
    for (const url of paths) {
      try {
        const r = await fetch(url, { headers: this.headers() });
        if (!r.ok) continue;
        const list = parseWorkspaceList(await r.json(), agentId);
        if (list.length) return list;
      } catch { /* optional surface */ }
    }
    return [];
  }
  async cancel(h: RunHandle) { await fetch(`${this.apiBase}/v1/runs/${h.runId}/cancel`, { method: "POST", headers: this.headers() }); }
}
