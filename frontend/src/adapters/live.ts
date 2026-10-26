import { runSelection } from "./inference";
import type { RhmAdapter, RunHandle, RunOutcome } from "./RhmAdapter";
import type { IdentitySession } from "./identity";
import type { WorkflowV1, WorkspaceBinding } from "../compile/toWorkflow";
import { parseEvents, parseWorkspaceList, usageFromUnknown, type ParsedTelemetry, type WorkspaceChange } from "../run/telemetry";
import { contentFreeRunSummary, sortRuns, summarizeRun, type PublicRunSummary, type RunListResult } from "./runHistory";
// Live mode targets a local loopback stack with operator-allowlisted origins. No proxy, no credential logging.
// Backend contract (integrate-backend app/main.py:327-401, public_models.py):
// workflows are created as {workflow}, runs as {workflow_id}; RunResponse
// has no outputs — text outputs live on GET /v1/runs/{id}/outputs.
const TERMINAL = ["succeeded", "failed", "cancelled", "halted_by_agent", "outcome_unknown", "halted_emergency", "context_limit_exceeded"];
/** Parse uses the full joined output. Display may truncate at this floor. */
export const DISPLAY_OUTPUT_LIMIT = 4000;
export function displayRunOutput(text: string, limit = DISPLAY_OUTPUT_LIMIT): string {
  return text.length <= limit ? text : text.slice(0, limit);
}
export function runErrorText(status: number, code?: unknown, message?: unknown): string {
  const codeCopy: Record<string, string> = {
    inference_budget_required: "This run needs a spend cap. Choose Premium in Settings and set one.",
    inference_not_free: "No free model can take this run right now. Try again later, or use Premium.",
    enrollment_unrouted: "This agent isn't set up to run on a model yet.",
    tier_above_ceiling: "This run needs a higher tier than this account allows.",
  };
  if (status === 401 || status === 403) return "Sign in again to run this agent.";
  if (status === 429) return "Too many runs right now. Try again shortly.";
  if (typeof code === "string" && Object.hasOwn(codeCopy, code)) return codeCopy[code];
  const safeMessage = typeof message === "string" ? message.trim().slice(0, 160) : "";
  return safeMessage ? `Run could not start: ${safeMessage}` : `Run could not start (${status}).`;
}
async function runFailure(response: Response): Promise<Error> {
  const body = await response.json().catch(() => null) as { error?: { code?: unknown; message?: unknown } } | null;
  return new Error(runErrorText(response.status, body?.error?.code, body?.error?.message));
}
export class LiveAdapter implements RhmAdapter {
  mode = "live" as const;
  private paidConsent = false;
  setPaidInferenceConsent(value: boolean) { this.paidConsent = value; }
  constructor(private apiBase: string, private session: IdentitySession) {}
  private headers() { return { "content-type": "application/json", ...(this.session.token ? { authorization: `Bearer ${this.session.token}` } : {}) }; }
  /** API calls carry the bearer token only. The Identity cookie stays off this origin. */
  private apiGet(path: string) {
    return fetch(`${this.apiBase}${path}`, { headers: this.headers(), credentials: "omit", cache: "no-store" });
  }
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
    const inference_selection = await runSelection(this.apiBase, this.session);
    const w = await fetch(`${this.apiBase}/v1/workflows`, { method: "POST", headers: this.headers(), body: JSON.stringify({ workflow }) });
    if (!w.ok) throw await runFailure(w);
    const wid = ((await w.json()) as { workflow_id?: string; id?: string }).workflow_id ?? "";
    const r = await fetch(`${this.apiBase}/v1/runs`, { method: "POST", headers: this.headers(), body: JSON.stringify({ workflow_id: wid, paid_inference_consent: this.paidConsent, inference_selection }) });
    if (!r.ok) throw await runFailure(r);
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
          output = outs.map((x) => x.content ?? "").join("\n") || undefined;
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

  /**
   * Caller runs for workspaces this account can see.
   * API.md documents GET /v1/runs?workspace_id= only. There is no workflow list in this repo.
   */
  async listRuns(): Promise<RunListResult> {
    const workspaces = await this.workspaces();
    const ids = [...new Set(workspaces.map((w) => w.workspace_id).filter(Boolean))];
    if (!ids.length) {
      return { runs: [], note: "No workspace is bound, so runs cannot be listed. The documented query is GET /v1/runs?workspace_id=…." };
    }
    const collected: PublicRunSummary[] = [];
    for (const workspaceId of ids) {
      const r = await this.apiGet(`/v1/runs?workspace_id=${encodeURIComponent(workspaceId)}&limit=20`);
      if (!r.ok) continue;
      const body = await r.json() as { runs?: unknown[] } | unknown[];
      const rows = Array.isArray(body) ? body : body.runs ?? [];
      for (const row of rows) {
        const run = summarizeRun(row);
        if (run) collected.push(run);
      }
    }
    const runs = sortRuns(collected.filter((run, i, all) => all.findIndex((other) => other.runId === run.runId) === i)).slice(0, 20);
    return { runs, note: runs.length ? null : "No runs on the workspaces this account can see." };
  }

  /** Status and basis only. Does not call /outputs. */
  async runDetail(runId: string): Promise<PublicRunSummary & { summary: string }> {
    const r = await this.apiGet(`/v1/runs/${encodeURIComponent(runId)}`);
    if (!r.ok) throw new Error(`run read failed (${r.status})`);
    const run = summarizeRun(await r.json());
    if (!run) throw new Error("run read failed (no run id)");
    return { ...run, summary: contentFreeRunSummary(run) };
  }
}
