import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ReactFlow, Background, Controls, useReactFlow, type NodeTypes, type EdgeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Play, Settings, Square } from "lucide-react";
import VoidBackground from "./ui/VoidBackground";
import { liveRunBlocked, type InferenceStatus } from "./adapters/inference";
import SessionPanel from "./ui/SessionPanel";
import MetricsPanel from "./ui/MetricsPanel";
import ConversationPanel from "./ui/ConversationPanel";
import WorkspacePanel from "./ui/WorkspacePanel";
import SchemaWindow from "./ui/SchemaWindow";
import ContractLibrary from "./ui/library/ContractLibrary";
import ActivityPanel from "./ui/activity/ActivityPanel";
import OutputInspector from "./ui/inspect/OutputInspector";
import CommandPalette, { CheatSheet } from "./ui/commands/CommandPalette";
import { isTypingTarget, OPEN_CONTRACTS_EVENT, registerCommands } from "./ui/commands/commands";
import McpWindow from "./ui/McpWindow";
import LandingPage from "./ui/LandingPage";
import LakeInspector from "./ui/LakeInspector";
import ScienceReceipt from "./ui/ScienceReceipt";
import SyntheticBadge from "./ui/SyntheticBadge";
import UserBar from "./ui/UserBar";
import HistoryPanel from "./ui/HistoryPanel";
import ReadinessPanel from "./ui/ReadinessPanel";
import { AgentNode, DataLakeNode } from "./canvas/nodes";
import PacketEdge from "./canvas/PacketEdge";
import { useStore, nextId, type CanvasNode } from "./state/store";
import { AGENT_PRESETS } from "./registry/agentPresets";
import { defaultSchemaText } from "./registry/schemas";
import { CREATE_MENU_PRESETS } from "./registry/createMenuPresets";
import { DATA_LAKE_PRESETS } from "./registry/dataLakePresets";
import { DEMO_SCENARIOS, scenarioById } from "./registry/scenarios";
import { useToast } from "./ui/toasts/ToastProvider";
import { compileGraph, selectBinding } from "./compile/toWorkflow";
import { buildCanvasSnapshot, downloadCanvasSnapshot, parseCanvasSnapshot } from "./state/canvasSnapshot";
import { liveReadiness, simulatedReadiness } from "./adapters/readiness";
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
import { bootDemo, demoPath, exitDemoPath, isDemoScenarioId, type DemoScenarioId } from "./demo/boot";
import DemoBanner from "./demo/DemoBanner";
import HospitalPipelinePanel from "./ui/HospitalPipelinePanel";
import { hospitalModelAdapter } from "./run/hospitalPipeline";
import SettingsDialog from "./ui/SettingsDialog";

const nodeTypes: NodeTypes = { agent: AgentNode, dataLake: DataLakeNode };
const edgeTypes = { packet: PacketEdge } as EdgeTypes;

function FitHospitalRun() {
  const { fitView } = useReactFlow();
  const scenario = useStore(state => state.scenarioId), ended = useStore(state => state.runEndedAt);
  const nodes = useStore(state => state.nodes);
  const contentVersion = nodes.filter(node => ["hospital-source", "mrf-hospital-builder", "mrf-hospital-maintainer", "hospital-store", "hospital-analyst"].includes(node.data.presetId))
    .map(node => `${node.id}:${node.data.status}:${node.data.output?.length ?? 0}`).join("|");
  useEffect(() => {
    if (scenario !== "hospital-pipeline" || !ended) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => { void fitView({ padding: 0.12, duration: 350, maxZoom: 1.15 }); });
    });
    return () => { cancelAnimationFrame(firstFrame); if (secondFrame) cancelAnimationFrame(secondFrame); };
  }, [scenario, ended, contentVersion, fitView]);
  return null;
}

type ShellView = "landing" | "signin" | "canvas";

