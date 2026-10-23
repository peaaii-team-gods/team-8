import { Handle, Position, NodeToolbar, type NodeProps } from "@xyflow/react";
import { Bot, Braces, Database, Link2, Trash2 } from "lucide-react";
import type { CanvasNode } from "../state/store";
import { useStore } from "../state/store";
import { formatTokens, formatUsd } from "../run/telemetry";
import { matchingSchemaId, parseSchemaText } from "../registry/schemas";

const ACCENT: Record<string, string> = {
  emerald: "#34d399",
  purple: "#c084fc",
  fuchsia: "#e879f9",
  amber: "#fbbf24",
  cyan: "#22d3ee",
  blue: "#93c5fd",
};

function Shell({ data, id, isLake }: { data: CanvasNode["data"]; id: string; isLake?: boolean }) {
  const { beginLink, removeNode, openSchema, uiState, tracks } = useStore();
  const track = tracks.find((t) => t.nodeId === id);
  const busy = data.status === "processing" || data.status === "queued";
  const accent = ACCENT[data.color] ?? "#c084fc";
  return <div
    className={`glass px-4 py-3 w-[260px] ${isLake ? "rounded-[40px]" : ""} ${busy ? "agent-live" : ""}`}
    style={{ borderLeft: `3px solid ${accent}` }}
    data-testid={`node-${id}`}
  >
    <Handle type="target" position={Position.Left} />
    <div className="flex items-center gap-2 font-semibold">{isLake ? <Database size={16} /> : <Bot size={16} />}{data.title}</div>
    <div className="text-xs opacity-70 mt-1">{data.description}</div>
    {!isLake && data.schemaText && (
      <div className="text-[10px] mt-2 opacity-70" data-testid={`schema-${id}`}>
        {parseSchemaText(data.schemaText).ok ? `schema · ${matchingSchemaId(data.schemaText) ?? "edited"}` : "schema · invalid"}
      </div>
    )}
    {track && !isLake && (
      <div className="text-[10px] mt-2 opacity-80" data-testid={`track-${id}`}>
        tracked · {formatTokens(track.metrics.totalTokens)} tok · {formatUsd(track.metrics.costUsd)}
        {track.runId ? ` · ${track.runId.slice(0, 18)}` : ""}
      </div>
    )}
    {data.status && <div className="text-xs mt-2 capitalize">Status: {data.status}</div>}
    <Handle type="source" position={Position.Right} />
    <NodeToolbar isVisible={uiState.kind === "menu" && uiState.nodeId === id} position={Position.Right}>
      <div className="glass p-2 flex gap-1">
        {!isLake && <button aria-label="Edit schema" onClick={(e) => { e.stopPropagation(); openSchema(id); }}><Braces size={14} /></button>}
        <button aria-label="Link from node" onClick={(e) => { e.stopPropagation(); beginLink(id); }}><Link2 size={14} /></button>
        <button aria-label="Delete node" onClick={(e) => { e.stopPropagation(); removeNode(id); }}><Trash2 size={14} /></button>
      </div>
    </NodeToolbar>
  </div>;
}
export const AgentNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} />;
export const DataLakeNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} isLake />;
