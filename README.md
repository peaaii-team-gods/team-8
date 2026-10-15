<!-- This document is the operational guide for running and safely cleaning up the AGS demo. -->
# Two agent AGS demo and teammate setup

Each teammate gets their own AGS account. Everyone can use the same OpenRouter
team key to fund model calls. The demo securely reuses a saved session, creates
a Planner and Reviewer, relays their work between them, prints a combined
result, then removes its active agents and temporary provider-key registration.

**Cleanup boundary:** active agent IDs and registered key IDs must match their
pre-run inventories before the script reports success. AGS `DELETE /agents`
archives agents; run history, messages, audit/billing records and provider charges
remain. The saved login is an intentional persistent change. The current AGS API
cannot make the entire system literally identical before and after execution.

No invitations are created by these scripts or these instructions. The steps
below describe the current source UI and API; the installed deployment must
include those features and be reachable.

## Run the demo

Requires Python 3.10+, the three Python files in this directory, and its
dependencies. From the repository root, run in PowerShell:

```powershell
python -m pip install -r examples/requirements.txt
$env:OPENROUTER_API_KEY = '<the OpenRouter team API key>'
python two_agents.py
```

On the first run, the browser opens for passkey authorization. Later runs reuse
the saved session while it remains valid. The Planner proposes a pipeline for
readings `[2, 4, 6]`; the Reviewer checks it; the Planner incorporates the feedback.
The expected calculation is doubling to `[4, 8, 12]` and summing to `24`.
Every handoff and the combined result appear in the console, followed by cleanup
and the before/after inventory check. Edit the prompts in `main()` to change the work.

`AGS_KEY_ID` is no longer an input. If you already have a full AGS user session,
you can set `$env:AGS_TOKEN = 'sess_...'`; the script validates and securely saves
it. Tokens are never printed or written to a plaintext file.

# IMPORTANT! When services are down, no calls to right-hand-man.space routes will work. Let Brandon know if they are down.

## Exact flow for each teammate

### Once, when joining

1. Receive their own invitation, the app address, the shared OpenRouter key,
   and this examples directory (`two_agents.py`, `login.py`,
   `resources.py`, and `requirements.txt`).
