import { MCP_ATTACHMENTS } from "./mcpAttachments";
import type { McpAttachment } from "./types";

/** Hosted tools this client may emit. MCP ids are not in this set. */
const HOSTED_CAPABILITIES = new Set(["shell_execution", "tool_execution"]);

export interface LinkageContext {
  mode: "simulated" | "live";
  capabilities: unknown;
  hasWorkspaceBinding: boolean;
}

export interface CompiledMcpAttachment {
  id: string;
  title: string;
  capability: string;
  posture: "declared" | "executable";
  note: string;
}

export const emptyLinkageContext = (): LinkageContext => ({
  mode: "simulated",
  capabilities: null,
  hasWorkspaceBinding: false,
});

export function attachmentById(id: string): McpAttachment | undefined {
  return MCP_ATTACHMENTS.find((a) => a.id === id);
}

function capabilityStatus(capabilities: unknown, key: string): string | null {
  const caps = (capabilities as { capabilities?: unknown } | null)?.capabilities;
  if (!caps || typeof caps !== "object") return null;
  const entry = (caps as Record<string, unknown>)[key];
  if (!entry || typeof entry !== "object") return null;
  const status = (entry as { status?: unknown }).status;
  return typeof status === "string" ? status : null;
}

/** UI and compile share this. Simulated mode is never executable. */
export function mcpPosture(attachment: McpAttachment, ctx: LinkageContext): { posture: "declared" | "executable"; note: string } {
  if (ctx.mode !== "live") {
    return { posture: "declared", note: "Declared only. Simulated mode does not host MCP." };
  }
  const status = capabilityStatus(ctx.capabilities, attachment.capability);
  if (status !== "available") {
    return {
      posture: "declared",
      note: status
        ? `Capability ${attachment.capability} is ${status}.`
        : `Capability ${attachment.capability} was not reported available.`,
    };
  }
  if (!ctx.hasWorkspaceBinding) {
    return { posture: "declared", note: "Capability is available, but this run has no workspace binding." };
  }
  if (!HOSTED_CAPABILITIES.has(attachment.capability)) {
    return { posture: "declared", note: "This client has no MCP server for this attachment. The capability is display-only." };
  }
  return {
    posture: "executable",
    note: "The matching hosted tool may appear in allowed_tools. This client did not call an MCP server.",
  };
}

/** JSON text for inputs.mcp_attachments. Unknown ids are dropped. */
export function compileMcpAttachments(ids: readonly string[] | undefined, ctx: LinkageContext): CompiledMcpAttachment[] {
  const seen = new Set<string>();
  const out: CompiledMcpAttachment[] = [];
  for (const id of ids ?? []) {
    if (seen.has(id)) continue;
    seen.add(id);
    const attachment = attachmentById(id);
    if (!attachment || attachment.attachableTo !== "agent") continue;
    const row = mcpPosture(attachment, ctx);
    out.push({
      id: attachment.id,
      title: attachment.title,
      capability: attachment.capability,
      posture: row.posture,
      note: row.note,
    });
  }
  return out;
}
