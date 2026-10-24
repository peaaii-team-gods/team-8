import type { PipelineStage } from "../../registry/types";

export type ActivityLevel = "info" | "ok" | "warn" | "error";

export interface ActivityItem {
  id: string;
  at: number;
  kind: string;
  title: string;
  detail?: string;
  nodeId?: string;
  level: ActivityLevel;
}

export interface ActivityDraft {
  kind: string;
  title: string;
  detail?: string;
  nodeId?: string;
  level: ActivityLevel;
}

/** Status and stage labels only. JSON bodies stay in the output inspector. */
export function publicDetail(detail?: string): string | undefined {
  if (!detail) return undefined;
  const trimmed = detail.trim();
  if (!trimmed || trimmed.startsWith("{") || trimmed.startsWith("[")) return undefined;
  return trimmed.slice(0, 80);
}

export function stageActivity(stage: PipelineStage): ActivityDraft | null {
  if (stage === "idle") return null;
  const label = {
    propose: "Propose",
    execute: "Execute",
    fail: "Fail",
    repair: "Repair",
    complete: "Complete · proposal",
  }[stage];
  const level: ActivityLevel = stage === "fail" ? "error" : stage === "complete" ? "ok" : stage === "repair" ? "warn" : "info";
  return { kind: "stage", title: `Stage ${label}`, level };
}

/** Later history can pass server events through this list. This build does not call the API. */
export function loadRemoteActivity(): ActivityItem[] {
  return [];
}

export function focusFromActivity(item: Pick<ActivityItem, "nodeId">): string | null {
  return item.nodeId ?? null;
}
