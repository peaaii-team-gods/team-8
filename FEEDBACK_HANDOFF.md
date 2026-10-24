# Feedback handoff — session activity timeline

## Branch

`feat/activity-timeline` (cut from `feat/output-inspector` at `79ea7a1`).

No pull request yet. This file ships in the activity commit on that branch.

## What shipped

- `frontend/src/ui/activity/activity.ts` — `ActivityItem`, `ActivityDraft`, `publicDetail`, `stageActivity`, `loadRemoteActivity`, `focusFromActivity`.
- `frontend/src/ui/activity/activity.test.ts`
- `frontend/src/ui/activity/ActivityPanel.tsx` — right rail, newest last, color by level, Clear activity.
- `frontend/src/ui/activity/ActivityPanel.test.tsx`
- `frontend/src/state/store.ts` — `pushActivity`, `clearActivity`, and rows from load, spawn, link, run start/end/stop, agent done/fail, stage, fixture check, snapshot import.
- `frontend/src/state/store.test.ts` — a pilot path records at least three labels and drops the output body.
- `frontend/src/App.tsx` — panel under Observability. Clear canvas appends one row after the session wipe.
- `frontend/src/App.smoke.test.tsx` — pilot run shows load, run, done, stage, and fixture check.
- `frontend/README.md` — one honest-limits sentence.

## Seams

- `ActivityItem` is `{ id, at, kind, title, detail?, nodeId?, level }`. `level` is `info | ok | warn | error`.
- `pushActivity(draft)` is the only writer. It keeps the last 80 rows, trims titles, and drops a detail that looks like JSON.
- `loadRemoteActivity()` returns `[]`. A later history change can append server events of the same type. This panel does not poll.
- A row with `nodeId` calls `onFocus(nodeId)`. The default focus opens the node menu and selects that node. The output inspector stays a separate panel; a row does not open it and does not carry the output body.
- `clearActivity()` clears the list only. `clearSession()` clears it with the rest of the session. Clear canvas then pushes `Canvas cleared`.

## Tests run

From `frontend/`: `npm test` (112), `npm run docs:check`, `npm run build`. All green.

## Merge risks

This branch also contains output-inspector, command-palette, schema-library, judge-demo, canvas-snapshot, readiness, and history commits.

The activity diff touches `store.ts` and `App.tsx` (same files as those features) and adds `frontend/src/ui/activity/`. It does not edit `live.ts`, `MetricsPanel.tsx`, or `StageStrip.tsx`.

Expect conflicts in `store.ts` with:

- `feat/output-inspector` — no activity calls into the inspector.
- `feat/project-history-bar` — history stays its own panel. `loadRemoteActivity` is the join point.
- `feat/judge-demo-mode` — demo load goes through `loadScenario`, so the timeline records it.
- Observability — stage rows copy the same stage names. They do not replace the stage strip.

Rebase onto the integration target before review so this pull request is not the union of those features.

## Ask for the parent agent

Review Load Pilot → Run and confirm the timeline shows the load, the run, each agent completion, the stage, and the fixture check, with no output JSON in a row. Confirm Clear activity leaves the graph. If history lands first, rebase and append through `pushActivity` / `loadRemoteActivity` instead of a second list.
