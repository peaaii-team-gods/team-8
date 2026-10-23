// F0 interface freeze: registry shapes. Adding a preset/service = one entry here + in its preset file; no component edits.
export type NodeKindId = "agent" | "dataLake";
export type UiState =
  | { kind: "void" }
  | { kind: "hub" }
  | { kind: "idle" }
  | { kind: "menu"; nodeId: string }
  | { kind: "linking"; sourceId: string }
  | { kind: "running" }
  | { kind: "schema"; nodeId: string }
  | { kind: "mcp"; nodeId: string };

export interface NodeKind {
  id: NodeKindId;
  label: string;
  shape: "rounded-rect" | "cylinder";
  palette: string;
}
export interface AgentPreset {
  id: string; kind: "agent"; title: string; description: string;
  rolePrompt: string; color: string; modelHint?: string;
}
export interface DataLakePreset {
  id: string; kind: "dataLake"; title: string; description: string;
  color: string; fixtureId: string;
}
export interface McpAttachment { id: string; title: string; attachableTo: NodeKindId; capability: string; executable: boolean }
export interface LinkRule { from: NodeKindId; to: NodeKindId; allowed: boolean; reason: string }
export interface ServiceFeature { id: string; service: string; feature: string; requiredCapability: string | null; liveToday: boolean }
export type VerificationKind = "proposal" | "verified" | "failed";

export type PipelineStage = "idle" | "propose" | "execute" | "fail" | "repair" | "complete";

export type CanvasNodeData = {
  kind: NodeKindId; presetId: string; title: string; description: string;
  color: string; status?: "queued" | "processing" | "done" | "error"; output?: string;
  /** Pretty JSON Schema text. Presets start from a predefined contract; programmers may replace it. */
  schemaText?: string;
  /** Proposal vs Verified honesty badge (agent nodes). */
  verification?: VerificationKind;
  /** MCP preset ids from MCP_ATTACHMENTS. Declarations only; the compiler does not turn these into tools. */
  mcpAttachmentIds?: string[];
};
