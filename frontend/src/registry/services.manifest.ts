import type { ServiceFeature } from "./types";
// Mirror of the fleet features this consumer touches. Hosted features flip here ONLY when the backend capability does (X2 gate).
// requiredCapability keys are the LIVE backend keys (GET /v1/capabilities
// returns {capabilities:{<key>:{status,reason_code,detail}}}); execute-check
// maps to tool_execution, whose detail covers read/write/edit/check.
// liveToday is the fleet-proven default shown only when no capabilities were
// fetched; a fetched backend report always wins in featureLive, so a
// hosted-off deployment still reports shell/check unavailable.
export const SERVICE_FEATURES: ServiceFeature[] = [
  { id: "run-agent", service: "rhm-backend-service", feature: "Run a bounded agent workflow", requiredCapability: "run_execution", liveToday: true },
  { id: "cancel-run", service: "rhm-backend-service", feature: "Cancel a run this session started", requiredCapability: "run_cancellation", liveToday: true },
  { id: "execute-shell", service: "rhm-sandbox-service", feature: "Hosted shell execution in workflows (swarm workflows only)", requiredCapability: "shell_execution", liveToday: true },
  { id: "execute-check", service: "rhm-sandbox-service", feature: "Sandboxed project checks (swarm workflows only)", requiredCapability: "tool_execution", liveToday: true },
  { id: "tier3-merge", service: "rhm-backend-service", feature: "Tier-3 merge to main", requiredCapability: "approval_tier3_elevation", liveToday: false },
];
type CapsEnvelope = { capabilities?: Record<string, { status?: unknown } | unknown> } | null;
export type FeatureChip = "live" | "unavailable" | "unknown";

/** Readiness chips. A missing report is unknown, never the manifest default. */
export function featureChip(f: ServiceFeature, capabilities: Record<string, unknown> | null): FeatureChip {
  if (!f.requiredCapability) return "live";
  if (!capabilities) return "unknown";
  const caps = (capabilities as CapsEnvelope)?.capabilities;
  if (!caps || typeof caps !== "object") return "unknown";
  const entry = caps[f.requiredCapability] as { status?: unknown } | undefined;
  if (!entry || typeof entry !== "object") return "unknown";
  if (entry.status === "available") return "live";
  if (entry.status === "unavailable") return "unavailable";
  return "unknown";
}

export const featureLive = (f: ServiceFeature, capabilities: Record<string, unknown> | null): boolean => {
  if (!f.requiredCapability) return true;
  if (!capabilities) return f.liveToday;
  const caps = (capabilities as CapsEnvelope)?.capabilities;
  if (!caps || typeof caps !== "object") return false;
  const entry = caps[f.requiredCapability] as { status?: unknown } | undefined;
  return !!entry && typeof entry === "object" && entry.status === "available";
};
