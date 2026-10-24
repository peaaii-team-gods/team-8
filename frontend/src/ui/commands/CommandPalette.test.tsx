import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CommandPalette from "./CommandPalette";
import { registerCommands, type CommandActions } from "./commands";

afterEach(() => cleanup());

describe("CommandPalette", () => {
  it("runs Load Pilot storyboard from Enter and closes on Esc", () => {
    const loadScenario = vi.fn();
    const onClose = vi.fn();
    const actions: CommandActions = {
      loadScenario,
      openHub: vi.fn(),
      toggleRun: vi.fn(),
      clearCanvas: vi.fn(),
      backToLanding: vi.fn(),
      openContracts: vi.fn(),
      exportSnapshot: vi.fn(),
      importSnapshot: vi.fn(),
      canRun: true,
      running: false,
      canLeave: true,
    };
    render(<CommandPalette commands={registerCommands(actions)} onClose={onClose} />);
    const box = screen.getByLabelText("Find a command");
    fireEvent.change(box, { target: { value: "pilot" } });
    fireEvent.keyDown(box, { key: "Enter" });
    expect(loadScenario).toHaveBeenCalledWith("pilot-storyboard");
    expect(onClose).toHaveBeenCalledOnce();
    fireEvent.keyDown(box, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
