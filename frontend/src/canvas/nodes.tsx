import { Handle, Position, NodeToolbar, type NodeProps } from "@xyflow/react";
import { Bot, Braces, Database, Link2, Trash2, Unplug } from "lucide-react";
import type { CanvasNode } from "../state/store";
import { useStore } from "../state/store";
import { formatTokens, formatUsageCost } from "../run/telemetry";
import { matchingSchemaId, parseSchemaText } from "../registry/schemas";
import { attachmentById, mcpPosture } from "../registry/mcpLinkage";
import { HOSPITAL_EXPORT_EVENT } from "../run/hospitalPipeline";
import HospitalReportTable, { openHospitalReportDialog } from "../ui/HospitalReportTable";

const ACCENT: Record<string, string> = {
  emerald: "#34d399",
  purple: "#c084fc",
  fuchsia: "#e879f9",
  amber: "#fbbf24",
  cyan: "#22d3ee",
  blue: "#93c5fd",
  teal: "#2dd4bf",
  indigo: "#818cf8",
  rose: "#fb7185",
  lime: "#a3e635",
};

function Shell({ data, id, isLake }: { data: CanvasNode["data"]; id: string; isLake?: boolean }) {
  const { beginLink, removeNode, openSchema, openMcp, uiState, tracks, inspectLake, runStartedAt, runEndedAt, edges, nodes, linkageContext } = useStore();
  const running = runStartedAt !== null && runEndedAt === null;
  const track = tracks.find((t) => t.nodeId === id);
  const busy = data.status === "processing" || data.status === "queued";
  const accent = ACCENT[data.color] ?? "#c084fc";
  let hospitalView: Record<string, unknown> = {};
  if (["hospital-source", "hospital-store", "mrf-hospital-maintainer", "hospital-analyst"].includes(data.presetId)) {
    try { const view = JSON.parse(data.output ?? "{}"); if (view && typeof view === "object" && !Array.isArray(view)) hospitalView = view; } catch { /* No run receipt yet. */ }
  }
  const telemetry = Array.isArray(hospitalView.telemetry) ? hospitalView.telemetry as { type: string; [key: string]: unknown }[] : [];
  const trace = telemetry.find(event => event.type === "trace") as { trace?: { url?: string; bytes?: number }[]; sha256?: string } | undefined;
  const checks = telemetry.filter(event => event.type === "checks").flatMap(event => Array.isArray(event.checks) ? event.checks as Record<string, unknown>[] : []);
  const failedRate = checks.find(check => check.name === "fields.rate" && check.pass === false);
  const failedRows = checks.find(check => check.name === "inserted_row_count" && check.pass === false);
  const repair = telemetry.find(event => event.type === "repair" && event.label === "injected");
  const repairedRows = Array.isArray(repair?.checks) ? (repair.checks as Record<string, unknown>[]).find(check => check.name === "inserted_row_count") : undefined;
  const top = telemetry.find(event => event.type === "top10");
  const counts = hospitalView.counts as Record<string, unknown> | undefined;
  const reportNotes = typeof hospitalView.analystText === "string"
    ? hospitalView.analystText.split(/\r?\n/).map(line => line.trim()).filter(line => /^(Small-n medians|Percent\/algorithm prices|Excluded non-dollar payer entries:|Quarantined source items:)/.test(line))
    : [];
  const hospitalNode = ["hospital-source", "mrf-hospital-builder", "mrf-hospital-maintainer", "hospital-store", "hospital-analyst"].includes(data.presetId);
  const tethered = edges
    .filter((e) => e.target === id)
    .map((e) => nodes.find((n) => n.id === e.source && n.data.kind === "dataLake"))
    .filter((n): n is NonNullable<typeof n> => !!n);
  const attachments = (data.mcpAttachmentIds ?? [])
    .map((attachmentId) => attachmentById(attachmentId))
    .filter((a): a is NonNullable<typeof a> => !!a);
  return <div
    className={`glass px-4 py-3 ${hospitalNode ? "w-[290px]" : "w-[260px]"} ${isLake ? "rounded-[40px]" : ""} ${busy ? "agent-live" : ""}`}
    style={{ borderLeft: `3px solid ${accent}` }}
    data-testid={`node-${id}`}
    onDoubleClick={(e) => { if (isLake) { e.stopPropagation(); inspectLake(id); } }}
  >
    <Handle type="target" position={Position.Left} />
    <div className="flex items-center gap-2 font-semibold">{isLake ? <Database size={16} /> : <Bot size={16} />}{data.title}</div>
    <div className={`mt-1 ${hospitalNode ? "text-sm" : "text-xs"} opacity-70`}>{data.description}</div>
    {!isLake && data.verification && (
      <div
        className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
          data.verification === "verified" ? "bg-emerald-400/20 text-emerald-200" :
          data.verification === "checked_locally" ? "bg-sky-400/20 text-sky-100" :
          "bg-amber-400/20 text-amber-100"
        }`}
        data-testid={`verification-${id}`}
      >
        {data.verification === "verified" ? "Verified" : data.verification === "checked_locally" ? "Checked locally" : "Proposal"}
      </div>
    )}
    {!isLake && !hospitalNode && (
      <div className="mt-2 text-[10px] opacity-80" data-testid={`lakes-${id}`}>
        {tethered.length ? `Lakes: ${tethered.map((n) => n.data.title).join(", ")}` : "No lake tethered"}
      </div>
    )}
    {!isLake && !hospitalNode && (
      <div className="mt-1 text-[10px] opacity-70" data-testid={`mcp-${id}`}>
        {attachments.length
          ? attachments.map((a) => `${a.title} · ${mcpPosture(a, linkageContext).posture === "executable" ? "Executable" : "Declared"}`).join(" · ")
          : "No MCP attachment"}
      </div>
    )}
    {!hospitalNode && !isLake && data.schemaText && (
      <div className="mt-2 text-[10px] opacity-70" data-testid={`schema-${id}`}>
        {parseSchemaText(data.schemaText).ok ? `schema · ${matchingSchemaId(data.schemaText) ?? "edited"}` : "schema · invalid"}
      </div>
    )}
    {track && !isLake && !hospitalNode && (
      <div className="mt-2 text-[10px] opacity-80" data-testid={`track-${id}`}>
        tracked · {formatTokens(track.metrics.totalTokens)} tok · {formatUsageCost(track.metrics)}
        {track.runId ? ` · ${track.runId.slice(0, 18)}` : ""}
      </div>
    )}
    {data.status && <div className="mt-2 text-xs capitalize">Status: {data.status}</div>}
    {trace?.trace?.map((source, index) => <div className="mt-2 break-all text-sm text-white/70" key={source.url ?? index}>
      <div>{source.url} · {source.bytes} bytes</div>
      {source.url?.endsWith(".json") && trace.sha256 && <div>MRF SHA-256: {trace.sha256.slice(0, 8)}</div>}
    </div>)}
    {failedRate && <p className="mt-2 text-sm text-rose-200">Injected error: fields.rate expected {String(failedRate.expected)}, got {String(failedRate.actual)}{typeof failedRows?.actual === "number" && typeof failedRows.expected === "number" && failedRows.pass === false ? ` - ${failedRows.actual}/${failedRows.expected} rows` : ""}</p>}
    {repairedRows?.pass === true && <p className="mt-2 text-sm text-emerald-200">Golden repair: {String(repairedRows.actual)}/{String(repairedRows.expected)} rows restored</p>}
    {data.presetId === "hospital-source" && typeof counts?.parse_mode === "string" && <p className="mt-2 text-sm text-white/80" data-testid={`parse-mode-${id}`}>{counts.parse_mode === "streamed" ? "streamed" : "parsed in memory"}{typeof counts.items_parsed === "number" ? ` · ${counts.items_parsed} items` : ""}{typeof counts.bytes_streamed === "number" ? ` · ${counts.bytes_streamed} bytes` : ""}</p>}
    {typeof counts?.rows_per_s === "number" && <p className="mt-1 text-[11px] text-white/70">{String(counts.rows_emitted ?? counts.row_count ?? "")} rows · {String(counts.rows_per_s)} rows/s · {String(counts.mb_per_s)} MB/s · {String(counts.stage_ms)} ms{typeof counts.rows_quarantined === "number" ? ` · ${counts.rows_quarantined} quarantined` : ""}{typeof counts.rows_repaired === "number" && counts.rows_repaired > 0 ? ` · ${counts.rows_repaired} repaired` : ""}</p>}
    {data.presetId === "hospital-store" && <p className="mt-2 text-sm text-white/80">{typeof counts?.row_count === "number" ? `${counts.row_count} rows - local SQLite` : "Waiting for row count"}</p>}
    {typeof hospitalView.modelRepair === "string" && <p className="text-sm text-white/60">{hospitalView.modelRepair}</p>}
    {data.presetId === "hospital-analyst" && <>
      {typeof hospitalView.analystText === "string" && Array.isArray(top?.rows) && <>
        <button type="button" className="nodrag mt-2 rounded-lg border border-white/20 px-3 py-1 text-sm" onClick={event => {
          event.stopPropagation();
          openHospitalReportDialog();
        }}>Open full report</button>
        <dialog id="hospital-report-modal" className="m-auto w-[96vw] max-w-[1500px] max-h-[90vh] overflow-auto rounded-xl border border-white/20 bg-[#100a1c] p-5 text-white shadow-2xl backdrop:bg-black/70">
          <div className="mb-3 flex items-start justify-between gap-4"><div><h2 className="text-lg font-semibold">{data.title}</h2><p className="mt-1 text-sm text-white/70">{data.description}</p><p className="text-xs text-white/60">{String(top.baseline_label ?? "")}</p></div>
            <form method="dialog"><button className="rounded-lg border border-white/20 px-3 py-1 text-xs">Close report</button></form></div>
          <HospitalReportTable rows={top.rows as unknown[]} spread={Array.isArray(top.spread) ? top.spread as unknown[] : []} className="w-full table-fixed" />
          {reportNotes.length > 0 && <ul className="mt-3 space-y-1 text-sm text-white/70">{reportNotes.map(note => <li key={note}>{note}</li>)}</ul>}
        </dialog>
      </>}
    </>}
    {typeof hospitalView.summaryNote === "string" && <p className="text-sm text-white/60">{hospitalView.summaryNote}</p>}
    {data.presetId === "hospital-store" && hospitalView.hospitalComplete === true && <button type="button" className="nodrag mt-2 text-left text-xs underline disabled:opacity-50" disabled={hospitalView.exporting === true}
      onClick={event => { event.stopPropagation(); window.dispatchEvent(new CustomEvent(HOSPITAL_EXPORT_EVENT, { detail: { runId: hospitalView.hospitalRunId } })); }}>Export to Google Drive (direct API, not MCP)</button>}
    {typeof hospitalView.exportNote === "string" && <p className="text-sm text-white/80">{hospitalView.exportNote}</p>}
    <Handle type="source" position={Position.Right} />
    <NodeToolbar isVisible={uiState.kind === "menu" && uiState.nodeId === id}
      position={data.presetId === "mrf-hospital-maintainer" ? Position.Left : data.presetId === "hospital-store" ? Position.Right : Position.Top}>
      <div className="glass flex gap-1 p-2">
        {isLake && <button aria-label="Inspect lake" onClick={(e) => { e.stopPropagation(); inspectLake(id); }}><Database size={14} /></button>}
        {!isLake && <button aria-label="Edit schema" disabled={running} title={running ? "Stop the run before editing the graph" : undefined} onClick={(e) => { e.stopPropagation(); openSchema(id); }}><Braces size={14} /></button>}
        {!isLake && <button aria-label="MCP attachments" disabled={running} title={running ? "Stop the run before editing the graph" : "Attach a declared MCP preset"} onClick={(e) => { e.stopPropagation(); openMcp(id); }}><Unplug size={14} /></button>}
        <button aria-label="Link from node" disabled={running} title={running ? "Stop the run before editing the graph" : isLake ? "Link this lake to an agent" : "Link this agent to another agent"} onClick={(e) => { e.stopPropagation(); beginLink(id); }}><Link2 size={14} /></button>
        <button aria-label="Delete node" disabled={running} title={running ? "Stop the run before editing the graph" : undefined} onClick={(e) => { e.stopPropagation(); removeNode(id); }}><Trash2 size={14} /></button>
      </div>
    </NodeToolbar>
  </div>;
}
export const AgentNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} />;
export const DataLakeNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} isLake />;
