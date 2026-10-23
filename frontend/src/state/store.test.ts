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
    const nodes = [node("a1", "agent", "builder"), node("l1", "dataLake", "supabase-primary")];
    const out = compileGraph(nodes, [{ id: "e1", source: "l1", target: "a1" }], "test01");
    expect(out).toHaveLength(1);
    expect(out[0].workflow.schema_version).toBe("workflow.v1");
    expect(out[0].workflow.allowed_tools).toEqual([]);
    expect(out[0].workflow.loop_limits).toEqual({ max_ticks: 2, max_tokens_per_tick: 512, max_tokens_total: 2048 });
    expect(out[0].workflow.workspace_id).toBe("canvas_test01_builder");
    expect(JSON.stringify(out[0].workflow.inputs)).toContain("syn-001");
  });
});

describe("agent tracking", () => {
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
      data: { kind: "dataLake", presetId: "supabase-primary", title: "Lake", description: "", color: "blue" },
    });
    const tracks = useStore.getState().tracks;
    expect(tracks).toHaveLength(1);
    expect(tracks[0]).toMatchObject({ title: "Builder", presetId: "builder", metrics: emptyUsage() });
  });
});
