import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/react";
export default function PacketEdge(p: EdgeProps) {
  const [d] = getBezierPath(p);
  return <>
    <BaseEdge path={d} style={{ stroke: "#a855f7", strokeWidth: 2 }} />
    <circle r="4" fill="#e9d5ff"><animateMotion dur="2.2s" repeatCount="indefinite" path={d} /></circle>
  </>;
}
