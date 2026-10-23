import type { AgentPreset } from "./types";

export const AGENT_PRESETS: AgentPreset[] = [
  { id: "builder", kind: "agent", title: "Builder", description: "Maps bounded science fields from lake evidence", rolePrompt: "You are Builder for science datasets. Inspect the supplied synthetic records and return only the requested JSON mapping object.", color: "emerald" },
  { id: "maintainer", kind: "agent", title: "Maintainer", description: "Proposes one bounded repair after schema drift", rolePrompt: "You are Validator/Maintainer for science data contracts. Propose ONE bounded repair or fail with a reason code.", color: "purple" },
  { id: "denial-predictor", kind: "agent", title: "Denial Predictor", description: "Flags likely claim denials from synthetic clearinghouse rows", rolePrompt: "You are a denial-risk reviewer for synthetic payer records. Return only the requested JSON object.", color: "fuchsia" },
  { id: "policy-audit", kind: "agent", title: "Protocol Auditor", description: "Checks records against a stated protocol or policy rule", rolePrompt: "You are a protocol/policy auditor for synthetic science data. Return only the requested JSON object.", color: "amber" },
  { id: "assay-qc", kind: "agent", title: "Assay QC", description: "Pass/fail QC on synthetic assay plate readouts", rolePrompt: "You are an assay QC reviewer. Return only the requested JSON object for synthetic plate data.", color: "teal" },
  { id: "custom-agent", kind: "agent", title: "Custom Agent", description: "Blank slate agent", rolePrompt: "Return only the requested JSON object.", color: "cyan" },
];

export const agentPreset = (id: string) => AGENT_PRESETS.find((p) => p.id === id);
