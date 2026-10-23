import type { CanvasEdge, CanvasNode } from "../state/store";
import type { WorkflowV1 } from "../compile/toWorkflow";

/** Kahn topo-order of agent nodes. Cycles fall back to canvas order. */
export function agentRunOrder(nodes: CanvasNode[], edges: CanvasEdge[]): string[] {
  const agents = nodes.filter((n) => n.data.kind === "agent").map((n) => n.id);
  const set = new Set(agents);
  const incoming = new Map(agents.map((id) => [id, 0]));
  const adj = new Map(agents.map((id) => [id, [] as string[]]));
  for (const e of edges) {
    if (!set.has(e.source) || !set.has(e.target)) continue;
    adj.get(e.source)!.push(e.target);
    incoming.set(e.target, (incoming.get(e.target) ?? 0) + 1);
  }
  const q = agents.filter((id) => incoming.get(id) === 0);
  const out: string[] = [];
  while (q.length) {
    const id = q.shift()!;
    out.push(id);
    for (const n of adj.get(id) ?? []) {
      incoming.set(n, (incoming.get(n) ?? 0) - 1);
      if (incoming.get(n) === 0) q.push(n);
    }
  }
  return out.length === agents.length ? out : agents;
}

export function incomingAgentIds(nodeId: string, edges: CanvasEdge[], nodes: CanvasNode[]): string[] {
  const agents = new Set(nodes.filter((n) => n.data.kind === "agent").map((n) => n.id));
  return edges.filter((e) => e.target === nodeId && agents.has(e.source)).map((e) => e.source);
}

export function outgoingAgentEdges(nodeId: string, edges: CanvasEdge[], nodes: CanvasNode[]): CanvasEdge[] {
  const agents = new Set(nodes.filter((n) => n.data.kind === "agent").map((n) => n.id));
  return edges.filter((e) => e.source === nodeId && agents.has(e.target));
}

export function withHandoff(workflow: WorkflowV1, upstream: { title: string; output: string }[]): WorkflowV1 {
  if (!upstream.length) return workflow;
  const text = upstream.map((u) => `${u.title} proposal:\n${u.output}`).join("\n---\n").slice(0, 4_000);
  return { ...workflow, inputs: { ...workflow.inputs, handoff: text } };
}
