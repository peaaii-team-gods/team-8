import { Unplug } from "lucide-react";
import { useStore } from "../state/store";
import { MCP_ATTACHMENTS } from "../registry/mcpAttachments";
import { mcpPosture } from "../registry/mcpLinkage";

export default function McpWindow() {
  const { uiState, nodes, setUiState, attachMcp, detachMcp, linkageContext, edges } = useStore();
  if (uiState.kind !== "mcp") return null;
  const node = nodes.find((n) => n.id === uiState.nodeId && n.data.kind === "agent");
  if (!node) return null;
  const attached = new Set(node.data.mcpAttachmentIds ?? []);
  const lakes = edges
    .filter((e) => e.target === node.id)
    .map((e) => nodes.find((n) => n.id === e.source && n.data.kind === "dataLake"))
    .filter((n): n is NonNullable<typeof n> => !!n);

  return (
    <aside
      className="glass absolute top-14 left-4 z-20 w-[min(420px,calc(100%-2rem))] p-4 flex flex-col gap-2"
      data-testid="mcp-window"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <Unplug size={14} className="text-fuchsia-300" />
        <h2 className="font-semibold text-sm">{node.data.title} MCP</h2>
        <button type="button" className="ml-auto text-xs opacity-70" onClick={() => setUiState({ kind: "idle" })}>Close</button>
      </div>
      <p className="text-[10px] opacity-60">
        Attachments are declarations sent as inputs.mcp_attachments. They do not add allowed_tools. This client does not run Coding, Knowledge, or Shell MCP servers.
      </p>
      <p className="text-[10px] opacity-70" data-testid="mcp-lake-intent">
        {lakes.length
          ? `Lakes on this agent: ${lakes.map((l) => l.data.title).join(", ")}. Those rows compile to synthetic evidence. MCP rows do not read them.`
          : "No lake tethered. Link a lake to this agent if the run should see synthetic rows."}
      </p>
      <ul className="flex flex-col gap-2">
        {MCP_ATTACHMENTS.filter((a) => a.attachableTo === "agent").map((attachment) => {
          const on = attached.has(attachment.id);
          const row = mcpPosture(attachment, linkageContext);
          return (
            <li key={attachment.id} className="glass flex items-start gap-2 p-2 text-xs" data-testid={`mcp-row-${attachment.id}`}>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{attachment.title}</div>
                <div className="opacity-60">{attachment.capability}</div>
                <div className={row.posture === "executable" ? "text-emerald-200" : "text-amber-100"} data-testid={`mcp-posture-${attachment.id}`}>
                  {row.posture === "executable" ? "Executable" : "Declared"}
                </div>
                <div className="opacity-60">{row.note}</div>
              </div>
              <button
                type="button"
                className="shrink-0 underline"
                onClick={() => (on ? detachMcp(node.id, attachment.id) : attachMcp(node.id, attachment.id))}
              >
                {on ? "Detach" : "Attach"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
