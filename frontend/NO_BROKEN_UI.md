# No broken UI — acceptance checklist

A UI change is **not done** if any previously working canvas control, panel, or run path is dead, clipped, unreachable, or half-wired. Landing and auth are gates around the canvas.

## Must pass before deploy

- [ ] `npm test` and `npm run docs:check` green (no new skips that hide regressions)
- [ ] Simulated `npm run dev`: Create hub, spawn agent/lake, tether, Run/Stop, Metrics / Conversation / Artifacts / Schema work **without** Identity
- [ ] Live gate is additive: after sign-in, same canvas controls work; no blocking overlay left on the canvas
- [ ] No dead controls: every visible button/panel works or is honestly disabled with a reason
- [ ] Desktop demo width: Run/Stop, Create, right rail, conversation usable; no panel permanently covering the graph
- [ ] Auth failures recoverable: wrong password stays on sign-in; logout → landing; hard refresh restores or returns to landing (never a blank shell)

## Fail the pass if

- Canvas mounts but Run/Create is unreachable
- Panels render empty/error with no recovery
- Simulated mode requires Identity
- Tests were deleted or skipped to “make green”
