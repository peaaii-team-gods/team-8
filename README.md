## Account-provider CLI consent

Configure the account provider in the hackathon web UI first. The pilot accepts
--allow-provider-charges --max-usd-per-run 0.02 for explicit consent to both Builder
and Maintainer runs. Each run has its own admission budget. This is not a hard
billing cap; set the hard limit on your provider key. Default consent is false
and the admission budget is zero, so account-provider inference is denied by
default. The operator host model requires a separate explicit user grant.
There are no provider key CLI arguments or key environment variables.

# Two-role data pipeline pilot

Builder and Validator/Maintainer collaborate through two sequential RHM public
workflow/run submissions. Builder selects a strictly bounded field mapping. Fixed
local Python ingests a tiny CSV, doubles its readings, and validates every output.
A second fixture renames `reading` to `value`, causing a real contract failure.
Maintainer receives Builder's actual mapping/output and the failure evidence,
proposes at most one mapping repair, and local code reruns independent validation.

**Execution boundary:** model decisions run on the backend's configured local
model. CSV ingestion, transformation and acceptance run in this Python client.
This pilot does **not** demonstrate hosted sandbox execution. It executes no
model-generated code and registers no provider keys or persistent agents.

**Frontend:** the agent canvas demo lives in [`frontend/`](frontend/README.md) (visual agent/data-lake canvas consuming this public API; simulated by default).

## Run

Requires Python 3.10+ and an operator-provisioned personal Identity account.
The operator must have launched the API and configured its local model; the CLI
checks capabilities before submitting work. From this repository:

```powershell
python -m pip install -r requirements.txt
python two_agents.py --username teammate --source fixtures/readings.csv --drift-source fixtures/readings-drift.csv --state-dir .pilot-state --output pilot-result.json
```

Enter your password at the hidden prompt. For a new personal account, obtain your
own invitation from the operator and add `--enroll`:

```powershell
python two_agents.py --enroll --username teammate --state-dir .pilot-state --output pilot-result.json
```

Enrollment prompts privately for a new password, confirmation and invitation.
The invitation is single-use; an uncertain enrollment response should be followed
by ordinary password login first. The client never prints or saves credentials.
Password policy is enforced by Identity. Each teammate has a separate account.

Defaults are `https://api.right-hand-man.space` and
`https://identity.right-hand-man.space`. Authentication sends the explicit trusted
Origin `https://api.right-hand-man.space`. Override via `--api-base`,
`--identity-base`, and `--client-origin` only for your own trusted deployment.
Equivalent environment settings are `RHM_API_BASE`, `RHM_IDENTITY_BASE`,
`RHM_CLIENT_ORIGIN`, `RHM_USERNAME` and `RHM_MODEL`. There is no password/key/token
environment variable. The CLI selects a model automatically when capabilities
lists exactly one; otherwise pass `--model` with an advertised model, for example
`--model qwen3.5-9b` on the intended local deployment.

The only runtime dependency is `httpx`. No shared model/provider key is needed.
The workflow requests a zero-dollar admission estimate, two ticks, 512 generated
tokens per tick and 2,048 total tokens per run. These are backend guardrails, not
a promise that an unknown cost is zero or a replacement for local-only deployment
configuration. No paid inference fallback is configured by this client.

## Inspect the result

A successful command exits 0 and writes `pilot-result.json` containing:

- Two backend run/workflow receipts, each preserving its `completion_basis`.
- Builder's validated mapping and actual baseline records.
- `injected_failure.code: "missing_column"`, the missing field, observed headers,
  source SHA-256 and mapping SHA-256.
- Exactly one maintenance attempt and the repaired mapping.
- The actual final rows, independent validation receipts and content hashes.
- `execution_boundary.pipeline: "local_deterministic"` and
  `hosted_sandbox_execution: false`.

The expected final rows are `north: 2 → 4`, `south: 4 → 8`, and `west: 6 → 12`;
`row_count` is 3 and `total` is 24. The acceptance oracle checks all identifiers,
original values, doubled values and aggregates. A model's `succeeded` /
`agent_reported` result is a proposal; it is never a pipeline pass by itself.

Malformed/extra model fields, Markdown instead of JSON, duplicate JSON keys,
unsupported source shapes, invalid values, truncated responses, a rejected repair
or a wrong rerun produce a clear failure. Contract failures write a failed receipt
and exit 1. Transport failures preserve the submission journal and stop; they do
not fabricate a completed receipt. Network access is used only for the configured
Identity/API. All data fixtures are bundled synthetic data.

## Contracts and bounds

Machine-readable contracts live in [`contracts/`](contracts). The runtime uses
standard-library checks so the pilot needs no schema-validator dependency.

