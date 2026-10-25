import { useEffect, useState } from "react";
import type { WorkspaceBinding } from "../compile/toWorkflow";
import { selectBinding } from "../compile/toWorkflow";
import type { ReadinessPort } from "../adapters/readiness";
import { SERVICE_FEATURES, featureChip } from "../registry/services.manifest";
import { useStore } from "../state/store";

const CHIP: Record<string, string> = {
  live: "bg-emerald-400/20 text-emerald-100",
  unavailable: "bg-white/10 text-white/70",
  unknown: "bg-amber-400/15 text-amber-100",
};

export default function ReadinessPanel({
  mode,
  port,
  selectedWorkspaceId,
  onSelectWorkspace,
}: {
  mode: "simulated" | "live";
  port: ReadinessPort;
  selectedWorkspaceId: string | null;
  onSelectWorkspace: (workspaceId: string) => void;
}) {
  const hospitalScenario = useStore((state) => state.scenarioId === "hospital-pipeline");
  const [capabilities, setCapabilities] = useState<Record<string, unknown> | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceBinding[]>([]);
  const [capsError, setCapsError] = useState<string | null>(null);
  const [wsError, setWsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void Promise.all([
      port.capabilities().then((report) => ({ report, error: null as string | null })).catch(() => ({ report: null, error: "Could not read capabilities." })),
      port.workspaces().then((list) => ({ list, error: null as string | null })).catch(() => ({ list: [] as WorkspaceBinding[], error: "Could not read workspaces." })),
    ]).then(([caps, spaces]) => {
      if (cancelled) return;
      setCapabilities(caps.report);
      setCapsError(caps.report ? null : caps.error ?? "Capabilities unavailable.");
      setWorkspaces(spaces.list);
      setWsError(spaces.error);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [port, reload]);

  const ready = workspaces.filter((workspace) => workspace.status === "ready" && workspace.workspace_id && workspace.project_id && workspace.task_id);
  const bound = selectBinding(workspaces, selectedWorkspaceId ?? undefined);
  const unavailableFeatures = SERVICE_FEATURES.filter((feature) => featureChip(feature, capabilities) === "unavailable");
  const visibleFeatures = hospitalScenario
    ? SERVICE_FEATURES.filter((feature) => featureChip(feature, capabilities) !== "unavailable")
    : SERVICE_FEATURES;

  return (
    <aside className="glass w-full p-3 text-xs" data-testid="readiness-panel" onClick={(e) => e.stopPropagation()}>
      <div className="mb-2 flex items-center gap-2">
        <h2 className="font-semibold">Readiness</h2>
        <button type="button" className="ml-auto opacity-70" onClick={() => setReload((n) => n + 1)}>Refresh</button>
      </div>
      {mode !== "live" && (
        <p className="mb-2 opacity-80">Sign in / live mode for binding. These chips are not a live report, and they do not turn tools on.</p>
      )}
      {mode === "live" && (
        <p className="mb-2 opacity-60">A green chip is a fetched capability. Run still emits tools only through the hosted gate plus a bound workspace.</p>
      )}
      {hospitalScenario && <p className="mb-2" data-testid="hospital-readiness-summary">RHM live stack: not connected - golden path used</p>}
      {loading && <p className="mb-2 opacity-60">Reading readiness…</p>}
      {capsError && <p className="mb-2 text-amber-100" role="alert">{capsError}</p>}
      <ul className="mb-3 space-y-1">
        {visibleFeatures.map((feature) => {
          const chip = featureChip(feature, capabilities);
          return (
            <li key={feature.id} className="flex items-center justify-between gap-2">
              <span>{feature.feature}</span>
              <span data-testid={`cap-${feature.id}`} className={`rounded-full px-2 py-0.5 uppercase ${CHIP[chip]}`}>{chip}</span>
            </li>
          );
        })}
      </ul>
      {hospitalScenario && unavailableFeatures.length > 0 && (
        <details className="mb-3">
          <summary>Unavailable capabilities ({unavailableFeatures.length})</summary>
          <ul className="mt-1 space-y-1">
            {unavailableFeatures.map((feature) => (
              <li key={feature.id} className="flex items-center justify-between gap-2">
                <span>{feature.feature}</span>
                <span data-testid={`cap-${feature.id}`} className={`rounded-full px-2 py-0.5 uppercase ${CHIP.unavailable}`}>unavailable</span>
              </li>
            ))}
          </ul>
        </details>
      )}
      <div className="mb-1 font-semibold">Workspaces</div>
      {wsError && <p className="mb-2 text-rose-200" role="alert">{wsError}</p>}
      {!wsError && ready.length === 0 && (
        <p className="mb-2 opacity-80">No ready workspace. The next Run will not bind.</p>
      )}
      {ready.length > 1 && !bound && (
        <p className="mb-2 opacity-80">Choose a workspace. The next Run will not guess.</p>
      )}
      {ready.length === 1 && (
        <p className="mb-2 opacity-70">Exactly one ready workspace, so the next Run auto-binds it.</p>
      )}
      {ready.length > 0 && (
        <ul className="mb-2 space-y-1">
          {ready.map((workspace) => {
            const checked = bound?.workspace_id === workspace.workspace_id;
            return (
              <li key={workspace.workspace_id}>
                <label className="flex items-start gap-2">
                  <input
                    type="radio"
                    name="readiness-workspace"
                    value={workspace.workspace_id}
                    checked={checked}
                    onChange={() => onSelectWorkspace(workspace.workspace_id)}
                  />
                  <span>
                    <span className="font-mono">{workspace.workspace_id}</span>
                    <span className="opacity-60"> · {workspace.status}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      )}
      {workspaces.some((workspace) => workspace.status !== "ready") && (
        <ul className="mb-2 space-y-1 opacity-60">
          {workspaces.filter((workspace) => workspace.status !== "ready").map((workspace) => (
            <li key={workspace.workspace_id}>{workspace.workspace_id} · {workspace.status ?? "unknown"} · not selectable</li>
          ))}
        </ul>
      )}
      <p data-testid="bound-workspace">Bound for next Run: {bound ? bound.workspace_id : "none"}</p>
    </aside>
  );
}
