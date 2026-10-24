import { scenarioById } from "../registry/scenarios";

/** Query keys for judge demo. No storage and no network. */
export const DEMO_SCENARIO_IDS = ["pilot-storyboard", "medicare-claim-risk", "assay-qc"] as const;
export type DemoScenarioId = (typeof DEMO_SCENARIO_IDS)[number];

export const DEMO_CAPTION = "Propose → Execute → Repair → Verified";

export interface DemoBoot {
  enabled: boolean;
  scenarioId: DemoScenarioId;
  autorun: boolean;
}

export function isDemoScenarioId(id: string | null): id is DemoScenarioId {
  return !!id && (DEMO_SCENARIO_IDS as readonly string[]).includes(id);
}

function paramsFrom(search: string): URLSearchParams {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  return new URLSearchParams(raw);
}

/** Read ?demo=1, optional ?scenario=, and ?autorun=1. Unknown scenarios fall back to the pilot. */
export function bootDemo(search: string): DemoBoot {
  const params = paramsFrom(search);
  const enabled = params.get("demo") === "1";
  const requested = params.get("scenario");
  const scenarioId = isDemoScenarioId(requested) ? requested : "pilot-storyboard";
  return { enabled, scenarioId, autorun: enabled && params.get("autorun") === "1" };
}

export function demoScenarioTitle(id: DemoScenarioId): string {
  return scenarioById(id)?.title ?? id;
}

export function demoPath(search: string, scenarioId: DemoScenarioId): string {
  const params = paramsFrom(search);
  params.set("demo", "1");
  params.set("scenario", scenarioId);
  return `/?${params.toString()}`;
}

/** Drop demo keys. Other query keys stay. */
export function exitDemoPath(search: string): string {
  const params = paramsFrom(search);
  params.delete("demo");
  params.delete("scenario");
  params.delete("autorun");
  const query = params.toString();
  return query ? `/?${query}` : "/";
}
