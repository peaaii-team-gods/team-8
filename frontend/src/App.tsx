import { useMemo, useRef, useState } from "react";
import { ReactFlow, Background, Controls, type NodeTypes, type EdgeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, Square } from "lucide-react";
import VoidBackground from "./ui/VoidBackground";
import SessionPanel from "./ui/SessionPanel";
import { AgentNode, DataLakeNode } from "./canvas/nodes";
import PacketEdge from "./canvas/PacketEdge";
import { useStore, nextId, type CanvasNode } from "./state/store";
import { AGENT_PRESETS } from "./registry/agentPresets";
import { DATA_LAKE_PRESETS } from "./registry/dataLakePresets";
import { compileGraph, selectBinding } from "./compile/toWorkflow";
import { SimulatedAdapter } from "./adapters/simulated";
import type { LiveAdapter } from "./adapters/live";
import type { RhmAdapter, RunHandle } from "./adapters/RhmAdapter";
import { resolveMode, apiBaseFromEnv, identityBaseFromEnv, type RhmEnv } from "./adapters/selectAdapter";
import { runNodes } from "./run/runNodes";

const nodeTypes: NodeTypes = { agent: AgentNode, dataLake: DataLakeNode };
const edgeTypes: EdgeTypes = { packet: PacketEdge };

export default function App() {
  const { nodes, edges, uiState, openHub, spawn, setUiState, completeLink, cancelLink, setNodeStatus, resetRun } = useStore();
  const [liveAdapter, setLiveAdapter] = useState<LiveAdapter | null>(null);
  const [running, setRunning] = useState(false);
  const handlesRef = useRef<RunHandle[]>([]);
  const adapterRef = useRef<RhmAdapter | null>(null);
  const stoppedRef = useRef(false);
  const nonce = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  const env = import.meta.env as unknown as RhmEnv;
  const mode = resolveMode(env);
  const simulated = useMemo(() => new SimulatedAdapter(), []);
  // Live mode never falls back to simulated: no adapter until sign-in.
  const adapter: RhmAdapter | null = mode === "live" ? liveAdapter : simulated;

  const spawnPreset = (kind: "agent" | "dataLake", presetId: string) => {
    const p = kind === "agent" ? AGENT_PRESETS.find((x) => x.id === presetId)! : DATA_LAKE_PRESETS.find((x) => x.id === presetId)!;
    const node: CanvasNode = { id: nextId(kind), type: kind, position: { x: 240 + Math.random() * 160, y: 160 + Math.random() * 120 }, data: { kind, presetId, title: p.title, description: p.description, color: p.color } };
    spawn(node);
  };

  const toggleRun = async () => {
    if (running) {
      stoppedRef.current = true;
      const created = handlesRef.current;
      if (adapterRef.current) await Promise.all(created.map((h) => adapterRef.current!.cancel(h).catch(() => undefined)));
      handlesRef.current = [];
      setRunning(false);
      resetRun();
      return;
    }
    if (!adapter) return; // live mode: sign in first
    stoppedRef.current = false;
    handlesRef.current = [];
    adapterRef.current = adapter;
    setRunning(true);
    setUiState({ kind: "running" });
    // B9+B10: fresh fetched report at run time gates hosted tool
    // emission (backend wins), and emission additionally requires a
    // real B3 binding: auto-bind when the caller owns exactly one
    // ready workspace (several/none bind nothing; a selector UI is
    // the recorded follow-up). Simulated mode never fetches, so it
    // compiles exactly as before (allowed_tools: []).
    const capabilities = adapter.mode === "live"
      ? await adapter.capabilities().catch(() => null)
      : null;
    const binding = adapter.mode === "live" && adapter.workspaces
      ? selectBinding(await adapter.workspaces().catch(() => []))
      : null;
    await runNodes(adapter, compileGraph(nodes, edges, nonce, capabilities, binding), {
      onStatus: setNodeStatus,
      onHandle: (h) => { handlesRef.current = [...handlesRef.current, h]; },
      shouldStop: () => stoppedRef.current,
    });
    setRunning(false);
    setUiState({ kind: "idle" });
  };

  return <div className="h-full relative" onClick={() => { if (uiState.kind === "linking") cancelLink(); }}>
    <VoidBackground />
    {nodes.length === 0 && uiState.kind !== "hub" && (
      <motion.button layoutId="hub" aria-label="Create" className="glass absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 text-fuchsia-300" onClick={(e) => { e.stopPropagation(); openHub(); }}><Plus size={36} /></motion.button>
    )}
    {nodes.length > 0 && uiState.kind !== "hub" && (
      <button aria-label="Create" className="glass absolute bottom-6 right-6 p-3 text-fuchsia-300 z-10" onClick={(e) => { e.stopPropagation(); openHub(); }}><Plus size={20} /></button>
    )}
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView
      onNodeClick={(_, n) => { if (uiState.kind === "linking") completeLink(n.id); else setUiState({ kind: "menu", nodeId: n.id }); }}>
      <Background /><Controls />
    </ReactFlow>
    <AnimatePresence>{uiState.kind === "hub" && (
      <motion.div layoutId="hub" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-10 w-[min(560px,92vw)]" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-semibold mb-3">Create</h2>
        <div className="text-xs uppercase opacity-60">Agent</div>
        <div className="grid grid-cols-2 gap-2 my-2">{AGENT_PRESETS.map((p) => <button key={p.id} className="glass p-3 text-left" onClick={() => spawnPreset("agent", p.id)}>{p.title}<div className="text-xs opacity-70">{p.description}</div></button>)}</div>
        <div className="text-xs uppercase opacity-60 mt-3">Data Lake — declared inputs, not executable tools</div>
        <div className="grid grid-cols-2 gap-2 my-2">{DATA_LAKE_PRESETS.map((p) => <button key={p.id} className="glass p-3 text-left" onClick={() => spawnPreset("dataLake", p.id)}>{p.title}<div className="text-xs opacity-70">{p.description}</div></button>)}</div>
        <button className="text-sm opacity-70" onClick={() => setUiState({ kind: "void" })}>Close</button>
      </motion.div>)}
    </AnimatePresence>
    {mode === "live" && (
      <div className="absolute top-16 left-4 z-10 w-[min(320px,90vw)]">
        <SessionPanel apiBase={apiBaseFromEnv(env)} identityBase={identityBaseFromEnv(env)} onAuthenticated={setLiveAdapter} />
      </div>
    )}
    {edges.length > 0 && <button aria-label={running ? "Stop run" : "Run pipeline"} disabled={!running && !adapter} className="glass absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 flex gap-2 items-center z-10 disabled:opacity-50" onClick={(e) => { e.stopPropagation(); void toggleRun(); }}>{running ? <Square size={14} /> : <Play size={14} />}{running ? "Stop" : "Run Pipeline"}</button>}
    {uiState.kind === "linking" && <div className="absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-1 text-sm z-10">Click a valid target to lock the link (click empty space to cancel)</div>}
    <div className="absolute top-4 right-4 glass px-3 py-1 text-xs z-10">Mode: {mode}{mode === "live" && !liveAdapter ? " — sign in required" : ""}</div>
  </div>;
}
