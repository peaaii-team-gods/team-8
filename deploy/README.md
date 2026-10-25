# Team 8 canvas deploy (peaaiiteam8.online)

Portable Docker Compose + Cloudflare Tunnel for the science-data agent canvas.
Identity/API stay on the shared RHM public stack (`identity` / `api.right-hand-man.space`).

## Prerequisites

1. Docker Desktop running on this PC (or another host).
2. Existing dashboard-managed `peaaiiteam8` tunnel (`db38a324-7477-4136-ab0b-a797d84b9bc8`) with its connector token in a plain-text file **outside Git**. This tunnel uses `--token-file`, not a locally-managed tunnel credentials JSON.
3. DNS: CNAME `peaaiiteam8.online` (and optional `www`) → `<tunnel-id>.cfargotunnel.com`, proxied.
4. Multi-site onboarding applied on RHM public Identity/backend (see fleet docs):
   - Origin `https://peaaiiteam8.online` on `CORS_ALLOW_ORIGINS` / `ALLOWED_ORIGINS`
   - `COOKIE_SAMESITE=none` + `COOKIE_SECURE=true`
   - Source Compose updated under `deploy/public/compose.yml`
   - **Installed runtime** (`C:\rhm-services-deploy\public\compose.yml`) must get the same three edits, then restart Identity + backend — apply manually if not already done
   - Documented in [rhm-identity-service/docs/browser/README.md](../../rhm-identity-service/docs/browser/README.md) and [deploy/public/README.md](../../deploy/public/README.md)

## This PC

```powershell
cd C:\rhm-services\Hackathon-Project\deploy
copy .env.example .env
# edit .env: TUNNEL_TOKEN_FILE (path only; never put the token in .env)
.\operate.ps1 -Action Start
.\operate.ps1 -Action Validate
.\operate.ps1 -Action Status
```

Local preview (no tunnel): http://127.0.0.1:18080
`Start` / `StartFrontend` also run the pipeline container on the compose network
(bound `0.0.0.0:8787` inside the network, published only as `127.0.0.1:8787`).
Public nginx proxies `/api/pipeline/` same-origin to that service. Set
`TUNNEL_TOKEN_FILE` in `.env` to the token file path only (never the token).

### Degraded modes

- Tunnel connector down: public origin 530; local `http://127.0.0.1:18080` still serves the canvas.
- Identity JWKS unreachable with an empty cache: pipeline returns `503 {"error":"identity_unavailable"}`.
- Signed out on the live canvas: `Sign in to run the pipeline`; no anonymous run, model call, or export.
- Model down: existing golden path is kept; no OpenRouter or paid consent on this path.

### Rollback

`.\operate.ps1 -Action Stop` stops the `public` profile (tunnel connector) and the compose stack.
Start only the local frontend+pipeline with `.\operate.ps1 -Action StartFrontend`.

Configure the dashboard tunnel's published application routes for both
`peaaiiteam8.online` and `www.peaaiiteam8.online` to `http://frontend:8080`.
The connector and frontend share the Compose network; `localhost` would point
at the connector itself. The old `cloudflared.yml` is a locally-managed
reference template and is not loaded by this dashboard-managed connector.
Replace the registrar parking A record at the apex with the tunnel CNAME;
keep the existing mail MX and SPF records.
Nginx redirects `www` to the apex so browser sessions use the existing
`https://peaaiiteam8.online` CORS allowlist entry.

## Move to another host

1. Copy `Hackathon-Project/` (or at least `frontend/` + `deploy/`).
2. Place the existing tunnel token file on the host; set its path in `.env`.
3. `.\operate.ps1 -Action Start`
4. Ensure Cloudflare DNS still points at this tunnel.

No dependency on `C:\rhm-services` at **runtime** (only needed if you build from this tree).

## Operator checks

- [frontend/NO_BROKEN_UI.md](../frontend/NO_BROKEN_UI.md)
- Browser: landing → sign-in → canvas → hard refresh restore → logout
- Telemetry UI is session-local. Observability offers **Download session JSON** (`canvas.session.v1`); it is not sent to platform accounting.

## Build args

Image bakes:

- `VITE_RHM_MODE=live`
- `VITE_RHM_API_BASE=https://api.right-hand-man.space`
- `VITE_RHM_IDENTITY_BASE=https://identity.right-hand-man.space`

## Verification — 2026-10-23

Published the pre-review working tree from `C:\rhm-services\Hackathon-Project`
(origin `https://github.com/peaaii-team-gods/team-8.git`). The separate
`rhm-canvas-app` preview on port 5276 is not the published artifact.

- `npm test`: 62 passed; `npm run docs:check` passed; production build passed.
- Docker frontend and dedicated tunnel are running; frontend binds only
  `127.0.0.1:18080`. Nginx configuration and Compose validation passed.
- Apex parking A record replaced with proxied tunnel CNAME. Both published
  application routes target `http://frontend:8080`; existing mail records retained.
- Exact apex URL returns HTTPS 200. Exact www URL redirects to the apex and
  finishes with HTTPS 200. Browser landing and sign-in entry rendered.
- Shared public API health and Identity JWKS returned 502 during verification;
  their application containers were absent from the running-container inventory.
  Login, session restore and live runs are not accepted by this deployment check.
- Existing token was checked against the intended tunnel ID without printing it.
  It is mounted read-only from outside Git; the ignored `.env` holds its path only.
- The Docker build reports six dependency audit findings; dependency upgrades
  were not included in this Cloudflare setup change.

Cloudflare's [run parameter reference](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/)
documents `--token-file` for dashboard-managed tunnels.

## Later local source review — 2026-10-23

The source now includes proposal/outcome honesty and Stop/logout isolation fixes;
see [current handoff](../frontend/HANDOFF.md). Local tests increased to 70 passing
tests; docs and production build passed. Compose configuration validation and
PowerShell parsing passed without starting services. No deployment workflow exists
in this repository: merging source does not run `operate.ps1` automatically.

These later source changes have **not** been redeployed or given live/browser
acceptance. The published screenshot above represents the earlier landing page.
The shared API/Identity failure and authenticated acceptance limits from the
deployment record remain open; this review did not re-probe or alter that runtime.
