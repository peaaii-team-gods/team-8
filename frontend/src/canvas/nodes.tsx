import { Handle, Position, NodeToolbar, type NodeProps } from "@xyflow/react";
import { Bot, Database, Link2, Trash2 } from "lucide-react";
import type { CanvasNode } from "../state/store";
import { useStore } from "../state/store";

function Shell({ data, id, isLake }: { data: CanvasNode["data"]; id: string; isLake?: boolean }) {
  const { beginLink, removeNode, uiState } = useStore();
  return <div className={`glass px-4 py-3 min-w-44 ${isLake ? "rounded-[40px]" : ""}`} data-testid={`node-${id}`}>
    <Handle type="target" position={Position.Left} />
    <div className="flex items-center gap-2 font-semibold">{isLake ? <Database size={16} /> : <Bot size={16} />}{data.title}</div>
    <div className="text-xs opacity-70 mt-1">{data.description}</div>
    {data.status && <div className="text-xs mt-2">Status: {data.status}{data.output ? <><br />{data.output}</> : null}</div>}
    <Handle type="source" position={Position.Right} />
    <NodeToolbar isVisible={uiState.kind === "menu" && uiState.nodeId === id} position={Position.Right}>
      <div className="glass p-2 flex gap-1">
        <button aria-label="Link from node" onClick={(e) => { e.stopPropagation(); beginLink(id); }}><Link2 size={14} /></button>
        <button aria-label="Delete node" onClick={(e) => { e.stopPropagation(); removeNode(id); }}><Trash2 size={14} /></button>
      </div>
    </NodeToolbar>
  </div>;
}
export const AgentNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} />;
export const DataLakeNode = ({ data, id }: NodeProps<CanvasNode>) => <Shell data={data} id={id} isLake />;
