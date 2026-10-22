import type { WorkflowV1, WorkspaceBinding } from "../compile/toWorkflow";
export interface RunHandle { nodeId: string; runId: string }
export interface RunOutcome { nodeId: string; status: "succeeded" | "failed" | "cancelled" | "unknown"; output?: string; basis?: string; state?: string }
export interface RhmAdapter {
  mode: "simulated" | "live";
  capabilities(): Promise<Record<string, unknown> | null>;
  /** Owner-scoped B3 workspaces (live only; absent in simulated mode). */
  workspaces?(): Promise<WorkspaceBinding[]>;
  run(nodeId: string, workflow: WorkflowV1): Promise<RunHandle>;
  poll(handle: RunHandle): Promise<RunOutcome>;
  cancel(handle: RunHandle): Promise<void>;
}
