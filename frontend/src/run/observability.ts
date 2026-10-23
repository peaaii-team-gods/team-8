import type { AgentTrack } from "../state/store";
import type { UsageMetrics } from "./telemetry";
import type { PipelineStage } from "../registry/types";
import type { TelemetryEvent } from "./telemetryEvents";
import { emptyTelemetryUsage } from "./telemetryEvents";

export interface ObservabilitySnapshot {
  latencyMs: number | null;
  agentsFinished: number;
  agentsTotal: number;
  outcome: string;
  completionBasis: string | null;
  lakesTouched: number;
  repairsAttempted: number | null;
  qcPassRate: string;
  driftDetected: boolean | null;
  source: UsageMetrics["source"];
  events: TelemetryEvent[];
}

export const PIPELINE_STAGES: { id: PipelineStage; label: string }[] = [
  { id: "propose", label: "Propose" },
  { id: "execute", label: "Execute" },
  { id: "fail", label: "Fail" },
  { id: "repair", label: "Repair" },
  { id: "complete", label: "Complete · proposal" },
];

export function usageToTelemetry(u: UsageMetrics, ticks = 0) {
  return {
    tokens_eval: u.promptTokens,
    tokens_gen: u.completionTokens,
    tokens_estimated: u.source !== "live",
    usd_cost: u.costUsd,
    cost_known: u.source === "live" && u.costUsd > 0,
    ticks,
  };
}

export function buildObservability(args: {
  tracks: AgentTrack[];
  totals: UsageMetrics;
  runStartedAt: number | null;
  runEndedAt: number | null;
  pipelineStage: PipelineStage;
  scenarioId: string | null;
  lakeCount: number;
  sessionId: string;
  events: TelemetryEvent[];
}): ObservabilitySnapshot {
  const latencyMs =
    args.runStartedAt != null && args.runEndedAt != null ? Math.max(0, args.runEndedAt - args.runStartedAt) : null;
  const agentsFinished = args.tracks.filter((t) => t.status === "done" || t.status === "error").length;
  return {
    latencyMs,
    agentsFinished,
    agentsTotal: args.tracks.length,
    outcome: args.pipelineStage === "complete" ? "succeeded" : args.pipelineStage === "fail" ? "failed" : args.pipelineStage === "idle" ? "idle" : "running",
    completionBasis: args.tracks.some((t) => t.status === "done") ? "agent_reported" : null,
    lakesTouched: args.lakeCount,
    // Preset names and model completion are not evidence of applied repairs,
    // drift or QC. These await a deterministic oracle/receipt contract.
    repairsAttempted: null,
    qcPassRate: "—",
    driftDetected: null,
    source: args.totals.source,
    events: args.events,
  };
}

export { emptyTelemetryUsage };
