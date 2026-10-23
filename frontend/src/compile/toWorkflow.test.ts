import { describe, expect, it } from "vitest";
import { compileAgent, compileGraph, hostedAllowedTools, selectBinding, type WorkspaceBinding } from "./toWorkflow";
import { defaultSchemaText } from "../registry/schemas";
import { SERVICE_FEATURES } from "../registry/services.manifest";
import type { CanvasNode } from "../state/store";

// REAL backend shape (integrate-backend app/main.py capabilities(),
// app/public_models.py Capability): nested {status, reason_code, detail}.
const caps = (entries: Record<string, { status: string; reason_code?: string | null; detail?: string }>) => ({
  capabilities: Object.fromEntries(
    Object.entries(entries).map(([k, e]) => [k, { reason_code: null, detail: "", ...e }]),
  ),
});
const available = {
  shell_execution: { status: "available" },
  tool_execution: { status: "available" },
};

const node = (id: string, kind: "agent" | "dataLake", presetId: string): CanvasNode =>
  ({ id, type: kind, position: { x: 0, y: 0 }, data: { kind, presetId, title: presetId, description: "", color: "blue" } });
const agent = node("a1", "agent", "builder");
// B10: emission also requires a real binding; B9 ON-cases supply one.
const aBinding: WorkspaceBinding = { workspace_id: "ws_abc123", project_id: "prj_abc123", task_id: "task_abc123", status: "ready" };
const toolsOf = (capabilities?: Record<string, unknown> | null) =>
  compileAgent(agent, [], [agent], "test01", capabilities, aBinding).allowed_tools;

describe("B9 hosted tool emission — ON only under a fetched available report", () => {
  it("emits both hosted tools when both capabilities report available", () => {
    expect(toolsOf(caps(available))).toEqual(["execute_shell", "execute_check"]);
  });

  it("emits each tool independently under its own capability key", () => {
    expect(toolsOf(caps({ shell_execution: { status: "available" } }))).toEqual(["execute_shell"]);
    expect(toolsOf(caps({ tool_execution: { status: "available" } }))).toEqual(["execute_check"]);
  });

  it("compileGraph threads the report to every agent workflow", () => {
    const lake = node("l1", "dataLake", "clinical-lab");
    const out = compileGraph([agent, lake], [{ id: "e1", source: "l1", target: "a1" }], "n1", caps(available), aBinding);
    expect(out[0].workflow.allowed_tools).toEqual(["execute_shell", "execute_check"]);
  });

  it("guidance stops forbidding tool calls only when tools are emitted", () => {
    expect(compileAgent(agent, [], [agent], "n", caps(available), aBinding).task_guidance.join(" "))
      .not.toContain("Do not execute code");
    expect(compileAgent(agent, [], [agent], "n").task_guidance.join(" "))
      .toContain("Do not execute code, call tools");
  });
});

describe("B9 hosted tool emission — OFF otherwise (exactly today's output)", () => {
  it("emits [] when unavailable, unknown, or missing", () => {
    expect(toolsOf(caps({ shell_execution: { status: "unavailable", reason_code: "shell_execution_not_verified" }, tool_execution: { status: "unavailable" } }))).toEqual([]);
    expect(toolsOf(caps({ shell_execution: { status: "unknown", reason_code: "workspace_provider_readiness_unverified" }, tool_execution: { status: "unknown" } }))).toEqual([]);
    expect(toolsOf(caps({}))).toEqual([]);
    expect(toolsOf({})).toEqual([]);
  });

  it("emits [] when not fetched (null/omitted) — manifest defaults never emit", () => {
    // X2 manifest defaults claim shell/check liveToday; the compiler must
    // ignore them: only a fetched backend report can turn emission on.
    expect(SERVICE_FEATURES.find((f) => f.id === "execute-shell")!.liveToday).toBe(true);
    expect(toolsOf(null)).toEqual([]);
    expect(toolsOf(undefined)).toEqual([]);
    expect(compileAgent(agent, [], [agent], "n").allowed_tools).toEqual([]);
  });

  it("rejects flat legacy and malformed capability shapes", () => {
    expect(hostedAllowedTools({ shell_execution: "available", tool_execution: true })).toEqual([]);
    expect(hostedAllowedTools({ capabilities: { shell_execution: "available" } })).toEqual([]);
    expect(hostedAllowedTools({ capabilities: { shell_execution: { status: true } } })).toEqual([]);
    expect(hostedAllowedTools(null)).toEqual([]);
    expect(hostedAllowedTools("available")).toEqual([]);
  });

  it("backend-wins both directions against the manifest default", () => {
    const off = caps({ shell_execution: { status: "unavailable" }, tool_execution: { status: "unavailable" } });
    expect(toolsOf(off)).toEqual([]); // fetched off beats liveToday:true
    expect(toolsOf(caps(available))).toEqual(["execute_shell", "execute_check"]); // fetched on emits
  });
});

