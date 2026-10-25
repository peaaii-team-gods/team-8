param(
  [ValidateSet("Status", "Start", "StartFrontend", "Stop", "Validate")]
  [string]$Action = "Status"
)
$ErrorActionPreference = "Stop"
Push-Location $PSScriptRoot
try {
  function Invoke-Compose {
    param([string[]]$ComposeArgs)
    & docker compose @ComposeArgs
    if ($LASTEXITCODE -ne 0) { throw "docker compose failed (exit $LASTEXITCODE)." }
  }
  switch ($Action) {
    "Status" { Invoke-Compose -ComposeArgs @("--profile", "public", "ps") }
    "StartFrontend" { Invoke-Compose -ComposeArgs @("up", "-d", "--build", "frontend", "pipeline") }
    "Start" {
      if (-not (Test-Path -LiteralPath ".env" -PathType Leaf)) {
        throw "Missing deploy/.env. Copy .env.example and set TUNNEL_TOKEN_FILE to the existing tunnel token file."
      }
      Invoke-Compose -ComposeArgs @("--profile", "public", "up", "-d", "--build")
    }
    "Stop" { Invoke-Compose -ComposeArgs @("--profile", "public", "stop") }
    "Validate" { Invoke-Compose -ComposeArgs @("--profile", "public", "config", "--quiet") }
  }
} finally {
  Pop-Location
}
