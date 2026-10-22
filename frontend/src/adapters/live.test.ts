import { describe, expect, it, vi, afterEach } from "vitest";
import { LiveAdapter } from "./live";
import { IdentitySession } from "./identity";
import { pollUntilTerminal, runNodes } from "../run/runNodes";

const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
const adapter = () => new LiveAdapter("http://api", new IdentitySession("http://id", "http://api"));

afterEach(() => vi.unstubAllGlobals());

describe("LiveAdapter poll mapping", () => {
  it("maps running to non-terminal unknown with raw state passthrough", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ status: "running", completion_basis: "agent_reported" })));
    const first = await adapter().poll({ nodeId: "a1", runId: "r1" });
    expect(first.status).toBe("unknown");
    expect(first.state).toBe("running");
    expect(first.basis).toBe("agent_reported");
  });

  it("running -> succeeded via run + pollUntilTerminal, basis passthrough", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json({ workflow_id: "w1" }))
      .mockResolvedValueOnce(json({ run_id: "r1" }))
      .mockResolvedValueOnce(json({ status: "running", completion_basis: "agent_reported" }))
      .mockResolvedValueOnce(json({ status: "succeeded", completion_basis: "agent_reported" }))
      .mockResolvedValueOnce(json({ outputs: [{ content: "ok" }] }));
    vi.stubGlobal("fetch", fetchMock);
    const a = adapter();
    const handle = await a.run("a1", { schema_version: "workflow.v1" } as never);
    // backend create contract: POST /v1/workflows with {workflow} wrapper
    expect(fetchMock.mock.calls[0][0]).toBe("http://api/v1/workflows");
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ workflow: { schema_version: "workflow.v1" } });
    expect(handle).toEqual({ nodeId: "a1", runId: "r1" });
    const out = await pollUntilTerminal(a, handle, { sleep: async () => undefined, intervalMs: 0 });
    expect(fetchMock.mock.calls[4][0]).toBe("http://api/v1/runs/r1/outputs");
    expect(out.status).toBe("succeeded");
    expect(out.basis).toBe("agent_reported");
    expect(out.output).toContain("ok");
  });

  it("runNodes maps a live run to queued -> processing -> done, labelled as proposal", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(json({ workflow_id: "w1" }))
      .mockResolvedValueOnce(json({ run_id: "r2" }))
      .mockResolvedValueOnce(json({ status: "running" }))
      .mockResolvedValueOnce(json({ status: "succeeded", completion_basis: "agent_reported" }))
      .mockResolvedValueOnce(json({ outputs: [{ content: "done" }] }));
    vi.stubGlobal("fetch", fetchMock);
    const statuses: string[] = [];
    const handles: string[] = [];
    await runNodes(adapter(), [{ nodeId: "a1", workflow: {} as never }], {
      onStatus: (_id, s, o) => statuses.push(`${s}:${o ?? ""}`),
      onHandle: (h) => handles.push(h.runId),
    }, { sleep: async () => undefined, intervalMs: 0 });
    expect(statuses.map((s) => s.split(":")[0])).toEqual(["queued", "processing", "done"]);
    expect(statuses.at(-1)).toContain("model proposal, agent_reported — not verification");
    expect(handles).toEqual(["r2"]);
  });

  it("workspaces fetches owner-scoped B3 bindings, failure binds nothing", async () => {
    const ws = { workspace_id: "ws_1", project_id: "prj_1", task_id: "task_1", branch: "agent/task_1", status: "ready" };
    const fetchMock = vi.fn().mockResolvedValue(json({ workspaces: [ws, { workspace_id: "bad" }] }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await adapter().workspaces()).toEqual([ws]);
    expect(fetchMock.mock.calls[0][0]).toBe("http://api/v1/workspaces");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 500 })));
    expect(await adapter().workspaces()).toEqual([]);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    expect(await adapter().workspaces()).toEqual([]);
  });

  it("pollUntilTerminal is bounded on timeout", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => json({ status: "running" })));
    const out = await pollUntilTerminal(adapter(), { nodeId: "a1", runId: "r1" }, { sleep: async () => undefined, intervalMs: 10, timeoutMs: 20 });
    expect(out.status).toBe("unknown");
    expect(out.state).toBe("running");
  });
});
