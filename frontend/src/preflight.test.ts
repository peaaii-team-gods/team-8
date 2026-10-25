import { describe, expect, it } from "vitest";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import {
  classify, formatLine, driveObservation, cacheObservation, report, localDemoFailed,
  SOUTH_SHORE_SHA256,
} from "../scripts/preflight.mjs";

const SECRET = "preflight-env-sentinel-do-not-print";

describe("preflight classify()", () => {
  it("marks pipeline 404 JSON as up and other statuses down", () => {
    expect(classify("pipeline", { status: 404, json: { error: "not_found" } })).toEqual({ level: "GREEN", detail: "up" });
    expect(classify("pipeline", { status: 200, json: {} }).level).toBe("RED");
  });

  it("marks pipeline 401 unauthorized JSON as up with auth required", () => {
    expect(classify("pipeline", { status: 401, json: { error: "unauthorized" } })).toEqual({ level: "GREEN", detail: "up (auth required)" });
    expect(classify("pipeline", { status: 401, json: { error: "other" } }).level).toBe("RED");
  });

  it("marks public 530 as RED tunnel connector down", () => {
    expect(classify("public", { status: 530 })).toEqual({ level: "RED", detail: "tunnel connector down" });
    expect(classify("public", { status: 200 }).level).toBe("GREEN");
    expect(formatLine("public", classify("public", { status: 530 }))).toBe("RED public site tunnel connector down");
  });

  it("treats hospital and S3 failures as AMBER cache used", () => {
    expect(classify("hospital", { error: "unreachable" })).toEqual({ level: "AMBER", detail: "cache used" });
    expect(classify("s3", { status: 403 })).toEqual({ level: "AMBER", detail: "cache used" });
  });

  it("treats RHM 401/200 as reachable", () => {
    expect(classify("rhm", { status: 401 }).level).toBe("GREEN");
    expect(classify("rhm", { status: 200 }).level).toBe("GREEN");
    expect(classify("rhm", { status: 500 }).level).toBe("RED");
  });

  it("never prints env values in formatted lines", () => {
    const rows = report({
      pipeline: { status: 404, json: { error: "not_found" } },
      frontend: { status: 200 },
      public: { status: 530 },
      cache: { matched: false },
      hospital: { error: "unreachable" },
      s3: { error: "unreachable" },
      rhm: { status: 401 },
      identity: { status: 200 },
      drive: driveObservation({ DRIVE_SECRETS_FILE: SECRET }, () => false),
    });
    const text = rows.map((row) => formatLine(row.kind, row)).join("\n");
    expect(text).toContain("RED public site tunnel connector down");
    expect(text).toContain("AMBER Drive Drive not configured");
    expect(text).not.toContain(SECRET);
    expect(text).not.toContain("PIPELINE_BASE");
    expect(text).not.toContain("127.0.0.1");
    expect(localDemoFailed(rows)).toBe(false);
  });

  it("matches a south-shore cache entry only when sha256 matches", () => {
    const dir = mkdtempSync(join(tmpdir(), "preflight-cache-"));
    try {
      const blob = new Uint8Array([1, 2, 3, 4]);
      const digest = createHash("sha256").update(blob).digest("hex");
      writeFileSync(join(dir, "index.json"), JSON.stringify({ "www.southshorehealth.org|south shore hospital": digest }));
      writeFileSync(join(dir, `${digest}.mrf`), blob);
      expect(cacheObservation(join(dir, "index.json"), digest).matched).toBe(true);
      expect(cacheObservation(join(dir, "index.json"), SOUTH_SHORE_SHA256).matched).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
