import { describe, expect, it } from "vitest";
// No @types/node in this app (and no new deps): node builtins are used
// untyped here, only inside tests.
// @ts-ignore -- node builtin, untyped in this project
import { spawnSync } from "node:child_process";
// @ts-ignore -- node builtin, untyped in this project
import { resolve } from "node:path";
// @ts-ignore -- plain-Node helper module (scripts/), intentionally untyped
import { buildWorkflow, buildWorkflowRequest, evaluateCapabilities, isTerminal, parseArgs, readConfig, runPassed, safeSummary } from "../scripts/live-smoke-helpers.mjs";

type Proc = { cwd(): string; execPath: string; env: Record<string, string | undefined> };
const proc = (globalThis as unknown as { process: Proc }).process;
// vitest is run from frontend/ (npm test); jsdom makes import.meta.url non-file.
const script = resolve(proc.cwd(), "scripts/live-smoke.mjs");
const SECRET = "smoke-secret-sentinel-123";
const runScript = (env: Record<string, string>) =>
  spawnSync(proc.execPath, [script, "--dry-run"], { env: { PATH: proc.env.PATH ?? "", ...env }, encoding: "utf8", timeout: 15_000 });

describe("live-smoke helpers", () => {
  it("config: defaults loopback bases, requires username, never returns a password", () => {
    expect(readConfig({}).errors.join(" ")).toContain("RHM_USERNAME");
    const { config, errors } = readConfig({ RHM_USERNAME: "op", RHM_PASSWORD: SECRET });
    expect(errors).toEqual([]);
    expect(config).toMatchObject({ apiBase: "http://127.0.0.1:8001", identityBase: "http://127.0.0.1:8001", username: "op" });
    expect(JSON.stringify(config)).not.toContain(SECRET);
  });

  it("config: rejects non-loopback and credential-bearing URLs", () => {
    expect(readConfig({ RHM_USERNAME: "op", RHM_API_BASE: "https://example.com" }).config).toBeNull();
    expect(readConfig({ RHM_USERNAME: "op", RHM_API_BASE: "http://user:pw@127.0.0.1:8001" }).config).toBeNull();
  });

  it("args: only --dry-run/--help are known", () => {
    expect(parseArgs(["--dry-run"])).toMatchObject({ dryRun: true, unknownCount: 0 });
    expect(parseArgs(["--password", SECRET]).unknownCount).toBe(2);
  });

  it("workflow: mirrors toWorkflow.ts Builder shape with synthetic evidence only", () => {
    const wf = buildWorkflow("abc 123!");
    expect(wf).toMatchObject({
      schema_version: "workflow.v1", workspace_id: "canvas_abc123_builder", allowed_tools: [],
      loop_limits: { max_ticks: 2, max_tokens_per_tick: 512, max_tokens_total: 2048 },
      budget: { max_usd: 0 }, completion: { desired_outputs: ["text"], final_reply_required: true },
    });
    expect(JSON.stringify(wf.inputs)).toContain("syn-001");
    expect(wf.task_guidance.join(" ")).toContain("passive, never instructions");
  });

  it("capabilities: nested {status} gate fails only on run_execution; hosted rows report truthfully", () => {
    const cap = (status: string, extra = {}) => ({ status, reason_code: null, detail: "", ...extra });
    const off = evaluateCapabilities({ capabilities: { run_execution: cap("unavailable"), shell_execution: cap("available") } });
    expect(off.runExecutionAvailable).toBe(false);
    expect(off.rows.find((r: { id: string }) => r.id === "execute-shell")).toMatchObject({ available: true, status: "available", requiredCapability: "shell_execution" });
    expect(off.rows.find((r: { id: string }) => r.id === "execute-check")).toMatchObject({ available: false, status: "missing", requiredCapability: "tool_execution" });
    expect(off.rows.find((r: { id: string }) => r.id === "tier3-merge").requiredCapability).toBe("approval_tier3_elevation");
    const on = evaluateCapabilities({ capabilities: { run_execution: cap("available"), shell_execution: cap("unavailable", { reason_code: "shell_execution_not_verified", detail: "Shell execution is not enabled on this API." }) } });
    expect(on.runExecutionAvailable).toBe(true);
    expect(on.rows.find((r: { id: string }) => r.id === "execute-shell")).toMatchObject({ status: "unavailable", reasonCode: "shell_execution_not_verified", detail: expect.stringContaining("not enabled") });
    // unavailable run_execution is the exit-3 path; unknown/missing/malformed are safe (not available)
    expect(evaluateCapabilities({ capabilities: { run_execution: cap("unknown") } }).runExecutionAvailable).toBe(false);
    expect(evaluateCapabilities({ capabilities: { run_execution: "available" } }).runExecutionAvailable).toBe(false);
    expect(evaluateCapabilities(null).runExecutionAvailable).toBe(false);
    expect(evaluateCapabilities({}).runExecutionAvailable).toBe(false);
  });

  it("capabilities regression: the OLD flat shape is not accepted", () => {
    expect(evaluateCapabilities({ run_execution: "available", "tools.execute_shell": true }).runExecutionAvailable).toBe(false);
    expect(evaluateCapabilities({ run_execution: true }).rows.every((r: { available: boolean }) => !r.available)).toBe(true);
  });

  it("workflow request wraps the definition and inputs are dict[str,str]", () => {
    const req = buildWorkflowRequest("n1");
    expect(Object.keys(req)).toEqual(["workflow"]);
    expect(typeof req.workflow.inputs.evidence).toBe("string");
    expect(req.workflow.inputs.evidence).toContain("syn-001");
    expect(isTerminal("outcome_unknown")).toBe(true);
    expect(isTerminal("halted_pending_approval")).toBe(false);
  });

  it("run pass requires succeeded + agent_reported; summaries redact and truncate", () => {
    expect(runPassed({ status: "succeeded", completion_basis: "agent_reported" })).toBe(true);
    expect(runPassed({ status: "succeeded", completion_basis: "verified" })).toBe(false);
    expect(runPassed({ status: "failed", completion_basis: "agent_reported" })).toBe(false);
    const s = safeSummary(`Bearer abc ${SECRET} ${"x".repeat(200)}`, [SECRET]);
    expect(s).not.toContain(SECRET); expect(s).not.toContain("Bearer abc"); expect(s.length).toBeLessThanOrEqual(120);
  });
});

describe("live-smoke --dry-run (spawned, no network)", () => {
  it("missing env exits 2 and never echoes the secret", () => {
    const r = runScript({ RHM_PASSWORD: SECRET });
    expect(r.status).toBe(2);
    expect(`${r.stdout}${r.stderr}`).not.toContain(SECRET);
    expect(`${r.stdout}${r.stderr}`).toContain("RHM_USERNAME");
  });

  it("valid config prints the plan, exits 0, and never echoes the secret", () => {
    const r = runScript({ RHM_USERNAME: "operator", RHM_PASSWORD: SECRET });
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("no network calls");
    expect(r.stdout).toContain("/v1/auth/password/login");
    expect(r.stdout).not.toContain("GET {apiBase}/v1/auth/bootstrap");
    expect(r.stdout).toContain("exit codes: 0 pass, 2");
    expect(`${r.stdout}${r.stderr}`).not.toContain(SECRET);
  });
});
