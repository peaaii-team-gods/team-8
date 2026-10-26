import { useState } from "react";
import { Activity, ChevronDown, Download } from "lucide-react";
import { useStore } from "../state/store";
import { formatTokens, formatUsageCost } from "../run/telemetry";
import { buildObservability } from "../run/observability";
import { buildSessionDownload, downloadSessionJson } from "../run/sessionDownload";
import StageStrip from "./StageStrip";

const DOT: Record<string, string> = {
  idle: "bg-white/30",
  queued: "bg-amber-300",
  processing: "bg-fuchsia-300 animate-pulse",
  done: "bg-emerald-300",
  error: "bg-rose-300",
};

export default function MetricsPanel() {
  const { tracks, totals, runStartedAt, runEndedAt, pipelineStage, scenarioId, nodes, sessionId, telemetryEvents } = useStore();
  const [open, setOpen] = useState(true);
  const max = Math.max(1, ...tracks.map((t) => t.metrics.totalTokens));
  const lakeCount = nodes.filter((n) => n.data.kind === "dataLake").length;
  const obs = buildObservability({
    tracks, totals, runStartedAt, runEndedAt, pipelineStage, scenarioId, lakeCount, sessionId, events: telemetryEvents,
  });
  return (
    <aside className="glass w-full p-4 text-sm" data-testid="metrics-panel">
      <button type="button" className="flex w-full items-center gap-2 text-left font-semibold" onClick={() => setOpen((v) => !v)}>
        <Activity size={14} className="text-fuchsia-300" /> Observability
        <ChevronDown size={14} className={`ml-auto opacity-60 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <>
        <div className="my-2"><StageStrip /></div>
        <div className="my-3 grid grid-cols-2 gap-2 text-xs">
          <div className="glass p-2"><div className="opacity-60">Tokens</div><div className="text-lg font-semibold tabular-nums">{formatTokens(totals.totalTokens)}</div></div>
          <div className="glass p-2">
            <div className="opacity-60">Cost</div>
            <div className="text-lg font-semibold tabular-nums">{formatUsageCost(totals)}</div>
            <div className="text-[10px] opacity-50">{totals.costKnown === true ? "Provider reported" : "No verified billed cost"}</div>
          </div>
          <div className="glass p-2"><div className="opacity-60">Latency</div><div className="tabular-nums">{obs.latencyMs == null ? "—" : `${obs.latencyMs} ms`}</div></div>
          <div className="glass p-2"><div className="opacity-60">Agents finished</div><div className="tabular-nums">{obs.agentsFinished}/{obs.agentsTotal}</div></div>
          <div className="glass p-2"><div className="opacity-60">Outcome</div><div>{obs.outcome}{obs.completionBasis ? ` · ${obs.completionBasis}` : ""}</div></div>
          <div className="glass p-2"><div className="opacity-60">Source</div><div>{scenarioId === "hospital-pipeline" ? "Local pipeline" : obs.source}</div></div>
        </div>
        {scenarioId !== "hospital-pipeline" && <div className="mb-2 grid grid-cols-2 gap-2 text-[10px]">
          <div className="glass p-2">Lake fixtures · {obs.lakesTouched}</div>
          <div className="glass p-2">Repairs applied · {obs.repairsAttempted ?? "—"}</div>
          <div className="glass p-2">QC pass · {obs.qcPassRate}</div>
          <div className="glass p-2">Drift · {obs.driftDetected == null ? "—" : obs.driftDetected ? "yes" : "no"}</div>
        </div>}
        <div className="mb-2 text-[10px] opacity-60">
          Set the USD admission budget before Run. Hard billing limits belong on the provider key. Unknown cost does not mean free.
        </div>
        <button
          type="button"
          data-testid="download-session"
          className="mb-2 inline-flex items-center gap-1 text-xs text-fuchsia-200"
          onClick={() => downloadSessionJson(buildSessionDownload({
            sessionId, scenarioId, events: telemetryEvents,
          }))}
        >
          <Download size={12} /> Download session JSON
        </button>
        {tracks.length === 0 ? (
          <p className="text-xs opacity-70">Press + or load a demo scenario. Agents are tracked here immediately.</p>
        ) : (
          <ul className="max-h-44 space-y-2 overflow-auto text-xs">
            {tracks.map((t) => (
              <li key={t.nodeId}>
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${DOT[t.status ?? "idle"]}`} />
                    {t.title}
                  </span>
                  <span className="tabular-nums opacity-80">{formatTokens(t.metrics.totalTokens)}</span>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded bg-white/10">
                  <div className="h-full bg-fuchsia-400/70" style={{ width: `${(100 * t.metrics.totalTokens) / max}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </>}
    </aside>
  );
}