2. Open [the RHM app](https://app.right-hand-man.space).
3. On the passkey sign-in screen, expand **Enroll or recover an account**.
   Select **Invitation**, enter a unique username and their `invtok_...`, and
   give the passkey a name.
4. Choose **Register passkey** and complete the browser/device passkey prompt.
   The app then performs passkey sign-in. This creates their account and their
   personal sign-in credential; it does not share your administrator account.
5. Tell you enrollment is complete. They can request agent-service access if
   the app presents that action; you can also edit their grant directly.
6. Wait for you to enable their grant with enough capacity for the demo.
7. Install Python 3.10+ and run `python -m pip install -r examples/requirements.txt`
   once from the repository root. For a standalone copy of this folder, use
   `python -m pip install -r requirements.txt`.

On an older password-enabled deployment, the equivalent enrollment choice is
**Redeem invite**, and they must save the issued personal credentials. The
automatic browser helper in this example targets the current passkey/native
authorization API. An older installation without that flow needs an existing
full user session supplied through `AGS_TOKEN` instead.

### Each terminal session

Set the shared provider key in that terminal:

```powershell
$env:OPENROUTER_API_KEY = '<the OpenRouter team API key>'
```

This environment setting is inherited by Python and lasts for that shell
session. It does not sign the teammate into AGS. They need not register the key
manually or copy an AGS key ID.

### Every demo run

1. Run `python two_agents.py` from the repository root. If they
   received only the examples folder, keep its files together and run
   `python two_agents.py` from that folder.
2. Python loads the session from the native OS credential store and checks it
   with identity `GET /api/v1/auth/me`. A valid saved session is reused without
   a browser prompt. A network/server error stops the run without discarding it.
3. If no session exists, or the cached one receives 401, the browser opens.
   Choose **Verify passkey and authorize**. The generic authorization screen
   currently labels this request **RHM Windows client**. A one-time code returns
   to Python's temporary loopback listener; Python exchanges it for its own
   session and saves it in the OS credential store.
4. Before new work, Python recovers any pending cleanup journal for this
   account/deployment. It then checks the current user's grant and two available
   hosted-agent slots. Missing access fails before registering a provider key.
5. Python snapshots active agent IDs and registered key IDs, writes a recovery
   journal, and registers a uniquely labeled temporary copy of the OpenRouter
   key. Neither the provider secret nor session token goes into the journal.
6. Python creates **Planner** and **Reviewer** using that saved-key reference.
7. **Planner → Reviewer:** Planner proposes the small pipeline. Python prints
   that actual answer and sends it to Reviewer.
8. **Reviewer → Planner:** Reviewer checks the proposal. Python prints that
   actual feedback and sends it back to Planner, using Planner's existing
   conversation for the revision.
9. Planner incorporates the feedback. Python prints the revised answer and
   one combined JSON object containing the proposal, review and final plan.
10. In cleanup, Python cancels any remaining work on its own two agents,
    archives them through DELETE, and deletes its temporary provider-key entry.
    It verifies that active agent IDs and registered key IDs equal the snapshot,
    then removes the pending recovery journal. The saved login remains.

This is an explicit **Python-mediated conversation**. These core-only hosted
agents do not autonomously open a direct peer connection: Python delivers one
agent's real output to the other's inbox. There are two agents and three work
submissions, with a real dependency between the turns rather than independent
parallel tasks.

All these AGS calls act as that teammate. Their agents and saved keys are
owner-scoped. Sharing the provider key shares its provider spending pool; it
does not merge AGS accounts, agent histories or AGS access grants.

## Exact API sequence under the hood

| Order | Caller and request | Result |
|---|---|---|
| Enrollment | App → `POST /api/v1/auth/passkeys/enroll` | Redeems that teammate's invitation for a short-lived enrollment token. |
| Enrollment | App → `/passkeys/register/options`, `/register/verify` | Registers their passkey; the enrollment token does not grant general API access. |
| Enrollment | App → `/passkeys/authenticate/options`, `/authenticate/verify` | Authenticates the teammate; the app gateway keeps its own browser session custody. |
| Every start | Python → identity `GET /api/v1/auth/me` for an available token | Validates a saved/provided session without creating a new one. |
| Sign-in only | Python → identity `POST /api/v1/auth/native/start` | Creates a PKCE S256 request with a random state and loopback callback. Returns `request_id` and `authorization_url`. |
| Browser | App → passkey authentication, then `POST /api/v1/auth/native/authorize` | Verifies the teammate and authorizes this native request. Redirects a one-time code to Python. |
| Script | Python → identity `POST /api/v1/auth/native/exchange` | Exchanges request ID, code, callback URI and secret verifier for Python's own `session_token`. |
| Before work | Python → AGS `GET /v1/access`, `GET /v1/public/monitors`, `GET /v1/keys` | Checks grant/capacity and snapshots the active inventory. |
| Script | Python → AGS `POST /v1/keys` | Registers a uniquely labeled temporary provider secret under this user; returns `key_id`. |
| Twice | Python → AGS `POST /v1/user-agents` | Creates a hosted agent using `model.llm_key_ref=key_id`. Returns `agent_id`. |
| Three turns | Python → AGS `POST /v1/agents/{agent_id}/messages` | Submits the proposal, peer review, then revision using the preceding agent's output. |
| Per message | Python → AGS `GET /v1/agents/{agent_id}/messages/{message_id}?wait_s=25` | Long-polls until completed, parked/failed, or the local deadline. |
| Cleanup | Python → AGS `POST /v1/agents/{agent_id}:cancel`, then `DELETE /v1/agents/{agent_id}` | Cancels and archives only agents owned by this demo run. |
| Cleanup | Python → AGS `GET /v1/billing/requests`, then `DELETE /v1/keys/{key_id}` | Preserves the temporary credential if unresolved demo billing needs reconciliation; otherwise deletes it. |
| Verify | Python → AGS `GET /v1/public/monitors`, `GET /v1/keys` | Checks the active IDs against the pre-run snapshot before reporting success. |

Paths abbreviated as `/passkeys/...` in the enrollment rows all start with
`/api/v1/auth`. Python's AGS calls send `Authorization: Bearer <session_token>`.
The identity browser gateway handles its own session/cookie and request guards;
Python does not extract its stored credential.

## Why AGS uses a key ID

| Value | Purpose |
|---|---|
| AGS user session (`AGS_TOKEN`, optional input) | Identifies which teammate is calling AGS. |
| `OPENROUTER_API_KEY` | Provider secret that funds model calls. |
| AGS `key_id` / `llm_key_ref` | Reference to AGS's encrypted saved copy of the provider secret. |

`POST /v1/keys` accepts `provider`, `label` and `secret`; its response contains
`key_id`. `GET /v1/keys` lists visible key metadata. The previous example made
the teammate register a key and pass its ID as `AGS_KEY_ID`. This version does
both automatically.

Separate accounts can save the same provider secret, but each registration has
its own owner-scoped AGS key ID. Giving one person's key ID to another account
does not authorize access to that person's saved key.

## Where the session is saved and how long it lasts

The [`keyring` package](https://keyring.readthedocs.io/en/latest/) accesses the
native credential store: Windows Credential Locker, macOS Keychain, or a
supported Linux Secret Service/KWallet backend. The demo explicitly rejects
plaintext, null and unknown backends; it does not silently save credentials in
a JSON file. A usable native credential store must be available/unlocked.

The cache is bound to both the configured AGS origin and identity origin. The
current OS profile keeps one saved login per origin pair. The current issuer
gives full sessions **30 days** of validity; caching cannot extend
that server lifetime. Expiration/revocation triggers another browser sign-in.
An explicitly supplied invalid `AGS_TOKEN` fails rather than silently choosing
another identity. Access grants can expire sooner than the session.

To revoke/remove the cached demo session explicitly:

```powershell
python two_agents.py --logout
```

If cleanup is pending, complete it before logout so the saved session remains
available to authorize cleanup. The provider key remains in the environment
where you supplied it; the example does not save a local copy of that secret.

## What cleanup restores and what it cannot erase

| State | After a successfully verified run |
|---|---|
| Active agent IDs visible to this account | Exactly the same set as before the run. |
| Registered AGS model-key IDs visible to this account | Exactly the same set as before the run. |
| Pre-existing agents and model keys | Not modified or deleted by the demo. |
| Pending local recovery journal | Removed after verified cleanup. |
| Saved AGS login | Intentionally retained in the native credential store. |
| Local state directory and lock file | Retained for cleanup recovery and exclusion of overlapping local demo runs. |
| Archived demo agents, messages, run/session history, accounting, events | Retained by AGS. DELETE archives rather than permanently purging these records. |
| Identity sessions, authentication audit/last-seen metadata | Retained/updated by sign-in and authenticated requests. |
| OpenRouter usage and charges | Retained by the provider; cannot be undone by cleanup. |

The script therefore verifies **active-resource inventory restoration**, not
bit-for-bit database rollback. It cannot honestly promise that every system
record is identical before and after real agent execution. There is no public
per-agent permanent-history purge operation in the current AGS contract.

Cleanup runs through a context manager on success, exceptions and Ctrl+C.
The demo cancels before archiving, but an already-started provider request can
still finish or incur a charge. It checks each agent's public monitor as well
as the bounded owner billing list. An unresolved demo bill retains the temporary
key and journal, and an agent whose monitor still reports unresolved requests
stays available for reconciliation. This is reported as incomplete cleanup,
not a successful reset.

The non-secret journal records unique resource labels and IDs before/after
creation. It can discover resources whose creation response was lost, and the
next run attempts recovery before creating anything else. If the process is
killed or the network is unavailable, cleanup cannot be instantaneous. Once
connectivity/access is restored, use the same account and run:

```powershell
python two_agents.py --cleanup-only
```

This command does not need `OPENROUTER_API_KEY` and does not start new model
work. For unresolved billing, first use the owner billing/receipt workflow in
the [API guide](../docs/AGENT_API_GUIDE.md), then retry cleanup.

Journal location is `%LOCALAPPDATA%\RHM\ags-demo` on Windows, or
`~/.local/state/rhm-ags-demo` elsewhere. `AGS_DEMO_STATE_DIR` can override it.
The journal contains no session/provider secrets. A per-account/deployment OS
file lock prevents overlapping local demo processes; separate computers or
other apps can still change the same account's inventory. Such changes cause
the equality check to fail, and the script preserves unrelated resources rather
than deleting them to force equality.

## Remaining limits

- Account enrollment and an administrator execution grant remain separate.
- There are **three per-message allowances** across the three collaboration
  turns; the requested $0.10 is not a total team/provider cap. Configure
  provider-side spending controls for the shared OpenRouter key.
- The example relays agent messages explicitly through Python. It is not an
  autonomous peer messaging network or a firm/work-queue implementation.
- A timed-out/parked turn stops the workflow and attempts cleanup. There is no
  automatic approval, allowance increase, or resubmission of the business task.
- The recovery journal resumes cleanup, not the collaboration itself. A normal
  subsequent run starts a new conversation after any old resources are cleaned.
- The output is displayed as returned; a production pipeline must validate its
  own required output schema. A final long poll can exceed the local five-minute
  deadline by one request timeout.
- The app, independent identity issuer, native authorization API, AGS and model
  must be operational. The helper starts a temporary loopback callback listener,
  not a local agent service.

## Recovery belongs to each individual

Recovery is for regaining an account, not ordinary team login. Legacy recovery
rotates that account's password and recovery key and revokes its sessions.
Passkey recovery codes are single-use and revoke that account's previous
sessions and passkeys. Each teammate should keep their own recovery material.
Invitations add accounts without resetting existing users.

## Troubleshooting and configuration

Default origins are `https://ags.right-hand-man.space` and
`https://id.right-hand-man.space`. Override with `AGS_BASE` and
`AGS_IDENTITY_BASE` when using another trusted deployment.

The public API health check returned Cloudflare 530 / 1033 when the API guide
was prepared on October 15, 2026. If that persists, restore the tunnel/origin
before testing authentication. A 403 during agent creation can mean an inactive
grant, insufficient limits, missing capacity or the wrong caller credential.
This simplified demo uses hosted user accounts, rather than private service
provisioning.

See the [full API guide](../docs/AGENT_API_GUIDE.md) for all service capabilities.

Verification: `test_workflow.py` checks real peer-output handoffs, original
inventory preservation, partial failure/lost receipts, cleanup recovery,
unresolved billing, session reuse/revocation and rejection of plaintext credential
backends against simulated HTTP/credential-store services. The browser helper
was also checked against a temporary local identity store with real ES256
passkey verification and native PKCE exchange, including an incorrect callback
state. No live hosted credentials or live model execution were used.

Run the behavioral checks from the repository root with:

```powershell
python -m pytest -n 0 examples/test_workflow.py
```

`pytest` and `pytest-xdist` are developer test dependencies, not needed to run
the demo itself.
