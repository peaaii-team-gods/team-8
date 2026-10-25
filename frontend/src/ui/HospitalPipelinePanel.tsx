import { useEffect, useRef, useState } from "react";
import type { RhmAdapter, RunHandle } from "../adapters/RhmAdapter";
import { useStore } from "../state/store";
import { HOSPITAL_EXPORT_EVENT, hospitalModels, pipelineHeaders, pipelineRequest, runPath, type ModelView, type PipelineRecord } from "../run/hospitalPipeline";
import { openHospitalReportDialog } from "./HospitalReportTable";
const presets: Record<string, string[]> = { source: ["hospital-source"], builder: ["mrf-hospital-builder", "mrf-hospital-maintainer"], store: ["hospital-store"], analyst: ["hospital-analyst"] };
const stepNames: Record<string, string> = { source: "Scout", builder: "Architect", store: "Ledger", analyst: "Analyst" };
const eventsFor = (step: PipelineRecord["steps"][number], type: string) => step.telemetry.filter(event => event.type === type);
const failureLine = (step: PipelineRecord["steps"][number]) => {
  const checks = eventsFor(step, "checks").flatMap(event => Array.isArray(event.checks) ? event.checks as Record<string, unknown>[] : []);
  const rate = checks.find(check => check.name === "fields.rate" && check.pass === false);
  const inserted = checks.find(check => check.name === "inserted_row_count");
  return rate
    ? `Injected error: fields.rate expected ${String(rate.expected)}, got ${String(rate.actual)}${typeof inserted?.actual === "number" && typeof inserted.expected === "number" && inserted.pass === false ? ` - ${inserted.actual}/${inserted.expected} rows` : ""}` : "";
};
const repairLine = (step: PipelineRecord["steps"][number]) => {
  const repair = eventsFor(step, "repair").find(event => event.label === "injected");
  const inserted = Array.isArray(repair?.checks) ? (repair.checks as Record<string, unknown>[]).find(check => check.name === "inserted_row_count") : undefined;
  return repair && inserted?.pass === true ? `Golden repair: ${String(inserted.actual)}/${String(inserted.expected)} rows restored` : "";
};
const humanSummary = (step: PipelineRecord["steps"][number]) => {
  if (step.node === "store") return typeof step.counts.row_count === "number" ? `${step.counts.row_count} rows - local SQLite` : "Waiting for row count";
  if (step.node === "builder") return repairLine(step) || failureLine(step) || `Architect ${step.status}`;
  if (step.node === "source") {
    const trace = eventsFor(step, "trace")[0];
    const ingest = eventsFor(step, "ingest")[0];
    const mode = typeof ingest?.parse_mode === "string" ? ingest.parse_mode : typeof step.counts.parse_mode === "string" ? String(step.counts.parse_mode) : "";
    const fetched = trace?.label === "cached" ? "Scout fetch cached" : "Scout files fetched";
    return mode ? `${fetched} · ${mode}` : fetched;
  }
  if (step.node === "analyst") return `${String(step.counts.row_count ?? 0)} SQL report rows ready`;
  return `${step.node} ${step.status}`;
};
export default function HospitalPipelinePanel({ adapter, budget, prepareLocalModel, mode, accessToken }: { adapter: RhmAdapter | null; budget: number; prepareLocalModel?: () => void; mode?: string; accessToken?: string | null }) {
  const signedOut = mode === "live" && !accessToken;
  const [record, setRecord] = useState<PipelineRecord | null>(null), [id, setId] = useState("");
  const [inject, setInject] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState(""), [artifactError, setArtifactError] = useState("");
  const [model, setModel] = useState<ModelView>({}), [exportNote, setExportNote] = useState(""), [exporting, setExporting] = useState(false);
  const active = useRef<AbortController | null>(null), handles = useRef<RunHandle[]>([]), exportLink = useRef("");
  useEffect(() => () => { active.current?.abort(); for (const handle of handles.current) void adapter?.cancel(handle).catch(() => undefined); }, [adapter]);
  useEffect(() => {
    if (!record || !id) return;
    const store = useStore.getState();
    const repairNote = model.repair ? `Model repair: ${model.repair.valid ? "valid" : "invalid"} / ${model.matchesRepair ? "matches golden" : "differs from golden"}` : model.unavailable ? "model unavailable, golden path used" : "";
    for (const node of store.nodes) {
      const step = record.steps.find(step => presets[step.node]?.includes(node.data.presetId));
      const telemetry = step?.telemetry.filter(event => event.type !== "evidence") ?? [];
      const view = node.data.presetId === "hospital-store" ? { counts: step?.counts, telemetry, hospitalRunId: id, hospitalComplete: record.status === "completed", exportNote, exporting }
        : node.data.presetId === "mrf-hospital-maintainer" ? { counts: step?.counts, telemetry, modelRepair: repairNote }
        : node.data.presetId === "hospital-analyst" ? { counts: step?.counts, telemetry, analystText: record.report_md ?? "", summaryNote: model.rejected !== undefined ? `Summary rejected by guard: ${model.rejected} unsupported figures` : model.summary ? "Model summary · guard passed" : model.unavailable ? "model unavailable, golden path used" : "" } : null;
      if (view) {
        store.setNodeStatus(node.id, node.data.status, JSON.stringify(view), node.data.verification);
      }
    }
  }, [record, id, model, exportNote, exporting]);
  const start = async () => {
    if (signedOut) return;
    const controller = new AbortController(); active.current?.abort(); active.current = controller; handles.current = [];
    const signal = controller.signal, timeout = setTimeout(() => controller.abort(), 180_000);
    setBusy(true); setError(""); setArtifactError(""); setId(""); setRecord(null); setModel({}); setExportNote(""); exportLink.current = "";
    const store = useStore.getState(); store.resetRun(); store.markRunStart(); store.setPipelineStage("execute");
    try {
      const created = await pipelineRequest("/api/pipeline/run", { source: "south-shore", inject_error: inject }, signal, accessToken);
      if (signal.aborted) return;
      setId(created.run_id);
      for (;;) {
        const snapshot = await pipelineRequest(runPath(created.run_id), undefined, signal, accessToken) as PipelineRecord;
        if (signal.aborted) return;
        setRecord(snapshot);
        for (const step of snapshot.steps) for (const node of useStore.getState().nodes.filter(n => presets[step.node]?.includes(n.data.presetId))) {
          store.setNodeStatus(node.id, step.status === "completed" ? "done" : step.status === "failed" ? "error" : step.status === "pending" ? "queued" : "processing",
            JSON.stringify({ counts: step.counts, telemetry: step.telemetry.filter(event => event.type !== "evidence") }), step.status === "completed" ? "checked_locally" : "proposal");
        }
        if (snapshot.status === "failed") { store.setPipelineStage("fail"); throw new Error("Recorded hospital pipeline failed"); }
        if (snapshot.status === "completed") {
          store.setPipelineStage("complete");
          if (adapter) prepareLocalModel?.();
          const proposals = adapter ? await hospitalModels(adapter, created.run_id, snapshot, budget, signal, handle => handles.current.push(handle), accessToken) : { unavailable: true };
          if (!signal.aborted) setModel(proposals);
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (failure) { if (!signal.aborted) { store.setPipelineStage("fail"); setError(failure instanceof Error ? failure.message : "Local pipeline unavailable"); } }
    finally { clearTimeout(timeout); if (active.current === controller) { setBusy(false); store.markRunEnd(); } }
  };
  const exportRun = async () => {
    if (signedOut) return;
    setExporting(true); exportLink.current = "";
    try {
      const response = await fetch(`${runPath(id)}/export`, { method: "POST", headers: pipelineHeaders(accessToken), cache: "no-store", redirect: "error" });
      const result = await response.json();
      exportLink.current = result.status === "exported" ? result.folder_link : "";
      setExportNote(result.status === "exported" ? "Exported to Drive" : result.reason === "drive_export_unavailable" ? "Drive not configured" : `Export unavailable: ${result.reason ?? "run unavailable"}`);
    } catch { setExportNote("Export unavailable: connection failed"); }
    finally { setExporting(false); }
  };
  useEffect(() => {
    const onExport = (event: Event) => { if (record?.status === "completed" && !exporting && (event as CustomEvent).detail?.runId === id) void exportRun(); };
    window.addEventListener(HOSPITAL_EXPORT_EVENT, onExport);
    return () => window.removeEventListener(HOSPITAL_EXPORT_EVENT, onExport);
  }, [record?.status, id, exporting]);
  const events = record?.steps.flatMap(step => step.telemetry) ?? [], top = events.find(event => event.type === "top10");
  return <section className="glass space-y-2 p-3 text-xs" aria-label="Hospital pipeline">
    <h2 className="font-semibold">Hospital pipeline · deterministic record</h2>
    <label className="block"><input type="checkbox" checked={inject} disabled={busy || signedOut} onChange={event => setInject(event.target.checked)} /> Inject rate-key error (injected)</label>
    {signedOut && <p role="status">Sign in to run the pipeline</p>}
    <button className="glass p-2 disabled:opacity-50" disabled={busy || exporting || signedOut} onClick={() => void start()}>Run hospital pipeline</button>
    {busy && <p role="status">Pipeline / model proposals running…</p>}
    {error && <p role="alert">{error}</p>}
    {artifactError && <p role="alert">{artifactError}</p>}
    {record?.steps.map(step => <div key={step.node}>
      <strong>{stepNames[step.node] ?? step.node}</strong>: {step.status}
      <span className="ml-1 text-white/70">· {humanSummary(step)}</span>
      <details className="mt-1"><summary>Show details</summary><pre className="max-h-56 overflow-auto whitespace-pre-wrap">{JSON.stringify(step.telemetry.filter(event => !["evidence", "top10"].includes(event.type)), null, 2)}</pre></details>
      {step.node === "builder" && model.repair && <p>Model repair: {model.repair.valid ? "valid" : "invalid"} / {model.matchesRepair ? "matches golden" : "differs from golden"}</p>}
    </div>)}
    {model.mapping && <p>Model mapping: {model.mapping.valid ? "valid" : "invalid"} / {model.mapping.matches_golden ? "matches golden" : "differs from golden"}</p>}
    {model.unavailable && <p className="text-white/60">model unavailable, golden path used</p>}
    {top && <section aria-label="Golden SQL report" className="space-y-2">
      <h3 className="font-semibold">Golden SQL report</h3>
      <p>Commercial vs Medicare Managed Care Plan median, this hospital's file</p>
      <p className="text-white/60">{String(top.baseline_label)}</p>
      <p className="text-white/60">{Array.isArray(top.rows) ? top.rows.length : 0} comparison groups</p>
      <button type="button" className="glass rounded-lg px-3 py-1 text-sm" onClick={openHospitalReportDialog}>Open full report</button>
    </section>}
    {model.summary && <p data-testid="hospital-report-summary">{model.summary}</p>}
    {model.rejected !== undefined && <p>Summary rejected by guard: {model.rejected} unsupported figures</p>}
    {model.summary && <p>Model summary · guard passed; recorded report remains golden</p>}
    {record?.status === "completed" && !signedOut && <><p>Recorded artifacts: {["rows.csv", "report.csv", "mrf.sqlite", "report.md"].map(file => {
      const href = `${runPath(id)}/artifacts/${file}`;
      return <a className="mr-2 underline" key={file} href={href} onClick={event => {
        if (!accessToken) return;
        event.preventDefault();
        setArtifactError("");
        void fetch(href, { headers: pipelineHeaders(accessToken), cache: "no-store", redirect: "error" }).then(async response => {
          if (!response.ok) { setArtifactError(`Artifact unavailable (${response.status})`); return; }
          const url = URL.createObjectURL(await response.blob());
          const save = document.createElement("a"); save.href = url; save.download = file; save.click(); URL.revokeObjectURL(url);
        }).catch(() => { setArtifactError("Artifact unavailable: connection failed"); });
      }}>{file}</a>;
    })}</p>
      <button className="glass p-2 disabled:opacity-50" disabled={exporting} onClick={() => void exportRun()}>Export to Google Drive (direct API, not MCP)</button></>}
    {exportNote && <p className="text-white/80" role="status">{exportLink.current ? <a className="underline" href={exportLink.current}>{exportNote}</a> : exportNote === "Export unavailable: drive_export_unavailable" ? "Drive not configured" : exportNote}</p>}
  </section>;
}
