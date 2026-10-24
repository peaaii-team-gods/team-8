import { describe, expect, it, vi } from "vitest";
import {
  CANVAS_SNAPSHOT_FILENAME,
  CANVAS_SNAPSHOT_VERSION,
  buildCanvasSnapshot,
  downloadCanvasSnapshot,
  parseCanvasSnapshot,
  serializeCanvasSnapshot,
} from "./canvasSnapshot";
import type { CanvasNode } from "./store";

const agent = (): CanvasNode => ({
  id: "agent-1",
  type: "agent",
  position: { x: 12, y: 24 },
  data: {
    kind: "agent",
    presetId: "builder",
    title: "Builder",
    description: "Maps bounded science fields from lake evidence",
    color: "emerald",
    schemaText: "{\"type\":\"object\"}",
    mcpAttachmentIds: ["knowledge-mcp"],
    status: "done",
    output: "secret model text",
    verification: "verified",
  },
});

describe("canvas snapshot", () => {
  it("exports the graph only and imports it as a fresh proposal", () => {
    const doc = buildCanvasSnapshot([agent()], [{
      id: "e-1", source: "missing", target: "agent-1", type: "packet", data: { active: true, packetLabel: "ran" },
    }]);
    const text = serializeCanvasSnapshot(doc);
    expect(doc.schema_version).toBe(CANVAS_SNAPSHOT_VERSION);
    expect(text).not.toMatch(/secret model text|verified|packetLabel|password|authorization|bearer/i);
    expect(text).toContain("knowledge-mcp");
    expect(text).toContain("schemaText");

    const lake: CanvasNode = {
      id: "lake-1", type: "dataLake", position: { x: 1, y: 2 },
      data: { kind: "dataLake", presetId: "clinical-lab", title: "Clinical Lab Panel", description: "Synthetic analyte readings with units", color: "blue" },
    };
    const shared = buildCanvasSnapshot(
      [lake, agent()],
      [{ id: "e-1", source: "lake-1", target: "agent-1", type: "packet", data: { active: true, packetLabel: "ran" } }],
    );
    const parsed = parseCanvasSnapshot(serializeCanvasSnapshot(shared));
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.nodes.map((node) => node.id)).toEqual(["lake-1", "agent-1"]);
    expect(parsed.nodes[1].data.verification).toBe("proposal");
    expect(parsed.nodes[1].data.status).toBeUndefined();
    expect(parsed.nodes[1].data.output).toBeUndefined();
    expect(parsed.nodes[1].data.schemaText).toBe("{\"type\":\"object\"}");
    expect(parsed.nodes[1].data.mcpAttachmentIds).toEqual(["knowledge-mcp"]);
    expect(parsed.edges[0].data).toEqual({ active: false });
  });

  it("rejects a file that is not this graph and does not invent a node", () => {
    const broken = parseCanvasSnapshot("{");
    const empty = parseCanvasSnapshot("{}");
    expect(broken.ok).toBe(false);
    expect(empty.ok).toBe(false);
    if (broken.ok || empty.ok) return;
    expect(broken.error).toMatch(/not JSON/);
    expect(empty.error).toMatch(/not a canvas snapshot/);
    const unknown = parseCanvasSnapshot(JSON.stringify({
      schema_version: CANVAS_SNAPSHOT_VERSION,
      nodes: [{ id: "a", type: "agent", position: { x: 0, y: 0 }, data: { kind: "agent", presetId: "not-a-preset", title: "X", description: "Y", color: "red" } }],
      edges: [],
    }));
    expect(unknown.ok).toBe(false);
    const write = parseCanvasSnapshot(JSON.stringify({
      schema_version: CANVAS_SNAPSHOT_VERSION,
      nodes: [
        { id: "a", type: "agent", position: { x: 0, y: 0 }, data: { kind: "agent", presetId: "builder", title: "Builder", description: "d", color: "emerald" } },
        { id: "l", type: "dataLake", position: { x: 1, y: 1 }, data: { kind: "dataLake", presetId: "clinical-lab", title: "Lab", description: "d", color: "blue" } },
      ],
      edges: [{ id: "e", source: "a", target: "l", type: "packet" }],
    }));
    expect(write.ok).toBe(false);
    if (!write.ok) expect(write.error).toMatch(/do not write lakes/);
  });

  it("downloads the snapshot through an anchor", () => {
    const click = vi.fn();
    const anchor = { href: "", download: "", rel: "", click, remove: vi.fn() } as unknown as HTMLAnchorElement;
    if (typeof URL.createObjectURL !== "function") {
      Object.defineProperty(URL, "createObjectURL", { configurable: true, writable: true, value: () => "" });
      Object.defineProperty(URL, "revokeObjectURL", { configurable: true, writable: true, value: () => undefined });
    }
    vi.spyOn(document, "createElement").mockReturnValue(anchor);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => anchor);
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:snapshot");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    downloadCanvasSnapshot(buildCanvasSnapshot([], []));
    expect(anchor.download).toBe(CANVAS_SNAPSHOT_FILENAME);
    expect(anchor.href).toBe("blob:snapshot");
    expect(click).toHaveBeenCalledOnce();
  });
});
