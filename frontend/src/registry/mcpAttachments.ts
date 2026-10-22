import type { McpAttachment } from "./types";
// Declared, not executable: the B9 compiler emission path does not consume
// attachments (no node carries one; hosted tools are emitted directly as
// workflow.v1 allowed_tools literals under a fetched-available report).
// Flipping these would be posture, not behaviour — see HANDOFF B9.
export const MCP_ATTACHMENTS: McpAttachment[] = [
  { id: "coding-mcp", title: "Coding Service MCP", attachableTo: "agent", capability: "tool_execution", executable: false },
  { id: "knowledge-mcp", title: "Knowledge Base MCP", attachableTo: "agent", capability: "tools.workspace_search", executable: false },
  { id: "shell-mcp", title: "Hosted Shell MCP", attachableTo: "agent", capability: "shell_execution", executable: false },
];
