<!-- Generated route inventory: consult the integration guide for workflows and cautions. -->
# Agent service route reference

Generated from the local FastAPI route registry with `python tools/export_ags_api_reference.py`.
No backend service was started. Read [the integration guide](AGENT_API_GUIDE.md) first.

**Public policy** means the path matches `deployment/cloudflared.v2.example.yml`, a review-only template,
not that the running tunnel or installed revision exposes it. Authentication and feature grants still apply.
The template filters paths, not HTTP methods. `public-` routes still require authentication.

All exact request schemas, constraints, defaults and enums are in [ags.openapi.json](ags.openapi.json).
Authorization is enforced by application code even where OpenAPI describes that header as optional.
Many routes return manually built JSON, so OpenAPI response schemas are incomplete; see the guide for core response shapes.
The raw artifact upload request model is added from its in-handler validator and marked in the exported schema.
Public response models from `ags.api.schemas` are included in the model catalog even when no response-model binding is declared.

## Every operation

| Method and path | Public policy | Caller | Parameters and JSON body | Source |
|---|---|---|---|---|
| `GET /healthz` | Allowed | Unauthenticated | No query parameters or JSON body | [ags/api/app.py:195](../ags/api/app.py#L195) |
| `GET /readyz` | Private | Unauthenticated | No query parameters or JSON body | [ags/api/app.py:199](../ags/api/app.py#L199) |
| `GET /.well-known/jwks.json` | Private | Unauthenticated | No query parameters or JSON body | [ags/api/app.py:209](../ags/api/app.py#L209) |
| `POST /v1/access/request` | Allowed | User session; active grant for provisioning | No query parameters or JSON body | [ags/api/app.py:215](../ags/api/app.py#L215) |
| `GET /v1/access` | Allowed | User session; active grant for provisioning | No query parameters or JSON body | [ags/api/app.py:221](../ags/api/app.py#L221) |
| `GET /v1/admin/access` | Private | Service admin or issuer human admin | No query parameters or JSON body | [ags/api/app.py:241](../ags/api/app.py#L241) |
| `PUT /v1/admin/access/{user_id}` | Private | Service admin or issuer human admin | path `user_id`: string required; body: **HostedAccessGrant** | [ags/api/app.py:248](../ags/api/app.py#L248) |
| `POST /v1/user-agents` | Allowed | User session; active grant for provisioning | header `Idempotency-Key`: string or null; body: **HostedAgentCreate** | [ags/api/app.py:256](../ags/api/app.py#L256) |
| `POST /v1/agents` | Private | Owning service token | header `Idempotency-Key`: string or null; body: **AgentCreate** | [ags/api/app.py:309](../ags/api/app.py#L309) |
| `GET /v1/agents` | Private | User or service bearer; ownership checks apply | query `namespace`: string or null; query `type`: string or null; query `status`: string or null; query `cursor`: string or null; query `limit`: integer = 50 | [ags/api/app.py:326](../ags/api/app.py#L326) |
| `GET /v1/agents/{agent_id}` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:342](../ags/api/app.py#L342) |
| `PATCH /v1/agents/{agent_id}` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; header `If-Match`: string or null; body: **AgentPatch** | [ags/api/app.py:346](../ags/api/app.py#L346) |
| `POST /v1/agents/{agent_id}:pause` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; header `Idempotency-Key`: string or null; body (optional): **AgentControl or null** | [ags/api/app.py:382](../ags/api/app.py#L382) |
| `POST /v1/agents/{agent_id}:resume` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; header `Idempotency-Key`: string or null; body (optional): **AgentControl or null** | [ags/api/app.py:382](../ags/api/app.py#L382) |
| `POST /v1/agents/{agent_id}:cancel` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; header `Idempotency-Key`: string or null; body (optional): **AgentControl or null** | [ags/api/app.py:382](../ags/api/app.py#L382) |
| `POST /v1/agents/{agent_id}:wake` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; header `Idempotency-Key`: string or null; body (optional): **AgentControl or null** | [ags/api/app.py:382](../ags/api/app.py#L382) |
| `DELETE /v1/agents/{agent_id}` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:402](../ags/api/app.py#L402) |
| `POST /v1/agents/{agent_id}/messages` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; header `Idempotency-Key`: string or null; body: **MessageIn** | [ags/api/app.py:409](../ags/api/app.py#L409) |
| `GET /v1/agents/{agent_id}/files:export` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:427](../ags/api/app.py#L427) |
| `GET /v1/agents/{agent_id}/files/{kind}/{name}` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required; path `kind`: identity/rules/skills/data/evals required; path `name`: string required | [ags/api/app.py:432](../ags/api/app.py#L432) |
| `PUT /v1/agents/{agent_id}/files/{kind}/{name}` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required; path `kind`: identity/rules/skills/data/evals required; path `name`: string required; body: **AgentFilePut** | [ags/api/app.py:437](../ags/api/app.py#L437) |
| `GET /v1/agents/{agent_id}/sessions` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:444](../ags/api/app.py#L444) |
| `GET /v1/agents/{agent_id}/tape` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required; query `session_id`: string or null; query `after_seq`: integer = 0; query `tail`: boolean = false; query `limit`: integer = 200 | [ags/api/app.py:459](../ags/api/app.py#L459) |
| `GET /v1/agents/{agent_id}/memory` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:469](../ags/api/app.py#L469) |
| `GET /v1/agents/{agent_id}/runs/{run_id}` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required; path `run_id`: string required | [ags/api/app.py:549](../ags/api/app.py#L549) |
| `GET /v1/agents/{agent_id}/runs` | Private | User or service bearer; ownership checks apply | path `agent_id`: string required; query `session_id`: string required; query `limit`: integer = 50 | [ags/api/app.py:560](../ags/api/app.py#L560) |
| `GET /v1/events` | Private | User or service bearer; ownership checks apply | query `namespace`: string or null; query `agent_id`: string or null; query `follow`: boolean = true; query `after`: integer or null; header `Last-Event-ID`: string or null | [ags/api/app.py:576](../ags/api/app.py#L576) |
| `GET /v1/approvals` | Private | User or service bearer; ownership checks apply | query `namespace`: string or null; query `status`: string or null = "pending" | [ags/api/app.py:645](../ags/api/app.py#L645) |
| `GET /v1/approvals/{approval_id}/public-review` | Allowed | User or service bearer; ownership checks apply | path `approval_id`: string required | [ags/api/app.py:673](../ags/api/app.py#L673) |
| `POST /v1/approvals/{approval_id}/decision` | Allowed | User or service bearer; ownership checks apply | path `approval_id`: string required; header `Idempotency-Key`: string or null; body: **ApprovalDecision** | [ags/api/app.py:687](../ags/api/app.py#L687) |
| `GET /v1/agents/{agent_id}/public-approvals` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:720](../ags/api/app.py#L720) |
| `GET /v1/agents/{agent_id}/public-artifacts` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:749](../ags/api/app.py#L749) |
| `GET /v1/agents/{agent_id}/public-monitor` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required | [ags/api/app.py:770](../ags/api/app.py#L770) |
| `GET /v1/public/monitors` | Allowed | User or service bearer; ownership checks apply | query `namespace`: string or null; query `cursor`: string or null | [ags/api/app.py:776](../ags/api/app.py#L776) |
| `POST /v1/keys` | Allowed | User or service bearer; ownership checks apply | body: **KeyCreate** | [ags/api/app.py:796](../ags/api/app.py#L796) |
| `GET /v1/keys` | Allowed | User or service bearer; ownership checks apply | No query parameters or JSON body | [ags/api/app.py:800](../ags/api/app.py#L800) |
| `PUT /v1/tool-secrets/{ref}` | Private | Service token; scope checks apply | path `ref`: string required; body: **ToolSecretPut** | [ags/api/app.py:812](../ags/api/app.py#L812) |
| `DELETE /v1/tool-secrets/{ref}` | Private | Service token; scope checks apply | path `ref`: string required | [ags/api/app.py:820](../ags/api/app.py#L820) |
| `DELETE /v1/keys/{key_id}` | Allowed | User or service bearer; ownership checks apply | path `key_id`: string required | [ags/api/app.py:826](../ags/api/app.py#L826) |
| `GET /v1/settings/{scope}` | Private | Service token; scope checks apply | path `scope`: string required | [ags/api/app.py:843](../ags/api/app.py#L843) |
| `PUT /v1/settings/{scope}` | Private | Service token; scope checks apply | path `scope`: string required; body: **TierSettings** | [ags/api/app.py:850](../ags/api/app.py#L850) |
| `GET /v1/catalog/types` | Private | User or service bearer; ownership checks apply | No query parameters or JSON body | [ags/api/app.py:860](../ags/api/app.py#L860) |
| `GET /v1/catalog/models` | Private | User or service bearer; ownership checks apply | query `tier`: free/cheaper_slow/cheap_fast/premium = "free" | [ags/api/app.py:864](../ags/api/app.py#L864) |
| `GET /v1/catalog/snapshot` | Private | Service token | header `If-None-Match`: string or null | [ags/api/routes_catalog.py:31](../ags/api/routes_catalog.py#L31) |
| `GET /v1/usage/free` | Private | Service token | query `day`: string or null; query `namespace`: string or null | [ags/api/routes_usage.py:25](../ags/api/routes_usage.py#L25) |
| `GET /v1/agents/{agent_id}/messages/{message_id}` | Allowed | User or service bearer; ownership checks apply | path `agent_id`: string required; path `message_id`: string required; query `wait_s`: number = 0.0; query `include_lineage`: boolean = false | [ags/api/routes_messages.py:32](../ags/api/routes_messages.py#L32) |
| `POST /v1/sandbox/artifacts` | Private | Service token; scope checks apply | body: **SandboxArtifactIn** | [ags/api/routes_sandbox.py:35](../ags/api/routes_sandbox.py#L35) |
| `DELETE /v1/sandbox/artifacts/{artifact_id}` | Private | Service token; scope checks apply | path `artifact_id`: string required | [ags/api/routes_sandbox.py:55](../ags/api/routes_sandbox.py#L55) |
| `GET /v1/sandbox/artifacts/{artifact_id}` | Private | Service token; scope checks apply | path `artifact_id`: string required; query `namespace`: string required | [ags/api/routes_sandbox.py:60](../ags/api/routes_sandbox.py#L60) |
| `POST /v1/sandbox/artifacts:purge` | Private | Service token; scope checks apply | body: **SandboxArtifactPurge** | [ags/api/routes_sandbox.py:71](../ags/api/routes_sandbox.py#L71) |
| `GET /v1/sandbox/info` | Private | Service token; scope checks apply | No query parameters or JSON body | [ags/api/routes_sandbox.py:76](../ags/api/routes_sandbox.py#L76) |
| `POST /v1/sandbox/jobs` | Private | Service token; scope checks apply | body: **SandboxJobIn** | [ags/api/routes_sandbox.py:81](../ags/api/routes_sandbox.py#L81) |
| `POST /v1/sandbox/instances` | Private | Service token; scope checks apply | body: **SandboxInstanceCreate** | [ags/api/routes_sandbox.py:87](../ags/api/routes_sandbox.py#L87) |
| `POST /v1/sandbox/instances/{instance_id}/exec` | Private | Service token; scope checks apply | path `instance_id`: string required; body: **SandboxExecIn** | [ags/api/routes_sandbox.py:94](../ags/api/routes_sandbox.py#L94) |
| `DELETE /v1/sandbox/instances/{instance_id}` | Private | Service token; scope checks apply | path `instance_id`: string required | [ags/api/routes_sandbox.py:100](../ags/api/routes_sandbox.py#L100) |
| `GET /v1/sandbox/instances/{instance_id}/files` | Private | Service token; scope checks apply | path `instance_id`: string required | [ags/api/routes_sandbox.py:106](../ags/api/routes_sandbox.py#L106) |
| `POST /v1/sandbox:stop` | Private | Service token; scope checks apply | body: **SandboxStopIn** | [ags/api/routes_sandbox.py:111](../ags/api/routes_sandbox.py#L111) |
| `POST /v1/sandbox/sessions` | Private | Service token; scope checks apply | body: **SandboxSessionIn** | [ags/api/routes_sandbox.py:117](../ags/api/routes_sandbox.py#L117) |
| `POST /v1/sandbox/sessions/{session_id}/stdin` | Private | Service token; scope checks apply | path `session_id`: string required; body: **SandboxStdinIn** | [ags/api/routes_sandbox.py:123](../ags/api/routes_sandbox.py#L123) |
| `GET /v1/sandbox/sessions/{session_id}/output` | Private | Service token; scope checks apply | path `session_id`: string required; query `after`: integer = -1; query `wait_s`: number = 0.0 | [ags/api/routes_sandbox.py:129](../ags/api/routes_sandbox.py#L129) |
| `DELETE /v1/sandbox/sessions/{session_id}` | Private | Service token; scope checks apply | path `session_id`: string required | [ags/api/routes_sandbox.py:139](../ags/api/routes_sandbox.py#L139) |
| `POST /v1/approvals/external` | Private | Service token | body: **ExternalApprovalIn** | [ags/api/routes_approvals_ext.py:30](../ags/api/routes_approvals_ext.py#L30) |
| `GET /v1/approvals/external` | Private | Service token | query `status`: string or null; query `applied`: boolean or null; query `kind`: string or null | [ags/api/routes_approvals_ext.py:35](../ags/api/routes_approvals_ext.py#L35) |
| `POST /v1/approvals/{approval_id}:applied` | Private | Calling service token | path `approval_id`: string required; body: **ExternalApplied** | [ags/api/routes_approvals_ext.py:42](../ags/api/routes_approvals_ext.py#L42) |
| `GET /v1/users/{user_id}/decision-helper` | Allowed | Owner, owning service or service admin | path `user_id`: string required | [ags/api/routes_helpers.py:52](../ags/api/routes_helpers.py#L52) |
| `PUT /v1/users/{user_id}/decision-helper` | Allowed | Owner, owning service or service admin | path `user_id`: string required; body: **HelperPreference** | [ags/api/routes_helpers.py:63](../ags/api/routes_helpers.py#L63) |
| `GET /v1/users/{user_id}/helper-billing` | Allowed | Owner, owning service or service admin | path `user_id`: string required | [ags/api/routes_helpers.py:75](../ags/api/routes_helpers.py#L75) |
| `GET /v1/users/{user_id}/furnace-helper` | Allowed | Owner, owning service or service admin | path `user_id`: string required | [ags/api/routes_helpers.py:108](../ags/api/routes_helpers.py#L108) |
| `PUT /v1/users/{user_id}/furnace-helper` | Allowed | Owning user session | path `user_id`: string required; body: **HelperPreference** | [ags/api/routes_helpers.py:119](../ags/api/routes_helpers.py#L119) |
| `GET /v1/admin/local-helper` | Private | Service admin | No query parameters or JSON body | [ags/api/routes_helpers.py:129](../ags/api/routes_helpers.py#L129) |
| `PUT /v1/admin/local-helper/grants/{user_id}` | Private | Service admin | path `user_id`: string required; body: **LocalGrant** | [ags/api/routes_helpers.py:139](../ags/api/routes_helpers.py#L139) |
| `POST /v1/admin/local-helper/benchmark` | Private | Service admin | body: **LocalProbe** | [ags/api/routes_helpers.py:150](../ags/api/routes_helpers.py#L150) |
| `PUT /v1/agents/{agent_id}/relay-account` | Allowed | Owning user session | path `agent_id`: string required; body: **Binding** | [ags/api/routes_relay.py:30](../ags/api/routes_relay.py#L30) |
| `GET /v1/relay/tasks` | Allowed | Owning user session | No query parameters or JSON body | [ags/api/routes_relay.py:34](../ags/api/routes_relay.py#L34) |
| `POST /v1/relay/tasks/{task_id}/answer` | Allowed | Owning user session | path `task_id`: string required; body: **Answer** | [ags/api/routes_relay.py:38](../ags/api/routes_relay.py#L38) |
| `POST /v1/relay/tasks/{task_id}/resume` | Allowed | Owning user session | path `task_id`: string required | [ags/api/routes_relay.py:49](../ags/api/routes_relay.py#L49) |
| `POST /v1/relay/tasks/{task_id}/cancel` | Allowed | Owning user session | path `task_id`: string required | [ags/api/routes_relay.py:54](../ags/api/routes_relay.py#L54) |
| `POST /v1/devices` | Allowed | Owning user session | No query parameters or JSON body | [ags/api/routes_devices.py:124](../ags/api/routes_devices.py#L124) |
| `POST /v1/devices/{device}/projects` | Allowed | Owning user session | path `device`: string required; body: **ProjectGrant** | [ags/api/routes_devices.py:128](../ags/api/routes_devices.py#L128) |
| `POST /v1/devices/{device}/inference` | Allowed | Owning user session | path `device`: string required; body: **ProjectGrant** | [ags/api/routes_devices.py:134](../ags/api/routes_devices.py#L134) |
| `POST /v1/agents/{agent_id}/device-coding/activate` | Allowed | Owning user session | path `agent_id`: string required; body: **CodingActivation** | [ags/api/routes_devices.py:140](../ags/api/routes_devices.py#L140) |
| `PUT /v1/agents/{agent_id}/device-coding` | Allowed | Owning user session | path `agent_id`: string required; body: **CodingBinding** | [ags/api/routes_devices.py:144](../ags/api/routes_devices.py#L144) |
| `PUT /v1/agents/{agent_id}/device-inference` | Allowed | Owning user session | path `agent_id`: string required; body: **InferenceBinding** | [ags/api/routes_devices.py:149](../ags/api/routes_devices.py#L149) |
| `DELETE /v1/devices/{device}` | Allowed | Owning user session | path `device`: string required | [ags/api/routes_devices.py:154](../ags/api/routes_devices.py#L154) |
| `DELETE /v1/devices/{device}/projects/{project}` | Allowed | Owning user session | path `device`: string required; path `project`: string required | [ags/api/routes_devices.py:159](../ags/api/routes_devices.py#L159) |
| `POST /v1/devices/{device}/projects/{project}/actions` | Allowed | Owning user session | path `device`: string required; path `project`: string required; body: **Action** | [ags/api/routes_devices.py:164](../ags/api/routes_devices.py#L164) |
| `DELETE /v1/devices/{device}/actions/{action_id}` | Allowed | Owning user session | path `device`: string required; path `action_id`: string required | [ags/api/routes_devices.py:168](../ags/api/routes_devices.py#L168) |
| `GET /v1/device-bridge/{device}/actions/{action_id}/authority` | Allowed | Paired device bearer (dev_...) | path `device`: string required; path `action_id`: string required | [ags/api/routes_devices.py:173](../ags/api/routes_devices.py#L173) |
| `POST /v1/device-bridge/{device}/poll` | Allowed | Paired device bearer (dev_...) | path `device`: string required | [ags/api/routes_devices.py:179](../ags/api/routes_devices.py#L179) |
| `GET /v1/device-bridge/{device}/reconcile` | Allowed | Paired device bearer (dev_...) | path `device`: string required | [ags/api/routes_devices.py:183](../ags/api/routes_devices.py#L183) |
| `POST /v1/device-bridge/{device}/actions/{action_id}/receipt` | Allowed | Paired device bearer (dev_...) | path `device`: string required; path `action_id`: string required; body: **Receipt** | [ags/api/routes_devices.py:187](../ags/api/routes_devices.py#L187) |
| `GET /v1/billing/requests` | Allowed | Owning user session | No query parameters or JSON body | [ags/api/routes_billing_review.py:16](../ags/api/routes_billing_review.py#L16) |
| `POST /v1/billing/requests/{request_id}/verify-receipt` | Allowed | Owning user session | path `request_id`: string required | [ags/api/routes_billing_review.py:35](../ags/api/routes_billing_review.py#L35) |
| `POST /v1/users/{user_id}/helper-billing/resume` | Allowed | Owning user session | path `user_id`: string required | [ags/api/routes_billing_review.py:108](../ags/api/routes_billing_review.py#L108) |
| `POST /v1/agents/{agent_id}/billing/resume` | Allowed | Owning user session | path `agent_id`: string required | [ags/api/routes_billing_review.py:115](../ags/api/routes_billing_review.py#L115) |
| `POST /v1/furnace/complete` | Private | Service token | header `Idempotency-Key`: string or null; body: **FurnaceComplete** | [ags/api/app.py:895](../ags/api/app.py#L895) |
| `GET /v1/furnace/rates` | Private | User or service bearer; ownership checks apply | query `kind`: title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract or null | [ags/api/app.py:928](../ags/api/app.py#L928) |
| `GET /v1/furnace/state` | Private | User or service bearer; ownership checks apply | query `kind`: title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract or null | [ags/api/app.py:932](../ags/api/app.py#L932) |
| `POST /v1/furnace/calls/{call_id}:feedback` | Private | Calling service token | path `call_id`: string required; body: **FurnaceFeedback** | [ags/api/app.py:936](../ags/api/app.py#L936) |
| `POST /v1/furnace:reset` | Private | Service admin | No query parameters or JSON body | [ags/api/app.py:948](../ags/api/app.py#L948) |
| `GET /v1/furnace/benchmarks` | Private | Service token | query `kind`: title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract or null | [ags/api/routes_house.py:81](../ags/api/routes_house.py#L81) |
| `POST /v1/furnace/house:sweep` | Private | Service admin | body: **HouseSweepRequest** | [ags/api/routes_house.py:87](../ags/api/routes_house.py#L87) |
| `GET /v1/furnace/house/items` | Private | Service admin | query `kind`: title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract or null | [ags/api/routes_house.py:119](../ags/api/routes_house.py#L119) |
| `DELETE /v1/furnace/house/items` | Private | Service token | query `namespace`: string required | [ags/api/routes_house.py:140](../ags/api/routes_house.py#L140) |
| `POST /v1/decisions/evaluate` | Private | Service token; scope checks apply | body: **DecisionEvaluate** | [ags/api/app.py:963](../ags/api/app.py#L963) |
| `POST /v1/decisions/{decision_id}:label` | Private | Service token; scope checks apply | path `decision_id`: string required; body: **DecisionLabel** | [ags/api/app.py:1012](../ags/api/app.py#L1012) |
| `GET /v1/decisions/report` | Private | Service token; scope checks apply | query `days`: integer = 14 | [ags/api/app.py:1024](../ags/api/app.py#L1024) |
| `POST /v1/utility/complete` | Private | User or service bearer; ownership checks apply | body: **UtilityComplete** | [ags/api/app.py:1031](../ags/api/app.py#L1031) |
| `GET /v1/console/capabilities` | Private | Owning user session | No query parameters or JSON body | [ags/api/routes_console.py:85](../ags/api/routes_console.py#L85) |
| `GET /v1/console/models` | Private | Owning user session | No query parameters or JSON body | [ags/api/routes_console.py:104](../ags/api/routes_console.py#L104) |
| `POST /v1/console/assistant` | Private | Owning user session | body: **AssistantInput** | [ags/api/routes_console.py:111](../ags/api/routes_console.py#L111) |
| `GET /v1/console/agents` | Private | Owning user session | No query parameters or JSON body | [ags/api/routes_console.py:162](../ags/api/routes_console.py#L162) |
| `PUT /v1/console/agents/{aid}/configuration` | Private | Owning user session | path `aid`: string required; body: **Configuration** | [ags/api/routes_console.py:181](../ags/api/routes_console.py#L181) |
| `POST /v1/console/agents/{aid}/control/{action}` | Private | Owning user session | path `aid`: string required; path `action`: pause/resume required | [ags/api/routes_console.py:204](../ags/api/routes_console.py#L204) |
| `GET /v1/console/agents/{aid}/activity` | Private | Owning user session | path `aid`: string required | [ags/api/routes_console.py:214](../ags/api/routes_console.py#L214) |
| `GET /v1/console/agents/{aid}/instructions` | Private | Owning user session | path `aid`: string required | [ags/api/routes_console.py:247](../ags/api/routes_console.py#L247) |
| `PUT /v1/console/agents/{aid}/instructions` | Private | Owning user session | path `aid`: string required; body: **Instruction** | [ags/api/routes_console.py:260](../ags/api/routes_console.py#L260) |
| `GET /v1/console/conversations` | Private | Owning user session | No query parameters or JSON body | [ags/api/routes_console.py:273](../ags/api/routes_console.py#L273) |
| `POST /v1/console/conversations` | Private | Owning user session | body: **ConversationCreate** | [ags/api/routes_console.py:286](../ags/api/routes_console.py#L286) |
| `GET /v1/console/conversations/{cid}` | Private | Owning user session | path `cid`: string required | [ags/api/routes_console.py:290](../ags/api/routes_console.py#L290) |
| `POST /v1/console/conversations/{cid}/messages` | Private | Owning user session | path `cid`: string required; body: **Submission** | [ags/api/routes_console.py:336](../ags/api/routes_console.py#L336) |
| `POST /v1/console/conversations/{cid}/stop` | Private | Owning user session | path `cid`: string required | [ags/api/routes_console.py:342](../ags/api/routes_console.py#L342) |
| `GET /v1/console/conversations/{cid}/approvals` | Private | Owning user session | path `cid`: string required | [ags/api/routes_console.py:351](../ags/api/routes_console.py#L351) |
| `POST /v1/console/approvals/{approval_id}` | Private | Owning user session | path `approval_id`: string required; body: **ApprovalDecision** | [ags/api/routes_console.py:379](../ags/api/routes_console.py#L379) |
| `POST /v1/console/delegations/{did}/cancel` | Private | Owning user session | path `did`: string required | [ags/api/routes_console.py:398](../ags/api/routes_console.py#L398) |
| `GET /v1/console/coding` | Private | Owning user session | No query parameters or JSON body | [ags/api/routes_console.py:424](../ags/api/routes_console.py#L424) |
| `POST /v1/console/coding/{did}/messages` | Private | Owning user session | path `did`: string required; body: **Submission** | [ags/api/routes_console.py:463](../ags/api/routes_console.py#L463) |
| `GET /v1/console/coding/{did}` | Private | Owning user session | path `did`: string required | [ags/api/routes_console.py:469](../ags/api/routes_console.py#L469) |

**128 application operations; 50 match the example public path policy.**
FastAPI also registers `GET /openapi.json`, `GET /docs`, `GET /docs/oauth2-redirect` and `GET /redoc`.
All four are private under the example ingress policy. Their availability can also depend on middleware and deployment.

## Request model field index

Required fields are bold. This index is for navigation; the JSON schema contains the full validation rules.

| Model | Fields and types |
|---|---|
| Action | **action_id**: string; **task_id**: string; **kind**: create_task/read/write/check/review/integrate/inference; **args**: Arguments |
| Agent | **owner**: Owner; **type**: rhm_assistant/coder/generalist/researcher/company_head/worker/custom; type_version: string; display_name: string; objective: string; **model**: ModelSpec; toolsets: list[Toolset]; knowledge_scopes: list[string]; run_policy: RunPolicy; sandbox: SandboxSpec; approval_policy: ApprovalPolicy; **agent_id**: string; **version**: integer; status: idle/queued/running/waiting_approval/folding/paused/done/failed/needs_attention; status_reason: string or null; effective_model: string or null; **created_at**: string; **updated_at**: string |
| AgentControl | session_id: string or null |
| AgentCreate | **owner**: Owner; **type**: rhm_assistant/coder/generalist/researcher/company_head/worker/custom; type_version: string; display_name: string; objective: string; **model**: ModelSpec; toolsets: list[Toolset]; knowledge_scopes: list[string]; run_policy: RunPolicy; sandbox: SandboxSpec; approval_policy: ApprovalPolicy |
| AgentFile | **kind**: identity/rules/skills/data/evals; **name**: string; **content**: string; **sha256**: string; **version**: integer |
| AgentFilePut | **content**: string; sha256_prev: string or null |
| AgentPage | **items**: list[Agent]; next_cursor: string or null |
| AgentPatch | model: ModelSpec or null; objective: string or null; run_policy: RunPolicy or null; toolsets: list[Toolset] or null; approval_policy: ApprovalPolicy or null; display_name: string or null |
| Answer | **text**: string; **account**: string; **own_account_attested**: boolean |
| Approval | **approval_id**: string; **agent_id**: string; **namespace**: string; run_id: string or null; **tool**: string; **args_preview**: string; args: object; reason: string; **status**: pending/approved/denied/resolved_locally; decision_note: string or null; decided_by: string or null; **created_at**: string; decided_at: string or null; kind: string; summary: string; external_ref: string or null; console_url: string or null; relayable: boolean; applied: boolean or null |
| ApprovalDecision | **decision**: approve/deny; note: string; review_digest: string or null |
| ApprovalPolicy | require_for: list[destructive/network/secret]; auto_approve: list[string] |
| Arguments | path: string or null; text: string or null; expected_sha256: string or null; base_commit: string or null; task_commit: string or null; checkout_ref: string or null; argv: list[string] or null; inference_request: object or null |
| AssistantInput | **model**: ModelSpec; **run_policy**: RunPolicy |
| Attachment | kind: string; **ref**: string |
| Binding | **provider**: string; **account**: string |
| CatalogAccessPicker | **model_access**: free/cheaper_slow/cheap_fast/premium; **allowed_modes**: list[string]; **allowed_cost_tiers**: list[string]; **model_ids**: list[string]; **role_manual_suggestions**: object |
| CatalogBands | **free**: list[string]; **cheaper_slow**: list[string]; **cheap_fast_only**: list[string]; **premium**: list[string] |
| CatalogFallbackOrders | **free**: list[string]; **cheaper_slow**: list[string]; **cheap_fast**: list[string]; **premium**: list[string] |
| CatalogLocal | available: boolean; **model_id**: string; context_tokens: integer or null |
| CatalogModel | **model_id**: string; **tier**: string; is_free: boolean |
| CatalogRoleTables | **manual_default_by_band**: object; **default_pins**: object; **paid_hot_roles**: list[string]; **paid_hot_role_pins**: object; **cheaper_slow_hot_role_pins**: object; **narrator_roles**: list[string]; **auto_routing_pin_exempt_roles**: list[string] |
| CatalogSnapshot | schema_version: integer; **as_of**: string; **generated_at**: string; **expiry_grace_days**: integer; **models**: list[CatalogSnapshotModel]; **bands**: CatalogBands; **unhireable_ids**: list[string]; **fallback_orders**: CatalogFallbackOrders; **cascade_escalate_order**: object; cache_soak_model_ids: list[string]; default_cache_soak_model: string; **roles**: CatalogRoleTables; **access_pickers**: object; **local**: CatalogLocal |
| CatalogSnapshotModel | **id**: string; **label**: string; description: string; band: free/cheaper_slow/cheap_fast/premium or null; is_free: boolean; hireable: boolean; context: integer or null; price_in_per_m: number or null; price_out_per_m: number or null; zdr: boolean; zdr_price_in_per_m: number or null; zdr_price_out_per_m: number or null; bench: object; verified_cache: boolean; tool_capable: boolean; auto_eligible: boolean; expires: string or null |
| CatalogType | **type**: string; **type_version**: string; description: string; default_toolsets: list[Toolset]; skills: list[string] |
| CodingActivation | **version**: integer; **consent**: boolean |
| CodingBinding | **device_id**: string; **project_id**: string |
| Configuration | **version**: integer; **display_name**: string; **objective**: string; model_pin: string or null; model_tier: string or null |
| Constraint | **memory_id**: string; **agent_id**: string; session_id: string or null; **memory_key**: string; **memory_value**: string; confidence: number; eviction: ephemeral/session_bound/persistent; **updated_at**: string |
| ConversationCreate | **request_id**: string; title: string |
| DecisionBundleReport | **bundle_id**: string; **calls**: integer; **cached**: integer; **cached_share**: number; **cost_usd**: number; latency_p50_ms: integer or null; latency_p95_ms: integer or null; outcomes: object; labeled: integer; overturned: integer; overturn_rate: number or null; overturn_by_outcome: object |
| DecisionEvaluate | **bundle_id**: string; **schema_version**: string; **state**: object; namespace: string or null; context: object |
| DecisionLabel | **correct**: boolean; **source**: operator_approval/operator_denial/refusal_review/downstream |
| DecisionOverturn | labeled: integer; overturned: integer; rate: number or null |
| DecisionProposal | **action_class**: string; **labels**: integer; **current_floor**: number; proposed_floor: number or null; false_act_rate: number or null; false_refuse_rate: number or null; note: string |
| DecisionReport | **days**: integer; **since**: string; **until**: string; **thresholds_version**: string; spent_today_usd: number; day_cap_usd: number or null; bundles: list[DecisionBundleReport]; proposals: list[DecisionProposal] |
| DecisionResult | **decision_id**: string; **outcome**: act/confirm/escalate/refuse/fallback/skipped; **reason**: string; confidence: number or null; risk_score: number or null; answers_summary: object; **thresholds_version**: string; cached: boolean; latency_ms: integer; cost_usd: number or null |
| ErrorBody | **code**: string; **message**: string; retryable: boolean; details: object |
| ErrorEnvelope | **error**: ErrorBody |
| Event | **seq**: integer; **agent_id**: string; **namespace**: string; session_id: string or null; run_id: string or null; **type**: string; **ts**: string; payload: object |
| ExternalApplied | **outcome**: applied/resolved_locally |
| ExternalApproval | **approval_id**: string; **owner_service**: string; **owner_user_id**: string; **namespace**: string; **kind**: string; **ref**: string; **summary**: string; payload: object; console_url: string or null; **relayable**: boolean; **status**: pending/approved/denied/resolved_locally; decision_note: string or null; decided_by: string or null; **created_at**: string; decided_at: string or null; applied_at: string or null |
| ExternalApprovalIn | **kind**: string; **ref**: string; summary: string; **namespace**: string; owner_user_id: string; payload: object; console_url: string or null; relayable: boolean |
| FreeRequestCount | **day**: string; **service**: string; **namespace**: string; **requests**: integer |
| FurnaceArmView | **kind**: string; **model_id**: string; **route**: local/cloud; **state**: shortlist/bench/retired; **incumbent**: boolean; **p_mean**: number; **p_lo**: number; **p_hi**: number; **n_eff**: number; **n_total**: integer; **est_cost_usd**: number; **roi_usd**: number; **prior_q**: number or null; **breaker**: string; **quality_breaker**: string; **excluded_reason**: string or null; **explore_trials_today**: integer |
| FurnaceAttempt | **position**: integer; **model_id**: string; **route**: local/cloud; **mode**: greedy/explore/probe; **verdict**: pass/reject/error/skipped; reason: string; tokens_in: integer; tokens_out: integer; cost_usd: number; latency_s: number; est_cost_usd: number; p_mean: number; n_eff: number |
| FurnaceComplete | **kind**: title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract; **system**: string; **prompt**: string; **validator**: ValidatorSpec; max_tokens: integer or null; value_usd: number or null; prepass: FurnacePrepass or null; namespace: string or null; allow_cloud: boolean; shadow_ok: boolean |
| FurnaceDecision | **call_id**: string; **kind**: title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract; **outcome**: accepted/heuristic; **reason**: string; attempts: list[FurnaceAttempt]; spend_usd: number; overshoot_usd: number; value_usd: number; day_spend_usd: number; day_cap_usd: number or null; explore_spend_day_usd: number; privacy: no_keep/zero_retention; tier: string; cloud_allowed: boolean; shadow_scheduled: string or null; log_line: string |
| FurnaceFeedback | **ok**: boolean; reason: string |
| FurnaceKindView | **kind**: string; **incumbent**: string or null; **calls_today**: integer; **accepted_today**: integer; **heuristic_today**: integer; **spend_today_usd**: number; arms: list[FurnaceArmView] |
| FurnacePrepass | **raw_tokens**: integer; **downstream_model_id**: string; downstream_reuses: integer |
| FurnaceRates | **local_available**: boolean; **basis**: gross/marginal; **usd_per_1m_in**: number; **usd_per_1m_out**: number; **prefill_tps**: number; **decode_tps**: number; **wall_w**: number; **samples**: integer; **source**: measured/prior; kind: string or null |
| FurnaceResult | **text**: string or null; **model_id**: string or null; **decision**: FurnaceDecision |
| FurnaceState | **day**: string; **day_spend_usd**: number; **day_cap_usd**: number or null; **explore_spend_usd**: number; **explore_cap_usd**: number; **cap_hit_at**: string or null; **global_cloud_breaker**: string or null; **local_available**: boolean; kinds: list[FurnaceKindView]; local_ok_today: integer; local_fail_today: integer; cloud_attempts_today: integer; house_usd: number |
| HTTPValidationError | detail: list[ValidationError] |
| HelperPreference | enabled: boolean; llm_key_ref: string or null |
| HostedAccessGrant | **enabled**: boolean; **expires_at**: string; **max_agents**: integer; **max_budget_usd**: number; **max_ticks**: integer; **max_model_requests_per_tick**: integer; max_tick_wall_clock_s: number; playground_operator: boolean; hosted_orchestration: boolean |
| HostedAgentCreate | playground_operator: boolean; type: rhm_assistant/coder/generalist/researcher/custom; display_name: string; objective: string; **model**: ModelSpec; **run_policy**: RunPolicy |
| HouseBenchmarkRow | **kind**: string; **model_id**: string; **hq**: number; **hq_se**: number; **house_pass_rate**: number; live_p: number or null; live_usd_per_ok: number or null; house_usd_per_ok: number or null; n_live: integer; **n_house**: integer; **last_sweep_at**: string |
| HouseBenchmarks | rows: list[HouseBenchmarkRow] |
| HouseItemMetaOut | **item_id**: string; **kind**: string; **source**: synthetic/captured/manual; **split**: dev/holdout; **status**: string; **created_at**: string; expires_at: string or null |
| HouseItems | items: list[HouseItemMetaOut] |
| HouseSweepRequest | kinds: list[title/bullets/narrative_fold/context_fold/json_repair/pydantic_prepass/flashcard/code_qa/fact_extract] or null; budget_usd: number or null |
| HouseSweepStarted | **sweep_id**: string |
| InferenceBinding | **device_id**: string; **project_id**: string; **model_id**: string |
| Instruction | **kind**: identity/rules/skills; **name**: string; **content**: string; sha256_prev: string or null |
| KeyCreate | provider: openrouter/openai_compat; label: string; **secret**: string |
| KeyOut | **key_id**: string; **provider**: string; label: string; **last4**: string; **created_at**: string |
| LocalGrant | **enabled**: boolean; **expires_at**: string |
| LocalProbe | **user_id**: string; items: integer |
| MessageAccepted | **message_id**: string; **session_id**: string; **seq**: integer; event_seq: integer |
| MessageIn | role: user/orchestrator; **content**: string; session_key: string or null; attachments: list[Attachment]; wake: boolean |
| MessageOutcome | **message_id**: string; **agent_id**: string; **state**: queued/running/completed/blocked/capped/failed/waiting_approval/needs_attention/cancelled/paused; run_id: string or null; run_lineage: list[MessageRunBinding]; reason: string; error: string or null; output: MessageOutput or null; text: string or null; usage: Usage or null; cost_pending: boolean; known_cost_usd: number or null |
| MessageOutput | status: string; summary: string; result: object |
| MessageRunBinding | **run_id**: string; session_id: string or null |
| ModelSpec | mode: tier/pin; tier: free/cheaper_slow/cheap_fast/premium or null; pin: string or null; pin_locked: boolean; ignore_tier: boolean; llm_key_ref: string or null |
| Owner | **service**: rhm/pg/cs; user_id: string; **namespace**: string |
| ProjectGrant | **root_digest**: string; execution: boolean; lifetime: integer |
| PublicActionReview | **approval_id**: string; **agent_id**: string; **namespace**: string; **review_digest**: string; **agent_version**: integer; **action**: PublicGitAction or PublicFirmAction or PublicCoordinationAction; **execution_location**: agent_vm/hosted_backend; **network**: none/allowlist |
| PublicAgentMonitor | **agent_id**: string; **owner_id**: string; **namespace**: string; **purpose**: rhm_assistant/coder/generalist/researcher/company_head/worker/custom; **current_work**: idle/queued/running/waiting_approval/folding/paused/done/failed/needs_attention; **spend_usd**: number or null; **known_spend_usd**: number; **unresolved_requests**: integer; soft_limit_warning: boolean or null; execution_location: unknown/hosted_backend/user_device; isolation_mode: unknown/firecracker/none; execution_source: string or null |
| PublicCoordinationAction | **operation**: string; **tool**: create_agent/delegate_agent/configure_agent; **arguments**: object; **authority_revision**: string; **effects**: list[string] |
| PublicFirmAction | **operation**: Start firm/Pause firm/Send firm directive; **company_id**: string; **current_status**: string; **target_revision**: string; reason: string or null; directive: string or null; priority: low/normal/high/urgent or null; **effects**: list[string] |
| PublicGitAction | **operation**: string; **argv**: list[string]; **working_directory**: string; **timeout_seconds**: number |
| PublicMonitorPage | **items**: list[PublicAgentMonitor]; next_cursor: string or null |
| PublicQueuedApproval | **approval_id**: string; **agent_id**: string; **namespace**: string; **tool**: vm_exec/pg_operator_start_firm/pg_operator_pause_firm/pg_operator_nudge_firm or null; status: string; **created_at**: string |
| PublicWorkspaceArtifacts | **agent_id**: string; **owner_id**: string; **namespace**: string; scope: string; **items**: list[SandboxArtifactOut] |
| Receipt | **state**: string; **result**: object |
| Run | **run_id**: string; **agent_id**: string; **tick_no**: integer; **status**: string; model: string or null; **usage**: Usage; **started_at**: string; ended_at: string or null; error: string or null; calls: list[RunCall]; trace: RunTrace or null; cost_pending: boolean; known_cost_usd: number or null |
| RunCall | **call_id**: string; **seq**: integer; **model_id**: string; provider: string or null; **route**: cloud/local; tokens_in: integer; tokens_out: integer; cache_read_tokens: integer; cache_write_tokens: integer; reasoning_tokens: integer; cost_usd: number or null; **cost_source**: reported/catalog/free/local/unknown; is_free: boolean; latency_ms: integer or null; status: string; request_id: string or null; provider_response_id: string or null |
| RunPolicy | mode: oneshot/task/scheduled/continuous; cron: string or null; max_model_requests_per_tick: integer; tick_wall_clock_s: number; budget_usd: number; max_ticks: integer; caps_scope: lifetime/message |
| RunTrace | thinking_text: string; tool_trace: list[object] |
| SandboxArtifactIn | **namespace**: string; **kind**: file/directory; **sha256**: string; **data_b64**: string |
| SandboxArtifactOut | **artifact_id**: string; **namespace**: string; **kind**: file/directory; **sha256**: string; **size_bytes**: integer |
| SandboxArtifactPurge | **namespace**: string |
| SandboxChunk | **n**: integer; **stream**: stdout/stderr; **data_b64**: string |
| SandboxExecIn | **argv**: list[string]; working_dir: string; env: object; mounts: list[SandboxMountIn]; limits: SandboxLimitsIn; stdin: string or null |
| SandboxInfo | **backend**: string; **is_security_boundary**: boolean; image: string or null; image_digest: string or null; execution_classes: object; fcd: boolean; session_support: boolean; mount_roots: list[string]; private_artifacts: boolean |
| SandboxInstanceCreate | **namespace**: string; **execution_class**: trusted_fixture/untrusted_firm; limits: SandboxLimitsIn; lease_seconds: integer |
| SandboxInstanceFiles | **instance_id**: string; **namespace**: string; **sha256**: string; **data_b64**: string |
| SandboxInstanceOut | **instance_id**: string; **namespace**: string; **backend**: string; **execution_class**: trusted_fixture/untrusted_firm; **status**: string; lease_expires_at: string or null |
| SandboxJobIn | **namespace**: string; **execution_class**: trusted_fixture/untrusted_firm; **argv**: list[string]; working_dir: string; env: object; mounts: list[SandboxMountIn]; limits: SandboxLimitsIn; stdin: string or null |
| SandboxJobOut | **job_id**: string; **exit_code**: integer; timed_out: boolean; stdout: string; stderr: string; **backend**: string; image_digest: string or null; **execution_class**: trusted_fixture/untrusted_firm; duration_ms: integer |
| SandboxLimitsIn | wall_time_seconds: number or null; memory_mb: integer or null; cpu_cores: number or null; max_output_bytes: integer or null |
| SandboxMountIn | host_path: string or null; artifact_ref: string or null; **sandbox_path**: string; read_only: boolean |
| SandboxOutput | chunks: list[SandboxChunk]; exited: boolean; exit_code: integer or null |
| SandboxSessionIn | **namespace**: string; **execution_class**: trusted_fixture/untrusted_firm; **argv**: list[string]; working_dir: string; env: object; mounts: list[SandboxMountIn]; limits: SandboxLimitsIn |
| SandboxSessionOut | **session_id**: string; **backend**: string |
| SandboxSpec | profile: none/vm; network: none/allowlist; egress_hosts: list[string] |
| SandboxStdinIn | **data_b64**: string |
| SandboxStopIn | **namespace**: string; reason: string |
| SandboxStopOut | instances: integer; jobs: integer; sessions: integer |
| Session | **session_id**: string; **agent_id**: string; session_key: string or null; **status**: active/folded/archived; cumulative_tokens: integer; **created_at**: string; **last_active_at**: string; closed_at: string or null |
| Submission | **request_id**: string; **content**: string |
| TapeEvent | **event_id**: string; **session_id**: string; **agent_id**: string; run_id: string or null; **seq**: integer; **event_type**: string; role: string; content: object; token_cost: integer; blob_ref: string or null; folded_into: string or null; **created_at**: string |
| TierSettings | tier: free/cheaper_slow/cheap_fast/premium or null; privacy: any/no_keep/zero_retention or null; furnace_cloud: boolean or null |
| ToolSecretPut | **secret**: string |
| Toolset | **kind**: mcp/builtin; **name**: string; url: string or null; scopes: list[string]; allow_tools: list[string] or null; bearer_ref: string or null; prefix: string or null |
| Usage | in: integer; out: integer; cost_usd: number or null |
| UtilityComplete | **purpose**: title/summarize/extract_facts; **input**: string; tier: free/cheaper_slow/cheap_fast/premium; max_tokens: integer; namespace: string or null |
| UtilityResult | **text**: string; **model**: string; cost_usd: number; decision: FurnaceDecision or null |
| ValidationError | **loc**: list[string or integer]; **msg**: string; **type**: string; input: object; ctx: object |
| ValidatorSpec | **id**: nonempty/title/lines/one_line/no_invented_ids/json_object/json_lines/json_schema/fold_result; params: object |
