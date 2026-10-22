import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { useStore } from "./state/store";

// jsdom lacks layout APIs React Flow probes; stub them (DOM-level smoke only).
class RO { observe() {} unobserve() {} disconnect() {} }
vi.stubGlobal("ResizeObserver", RO);
if (!window.DOMMatrixReadOnly) {
  vi.stubGlobal("DOMMatrixReadOnly", class { m22 = 1; });
}
window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })) as never;

beforeEach(() => useStore.setState({ nodes: [], edges: [], uiState: { kind: "void" } }));

describe("App simulated smoke (jsdom DOM-level, not a real browser)", () => {
  it("void -> + -> agent + lake -> tether -> Run -> node done", async () => {
    render(<App />);
    expect(screen.getByText(/Mode: simulated/)).toBeTruthy();

    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /Builder/ }));
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(1));

    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /Supabase Data Lake/ }));
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(2));

    const [agent, lake] = [useStore.getState().nodes.find((n) => n.data.kind === "agent")!, useStore.getState().nodes.find((n) => n.data.kind === "dataLake")!];
    fireEvent.click(screen.getByTestId(`node-${lake.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(1));

    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => {
      const a = useStore.getState().nodes.find((n) => n.id === agent.id)!;
      expect(a.data.status).toBe("done");
      expect(a.data.output).toContain("model proposal, agent_reported — not verification");
    });
    expect(await screen.findByText(/Status: done/)).toBeTruthy();
  });
});
