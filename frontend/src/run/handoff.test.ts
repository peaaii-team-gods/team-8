import { describe, expect, it } from "vitest";
import { agentRunOrder, incomingAgentIds, withHandoff } from "./handoff";
import type { CanvasNode } from "../state/store";
import type { WorkflowV1 } from "../compile/toWorkflow";

const node = (id: string, kind: "agent" | "dataLake" = "agent"): CanvasNode =>
  ({ id, type: kind, position: { x: 0, y: 0 }, data: { kind, presetId: id, title: id, description: "", color: "blue" } });

describe("agentRunOrder", () => {
  it("runs upstream agents before their handoff targets", () => {
    const nodes = [node("b"), node("a"), node("lake", "dataLake")];
    const edges = [{ id: "e1", source: "a", target: "b" }, { id: "e2", source: "lake", target: "a" }];
    expect(agentRunOrder(nodes, edges)).toEqual(["a", "b"]);
  });
  it("falls back on a cycle", () => {
    const nodes = [node("a"), node("b")];
    const edges = [{ id: "e1", source: "a", target: "b" }, { id: "e2", source: "b", target: "a" }];
    expect(agentRunOrder(nodes, edges)).toEqual(["a", "b"]);
  });
});

describe("withHandoff", () => {
  it("appends upstream proposals into inputs.handoff", () => {
    const wf = { inputs: { evidence: "x" } } as unknown as WorkflowV1;
    expect(withHandoff(wf, [{ title: "Builder", output: "map" }]).inputs).toEqual({
      evidence: "x",
      handoff: "Builder proposal:\nmap",
    });
    expect(withHandoff(wf, []).inputs).toEqual({ evidence: "x" });
  });
  it("incomingAgentIds ignores lakes", () => {
    const nodes = [node("a"), node("b"), node("l", "dataLake")];
    expect(incomingAgentIds("b", [{ id: "1", source: "a", target: "b" }, { id: "2", source: "l", target: "b" }], nodes)).toEqual(["a"]);
  });
});
