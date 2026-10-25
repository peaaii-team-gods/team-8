import { digest } from "./sha256";
import type { ApplyResult, NamedCheck } from "./types";

/** Pinned oracle: 16 flattened rows, 2 nulls repaired, 14 inserted, digest of inserted rows. */
export const PINNED = {
  flattened_row_count: 16,
  nulls_repaired: 2,
  inserted_row_count: 14,
  digest: "4bc453d89a199a71a454ed713db26bd199b8b424fec7c65a988c823ff269bbcc",
} as const;

const check = (name: string, expected: string | number, actual: string | number, evidence: Record<string, unknown> = {}): NamedCheck => ({
  name,
  pass: expected === actual,
  expected,
  actual,
  evidence,
});

export function runChecks(result: ApplyResult): NamedCheck[] {
  const actualDigest = digest(result.rows);
  return [
    check("flattened_row_count", PINNED.flattened_row_count, result.flattened_row_count, {
      flattened_row_count: result.flattened_row_count,
    }),
    check("nulls_repaired", PINNED.nulls_repaired, result.nulls_repaired, {
      nulls_repaired: result.nulls_repaired,
    }),
    check("inserted_row_count", PINNED.inserted_row_count, result.inserted_row_count, {
      inserted_row_count: result.inserted_row_count,
    }),
    check("digest", PINNED.digest, actualDigest, { digest: actualDigest }),
  ];
}

export const failingChecks = (checks: NamedCheck[]) => checks.filter((c) => !c.pass);
export const allPassed = (checks: NamedCheck[]) => checks.every((c) => c.pass);
