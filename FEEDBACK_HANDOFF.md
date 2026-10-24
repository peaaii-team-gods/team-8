# Feedback handoff — command palette

## Branch

`feat/command-palette` (cut from `feat/schema-library` at `ed9e15a`).

No pull request yet. This file ships in the palette commit on that branch.

## What shipped

- `frontend/src/ui/commands/commands.ts` — `Command`, `registerCommands()`, `COMMAND_IDS`, `fuzzyMatch`, `isTypingTarget`.
- `frontend/src/ui/commands/commands.test.ts`
- `frontend/src/ui/commands/CommandPalette.tsx` — palette and `?` cheat sheet.
- `frontend/src/ui/commands/CommandPalette.test.tsx`
- `frontend/src/App.tsx` — Ctrl+K / ⌘K, Ctrl+Enter, and the overlay. Actions call the existing scenario, hub, run, clear, and landing functions.
- `frontend/src/ui/library/ContractLibrary.tsx` — listens for `team8:open-contracts`.
- `frontend/src/App.smoke.test.tsx` — palette loads the pilot; typing in a textarea does not open it; Ctrl+Enter starts Run.
- `frontend/README.md` — “Press Ctrl+K”.

## Seams

- `Command` is `{ id, title, enabled, reason?, run }`. `run` does nothing when `enabled` is false.
- `registerCommands(actions)` is the only list. It does not call Identity or the API.
- Wired ids: `scenario:pilot-storyboard`, `scenario:medicare-claim-risk`, `scenario:assay-qc`, `open-create`, `run-pipeline`, `stop-run`, `clear-canvas`, `back-to-landing`, `open-contracts`, `export-snapshot`, `import-snapshot`.
- `open-contracts` dispatches `team8:open-contracts`. The library listens. If that component is absent, the event is a no-op.
- `export-snapshot` and `import-snapshot` call the existing snapshot download and the existing file input (`data-testid="snapshot-file"`).
- `readiness-refresh` is reserved in `COMMAND_IDS` and is not shown. Register it when the readiness panel exposes refresh.

## Tests run

From `frontend/`: `npm test` (106), `npm run docs:check`, `npm run build`. All green.

## Merge risks

This branch also contains schema-library, judge-demo, canvas-snapshot, readiness, and history commits. There is no separate `feat/canvas-snapshot-v1`.

The palette diff touches `App.tsx` (same file as demo, snapshot, history, and readiness) and adds `frontend/src/ui/commands/`. It does not edit `live.ts`.

Expect conflicts in `App.tsx` with:

- `feat/judge-demo-mode` — view switching and autorun sit next to the new key listener.
- `feat/canvas-snapshot` — export/import commands call those handlers.
- `feat/schema-library` — Contracts listens for one event.
- `feat/project-history-bar` and `feat/readiness-console` — no palette calls into those panels. `readiness-refresh` is intentionally unregistered.

Rebase onto the integration target before review so this pull request is not the union of those features.

## Ask for the parent agent

Review Ctrl+K → Load Pilot storyboard, and Ctrl+Enter only when a link exists. Confirm `?` and palette shortcuts do nothing while a schema field is focused. If demo, snapshot, or the contract library land first, rebase and keep `registerCommands` as the only command list. Wire `readiness-refresh` only when that panel has a real refresh action.
