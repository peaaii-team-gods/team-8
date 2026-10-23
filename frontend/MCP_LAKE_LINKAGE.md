# Data lakes and MCP linkage

This client can show and compile linkage. It cannot run Coding, Knowledge, or Shell MCP servers. Those services live in other repositories.

## What this client can prove

- A lake → agent tether is allowed. An agent → lake tether is refused, and the banner shows the reason.
- Several lakes tethered to one agent all land in `inputs.evidence` as synthetic fixture rows. There is no PHI and no live dataset.
- An agent can attach and detach ids from `MCP_ATTACHMENTS`. The ids stay on the node for the session.
- On Run, those ids are JSON text in `inputs.mcp_attachments` (`id`, `title`, `capability`, `posture`, `note`). `inputs` stays `dict[str, str]`, so a backend that accepts arbitrary string values can ignore the key.
- `posture` is `declared` in simulated mode, when the capability is missing or not `available`, when there is no workspace binding, and for any capability this client does not emit (`tools.workspace_search` / Knowledge).
- `posture` is `executable` only for `shell_execution` and `tool_execution` when live mode has a fetched `{status:"available"}` report and a real workspace binding. `allowed_tools` still comes only from that B9 gate. The note says this client did not call an MCP server.

## What needs other repos

- A Coding, Knowledge, or Shell MCP process, and a gateway that would turn an attachment id into a tool call.
- Proof that public workflow submit ignores unknown `inputs` keys. This repo only knows `inputs` is `dict[str, str]`. If a strict allowlist rejects `mcp_attachments`, drop that key before submit.
- Identity sign-in plus `GET /v1/capabilities` and `GET /v1/workspaces` before any row can leave `declared`.

## Where attachments belong

Attach MCP presets to agents only. A lake is passive evidence. Putting an attachment on a lake would imply the lake calls a tool, which this workflow does not do. Lake → agent remains the evidence edge. Agent → agent remains the handoff edge.

## Shape

```json
{
  "id": "shell-mcp",
  "title": "Hosted Shell MCP",
  "capability": "shell_execution",
  "posture": "declared",
  "note": "Declared only. Simulated mode does not host MCP."
}
```

`inputs.mcp_attachments` is `JSON.stringify` of an array of those objects. Omit the key when the agent has no attachments.

## Next step

Stop here for execution. The next change belongs in the backend or sandbox repo: accept the declaration, and only then map an attachment to a hosted tool under the same capability and binding gate. Do not flip registry `executable` flags in this client to claim that mapping.
