<!-- Human-oriented integration notes for the AGS HTTP API and its deployment constraints. -->
# Agent service API integration guide

Use the agent service (AGS) to create agents, submit work, collect structured results, inspect execution, manage approvals, and run sandboxed code. It is a **FastAPI HTTP API with JSON requests and an SSE event stream**. A custom data pipeline or lightweight Playground can use it without running the existing Playground UI.

The complete source contract contains **128 application operations**. Start with the workflows below, then use the [complete route reference](AGENT_API_ROUTES.md) for every method, path, caller, parameter and request model. The accompanying [OpenAPI JSON](ags.openapi.json) includes request and response model definitions for tooling and validation.

Reviewed October 15, 2026. **Live availability:** a read-only request to `https://ags.right-hand-man.space/healthz` returned Cloudflare HTTP 530, `error code: 1033`, at approximately 2:44 p.m. Eastern. Resolve the tunnel/origin connection before testing these examples against the public hostname. The route inventory describes this checkout; the installed version and actual tunnel rules must be checked separately.

## 1. Addresses and access modes

| Address | Purpose |
|---|---|
| `https://ags.right-hand-man.space` | Public AGS origin. Only a subset of backend paths is permitted by the repository's example public policy. |
| `https://id.right-hand-man.space` | Independent identity issuer. Login and enrollment belong here, not under AGS. |
| `https://app.right-hand-man.space` | Existing app and its `/api/v1/...` gateway. These are different routes from AGS `/v1/...`. |
| `http://127.0.0.1:28100` | AGS loopback address in the V2 deployment template; usable from the host or an approved private connection. Confirm the installed port. |

The public path policy is in [deployment/cloudflared.v2.example.yml](../deployment/cloudflared.v2.example.yml). It is a **review-only template**, not proof of the running tunnel configuration. In this template, 50 AGS operations match the public path allowlist; the other 78 require a private connection or a deliberately designed gateway. Authentication and ownership checks apply after ingress.

FastAPI registers these interactive documentation endpoints by default:

- `GET /docs` — Swagger UI.
- `GET /redoc` — ReDoc.
- `GET /openapi.json` — OpenAPI contract.
- `GET /docs/oauth2-redirect` — Swagger OAuth helper.

All four are excluded from the example public policy. Open them through an authorized private connection, or open the exported JSON in an OpenAPI viewer. AGS has no `POST /chat/completions` or `POST /responses` route: agent work uses its inbox/message protocol.

### Choose an integration mode

| Mode | Credential | What it supports |
|---|---|---|
| Hosted user | `sess_...` user session | Own agents, BYOK keys, access requests, messages, controls, owner monitors, device/relay/billing workflows. Hosted execution needs an active administrator grant. |
| Owning service | Configured service bearer, conventionally `svc_...` | Service-owned agents and the fuller execution API: sessions, runs, SSE, files, sandbox, catalog, helpers and external approvals over a permitted network path. |
| Service administrator | Deployment's primary AGS service credential | Broad cross-owner authority and administrator operations. Keep on the protected backend. |
| Paired device | `dev_...` device bearer | Only the outbound device-bridge protocol for its paired device. It is not a general AGS token. |

An extra service credential is scoped to an owning service. The agent owner schema currently accepts **`rhm`, `pg`, or `cs`**, not arbitrary new service names. Namespace is an organizational field, not a complete teammate access-control boundary. A `pg` service credential can access that service's agents across namespaces; your wrapper must enforce its own user/job authorization. User sessions cannot call service-only APIs merely because the user is an administrator in the app.

## 2. Authentication and first connection

Protected calls send:

```http
Authorization: Bearer <AGS_TOKEN>
Content-Type: application/json
```

`AGS_TOKEN` is the API caller credential. An OpenRouter key pays for model calls; register it through `/v1/keys` and refer to the returned `key_id` as `llm_key_ref`. The provider key does not authenticate an AGS request.

The examples use Bash syntax with curl. Set secrets through your team's secret manager or local environment; the placeholders below are not working credentials.

```bash
export AGS_BASE='https://ags.right-hand-man.space'
export AGS_TOKEN='<your user session or authorized service token>'

curl --fail-with-body "$AGS_BASE/healthz"
curl --fail-with-body "$AGS_BASE/v1/access" \
  -H "Authorization: Bearer $AGS_TOKEN"
```

`/healthz` needs no token and returns `{"status":"ok"}` when AGS is reached. `/v1/access` requires a user session; a service token receives 403. A successful health check alone does not verify authentication, grants, or model execution.

PowerShell equivalent:

```powershell
$agsBase = 'https://ags.right-hand-man.space'
$agsHeaders = @{ Authorization = "Bearer $env:AGS_TOKEN" }
Invoke-RestMethod "$agsBase/healthz"
Invoke-RestMethod "$agsBase/v1/access" -Headers $agsHeaders
# For JSON requests, use -Method Post -ContentType 'application/json' -Body $json.
```

### Getting a user session

