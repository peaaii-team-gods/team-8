# Public API used by this pilot

The current contract is workflow/run based. This repository's former AGS
agent/message/provider-key guide, route inventory, HTML export and OpenAPI snapshot
described a retired service and have been removed. The pilot uses only the
following user-facing operations, never private service credentials.

| Caller | Request | Meaning |
|---|---|---|
| Identity client | `POST /v1/auth/invite/redeem` (first enrollment only) | `{invite_token, username, password}` → 201 token response + refresh cookie. |
| Identity client | `POST /v1/auth/password/login` | `{username, password}` → access token, CSRF token, issuer/user, lifetime; refresh cookie stays in memory. |
| Identity client | `POST /v1/auth/refresh` | Current refresh cookie + `X-CSRF-Token` → rotated cookie/access/CSRF. |
| Identity client | `POST /v1/auth/logout` | Refresh cookie + current CSRF; attempts family revocation on exit. |
| API client | `GET /v1/capabilities` | Discover advertised models, execution availability and run-key retention. |
| API client | `POST /v1/workflows/validate` | `{workflow: {...}}`; require structural/supported/authorized/executable all `ok`. |
| API client | `POST /v1/workflows` | Same wrapper → immutable workflow ID. No safe lost-receipt replay. |
| API client | `POST /v1/runs` | `{workflow_id}` with stable `Idempotency-Key` → accepted run receipt. |
| API client | `GET /v1/runs/{run_id}` | Poll finite state; `succeeded` with `agent_reported` does not verify business output. |
| API client | `GET /v1/runs/{run_id}/outputs` | One complete text reply; pilot parses/validates it independently. |
| API client | `GET /v1/runs?workspace_id=...` | Reconcile a lost run receipt during cancellation. |
| API client | `POST /v1/runs/{run_id}/cancel` | Cancel only this journal's run, then observe terminal state. |

All Identity requests carry the configured trusted Origin. The API receives only
`Authorization: Bearer <user access token>`; it receives no Identity cookie.
Redirect following and ambient proxy environment settings are disabled.

Every experiment creates a Builder workflow/run, then one Maintainer workflow/run
only after local baseline execution and drift detection. The two roles are logical
task specifications, not persistent agent resources. Workflows have `workflow.v1`,
bounded `inputs: dict[str,str]`, no tools, no project/task binding, explicit model
selection and loop limits. They cannot submit URLs, service scopes or provider keys.

Read-only event inspection is also available at
`GET /v1/runs/{run_id}/events?after_seq=N`; advance the returned `next_after_seq`.
The pilot keeps backend IDs in its receipt so a teammate can inspect that durable
record. The client does not treat model text as an execution log or an acceptance
verdict. Its execution receipts come from local deterministic code.

API consumer documentation and machine schema are published by the operator at
the API origin. Availability is deployment-specific: a source route or advertised
model alone does not prove a live inference provider. This file is an integration
summary, not a fork of the complete service contract.
