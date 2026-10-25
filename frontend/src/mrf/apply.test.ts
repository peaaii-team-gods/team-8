import { describe, expect, it } from "vitest";
import { applyMapping } from "./apply";
import { PINNED, allPassed, failingChecks, runChecks } from "./checks";
import { sha256Hex } from "./sha256";
import type { MrfMapping } from "./types";

// No @types/node in this app (and no new deps): node builtins are used untyped here, only inside tests.
// @ts-ignore -- node builtin, untyped in this project
import { readFileSync } from "node:fs";
// @ts-ignore -- node builtin, untyped in this project
import { resolve } from "node:path";

type Proc = { cwd(): string };
const proc = (globalThis as unknown as { process: Proc }).process;
const fixtures = resolve(proc.cwd(), "../fixtures");
const load = (name: string) => JSON.parse(readFileSync(resolve(fixtures, name), "utf8"));

const base = () => load("mrf-chunk.json");
const drift = () => load("mrf-chunk-drift.json");
const golden = () => load("mrf-golden-mapping.json") as MrfMapping;
const repair = () => load("mrf-golden-repair.json") as MrfMapping;

describe("sha256Hex", () => {
  it("matches the empty-string and abc vectors", () => {
    expect(sha256Hex("")).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    expect(sha256Hex("abc")).toBe("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
  });
});

describe("MRF apply + pinned checks", () => {
  it("golden mapping passes 16/2/14 + digest on the base fixture", () => {
    const result = applyMapping(base(), golden());
    expect(result.flattened_row_count).toBe(16);
    expect(result.nulls_repaired).toBe(2);
    expect(result.inserted_row_count).toBe(14);
    const checks = runChecks(result);
    expect(failingChecks(checks).map((c) => `${c.name}: expected ${c.expected} got ${c.actual}`)).toEqual([]);
    expect(allPassed(checks)).toBe(true);
    expect(PINNED.digest).not.toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  });

  it("golden mapping fails a named check on the drift fixture", () => {
    const checks = runChecks(applyMapping(drift(), golden()));
    const failed = failingChecks(checks);
    expect(failed.length).toBeGreaterThan(0);
    expect(failed.map((c) => c.name)).toContain("nulls_repaired");
    expect(failed.find((c) => c.name === "nulls_repaired")).toMatchObject({ expected: 2, pass: false });
  });

  it("golden repair passes pinned checks on the drift fixture", () => {
    const result = applyMapping(drift(), repair());
    expect(result).toMatchObject({ flattened_row_count: 16, nulls_repaired: 2, inserted_row_count: 14 });
    expect(allPassed(runChecks(result))).toBe(true);
  });
});
