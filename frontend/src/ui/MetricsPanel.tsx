import { useState } from "react";
import { Activity, ChevronDown } from "lucide-react";
import { useStore } from "../state/store";
import { formatTokens, formatUsd } from "../run/telemetry";

const DOT: Record<string, string> = {
  idle: "bg-white/30",
  queued: "bg-amber-300",
  processing: "bg-fuchsia-300 animate-pulse",
  done: "bg-emerald-300",
  error: "bg-rose-300",
};

export default function MetricsPanel() {
  const { tracks, totals } = useStore();
  const [open, setOpen] = useState(true);
  const max = Math.max(1, ...tracks.map((t) => t.metrics.totalTokens));
  return (
    <aside className="glass p-4 text-sm w-full" data-testid="metrics-panel">
      <button type="button" className="flex items-center gap-2 font-semibold w-full text-left" onClick={() => setOpen((v) => !v)}>
        <Activity size={14} className="text-fuchsia-300" /> Token & cost
        <ChevronDown size={14} className={`ml-auto opacity-60 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <>
        <div className="grid grid-cols-2 gap-2 text-xs my-3">
          <div className="glass p-2"><div className="opacity-60">Tokens</div><div className="text-lg font-semibold tabular-nums">{formatTokens(totals.totalTokens)}</div></div>
          <div className="glass p-2"><div className="opacity-60">Cost</div><div className="text-lg font-semibold tabular-nums">{formatUsd(totals.costUsd)}</div></div>
          <div className="glass p-2"><div className="opacity-60">Prompt</div><div className="tabular-nums">{formatTokens(totals.promptTokens)}</div></div>
          <div className="glass p-2"><div className="opacity-60">Completion</div><div className="tabular-nums">{formatTokens(totals.completionTokens)}</div></div>
        </div>
        <div className="text-[10px] opacity-60 mb-2">
          Budget cap on each workflow is $0.00. {totals.source === "live" ? "Figures are from run receipts." : "Simulated runs estimate tokens and keep cost at $0 until a live receipt reports otherwise."}
        </div>
        {tracks.length === 0 ? (
          <p className="text-xs opacity-70">Press + and spawn an agent. It is tracked here immediately, before you run anything.</p>
        ) : (
          <ul className="text-xs space-y-2 max-h-44 overflow-auto">
            {tracks.map((t) => (
              <li key={t.nodeId}>
                <div className="flex justify-between gap-2 items-center">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${DOT[t.status ?? "idle"]}`} />
                    <span className="truncate">{t.title}</span>
                    <span className="opacity-50 shrink-0">{t.status ?? "idle"}</span>
                  </span>
                  <span className="opacity-80 tabular-nums shrink-0">{formatTokens(t.metrics.totalTokens)} · {formatUsd(t.metrics.costUsd)}</span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-fuchsia-300/80" style={{ width: `${(t.metrics.totalTokens / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </>}
    </aside>
  );
}
