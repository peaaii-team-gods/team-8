import { describe, expect, it } from "vitest";
import { canLink } from "../registry/linkRules";
import { compileGraph } from "../compile/toWorkflow";
import { emptyUsage } from "../run/telemetry";
import { useStore, type CanvasNode } from "./store";

describe("link rules", () => {
  it("allows lake->agent, forbids agent->lake", () => {
    expect(canLink("dataLake", "agent").allowed).toBe(true);
    expect(canLink("agent", "dataLake").allowed).toBe(false);
    expect(canLink("dataLake", "dataLake").allowed).toBe(false);
  });
});
const node = (id: string, kind: "agent" | "dataLake", presetId: string): CanvasNode => ({ id, type: kind, position: { x: 0, y: 0 }, data: { kind, presetId, title: presetId, description: "", color: "blue" } });
describe("compiler", () => {
  it("mirrors two_agents workflow shape with lakes as inputs", () => {
    const nodes = [node("a1", "agent", "builder"), node("l1", "dataLake", "clinical-lab")];
    const out = compileGraph(nodes, [{ id: "e1", source: "l1", target: "a1" }], "test01");
    expect(out).toHaveLength(1);
    expect(out[0].workflow.schema_version).toBe("workflow.v1");
    expect(out[0].workflow.allowed_tools).toEqual([]);
    expect(out[0].workflow.loop_limits).toEqual({ max_ticks: 2, max_tokens_per_tick: 512, max_tokens_total: 2048 });
    expect(out[0].workflow.workspace_id).toBe("canvas_test01_builder");
    expect(JSON.stringify(out[0].workflow.inputs)).toContain("syn-lab-001");
  });
});

describe("lake links and MCP attachments", () => {
  it("keeps a failed link on screen and still inspects a tethered lake", () => {
    useStore.setState({
      nodes: [], edges: [], uiState: { kind: "void" }, linkNotice: null, inspectedLakeId: null,
    });
    const agent: CanvasNode = { id: "a1", type: "agent", position: { x: 0, y: 0 }, data: { kind: "agent", presetId: "builder", title: "Builder", description: "", color: "emerald" } };
    const lake: CanvasNode = { id: "l1", type: "dataLake", position: { x: 0, y: 0 }, data: { kind: "dataLake", presetId: "clinical-lab", title: "Clinical", description: "", color: "blue" } };
    const other: CanvasNode = { id: "l2", type: "dataLake", position: { x: 0, y: 0 }, data: { kind: "dataLake", presetId: "medicare", title: "Medicare", description: "", color: "blue" } };
    useStore.getState().spawn(agent);
    useStore.getState().spawn(lake);
    useStore.getState().spawn(other);
    useStore.getState().beginLink("a1");
    expect(useStore.getState().completeLink("l1")).toBe(false);
    expect(useStore.getState().linkNotice).toMatch(/do not write lakes/i);
    expect(useStore.getState().edges).toHaveLength(0);
    useStore.getState().beginLink("l1");
    expect(useStore.getState().completeLink("a1")).toBe(true);
    useStore.getState().beginLink("l2");
    expect(useStore.getState().completeLink("a1")).toBe(true);
    expect(useStore.getState().edges).toHaveLength(2);
    useStore.getState().inspectLake("l1");
    expect(useStore.getState().inspectedLakeId).toBe("l1");
    useStore.getState().attachMcp("a1", "coding-mcp");
    useStore.getState().attachMcp("a1", "coding-mcp");
    useStore.getState().attachMcp("l1", "shell-mcp");
    expect(useStore.getState().nodes.find((n) => n.id === "a1")?.data.mcpAttachmentIds).toEqual(["coding-mcp"]);
    useStore.getState().detachMcp("a1", "coding-mcp");
    expect(useStore.getState().nodes.find((n) => n.id === "a1")?.data.mcpAttachmentIds).toEqual([]);
  });
});

