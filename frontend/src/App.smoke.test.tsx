import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import App from "./App";
import { ToastProvider } from "./ui/toasts/ToastProvider";
import { useStore } from "./state/store";
import { emptyUsage } from "./run/telemetry";
import { newSessionId } from "./run/telemetryEvents";
import { SimulatedAdapter } from "./adapters/simulated";
import { IdentitySession } from "./adapters/identity";
import { InferenceSettings } from "./adapters/inference";
import { LiveAdapter } from "./adapters/live";
import type { RunOutcome } from "./adapters/RhmAdapter";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

// jsdom has no layout engine. React Flow asks for these on mount, so stub them.
// This is a DOM-level smoke test, not a real browser drive.
class RO { observe() {} unobserve() {} disconnect() {} }
vi.stubGlobal("ResizeObserver", RO);
if (!window.DOMMatrixReadOnly) {
  vi.stubGlobal("DOMMatrixReadOnly", class { m22 = 1; });
}
window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })) as never;

const renderApp = () => render(<ToastProvider><App /></ToastProvider>);

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  useStore.setState({
  nodes: [], edges: [], uiState: { kind: "void" },
  tracks: [], messages: [], workspace: [], totals: emptyUsage(),
  scenarioId: null, pipelineStage: "idle", runStartedAt: null, runEndedAt: null,
  sessionId: newSessionId(), telemetryEvents: [], scienceReceipt: null, inspectedLakeId: null,
  mrfSource: "base" as const, mrfMapping: null,
  selectedWorkspaceId: null, activity: [], statusHint: null,
});
});

