#!/usr/bin/env node
// X1 live-smoke harness. Operator-run ONLY against an already-up local
// loopback stack. Never starts services/Docker/provisioning. Password comes
// only from RHM_PASSWORD or an interactive prompt (never argv, never logged);
// tokens/cookies stay memory-only. See README "X1 live smoke".
import { createInterface } from "node:readline";
import {
  EXIT, buildWorkflowRequest, evaluateCapabilities, isTerminal, outputSummary,
  parseArgs, readConfig, redact, runPassed,
} from "./live-smoke-helpers.mjs";

const REQUEST_TIMEOUT_MS = 10_000;
class SmokeError extends Error { constructor(code, msg) { super(msg); this.code = code; } }
const fail = (code, msg) => { throw new SmokeError(code, msg); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let secrets = []; // password + token, for redaction only; never printed
const say = (line = "") => console.log(redact(line, secrets));
const nonce = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

function printPlan(config, passwordSource) {
  say("X1 live-smoke plan (dry-run: no network calls)");
  say(`  apiBase=${config.apiBase} identityBase=${config.identityBase} username=${config.username}`);
  say(`  credential source: ${passwordSource} (never argv, never logged, cleared after login)`);
  say("  1. POST {identityBase}/v1/auth/password/login (access token in the login response, memory-only; session/bootstrap returns csrf only and is not used for API calls)");
  say("  2. GET {apiBase}/v1/capabilities; fail (3) only if capabilities.run_execution.status is not available; hosted features printed as reported");
  say("  3. POST /v1/workflows {workflow: <one Builder workflow.v1, synthetic fixture evidence>}, POST /v1/runs");
  say(`  4. Poll GET /v1/runs/{id} every ${config.pollIntervalMs}ms up to ${config.pollTimeoutMs}ms; require succeeded + agent_reported`);
  say("  exit codes: 0 pass, 2 stack unreachable/not configured, 3 capabilities gate failed, 4 run failed");
}

// Masked TTY prompt; returns null when no TTY (caller then exits 2).
function promptPassword() {
  if (!process.stdin.isTTY) return Promise.resolve(null);
  const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
  return new Promise((resolve) => {
    rl.question("RHM password: ", (answer) => { rl.close(); say(); resolve(answer); });
    rl._writeToOutput = () => {}; // suppress echo of typed characters
  });
}

async function fetchJson(url, init, phase) {
  let res;
  try {
    res = await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  } catch {
    // Network errors land in the caller's phase bucket; no URL/credential echo.
    fail(phase, "request failed (stack unreachable or timed out)");
  }
  let body = null;
  try { body = await res.json(); } catch { /* non-JSON: status carries the signal */ }
  return { res, body };
}
const jsonInit = (method, token, body, extra = {}) => ({
  method,
  headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}), ...extra },
  ...(body === undefined ? {} : { body: JSON.stringify(body) }),
});

// IdentitySession-equivalent (src/adapters/identity.ts): password login
// returns the access token directly (AuthTokens). Session bootstrap only
// returns a CSRF token for cookie/Origin browser flows and issues no
// access token, so it is intentionally not called here; the capabilities
// call below verifies the bearer session the way the canvas uses it.
async function login(config, password) {
  const loginRes = await fetchJson(`${config.identityBase}/v1/auth/password/login`,
    jsonInit("POST", null, { username: config.username, password }), EXIT.NOT_CONFIGURED);
  if (!loginRes.res.ok) fail(EXIT.NOT_CONFIGURED, `login failed (http ${loginRes.res.status})`);
  const token = loginRes.body?.access_token;
  if (!token) fail(EXIT.NOT_CONFIGURED, "login returned no access token");
  return token;
}

async function checkCapabilities(config, token) {
  const { res, body } = await fetchJson(`${config.apiBase}/v1/capabilities`, jsonInit("GET", token), EXIT.NOT_CONFIGURED);
  if (!res.ok) fail(EXIT.CAPABILITIES, `capabilities request failed (http ${res.status})`);
  const { rows, runExecutionAvailable } = evaluateCapabilities(body);
  say("capabilities (as reported):");
  for (const r of rows) say(`  ${r.id}: ${r.status} (capability=${r.requiredCapability}${r.reasonCode ? `, reason_code=${r.reasonCode}` : ""}${r.detail ? `, detail=${r.detail}` : ""})`);
  if (!runExecutionAvailable) fail(EXIT.CAPABILITIES, "capabilities gate failed: run_execution is not available");
}

