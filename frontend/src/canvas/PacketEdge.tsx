import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react";

export default function PacketEdge(p: EdgeProps<{ active?: boolean; packetLabel?: string }>) {
  const [d, labelX, labelY] = getBezierPath(p);
  const active = Boolean(p.data?.active);
  const label = p.data?.packetLabel?.trim();
  return <>
    <defs>
      <linearGradient id={`pkt-${p.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6d28d9" />
        <stop offset="55%" stopColor="#e879f9" />
        <stop offset="100%" stopColor={active ? "#fdf4ff" : "#c084fc"} />
      </linearGradient>
    </defs>
    <BaseEdge path={d} style={{
      stroke: `url(#pkt-${p.id})`,
      strokeWidth: active ? 3 : 2,
      filter: active ? "drop-shadow(0 0 8px #e879f9)" : "drop-shadow(0 0 3px #7c3aed)",
    }} />
    {active && (
      <path d={d} fill="none" stroke="rgba(253,244,255,0.55)" strokeWidth={1.4} strokeDasharray="5 11">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="0.85s" repeatCount="indefinite" />
      </path>
    )}
    <circle r={active ? 5.5 : 3.5} fill="#f5d0fe">
      <animateMotion dur={active ? "1.6s" : "2.8s"} repeatCount="indefinite" path={d} />
    </circle>
    {active && <>
      <circle r="3.2" fill="#e879f9" opacity="0.9">
        <animateMotion dur="1.6s" begin="0.28s" repeatCount="indefinite" path={d} />
      </circle>
      <circle r="2.2" fill="#fff" opacity="0.8">
        <animateMotion dur="1.6s" begin="0.55s" repeatCount="indefinite" path={d} />
      </circle>
    </>}
    {label && active && (
      <g>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={d} rotate="0" />
        <foreignObject x="-84" y="-132" width="168" height="64">
          <div xmlns="http://www.w3.org/1999/xhtml" className="packet-chip packet-chip-live">{label}</div>
        </foreignObject>
      </g>
    )}
    {label && !active && (
      <EdgeLabelRenderer>
        <div style={{ position: "absolute", transform: `translate(-50%, -100%) translate(${labelX}px, ${labelY - 96}px)`, pointerEvents: "none", maxWidth: 180 }}>
          <div className="packet-chip">{label}</div>
        </div>
      </EdgeLabelRenderer>
    )}
  </>;
}
