import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { ToastProvider, useToast } from "./ToastProvider";
import { useStore } from "../../state/store";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function Probe() {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast({ level: "error", title: "Sign in failed", detail: "login failed (401)", timeoutMs: 1000 })}>
      Ping
    </button>
  );
}

describe("ToastProvider", () => {
  it("shows a toast and dismisses it without storage", () => {
    render(<ToastProvider><div data-testid="landing-page">Landing</div><Probe /></ToastProvider>);
    expect(screen.getByTestId("landing-page")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Ping" }));
    expect(screen.getByTestId('toast-stack').className).toContain('bottom-12 left-4');
    expect(screen.getByTestId('toast-stack').className).not.toContain('top-4 right-4');
    expect(screen.getByTestId("toast").textContent).toMatch(/Sign in failed/);
    expect(screen.getByTestId("toast").textContent).not.toMatch(/password|hunter2/i);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(screen.queryByTestId("toast")).toBeNull();
    expect(screen.getByTestId("landing-page")).toBeTruthy();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("auto-dismisses and keeps a status hint clearable", async () => {
    vi.useFakeTimers();
    useStore.setState({ statusHint: "Demo mode", nodes: [{ id: "a", type: "agent", position: { x: 0, y: 0 }, data: { kind: "agent", presetId: "builder", title: "Builder", description: "", color: "emerald" } }] });
    render(<ToastProvider><Probe /></ToastProvider>);
    expect(screen.getByTestId("status-line").textContent).toMatch(/Demo mode/);
    fireEvent.click(screen.getByRole("button", { name: "Ping" }));
    await act(async () => { vi.advanceTimersByTime(1000); });
    expect(screen.queryByTestId("toast")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Clear status" }));
    expect(screen.queryByTestId("status-line")).toBeNull();
    expect(useStore.getState().nodes).toHaveLength(1);
  });
});
