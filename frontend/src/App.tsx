import { useEffect, useMemo, useRef, useState } from "react";
import { ReactFlow, Background, Controls, type NodeTypes, type EdgeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, Square, LogOut } from "lucide-react";
import VoidBackground from "./ui/VoidBackground";
import InferencePanel from "./ui/InferencePanel";
import type { InferenceStatus } from "./adapters/inference";
import SessionPanel from "./ui/SessionPanel";
import MetricsPanel from "./ui/MetricsPanel";
import ConversationPanel from "./ui/ConversationPanel";
import WorkspacePanel from "./ui/WorkspacePanel";
import SchemaWindow from "./ui/SchemaWindow";
import LandingPage from "./ui/LandingPage";
import LakeInspector from "./ui/LakeInspector";
import ScienceReceipt from "./ui/ScienceReceipt";
import SyntheticBadge from "./ui/SyntheticBadge";
import { AgentNode, DataLakeNode } from "./canvas/nodes";
import PacketEdge from "./canvas/PacketEdge";
import { useStore, nextId, type CanvasNode } from "./state/store";
import { AGENT_PRESETS } from "./registry/agentPresets";
import { defaultSchemaText } from "./registry/schemas";
import { DATA_LAKE_PRESETS } from "./registry/dataLakePresets";
import { DEMO_SCENARIOS } from "./registry/scenarios";
import { compileGraph, selectBinding } from "./compile/toWorkflow";
import { SimulatedAdapter } from "./adapters/simulated";
import { IdentitySession } from "./adapters/identity";
import { LiveAdapter } from "./adapters/live";
import type { RhmAdapter, RunHandle } from "./adapters/RhmAdapter";
import { resolveMode, apiBaseFromEnv, identityBaseFromEnv, type RhmEnv } from "./adapters/selectAdapter";
import { runNodes } from "./run/runNodes";
import type { VerificationKind } from "./registry/types";
import { verificationFromOracle } from "./mrf/labels";
import { usageToTelemetry } from "./run/observability";
import { emptyUsage } from "./run/telemetry";
import { mrfDocument, recheckMapping, withDriftEvidence } from "./mrf/drift";
import { failingChecks } from "./mrf/checks";

const nodeTypes: NodeTypes = { agent: AgentNode, dataLake: DataLakeNode };
const edgeTypes = { packet: PacketEdge } as EdgeTypes;

type ShellView = "landing" | "signin" | "canvas";

