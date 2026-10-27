import type { RhmAdapter, RunHandle } from "../adapters/RhmAdapter";
import { compileAgent } from "../compile/toWorkflow";
import { useStore } from "../state/store";
import { parseModelJson } from "../mrf/validate";
import { pollUntilTerminal } from "./runNodes";
import { liveProviderBlocked, type InferenceStatus } from "../adapters/inference";

export interface PipelineEvent { type: string; [key: string]: unknown }
export interface PipelineStep { node: string; status: string; counts: Record<string, unknown>; telemetry: PipelineEvent[] }
export interface PipelineRecord { status: string; steps: PipelineStep[]; report_md?: string }
export const matchesGoldenFingerprint = (steps: Pick<PipelineStep, "telemetry">[]) => steps
  .flatMap(step => step.telemetry)
  .some(event => event.type === "trace" && typeof event.golden_source_sha256 === "string" && event.sha256 === event.golden_source_sha256);
export const ANALYST_INPUT_CAP = 32_768;
export function analystSqlRows(top: PipelineEvent): string {
  const rows = Array.isArray(top.rows) ? top.rows as unknown[] : [];
  const spread = Array.isArray(top.spread) ? top.spread as unknown[] : [];
  const payload: Record<string, unknown> = {
    row_count: Number(top.row_count ?? rows.length),
    baseline_label: String(top.baseline_label ?? "").slice(0, 400),
    top_groups: rows.slice(0, 10),
    spread_groups: spread,
    aggregates: { n_groups: Number(top.row_count ?? rows.length), n_spread: spread.length },
  };
  let text = JSON.stringify(payload);
  if (text.length > ANALYST_INPUT_CAP) {
    payload.spread_groups = [];
    payload.top_groups = rows.slice(0, 3);
    text = JSON.stringify(payload);
  }
  while (text.length > ANALYST_INPUT_CAP && (payload.top_groups as unknown[]).length) {
    (payload.top_groups as unknown[]).pop();
    text = JSON.stringify(payload);
  }
  return text;
}
export interface ModelView { mapping?: { valid: boolean; matches_golden: boolean }; repair?: { valid: boolean }; matchesRepair?: boolean; summary?: string; rejected?: number; unavailable?: boolean; reason?: string }
export const runPath = (id: string) => `/api/pipeline/runs/${encodeURIComponent(id)}`;
export const HOSPITAL_EXPORT_EVENT = "hospital-run-export";
export interface HospitalModelContext { shellMode: string; modelReady: boolean }
/** Mirrors liveProviderBlocked order; the first failing check names why the model is off. */
export function hospitalModelGate(adapter: RhmAdapter | null, inference: InferenceStatus | null, spendCap: string, paidConsent: boolean,
  ctx: HospitalModelContext = { shellMode: "live", modelReady: true }): { adapter: RhmAdapter } | { reason: string } {
  if (ctx.shellMode !== "live" || (adapter && adapter.mode !== "live")) return { reason: "model off: Crucible is not in live mode" };
  if (!adapter) return { reason: "model off: not signed in" };
  if (!ctx.modelReady) return { reason: "model off: selected model not loaded - open Settings" };
  if (!inference) return { reason: "model off: provider status not loaded" };
  if (!inference.configured && !inference.host_models_authorized) return { reason: "model off: no provider configured - add your OpenRouter key in Settings" };
  if (inference.configured && !paidConsent) return { reason: "model off: paid consent not ticked in Settings" };
  const cap = Number(spendCap);
  if (!Number.isFinite(cap) || cap < 0 || (inference.configured && cap <= 0)) return { reason: "model off: spend cap is 0 - set a cap in Settings" };
  return liveProviderBlocked(inference, spendCap, paidConsent) ? { reason: "model off: provider not ready" } : { adapter };
}
export const hospitalModelAdapter = (adapter: RhmAdapter | null, inference: InferenceStatus | null, spendCap: string, paidConsent: boolean) => {
  const gate = hospitalModelGate(adapter, inference, spendCap, paidConsent);
  return "adapter" in gate ? gate.adapter : null;
};
const reasonText = (failure: unknown) => (failure instanceof Error && failure.message ? failure.message : "model unavailable").slice(0, 160);
export function pipelineHeaders(token?: string | null, json = false): Record<string, string> {
  return { ...(json ? { "Content-Type": "application/json" } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}
export async function pipelineRequest(path: string, body?: unknown, signal?: AbortSignal, token?: string | null) {
  const response = await fetch(path, { method: body === undefined ? "GET" : "POST", headers: pipelineHeaders(token, true),
    ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal, cache: "no-store", redirect: "error" });
  if (!response.ok) throw new Error(`Local pipeline request failed (${response.status})`);
  return response.json();
}
const canonical = (value: unknown): string => JSON.stringify(value, (_key, item) => item && typeof item === "object" && !Array.isArray(item)
  ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);

/** Existing RHM adapter, bounded proposals only. The local server always keeps its golden record. */
export async function hospitalModels(adapter: RhmAdapter, id: string, record: PipelineRecord, budget: number,
  signal: AbortSignal, onHandle: (handle: RunHandle) => void, token?: string | null): Promise<ModelView> {
  const events = record.steps.flatMap(step => step.telemetry), evidence = events.find(event => event.type === "evidence");
  const top = events.find(event => event.type === "top10"), injected = events.some(event => event.type === "repair" && event.label === "injected");
  if (!evidence || !top || adapter.mode !== "live") return { unavailable: true, reason: "model off: pipeline evidence missing" };
  const view: ModelView = {};
  const propose = async (preset: string, inputs: Record<string, string>) => {
    if (signal.aborted || Object.values(inputs).some(value => value.length > ANALYST_INPUT_CAP)) throw new Error(signal.aborted ? "stopped" : "model input too large");
    const graph = useStore.getState(), node = graph.nodes.find(n => n.data.presetId === preset);
    if (!node) throw new Error("model preset missing from graph");
    const { model_preference: _model, ...workflow } = compileAgent(node, graph.edges, graph.nodes, id);
    const handle = await adapter.run(node.id, { ...workflow, inputs: { ...workflow.inputs, ...inputs }, budget: { max_usd: budget } });
    onHandle(handle);
    if (signal.aborted) { await adapter.cancel(handle).catch(() => undefined); throw new Error("stopped"); }
    const outcome = await pollUntilTerminal(adapter, handle, { shouldStop: () => signal.aborted });
    if (signal.aborted) throw new Error("stopped");
    if (outcome.status !== "succeeded") throw new Error(`model run ${outcome.status}${outcome.reason && /^[a-z0-9_]{1,64}$/.test(outcome.reason) ? `: ${outcome.reason}` : ""}`);
    const parsed = parseModelJson(outcome.output);
    if (!parsed.ok) throw new Error("model reply failed to parse");
    return parsed.value;
  };
  try {
    const mapping = await propose("mrf-hospital-builder", { evidence: JSON.stringify(evidence.source_excerpt) });
    const result = await pipelineRequest(`${runPath(id)}/proposals`, { mapping }, signal, token);
    view.mapping = result.mapping;
  } catch (failure) { view.unavailable = true; view.reason ??= reasonText(failure); }
  if (injected && !signal.aborted) try {
    if (!evidence.drift_excerpt) throw new Error("model off: pipeline evidence missing");
    const repair = await propose("mrf-hospital-maintainer", { evidence: JSON.stringify(evidence.drift_excerpt),
      previous_mapping: JSON.stringify(evidence.golden_mapping), failing_checks: JSON.stringify(events.flatMap(event => event.type === "checks" && Array.isArray(event.checks) ? event.checks : []).filter(check => check.pass === false)) });
    const result = await pipelineRequest(`${runPath(id)}/proposals`, { repair }, signal, token);
    view.repair = result.repair;
    const proposed = repair as { action?: string; mapping?: unknown };
    view.matchesRepair = canonical(proposed.action === "replace_mapping" ? proposed.mapping : repair) === canonical(evidence.golden_repair);
  } catch (failure) { view.unavailable = true; view.reason ??= reasonText(failure); }
  if (!signal.aborted) try {
    const proposal = await propose("hospital-analyst", { sql_rows: analystSqlRows(top) }) as { summary?: unknown };
    if (typeof proposal.summary !== "string" || !proposal.summary.trim() || proposal.summary.length > 1200) throw new Error("model reply failed to parse");
    const guarded = await pipelineRequest(`${runPath(id)}/summary`, { text: proposal.summary }, signal, token);
    if (guarded.ok === true) view.summary = proposal.summary;
    else view.rejected = Array.isArray(guarded.violations) ? guarded.violations.length : 0;
  } catch (failure) { view.unavailable = true; view.reason ??= reasonText(failure); }
  return view;
}