describe("B10 binding: emission requires available AND a real binding", () => {
  const binding: WorkspaceBinding = { workspace_id: "ws_abc123", project_id: "prj_abc123", task_id: "task_abc123", branch: "agent/task_abc123", status: "ready" };
  const bound = (capabilities?: Record<string, unknown> | null, b?: WorkspaceBinding | null) =>
    compileAgent(agent, [], [agent], "test01", capabilities, b);

  it("carries real project/task/workspace ids when bound and available", () => {
    const wf = bound(caps(available), binding);
    expect(wf.allowed_tools).toEqual(["execute_shell", "execute_check"]);
    expect(wf.workspace_id).toBe("ws_abc123");
    expect(wf.project_id).toBe("prj_abc123");
    expect(wf.task_id).toBe("task_abc123");
    const viaGraph = compileGraph([agent], [], "n1", caps(available), binding);
    expect(viaGraph[0].workflow.project_id).toBe("prj_abc123");
  });

  it("available without a binding emits [] and keeps the synthetic path", () => {
    for (const b of [null, undefined]) {
      const wf = bound(caps(available), b);
      expect(wf.allowed_tools).toEqual([]);
      expect(wf.workspace_id).toBe("canvas_test01_builder");
      expect(wf.project_id).toBeUndefined();
      expect(wf.task_id).toBeUndefined();
    }
  });

  it("binding without an available report emits [] and keeps the synthetic path", () => {
    const wf = bound(caps({ shell_execution: { status: "unknown" }, tool_execution: { status: "unknown" } }), binding);
    expect(wf.allowed_tools).toEqual([]);
    expect(wf.workspace_id).toBe("canvas_test01_builder");
    expect(wf.project_id).toBeUndefined();
  });

  it("selectBinding auto-binds exactly one ready workspace, never guesses", () => {
    const other: WorkspaceBinding = { ...binding, workspace_id: "ws_other", project_id: "prj_other", task_id: "task_other" };
    expect(selectBinding([binding])).toEqual(binding);
    expect(selectBinding([])).toBeNull();
    expect(selectBinding(null)).toBeNull();
    expect(selectBinding([binding, other])).toBeNull();
    expect(selectBinding([{ ...binding, status: "discarded" }])).toBeNull();
    expect(selectBinding([binding, other], "ws_other")).toEqual(other);
    expect(selectBinding([binding], "ws_missing")).toBeNull();
  });
});