describe("canvas snapshot load", () => {
  it("replaces the graph and keeps the workspace choice in memory", () => {
    useStore.getState().setSelectedWorkspaceId("ws-1");
    const sessionId = useStore.getState().sessionId;
    useStore.getState().loadScenario("pilot-storyboard");
    useStore.getState().loadSnapshot([{
      id: "agent-share", type: "agent", position: { x: 3, y: 4 },
      data: { kind: "agent", presetId: "builder", title: "Builder", description: "shared", color: "emerald", verification: "proposal" },
    }], []);
    expect(useStore.getState().nodes.map((node) => node.id)).toEqual(["agent-share"]);
    expect(useStore.getState().scenarioId).toBeNull();
    expect(useStore.getState().selectedWorkspaceId).toBe("ws-1");
    expect(useStore.getState().sessionId).toBe(sessionId);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });
});

describe("session activity", () => {
  it("records a pilot run as status labels and drops the output body", () => {
    useStore.getState().clearSession();
    useStore.getState().loadScenario("pilot-storyboard");
    useStore.getState().markRunStart();
    const agent = useStore.getState().nodes.find((node) => node.data.kind === "agent");
    expect(agent).toBeTruthy();
    useStore.getState().setNodeStatus(agent!.id, "done", '{"reading_column":"reading"}', "proposal");
    useStore.getState().setPipelineStage("complete");
    useStore.getState().setScienceReceipt({
      scenarioId: "pilot-storyboard",
      mapping: '{"reading_column":"reading"}',
      flags: [],
      tokens: 1,
      contentFreeIds: [],
      fixtureVerified: true,
    });
    const activity = useStore.getState().activity;
    expect(activity.length).toBeGreaterThanOrEqual(3);
    expect(activity.map((item) => item.title)).toEqual(expect.arrayContaining([
      "Loaded Pilot storyboard",
      "Run started",
      "Builder done",
      "Stage Complete · proposal",
      "Fixture check passed",
    ]));
    expect(JSON.stringify(activity)).not.toContain("reading_column");
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    useStore.getState().clearSession();
    expect(useStore.getState().activity).toEqual([]);
  });
});

describe("workspace choice", () => {
  it("keeps the selected workspace in memory and drops it on clear", () => {
    useStore.getState().setSelectedWorkspaceId("ws-1");
    expect(useStore.getState().selectedWorkspaceId).toBe("ws-1");
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    useStore.getState().clearSession();
    expect(useStore.getState().selectedWorkspaceId).toBeNull();
  });
});

describe("agent tracking", () => {
  it("clears all owner/session data and rotates telemetry identity on logout", () => {
    useStore.getState().loadScenario("pilot-storyboard");
    const previousSession = useStore.getState().sessionId;
    useStore.getState().recordUtterance(useStore.getState().tracks[0].nodeId, "previous owner output", []);
    useStore.getState().clearSession();
    expect(useStore.getState()).toMatchObject({
      nodes: [], edges: [], tracks: [], messages: [], workspace: [], telemetryEvents: [],
      scenarioId: null, scienceReceipt: null, inspectedLakeId: null, pipelineStage: "idle",
    });
    expect(useStore.getState().sessionId).not.toBe(previousSession);
  });
  it("records an agent the moment it is spawned, before a run", () => {
    useStore.setState({
      nodes: [], edges: [], uiState: { kind: "void" },
      tracks: [], messages: [], workspace: [], totals: emptyUsage(),
    });
    useStore.getState().spawn({
      id: "a1", type: "agent", position: { x: 0, y: 0 },
      data: { kind: "agent", presetId: "builder", title: "Builder", description: "", color: "emerald" },
    });
    useStore.getState().spawn({
      id: "l1", type: "dataLake", position: { x: 0, y: 0 },
      data: { kind: "dataLake", presetId: "clinical-lab", title: "Lake", description: "", color: "blue" },
    });
    const tracks = useStore.getState().tracks;
    expect(tracks).toHaveLength(1);
    expect(tracks[0]).toMatchObject({ title: "Builder", presetId: "builder", metrics: emptyUsage() });
  });
});
