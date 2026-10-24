import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ActivityPanel from "./ActivityPanel";
import { useStore } from "../../state/store";

afterEach(() => cleanup());

describe("ActivityPanel", () => {
  it("focuses the node for a row and leaves the graph when activity is cleared", () => {
    const onFocus = vi.fn();
    useStore.setState({
      nodes: [{ id: "a1", type: "agent", position: { x: 0, y: 0 }, data: { kind: "agent", presetId: "builder", title: "Builder", description: "", color: "emerald" } }],
      edges: [{ id: "e1", source: "a1", target: "a2" }],
      activity: [
        { id: "1", at: 1, kind: "scenario", title: "Loaded Pilot storyboard", level: "info" },
        { id: "2", at: 2, kind: "run-start", title: "Run started", level: "info" },
        { id: "3", at: 3, kind: "agent-done", title: "Builder done", detail: "proposal", nodeId: "a1", level: "ok" },
      ],
    });
    render(<ActivityPanel onFocus={onFocus} />);
    fireEvent.click(screen.getByRole("button", { name: /Builder done/ }));
    expect(onFocus).toHaveBeenCalledWith("a1");
    fireEvent.click(screen.getByRole("button", { name: "Clear activity" }));
    expect(useStore.getState().activity).toEqual([]);
    expect(useStore.getState().nodes).toHaveLength(1);
    expect(useStore.getState().edges).toHaveLength(1);
    expect(localStorage.length).toBe(0);
  });
});
