// Regenerates src/ui/fixtures/hospital-run.preview.json from the recorded run.
// Usage (from frontend/): node scripts/extract-preview.mjs
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE = "frontend/src/ui/fixtures/hospital-run.real.json";
const SOURCE_COMMIT = "5e1d9fb";
const here = dirname(fileURLToPath(import.meta.url));
const fixtures = resolve(here, "../src/ui/fixtures");

// Hash LF-normalised text so the digest matches the committed blob on any checkout (autocrlf).
const text = readFileSync(resolve(fixtures, "hospital-run.real.json"), "utf8").replace(/\r\n/g, "\n");
const recorded = JSON.parse(text);
const top10 = recorded.steps.flatMap((s) => s.telemetry).find((t) => t.type === "top10");
if (!top10?.rows?.length) throw new Error("no top10 rows in recorded run");

const preview = {
  source: SOURCE,
  source_commit: SOURCE_COMMIT,
  source_sha256: createHash("sha256").update(text).digest("hex"),
  rows: top10.rows.slice(0, 3),
};
writeFileSync(resolve(fixtures, "hospital-run.preview.json"), JSON.stringify(preview, null, 2) + "\n");
