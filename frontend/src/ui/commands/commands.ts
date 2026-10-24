/** Stable ids. Readiness refresh is reserved and not shown until that panel exposes a refresh action. */
export const COMMAND_IDS = {
  pilot: "scenario:pilot-storyboard",
  claimRisk: "scenario:medicare-claim-risk",
  assay: "scenario:assay-qc",
  create: "open-create",
  run: "run-pipeline",
  stop: "stop-run",
  clear: "clear-canvas",
  landing: "back-to-landing",
  contracts: "open-contracts",
  exportSnapshot: "export-snapshot",
  importSnapshot: "import-snapshot",
  readinessRefresh: "readiness-refresh",
} as const;

export const OPEN_CONTRACTS_EVENT = "team8:open-contracts";

export interface Command {
  id: string;
  title: string;
  enabled: boolean;
  reason?: string;
  run: () => void;
}

export interface CommandActions {
  loadScenario: (id: "pilot-storyboard" | "medicare-claim-risk" | "assay-qc") => void;
  openHub: () => void;
  toggleRun: () => void;
  clearCanvas: () => void;
  backToLanding: () => void;
  openContracts: () => void;
  exportSnapshot: () => void;
  importSnapshot: () => void;
  canRun: boolean;
  running: boolean;
  canLeave: boolean;
}

export function fuzzyMatch(query: string, text: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const hay = text.toLowerCase();
  if (hay.includes(needle)) return true;
  let index = 0;
  for (const char of hay) {
    if (char === needle[index]) index += 1;
    if (index === needle.length) return true;
  }
  return false;
}

export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable === true;
}

/** Thin wrappers around actions the canvas already has. Nothing here calls Identity or the API. */
export function registerCommands(actions: CommandActions): Command[] {
  const command = (id: string, title: string, enabled: boolean, reason: string | undefined, run: () => void): Command => ({
    id, title, enabled, reason, run: () => { if (enabled) run(); },
  });
  return [
    command(COMMAND_IDS.pilot, "Load Pilot storyboard", true, undefined, () => actions.loadScenario("pilot-storyboard")),
    command(COMMAND_IDS.claimRisk, "Load Claim risk", true, undefined, () => actions.loadScenario("medicare-claim-risk")),
    command(COMMAND_IDS.assay, "Load Assay QC", true, undefined, () => actions.loadScenario("assay-qc")),
    command(COMMAND_IDS.create, "Open Create hub", !actions.running, actions.running ? "Stop the run first." : undefined, actions.openHub),
    command(COMMAND_IDS.run, "Run pipeline", actions.canRun && !actions.running, actions.running ? "A run is already going." : actions.canRun ? undefined : "Add a link, then Run.", actions.toggleRun),
    command(COMMAND_IDS.stop, "Stop", actions.running, actions.running ? undefined : "Nothing is running.", actions.toggleRun),
    command(COMMAND_IDS.clear, "Clear canvas", !actions.running, actions.running ? "Stop the run first." : undefined, actions.clearCanvas),
    command(COMMAND_IDS.landing, "Back to landing", actions.canLeave && !actions.running, !actions.canLeave ? "Use Sign out to leave a live session." : actions.running ? "Stop the run first." : undefined, actions.backToLanding),
    command(COMMAND_IDS.contracts, "Open Contracts", true, undefined, actions.openContracts),
    command(COMMAND_IDS.exportSnapshot, "Export snapshot", true, undefined, actions.exportSnapshot),
    command(COMMAND_IDS.importSnapshot, "Import snapshot", !actions.running, actions.running ? "Stop the run first." : undefined, actions.importSnapshot),
  ];
}
