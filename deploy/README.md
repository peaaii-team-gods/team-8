# Deploying the canvas

The public demo at [peaaiiteam8.online](https://peaaiiteam8.online) runs from this folder: a Docker Compose stack with the canvas (static build behind nginx) and the hospital pipeline server.

## Run it

```powershell
copy .env.example .env    # fill in values; .env is git-ignored
.\operate.ps1 -Action Start
.\operate.ps1 -Action Validate
.\operate.ps1 -Action Status
```

`.\operate.ps1 -Action StartFrontend` starts only the canvas and pipeline, for a local preview with no public exposure. `.\operate.ps1 -Action Stop` stops everything.

Secrets never go in Git or in `.env` values that get committed. `.env` holds file paths and settings only.

## How it behaves when parts are down

- **Public connector down:** the local preview still serves the canvas.
- **Pipeline container down:** the canvas still loads. Pipeline runs fail with a clear message until it is back.
- **Account service unreachable:** the pipeline refuses runs instead of guessing who you are.
- **Signed out:** you can explore the canvas. Starting a pipeline run or an export requires sign-in.
- **Model unavailable:** the run uses the recorded path and says so on screen.

## Before you ship a UI change

Follow [frontend/NO_BROKEN_UI.md](../frontend/NO_BROKEN_UI.md).