| Stage | Contract |
|---|---|
| Source | UTF-8 CSV ≤4,096 bytes, exactly two distinct known columns, 1–16 rows, no missing/extra fields. Identifier must be unique and match `[a-z][a-z0-9_-]{0,31}`; readings are canonical nonnegative integers ≤999,999. |
| Builder | Exactly `schema_version: mapping.v1`, `id_column: sensor_id`, `reading_column: reading` or `value`. No commands, code, paths, URLs, expressions or new transforms. |
| Transform | Fixed implementation: normalize to `sensor_id`, `reading`, `doubled`; double each reading and sum the doubled values. |
| Maintainer | Exactly one `replace_mapping` decision with that same mapping schema, or `fail` with an enumerated reason. |
| Acceptance | Output schema plus a separate fixed-fixture oracle; exactly three expected records and total 24. |

The drift check verifies that the fixtures differ only by the intended column
rename. Both model replies are limited to 4,096 characters and must parse as one
complete strict JSON value. The actual Builder artifact and local failure are
passed to Maintainer in a bounded, escaped `untrusted_artefact` enclosure carrying
the source run ID. Neither role receives tools, repository authority, service
tokens or a direct peer channel. Read/write authority stays with the backend;
the local adapter performs only the fixed data operations authorized by this CLI.

## Restart, cancellation and retained state

Rerun the same command/state directory to inspect the same experiment. Successful
stages fetch their existing outputs and rerun deterministic checks without new
model submissions. Use a **new** state directory (for example `.pilot-state-2`)
for a deliberate new experiment. Changing a stage's inputs while reusing its
journal is rejected.

The atomic `.pilot-state/journal.json` stores only account/deployment/model
binding, workflow/run/workspace IDs, hashes, idempotency keys, timestamps and
states. It contains no passwords, access/refresh tokens, prompts, data rows or
model response content. A local OS file lock excludes overlapping processes using
the same directory. This is single-machine coordination, not distributed exactly-once.

Run creation is journaled before dispatch. A lost run receipt may be replayed
only with the original key/body and within the server-advertised retention
window, measured conservatively from local submission time. `outcome_unknown`,
paused/failed runs and expired windows never create replacement runs. Workflow
creation has **no** idempotency, list or deletion API: a lost workflow receipt
stops as `workflow_create_uncertain` and is never blindly recreated. No run was
submitted in that stage; the server may retain an unreachable immutable workflow.

Exceptions/Ctrl+C attempt cancellation of this journal's known active runs.
After an interruption or uncertain cancellation, sign in again and run:

```powershell
python two_agents.py --username teammate --state-dir .pilot-state --cancel-only
```

This mode can reconcile a lost run receipt by its unique workspace, then cancel
it; it never POSTs a new run and works without model-provider readiness. It checks
the workflow/workspace binding before cancellation. Unconfirmed cancellation
keeps the journal for another explicit attempt. A local polling limit defaults
to 180 seconds per run (`--deadline-seconds 1..600`); requests are bounded to 15
seconds and cancellation polling to 10 seconds. An in-flight HTTP/authentication
request may finish after a polling deadline; cancellation cannot recall model
work already in flight.

Each process signs in afresh, rotates refresh cookies in memory as needed, and
attempts logout on exit. A lost refresh response is not blindly replayed. Identity
cookies are held in a separate HTTP client and never sent to the backend. A
logout warning means revocation was not confirmed; local credentials are cleared
regardless. Workflows, run history and logical workspaces remain on the server.
This pilot does not promise database rollback or delete other work to force an
inventory equality claim.

## Verify locally

```powershell
python -m pip install -r requirements-dev.txt
New-Item -ItemType Directory -Path work -Force | Out-Null
python -m pytest -q test_workflow.py --basetemp=work/pytest
```

Tests simulate Identity/API HTTP and execute the real deterministic ingestion,
transformation and oracle. They cover actual handoffs, one repair, malicious
mapping refusal, output tampering, truncated replies, lost receipts, replay
expiry, cancellation, local exclusion, account binding, enrollment and refresh
cookie separation. These tests are not evidence of a live model or deployment.

## Live acceptance — 2026-10-22

The pilot passed against the public HTTPS API and Identity with the real
`qwen3.5-9b` local model, backend revision `46d9064` and Agent revision `d70fd07`.
Builder run `run_d8de769198954d6998237696` selected the initial mapping; Maintainer
run `run_08cb22bbb8c6459782f7941f` received the actual local artifacts/failure and
selected the renamed `value` field. Both backend completions were
`agent_reported`; separate local checks verified baseline and repaired output
with three rows and total 24. The injected `missing_column` failure and hashes
are recorded in the [sanitized live receipt](examples/public-pilot-acceptance.json).

Running the pilot again with the same journal returned the same backend receipts
and data, with **zero additional runs** and unchanged run inventory. Logout was
confirmed. No mock inference or paid provider key was used. This proves the
public model-decision path plus the fixed local pipeline; it does not prove
hosted sandbox execution. The temporary acceptance accounts are operator-managed
and are not teammate credentials or a reusable public demo login. The local
behavioral suite passed 45 tests after token-scheme compatibility checks.

See [`API.md`](API.md) for the public request sequence and
[`rough-plan.md`](rough-plan.md) for the future mini-orchestrator boundary.
