import { applyMapping } from "./apply";
import { allPassed, failingChecks, runChecks } from "./checks";
import type { ApplyResult, MrfMapping, NamedCheck } from "./types";

export interface MrfEvaluation {
  mapping: MrfMapping | null;
  applied: ApplyResult | null;
  checks: NamedCheck[];
  passed: boolean;
  invalidProposal: boolean;
  retried: boolean;
  declined?: { action: "fail"; reason_code: string };
}

export function evaluateMapping(fixture: unknown, mapping: MrfMapping): Omit<MrfEvaluation, "invalidProposal" | "retried"> {
  const applied = applyMapping(fixture, mapping);
  const checks = runChecks(applied);
  return { mapping, applied, checks, passed: allPassed(checks) };
}

export function mrfHandoffInputs(mapping: MrfMapping | null, checks: NamedCheck[]): Record<string, string> {
  return {
    previous_mapping: mapping ? JSON.stringify(mapping) : "",
    failing_checks: JSON.stringify(failingChecks(checks).map((c) => ({
      name: c.name,
      expected: c.expected,
      actual: c.actual,
      evidence: c.evidence,
    }))),
  };
}

export const MRF_RETRY_HINT = "Previous reply was not valid JSON matching output_schema. Return only one JSON object.";