Use the identity issuer's configured sign-in flow. The current source supports passkey policies; **password login can be disabled when passkeys are required**. The existing browser/native app deliberately keeps session custody in its gateway/native storage. Do not assume the browser exposes a reusable bearer token or an AGS login endpoint.

Where password login is enabled, the identity contract is:

```http
POST https://id.right-hand-man.space/api/v1/auth/login
Content-Type: application/json

{
  "username": "teammate",
  "password": "pw_<generated account password>",
  "client_label": "custom-pipeline"
}
```

The response contains `user_id`, `username`, `role`, and `session_token`. Use `session_token` as the AGS bearer. New accounts use `POST /api/v1/auth/enroll` with `username`, `invite_credential`, and optional `client_label`; get an invitation from the account administrator. Password/passkey login configuration and identity availability must be confirmed for the installed deployment. For an unattended team pipeline, arrange an authorized backend service integration rather than relying on a person's browser session.

## 3. Hosted user quickstart

### Request access and register a model key

```bash
curl --fail-with-body -X POST "$AGS_BASE/v1/access/request" \
  -H "Authorization: Bearer $AGS_TOKEN"

curl --fail-with-body "$AGS_BASE/v1/access" \
  -H "Authorization: Bearer $AGS_TOKEN"
```

The request returns 202 and records the request; it does not grant execution. Access status returns `user_id`, server-derived `namespace`, `grant` (or null), `requested`, and `warning`. Wait for an enabled, unexpired grant.

Register your own provider key with this JSON body:

```json
{
  "provider": "openrouter",
  "label": "pipeline-dev",
  "secret": "<your OpenRouter API key>"
}
```

Save it locally as `key.json`, then submit it without committing that file:

```bash
curl --fail-with-body -X POST "$AGS_BASE/v1/keys" \
  -H "Authorization: Bearer $AGS_TOKEN" \
  -H 'Content-Type: application/json' --data-binary @key.json
```

The 201 response is key metadata: `key_id`, `provider`, `label`, `last4`, `created_at`. Store the returned key ID, then remove the temporary secret file according to your team's credential handling. `GET /v1/keys` lists visible key metadata; `DELETE /v1/keys/{key_id}` deletes a key.

### Create an agent

Save the following as `agent.json`, replacing the key ID. All run limits must fit your grant; these example values are not guaranteed allowances.

```json
{
  "type": "generalist",
  "display_name": "Pipeline extractor",
  "objective": "Extract the requested fields from supplied records. Return the answer through finish with result containing the extracted data. Do not invent missing values.",
  "model": {
    "mode": "tier",
    "tier": "free",
    "llm_key_ref": "<key_id returned by POST /v1/keys>"
  },
  "run_policy": {
    "mode": "task",
    "caps_scope": "message",
    "budget_usd": 0.10,
    "max_ticks": 4,
    "max_model_requests_per_tick": 4,
    "tick_wall_clock_s": 120
  }
}
```

```bash
curl --fail-with-body -X POST "$AGS_BASE/v1/user-agents" \
  -H "Authorization: Bearer $AGS_TOKEN" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: pipeline-extractor-create-v1' \
  --data-binary @agent.json
```

The 201 response is an `Agent`, including `agent_id`, `version`, `status`, owner, model, policy, timestamps and resolved `effective_model`. Keep `agent_id` and `version`. **Creation does not submit a task.**

Hosted creation derives owner and namespace from the user session. It permits `rhm_assistant`, `coder`, `generalist`, `researcher`, or `custom`, with builtin core tools and agent-private knowledge. It does not accept arbitrary toolsets, sandbox settings, ownership, or approval policies. `playground_operator: true` requires a separate operator grant and an `rhm_assistant`. Model types or names alone do not grant tool capabilities.

### Submit work and collect the answer

```bash
export AGENT_ID='<returned agent_id>'

curl --fail-with-body -X POST "$AGS_BASE/v1/agents/$AGENT_ID/messages" \
  -H "Authorization: Bearer $AGS_TOKEN" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: extract-record-0001-v1' \
  --data-binary '{"role":"user","content":"Extract company and amount from: Acme paid 42 USD. Use result with company and amount_usd.","session_key":"record-0001","wake":true}'
```

The **202 acceptance**, illustrated below, is an inbox receipt, not the agent's answer:

```json
{
  "message_id": "msg_example",
  "session_id": "ses_example",
  "seq": 1,
  "event_seq": 120
}
```

Persist this receipt against your pipeline job ID. Poll the message outcome, which matches the configured public policy:

```bash
export MESSAGE_ID='<returned message_id>'
curl --fail-with-body \
  "$AGS_BASE/v1/agents/$AGENT_ID/messages/$MESSAGE_ID?wait_s=25&include_lineage=true" \
  -H "Authorization: Bearer $AGS_TOKEN"
```

`wait_s` is clamped to 0–25 seconds. Set the client read timeout above 25 seconds. `include_lineage=true` includes the run/session chain followed through continuations and context folds.

An illustrative completed outcome:

