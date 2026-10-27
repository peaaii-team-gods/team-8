import type { WorkflowV1, WorkspaceBinding } from "../compile/toWorkflow";
import type { ParsedTelemetry, UsageMetrics, WorkspaceChange } from "../run/telemetry";
export interface RunHandle { nodeId: string; runId: string }
export interface RunOutcome {
  nodeId: string;
  status: "succeeded" | "failed" | "cancelled" | "unknown";
  output?: string;
  basis?: string;
  /** Failure code from the run_failed event (live only), e.g. provider_unavailable. */
  reason?: string;
  state?: string;
  usage?: UsageMetrics;
  workspace?: WorkspaceChange[];
}
export interface RhmAdapter {
  mode: "simulated" | "live";
  capabilities(): Promise<Record<string, unknown> | null>;
  /** Owner-scoped B3 workspaces (live only; absent in simulated mode). */
  workspaces?(): Promise<WorkspaceBinding[]>;
  run(nodeId: string, workflow: WorkflowV1): Promise<RunHandle>;
  poll(handle: RunHandle): Promise<RunOutcome>;
  /** Public run event stream; optional — live only, best-effort. */
  events?(handle: RunHandle, afterSeq: number): Promise<ParsedTelemetry>;
  workspaceChanges?(workspaceId: string, agentId: string): Promise<WorkspaceChange[]>;
  cancel(handle: RunHandle): Promise<void>;
}
