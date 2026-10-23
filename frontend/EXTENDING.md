# Extending the canvas

- **Add an agent preset:** one entry in `src/registry/agentPresets.ts` (id, role prompt). No component edits.
- **Add an output schema:** one entry in `src/registry/schemas.ts`. Presets reference it by id; an agent control window can still replace the JSON.
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
| `assay-qc` |
| `custom-agent` |

### Data lake presets

| id |
|---|
| `clinical-lab` |
| `medicare` |
| `medicaid` |
| `commercial` |
| `assay-plate` |

### Output schemas

| id |
|---|
| `mapping.v1` |
| `repair.v1` |
| `denial.v1` |
| `policy.v1` |
| `assay_qc.v1` |
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