```json
{
  "message_id": "msg_example",
  "agent_id": "agt_example",
  "state": "completed",
  "run_id": "run_example",
  "reason": "",
  "error": null,
  "output": {
    "status": "done",
    "summary": "Extracted the supplied record.",
    "result": {"company": "Acme", "amount_usd": 42}
  },
  "text": null,
  "usage": {"in": 120, "out": 45, "cost_usd": 0.0},
  "cost_pending": false,
  "known_cost_usd": 0.0
}
```

The IDs, output, usage and cost above are examples. `output` can be null, and text-mode responses can appear in `text`. Even `completed` can lack a structured result; validate your required output before publishing a downstream record.

| Message state | Pipeline behavior |
|---|---|
| `queued`, `running` | Continue polling within your own deadline. |
| `completed` | Validate `output.result` or the explicitly supported text format, then write to the sink. |
| `waiting_approval` | Persist a parked job and route it to human review. Recheck this same message after resolution. |
| `blocked` | Record the structured blocked result/reason; resolve missing inputs or permissions. |
| `capped`, `paused` | Record the reason. Review allowance/pause before an explicit resume. |
| `needs_attention` | Inspect `reason`, `error`, billing and execution status. |
| `failed`, `cancelled` | Record the unsuccessful outcome. A new submission is a deliberate new attempt. |

The long-poll handler returns promptly for parked states such as `waiting_approval` and `paused`; that does not mean the job can never continue. Agent-wide status is useful for monitoring, but **the message outcome is the correlation point for a particular input record**.

### Inspect and control

```bash
curl --fail-with-body "$AGS_BASE/v1/agents/$AGENT_ID" \
  -H "Authorization: Bearer $AGS_TOKEN"
curl --fail-with-body "$AGS_BASE/v1/agents/$AGENT_ID/public-monitor" \
  -H "Authorization: Bearer $AGS_TOKEN"
curl --fail-with-body "$AGS_BASE/v1/public/monitors" \
  -H "Authorization: Bearer $AGS_TOKEN"
curl --fail-with-body -X POST "$AGS_BASE/v1/agents/$AGENT_ID:pause" \
  -H "Authorization: Bearer $AGS_TOKEN"
curl --fail-with-body -X POST "$AGS_BASE/v1/agents/$AGENT_ID:resume" \
  -H "Authorization: Bearer $AGS_TOKEN"
```

`public-monitor` reports owner-authorized metadata, work status, known/pending spend, and recorded execution location/isolation. “Public” does not make it anonymous or expose transcript content. `GET /v1/public/monitors` returns `items` and `next_cursor`; pass that cursor for the next page. The broader `GET /v1/agents` list is private under the example ingress.

Controls use a colon: `:pause`, `:resume`, `:cancel`, `:wake`. For a shared agent, cancel a particular conversation with `POST /v1/agents/{agent_id}:cancel` and `{"session_id":"<accepted session_id>"}`. A new message does not automatically unpause a paused agent. `DELETE /v1/agents/{agent_id}` archives the agent and returns 204; it is not a guarantee that all historical records or external artifacts were purged.

To edit, first fetch the agent, then send its current version:

```bash
curl --fail-with-body -X PATCH "$AGS_BASE/v1/agents/$AGENT_ID" \
  -H "Authorization: Bearer $AGS_TOKEN" \
  -H 'Content-Type: application/json' -H 'If-Match: 1' \
  --data-binary '{"display_name":"Pipeline extractor v2"}'
```

Replace `1` with the fetched `version`. Missing `If-Match` returns 428; stale versions return 412. Nested policy/model changes must contain a valid replacement object; preserve the existing model's `llm_key_ref` when changing selection. Hosted limits and tool-authority restrictions still apply to edits.

## 4. Build a small data pipeline

A practical first version has this flow:

```text
Input records -> durable job store -> AGS inbox -> message outcome
                      |                       -> human review / parked job
                      +-> validated result -> idempotent sink write
```

Keep `job_id`, input hash/schema version, `agent_id`, idempotency key, exact submitted body, accepted `message_id`/`session_id`/`event_seq`, state, output, and billing metadata. Persist the intended submission before sending, then persist the receipt. On restart, reuse the receipt and poll the same message. If receipt delivery was lost, replay the identical submission with its original key within the supported window.

Use one stable `session_key` per independent record/job; reuse a key intentionally for follow-up conversation. A session key groups context and does not deduplicate submissions. Session IDs can change after context folding. Start by serializing work per agent and limiting the number of agents/jobs in flight; a shared agent is not an isolation boundary between unrelated tenants.

### Minimal Python submit and wait function

This uses only `httpx` (`python -m pip install httpx`). It accepts an existing agent, so it works with either hosted-user or authorized service credentials. The caller supplies durable job storage and output validation.

