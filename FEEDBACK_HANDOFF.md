# Feedback handoff — judge demo mode

## Branch

`feat/judge-demo-mode` (cut from `feat/canvas-snapshot` at `414e7b3`).

No pull request yet. This file ships in the demo-mode commit on that branch.

## What shipped

- `frontend/src/demo/boot.ts` — `bootDemo(search)`, `demoPath`, `exitDemoPath`, scenario ids, caption text.
- `frontend/src/demo/boot.test.ts`
- `frontend/src/demo/DemoBanner.tsx` — banner, scenario select, Reset demo, Exit demo.
- `frontend/src/App.tsx` — simulated demo boot skips landing, loads the scenario, skips Identity while the flag is on, optional `?autorun=1`.
- `frontend/src/App.smoke.test.tsx` — normal landing, `?demo=1` pilot, assay scenario does not call Identity.
- `frontend/README.md` — one honest-limits sentence.

## Seams for later

- `bootDemo(search)` is the only parser. Query keys: `demo=1`, `scenario=pilot-storyboard|medicare-claim-risk|assay-qc`, `autorun=1`.
- Unknown `scenario` falls back to `pilot-storyboard`. Autorun is off unless the key is exactly `1`.
- While `demo.enabled`, the shell forces simulated mode, so history and readiness do not fetch.
- Plug a snapshot import by calling `loadSnapshot` from the banner instead of `loadScenario`.
- Autorun is one `setTimeout` in `App.tsx` after the graph has edges. It fires once per mount (`demoRan` ref). Leave it off for smoke tests.
- Exit demo deletes `demo`, `scenario`, and `autorun` via `history.replaceState` and returns to the landing page. Nothing is written to `localStorage` or `sessionStorage`.

## Tests run

From `frontend/`: `npm test` (100), `npm run docs:check`, `npm run build`. All green.

## Merge risks

This branch contains the canvas-snapshot, readiness, and history commits because it was cut from `feat/canvas-snapshot`. There is no `feat/canvas-snapshot-v1` branch in this clone.

The demo-only diff touches `App.tsx` (same file as snapshot, history, and readiness), plus new files under `frontend/src/demo/`. It does not edit `live.ts`.

Expect conflicts in `App.tsx` with:

- `feat/canvas-snapshot` — UserBar handlers and the snapshot notice sit next to the new banner.
- `feat/project-history-bar` — history panel props now take `shellMode`.
- `feat/readiness-console` — readiness props and the live binding effect now take `shellMode`.

`frontend/src/demo/boot.ts` and `DemoBanner.tsx` should merge cleanly. Rebase this branch onto the integration target before review so the pull request is not the union of those three features.

## Ask for the parent agent

Review the demo boot against a normal `/` load and `/?demo=1`. Confirm Exit demo returns to the landing page and that `?autorun=1` stays opt-in. If snapshot, history, or readiness land first, rebase `feat/judge-demo-mode` and keep `bootDemo` as the only query parser.
