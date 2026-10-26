import { create } from "zustand";
import { applyNodeChanges, type Edge, type Node, type NodeChange } from "@xyflow/react";
import type { CanvasNodeData, PipelineStage, UiState, VerificationKind } from "../registry/types";
import { canLink } from "../registry/linkRules";
import { addUsage, emptyUsage, mergeChanges, type AgentMessage, type UsageMetrics, type WorkspaceChange } from "../run/telemetry";
import { scenarioById } from "../registry/scenarios";
import type { TelemetryEvent } from "../run/telemetryEvents";
import { newSessionId } from "../run/telemetryEvents";
import type { MrfMapping, NamedCheck } from "../mrf/types";
import { MCP_ATTACHMENTS } from "../registry/mcpAttachments";
import { emptyLinkageContext, type LinkageContext } from "../registry/mcpLinkage";
import { publicDetail, stageActivity, type ActivityDraft, type ActivityItem } from "../ui/activity/activity";
import { toastText } from "../ui/toasts/toast";

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
  linkNotice: string | null;
  linkageContext: LinkageContext;
  selectedWorkspaceId: string | null;
  activity: ActivityItem[];
  statusHint: string | null;
  setUiState: (s: UiState) => void;
  setSelectedWorkspaceId: (workspaceId: string | null) => void;
  openHub: () => void; closeToVoid: () => void;
  openSchema: (nodeId: string) => void;
  openMcp: (nodeId: string) => void;
  setSchema: (nodeId: string, schemaText: string) => void;
  attachMcp: (nodeId: string, attachmentId: string) => void;
  detachMcp: (nodeId: string, attachmentId: string) => void;
  setLinkageContext: (ctx: LinkageContext) => void;
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
  loadSnapshot: (nodes: CanvasNode[], edges: CanvasEdge[]) => void;
  setPipelineStage: (stage: PipelineStage) => void;
  markRunStart: () => void;
  markRunEnd: () => void;
  pushTelemetryEvent: (ev: TelemetryEvent) => void;
  pushActivity: (item: ActivityDraft) => void;
  clearActivity: () => void;
  setStatusHint: (hint: string | null) => void;
  clearStatusHint: () => void;
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
  linkNotice: null,
  linkageContext: emptyLinkageContext(),
  selectedWorkspaceId: null,
  activity: [],
  statusHint: null,
  setUiState: (uiState) => set({ uiState }),
  setSelectedWorkspaceId: (selectedWorkspaceId) => set({ selectedWorkspaceId }),
  openHub: () => set({ uiState: { kind: "hub" } }),
  closeToVoid: () => set({ uiState: { kind: "void" } }),
  openSchema: (nodeId) => set({ uiState: { kind: "schema", nodeId } }),
  openMcp: (nodeId) => set({ uiState: { kind: "mcp", nodeId } }),
  setSchema: (nodeId, schemaText) => set((s) => ({
    nodes: s.nodes.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, schemaText } } : n),
  })),
  attachMcp: (nodeId, attachmentId) => set((s) => ({
    nodes: s.nodes.map((n) => {
      if (n.id !== nodeId || n.data.kind !== "agent") return n;
      if (!MCP_ATTACHMENTS.some((a) => a.id === attachmentId && a.attachableTo === "agent")) return n;
      const ids = n.data.mcpAttachmentIds ?? [];
      if (ids.includes(attachmentId)) return n;
      return { ...n, data: { ...n.data, mcpAttachmentIds: [...ids, attachmentId] } };
    }),
  })),
  detachMcp: (nodeId, attachmentId) => set((s) => ({
    nodes: s.nodes.map((n) => n.id === nodeId
      ? { ...n, data: { ...n.data, mcpAttachmentIds: (n.data.mcpAttachmentIds ?? []).filter((id) => id !== attachmentId) } }
      : n),
  })),
  setLinkageContext: (linkageContext) => set({ linkageContext }),
  spawn: (node) => {
    set((s) => ({
      nodes: [...s.nodes, node],
      uiState: { kind: "idle" },
      tracks: node.data.kind === "agent"
        ? [...s.tracks, { nodeId: node.id, title: node.data.title, presetId: node.data.presetId, spawnedAt: Date.now(), metrics: zeros() }]
        : s.tracks,
    }));
    get().pushActivity({ kind: "spawn", title: `Added ${node.data.title}`, nodeId: node.id, level: "info" });
  },
  removeNode: (id) => set((s) => ({
    nodes: s.nodes.filter((n) => n.id !== id),
    edges: s.edges.filter((e) => e.source !== id && e.target !== id),
    tracks: s.tracks.filter((t) => t.nodeId !== id),
    messages: s.messages.filter((m) => m.fromId !== id && m.toId !== id),
    inspectedLakeId: s.inspectedLakeId === id ? null : s.inspectedLakeId,
    uiState: { kind: "idle" },
  })),
  onNodesChange: (changes) => set((s) => ({ nodes: applyNodeChanges(changes, s.nodes) })),
  beginLink: (sourceId) => set({ uiState: { kind: "linking", sourceId }, linkNotice: null }),
  completeLink: (targetId) => {
    const { uiState, nodes, edges } = get();
    if (uiState.kind !== "linking" || uiState.sourceId === targetId) return false;
    const src = nodes.find((n) => n.id === uiState.sourceId);
    const tgt = nodes.find((n) => n.id === targetId);
    if (!src || !tgt) {
      set({ linkNotice: "That target is not on the canvas." });
      return false;
    }
    const rule = canLink(src.data.kind, tgt.data.kind);
    if (!rule.allowed) {
      set({ linkNotice: rule.reason });
      return false;
    }
    if (edges.some((e) => e.source === src.id && e.target === tgt.id)) {
      set({ linkNotice: "That link is already on the canvas." });
      return false;
    }
    set((s) => ({ edges: [...s.edges, { id: nextId("e"), source: uiState.sourceId, target: targetId, type: "packet", data: { active: false } }], uiState: { kind: "idle" }, linkNotice: null }));
    get().pushActivity({ kind: "link", title: `Linked ${src.data.title} → ${tgt.data.title}`, nodeId: targetId, level: "info" });
    return true;
  },
  cancelLink: () => set({ uiState: { kind: "idle" }, linkNotice: null }),
  setNodeStatus: (id, status, output, verification) => {
    const previous = get().nodes.find((n) => n.id === id)?.data.status;
    const title = get().nodes.find((n) => n.id === id)?.data.title ?? "Agent";
    const badge = verification ?? (status === "done" || status === "error" ? "proposal" : undefined);
    set((s) => ({
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
    }));
    if (status === previous) return;
    if (status === "done") get().pushActivity({ kind: "agent-done", title: `${title} done`, detail: badge === "verified" ? "verified" : badge === "checked_locally" ? "checked locally" : "proposal", nodeId: id, level: "ok" });
    if (status === "error") get().pushActivity({ kind: "agent-fail", title: `${title} failed`, detail: "failed", nodeId: id, level: "error" });
  },
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
  resetRun: () => {
    const stopping = get().runStartedAt !== null && get().runEndedAt === null;
    set((s) => ({
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
    }));
    if (stopping) get().pushActivity({ kind: "run-stop", title: "Run stopped", level: "warn" });
  },
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
      linkNotice: null,
      uiState: { kind: "idle" },
      runStartedAt: null,
      runEndedAt: null,
      mrfSource: "base",
      mrfMapping: null,
    });
    get().pushActivity({ kind: "scenario", title: `Loaded ${sc.title}`, level: "info" });
  },
  loadSnapshot: (nodes, edges) => {
    set({
      nodes,
      edges,
      tracks: nodes.filter((n) => n.data.kind === "agent").map((n) => ({
        nodeId: n.id, title: n.data.title, presetId: n.data.presetId, spawnedAt: Date.now(), metrics: zeros(),
      })),
      messages: [],
      workspace: [],
      totals: zeros(),
      scenarioId: null,
      pipelineStage: "idle",
      scienceReceipt: null,
      inspectedLakeId: null,
      linkNotice: null,
      uiState: nodes.length ? { kind: "idle" } : { kind: "void" },
      runStartedAt: null,
      runEndedAt: null,
      telemetryEvents: [],
    });
    get().pushActivity({ kind: "snapshot", title: "Imported snapshot", level: "info" });
  },
  setPipelineStage: (pipelineStage) => {
    const previous = get().pipelineStage;
    set({ pipelineStage });
    if (pipelineStage === previous) return;
    const item = stageActivity(pipelineStage);
    if (item) get().pushActivity(item);
  },
  markRunStart: () => {
    set({ runStartedAt: Date.now(), runEndedAt: null, pipelineStage: "propose" });
    get().pushActivity({ kind: "run-start", title: "Run started", level: "info" });
    const stage = stageActivity("propose");
    if (stage) get().pushActivity(stage);
  },
  markRunEnd: () => {
    set({ runEndedAt: Date.now() });
    get().pushActivity({ kind: "run-end", title: "Run ended", level: "info" });
  },
  pushTelemetryEvent: (ev) => set((s) => ({ telemetryEvents: [...s.telemetryEvents, ev].slice(-40) })),
  pushActivity: (item) => set((s) => ({
    activity: [...s.activity, {
      id: nextId("act"),
      at: Date.now(),
      kind: item.kind,
      title: item.title.slice(0, 80),
      detail: publicDetail(item.detail),
      nodeId: item.nodeId,
      level: item.level,
    }].slice(-80),
  })),
  clearActivity: () => set({ activity: [] }),
  setStatusHint: (hint) => set({ statusHint: hint ? toastText(hint) ?? null : null }),
  clearStatusHint: () => set({ statusHint: null }),
  setScienceReceipt: (scienceReceipt) => {
    set({ scienceReceipt });
    if (scienceReceipt?.fixtureVerified) {
      get().pushActivity({ kind: "fixture", title: "Fixture check passed", detail: "Agent badges stay proposals.", level: "ok" });
    }
  },
  inspectLake: (inspectedLakeId) => set({ inspectedLakeId }),
  setMrfSource: (mrfSource) => set({ mrfSource }),
  setMrfMapping: (mrfMapping) => set({ mrfMapping }),
  clearSession: () => set({
    nodes: [], edges: [], uiState: { kind: "void" },
    tracks: [], messages: [], workspace: [], totals: zeros(),
    scenarioId: null, pipelineStage: "idle", runStartedAt: null, runEndedAt: null,
    sessionId: newSessionId(), telemetryEvents: [], scienceReceipt: null, inspectedLakeId: null,
    mrfSource: "base", mrfMapping: null,
    linkNotice: null, linkageContext: emptyLinkageContext(), selectedWorkspaceId: null, activity: [], statusHint: null,
  }),
}));
