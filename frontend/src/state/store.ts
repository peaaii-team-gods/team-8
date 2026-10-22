import { create } from "zustand";
import type { Edge, Node } from "@xyflow/react";
import type { CanvasNodeData, UiState } from "../registry/types";
import { canLink } from "../registry/linkRules";

export type CanvasNode = Node<CanvasNodeData>;
export type CanvasEdge = Edge;

interface Store {
  nodes: CanvasNode[]; edges: CanvasEdge[]; uiState: UiState;
  setUiState: (s: UiState) => void;
  openHub: () => void; closeToVoid: () => void;
  spawn: (node: CanvasNode) => void;
  removeNode: (id: string) => void;
  beginLink: (sourceId: string) => void;
  completeLink: (targetId: string) => boolean;
  cancelLink: () => void;
  setNodeStatus: (id: string, status: CanvasNodeData["status"], output?: string) => void;
  resetRun: () => void;
}
let seq = 0;
export const nextId = (p: string) => `${p}-${Date.now()}-${seq++}`;

export const useStore = create<Store>((set, get) => ({
  nodes: [], edges: [], uiState: { kind: "void" },
  setUiState: (uiState) => set({ uiState }),
  openHub: () => set({ uiState: { kind: "hub" } }),
  closeToVoid: () => set({ uiState: { kind: "void" } }),
  spawn: (node) => set((s) => ({ nodes: [...s.nodes, node], uiState: { kind: "idle" } })),
  removeNode: (id) => set((s) => ({ nodes: s.nodes.filter((n) => n.id !== id), edges: s.edges.filter((e) => e.source !== id && e.target !== id), uiState: { kind: "idle" } })),
  beginLink: (sourceId) => set({ uiState: { kind: "linking", sourceId } }),
  completeLink: (targetId) => {
    const { uiState, nodes } = get();
    if (uiState.kind !== "linking" || uiState.sourceId === targetId) return false;
    const src = nodes.find((n) => n.id === uiState.sourceId); const tgt = nodes.find((n) => n.id === targetId);
    if (!src || !tgt || !canLink(src.data.kind, tgt.data.kind).allowed) return false;
    set((s) => ({ edges: [...s.edges, { id: nextId("e"), source: uiState.sourceId, target: targetId, type: "packet" }], uiState: { kind: "idle" } }));
    return true;
  },
  cancelLink: () => set({ uiState: { kind: "idle" } }),
  setNodeStatus: (id, status, output) => set((s) => ({ nodes: s.nodes.map((n) => n.id === id ? { ...n, data: { ...n.data, status, output } } : n) })),
  resetRun: () => set((s) => ({ uiState: { kind: "idle" }, nodes: s.nodes.map((n) => ({ ...n, data: { ...n.data, status: undefined, output: undefined } })) })),
}));