```python
import hashlib
import json
import os
import time

import httpx


def run_record(job_id, record, save_receipt, receipt=None, deadline_s=300):
    """save_receipt must durably store the receipt before polling begins."""
    base = os.environ["AGS_BASE"].rstrip("/")
    agent_id = os.environ["AGS_AGENT_ID"]
    content = json.dumps(
        {"task": "Extract company and amount_usd", "record": record},
        sort_keys=True, separators=(",", ":"), ensure_ascii=False,
    )
    body = json.dumps(
        {"content": content, "session_key": job_id, "wake": True},
        sort_keys=True, separators=(",", ":"), ensure_ascii=False,
    ).encode("utf-8")
    # job_id must identify an immutable input and prompt/schema version.
    idem = "record-" + hashlib.sha256(job_id.encode()).hexdigest()
    headers = {"Authorization": f"Bearer {os.environ['AGS_TOKEN']}"}
    with httpx.Client(
        base_url=base, headers=headers, timeout=35,
        follow_redirects=False, trust_env=False,
    ) as client:
        if receipt is None:
            response = client.post(
                f"/v1/agents/{agent_id}/messages", content=body,
                headers={"Content-Type": "application/json", "Idempotency-Key": idem},
            )
            response.raise_for_status()
            receipt = response.json()
            save_receipt(job_id, receipt)
        deadline = time.monotonic() + deadline_s
        while time.monotonic() < deadline:
            response = client.get(
                f"/v1/agents/{agent_id}/messages/{receipt['message_id']}",
                params={"wait_s": 25, "include_lineage": "true"},
            )
            response.raise_for_status()
            outcome = response.json()
            if outcome["state"] not in {"queued", "running"}:
                return outcome
            time.sleep(0.5)
        raise TimeoutError(f"Still pending; resume polling {receipt['message_id']}")
```

The caller must validate successful data against its own schema, retain parked outcomes, and deduplicate sink writes by job ID. A client timeout does not cancel AGS execution. Transport/HTTP errors from this function must be handled using the saved job record; do not blindly create a new task. The polling deadline is checked between requests and may overrun by one request timeout.

`Idempotency-Key` is supported on agent creation/provisioning, message submission, agent controls, approval decisions, and Furnace completion. Records are retained for approximately **24 hours**. Reusing a key with different request-body bytes returns 409 `IDEMPOTENCY_CONFLICT`. Caller identity and concrete route scope the key. Preserve identical serialized bytes for a replay, use a single submitting worker per job, and maintain your own durable deduplication: this is not an indefinite or distributed exactly-once guarantee. No callback/webhook registration API is present in this AGS route contract.

## 5. Full service integration

Use a permitted private base URL for this section. Changing the token alone cannot make a blocked public path reachable. Keep owning-service credentials inside your backend wrapper and expose your own narrowly authorized application API to teammates.

### Create fully specified agents

Service callers use `POST /v1/agents` with `AgentCreate` rather than `/v1/user-agents`:

```json
{
  "owner": {"service": "pg", "user_id": "<actual owner user ID>", "namespace": "team:pipeline-dev"},
  "type": "custom",
  "display_name": "Record extractor",
  "objective": "Extract the requested fields and finish with a structured result.",
  "model": {"mode": "tier", "tier": "free", "llm_key_ref": "<service-owned key_id>"},
  "toolsets": [{"kind": "builtin", "name": "core"}],
  "knowledge_scopes": ["agent"],
  "run_policy": {
    "mode": "task", "caps_scope": "message", "budget_usd": 0.10,
    "max_ticks": 4, "max_model_requests_per_tick": 4, "tick_wall_clock_s": 120
  },
  "sandbox": {"profile": "none", "network": "none", "egress_hosts": []},
  "approval_policy": {"require_for": ["destructive", "network", "secret"], "auto_approve": []}
}
```

Use `owner.service` matching the configured calling service. Register model keys under that service credential. A namespace starting `hosted:` invokes hosted admission rules; use your own service namespace for service-managed agents.

Supported agent types are `rhm_assistant`, `coder`, `generalist`, `researcher`, `company_head`, `worker`, `custom`. These labels do not create Playground firms, schedules, workers or tool installations automatically.

Run policies support `oneshot`, `task`, `scheduled`, `continuous`, optional cron, per-tick request/wall-clock bounds, budget/tick caps and `lifetime` or `message` cap scope. `task` supports repeated input tasks and returns to idle after a finish; `oneshot` finishes the agent. Scheduled execution requires a valid schedule and an operational scheduler. Hosted user admission only allows `task`/`continuous`, `caps_scope=message`, no cron and grant-bounded limits. A resume can reset cap counters; it should be an explicit allowance decision. Caps are not a hard provider-side billing limit.

### Sessions, transcript, run details and live events

| Endpoint | Use |
|---|---|
| `GET /v1/agents` | Filter by `namespace`, `type`, `status`; paginate with `cursor`, `limit` (1–200, default 50). Returns `AgentPage`. |
| `GET /v1/agents/{agent_id}/sessions` | Session IDs, keys, active/folded/archived status, timestamps and cumulative tokens. |
| `GET /v1/agents/{agent_id}/tape` | Durable transcript events; optional `session_id`, `after_seq`, `tail`, `limit` (1–1000). Returns an array of `TapeEvent`. |
| `GET /v1/agents/{agent_id}/memory` | Structured remembered constraints/facts. Returns an array of `Constraint`. |
| `GET /v1/agents/{agent_id}/runs?session_id=...` | Session runs and model-call accounting; required session ID, `limit` 1–200. Returns an array, with no cursor pagination. |
| `GET /v1/agents/{agent_id}/runs/{run_id}` | Run timing/status, calls, token/cost evidence and recorded trace. |
| `GET /v1/events` | SSE with optional `agent_id`, `namespace`, `after`, `follow`; supports `Last-Event-ID`. |

