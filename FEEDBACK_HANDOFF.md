# Feedback handoff — toasts and status line

## Branch

`feat/toasts-status-line` (cut from `feat/activity-timeline` at `cea5945`).

No pull request yet. This file ships in the toast commit on that branch.

## What shipped

- `frontend/src/ui/toasts/toast.ts` — `ToastInput`, `toastText`, `toToastRecord`.
- `frontend/src/ui/toasts/ToastProvider.tsx` — `ToastProvider`, `useToast()`, stack of 4, dismiss, auto-dismiss.
- `frontend/src/ui/toasts/StatusLine.tsx` — one hint, Clear status.
- `frontend/src/ui/toasts/toast.test.ts`, `ToastProvider.test.tsx`
- `frontend/src/main.tsx` — provider around `App`, so landing and canvas share it.
- `frontend/src/state/store.ts` — `statusHint`, `setStatusHint`, `clearStatusHint`. Cleared with the session.
- `frontend/src/App.tsx` — scenario load toast, Run-without-session toast, demo hint.
- `frontend/src/ui/SessionPanel.tsx` — login failure toast. The password is not copied into the toast.
- `frontend/README.md` — one sentence on `toast()`.

## Seams

- `useToast().toast({ level, title, detail?, timeoutMs? })`. Levels: `info | ok | warn | error`. `timeoutMs: 0` stays until dismiss. Default is 4500ms. A title or detail that matches password, authorization, bearer, access_token, api_key, or csrf is dropped.
- `setStatusHint(text)` / `clearStatusHint()` on the store. The status line is not a toast. Clear status does not clear the graph.
- Wired call sites: login failure in `SessionPanel`, `toggleRun` when there is no adapter, successful `announceLoad`.
- Still to migrate (do not add a second stack): snapshot import notice, readiness failures, sign-out failure on the landing alert, history errors, link notices, “No workspace bound”.

## Tests run

From `frontend/`: `npm test` (116), `npm run docs:check`, `npm run build`. All green.

## Merge risks

This branch also contains activity, output-inspector, command-palette, schema-library, judge-demo, canvas-snapshot, readiness, and history commits.

The toast diff touches `App.tsx`, `main.tsx`, `SessionPanel.tsx`, and `store.ts`. It adds `frontend/src/ui/toasts/`. It does not edit `live.ts` or the Observability and Activity panels.

Expect conflicts in `App.tsx` with demo mode (the load helper sits next to demo boot) and with `SessionPanel` if auth copy changes. Rebase before review so this pull request is not the union of those features.

## Ask for the parent agent

Review a bad login, Load Pilot, and Ctrl+Enter on a live canvas that has no session. Confirm the error toast does not contain the password, the status hint clears without clearing the graph, and later features call `toast()` instead of `alert()` or a new banner.
