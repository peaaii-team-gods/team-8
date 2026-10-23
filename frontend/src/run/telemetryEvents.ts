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

/** Download-export of session telemetry JSON is deferred (see root TODO.md). */