Use the acceptance's **`event_seq`**, not its inbox `seq`, to start event consumption without missing events caused by the submission:

```bash
curl --no-buffer --fail-with-body \
  "$AGS_BASE/v1/events?agent_id=$AGENT_ID&after=120&follow=true" \
  -H "Authorization: Bearer $AGS_TOKEN" -H 'Accept: text/event-stream'
```

Frames have `event: agent` and JSON `data`. Durable events include `id: <seq>`; resume with `after=<last durable seq>` or `Last-Event-ID`. `follow=false` drains the current batch and closes. Streaming deltas can lack a durable ID and cannot be replayed as a complete result; use message outcomes/tape as the durable source. `: keep-alive` lines are comments. Native browser `EventSource` cannot supply a custom bearer header; use a fetch-stream client or your authenticated backend's stream proxy.

### Files and agent tools

`GET/PUT /v1/agents/{agent_id}/files/{kind}/{name}` reads/writes `identity`, `rules`, `skills`, `data`, and `evals` files. A write sends `{"content":"...","sha256_prev":"<current sha256>"}`; use the returned hash to avoid overwriting concurrent edits. `GET /v1/agents/{agent_id}/files:export` downloads an `application/x-tar` archive. These are agent configuration/knowledge files, not arbitrary host filesystem access.

For structured extraction, a service can write `data/output_schema.json` through the file API. The runner checks required top-level result keys and primitive property types to give the model correction feedback. This check does not fully validate nested values, references or schema unions; your pipeline must still perform strict output validation.

| Capability | How it is enabled |
|---|---|
| Core tools | Builtin `core`: `fetch_sop`, `remember`, `read_observation`, `request_approval`. `finish` is the structured output tool. |
| External tools | An authorized service configures `Toolset(kind="mcp", name=..., url=..., scopes=..., allow_tools=...)` and the matching MCP service/registry. Tool naming can use `prefix`; optional `bearer_ref` points to a separately stored credential. |
| MCP/tool credential custody | Service-only `PUT /v1/tool-secrets/{ref}` with `{"secret":"..."}` and DELETE on the same path. This reference is separate from an LLM `llm_key_ref`. |
| Agent VM workspace | `sandbox.profile="vm"` requires the configured Firecracker backend. The runner adds `vm_exec`, `vm_read_file`, `vm_write_file`, `vm_list_files`; network follows sandbox policy and approval gates. |
| Native project tools | Separately pair/grant/bind/activate a device coder. Device tools support task creation, read/write/check/review within that binding. |
| Hosted orchestration | A separately granted personal assistant gets bounded list/create/configure/delegate/outcome tools; writes use exact human review. |

There is no generic public `invoke any tool` or `install any MCP` endpoint. A named agent type does not grant these capabilities. Shell/Git/web/knowledge integrations require the corresponding configured tool service or device/VM binding.

The runtime also manages context folding, durable remembered constraints, per-agent execution leases/fencing, a write-ahead tool journal, and progress/loop guards. Recorded completed tool calls can be reused during recovery; interrupted non-idempotent effects can be marked unknown for review. Repeated unproductive calls or stalled ticks can park an agent. These mechanisms support recovery but do not replace your application's job ledger or external-system idempotency.

### Models, settings and utility work

`ModelSpec` requires an explicit selection: `{"mode":"tier","tier":"free"}` or `{"mode":"pin","pin":"<model ID>"}`. Tiers are `free`, `cheaper_slow`, `cheap_fast`, `premium`. Include `llm_key_ref` where required. Use the current catalog rather than hardcoding provider model availability. Device inference (`local/device`) and human relay (`human/relay`) require prior owner binding; they cannot be activated simply by passing those pins at creation.

Tier routing can use the catalog fallback chain; an explicit pin selects that model. Service/namespace privacy settings (`any`, `no_keep`, `zero_retention`) affect provider routing. Cloud execution requires an explicitly authorized provider key; the default runtime refuses implicit fallback to a process-wide host key. Host-local `local/resident` availability is separately configured and is not included in an ordinary hosted user grant.

