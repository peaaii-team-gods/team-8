import { useEffect, useState } from "react";
import type { LiveAdapter } from "../adapters/live";
import type { PublicRunSummary } from "../adapters/runHistory";

type Detail = PublicRunSummary & { summary: string };

export default function HistoryPanel({ mode, client }: { mode: "simulated" | "live"; client: LiveAdapter | null }) {
  const [runs, setRuns] = useState<PublicRunSummary[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (mode !== "live" || !client) return;
    let cancelled = false;
    setError(null);
    void client.listRuns().then((page) => {
      if (cancelled) return;
      setRuns(page.runs);
      setNote(page.note);
    }).catch(() => {
      if (!cancelled) setError("Could not read runs.");
    });
    return () => { cancelled = true; };
  }, [mode, client]);

  const open = (runId: string) => {
    if (!client) return;
    setCopied(false);
    void client.runDetail(runId).then(setDetail).catch(() => setError("Could not read that run."));
  };

  return (
    <aside className="glass w-full p-3 text-xs" data-testid="history-panel">
      <h2 className="mb-1 font-semibold">Run history</h2>
      {mode !== "live" && (
        <p>Simulated mode has no server history. This canvas is not reading the API.</p>
      )}
      {mode === "live" && !client && (
        <p>Sign in to read runs from the API. Nothing is stored in this browser.</p>
      )}
      {mode === "live" && client && (
        <>
          <p className="mb-2 opacity-60">Runs for your workspaces. Workflows are not listed; this API summary has no workflow list. Model text stays off this panel.</p>
          {error && <p role="alert" className="mb-2 text-rose-200">{error}</p>}
          {note && <p className="mb-2 opacity-80">{note}</p>}
          {runs.length > 0 && (
            <ul className="mb-2 max-h-40 space-y-1 overflow-auto">
              {runs.map((run) => (
                <li key={run.runId}>
                  <button type="button" className="w-full text-left" onClick={() => open(run.runId)}>
                    <span className="font-mono">{run.runId.slice(0, 12)}</span>
                    {" · "}{run.status}
                    {" · "}{run.completionBasis ?? "—"}
                    {" · "}{run.updatedAt ?? run.createdAt ?? "—"}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {detail && (
            <div className="border-t border-white/10 pt-2" data-testid="run-detail">
              <div className="font-mono">{detail.runId}</div>
              <p>{detail.summary}</p>
              <p className="opacity-70">workflow {detail.workflowId ?? "—"} · workspace {detail.workspaceId ?? "—"}</p>
              <p className="opacity-70">started {detail.createdAt ?? "—"} · updated {detail.updatedAt ?? "—"}</p>
              <p className="opacity-70">This run is not drawn on the canvas. The graph in this tab is only what you built here.</p>
              <button
                type="button"
                className="mt-1 underline"
                onClick={() => {
                  void navigator.clipboard?.writeText(detail.runId).then(() => setCopied(true)).catch(() => setCopied(false));
                }}
              >
                Copy run id
              </button>
              {copied && <span className="ml-2 opacity-70">Copied</span>}
            </div>
          )}
        </>
      )}
    </aside>
  );
}
