// Read-only demo preflight. Never starts services. Never prints env or secret contents.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const TIMEOUT_MS = 3000;
export const SOUTH_SHORE_SHA256 = "0ba485a4805fae35fd4f1ed425750cf655aaa05c09df0c2939fce07e5b6881bd";
export const FIXTURE_S3_URL = "https://zencloud-southshorehealth.s3.us-east-1.amazonaws.com/www.southshorehealth.org/assets/2026-03/042769210_south-shore-hospital_standardcharges.json";

export const DEFAULTS = {
  PIPELINE_BASE: "http://127.0.0.1:8787",
  FRONTEND_BASE: "http://127.0.0.1:5173",
  PUBLIC_BASE: "https://peaaiiteam8.online",
  HOSPITAL_BASE: "https://www.southshorehealth.org",
  RHM_API_BASE: "https://api.right-hand-man.space",
  IDENTITY_BASE: "https://identity.right-hand-man.space",
};

const LABELS = {
  pipeline: "pipeline server",
  frontend: "frontend",
  public: "public site",
  cache: "MRF cache",
  hospital: "hospital site",
  s3: "S3 MRF",
  rhm: "RHM API",
  identity: "identity",
  drive: "Drive",
};

const LOCAL_DEMO = new Set(["pipeline", "frontend"]);

export function classify(kind, observation) {
  const status = observation?.status;
  if (kind === "pipeline") {
    if (status === 404 && typeof observation?.json?.error === "string")
      return { level: "GREEN", detail: "up" };
    if (status === 401 && observation?.json?.error === "unauthorized")
      return { level: "GREEN", detail: "up (auth required)" };
    return { level: "RED", detail: "down" };
  }
  if (kind === "frontend") {
    return status === 200 ? { level: "GREEN", detail: "up" } : { level: "RED", detail: "down" };
  }
  if (kind === "public") {
    if (status === 200) return { level: "GREEN", detail: "up" };
    if (status === 530) return { level: "RED", detail: "tunnel connector down" };
    return { level: "RED", detail: "down" };
  }
  if (kind === "cache") {
    return observation?.matched ? { level: "GREEN", detail: "sha256 match" } : { level: "AMBER", detail: "cache missing or sha mismatch" };
  }
  if (kind === "hospital" || kind === "s3") {
    return status === 200 ? { level: "GREEN", detail: "up" } : { level: "AMBER", detail: "cache used" };
  }
  if (kind === "rhm") {
    return status === 200 || status === 401 ? { level: "GREEN", detail: "reachable" } : { level: "RED", detail: "down" };
  }
  if (kind === "identity") {
    return status === 200 ? { level: "GREEN", detail: "up" } : { level: "RED", detail: "down" };
  }
  if (kind === "drive") {
    return observation?.configured ? { level: "GREEN", detail: "configured" } : { level: "AMBER", detail: "Drive not configured" };
  }
  return { level: "RED", detail: "down" };
}

export function formatLine(kind, classified) {
  return `${classified.level} ${LABELS[kind] ?? kind} ${classified.detail}`;
}

export function driveObservation(env = {}, exists = existsSync) {
  const path = env.DRIVE_SECRETS_FILE;
  return { configured: Boolean(path && exists(path)) };
}

export function cacheObservation(indexPath, expectedSha = SOUTH_SHORE_SHA256) {
  try {
    const index = JSON.parse(readFileSync(indexPath, "utf8"));
    const entry = Object.entries(index).find(([key]) => /south[\s-]?shore/i.test(key));
    if (!entry || typeof entry[1] !== "string") return { matched: false };
    const digest = entry[1];
    if (digest !== expectedSha) return { matched: false };
    const blob = readFileSync(join(dirname(indexPath), `${digest}.mrf`));
    const actual = createHash("sha256").update(blob).digest("hex");
    return { matched: actual === expectedSha };
  } catch {
    return { matched: false };
  }
}

async function probe(url, method) {
  let last = { error: "unreachable" };
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(url, { method, redirect: "manual", signal: AbortSignal.timeout(TIMEOUT_MS) });
      let json = null;
      if (method === "GET") {
        try { json = await res.json(); } catch { json = null; }
      }
      return { status: res.status, json };
    } catch {
      last = { error: "unreachable" };
    }
  }
  return last;
}

function base(env, key) {
  const value = env[key];
  return (typeof value === "string" && value.trim()) ? value.replace(/\/$/, "") : DEFAULTS[key];
}

export async function collectObservations(env = process.env, io = { exists: existsSync, repoRoot: null }) {
  const pipeline = base(env, "PIPELINE_BASE");
  const frontend = base(env, "FRONTEND_BASE");
  const pub = base(env, "PUBLIC_BASE");
  const hospital = base(env, "HOSPITAL_BASE");
  const rhm = base(env, "RHM_API_BASE");
  const identity = base(env, "IDENTITY_BASE");
  const s3 = FIXTURE_S3_URL;
  const root = io.repoRoot ?? join(dirname(fileURLToPath(import.meta.url)), "..", "..");
  const cachePaths = [join(root, "data", "index.json"), join(root, "data", "hpt-cache", "index.json")];
  const cache = cachePaths.map((path) => cacheObservation(path)).find((row) => row.matched) ?? { matched: false };
  return {
    pipeline: await probe(`${pipeline}/api/pipeline/runs/preflight-probe`, "GET"),
    frontend: await probe(`${frontend}/`, "GET"),
    public: await probe(`${pub}/`, "HEAD"),
    cache,
    hospital: await probe(`${hospital}/cms-hpt.txt`, "HEAD"),
    s3: await probe(s3, "HEAD"),
    rhm: await probe(`${rhm}/v1/capabilities`, "GET"),
    identity: await probe(`${identity}/healthz`, "GET"),
    drive: driveObservation(env, io.exists),
  };
}

export function report(observations) {
  const kinds = ["pipeline", "frontend", "public", "cache", "hospital", "s3", "rhm", "identity", "drive"];
  return kinds.map((kind) => ({ kind, ...classify(kind, observations[kind]) }));
}

export function localDemoFailed(rows) {
  return rows.some((row) => LOCAL_DEMO.has(row.kind) && row.level === "RED");
}

async function main() {
  const rows = report(await collectObservations(process.env));
  for (const row of rows) console.log(formatLine(row.kind, row));
  process.exit(localDemoFailed(rows) ? 1 : 0);
}

const invoked = typeof process.argv[1] === "string" && /preflight\.mjs$/i.test(process.argv[1].replaceAll("\\", "/"));
if (invoked) void main();