| API family | Capability |
|---|---|
| `/v1/catalog/types`, `/v1/catalog/models?tier=...` | Agent type definitions and model choices. |
| `GET /v1/catalog/snapshot` | Service-only catalog, bands, role pins, fallback orders and local availability; ETag / `If-None-Match` can return 304. |
| `GET/PUT /v1/settings/{scope}` | Service/namespace tier and routing preferences. Scope authorization applies; ordinary user sessions cannot use this generic settings API. |
| `POST /v1/utility/complete` | A small completion for purpose `title`, `summarize` or `extract_facts`; fields `input`, optional `tier`, `max_tokens`, `namespace`. Returns `UtilityResult`. |
| `POST /v1/furnace/complete` | Validator-driven local/cloud utility routing; requires `kind`, `system`, `prompt`, `validator`. Optional token/value/prepass/namespace/cloud settings. Returns `FurnaceResult`. |
| Furnace rates/state/feedback | Inspect routing/rates and send feedback for your service's call. `text=null` in a Furnace result means the caller must apply its heuristic/fallback. |
| Furnace house/benchmarks/reset | Benchmark inspection, bounded administrator sweeps and reset, captured item metadata/deletion. Requires configured house support and the indicated service/admin authority. |
| `/v1/decisions/evaluate`, `/{decision_id}:label`, `/report` | Evaluate configured decision bundles, label results and inspect reports. This is a policy/decision subsystem, not a general-purpose prompt route. |
| `GET /v1/usage/free` | Service free-request counters, optionally by `day` and `namespace`. |

Example private utility request:

```json
{"purpose":"summarize","input":"Text to summarize","tier":"free","max_tokens":256,"namespace":"team:pipeline-dev"}
```

Optional helpers have separate owner preferences: `GET/PUT /v1/users/{user_id}/decision-helper` and `/furnace-helper` use `enabled` and `llm_key_ref`. Enabling cloud utility helpers requires the owning user's explicit consent and key; a general hosted grant is insufficient. Local-helper grants and benchmarks are administrator operations. Availability, policy and credentials can leave a helper disabled even though its route exists.

## 6. Approvals, billing, artifacts and execution backends

### Human review

Private `GET /v1/approvals` accepts `namespace` and `status` (default `pending`). For the owner-facing public flow:

1. `GET /v1/agents/{agent_id}/public-approvals` lists pending approval metadata.
2. `GET /v1/approvals/{approval_id}/public-review` fetches supported concrete action details and `review_digest`.
3. Show the exact action to its owning human.
4. `POST /v1/approvals/{approval_id}/decision` with `{"decision":"approve","note":"Reviewed","review_digest":"<returned digest>"}`. Use `"deny"` to reject.
5. Recheck the original message outcome.

Exact public review is available only for supported action types; a failure to produce a review is not permission to approve without details. Digest-bound public review requires the owning user session. Generic private approvals also support approve/deny and optional notes; the console approval endpoint specifically requires a digest for approval.

External approvals let an owning service mirror its own queue with `POST/GET /v1/approvals/external`, receive allowed decisions, apply its business action, then acknowledge `POST /v1/approvals/{approval_id}:applied`. A mirrored decision is not evidence that the external action ran. Check `relayable` and the owning service's application/confirmation rules.

### Billing holds

`GET /v1/billing/requests` lists the owning human's unresolved physical requests. `POST /v1/billing/requests/{request_id}/verify-receipt` attempts provider receipt reconciliation. Then the owner explicitly clears the appropriate hold with `POST /v1/agents/{agent_id}/billing/resume` or `/v1/users/{user_id}/helper-billing/resume`, and resumes the agent separately when required. These operations do not accept caller-invented provider charges.

When `cost_pending=true` or cost is null, retain `known_cost_usd` as a subtotal and represent the total as unknown. It is not a free call. A per-message cap is a new allowance for every message and is not a daily/account cap; configure provider-side spending controls.

### Sandbox jobs and artifacts

These service-only routes are private under the example policy. Start with `GET /v1/sandbox/info`: check `backend`, `is_security_boundary`, enabled `execution_classes`, `session_support`, `private_artifacts`, and permitted mounts. Untrusted generated code needs the configured isolation boundary; a route's presence does not prove the backend is ready.

`POST /v1/sandbox/jobs` runs a bounded job and returns `SandboxJobOut` (`job_id`, `exit_code`, `timed_out`, `stdout`, `stderr`, backend and timing). A minimal request is:

```json
{
  "namespace": "team:pipeline-dev",
  "execution_class": "untrusted_firm",
  "argv": ["python", "-c", "print(1 + 1)"],
  "limits": {"wall_time_seconds": 30, "memory_mb": 256}
}
```

The configured image must contain the requested executable. Persistent instances use `POST /v1/sandbox/instances`, `POST /instances/{instance_id}/exec`, `GET /instances/{instance_id}/files`, and DELETE to stop. Interactive sessions use POST `/v1/sandbox/sessions`, POST `/{session_id}/stdin` with `data_b64`, GET `/{session_id}/output?after=...&wait_s=...`, and DELETE to close. Output chunks carry `n`, `stream`, `data_b64`; advance `after` to the last chunk number. `/v1/sandbox:stop` stops namespace execution.

