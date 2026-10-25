import type { RhmAdapter, RunHandle } from "../adapters/RhmAdapter";
import { compileAgent } from "../compile/toWorkflow";
import { useStore } from "../state/store";
import { parseModelJson } from "../mrf/validate";
import { pollUntilTerminal } from "./runNodes";
import { liveProviderBlocked, type InferenceStatus } from "../adapters/inference";

export interface PipelineEvent { type: string; [key: string]: unknown }
export interface PipelineStep { node: string; status: string; counts: Record<string, unknown>; telemetry: PipelineEvent[] }
export interface PipelineRecord { status: string; steps: PipelineStep[]; report_md?: string }
export interface ModelView { mapping?: { valid: boolean; matches_golden: boolean }; repair?: { valid: boolean }; matchesRepair?: boolean; summary?: string; rejected?: number; unavailable?: boolean }
export const runPath = (id: string) => `/api/pipeline/runs/${encodeURIComponent(id)}`;
export const HOSPITAL_EXPORT_EVENT = "hospital-run-export";
export const hospitalModelAdapter = (adapter: RhmAdapter | null, inference: InferenceStatus | null, spendCap: string, paidConsent: boolean) =>
  adapter?.mode === "live" && inference?.host_models_authorized && !inference.configured && !liveProviderBlocked(inference, spendCap, paidConsent) ? adapter : null;
export async function pipelineRequest(path: string, body?: unknown, signal?: AbortSignal) {
  const response = await fetch(path, { method: body === undefined ? "GET" : "POST", headers: { "Content-Type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }), signal, cache: "no-store", redirect: "error" });
  if (!response.ok) throw new Error(`Local pipeline request failed (${response.status})`);
  return response.json();
}
const canonical = (value: unknown): string => JSON.stringify(value, (_key, item) => item && typeof item === "object" && !Array.isArray(item)
  ? Object.fromEntries(Object.keys(item).sort().map(key => [key, item[key]])) : item);

/** Existing RHM adapter, bounded proposals only. The local server always keeps its golden record. */
export async function hospitalModels(adapter: RhmAdapter, id: string, record: PipelineRecord, budget: number,
  signal: AbortSignal, onHandle: (handle: RunHandle) => void): Promise<ModelView> {
  const events = record.steps.flatMap(step => step.telemetry), evidence = events.find(event => event.type === "evidence");
  const top = events.find(event => event.type === "top10"), injected = events.some(event => event.type === "repair" && event.label === "injected");
  if (!evidence || !top || adapter.mode !== "live") return { unavailable: true };
  const view: ModelView = {};
  const propose = async (preset: string, inputs: Record<string, string>) => {
    if (signal.aborted || Object.values(inputs).some(value => value.length > 32_768)) throw new Error("model unavailable");
    const graph = useStore.getState(), node = graph.nodes.find(n => n.data.presetId === preset);
    if (!node) throw new Error("model unavailable");
    const { model_preference: _model, ...workflow } = compileAgent(node, graph.edges, graph.nodes, id);
    const handle = await adapter.run(node.id, { ...workflow, inputs: { ...workflow.inputs, ...inputs }, budget: { max_usd: budget } });
    onHandle(handle);
    if (signal.aborted) { await adapter.cancel(handle).catch(() => undefined); throw new Error("stopped"); }
    const outcome = await pollUntilTerminal(adapter, handle, { shouldStop: () => signal.aborted });
    if (outcome.status !== "succeeded" || signal.aborted) throw new Error("model unavailable");
    const parsed = parseModelJson(outcome.output);
    if (!parsed.ok) throw new Error("model unavailable");
    return parsed.value;
  };
  try {
    const mapping = await propose("mrf-hospital-builder", { evidence: JSON.stringify(evidence.source_excerpt) });
    const result = await pipelineRequest(`${runPath(id)}/proposals`, { mapping }, signal);
    view.mapping = result.mapping;
  } catch { view.unavailable = true; }
  if (injected && !signal.aborted) try {
    if (!evidence.drift_excerpt) throw new Error("model unavailable");
    const repair = await propose("mrf-hospital-maintainer", { evidence: JSON.stringify(evidence.drift_excerpt),
      previous_mapping: JSON.stringify(evidence.golden_mapping), failing_checks: JSON.stringify(events.flatMap(event => event.type === "checks" && Array.isArray(event.checks) ? event.checks : []).filter(check => check.pass === false)) });
    const result = await pipelineRequest(`${runPath(id)}/proposals`, { repair }, signal);
    view.repair = result.repair;
    const proposed = repair as { action?: string; mapping?: unknown };
    view.matchesRepair = canonical(proposed.action === "replace_mapping" ? proposed.mapping : repair) === canonical(evidence.golden_repair);
  } catch { view.unavailable = true; }
  if (!signal.aborted) try {
    const proposal = await propose("hospital-analyst", { sql_rows: JSON.stringify(top.rows) }) as { summary?: unknown };
    if (typeof proposal.summary !== "string" || !proposal.summary.trim() || proposal.summary.length > 1200) throw new Error("model unavailable");
    const guarded = await pipelineRequest(`${runPath(id)}/summary`, { text: proposal.summary }, signal);
    if (guarded.ok === true) view.summary = proposal.summary;
    else view.rejected = Array.isArray(guarded.violations) ? guarded.violations.length : 0;
  } catch { view.unavailable = true; }
  return view;
}
