# Extending the canvas

- **Add an agent preset:** one entry in `src/registry/agentPresets.ts` (id, role prompt). No component edits.
- **Add an output schema:** one entry in `src/registry/schemas.ts`. Presets reference it by id; an agent control window can still replace the JSON. The Contracts drawer lists those registry documents only. It does not call the API or edit the canvas.
- **Add a data lake:** one entry in `src/registry/dataLakePresets.ts` + a synthetic fixture in `src/fixtures/lakes.ts`. Synthetic/de-identified only — no PHI, no real datasets.
- **Add an MCP attachment:** one entry in `src/registry/mcpAttachments.ts`. Agents carry the id on `mcpAttachmentIds`. Run sends `inputs.mcp_attachments` as JSON text (`id`, `title`, `capability`, `posture`, `note`). Posture is `executable` only in live mode when that capability is fetched `{status:"available"}`, a workspace binding exists, and the capability is `shell_execution` or `tool_execution`. Otherwise it stays `declared`. Attachments never add `allowed_tools`. See `MCP_LAKE_LINKAGE.md`.
- **Add a service feature:** one entry in `src/registry/services.manifest.ts` with its `requiredCapability`. The UI reads capabilities; it never hard-codes availability.
- **Add an adapter:** implement `RhmAdapter` in `src/adapters/`. Simulated is the default; live must keep tokens memory-only.
- **Report feedback:** use `useToast().toast({ level, title, detail?, timeoutMs? })` from `src/ui/toasts/ToastProvider.tsx`; levels are `info`, `ok`, `warn`, and `error`. The default timeout is 4.5 seconds; `timeoutMs: 0` keeps a toast open until dismissed. Sensitive-looking title/detail text is filtered. Use the store's `setStatusHint(text)` / `clearStatusHint()` for the separate status line; clearing it does not clear the canvas. Existing toast call sites cover sign-in failures, Run without a session, and successful scenario loads. Add future notices for snapshot import, readiness, sign-out, history, links, and missing workspace binding through this shared toast stack; do not add another banner or stack.
- After any registry change: `npm run docs:gen` (CI/`npm test` runs `docs:check`; drift fails).

<!-- GENERATED:registry start -->
### Agent presets

| id |
|---|
| `builder` |
| `maintainer` |
| `denial-predictor` |
| `policy-audit` |
| `assay-qc` |
| `custom-agent` |
| `mrf-builder` |
| `mrf-maintainer` |
| `mrf-hospital-builder` |
| `mrf-hospital-maintainer` |

### Data lake presets

| id |
|---|
| `clinical-lab` |
| `medicare` |
| `medicaid` |
| `commercial` |
| `assay-plate` |
| `hospital-mrf` |

### Output schemas

| id |
|---|
| `mapping.v1` |
| `repair.v1` |
| `denial.v1` |
| `policy.v1` |
| `assay_qc.v1` |
| `mrf.mapping.v1` |
| `mrf.repair.v1` |
| `mrf.mapping.v2-hospital` |
| `mrf.repair.v2-hospital` |
| `custom.v1` |

### MCP attachments (declared, not executable)

| id |
|---|
| `coding-mcp` |
| `knowledge-mcp` |
| `shell-mcp` |

### Service features

| id |
|---|
| `run-agent` |
| `cancel-run` |
| `execute-shell` |
| `execute-check` |
| `tier3-merge` |

<!-- GENERATED:registry end -->
