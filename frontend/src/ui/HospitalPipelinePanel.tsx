import { useEffect, useRef, useState } from "react";
import type { RhmAdapter, RunHandle } from "../adapters/RhmAdapter";
import { useStore } from "../state/store";
import { HOSPITAL_EXPORT_EVENT, hospitalModels, pipelineRequest, runPath, type ModelView, type PipelineRecord } from "../run/hospitalPipeline";
const presets: Record<string, string[]> = { source: ["hospital-source"], builder: ["mrf-hospital-builder", "mrf-hospital-maintainer"], store: ["hospital-store"], analyst: ["hospital-analyst"] };
export default function HospitalPipelinePanel({ adapter, budget, prepareLocalModel }: { adapter: RhmAdapter | null; budget: number; prepareLocalModel?: () => void }) {
  const [record, setRecord] = useState<PipelineRecord | null>(null), [id, setId] = useState("");
  const [inject, setInject] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState("");
  const [model, setModel] = useState<ModelView>({}), [exportNote, setExportNote] = useState(""), [exporting, setExporting] = useState(false);
  const active = useRef<AbortController | null>(null), handles = useRef<RunHandle[]>([]), exportLink = useRef("");
  useEffect(() => () => { active.current?.abort(); for (const handle of handles.current) void adapter?.cancel(handle).catch(() => undefined); }, [adapter]);
  useEffect(() => {
    if (!record || !id) return;
    const store = useStore.getState(), repaired = record.steps.flatMap(step => step.telemetry).some(event => event.type === "repair" && event.label === "injected");
    const repairNote = model.repair ? `Model repair: ${model.repair.valid ? "valid" : "invalid"} / ${model.matchesRepair ? "matches golden" : "differs from golden"}` : model.unavailable ? "model unavailable, golden path used" : "";
    for (const node of store.nodes) {
      const view = node.data.presetId === "hospital-store" ? { hospitalRunId: id, hospitalComplete: record.status === "completed", exportNote, exporting }
        : node.data.presetId === "mrf-hospital-maintainer" ? { goldenRepair: repaired ? "Golden repair: injected · checks recorded" : "", modelRepair: repairNote }
        : node.data.presetId === "hospital-analyst" ? { analystText: model.summary ?? record.report_md ?? "", summaryNote: model.rejected !== undefined ? `Summary rejected by guard: ${model.rejected} unsupported figures` : model.summary ? "Model summary · guard passed" : model.unavailable ? "model unavailable, golden path used" : "" } : null;
      if (view) {
        const step = record.steps.find(step => presets[step.node]?.includes(node.data.presetId));
        store.setNodeStatus(node.id, node.data.status, JSON.stringify({ counts: step?.counts, telemetry: step?.telemetry.filter(event => event.type !== "evidence"), ...view }), node.data.verification);
      }
    }
  }, [record, id, model, exportNote, exporting]);
  const start = async () => {
    const controller = new AbortController(); active.current?.abort(); active.current = controller; handles.current = [];
    const signal = controller.signal, timeout = setTimeout(() => controller.abort(), 180_000);
    setBusy(true); setError(""); setId(""); setRecord(null); setModel({}); setExportNote(""); exportLink.current = "";
    const store = useStore.getState(); store.resetRun(); store.markRunStart(); store.setPipelineStage("execute");
    try {
      const created = await pipelineRequest("/api/pipeline/run", { source: "south-shore", inject_error: inject }, signal);
      if (signal.aborted) return;
      setId(created.run_id);
      for (;;) {
        const snapshot = await pipelineRequest(runPath(created.run_id), undefined, signal) as PipelineRecord;
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
          const proposals = adapter ? await hospitalModels(adapter, created.run_id, snapshot, budget, signal, handle => handles.current.push(handle)) : { unavailable: true };
          if (!signal.aborted) setModel(proposals);
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (failure) { if (!signal.aborted) { store.setPipelineStage("fail"); setError(failure instanceof Error ? failure.message : "Local pipeline unavailable"); } }
    finally { clearTimeout(timeout); if (active.current === controller) { setBusy(false); store.markRunEnd(); } }
  };
  const exportRun = async () => {
    setExporting(true); exportLink.current = "";
    try {
      const response = await fetch(`${runPath(id)}/export`, { method: "POST", cache: "no-store", redirect: "error" });
      const result = await response.json();
      exportLink.current = result.status === "exported" ? result.folder_link : "";
      setExportNote(result.status === "exported" ? "Exported to Drive" : `Export unavailable: ${result.reason ?? "run unavailable"}`);
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
    <label className="block"><input type="checkbox" checked={inject} disabled={busy} onChange={event => setInject(event.target.checked)} /> Inject rate-key error (injected)</label>
    <button className="glass p-2 disabled:opacity-50" disabled={busy || exporting} onClick={() => void start()}>Run hospital pipeline</button>
    {busy && <p role="status">Pipeline / model proposals running…</p>}
    {error && <p role="alert">{error}</p>}
    {record?.steps.map(step => <div key={step.node}>
      <strong>{step.node === "store" ? "Store · local SQLite" : step.node}</strong>: {step.status} {JSON.stringify(step.counts)}
      {step.telemetry.filter(event => !["evidence", "top10"].includes(event.type)).map((event, index) => <details key={index}>
        <summary>{event.type === "repair" ? "Furnace · golden repair" : event.type} {String(event.label ?? "")}</summary><pre className="max-h-32 overflow-auto whitespace-pre-wrap">{JSON.stringify(event, null, 2)}</pre>
      </details>)}
      {step.node === "builder" && model.repair && <p>Model repair: {model.repair.valid ? "valid" : "invalid"} / {model.matchesRepair ? "matches golden" : "differs from golden"}</p>}
    </div>)}
    {model.mapping && <p>Model mapping: {model.mapping.valid ? "valid" : "invalid"} / {model.mapping.matches_golden ? "matches golden" : "differs from golden"}</p>}
    {model.unavailable && <p className="text-white/60">model unavailable, golden path used</p>}
    {top && <><p>{String(top.baseline_label)}</p><p>{Array.isArray(top.rows) ? top.rows.length : 0} eligible SQL groups (up to 10)</p>
      <pre className="max-h-44 overflow-auto whitespace-pre-wrap">{JSON.stringify(top.rows, null, 2)}</pre></>}
    {model.rejected !== undefined && <p>Summary rejected by guard: {model.rejected} unsupported figures</p>}
    {model.summary && <p>Model summary · guard passed; recorded report remains golden</p>}
    {record?.report_md && <pre className="max-h-64 overflow-auto whitespace-pre-wrap" data-testid="hospital-report">{model.summary ?? record.report_md}</pre>}
    {record?.status === "completed" && <><p>Recorded artifacts: {["rows.csv", "mrf.sqlite", "report.md"].map(file => <a className="mr-2 underline" key={file} href={`${runPath(id)}/artifacts/${file}`}>{file}</a>)}</p>
      <button className="glass p-2 disabled:opacity-50" disabled={exporting} onClick={() => void exportRun()}>Export to Google Drive (direct API, not MCP)</button></>}
    {exportNote && <p className="text-white/60" role="status">{exportLink.current ? <a className="underline" href={exportLink.current}>{exportNote}</a> : exportNote}</p>}
  </section>;
}