export default function App() {
  const {
    nodes, edges, uiState, tracks, openHub, spawn, setUiState, completeLink, cancelLink,
    setNodeStatus, resetRun, onNodesChange, setEdgeActive, recordHandle, recordTelemetry, recordUtterance,
    loadScenario, markRunStart, markRunEnd, setPipelineStage, setScienceReceipt, scenarioId, pushTelemetryEvent, sessionId,
    mrfMapping, mrfSource, setMrfMapping, setMrfSource,
  } = useStore();
  const [liveAdapter, setLiveAdapter] = useState<LiveAdapter | null>(null);
  const [identitySession, setIdentitySession] = useState<IdentitySession | null>(null);
  const [inference, setInference] = useState<InferenceStatus | null>(null);
  const [paidConsent, setPaidConsent] = useState(false);
  const [spendCap, setSpendCap] = useState("0");
  const [showInference, setShowInference] = useState(false);
  const [running, setRunning] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const handlesRef = useRef<RunHandle[]>([]);
  const adapterRef = useRef<RhmAdapter | null>(null);
  const stoppedRef = useRef(false);
  const runEpoch = useRef(0);
  const nonce = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  const env = import.meta.env as unknown as RhmEnv;
  const mode = resolveMode(env);
  const simulated = useMemo(() => new SimulatedAdapter(), []);
  const requiresPaidConsent = !!inference?.configured;
  const providerBlocked = !inference?.configured || !Number.isFinite(Number(spendCap)) || Number(spendCap) < 0 || (requiresPaidConsent && (!paidConsent || Number(spendCap) <= 0));
  const adapter: RhmAdapter | null = mode === "live" ? liveAdapter : simulated;
  const [view, setView] = useState<ShellView>("landing");
  const pendingMrf = useRef(false);

  const apiBase = apiBaseFromEnv(env);
  const identityBase = identityBaseFromEnv(env);

  useEffect(() => {
    if (mode !== "live") return;
    let cancelled = false;
    setRestoring(true);
    const sess = new IdentitySession(identityBase, apiBase);
    void sess.restore().then((ok) => {
      if (cancelled) return;
      if (ok) {
        setIdentitySession(sess);
        setLiveAdapter(new LiveAdapter(apiBase, sess));
        setView("canvas");
      }
      setRestoring(false);
    });
    return () => { cancelled = true; };
  }, [mode, apiBase, identityBase]);

  const spawnPreset = (kind: "agent" | "dataLake", presetId: string) => {
    const p = kind === "agent" ? AGENT_PRESETS.find((x) => x.id === presetId)! : DATA_LAKE_PRESETS.find((x) => x.id === presetId)!;
    const count = useStore.getState().nodes.length;
    const node: CanvasNode = {
      id: nextId(kind), type: kind, position: { x: 80 + (count % 3) * 340, y: 120 + Math.floor(count / 3) * 220 },
      data: {
        kind, presetId, title: p.title, description: p.description, color: p.color,
        ...(kind === "agent" ? { schemaText: defaultSchemaText(presetId), verification: "proposal" as const } : {}),
      },
    };
    spawn(node);
  };

  const toggleRun = async () => {
    if (running) {
      stoppedRef.current = true;
      runEpoch.current += 1;
      const created = handlesRef.current;
      if (adapterRef.current) void Promise.allSettled(created.map((h) => adapterRef.current!.cancel(h)));
      handlesRef.current = [];
      setRunning(false);
      resetRun();
      return;
    }
    if (!adapter || (mode === "live" && providerBlocked)) return;
    liveAdapter?.setPaidInferenceConsent(paidConsent);
    const epoch = ++runEpoch.current;
    const isCurrent = () => epoch === runEpoch.current && !stoppedRef.current;
    stoppedRef.current = false;
    handlesRef.current = [];
    adapterRef.current = adapter;
    resetRun();
    setRunning(true);
    setUiState({ kind: "running" });
    markRunStart();
    try {
      const capabilities = adapter.mode === "live"
        ? await adapter.capabilities().catch(() => null)
        : null;
      const binding = adapter.mode === "live" && adapter.workspaces
        ? selectBinding(await adapter.workspaces().catch(() => []))
        : null;
      if (!isCurrent()) return;
      const t0 = performance.now();
      const graph = useStore.getState();
      const onlyPresets = scenarioId === "mrf-pipeline"
        ? (graph.mrfSource === "drift" ? ["mrf-maintainer"] : ["mrf-builder"])
        : undefined;
      let compiled = compileGraph(graph.nodes, graph.edges, nonce, capabilities, binding).map(item => {
        if (mode !== "live") return item;
        const { model_preference: _model, ...workflow } = item.workflow;
        return { ...item, workflow: { ...workflow, budget: { ...workflow.budget, max_usd: Number(spendCap) } } };
      });
      if (scenarioId === "mrf-pipeline") {
        compiled = withDriftEvidence(compiled, graph.mrfSource);
        compiled = compiled.filter((c) => onlyPresets!.includes(graph.nodes.find((n) => n.id === c.nodeId)?.data.presetId ?? ""));
      }
      await runNodes(adapter, compiled, {
        onStatus: (id, status, output) => {
          if (!isCurrent()) return;
          const node = useStore.getState().nodes.find((n) => n.id === id);
          let verification: VerificationKind | undefined;
          if (status === "done" || status === "error") verification = "proposal";
          setNodeStatus(id, status, output, verification);
          if (status === "error") setPipelineStage("fail");
          else if (status === "processing") setPipelineStage(node?.data.presetId === "maintainer" || node?.data.presetId === "mrf-maintainer" ? "repair" : "execute");
        },
        onHandle: (h) => {
          if (!isCurrent()) return; // runNodes cancels a late handle itself
          handlesRef.current = [...handlesRef.current, h];
          recordHandle(h.nodeId, h.runId);
        },
        shouldStop: () => !isCurrent(),
        graph: { nodes: graph.nodes, edges: graph.edges },
        onTelemetry: (nodeId, usage, workspace) => {
          if (!isCurrent()) return;
          recordTelemetry(nodeId, usage, workspace);
        },
        onOutcome: (nodeId, outcome) => {
          if (!isCurrent()) return;
          const usage = outcome.usage ?? emptyUsage(adapter.mode);
          const node = useStore.getState().nodes.find((n) => n.id === nodeId);
          const lakes = useStore.getState().nodes.filter((n) => n.data.kind === "dataLake").map((n) => n.data.presetId);
          pushTelemetryEvent({
            schema_version: "canvas.telemetry.v1",
            session_id: sessionId,
            scenario_id: scenarioId ?? undefined,
            run_id: useStore.getState().tracks.find((t) => t.nodeId === nodeId)?.runId,
            agent_node_id: nodeId,
            agent_preset_id: node?.data.presetId ?? "unknown",
            lake_fixture_ids: lakes,
            t_start_ms: t0,
            t_end_ms: performance.now(),
            status: outcome.status,
            completion_basis: outcome.basis,
            usage: usageToTelemetry(usage),
            source: usage.source,
          });
        },
        onUtterance: (...args) => { if (isCurrent()) recordUtterance(...args); },
        onEdgeActive: (ids, active) => { if (isCurrent()) setEdgeActive(ids, active); },
        mrf: scenarioId === "mrf-pipeline" ? {
          fixture: mrfDocument(useStore.getState().mrfSource),
          initialMapping: useStore.getState().mrfMapping,
          initialChecks: useStore.getState().scienceReceipt?.checks ?? [],
          onEvaluated: (_nodeId, ev) => {
            if (!isCurrent()) return;
            if (ev.mapping) setMrfMapping(ev.mapping);
            const nodeNow = useStore.getState().nodes.find((n) => n.id === _nodeId);
            setNodeStatus(
              _nodeId,
              ev.invalidProposal ? "error" : (nodeNow?.data.status ?? "done"),
              nodeNow?.data.output,
              verificationFromOracle({ checksPassed: !!ev.passed && !ev.invalidProposal }),
            );
            const failed = ev.checks.filter((c) => !c.pass).map((c) => c.name);
            const stNow = useStore.getState();
            setScienceReceipt({
              scenarioId,
              mapping: ev.mapping ? JSON.stringify(ev.mapping) : undefined,
              flags: failed,
              tokens: stNow.totals.totalTokens,
              contentFreeIds: stNow.tracks.map((t) => t.runId).filter(Boolean) as string[],
              checks: ev.checks,
              invalidProposal: ev.invalidProposal,
              oracleNote: ev.invalidProposal
                ? "invalid proposal"
                : ev.declined
                  ? `Maintainer declined (${ev.declined.reason_code})`
                  : ev.passed
                    ? "Pinned checks 16/2/14 + digest passed locally. Not Verified (no Coding SHA)."
                    : `Named check failed: ${failed.join(", ") || "unknown"}`,
            });
          },
        } : undefined,
      });
      if (!isCurrent()) return;
      markRunEnd();
      const st = useStore.getState();
      setPipelineStage(st.tracks.every((t) => t.status === "done") ? "complete" : "fail");
      if (scenarioId === "mrf-pipeline") {
        const prev = useStore.getState().scienceReceipt;
        if (prev) {
          setScienceReceipt({
            ...prev,
            tokens: st.totals.totalTokens,
            contentFreeIds: st.tracks.map((t) => t.runId).filter(Boolean) as string[],
          });
        }
      } else {
        const mappingOut = st.nodes.find((n) => n.data.presetId === "builder")?.data.output;
        const maintainerOut = st.nodes.find((n) => n.data.presetId === "maintainer")?.data.output;
        const denialOut = st.nodes.find((n) => n.data.presetId === "denial-predictor")?.data.output;
        const qcOut = st.nodes.find((n) => n.data.presetId === "assay-qc")?.data.output;
        const fixtureVerified = scenarioId === "pilot-storyboard"
          && st.tracks.length > 0
          && st.tracks.every((t) => t.status === "done")
          && (mappingOut?.includes("reading_column") ?? false)
          && (maintainerOut?.includes("reading_column") ?? false);
        setScienceReceipt({
          scenarioId,
          mapping: mappingOut?.slice(0, 200),
          flags: [],
          riskOrQc: denialOut ?? qcOut,
          tokens: st.totals.totalTokens,
          contentFreeIds: st.tracks.map((t) => t.runId).filter(Boolean) as string[],
          fixtureVerified,
          oracleNote: fixtureVerified
            ? "Local fixture check passed. Agent badges stay proposals."
            : scenarioId === "pilot-storyboard" && mode === "simulated"
              ? "Simulated repair proposals. Local fixture check did not pass."
              : maintainerOut ? "Maintainer proposal recorded." : undefined,
        });
      }
    } catch {
      if (isCurrent()) { markRunEnd(); setPipelineStage("fail"); }
    } finally {
      if (isCurrent()) { setRunning(false); setUiState({ kind: "idle" }); }
    }
  };

  const injectDrift = () => {
    if (running || !adapter || (mode === "live" && providerBlocked)) return;
    const mapping = useStore.getState().mrfMapping;
    if (!mapping) {
      setScienceReceipt({
        scenarioId, flags: [], tokens: 0, contentFreeIds: [],
        oracleNote: "Run Builder first so a mapping exists to recheck.",
      });
      return;
    }
    setMrfSource("drift");
    const evaluated = recheckMapping("drift", mapping);
    const failed = failingChecks(evaluated.checks);
    setPipelineStage("fail");
    setScienceReceipt({
      scenarioId,
      mapping: JSON.stringify(mapping),
      flags: failed.map((c) => c.name),
      tokens: useStore.getState().totals.totalTokens,
      contentFreeIds: useStore.getState().tracks.map((t) => t.runId).filter(Boolean) as string[],
      checks: evaluated.checks,
      oracleNote: failed.length
        ? `Named check failed: ${failed.map((c) => c.name).join(", ")}`
        : "Drift did not fail a pinned check.",
    });
    void toggleRun();
  };

  const signOut = async () => {
    setSigningOut(true);
    setSessionError(null);
    stoppedRef.current = true;
    runEpoch.current += 1;
    const pending = handlesRef.current.map((h) => adapterRef.current?.cancel(h).catch(() => undefined));
    handlesRef.current = [];
    setRunning(false);
    // Dispatch cancellation while the session still has its access token.
    void Promise.allSettled(pending);
    useStore.getState().clearSession();
    setLiveAdapter(null);
    setIdentitySession(null);
    setInference(null);
    setSpendCap("0");
    setPaidConsent(false);
    setView("landing");
    try {
      await identitySession?.logout();
    } catch {
      setSessionError("Local session cleared. Server sign-out failed; reconnect and sign out again before refreshing this page.");
    } finally {
      setSigningOut(false);
    }
  };

  if (restoring || signingOut) {
    return <div className="flex h-full items-center justify-center text-sm opacity-70">{signingOut ? "Signing out…" : "Restoring session…"}</div>;
  }

  if (view === "landing") {
    return (
      <LandingPage
        mode={mode}
        sessionError={sessionError}
        onSignIn={() => setView("signin")}
        onEnterCanvas={() => setView("canvas")}
        onLoadMrf={() => {
          pendingMrf.current = true;
          if (mode === "live") setView("signin");
          else {
            setView("canvas");
            loadScenario("mrf-pipeline");
          }
        }}
      />
    );
  }

  if (view === "signin" && mode === "live") {
    return (
      <SessionPanel
        variant="page"
        apiBase={apiBase}
        identityBase={identityBase}
        onAuthenticated={(adapterLive, sess) => {
          setLiveAdapter(adapterLive);
          setIdentitySession(sess);
          setView("canvas");
          if (pendingMrf.current) loadScenario("mrf-pipeline");
        }}
      />
    );
  }

  return <div className="flex h-full" onClick={() => { if (uiState.kind === "linking") cancelLink(); }}>
    <div className="relative h-full min-w-0 flex-1">
    <VoidBackground />
    {mode === "live" && identitySession && <aside className="absolute right-2 top-16 z-30 max-h-[75vh] w-[min(400px,90vw)] overflow-auto">
      <button type="button" className="glass p-2 text-xs" onClick={() => setShowInference(!showInference)}>Account inference settings</button>
      <div hidden={!showInference}><InferencePanel apiBase={apiBase} session={identitySession} onStatus={next => { setInference(next); setPaidConsent(false); }} disabled={running} />
        <label className="glass block p-3 text-xs"><input type="checkbox" checked={paidConsent} disabled={running} onChange={e => setPaidConsent(e.target.checked)} />I permit paid inference on this account's configured providers for these runs.</label>
        <label className="glass block p-3 text-xs">USD admission budget per agent run<input aria-label="USD admission budget per agent run" type="number" min="0" step="0.01" value={spendCap} disabled={running} onChange={e => setSpendCap(e.target.value)} />Each agent submits a separate bounded run. All configured endpoints require a positive admission cap; charges may apply. Dollar accounting is provider-dependent; set a hard spending limit on your provider key. No automatic paid retries.</label>
      </div>
    </aside>}
    {nodes.length === 0 && uiState.kind !== "hub" && (
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[min(420px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-center">
        <div className="font-display text-2xl text-fuchsia-100">Team 8 science canvas</div>
        <p className="text-sm text-white/70">Start from the pilot, or build your own graph.</p>
        <SyntheticBadge />
        <button
          type="button"
          className="rounded-full bg-fuchsia-400/90 px-6 py-3 text-sm font-semibold text-[#1a0b28]"
          onClick={(e) => { e.stopPropagation(); loadScenario("pilot-storyboard"); }}
        >
          Load Pilot storyboard
        </button>
        <motion.button layoutId="hub" aria-label="Create" className="text-sm text-white/70 underline-offset-4 hover:underline" onClick={(e) => { e.stopPropagation(); openHub(); }}>
          Create
        </motion.button>
      </div>
    )}
    {nodes.length > 0 && uiState.kind !== "hub" && (
      <button aria-label="Create" disabled={running} className="glass absolute bottom-6 right-6 z-10 p-3 text-fuchsia-300 disabled:opacity-50" onClick={(e) => { e.stopPropagation(); openHub(); }}><Plus size={20} /></button>
    )}
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView fitViewOptions={{ padding: 0.28 }} maxZoom={1.05}
      deleteKeyCode={running ? null : ["Backspace", "Delete"]}
      onNodesChange={onNodesChange}
      onNodeClick={(_, n) => {
        if (uiState.kind === "linking") completeLink(n.id);
        else setUiState({ kind: "menu", nodeId: n.id });
      }}>
      <Background /><Controls position="top-left" />
    </ReactFlow>
    <AnimatePresence>{uiState.kind === "hub" && (
      <motion.div layoutId="hub" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass absolute left-1/2 top-1/2 z-10 w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 p-5" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 font-semibold">Create</h2>
        <div className="text-xs uppercase opacity-60">Agent</div>
        <div className="my-2 grid grid-cols-2 gap-2">{AGENT_PRESETS.map((p) => <button key={p.id} className="glass p-3 text-left" onClick={() => spawnPreset("agent", p.id)}>{p.title}<div className="text-xs opacity-70">{p.description}</div></button>)}</div>
        <div className="mt-3 text-xs uppercase opacity-60">Data Lake — declared inputs, not executable tools</div>
        <div className="my-2 grid grid-cols-2 gap-2">{DATA_LAKE_PRESETS.map((p) => <button key={p.id} className="glass p-3 text-left" onClick={() => spawnPreset("dataLake", p.id)}>{p.title}<div className="text-xs opacity-70">{p.description}</div></button>)}</div>
        <div className="mt-3 text-xs uppercase opacity-60">Other demos</div>
        <div className="my-2 flex flex-wrap gap-2">
          {DEMO_SCENARIOS.filter((sc) => sc.id !== "pilot-storyboard").map((sc) => (
            <button key={sc.id} type="button" className="text-xs text-white/70 underline-offset-2 hover:underline" onClick={() => loadScenario(sc.id)}>{sc.title}</button>
          ))}
        </div>
        <button className="text-sm opacity-70" onClick={() => setUiState({ kind: "void" })}>Close</button>
      </motion.div>)}
    </AnimatePresence>
    {tracks.length > 0 && (
      <div className="pointer-events-none absolute bottom-20 left-4 z-10 [&>*]:pointer-events-auto">
        <ConversationPanel />
      </div>
    )}
    {mode === "live" && !inference?.configured && <p className="glass absolute bottom-20 left-2 z-20 max-w-sm p-2 text-xs">Open Account inference settings and select your provider before running. This account cannot use the operator's model automatically.</p>}
    {edges.length > 0 && (
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <button aria-label={running ? "Stop run" : "Run pipeline"} disabled={!running && (!adapter || (mode === "live" && providerBlocked))} className="glass flex items-center gap-2 px-5 py-2 disabled:opacity-50" onClick={(e) => { e.stopPropagation(); void toggleRun(); }}>{running ? <Square size={14} /> : <Play size={14} />}{running ? "Stop" : "Run Pipeline"}</button>
        {scenarioId === "mrf-pipeline" && (
          <button type="button" aria-label="Upstream schema drift" disabled={running || !mrfMapping} className="glass px-4 py-2 text-xs disabled:opacity-50" onClick={(e) => { e.stopPropagation(); injectDrift(); }}>
            Upstream schema drift
          </button>
        )}
      </div>
    )}
    {uiState.kind === "linking" && <div className="glass absolute left-1/2 top-4 z-10 -translate-x-1/2 px-4 py-1 text-sm">Click a valid target to lock the link (click empty space to cancel)</div>}
    <SchemaWindow />
    <LakeInspector />
    </div>
    <div className="flex h-full w-[320px] shrink-0 flex-col gap-3 overflow-y-auto border-l border-white/10 bg-[#070312]/80 p-3">
      <div className="glass flex flex-col gap-1 self-stretch px-3 py-2 text-xs">
        <div className="font-display text-sm text-fuchsia-100">Team 8 · Science canvas</div>
        <div className="flex flex-wrap items-center gap-2">
          <span>Mode: {mode}{mode === "live" && !liveAdapter ? " — sign in required" : ""}</span>
          <SyntheticBadge />
        </div>
        {mode === "live" && liveAdapter && (
          <button type="button" className="mt-1 inline-flex items-center gap-1 self-start text-[10px] opacity-80" onClick={() => void signOut()}>
            <LogOut size={12} /> Sign out
          </button>
        )}
        {mode === "simulated" && (
          <button type="button" disabled={running} className="mt-1 text-[10px] opacity-70 disabled:opacity-50" onClick={() => setView("landing")}>Back to landing</button>
        )}
      </div>
      <MetricsPanel />
      <ScienceReceipt />
      <WorkspacePanel />
    </div>
  </div>;
}
