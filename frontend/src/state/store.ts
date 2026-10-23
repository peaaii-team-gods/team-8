import { create } from "zustand";
import { applyNodeChanges, type Edge, type Node, type NodeChange } from "@xyflow/react";
import type { CanvasNodeData, PipelineStage, UiState, VerificationKind } from "../registry/types";
import { canLink } from "../registry/linkRules";
import { addUsage, emptyUsage, mergeChanges, type AgentMessage, type UsageMetrics, type WorkspaceChange } from "../run/telemetry";
import { scenarioById } from "../registry/scenarios";
import type { TelemetryEvent } from "../run/telemetryEvents";
import { newSessionId } from "../run/telemetryEvents";
import type { MrfMapping, NamedCheck } from "../mrf/types";

export type CanvasNode = Node<CanvasNodeData>;
export type CanvasEdge = Edge<{ active?: boolean; packetLabel?: string }>;

export interface AgentTrack {
  nodeId: string;
  title: string;
  presetId: string;
  spawnedAt: number;
  runId?: string;
  status?: CanvasNodeData["status"];
  metrics: UsageMetrics;
}

export interface ScienceReceipt {
  scenarioId: string | null;
  mapping?: string;
  flags: string[];
  riskOrQc?: string;
  tokens: number;
  contentFreeIds: string[];
  oracleNote?: string;
  checks?: NamedCheck[];
  invalidProposal?: boolean;
  /** Local fixture check for the pilot storyboard. Agent nodes stay proposals. */
  fixtureVerified?: boolean;
}

interface Store {
  nodes: CanvasNode[]; edges: CanvasEdge[]; uiState: UiState;
  tracks: AgentTrack[];
  messages: AgentMessage[];
  workspace: WorkspaceChange[];
  totals: UsageMetrics;
  scenarioId: string | null;
  pipelineStage: PipelineStage;
  runStartedAt: number | null;
  runEndedAt: number | null;
  sessionId: string;
  telemetryEvents: TelemetryEvent[];
  scienceReceipt: ScienceReceipt | null;
  inspectedLakeId: string | null;
  mrfSource: "base" | "drift";
  mrfMapping: MrfMapping | null;
  setUiState: (s: UiState) => void;
  openHub: () => void; closeToVoid: () => void;
  openSchema: (nodeId: string) => void;
  setSchema: (nodeId: string, schemaText: string) => void;
  spawn: (node: CanvasNode) => void;
  removeNode: (id: string) => void;
  onNodesChange: (changes: NodeChange<CanvasNode>[]) => void;
  beginLink: (sourceId: string) => void;
  completeLink: (targetId: string) => boolean;
  cancelLink: () => void;
  setNodeStatus: (id: string, status: CanvasNodeData["status"], output?: string, verification?: VerificationKind) => void;
  setEdgeActive: (edgeIds: string[], active: boolean, packetLabel?: string) => void;
  recordHandle: (nodeId: string, runId: string) => void;
  recordTelemetry: (nodeId: string, usage: UsageMetrics, workspace: WorkspaceChange[]) => void;
  recordUtterance: (fromId: string, text: string, toIds: string[]) => void;
  resetRun: () => void;
  loadScenario: (id: string) => void;
  setPipelineStage: (stage: PipelineStage) => void;
  markRunStart: () => void;
  markRunEnd: () => void;
  pushTelemetryEvent: (ev: TelemetryEvent) => void;
  setScienceReceipt: (r: ScienceReceipt | null) => void;
  inspectLake: (nodeId: string | null) => void;
  setMrfSource: (source: "base" | "drift") => void;
  setMrfMapping: (mapping: MrfMapping | null) => void;
  clearSession: () => void;
}
let seq = 0;
export const nextId = (p: string) => `${p}-${Date.now()}-${seq++}`;

const zeros = (): UsageMetrics => emptyUsage("estimated");