async function runWorkflow(config, token) {
  const wf = await fetchJson(`${config.apiBase}/v1/workflows`,
    jsonInit("POST", token, buildWorkflowRequest(nonce())), EXIT.RUN_FAILED);
  const workflowId = wf.body?.workflow_id ?? wf.body?.id;
  if (!wf.res.ok || !workflowId) fail(EXIT.RUN_FAILED, `workflow create failed (http ${wf.res.status})`);
  const run = await fetchJson(`${config.apiBase}/v1/runs`,
    jsonInit("POST", token, { workflow_id: workflowId }), EXIT.RUN_FAILED);
  const runId = run.body?.run_id ?? run.body?.id;
  if (!run.res.ok || !runId) fail(EXIT.RUN_FAILED, `run create failed (http ${run.res.status})`);
  const deadline = Date.now() + config.pollTimeoutMs;
  for (;;) {
    const poll = await fetchJson(`${config.apiBase}/v1/runs/${runId}`, jsonInit("GET", token), EXIT.RUN_FAILED);
    if (!poll.res.ok) fail(EXIT.RUN_FAILED, `run poll failed (http ${poll.res.status})`);
    if (isTerminal(poll.body?.status) || Date.now() >= deadline) {
      const done = poll.body ?? {};
      // RunResponse carries no outputs; they live on the outputs endpoint.
      let outputs;
      if (isTerminal(done.status)) {
        const out = await fetchJson(`${config.apiBase}/v1/runs/${runId}/outputs`, jsonInit("GET", token), EXIT.RUN_FAILED);
        if (out.res.ok) outputs = out.body?.outputs;
      }
      return { runId, body: done, outputs, timedOut: !isTerminal(done.status) };
    }
    await sleep(config.pollIntervalMs);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    say("Usage: RHM_USERNAME=... RHM_PASSWORD=... npm run smoke:live [-- --dry-run]");
    say("Env: RHM_API_BASE (default http://127.0.0.1:8001), RHM_IDENTITY_BASE (default = API base), RHM_USERNAME, RHM_PASSWORD (or TTY prompt).");
    return EXIT.PASS;
  }
  if (args.unknownCount) fail(EXIT.NOT_CONFIGURED, `unknown arguments (${args.unknownCount}); arguments are never echoed`);
  const { config, errors } = readConfig(process.env);
  if (!config) { for (const e of errors) say(`config: ${e}`); return EXIT.NOT_CONFIGURED; }
  let password = process.env.RHM_PASSWORD || null;
  if (password) secrets = [password];
  if (args.dryRun) { printPlan(config, password ? "from RHM_PASSWORD env" : "interactive prompt at run time"); return EXIT.PASS; }
  if (!password) password = await promptPassword();
  if (!password) fail(EXIT.NOT_CONFIGURED, "no password: set RHM_PASSWORD or run in a TTY to be prompted");
  secrets = [password];
  let token = null;
  try {
    token = await login(config, password);
    secrets = [password, token];
    await checkCapabilities(config, token);
    const { runId, body, outputs, timedOut } = await runWorkflow(config, token);
    say(`run_id=${runId}`);
    say(`status=${String(body.status ?? "unknown").toLowerCase()} completion_basis=${body.completion_basis ?? "missing"}`);
    say(`output_summary=${outputSummary(outputs)}`);
    if (timedOut) fail(EXIT.RUN_FAILED, "run did not reach a terminal status within the bounded timeout");
    if (!runPassed(body)) fail(EXIT.RUN_FAILED, "run terminal but not succeeded with completion_basis=agent_reported");
    say("X1 live smoke: PASS");
    return EXIT.PASS;
  } finally {
    password = null; token = null; secrets = []; // dropped, never persisted
  }
}

main()
  .then((code) => { process.exitCode = code; })
  .catch((err) => {
    const code = err instanceof SmokeError ? err.code : EXIT.NOT_CONFIGURED;
    console.error(redact(`live-smoke: ${err instanceof Error ? err.message : "failed"}`, secrets));
    secrets = [];
    process.exitCode = code;
  });
