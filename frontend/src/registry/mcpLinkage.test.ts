import { describe, expect, it } from "vitest";
import { MCP_ATTACHMENTS } from "./mcpAttachments";
import { compileMcpAttachments, mcpPosture } from "./mcpLinkage";

const shell = MCP_ATTACHMENTS.find((a) => a.id === "shell-mcp")!;
const knowledge = MCP_ATTACHMENTS.find((a) => a.id === "knowledge-mcp")!;
const available = {
  capabilities: {
    shell_execution: { status: "available" },
    tool_execution: { status: "available" },
    "tools.workspace_search": { status: "available" },
  },
};

describe("MCP posture", () => {
  it("stays declared in simulated mode even when a report says available", () => {
    expect(mcpPosture(shell, { mode: "simulated", capabilities: available, hasWorkspaceBinding: true }).posture).toBe("declared");
    const rows = compileMcpAttachments(["shell-mcp", "knowledge-mcp"], {
      mode: "simulated", capabilities: available, hasWorkspaceBinding: true,
    });
    expect(rows.every((row) => row.posture === "declared")).toBe(true);
  });

  it("marks only a bound hosted capability executable, never knowledge", () => {
    expect(mcpPosture(shell, { mode: "live", capabilities: available, hasWorkspaceBinding: false }).posture).toBe("declared");
    expect(mcpPosture(shell, { mode: "live", capabilities: available, hasWorkspaceBinding: true }).posture).toBe("executable");
    expect(mcpPosture(knowledge, { mode: "live", capabilities: available, hasWorkspaceBinding: true }).posture).toBe("declared");
    expect(mcpPosture(shell, { mode: "live", capabilities: null, hasWorkspaceBinding: true }).posture).toBe("declared");
  });
});
