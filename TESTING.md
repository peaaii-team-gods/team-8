# Testing

Pick the smallest tier that proves the change. A UI copy or style change needs T-touch plus build, not the whole stack.

| Tier | When | Commands (from the repo root) |
|---|---|---|
| T-touch | every edit loop | `npm --prefix frontend run test:touch -- <changed files>` (runs `vitest related --run`; about 30 s for one UI file) |
| T-package | once before filing, and at review/merge | `npm --prefix frontend test`, `npm --prefix frontend run docs:check`, `npm --prefix frontend run build` (about 1 minute together) |
| T-stack | only before a deploy, or when a shared contract changes | `npm --prefix frontend run rehearse:mrf`, then the owner's deploy validation |

- Red/green is shown at T-touch: the new test fails on the base and passes on the branch.
- Review runs T-package from a fresh checkout with `core.autocrlf=true`.
- Don't add a test dependency for this. Use what the repo already has.

# Main is held by review

Nothing lands on `main` without a PASS review receipt, except merges inside an owner-approved batch. Merges are fast-forward only: no merge commits, no force-push, no direct commits to `main`. The app deploys only from `origin/main`.
