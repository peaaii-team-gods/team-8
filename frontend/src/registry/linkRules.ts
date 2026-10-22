import type { LinkRule, NodeKindId } from "./types";
export const LINK_RULES: LinkRule[] = [
  { from: "dataLake", to: "agent", allowed: true, reason: "Lakes feed agents as bounded inputs" },
  { from: "agent", to: "agent", allowed: true, reason: "Agents may hand off outputs" },
  { from: "agent", to: "dataLake", allowed: false, reason: "Agents do not write lakes in this demo" },
  { from: "dataLake", to: "dataLake", allowed: false, reason: "Lakes do not feed lakes" },
];
export function canLink(from: NodeKindId, to: NodeKindId): LinkRule {
  return LINK_RULES.find((r) => r.from === from && r.to === to) ?? { from, to, allowed: false, reason: "No rule permits this link" };
}
