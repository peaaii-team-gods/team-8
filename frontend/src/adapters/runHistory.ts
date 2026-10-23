/** Content-free run receipt. Model text is never copied into these fields. */

export interface PublicRunSummary {
  runId: string;
  workflowId: string | null;
  workspaceId: string | null;
  status: string;
  completionBasis: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface RunListResult {
  runs: PublicRunSummary[];
  /** Why the list is empty, when this client can say so without inventing rows. */
  note: string | null;
}

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;

const text = (row: Record<string, unknown>, key: string): string | null => {
  const value = row[key];
  return typeof value === "string" && value.trim() ? value : null;
};

/** Drops output, content, and any other model text. */
export function summarizeRun(raw: unknown): PublicRunSummary | null {
  const row = asRecord(raw);
  if (!row) return null;
  const runId = text(row, "run_id") ?? text(row, "id");
  if (!runId) return null;
  return {
    runId,
    workflowId: text(row, "workflow_id"),
    workspaceId: text(row, "workspace_id"),
    status: (text(row, "status") ?? "unknown").toLowerCase(),
    completionBasis: text(row, "completion_basis"),
    createdAt: text(row, "created_at") ?? text(row, "started_at"),
    updatedAt: text(row, "updated_at") ?? text(row, "finished_at"),
  };
}

export function contentFreeRunSummary(run: PublicRunSummary): string {
  return `${run.status} · ${run.completionBasis ?? "basis unreported"}. Model text is not loaded.`;
}

export function sortRuns(runs: PublicRunSummary[]): PublicRunSummary[] {
  const stamp = (run: PublicRunSummary) => run.updatedAt ?? run.createdAt ?? "";
  return [...runs].sort((a, b) => stamp(b).localeCompare(stamp(a)));
}
