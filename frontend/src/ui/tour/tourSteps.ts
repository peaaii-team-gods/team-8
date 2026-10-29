/** One card per canvas element. `target` is a CSS selector; a step whose target is not on screen is skipped. No target = centered card. */
export interface TourStep {
  id: string;
  target?: string;
  title: string;
  what: string;
  how: string;
  why: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to Crucible Cast",
    what: "A canvas where agents turn a raw data file into checked records.",
    how: "Next and Back step through each control. ← → work too; Esc skips.",
    why: "About a minute, and you know what every panel is for.",
  },
  {
    id: "userbar",
    target: '[data-testid="user-bar"]',
    title: "Top bar",
    what: "Sign-in, Clear canvas, Load Pilot storyboard, and snapshot export/import.",
    how: "Export saves the graph as a JSON file; Import loads one back into this tab.",
    why: "Share or restore a graph without an account.",
  },
  {
    id: "mode",
    target: '[data-testid="mode-label"]',
    title: "Mode label",
    what: "Says whether you are in simulated or live mode, or on the recorded hospital path.",
    how: "Read it before you run. Simulated mode never calls a model.",
    why: "You always know whether output is real model work or a recording.",
  },
  {
    id: "canvas",
    target: '[data-tour="canvas"]',
    title: "Canvas",
    what: "Your pipeline graph: agents and data lakes, joined by links.",
    how: "Drag to pan, scroll to zoom, top-left buttons to fit. Delete removes a selected node.",
    why: "The graph you see is exactly what Run sends.",
  },
  {
    id: "node",
    target: ".react-flow__node",
    title: "A node",
    what: "One agent or data lake, with its verification label, tethered lakes, MCP posture and cost.",
    how: "Click it for a toolbar: inspect lake, edit schema, MCP, link, delete.",
    why: "Labels stay honest: Proposal until local checks pass, Verified only on a Coding SHA pass.",
  },
  {
    id: "create",
    target: '[data-tour="create"]',
    title: "Create",
    what: "The hub for pipeline presets and demo scenarios.",
    how: "Click + to open it, then pick a preset to drop a node or a scenario to load a graph.",
    why: "Build your own graph without writing config.",
  },
  {
    id: "run",
    target: '[data-tour="run"]',
    title: "Run Pipeline",
    what: "Starts or stops a run of the linked graph.",
    how: "Click it, or press Ctrl+Enter. It appears once at least one link exists.",
    why: "Watch packets move along the links and each node report back.",
  },
  {
    id: "hospital",
    target: 'section[aria-label="Hospital pipeline"]',
    title: "Hospital pipeline",
    what: "The MRF demo: a public hospital price file through Scout → Architect → Refinery → Ledger → Analyst.",
    how: "Click Run hospital pipeline. Tick the inject box to test drift repair.",
    why: "It shows models proposing and code deciding, on real public data.",
  },
  {
    id: "contracts",
    target: '[data-testid="contract-library"] > button',
    title: "Contracts",
    what: "The schema library: the output contracts nodes can promise.",
    how: "Open it to browse a contract and its fields.",
    why: "Every output is checked against a contract, not taken on trust.",
  },
  {
    id: "outputs",
    target: '[data-testid="output-inspector"] > button',
    title: "Outputs",
    what: "What each agent produced in the last run.",
    how: "Open it and pick two agents to compare.",
    why: "Read the actual output, not just a status light.",
  },
  {
    id: "settings",
    target: '[data-tour="settings"]',
    title: "Settings",
    what: "Run model, tier, spend cap and provider connection (live mode only).",
    how: "Set a cap and tick paid consent before any paid run.",
    why: "Nothing paid runs without your consent and a cap.",
  },
  {
    id: "history",
    target: '[data-testid="history-panel"]',
    title: "Run history",
    what: "Past runs in this session.",
    how: "Click a run to see its details.",
    why: "Compare a run with the one before it.",
  },
  {
    id: "readiness",
    target: '[data-testid="readiness-panel"]',
    title: "Readiness",
    what: "Which capabilities this deployment allows, and the workspace for the next run.",
    how: "Refresh it, open the unavailable list, or pick a workspace.",
    why: "See why something is off before you run, not after.",
  },
  {
    id: "metrics",
    target: '[data-testid="metrics-panel"]',
    title: "Observability",
    what: "Tokens, cost, outcome and pipeline stage for the current run.",
    how: "Click the heading to expand it; download the session log from here.",
    why: "Cost shows as provider-reported or unverified, never guessed.",
  },
  {
    id: "activity",
    target: '[data-testid="activity-panel"]',
    title: "Activity",
    what: "A timeline of loads, links, runs and errors.",
    how: "Click an entry to focus its node. Clear empties the list and leaves the canvas alone.",
    why: "Find what happened and where, quickly.",
  },
  {
    id: "receipt",
    target: '[data-testid="science-receipt"]',
    title: "Science receipt",
    what: "The checks a run passed or failed.",
    how: "Read it after a run ends.",
    why: "It is the evidence behind any Verified label.",
  },
  {
    id: "done",
    title: "You're set",
    what: "Ctrl/⌘+K opens the command palette; ? lists shortcuts.",
    how: "Reopen this tour from the Tour button in the top bar or from the palette.",
    why: "Start with the Pilot storyboard, or press + and build your own.",
  },
];
