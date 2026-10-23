/** Session-local client telemetry. Asset/run IDs are private context and must
 * never be forwarded into hosted platform accounting under the custody contract. */

export type TelemetrySource = "simulated" | "live" | "estimated";

export type TelemetryStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled" | "unknown";

export interface TelemetryUsage {
  tokens_eval: number;
  tokens_gen: number;
  tokens_estimated: boolean;
  usd_cost: number | null;
  cost_known: boolean;
  ticks: number;
}

export interface TelemetryScience {
  qc_outcome?: "pass" | "fail" | "unknown";
  denial_risk?: "low" | "medium" | "high";
  repair_applied?: boolean;
  drift_detected?: boolean;
}

export interface TelemetryEvent {
  schema_version: "canvas.telemetry.v1";
  session_id: string;
  scenario_id?: string;
  run_id?: string;
  workflow_id?: string;
  agent_node_id: string;
  agent_preset_id: string;
  lake_fixture_ids: string[];
  model_id?: string;
  t_start_ms: number;
  t_end_ms?: number;
  status: TelemetryStatus;
  completion_basis?: string;
  usage: TelemetryUsage;
  science?: TelemetryScience;
  source: TelemetrySource;
}

export const newSessionId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const emptyTelemetryUsage = (estimated = true): TelemetryUsage => ({
  tokens_eval: 0,
  tokens_gen: 0,
  tokens_estimated: estimated,
  usd_cost: estimated ? 0 : null,
  cost_known: false,
  ticks: 0,
});

/** Session JSON exported from the Observability panel. Token counts stay; credentials do not. */
export interface SessionDownload {
  schema_version: "canvas.session.v1";
  session_id: string;
  scenario_id: string | null;
  exported_at: string;
  events: TelemetryEvent[];
}

export function buildSessionDownload(args: {
  sessionId: string;
  scenarioId?: string | null;
  events: TelemetryEvent[];
  exportedAt?: Date | string;
}): SessionDownload {
  const at = args.exportedAt instanceof Date
    ? args.exportedAt.toISOString()
    : args.exportedAt ?? new Date().toISOString();
  return {
    schema_version: "canvas.session.v1",
    session_id: args.sessionId,
    scenario_id: args.scenarioId ?? null,
    exported_at: at,
    events: args.events.map((event) => ({ ...event, usage: { ...event.usage }, lake_fixture_ids: [...event.lake_fixture_ids] })),
  };
}

export function sessionDownloadFilename(doc: SessionDownload): string {
  const stamp = doc.exported_at.replace(/[:.]/g, "-");
  return `canvas-session-${stamp}.json`;
}
