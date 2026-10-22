# Extending the canvas

- **Add an agent preset:** one entry in `src/registry/agentPresets.ts` (id, role prompt). No component edits.
- **Add a data lake:** one entry in `src/registry/dataLakePresets.ts` + a synthetic fixture in `src/fixtures/lakes.ts`. Synthetic/de-identified only — no PHI, no real datasets.
- **Add an MCP attachment:** one entry in `src/registry/mcpAttachments.ts`. Attachments are declared, not executable, until the matching capability in `services.manifest.ts` is live.
- **Add a service feature:** one entry in `src/registry/services.manifest.ts` with its `requiredCapability`. The UI reads capabilities; it never hard-codes availability.
- **Add an adapter:** implement `RhmAdapter` in `src/adapters/`. Simulated is the default; live must keep tokens memory-only.
- After any registry change: `npm run docs:gen` (CI/`npm test` runs `docs:check`; drift fails).

<!-- GENERATED:registry start -->
### Agent presets

| id |
|---|
| `builder` |
| `maintainer` |
| `denial-predictor` |
| `policy-audit` |
| `custom-agent` |

### Data lake presets

| id |
|---|
| `supabase-primary` |
| `medicare` |
| `medicaid` |
| `commercial` |

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
