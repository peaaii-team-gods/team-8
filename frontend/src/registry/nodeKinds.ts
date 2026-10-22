import type { NodeKind } from "./types";
export const NODE_KINDS: NodeKind[] = [
  { id: "agent", label: "Agent", shape: "rounded-rect", palette: "emerald" },
  { id: "dataLake", label: "Data Lake", shape: "cylinder", palette: "blue" },
];
export const nodeKind = (id: string) => NODE_KINDS.find((k) => k.id === id);
