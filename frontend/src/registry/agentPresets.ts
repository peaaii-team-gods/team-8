import type { AgentPreset } from "./types";
export const AGENT_PRESETS: AgentPreset[] = [
  { id: "builder", kind: "agent", title: "Builder", description: "Selects bounded field mappings from evidence", rolePrompt: "You are Builder. Inspect the supplied records and return only the requested JSON object.", color: "emerald" },
  { id: "maintainer", kind: "agent", title: "Maintainer", description: "Proposes one bounded repair from observed failures", rolePrompt: "You are Validator/Maintainer. Propose ONE bounded repair or fail with a reason code.", color: "purple" },
  { id: "denial-predictor", kind: "agent", title: "Denial Predictor", description: "Flags likely claim denials from synthetic audit records", rolePrompt: "You are a denial-risk reviewer. Return only the requested JSON object.", color: "fuchsia" },
  { id: "policy-audit", kind: "agent", title: "Policy Audit", description: "Checks records against stated policy rules", rolePrompt: "You are a policy auditor. Return only the requested JSON object.", color: "amber" },
  { id: "custom-agent", kind: "agent", title: "Custom Agent", description: "Blank slate agent", rolePrompt: "Return only the requested JSON object.", color: "cyan" },
];
export const agentPreset = (id: string) => AGENT_PRESETS.find((p) => p.id === id);
