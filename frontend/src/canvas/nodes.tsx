import { Handle, Position, NodeToolbar, type NodeProps } from "@xyflow/react";
import { Bot, Braces, Database, Link2, Trash2 } from "lucide-react";
import type { CanvasNode } from "../state/store";
import { useStore } from "../state/store";
import { formatTokens, formatUsageCost } from "../run/telemetry";
import { matchingSchemaId, parseSchemaText } from "../registry/schemas";

const ACCENT: Record<string, string> = {
  emerald: "#34d399",
  purple: "#c084fc",
  fuchsia: "#e879f9",
  amber: "#fbbf24",
  cyan: "#22d3ee",
  blue: "#93c5fd",
  teal: "#2dd4bf",
  indigo: "#818cf8",
  rose: "#fb7185",
  lime: "#a3e635",
};

function Shell({ data, id, isLake }: { data: CanvasNode["data"]; id: string; isLake?: boolean }) {
  const { beginLink, removeNode, openSchema, uiState, tracks, inspectLake, runStartedAt, runEndedAt } = useStore();
  const running = runStartedAt !== null && runEndedAt === null;
  const track = tracks.find((t) => t.nodeId === id);
  const busy = data.status === "processing" || data.status === "queued";
  const accent = ACCENT[data.color] ?? "#c084fc";
  return <div
    className={`glass px-4 py-3 w-[260px] ${isLake ? "rounded-[40px]" : ""} ${busy ? "agent-live" : ""}`}
    style={{ borderLeft: `3px solid ${accent}` }}
    data-testid={`node-${id}`}
    onDoubleClick={(e) => { if (isLake) { e.stopPropagation(); inspectLake(id); } }}
  >
    <Handle type="target" position={Position.Left} />
    <div className="flex items-center gap-2 font-semibold">{isLake ? <Database size={16} /> : <Bot size={16} />}{data.title}</div>
    <div className="mt-1 text-xs opacity-70">{data.description}</div>
    {!isLake && data.verification && (
      <div
        className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${
          data.verification === "verified" ? "bg-emerald-400/20 text-emerald-200" :
          data.verification === "checked_locally" ? "bg-sky-400/20 text-sky-100" :
          "bg-amber-400/20 text-amber-100"
        }`}
        data-testid={`verification-${id}`}
      >
        {data.verification === "verified" ? "Verified" : data.verification === "checked_locally" ? "Checked locally" : "Proposal"}
      </div>
    )}
    {!isLake && data.schemaText && (
      <div className="mt-2 text-[10px] opacity-70" data-testid={`schema-${id}`}>
        {parseSchemaText(data.schemaText).ok ? `schema · ${matchingSchemaId(data.schemaText) ?? "edited"}` : "schema · invalid"}
      </div>
    )}
    {track && !isLake && (
      <div className="mt-2 text-[10px] opacity-80" data-testid={`track-${id}`}>
        tracked · {formatTokens(track.metrics.totalTokens)} tok · {formatUsageCost(track.metrics)}
        {track.runId ? ` · ${track.runId.slice(0, 18)}` : ""}
      </div>
    )}
    {data.status && <div className="mt-2 text-xs capitalize">Status: {data.status}</div>}
    <Handle type="source" position={Position.Right} />
    <NodeToolbar isVisible={uiState.kind === "menu" && uiState.nodeId === id} position={Position.Right}>
      <div className="glass flex gap-1 p-2">
        {isLake && <button aria-label="Inspect lake" onClick={(e) => { e.stopPropagation(); inspectLake(id); }}><Database size={14} /></button>}
        {!isLake && <button aria-label="Edit schema" disabled={running} title={running ? "Stop the run before editing the graph" : undefined} onClick={(e) => { e.stopPropagation(); openSchema(id); }}><Braces size={14} /></button>}
        <button aria-label="Link from node" disabled={running} title={running ? "Stop the run before editing the graph" : undefined} onClick={(e) => { e.stopPropagation(); beginLink(id); }}><Link2 size={14} /></button>
        <button aria-label="Delete node" disabled={running} title={running ? "Stop the run before editing the graph" : undefined} onClick={(e) => { e.stopPropagation(); removeNode(id); }}><Trash2 size={14} /></button>
      </div>
    </NodeToolbar>
  </div>;
}
export const AgentNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} />;
export const DataLakeNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} isLake />;
