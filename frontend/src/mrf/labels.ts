import type { VerificationKind } from "../registry/types";

/** Honesty labels. Verified is reserved for a Coding test_status pass at an exact SHA. */
export function verificationFromOracle(args: { checksPassed: boolean; codingShaOk?: boolean }): VerificationKind {
  if (args.codingShaOk) return "verified";
  if (args.checksPassed) return "checked_locally";
  return "proposal";
}

export function verificationText(kind: VerificationKind | undefined): "Proposal" | "Checked locally" | "Verified" {
  if (kind === "verified") return "Verified";
  if (kind === "checked_locally") return "Checked locally";
  return "Proposal";
}
