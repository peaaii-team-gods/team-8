import type { WorkspaceBinding } from "../compile/toWorkflow";
import { SERVICE_FEATURES } from "../registry/services.manifest";
import type { LiveAdapter } from "./live";

/** The only I/O the readiness panel uses. Live wraps LiveAdapter; simulated does not call the API. */
export interface ReadinessPort {
  capabilities(): Promise<Record<string, unknown> | null>;
  workspaces(): Promise<WorkspaceBinding[]>;
}

const unavailable = Object.fromEntries(
  SERVICE_FEATURES.flatMap((feature) => feature.requiredCapability ? [[feature.requiredCapability, { status: "unavailable", reason_code: "simulated" }]] : []),
);

/** Not a live report. Every hosted capability is unavailable and there are no workspaces. */
export const simulatedReadiness: ReadinessPort = {
  async capabilities() {
    return { capabilities: unavailable };
  },
  async workspaces() {
    return [];
  },
};

export function liveReadiness(adapter: LiveAdapter): ReadinessPort {
  return {
    capabilities: () => adapter.capabilities(),
    workspaces: () => adapter.workspaces(),
  };
}