describe("App simulated smoke (jsdom DOM-level, not a real browser)", () => {
  it("keeps a normal load on the landing page", () => {
    renderApp();
    expect(screen.getByTestId("landing-page")).toBeTruthy();
    expect(screen.queryByTestId("toast")).toBeNull();
    expect(screen.queryByTestId("demo-banner")).toBeNull();
    expect(useStore.getState().nodes).toEqual([]);
  });

  it("opens the pilot from ?demo=1 without a run and returns to the landing page", async () => {
    window.history.replaceState({}, "", "/?demo=1");
    renderApp();
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("pilot-storyboard"));
    expect(useStore.getState().nodes.length).toBeGreaterThan(0);
    expect(useStore.getState().pipelineStage).toBe("idle");
    expect(screen.queryByTestId("landing-page")).toBeNull();
    expect(screen.getByTestId("demo-banner").textContent).toMatch(/Demo mode · Synthetic · no PHI/);
    expect(screen.getByTestId("demo-banner").textContent).toMatch(/Propose/);
    expect(screen.getByRole("button", { name: "Create" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /run pipeline/i })).toBeTruthy();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Exit demo" }));
    expect(screen.getByTestId("landing-page")).toBeTruthy();
    expect(window.location.search).not.toMatch(/demo/);
    expect(useStore.getState().nodes).toEqual([]);
  });

  it("does not call identity while demo mode is on", async () => {
    window.history.replaceState({}, "", "/?demo=1&scenario=assay-qc");
    vi.stubEnv("VITE_RHM_MODE", "live");
    const restore = vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(false);
    renderApp();
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("assay-qc"));
    expect(restore).not.toHaveBeenCalled();
    expect(screen.getByTestId("mode-label").textContent).toMatch(/simulated/);
  });

  it("loads the pilot from the command palette and ignores the shortcut while typing", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    const field = document.createElement("textarea");
    document.body.appendChild(field);
    field.focus();
    fireEvent.keyDown(field, { key: "k", ctrlKey: true });
    expect(screen.queryByTestId("command-palette")).toBeNull();
    field.remove();

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const box = await screen.findByLabelText("Find a command");
    fireEvent.change(box, { target: { value: "pilot" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("pilot-storyboard"));
    expect(useStore.getState().edges.length).toBeGreaterThan(0);
    expect(screen.queryByTestId("command-palette")).toBeNull();
    expect(localStorage.length).toBe(0);

    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true });
    await waitFor(() => expect(useStore.getState().pipelineStage).not.toBe("idle"));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("complete"));
  });

  it("keeps the pilot a proposal and emits only one real terminal event per agent", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilot storyboard/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("complete"));
    fireEvent.click(screen.getByRole("button", { name: "Outputs" }));
    expect(screen.getByTestId("output-inspector").textContent).toMatch(/not verification/);
    expect(screen.getByTestId("output-left").textContent).toMatch(/reading_column/);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(useStore.getState().telemetryEvents).toHaveLength(2);
    expect(useStore.getState().telemetryEvents.every((e) => e.status === "succeeded" && e.completion_basis === "agent_reported")).toBe(true);
    expect(useStore.getState().nodes.filter((n) => n.data.kind === "agent").every((n) => n.data.verification === "proposal")).toBe(true);
    expect(screen.getByTestId("stage-strip")).toBeTruthy();
    expect(screen.getByTestId("verified-badge").textContent).toBe("Verified");
    const activity = screen.getByTestId("activity-panel").textContent ?? "";
    expect(activity).toMatch(/Loaded Pilot storyboard/);
    expect(activity).toMatch(/Run started/);
    expect(activity).toMatch(/done/);
    expect(activity).toMatch(/Complete/);
    expect(activity).toMatch(/Fixture check passed/);
    expect(activity).not.toMatch(/reading_column/);
    expect(screen.getByRole("button", { name: /Download session JSON/ })).toBeTruthy();
  });

  it("reports a failed pilot honestly", async () => {
    vi.spyOn(SimulatedAdapter.prototype, "poll").mockImplementation(async (h) => ({ nodeId: h.nodeId, status: "failed", basis: "agent_reported", usage: emptyUsage("simulated") }));
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilot storyboard/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("fail"));
    expect(useStore.getState().telemetryEvents.every((e) => e.status === "failed")).toBe(true);
    expect(screen.getByTestId("stage-strip")).toBeTruthy();
    expect(screen.queryByTestId("verified-badge")).toBeNull();
  });

  it("clears owner data on logout and rejects a late poll result", async () => {
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(true);
    vi.spyOn(InferenceSettings.prototype, "request").mockResolvedValue({ configured: true, revision: "fixture", provider: "local", model_id: "fixture", credential_lifetime: "backend_process", host_models_authorized: false });
    vi.spyOn(IdentitySession.prototype, "logout").mockRejectedValue(new Error("offline"));
    vi.spyOn(LiveAdapter.prototype, "capabilities").mockResolvedValue(null);
    vi.spyOn(LiveAdapter.prototype, "workspaces").mockResolvedValue([]);
    vi.spyOn(LiveAdapter.prototype, "run").mockImplementation(async (nodeId) => ({ nodeId, runId: "live-run" }));
    vi.spyOn(LiveAdapter.prototype, "events").mockResolvedValue({ usage: emptyUsage("live"), workspace: [], messages: [], nextAfterSeq: 0 });
    const cancel = vi.spyOn(LiveAdapter.prototype, "cancel").mockResolvedValue();
    let release!: (value: RunOutcome) => void;
    const poll = vi.spyOn(LiveAdapter.prototype, "poll").mockImplementation(() => new Promise((resolve) => { release = resolve; }));
    renderApp();
    fireEvent.click((await screen.findAllByRole("button", { name: /Pilot storyboard/ }))[0]);
    fireEvent.click(screen.getByRole("button", { name: /Account inference settings/ }));
    fireEvent.change(screen.getByLabelText("USD admission budget per agent run"), { target: { value: "0.01" } });
    fireEvent.click(screen.getByLabelText(/I permit paid inference/));
    await waitFor(() => expect((screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(false));
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(poll).toHaveBeenCalledTimes(1));
    expect(vi.mocked(LiveAdapter.prototype.run).mock.calls[0][1]).toMatchObject({ budget: { max_usd: .01 }, loop_limits: { max_ticks: 2, max_tokens_per_tick: 512, max_tokens_total: 2048 } });
    const oldSession = useStore.getState().sessionId;
    fireEvent.click(screen.getByRole("button", { name: /Sign out/ }));
    await waitFor(() => expect(screen.getByTestId("landing-page")).toBeTruthy());
    expect(screen.getByRole("alert").textContent).toMatch(/Server sign-out failed/);
    release({ nodeId: "old-node", status: "succeeded", output: "old owner content", usage: emptyUsage("live") });
    await waitFor(() => expect(cancel).toHaveBeenCalled());
    expect(useStore.getState()).toMatchObject({ nodes: [], messages: [], telemetryEvents: [], scienceReceipt: null, pipelineStage: "idle" });
    expect(useStore.getState().sessionId).not.toBe(oldSession);
  });
  it("uses the workspace picked in the readiness panel on the next live run", async () => {
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(true);
    vi.spyOn(InferenceSettings.prototype, "request").mockResolvedValue({ configured: true, revision: "fixture", provider: "local", model_id: "fixture", credential_lifetime: "backend_process", host_models_authorized: false });
    vi.spyOn(LiveAdapter.prototype, "capabilities").mockResolvedValue({
      capabilities: { shell_execution: { status: "available" } },
    });
    vi.spyOn(LiveAdapter.prototype, "workspaces").mockResolvedValue([
      { workspace_id: "ws-a", project_id: "p", task_id: "t", status: "ready" },
      { workspace_id: "ws-b", project_id: "p2", task_id: "t2", status: "ready" },
    ]);
    const seen: { workspace_id: string; project_id?: string; allowed_tools: string[] }[] = [];
    vi.spyOn(LiveAdapter.prototype, "run").mockImplementation(async (nodeId, workflow) => {
      seen.push({ workspace_id: workflow.workspace_id, project_id: workflow.project_id, allowed_tools: workflow.allowed_tools });
      return { nodeId, runId: "r1" };
    });
    vi.spyOn(LiveAdapter.prototype, "events").mockResolvedValue({ usage: emptyUsage("live"), workspace: [], messages: [], nextAfterSeq: 0 });
    vi.spyOn(LiveAdapter.prototype, "poll").mockImplementation(async (h) => ({ nodeId: h.nodeId, status: "succeeded", basis: "agent_reported", usage: emptyUsage("live") }));
    vi.spyOn(LiveAdapter.prototype, "cancel").mockResolvedValue();
    renderApp();
    expect(await screen.findByText(/will not guess/)).toBeTruthy();
    fireEvent.click(screen.getByDisplayValue("ws-b"));
    await waitFor(() => expect(screen.getByTestId("bound-workspace").textContent).toBe("Bound for next Run: ws-b"));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilot storyboard/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: /Account inference settings/ }));
    fireEvent.change(screen.getByLabelText("USD admission budget per agent run"), { target: { value: "0.01" } });
    fireEvent.click(screen.getByLabelText(/I permit paid inference/));
    await waitFor(() => expect((screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(false));
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(seen.length).toBeGreaterThan(0));
    expect(seen.every((workflow) => workflow.workspace_id === "ws-b" && workflow.project_id === "p2")).toBe(true);
    expect(seen[0].allowed_tools).toEqual(["execute_shell"]);
  });

  it("imports a shared snapshot without identity and keeps a bad file off the canvas", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    expect(screen.getByRole("button", { name: "Export snapshot" })).toBeTruthy();
    fireEvent.change(screen.getByTestId("snapshot-file"), { target: { files: [new File(["{}"], "nope.json", { type: "application/json" })] } });
    expect((await screen.findByTestId("snapshot-notice")).textContent).toMatch(/not a canvas snapshot/);
    expect(useStore.getState().nodes).toEqual([]);
    const shared = JSON.stringify({
      schema_version: "canvas.snapshot.v1",
      nodes: [{
        id: "agent-share", type: "agent", position: { x: 10, y: 20 },
        data: { kind: "agent", presetId: "builder", title: "Builder", description: "shared", color: "nope", status: "done", output: "hidden", verification: "verified" },
      }],
      edges: [],
    });
    fireEvent.change(screen.getByTestId("snapshot-file"), { target: { files: [new File([shared], "canvas-snapshot.json", { type: "application/json" })] } });
    await waitFor(() => expect(useStore.getState().nodes.map((node) => node.id)).toEqual(["agent-share"]));
    expect(useStore.getState().nodes[0].data.verification).toBe("proposal");
    expect(useStore.getState().nodes[0].data.output).toBeUndefined();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    expect(screen.getByRole("button", { name: "Create" })).toBeTruthy();
    expect(screen.queryByTestId("snapshot-notice")).toBeNull();
  });

  it("spawns agents, links them, and shows the handoff", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    expect(screen.getByText(/Mode: simulated/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Contracts" }));
    expect(screen.getByText(/does not edit an agent/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText(/does not edit an agent/)).toBeNull();
    expect(screen.getByTestId("history-panel").textContent).toMatch(/no server history/i);
    expect(screen.getByTestId("readiness-panel").textContent).toMatch(/live mode for binding/i);
    await waitFor(() => expect(screen.getByTestId("cap-execute-shell").textContent).toBe("unavailable"));
    expect(screen.getByTestId("bound-workspace").textContent).toMatch(/none/);

    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /^Builder/ }));
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(1));
    expect(useStore.getState().tracks).toHaveLength(1);
    expect(screen.getByTestId("metrics-panel").textContent).toMatch(/Builder/);
    expect(useStore.getState().nodes[0].data.schemaText).toMatch(/mapping\.v1/);

    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /Clinical Lab Panel/ }));
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(2));
    expect(useStore.getState().tracks).toHaveLength(1);

    const agent = useStore.getState().nodes.find((n) => n.data.kind === "agent")!;
    const lake = useStore.getState().nodes.find((n) => n.data.kind === "dataLake")!;
    fireEvent.click(screen.getByTestId(`node-${lake.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(1));

    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /^Maintainer/ }));
    const maintainer = useStore.getState().nodes.find((n) => n.data.presetId === "maintainer")!;
    expect(useStore.getState().tracks.map((t) => t.title)).toEqual(["Builder", "Maintainer"]);

    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${maintainer.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(2));

    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => {
      const builder = useStore.getState().nodes.find((n) => n.id === agent.id)!;
      const repair = useStore.getState().nodes.find((n) => n.id === maintainer.id)!;
      expect(builder.data.status).toBe("done");
      expect(repair.data.status).toBe("done");
      expect(builder.data.output).toContain("model proposal, agent_reported — not verification");
    });

    expect(useStore.getState().totals.totalTokens).toBeGreaterThan(0);
    expect(useStore.getState().totals.costUsd).toBe(0);
    expect(screen.getByTestId("metrics-panel").textContent).toContain("Unknown");

    expect(screen.getAllByTestId("workspace-file").map((el) => el.textContent).join("\n")).toMatch(/mapping\.proposal\.json/);

    const talk = screen.getAllByTestId("agent-message").map((el) => el.textContent).join("\n");
    expect(talk).toMatch(/Builder/);
    expect(talk).toMatch(/Maintainer/);
    expect(talk).toMatch(/reading_column/);
    const handoff = useStore.getState().edges.find((e) => e.source === agent.id && e.target === maintainer.id)!;
    expect(handoff.data?.packetLabel).toMatch(/reading_column/);
    expect(await screen.findAllByText(/Status: done/)).toHaveLength(2);
  });

  it("clears the canvas from the bar without writing browser storage", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Load Pilot storyboard/i })[0]);
    expect(useStore.getState().nodes.length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Clear canvas" }));
    expect(useStore.getState().nodes).toEqual([]);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("toasts a loaded storyboard and a run that has no session", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Load Pilot storyboard/i })[0]);
    expect((await screen.findByTestId("toast")).textContent).toMatch(/Loaded Pilot storyboard/);
    expect(localStorage.length).toBe(0);

    cleanup();
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(false);
    renderApp();
    await screen.findByTestId("landing-page");
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const box = await screen.findByLabelText("Find a command");
    fireEvent.change(box, { target: { value: "pilot" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(useStore.getState().edges.length).toBeGreaterThan(0));
    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true });
    expect((await screen.findAllByText("Sign in required")).length).toBeGreaterThan(0);
    expect(screen.getByTestId("status-line").textContent).toMatch(/Sign in required/);
    fireEvent.click(screen.getByRole("button", { name: "Clear status" }));
    expect(screen.queryByTestId("status-line")).toBeNull();
    expect(useStore.getState().nodes.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /run pipeline/i })).toBeTruthy();
  });
});

describe("MRF drift + one repair (jsdom)", () => {
  it("one-click landing preset plus canned simulated replies tell the full story offline", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Run MRF demo/i }));
    expect(useStore.getState().scenarioId).toBe("mrf-pipeline");
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().scienceReceipt?.checks?.every((c) => c.pass)).toBe(true));
    expect(useStore.getState().nodes.filter((n) => n.data.presetId === "mrf-builder").every((n) => n.data.verification === "checked_locally")).toBe(true);
    expect(screen.queryByText(/^Verified$/)).toBeNull();
    expect(useStore.getState().mrfSource).toBe("base");
    fireEvent.click(screen.getByRole("button", { name: /Upstream schema drift/i }));
    await waitFor(() => expect(useStore.getState().scienceReceipt?.oracleNote).toMatch(/Named check failed: nulls_repaired/));
    await waitFor(() => expect(useStore.getState().scienceReceipt?.checks?.every((c) => c.pass)).toBe(true));
    expect(useStore.getState().mrfSource).toBe("drift");
    expect(useStore.getState().mrfMapping?.fields.rate).toBe("negotiated_amount");
    expect(useStore.getState().nodes.filter((n) => n.data.presetId === "mrf-maintainer").every((n) => n.data.verification === "checked_locally")).toBe(true);
  });
});