Artifact upload is **JSON, not multipart**: POST `/v1/sandbox/artifacts` with `namespace`, `kind` (`file`/`directory`), SHA-256 and `data_b64`. The artifact validator applies format, hash and archive limits. Download is GET `/v1/sandbox/artifacts/{artifact_id}?namespace=...` and returns `application/x-tar`. Mount immutable artifact references using `SandboxMountIn.artifact_ref`; raw host paths are restricted by host policy. DELETE an artifact or POST `/v1/sandbox/artifacts:purge` for an authorized namespace cleanup. `GET /v1/agents/{agent_id}/public-artifacts` lists owner-workspace artifact metadata; it is not the private download API.

### Paired devices and manual relay

Device control separates the human owner from the outbound device process:

- Human session: pair with `POST /v1/devices`; grant `/projects` or separately `/inference`; bind an agent with PUT `/device-coding` or `/device-inference`; explicitly activate coding with POST `/device-coding/activate`. A binding alone does not change tools/model pins.
- Human session: enqueue typed `/v1/devices/{device}/projects/{project}/actions`, cancel an action, revoke a project or revoke the device.
- Device bearer: use `/v1/device-bridge/{device}/poll`, `/reconcile`, `/actions/{action_id}/authority`, and `/actions/{action_id}/receipt`. These routes require the paired `dev_...` credential rather than a session token.

Typed actions are `create_task`, `read`, `write`, `check`, `review`, `integrate`, `inference`, each with an exact allowed argument set. Device project access, code execution, inference and integration have distinct authorization. Use the native device client/protocol implementation rather than treating this as an arbitrary remote shell. Reconciliation handles uncertain execution; do not automatically replay a dispatched action.

Manual relay uses PUT `/v1/agents/{agent_id}/relay-account`, GET `/v1/relay/tasks`, and POST task `/answer`, `/resume`, `/cancel`. Answer bodies contain `text`, `account`, `own_account_attested`; an answer does not auto-resume work. This is a human queue, not automatic provider website integration.

## 7. Build a custom Playground

Choose the smallest product surface you need:

| Product feature | AGS supports | Your wrapper or another service owns |
|---|---|---|
| Agent registry and configuration | Agents, models, policies, instruction files, owner monitors | Team membership/roles and which backend agents each teammate can access. |
| Prompt-to-result pipelines | Inbox receipts, message outcomes, sessions, runs, structured finish output | Input ingestion, durable job IDs, retries, output schema checks, sink writes and business deadlines. |
| Chat UI | Messages/tape and the higher-level console conversation APIs | Sign-in/session custody, UI, transcript presentation and any stream proxy. |
| Delegated tasks | Separately granted personal assistant/orchestration and durable delegation records | Your independent workflow/DAG scheduler and tenant controls if you do not use that assistant flow. |
| Review and costs | Approval queues, exact-action review, call accounting, unknown-cost holds | Human review UX, provider budget settings and pipeline accounting/export. |
| Code execution | Configured sandbox jobs/instances and paired native device tools | Runtime images, authorized input/artifact transport and infrastructure operation. |
| Playground firms | AGS can execute `company_head`/`worker` agents | Playground owns firm charters, hiring, work queues/workplans, firm grants/quotas, scorecards/evaluation, promotion and firm lifecycle. |
| Tools and integrations | Configured MCP, core, VM, device and orchestration toolsets | Tool-service deployment, connector credentials, application-specific endpoints and permissions. |
| Executable Stacks and releases | Some console capability reporting and execution relationships | Protected Stack host/release-control services; this is not a generic AGS deployment API. |

For a stripped-down agent dashboard, a useful first release is: login, list own agents, create/configure, submit messages, poll outcomes, show approvals/spend, pause/resume/cancel, and persist pipeline jobs. It can avoid the full firm engine. If your product needs Playground's firm semantics, integrate with or rebuild that separate layer; changing `type` to `company_head` will not supply it.

### Higher-level AGS console API

The source includes owner-scoped `/v1/console/...` endpoints that can save UI work. **They are private on the AGS hostname in the example ingress**, even though the app hostname has its own gateway policy. Do not assume replacing `/api/v1` with `/v1` is a supported proxy arrangement; use the existing gateway contract or implement an authorized wrapper.

| Console feature | Routes |
|---|---|
| Capability/model discovery | GET `/v1/console/capabilities`, `/models` |
| Personal assistant | POST `/v1/console/assistant` with `model` and `run_policy` |
| Agent relationships/configuration | GET `/v1/console/agents`; PUT `/agents/{aid}/configuration`; POST `/agents/{aid}/control/{action}` (`pause`/`resume`) |
| Instructions and activity | GET `/agents/{aid}/activity`; GET/PUT `/agents/{aid}/instructions` |
| Conversations | GET/POST `/v1/console/conversations`; GET `/conversations/{cid}`; POST `/conversations/{cid}/messages` and `/stop` |
| Conversation review | GET `/conversations/{cid}/approvals`; POST `/v1/console/approvals/{approval_id}` |
| Coding/delegations | GET `/v1/console/coding`, `/coding/{did}`; POST `/coding/{did}/messages`; POST `/delegations/{did}/cancel` |