export default function App() {
  const {
    nodes, edges, uiState, tracks, openHub, spawn, setUiState, completeLink, cancelLink,
    setNodeStatus, resetRun, onNodesChange, setEdgeActive, recordHandle, recordTelemetry, recordUtterance,
    loadScenario, markRunStart, markRunEnd, setPipelineStage, setScienceReceipt, scenarioId, pushTelemetryEvent, sessionId,
    mrfMapping, mrfSource, setMrfMapping, setMrfSource,
    linkNotice, setLinkageContext, clearSession, selectedWorkspaceId, setSelectedWorkspaceId, loadSnapshot,
    setStatusHint, clearStatusHint,
  } = useStore();
  const { toast } = useToast();
  const [snapshotNotice, setSnapshotNotice] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [cheatOpen, setCheatOpen] = useState(false);
  const [liveAdapter, setLiveAdapter] = useState<LiveAdapter | null>(null);
  const [identitySession, setIdentitySession] = useState<IdentitySession | null>(null);
  const [inference, setInference] = useState<InferenceStatus | null>(null);
  const [paidConsent, setPaidConsent] = useState(false);
  const [spendCap, setSpendCap] = useState("0");
  const [tier, setTier] = useState<"free" | "premium">("free");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsButton = useRef<HTMLButtonElement>(null);
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
  const [demo, setDemo] = useState(() => bootDemo(window.location.search));
  const shellMode = demo.enabled ? "simulated" : mode;
  const simulated = useMemo(() => new SimulatedAdapter(), []);
  const providerBlocked = liveRunBlocked(inference, tier, spendCap, paidConsent);
  const adapter: RhmAdapter | null = shellMode === "live" ? liveAdapter : simulated;
  const readiness = useMemo(
    () => (shellMode === "live" && liveAdapter ? liveReadiness(liveAdapter) : simulatedReadiness),
    [shellMode, liveAdapter],
  );
  const [view, setView] = useState<ShellView>(demo.enabled ? "canvas" : "landing");
  const demoBooted = useRef(false);
  const demoRan = useRef(false);

  const apiBase = apiBaseFromEnv(env);
  const identityBase = identityBaseFromEnv(env);

  const announceLoad = (id: string) => {
    const scenario = scenarioById(id);
    if (!scenario) return;
    setSnapshotNotice(null);
    loadScenario(id);
    toast({ level: "ok", title: `Loaded ${scenario.title}`, detail: "In this tab only." });
  };

  useLayoutEffect(() => {
    if (!demo.enabled || demoBooted.current) return;
    demoBooted.current = true;
    announceLoad(demo.scenarioId);
    setStatusHint("Demo mode");
  }, [demo.enabled, demo.scenarioId]);

  useEffect(() => {
    if (shellMode !== "live") return;
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
  }, [shellMode, apiBase, identityBase]);

  useEffect(() => {
    if (shellMode !== "live" || !liveAdapter) {
      setLinkageContext({ mode: "simulated", capabilities: null, hasWorkspaceBinding: false });
      return;
    }
    let cancelled = false;
    void (async () => {
      const capabilities = await liveAdapter.capabilities().catch(() => null);
      const binding = selectBinding(
        liveAdapter.workspaces ? await liveAdapter.workspaces().catch(() => []) : [],
        useStore.getState().selectedWorkspaceId ?? undefined,
      );
      if (!cancelled) setLinkageContext({ mode: "live", capabilities, hasWorkspaceBinding: !!binding });
    })();
    return () => { cancelled = true; };
  }, [shellMode, liveAdapter, selectedWorkspaceId, setLinkageContext]);

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

  const chooseScenario = (id: DemoScenarioId) => {
    if (!isDemoScenarioId(id)) return;
    window.history.replaceState({}, "", demoPath(window.location.search, id));
    setDemo(bootDemo(window.location.search));
    announceLoad(id);
  };

  const exitDemo = () => {
    window.history.replaceState({}, "", exitDemoPath(window.location.search));
    setDemo(bootDemo(window.location.search));
    setSnapshotNotice(null);
    clearSession();
    clearStatusHint();
    setView("landing");
  };

  const toggleRun = async () => {
    if (scenarioId === "hospital-pipeline") return;
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
    if (!adapter) {
      toast({ level: "error", title: "Sign in required", detail: "Run has no session yet." });
      setStatusHint("Sign in required");
      return;
    }
    if (shellMode === "live" && providerBlocked) return;
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
        ? selectBinding(await adapter.workspaces().catch(() => []), useStore.getState().selectedWorkspaceId ?? undefined)
        : null;
      if (!isCurrent()) return;
      setLinkageContext({
        mode: adapter.mode === "live" ? "live" : "simulated",
        capabilities,
        hasWorkspaceBinding: !!binding,
      });
      const t0 = performance.now();
      const graph = useStore.getState();
      const onlyPresets = scenarioId === "mrf-pipeline"
        ? (graph.mrfSource === "drift" ? ["mrf-maintainer"] : ["mrf-builder"])
        : undefined;
      let compiled = compileGraph(
        graph.nodes,
        graph.edges,
        nonce,
        capabilities,
        binding,
        adapter.mode === "live" ? "live" : "simulated",
      ).map(item => {
        if (shellMode !== "live") return item;
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
            : scenarioId === "pilot-storyboard" && shellMode === "simulated"
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
    if (running || !adapter || (shellMode === "live" && providerBlocked)) return;
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

  useEffect(() => {
    if (!demo.enabled || !demo.autorun || edges.length === 0) return;
    const timer = window.setTimeout(() => {
      if (demoRan.current) return;
      demoRan.current = true;
      void toggleRun();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [demo.enabled, demo.autorun, edges.length]);

  const commands = registerCommands({
    loadScenario: (id) => { setView("canvas"); announceLoad(id); },
    openHub: () => { setView("canvas"); openHub(); },
    toggleRun: () => { void toggleRun(); },
    clearCanvas: () => { setSnapshotNotice(null); clearSession(); useStore.getState().pushActivity({ kind: "clear", title: "Canvas cleared", level: "info" }); },
    backToLanding: () => setView("landing"),
    openContracts: () => {
      setView("canvas");
      window.setTimeout(() => window.dispatchEvent(new Event(OPEN_CONTRACTS_EVENT)), 0);
    },
    exportSnapshot: () => {
      const state = useStore.getState();
      downloadCanvasSnapshot(buildCanvasSnapshot(state.nodes, state.edges));
    },
    importSnapshot: () => {
      setView("canvas");
      window.setTimeout(() => document.querySelector<HTMLInputElement>('[data-testid="snapshot-file"]')?.click(), 0);
    },
    canRun: view === "canvas" && edges.length > 0 && !!adapter,
    running,
    canLeave: shellMode === "simulated",
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        setPaletteOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setCheatOpen(false);
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        if (view === "canvas" && edges.length > 0) {
          event.preventDefault();
          void toggleRun();
        }
        return;
      }
      if (event.key === "?" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        setCheatOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adapter, edges.length, toggleRun, view]);

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
    setTier("free");
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

  const commandChrome = (
    <>
      {paletteOpen && <CommandPalette commands={commands} onClose={() => setPaletteOpen(false)} />}
      {cheatOpen && <CheatSheet onClose={() => setCheatOpen(false)} />}
    </>
  );

  if (restoring || signingOut) {
    return <div className="flex h-full items-center justify-center text-sm opacity-70">{signingOut ? "Signing out…" : "Restoring session…"}</div>;
  }

  if (view === "landing") {
    return (
      <>
      <LandingPage
        mode={shellMode}
        sessionError={sessionError}
        onSignIn={() => setView("signin")}
        onEnterCanvas={() => setView("canvas")}
        onLoadMrf={() => {
          setView("canvas");
          loadScenario("hospital-pipeline");
        }}
      />
      {commandChrome}
      </>
    );
  }

  if (view === "signin" && shellMode === "live") {
    return (
      <>
      <SessionPanel
        variant="page"
        onCancel={() => setView("landing")}
        apiBase={apiBase}
        identityBase={identityBase}
        onAuthenticated={(adapterLive, sess) => {
          setLiveAdapter(adapterLive);
          setIdentitySession(sess);
          setView("canvas");
        }}
      />
      {commandChrome}
      </>
    );
  }

  return <div className="flex h-full flex-col" onClick={(e) => {
    if (uiState.kind !== "linking") return;
    const target = e.target as HTMLElement | null;
    if (target?.closest(".react-flow__node, .react-flow__edge")) return;
    cancelLink();
  }}>
    <UserBar
      mode={shellMode}
      publicSource={scenarioId === "hospital-pipeline"}
      hospitalModelLive={!!hospitalModelAdapter(shellMode === "live" ? liveAdapter : null, inference, spendCap, paidConsent)}
      username={identitySession?.user?.username ?? null}
      signedIn={!!liveAdapter}
      busy={running}
      onSignIn={() => setView("signin")}
      onSignOut={() => void signOut()}
      onClear={() => { setSnapshotNotice(null); clearSession(); useStore.getState().pushActivity({ kind: "clear", title: "Canvas cleared", level: "info" }); }}
      onPilot={() => announceLoad("pilot-storyboard")}
      onExport={() => { setSnapshotNotice(null); downloadCanvasSnapshot(buildCanvasSnapshot(nodes, edges)); }}
      onImport={(file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const parsed = parseCanvasSnapshot(typeof reader.result === "string" ? reader.result : "");
          if (!parsed.ok) {
            setSnapshotNotice(parsed.error);
            return;
          }
          loadSnapshot(parsed.nodes, parsed.edges);
          setSnapshotNotice(null);
        };
        reader.onerror = () => setSnapshotNotice("Could not read that file.");
        reader.readAsText(file);
      }}
    />
    {snapshotNotice && (
      <p className="shrink-0 bg-amber-950/80 px-3 py-1 text-xs text-amber-100" role="alert" data-testid="snapshot-notice">{snapshotNotice}</p>
    )}
    {demo.enabled && scenarioId !== "hospital-pipeline" && (
      <DemoBanner
        scenarioId={demo.scenarioId}
        onScenario={chooseScenario}
        onReset={() => { announceLoad(demo.scenarioId); setStatusHint("Demo mode"); }}
        onExit={exitDemo}
      />
    )}
    <div className="flex min-h-0 flex-1">
    <div className="relative h-full min-w-0 flex-1">
    <VoidBackground />
    {shellMode === "live" && identitySession && <button ref={settingsButton} type="button" aria-label="Settings" disabled={running} className="glass absolute bottom-6 left-4 z-20 flex items-center gap-2 p-2 text-xs disabled:opacity-50" onClick={() => setSettingsOpen(true)}><Settings size={16} /><span className="hidden sm:inline">Settings</span></button>}
    {shellMode === "live" && identitySession && <SettingsDialog open={settingsOpen}
      inference={inference} apiBase={apiBase} session={identitySession} tier={tier} setTier={setTier}
      paidConsent={paidConsent} setPaidConsent={setPaidConsent} spendCap={spendCap} setSpendCap={setSpendCap}
      onStatus={next => { setInference(next); setPaidConsent(false); if (!next?.configured) { setTier("free"); setSpendCap("0"); } }}
      onClose={() => { setSettingsOpen(false); window.setTimeout(() => settingsButton.current?.focus(), 0); }} disabled={running}
    />}
    {nodes.length === 0 && uiState.kind !== "hub" && (
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[min(420px,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-center">
        <div className="font-display text-2xl text-fuchsia-100">Team 8 science canvas</div>
        <p className="text-sm text-white/70">Start from the pilot, or build your own graph.</p>
        <SyntheticBadge />
        <button
          type="button"
          className="rounded-full bg-fuchsia-400/90 px-6 py-3 text-sm font-semibold text-[#1a0b28]"
          onClick={(e) => { e.stopPropagation(); announceLoad("pilot-storyboard"); }}
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
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView fitViewOptions={{ padding: scenarioId === "hospital-pipeline" ? 0.12 : 0.28 }} maxZoom={scenarioId === "hospital-pipeline" ? 1.15 : 1.05}
      deleteKeyCode={running ? null : ["Backspace", "Delete"]}
      onNodesChange={onNodesChange}
      onNodeClick={(_, n) => {
        if (uiState.kind === "linking") completeLink(n.id);
        else setUiState({ kind: "menu", nodeId: n.id });
      }}>
      <Background /><Controls position="top-left" /><FitHospitalRun />
    </ReactFlow>
    <AnimatePresence>{uiState.kind === "hub" && (
      <motion.div layoutId="hub" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass absolute left-1/2 top-1/2 z-10 w-[min(560px,92vw)] -translate-x-1/2 -translate-y-1/2 p-5" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-3 font-semibold">Create</h2>
        <div className="mb-3">{DEMO_SCENARIOS.filter(sc => sc.id === "hospital-pipeline").map(sc => (
          <button key={sc.id} type="button" aria-label={sc.title} className="glass w-full p-3 text-left" onClick={() => announceLoad(sc.id)}>
            {sc.title}<div className="text-xs opacity-70">{sc.blurb}</div>
          </button>
        ))}</div>
        <div className="text-xs uppercase opacity-60">Core pipeline</div>
        <div role="group" aria-label="Core pipeline presets" className="my-2 grid grid-cols-2 gap-2">{CREATE_MENU_PRESETS.map((p) => <button key={p.id} className="glass p-3 text-left" onClick={() => spawnPreset(p.kind, p.id)}>{p.title}<div className="text-xs opacity-70">{p.description}</div></button>)}</div>
        <div className="mt-3 text-xs uppercase opacity-60">Other demos</div>
        <div className="my-2 flex flex-wrap gap-2">
          {DEMO_SCENARIOS.filter((sc) => !["pilot-storyboard", "hospital-pipeline"].includes(sc.id)).map((sc) => (
            <button key={sc.id} type="button" className="text-xs text-white/70 underline-offset-2 hover:underline" onClick={() => announceLoad(sc.id)}>{sc.title}</button>
          ))}
        </div>
        <button className="text-sm opacity-70" onClick={() => setUiState({ kind: "void" })}>Close</button>
      </motion.div>)}
    </AnimatePresence>
    {tracks.length > 0 && scenarioId !== "hospital-pipeline" && (
      <div className="pointer-events-none absolute bottom-[4.5rem] left-4 z-10 [&>*]:pointer-events-auto">
        <ConversationPanel />
      </div>
    )}
    {scenarioId !== "hospital-pipeline" && shellMode === "live" && !inference?.configured && !inference?.host_models_authorized && <p className="glass absolute bottom-[4.5rem] left-2 z-20 max-w-sm p-2 text-xs">Open Settings and add a provider before running.</p>}
    {edges.length > 0 && scenarioId !== "hospital-pipeline" && (
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        <button aria-label={running ? "Stop run" : "Run pipeline"} disabled={!running && (!adapter || (shellMode === "live" && providerBlocked))} title={!running && !adapter ? "Sign in before Run." : undefined} className="glass flex items-center gap-2 px-5 py-2 disabled:opacity-50" onClick={(e) => { e.stopPropagation(); void toggleRun(); }}>{running ? <Square size={14} /> : <Play size={14} />}{running ? "Stop" : "Run Pipeline"}</button>
        {scenarioId === "mrf-pipeline" && (
          <button type="button" aria-label="Upstream schema drift" disabled={running || !mrfMapping || (shellMode === "live" && providerBlocked)} className="glass px-4 py-2 text-xs disabled:opacity-50" onClick={(e) => { e.stopPropagation(); injectDrift(); }}>
            Upstream schema drift
          </button>
        )}
      </div>
    )}
    {uiState.kind === "linking" && (
      <div className="glass absolute left-1/2 top-4 z-10 max-w-md -translate-x-1/2 px-4 py-2 text-sm" data-testid="link-banner">
        <div>
          {nodes.find((n) => n.id === uiState.sourceId)?.data.kind === "dataLake"
            ? scenarioId === "hospital-pipeline" ? "Click an agent. The source feeds bounded public hospital evidence." : "Click an agent. This lake becomes synthetic evidence. Several lakes can feed one agent."
            : "Click another agent to hand off. Lakes are not writable from an agent."}
        </div>
        <div className="text-[10px] opacity-60">Click empty space to cancel.</div>
        {linkNotice && <div className="mt-1 text-rose-200" data-testid="link-notice">{linkNotice}</div>}
      </div>
    )}
    <ContractLibrary />
    <OutputInspector />
    <SchemaWindow />
    <McpWindow />
    <LakeInspector />
    </div>
    <div className={`flex h-full shrink-0 flex-col gap-3 overflow-y-auto border-l border-white/10 bg-[#070312]/80 p-3 ${scenarioId === "hospital-pipeline" ? "w-[min(384px,32vw)]" : "w-[320px]"}`}>
      <div className="glass flex flex-col gap-1 self-stretch px-3 py-2 text-xs">
        <div className="font-display text-sm text-fuchsia-100">Team 8 · Science canvas</div>
        <div className="flex flex-wrap items-center gap-2">
          {scenarioId !== "hospital-pipeline" && <SyntheticBadge />}
        </div>
        {shellMode === "simulated" && (
          <button type="button" disabled={running} className="mt-1 text-[10px] opacity-70 disabled:opacity-50" onClick={() => setView("landing")}>Back to landing</button>
        )}
      </div>
      {scenarioId === "hospital-pipeline" && <HospitalPipelinePanel key={sessionId} adapter={hospitalModelAdapter(shellMode === "live" ? liveAdapter : null, inference, spendCap, paidConsent)} budget={Number(spendCap)} prepareLocalModel={() => liveAdapter?.setPaidInferenceConsent(false)} mode={shellMode} accessToken={identitySession?.token ?? null} />}
      {scenarioId !== "hospital-pipeline" && <HistoryPanel mode={shellMode} client={shellMode === "live" ? liveAdapter : null} />}
      <ReadinessPanel
        mode={shellMode === "live" && liveAdapter ? "live" : "simulated"}
        port={readiness}
        selectedWorkspaceId={selectedWorkspaceId}
        onSelectWorkspace={setSelectedWorkspaceId}
      />
      <MetricsPanel />
      <ActivityPanel />
      <ScienceReceipt />
      {scenarioId !== "hospital-pipeline" && <WorkspacePanel />}
    </div>
    {commandChrome}
    </div>
  </div>;
}
