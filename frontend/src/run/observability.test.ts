import { describe, expect, it } from "vitest";
import { buildObservability } from "./observability";
import { emptyUsage } from "./telemetry";
import type { AgentTrack } from "../state/store";

const tracks: AgentTrack[] = ["maintainer", "assay-qc"].map((presetId) => ({
  nodeId: presetId, title: presetId, presetId, spawnedAt: 0, status: "done", metrics: emptyUsage("live"),
}));
const snapshot = (pipelineStage: "complete" | "fail" | "idle", agents = tracks) => buildObservability({
  tracks: agents, totals: emptyUsage("live"), runStartedAt: 1, runEndedAt: 4,
  pipelineStage, scenarioId: "pilot-storyboard", lakeCount: 1, sessionId: "session", events: [],
});

describe("honest observability", () => {
  it("does not turn successful model proposals or scenario names into verified science", () => {
    expect(snapshot("complete")).toMatchObject({
      outcome: "succeeded", completionBasis: "agent_reported", agentsFinished: 2,
      repairsAttempted: null, driftDetected: null, qcPassRate: "—",
    });
  });
  it("shows failures and zero completed agents before a run", () => {
    expect(snapshot("fail").outcome).toBe("failed");
    expect(snapshot("idle", []).agentsFinished).toBe(0);
  });
});