All abbreviated paths in this table retain the `/v1/console` prefix. First discover capabilities and provision the personal assistant under the required hosted-orchestration grant. Create a conversation with `{"request_id":"conversation-001","title":"Pipeline work"}`, then submit `{"request_id":"submission-001","content":"Your task"}` to its `/messages` endpoint. These `request_id` fields implement their own content-checked deduplication; use stable IDs and unchanged bodies for retries. Read GET `/conversations/{cid}` for message outcomes, summaries and delegation relationships. There is no standalone REST `POST /delegations` route in this console contract; the assistant's bounded orchestration tools create those links.

Configuration uses a JSON `version` and required `display_name`/`objective`, with optional `model_pin` or `model_tier`. Instruction writes use `kind`, `name`, `content`, optional `sha256_prev`. The capability response currently declares scheduling and tool installation unavailable, and no hosted Stack listing. Code review/integration remains a native-client workflow. Stopping a conversation does not automatically cancel all its delegated tasks.

### Suggested wrapper structure

Keep a backend service between teammates and AGS for a shared deployment. It should hold its authorized AGS credential, map signed-in users to allowed jobs/agents, store submission receipts, limit concurrency, validate results, and expose the subset your UI needs. A worker handles ingest/submit/poll; a review screen handles parked actions. Store pipeline records and artifacts in your chosen data store. AGS supplies agent execution and evidence; your application supplies the business workflow.

## 8. Errors and troubleshooting

Application errors generally use this envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "request validation failed",
    "retryable": false,
    "details": {}
  }
}
```

Middleware, proxy errors and some route-specific errors can have another body. Check HTTP status and content type before parsing JSON.

| Status / condition | Meaning and next action |
|---|---|
| Cloudflare 530 / 1033 | The health probe did not reach healthy AGS service handling. Have the host operator inspect the tunnel/origin before debugging tokens. |
| 401 `UNAUTHORIZED` | Missing, invalid, expired or revoked caller token, or failed issuer introspection. Authenticate again/check the configured issuer. |
| 403 `FORBIDDEN` | Wrong caller kind/ownership, inactive grant, missing key or disallowed capability. A new token does not itself grant execution. |
| 404 | Ingress may block the path; otherwise the resource may be absent or hidden by owner checks. Confirm base URL and allowed path first. |
| 409 | State/pin/file/idempotency conflict or disabled feature. Inspect `error.code`; resolve it before retrying. |
| 412 `VERSION_CONFLICT` | Fetch the current version/hash and reconcile the edit. |
| 422 | Invalid request fields/model selection. Most models reject unknown fields; use exact request schemas. |
| 428 `IF_MATCH_REQUIRED` | PATCH is missing a usable current agent version. |
| 501 / 503 | Unsupported or unavailable execution backend/feature. Inspect service readiness and the error code. |
| 502 `SANDBOX_STATE_UNKNOWN` or unknown billing | Side effects/cost can be uncertain. Reconcile rather than assume no work occurred. |
| Client timeout/disconnect | The task may still run. Poll its saved message; do not blindly resubmit. |

Retry safe reads with bounded exponential backoff and jitter on transient transport/service failures. Retry supported writes only with their original idempotency key and exact bytes within the replay window. Escalate ambiguous external side effects and unresolved costs for review.

For browser clients, check the deployed CORS policy. This AGS app factory does not itself install CORS middleware; cross-origin browser requests are not guaranteed to work. A same-origin application backend/proxy also provides credential custody and authorization.

## 9. Contract files and maintenance

Send teammates this guide together with:

- [AGENT_API_ROUTES.md](AGENT_API_ROUTES.md) — every one of the 128 application operations, public-policy classification, caller type, path/query/header parameters and request model field index.
- [ags.openapi.json](ags.openapi.json) — machine-readable route/schema snapshot. Authentication is enforced in dependencies even where OpenAPI marks the `Authorization` header optional. Many handlers build JSON responses manually, so response schemas are not fully bound to operations; the public response models are included in `components.schemas`. Generated SDKs will need typed response/auth wrappers.

Regenerate both companion files from the repository root with:

```bash
python tools/export_ags_api_reference.py
```

For a single offline HTML document containing the guide, complete route reference and downloadable contract, install the optional `markdown` package and run `python tools/export_ags_api_reference.py --html`.

The exporter only registers routes against a minimal placeholder service; it does not run application lifespan, migrate a database, load credentials or call models. It adds the streamed artifact upload's in-handler request model and public response model definitions to the export, plus clearly labeled caller/ingress hints. The deployed API itself is unchanged.

Implementation references: [app and core routes](../ags/api/app.py), [request/response models](../ags/api/schemas.py), [authentication](../ags/api/auth.py), [Python clients](../ags/client.py), [console routes](../ags/api/routes_console.py), [hosted admission](../ags/core/hosted_access.py), [public ingress template](../deployment/cloudflared.v2.example.yml), and [identity routes](../identity_service/api.py). Existing typed `AgsClient` and `AsyncAgsClient` are available when building inside this repository; `httpx` is sufficient for an independent client.