export const useStore = create<Store>((set, get) => ({
  nodes: [], edges: [], uiState: { kind: "void" },
  tracks: [], messages: [], workspace: [], totals: zeros(),
  scenarioId: null,
  pipelineStage: "idle",
  runStartedAt: null,
  runEndedAt: null,
  sessionId: newSessionId(),
  telemetryEvents: [],
  scienceReceipt: null,
  inspectedLakeId: null,
  mrfSource: "base",
  mrfMapping: null,
  setUiState: (uiState) => set({ uiState }),
  openHub: () => set({ uiState: { kind: "hub" } }),
  closeToVoid: () => set({ uiState: { kind: "void" } }),
  openSchema: (nodeId) => set({ uiState: { kind: "schema", nodeId } }),
  setSchema: (nodeId, schemaText) => set((s) => ({
    nodes: s.nodes.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, schemaText } } : n),
  })),
  spawn: (node) => set((s) => ({
    nodes: [...s.nodes, node],
    uiState: { kind: "idle" },
    tracks: node.data.kind === "agent"
      ? [...s.tracks, { nodeId: node.id, title: node.data.title, presetId: node.data.presetId, spawnedAt: Date.now(), metrics: zeros() }]
      : s.tracks,
  })),
  removeNode: (id) => set((s) => ({
    nodes: s.nodes.filter((n) => n.id !== id),
    edges: s.edges.filter((e) => e.source !== id && e.target !== id),
    tracks: s.tracks.filter((t) => t.nodeId !== id),
    messages: s.messages.filter((m) => m.fromId !== id && m.toId !== id),
    inspectedLakeId: s.inspectedLakeId === id ? null : s.inspectedLakeId,
    uiState: { kind: "idle" },
  })),
  onNodesChange: (changes) => set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) })),
  beginLink: (sourceId) => set({ uiState: { kind: "linking", sourceId } }),
  completeLink: (targetId) => {
    const { uiState, nodes } = get();
    if (uiState.kind !== "linking" || uiState.sourceId === targetId) return false;
    const src = nodes.find((n) => n.id === uiState.sourceId); const tgt = nodes.find((n) => n.id === targetId);
    if (!src || !tgt || !canLink(src.data.kind, tgt.data.kind).allowed) return false;
    set((s) => ({ edges: [...s.edges, { id: nextId("e"), source: uiState.sourceId, target: targetId, type: "packet", data: { active: false } }], uiState: { kind: "idle" } }));
    return true;
  },
  cancelLink: () => set({ uiState: { kind: "idle" } }),
  setNodeStatus: (id, status, output, verification) => set((s) => ({
    nodes: s.nodes.map((n) => n.id === id ? {
      ...n,
      data: {
        ...n.data,
        status,
        output,
        verification: verification ?? (status === "done" || status === "error" ? "proposal" : n.data.verification),
      },
    } : n),
    tracks: s.tracks.map((t) => t.nodeId === id ? { ...t, status } : t),
  })),
  setEdgeActive: (edgeIds, active, packetLabel) => set((s) => ({
    edges: s.edges.map((e) => edgeIds.includes(e.id) ? { ...e, data: { ...e.data, active, packetLabel: packetLabel ?? e.data?.packetLabel } } : e),
  })),
  recordHandle: (nodeId, runId) => set((s) => ({ tracks: s.tracks.map((t) => t.nodeId === nodeId ? { ...t, runId } : t) })),
  recordTelemetry: (nodeId, usage, workspace) => set((s) => ({
    tracks: s.tracks.map((t) => t.nodeId === nodeId ? { ...t, metrics: usage } : t),
    totals: addUsage(s.tracks.filter((t) => t.nodeId !== nodeId).reduce((acc, t) => addUsage(acc, t.metrics), zeros()), usage),
    workspace: mergeChanges(s.workspace, workspace.map((w) => ({ ...w, agentId: w.agentId ?? nodeId }))),
  })),
  recordUtterance: (fromId, text, toIds) => set((s) => {
    const from = s.nodes.find((n) => n.id === fromId);
    const targets = toIds.length ? toIds : ["canvas"];
    const added: AgentMessage[] = targets.map((toId) => {
      const to = s.nodes.find((n) => n.id === toId);
      const edge = s.edges.find((e) => e.source === fromId && e.target === toId);
      return {
        id: nextId("m"),
        fromId, toId, fromTitle: from?.data.title ?? fromId, toTitle: to?.data.title ?? (toId === "canvas" ? "workspace" : toId),
        text: text.slice(0, 800), at: Date.now(), edgeId: edge?.id,
      };
    });
    return {
      messages: [...s.messages, ...added].slice(-80),
      edges: s.edges.map((e) => {
        const hit = added.find((m) => m.edgeId === e.id);
        return hit ? { ...e, data: { ...e.data, active: true, packetLabel: hit.text.slice(0, 160) } } : e;
      }),
    };
  }),
  resetRun: () => set((s) => ({
    uiState: { kind: "idle" },
    nodes: s.nodes.map((n) => ({ ...n, data: { ...n.data, status: undefined, output: undefined, verification: n.data.kind === "agent" ? "proposal" : undefined } })),
    edges: s.edges.map((e) => ({ ...e, data: { ...e.data, active: false, packetLabel: undefined } })),
    tracks: s.tracks.map((t) => ({ ...t, status: undefined, runId: undefined, metrics: zeros() })),
    messages: [],
    workspace: [],
    totals: zeros(),
    pipelineStage: "idle",
    runStartedAt: null,
    runEndedAt: null,
    // Keep mapping, drift source, and the last receipt across a repair run.
  })),
  loadScenario: (id) => {
    const sc = scenarioById(id);
    if (!sc) return;
    const built = sc.build(nextId);
    const tracks: AgentTrack[] = built.nodes
      .filter((n) => n.data.kind === "agent")
      .map((n) => ({ nodeId: n.id, title: n.data.title, presetId: n.data.presetId, spawnedAt: Date.now(), metrics: zeros() }));
    set({
      nodes: built.nodes,
      edges: built.edges,
      tracks,
      messages: [],
      workspace: [],
      totals: zeros(),
      scenarioId: id,
      pipelineStage: "idle",
      scienceReceipt: null,
      inspectedLakeId: null,
      uiState: { kind: "idle" },
      runStartedAt: null,
      runEndedAt: null,
      mrfSource: "base",
      mrfMapping: null,
    });
  },
  setPipelineStage: (pipelineStage) => set({ pipelineStage }),
  markRunStart: () => set({ runStartedAt: Date.now(), runEndedAt: null, pipelineStage: "propose" }),
  markRunEnd: () => set({ runEndedAt: Date.now() }),
  pushTelemetryEvent: (ev) => set((s) => ({ telemetryEvents: [...s.telemetryEvents, ev].slice(-40) })),
  setScienceReceipt: (scienceReceipt) => set({ scienceReceipt }),
  inspectLake: (inspectedLakeId) => set({ inspectedLakeId }),
  setMrfSource: (mrfSource) => set({ mrfSource }),
  setMrfMapping: (mrfMapping) => set({ mrfMapping }),
  clearSession: () => set({
    nodes: [], edges: [], uiState: { kind: "void" },
    tracks: [], messages: [], workspace: [], totals: zeros(),
    scenarioId: null, pipelineStage: "idle", runStartedAt: null, runEndedAt: null,
    sessionId: newSessionId(), telemetryEvents: [], scienceReceipt: null, inspectedLakeId: null,
    mrfSource: "base", mrfMapping: null,
  }),
}));
