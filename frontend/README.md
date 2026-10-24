## Shared-account inference settings

Live mode includes Account inference settings after Identity sign-in. Select
OpenRouter BYOK or provide an OpenAI-compatible public HTTPS endpoint and model ID.
An optional helper has independent settings. Choose a user-owned llama gateway
as Primary to use it for all inference. There is no operator model or key fallback.

The team8 login shares settings across teammates and RHM services. Save and remove
require explicit confirmation and the current Backend revision. Refresh settings
after a conflict, then review the change again. Keys are write-only password
fields cleared on dispatch. They never enter canvas state, workflow inputs,
browser storage or URLs. Production stores keys in the encrypted account vault across restarts.
A memory-only fixture instead reports backend_process and requires re-entry. Replacement revokes subsequent ticks; an already
dispatched request may finish.

Custom endpoints must be public HTTPS and reachable from Backend. Localhost is
the server, not your PC. Use an authenticated HTTPS gateway for a personal local
model. Private IPs, URL credentials and redirects are unsupported.

Live runs require explicit paid-inference consent for remote primary or helper
providers, confirmed account metadata and a nonnegative USD admission cap
per agent run. All configured endpoints need a positive cap; charges may apply. Dollar accounting depends on
the provider; configure a hard spending limit on the provider key. Several agents
submit separate runs, each with its own cap. Fixtures make no paid calls. The
simulated canvas remains a synthetic demonstration without inference.

# RHM Agent Canvas (hackathon demo)

Visual multi-agent canvas: draw agents + data lakes, tether lakes to agents, run a bounded pipeline. A **consumer** of the public RHM contract (`../API.md`) — it owns no service state.

## Run
```bash
npm install
npm run dev        # simulated mode by default
npm test           # vitest + compiler golden checks
npm run build
npm run docs:check # registry tables in EXTENDING.md must match src/registry
```

## Modes
- `simulated` (default): full UI, fake run lifecycle. Use for demos without a stack.
- `live`: set `VITE_RHM_MODE=live`, `VITE_RHM_API_BASE` (default `http://127.0.0.1:8001`) and optionally `VITE_RHM_IDENTITY_BASE` (defaults to the API base), then restart the dev/preview server. In live mode a sign-in panel appears: enter username/password (cleared on submit; tokens are memory-only, never stored in the browser), and on success the app fetches `GET /v1/capabilities` and shows which manifest features are live vs unavailable. Run stays disabled until sign-in — live mode never falls back to simulated. Targets a **local loopback stack** (Identity + backend); the Vite origin must be operator-allowlisted in Identity `CORS_ALLOW_ORIGINS` and backend `ALLOWED_ORIGINS`. No proxy, no credential logging.

## X1 live smoke (`scripts/live-smoke.mjs`)

