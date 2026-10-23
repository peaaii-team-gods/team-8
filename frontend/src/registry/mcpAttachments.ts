import type { McpAttachment } from "./types";
// Registry of declared attachments. `executable: false` stays on the preset:
// runtime posture is computed in mcpLinkage.ts from a live capabilities
// report plus a workspace binding. These ids never become allowed_tools.
export const MCP_ATTACHMENTS: McpAttachment[] = [
  { id: "coding-mcp", title: "Coding Service MCP", attachableTo: "agent", capability: "tool_execution", executable: false },
  { id: "knowledge-mcp", title: "Knowledge Base MCP", attachableTo: "agent", capability: "tools.workspace_search", executable: false },
  { id: "shell-mcp", title: "Hosted Shell MCP", attachableTo: "agent", capability: "shell_execution", executable: false },
];
