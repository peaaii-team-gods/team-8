import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { useStore } from "./state/store";
import { emptyUsage } from "./run/telemetry";

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
}));

describe("App simulated smoke (jsdom DOM-level, not a real browser)", () => {
  it("spawns agents, links them, and shows the handoff", async () => {
    render(<App />);
    // Simulated mode is the default. Live mode would wait for a sign-in instead.
    expect(screen.getByText(/Mode: simulated/)).toBeTruthy();

    // The center + opens the preset hub. Builder is an agent, so it is tracked at once.
    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /Builder/ }));
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(1));
    expect(useStore.getState().tracks).toHaveLength(1);
    expect(screen.getByTestId("metrics-panel").textContent).toMatch(/Builder/);
    // Builder opens with the predefined mapping schema, not a blank editor.
    expect(useStore.getState().nodes[0].data.schemaText).toMatch(/mapping\.v1/);

    // A lake is an input, not an agent, so it does not get a token row.
    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /Supabase Data Lake/ }));
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(2));
    expect(useStore.getState().tracks).toHaveLength(1);

    // Link rules allow lake -> agent. Click the source, then Link, then the target.
    const agent = useStore.getState().nodes.find((n) => n.data.kind === "agent")!;
    const lake = useStore.getState().nodes.find((n) => n.data.kind === "dataLake")!;
    fireEvent.click(screen.getByTestId(`node-${lake.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(1));

    // A second agent. The + stays available after the first node exists.
    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /Maintainer/ }));
    const maintainer = useStore.getState().nodes.find((n) => n.data.presetId === "maintainer")!;
    expect(useStore.getState().tracks.map((t) => t.title)).toEqual(["Builder", "Maintainer"]);

    // Agent -> agent is the handoff. Builder runs first and sends its reply along this edge.
    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${maintainer.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(2));

    // Run is enabled only after at least one link exists.
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => {
      const builder = useStore.getState().nodes.find((n) => n.id === agent.id)!;
      const repair = useStore.getState().nodes.find((n) => n.id === maintainer.id)!;
      expect(builder.data.status).toBe("done");
      expect(repair.data.status).toBe("done");
      // The node output is a model proposal, not a verified pipeline result.
      expect(builder.data.output).toContain("model proposal, agent_reported — not verification");
    });

    // Tokens are estimated. Simulated cost stays $0 because the workflow budget cap is $0.
    expect(useStore.getState().totals.totalTokens).toBeGreaterThan(0);
    expect(useStore.getState().totals.costUsd).toBe(0);
    expect(screen.getByTestId("metrics-panel").textContent).toMatch(/\$0\.00/);

    // Workspace rows are the paths each role added or changed during the run.
    expect(screen.getAllByTestId("workspace-file").map((el) => el.textContent).join("\n")).toMatch(/mapping\.proposal\.json/);

    // Agent talk and the packet on the Builder -> Maintainer edge carry the same reply.
    const talk = screen.getAllByTestId("agent-message").map((el) => el.textContent).join("\n");
    expect(talk).toMatch(/Builder/);
    expect(talk).toMatch(/Maintainer/);
    expect(talk).toMatch(/reading_column/);
    const handoff = useStore.getState().edges.find((e) => e.source === agent.id && e.target === maintainer.id)!;
    expect(handoff.data?.packetLabel).toMatch(/reading_column/);
    expect(await screen.findAllByText(/Status: done/)).toHaveLength(2);
  });
});