Operator-run gate harness against an **already-up local loopback stack**. It starts nothing: no Docker, no service processes, no provisioning. It logs in via `POST {identityBase}/v1/auth/password/login` (same live endpoint as `src/adapters/identity.ts`; the access token is in the login response, memory-only, password cleared after login — Identity's `POST /v1/auth/session/bootstrap` returns only a CSRF token and is not used for API calls), checks `GET /v1/capabilities` (nested `capabilities` map of `{status, reason_code, detail}`), compiles one Builder `workflow.v1` (same bounded shape as `src/compile/toWorkflow.ts`, synthetic fixture evidence only), creates a workflow (`POST /v1/workflows` with a `{workflow}` body) + run via the public API, and polls (1s interval, 120s bounded timeout; `RHM_SMOKE_POLL_MS` / `RHM_SMOKE_TIMEOUT_MS` override within limits) until terminal. Pass requires `succeeded` with `completion_basis=agent_reported`. It prints the run id, status, and a content-free (length-only) output summary from `GET /v1/runs/{id}/outputs` — never output content, tokens, cookies, or the password.

Prerequisites:
- Local loopback stack (Identity + backend) already running; `RHM_API_BASE` (default `http://127.0.0.1:8001`) and `RHM_IDENTITY_BASE` (default: the API base) must be loopback URLs.
- Origins allowlisted on the stack for the operator context (Identity `CORS_ALLOW_ORIGINS`, backend `ALLOWED_ORIGINS`, as in live mode above).
- Operator credentials for that stack. Password only via `RHM_PASSWORD` env or the interactive TTY prompt — never as a command-line argument, never logged or persisted.

Exact command:
```bash
RHM_API_BASE=http://127.0.0.1:8001 RHM_USERNAME=<operator> npm run smoke:live
# validate config + print the plan without any network calls:
npm run smoke:live -- --dry-run
```

Exit codes: `0` pass · `2` stack unreachable / not configured · `3` capabilities gate failed (`run_execution` unavailable; hosted `execute-shell` / `execute-check` / tier-3 are printed exactly as capabilities report them, never gated) · `4` run failed (create/poll error, timeout, or terminal status not `succeeded` + `agent_reported`).

Status: X1 attempt 1 ran and **FAILED** (harness login 404 — wrong Identity endpoints, see `HANDOFF.md`); the harness/adapter were then aligned to the live contracts on `codex/f-x1-fix-20261022`. **X1 attempt 2 still NOT RUN** — awaiting a separate gate run against a live stack.

## Honest limits
`workflow.v1` carries **no tools by default**: data-lake tethers compile to bounded synthetic inputs. MCP presets attached to an agent are copied into `inputs.mcp_attachments` as JSON text and stay `declared` unless a live capabilities report and a workspace binding make a hosted shell/check capability available — that label means the matching `allowed_tools` entry may be emitted, not that an MCP server ran. The registry alone never adds tools. The one exception (B9) is compiler-level, backend-wins-gated: in live mode the app fetches `GET /v1/capabilities` fresh at Run time, and only when that fetched report carries `shell_execution` / `tool_execution` as nested `{status:"available"}` does the compiler emit the corresponding `execute_shell` / `execute_check` in `allowed_tools`. Unavailable, `unknown`, missing, malformed or not-fetched reports emit exactly `allowed_tools: []`, as do simulated runs; the manifest `liveToday` defaults are display-only and never emit. Tier-3 is never emitted. Outputs are model proposals (`agent_reported`), not verification. B10 update: the backend now reports shell/tool execution `available` per-caller only when that caller holds a usable binding (ready B3 workspace or exact grant + approved manifest) and the sandbox readiness probe responds, and the canvas binds runs to a real workspace: in live mode it fetches the caller's `GET /v1/workspaces` and auto-binds when exactly one ready workspace exists (otherwise it binds nothing — a selector for several workspaces is a follow-up). Emission now requires available **and** a real binding; the compiled workflow then carries the real `workspace_id`/`project_id`/`task_id`. No binding keeps `allowed_tools: []` on the synthetic path. Live hosted execution from the canvas is still exercised only by the B10 gate, not claimed here (see `HANDOFF.md`, B9/B10). Signed-in run history reads `GET /v1/runs?workspace_id=…` only. Simulated mode does not invent that list. The history panel shows status, basis, and timestamps, not model text. The canvas graph stays in memory. The readiness panel shows fetched capability chips and the workspace bound for the next Run. A green chip does not emit tools. The choice stays in memory. Simulated mode shows unavailable chips and no workspaces. Export snapshot writes a local `canvas.snapshot.v1` file of the graph only. Import replaces the canvas from that file. It is not a server save, and it drops run output. `?demo=1` opens a storyboard on the canvas with no Identity call and no automatic Run. `?autorun=1` is the only switch that starts a run. Exit demo drops the query flag. Demo mode is not stored in the browser. The Contracts drawer lists registry output schemas. It does not edit an agent or call the API. Press Ctrl+K for the command palette.
