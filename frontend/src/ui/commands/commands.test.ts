import { describe, expect, it, vi } from "vitest";
import { COMMAND_IDS, fuzzyMatch, isTypingTarget, registerCommands, type CommandActions } from "./commands";

const actions = (over: Partial<CommandActions> = {}): CommandActions => ({
  loadScenario: vi.fn(),
  openHub: vi.fn(),
  toggleRun: vi.fn(),
  clearCanvas: vi.fn(),
  backToLanding: vi.fn(),
  openContracts: vi.fn(),
  exportSnapshot: vi.fn(),
  importSnapshot: vi.fn(),
  canRun: false,
  running: false,
  canLeave: true,
  ...over,
});

describe("registerCommands", () => {
  it("loads the pilot through the given action and keeps Run off until a link exists", () => {
    const calls = actions();
    const commands = registerCommands(calls);
    commands.find((command) => command.title === "Load Pilot storyboard")?.run();
    expect(calls.loadScenario).toHaveBeenCalledWith("pilot-storyboard");
    const run = commands.find((command) => command.id === COMMAND_IDS.run);
    expect(run?.enabled).toBe(false);
    run?.run();
    expect(calls.toggleRun).not.toHaveBeenCalled();
    expect(commands.some((command) => command.id === COMMAND_IDS.readinessRefresh)).toBe(false);
  });

  it("lists the welcome tour only when the shell can open it", () => {
    expect(registerCommands(actions()).some((command) => command.id === COMMAND_IDS.tour)).toBe(false);
    const openTour = vi.fn();
    registerCommands(actions({ openTour })).find((command) => command.id === COMMAND_IDS.tour)?.run();
    expect(openTour).toHaveBeenCalledOnce();
  });

  it("matches a short query and ignores shortcuts while typing", () => {
    expect(fuzzyMatch("plt", "Load Pilot storyboard")).toBe(true);
    expect(fuzzyMatch("assay", "Load Assay QC")).toBe(true);
    expect(fuzzyMatch("zzz", "Load Pilot storyboard")).toBe(false);
    const field = document.createElement("textarea");
    expect(isTypingTarget(field)).toBe(true);
    expect(isTypingTarget(document.createElement("div"))).toBe(false);
  });
});