describe("multi-lake evidence and MCP declarations", () => {
  const lake = (id: string, presetId: string) => node(id, "dataLake", presetId);
  const withMcp = (ids: string[]) => ({ ...agent, data: { ...agent.data, mcpAttachmentIds: ids } });

  it("compiles every tethered lake into evidence", () => {
    const clinical = lake("l1", "clinical-lab");
    const medicare = lake("l2", "medicare");
    const wf = compileAgent(agent, [
      { id: "e1", source: "l1", target: "a1" },
      { id: "e2", source: "l2", target: "a1" },
    ], [agent, clinical, medicare], "n");
    const evidence = JSON.parse(wf.inputs.evidence) as { lake: string; records: { specimen_id?: string; record_id?: string }[] }[];
    expect(evidence.map((row) => row.lake)).toEqual(["clinical-lab", "medicare"]);
    expect(evidence[0].records.some((r) => r.specimen_id === "syn-lab-001")).toBe(true);
    expect(evidence[1].records.some((r) => r.record_id === "syn-mcr-001")).toBe(true);
    expect(wf.inputs.evidence).not.toMatch(/ssn|mrn|patient/i);
  });

  it("records MCP declarations and does not invent hosted tools", () => {
    const attached = withMcp(["coding-mcp", "knowledge-mcp", "shell-mcp", "not-a-real-mcp"]);
    const wf = compileAgent(attached, [], [attached], "n");
    expect(wf.allowed_tools).toEqual([]);
    const declared = JSON.parse(wf.inputs.mcp_attachments!) as { id: string; posture: string }[];
    expect(declared.map((row) => row.id)).toEqual(["coding-mcp", "knowledge-mcp", "shell-mcp"]);
    expect(declared.every((row) => row.posture === "declared")).toBe(true);
    expect(wf.task_guidance.join(" ")).toContain("do not add tools");
  });

  it("live available shell stays a declaration unless a binding exists, and never adds tools by itself", () => {
    const attached = withMcp(["shell-mcp", "knowledge-mcp"]);
    const unbound = compileAgent(attached, [], [attached], "n", caps(available), null, "live");
    expect(unbound.allowed_tools).toEqual([]);
    const unboundRows = JSON.parse(unbound.inputs.mcp_attachments!) as { id: string; posture: string }[];
    expect(unboundRows.find((row) => row.id === "shell-mcp")?.posture).toBe("declared");
    const bound = compileAgent(attached, [], [attached], "n", caps({
      ...available,
      "tools.workspace_search": { status: "available" },
    }), aBinding, "live");
    expect(bound.allowed_tools).toEqual(["execute_shell", "execute_check"]);
    const rows = JSON.parse(bound.inputs.mcp_attachments!) as { id: string; posture: string }[];
    expect(rows.find((row) => row.id === "shell-mcp")?.posture).toBe("executable");
    expect(rows.find((row) => row.id === "knowledge-mcp")?.posture).toBe("declared");
    expect(bound.allowed_tools).not.toContain("knowledge-mcp");
    expect(bound.allowed_tools).not.toContain("shell-mcp");
  });
});

describe("output schema input", () => {
  it("sends a valid hand-edited schema and ignores invalid JSON", () => {
    const withSchema = { ...agent, data: { ...agent.data, schemaText: defaultSchemaText("builder") } };
    const wf = compileAgent(withSchema, [], [withSchema], "n");
    expect(wf.inputs.output_schema).toContain("mapping.v1");
    expect(wf.task_guidance.join(" ")).toContain("inputs.output_schema");
    const broken = { ...agent, data: { ...agent.data, schemaText: "{not json" } };
    expect(compileAgent(broken, [], [broken], "n").inputs.output_schema).toBeUndefined();
    expect(compileAgent(agent, [], [agent], "n").inputs.output_schema).toBeUndefined();
  });
});

describe("B9 no-tier3 / no other tools, ever", () => {
  it("never emits tier-3 or any non-hosted tool even if reported available", () => {
    const everything = caps({
      ...available,
      approval_tier3_elevation: { status: "available" },
      run_execution: { status: "available" },
    });
    const tools = toolsOf(everything);
    expect(tools).toEqual(["execute_shell", "execute_check"]);
    expect(tools).not.toContain("approval_tier3_elevation");
    expect(JSON.stringify(tools)).not.toMatch(/tier3|mock|write_file|edit|workspace_/);
  });
});
