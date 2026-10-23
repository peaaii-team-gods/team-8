import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import App from "./App";
import { useStore } from "./state/store";
import { emptyUsage } from "./run/telemetry";
import { newSessionId } from "./run/telemetryEvents";
import { SimulatedAdapter } from "./adapters/simulated";
import { IdentitySession } from "./adapters/identity";
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

beforeEach(() => useStore.setState({
  nodes: [], edges: [], uiState: { kind: "void" },
  tracks: [], messages: [], workspace: [], totals: emptyUsage(),
  scenarioId: null, pipelineStage: "idle", runStartedAt: null, runEndedAt: null,
  sessionId: newSessionId(), telemetryEvents: [], scienceReceipt: null, inspectedLakeId: null,
}));

describe("App simulated smoke (jsdom DOM-level, not a real browser)", () => {
  it("keeps the pilot a proposal and emits only one real terminal event per agent", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole("button", { name: /Pilot storyboard/ }));
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("complete"));
    expect(useStore.getState().telemetryEvents).toHaveLength(2);
    expect(useStore.getState().telemetryEvents.every((e) => e.status === "succeeded" && e.completion_basis === "agent_reported")).toBe(true);
    expect(useStore.getState().nodes.filter((n) => n.data.kind === "agent").every((n) => n.data.verification === "proposal")).toBe(true);
    expect(screen.getByTestId("stage-strip")).toBeTruthy();
    expect(screen.getByTestId("verified-badge").textContent).toBe("Verified");
    expect(screen.getByRole("button", { name: /Download session JSON/ })).toBeTruthy();
  });

  it("reports a failed pilot honestly", async () => {
    vi.spyOn(SimulatedAdapter.prototype, "poll").mockImplementation(async (h) => ({ nodeId: h.nodeId, status: "failed", basis: "agent_reported", usage: emptyUsage("simulated") }));
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole("button", { name: /Pilot storyboard/ }));
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("fail"));
    expect(useStore.getState().telemetryEvents.every((e) => e.status === "failed")).toBe(true);
    expect(screen.getByTestId("stage-strip")).toBeTruthy();
    expect(screen.queryByTestId("verified-badge")).toBeNull();
  });

  it("clears owner data on logout and rejects a late poll result", async () => {
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(true);
    vi.spyOn(IdentitySession.prototype, "logout").mockRejectedValue(new Error("offline"));
    vi.spyOn(LiveAdapter.prototype, "capabilities").mockResolvedValue(null);
    vi.spyOn(LiveAdapter.prototype, "workspaces").mockResolvedValue([]);
    vi.spyOn(LiveAdapter.prototype, "run").mockImplementation(async (nodeId) => ({ nodeId, runId: "live-run" }));
    vi.spyOn(LiveAdapter.prototype, "events").mockResolvedValue({ usage: emptyUsage("live"), workspace: [], messages: [], nextAfterSeq: 0 });
    const cancel = vi.spyOn(LiveAdapter.prototype, "cancel").mockResolvedValue();
    let release!: (value: RunOutcome) => void;
    const poll = vi.spyOn(LiveAdapter.prototype, "poll").mockImplementation(() => new Promise((resolve) => { release = resolve; }));
    render(<App />);
    fireEvent.click(await screen.findByRole("button", { name: /Pilot storyboard/ }));
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(poll).toHaveBeenCalledTimes(1));
    const oldSession = useStore.getState().sessionId;
    fireEvent.click(screen.getByRole("button", { name: /Sign out/ }));
    await waitFor(() => expect(screen.getByTestId("landing-page")).toBeTruthy());
    expect(screen.getByRole("alert").textContent).toMatch(/Server sign-out failed/);
    release({ nodeId: "old-node", status: "succeeded", output: "old owner content", usage: emptyUsage("live") });
    await waitFor(() => expect(cancel).toHaveBeenCalled());
    expect(useStore.getState()).toMatchObject({ nodes: [], messages: [], telemetryEvents: [], scienceReceipt: null, pipelineStage: "idle" });
    expect(useStore.getState().sessionId).not.toBe(oldSession);
  });
  it("spawns agents, links them, and shows the handoff", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    expect(screen.getByText(/Mode: simulated/)).toBeTruthy();

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
    expect(screen.getByTestId("metrics-panel").textContent).toMatch(/\$0\.00/);

    expect(screen.getAllByTestId("workspace-file").map((el) => el.textContent).join("\n")).toMatch(/mapping\.proposal\.json/);

    const talk = screen.getAllByTestId("agent-message").map((el) => el.textContent).join("\n");
    expect(talk).toMatch(/Builder/);
    expect(talk).toMatch(/Maintainer/);
    expect(talk).toMatch(/reading_column/);
    const handoff = useStore.getState().edges.find((e) => e.source === agent.id && e.target === maintainer.id)!;
    expect(handoff.data?.packetLabel).toMatch(/reading_column/);
    expect(await screen.findAllByText(/Status: done/)).toHaveLength(2);
  });
});
