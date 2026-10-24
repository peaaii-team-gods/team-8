import type { CanvasEdge, CanvasNode } from "./store";
import { agentPreset } from "../registry/agentPresets";
import { dataLakePreset } from "../registry/dataLakePresets";
import { canLink } from "../registry/linkRules";
import { MCP_ATTACHMENTS } from "../registry/mcpAttachments";
import type { NodeKindId } from "../registry/types";

/** Client-only graph file. Not a server save, and not a run record. */
export const CANVAS_SNAPSHOT_VERSION = "canvas.snapshot.v1" as const;
export const CANVAS_SNAPSHOT_FILENAME = "canvas-snapshot.json";

const MAX_NODES = 32;
const MAX_EDGES = 64;
const MAX_CHARS = 400_000;

export interface CanvasSnapshot {
  schema_version: typeof CANVAS_SNAPSHOT_VERSION;
  nodes: SnapshotNode[];
  edges: SnapshotEdge[];
}

interface SnapshotNode {
  id: string;
  type: "agent" | "dataLake";
  position: { x: number; y: number };
  data: {
    kind: NodeKindId;
    presetId: string;
    title: string;
    description: string;
    color: string;
    schemaText?: string;
    mcpAttachmentIds?: string[];
  };
}

interface SnapshotEdge {
  id: string;
  source: string;
  target: string;
  type: "packet";
}

export type SnapshotParse =
  | { ok: true; nodes: CanvasNode[]; edges: CanvasEdge[] }
  | { ok: false; error: string };

const fail = (error: string): SnapshotParse => ({ ok: false, error });

function plain(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text || text.length > max || /[\u0000-\u001f]/.test(text)) return null;
  return text;
}

function coord(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < -20000 || value > 20000) return null;
  return value;
}

export function buildCanvasSnapshot(nodes: readonly CanvasNode[], edges: readonly CanvasEdge[]): CanvasSnapshot {
  return {
    schema_version: CANVAS_SNAPSHOT_VERSION,
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.data.kind,
      position: { x: node.position.x, y: node.position.y },
      data: {
        kind: node.data.kind,
        presetId: node.data.presetId,
        title: node.data.title,
        description: node.data.description,
        color: node.data.color,
        ...(node.data.schemaText ? { schemaText: node.data.schemaText } : {}),
        ...(node.data.mcpAttachmentIds?.length ? { mcpAttachmentIds: [...node.data.mcpAttachmentIds] } : {}),
      },
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: "packet",
    })),
  };
}

export function serializeCanvasSnapshot(doc: CanvasSnapshot): string {
  return JSON.stringify(doc, null, 2);
}

export function downloadCanvasSnapshot(doc: CanvasSnapshot): void {
  const blob = new Blob([serializeCanvasSnapshot(doc)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = CANVAS_SNAPSHOT_FILENAME;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function parseCanvasSnapshot(text: string): SnapshotParse {
  if (text.length > MAX_CHARS) return fail("This snapshot is too large.");
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return fail("This file is not JSON.");
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fail("This file is not a canvas snapshot.");
  const body = raw as Record<string, unknown>;
  if (body.schema_version !== CANVAS_SNAPSHOT_VERSION) return fail("This file is not a canvas snapshot.");
  if (!Array.isArray(body.nodes) || !Array.isArray(body.edges)) return fail("This snapshot has no graph.");
  if (body.nodes.length > MAX_NODES) return fail("This snapshot has too many nodes.");
  if (body.edges.length > MAX_EDGES) return fail("This snapshot has too many links.");

  const nodes: CanvasNode[] = [];
  const ids = new Set<string>();
  for (const item of body.nodes) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return fail("A node in this snapshot is unreadable.");
    const node = item as Record<string, unknown>;
    const id = plain(node.id, 80);
    const data = node.data;
    const position = node.position;
    if (!id || ids.has(id) || !data || typeof data !== "object" || Array.isArray(data) || !position || typeof position !== "object") {
      return fail("A node in this snapshot is unreadable.");
    }
    const fields = data as Record<string, unknown>;
    const kind = fields.kind === "agent" || fields.kind === "dataLake" ? fields.kind : null;
    const presetId = plain(fields.presetId, 80);
    if (!kind || !presetId || node.type !== kind) return fail("A node in this snapshot is unreadable.");
    const preset = kind === "agent" ? agentPreset(presetId) : dataLakePreset(presetId);
    if (!preset || preset.kind !== kind) return fail(`Unknown preset “${presetId}”.`);
    const x = coord((position as { x?: unknown }).x);
    const y = coord((position as { y?: unknown }).y);
    if (x === null || y === null) return fail("A node in this snapshot has no position.");
    const title = plain(fields.title, 120) ?? preset.title;
    const description = plain(fields.description, 240) ?? preset.description;
    let schemaText: string | undefined;
    if (fields.schemaText !== undefined) {
      if (typeof fields.schemaText !== "string" || fields.schemaText.length > 8000) return fail("A schema in this snapshot is unreadable.");
      schemaText = fields.schemaText;
    }
    let mcpAttachmentIds: string[] | undefined;
    if (fields.mcpAttachmentIds !== undefined) {
      if (!Array.isArray(fields.mcpAttachmentIds)) return fail("An attachment in this snapshot is unreadable.");
      const known = new Set(MCP_ATTACHMENTS.filter((item) => item.attachableTo === kind).map((item) => item.id));
      const picked: string[] = [];
      for (const attachmentId of fields.mcpAttachmentIds) {
        if (typeof attachmentId !== "string" || !known.has(attachmentId)) return fail("This snapshot names an unknown attachment.");
        if (!picked.includes(attachmentId)) picked.push(attachmentId);
      }
      if (picked.length) mcpAttachmentIds = picked;
    }
    ids.add(id);
    nodes.push({
      id,
      type: kind,
      position: { x, y },
      data: {
        kind,
        presetId,
        title,
        description,
        color: preset.color,
        ...(schemaText !== undefined ? { schemaText } : {}),
        ...(mcpAttachmentIds ? { mcpAttachmentIds } : {}),
        ...(kind === "agent" ? { verification: "proposal" as const } : {}),
      },
    });
  }

  const edges: CanvasEdge[] = [];
  const pairs = new Set<string>();
  for (const item of body.edges) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return fail("A link in this snapshot is unreadable.");
    const edge = item as Record<string, unknown>;
    const id = plain(edge.id, 80);
    const source = plain(edge.source, 80);
    const target = plain(edge.target, 80);
    if (!id || !source || !target || edge.type !== "packet") return fail("A link in this snapshot is unreadable.");
    const src = nodes.find((node) => node.id === source);
    const tgt = nodes.find((node) => node.id === target);
    if (!src || !tgt) return fail("A link in this snapshot points off the graph.");
    const rule = canLink(src.data.kind, tgt.data.kind);
    if (!rule.allowed) return fail(rule.reason);
    const pair = `${source}->${target}`;
    if (pairs.has(pair) || edges.some((existing) => existing.id === id)) return fail("This snapshot repeats a link.");
    pairs.add(pair);
    edges.push({ id, source, target, type: "packet", data: { active: false } });
  }
  return { ok: true, nodes, edges };
}
