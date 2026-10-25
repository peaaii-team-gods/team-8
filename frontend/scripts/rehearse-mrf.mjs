#!/usr/bin/env node
/**
 * MRF demo rehearsal. Simulated path is the guaranteed offline story.
 * Live: run the same beats 3x against the signed-in canvas; do not switch
 * paid models without owner consent. If the first live model is flaky, pick
 * another advertised account model in Account inference settings.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
console.log("MRF rehearsal — simulated adapter (offline full story)");
console.log("Beats: base pass → drift named fail (nulls_repaired) → one repair pass");
console.log("Labels: Proposal / Checked locally. Never Verified without a Coding SHA.");
const result = spawnSync(
  process.execPath,
  ["node_modules/vitest/vitest.mjs", "run", "src/mrf/apply.test.ts", "src/mrf/drift.test.ts", "src/mrf/labels.test.ts", "src/App.smoke.test.tsx", "-t", "MRF|honesty|pinned"],
  { cwd: root, stdio: "inherit", env: process.env },
);
if (result.status !== 0) process.exit(result.status ?? 1);
console.log("");
console.log("Live 3x (manual, do not deploy or restart services from this script):");
console.log("  1. Sign in on the canvas (VITE_RHM_MODE=live). Confirm account inference + spend cap.");
console.log("  2. Run MRF demo → Run Pipeline. Receipt must show pinned checks passed / Checked locally.");
console.log("  3. Click Upstream schema drift. Receipt must fail a named check (nulls_repaired).");
console.log("  4. One Maintainer repair must recheck green. Repeat the live beats twice more.");
console.log("Fallback model: pick another advertised account model if the first is flaky. No paid switch without consent.");
console.log("simulated rehearsal: PASS");
