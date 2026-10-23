import { describe, expect, it, vi, afterEach } from "vitest";
import { LiveAdapter } from "./live";
import { IdentitySession } from "./identity";
import { pollUntilTerminal, runNodes } from "../run/runNodes";

const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
const adapter = () => new LiveAdapter("http://api", new IdentitySession("http://id", "http://api"));

/** URL-routed fetch so the events poll cannot consume the run/outputs responses. */
function installFetch(script: { polls: Record<string, unknown>[]; outputs?: unknown; events?: unknown; workflowId?: string; runId?: string }) {
  let pollN = 0;
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.endsWith("/v1/workflows")) return json({ workflow_id: script.workflowId ?? "w1" });
    if (url.endsWith("/v1/runs")) return json({ run_id: script.runId ?? "r1" });
    if (url.includes("/events")) return json(script.events ?? { events: [], next_after_seq: 0 });
    if (url.endsWith("/outputs")) return json(script.outputs ?? { outputs: [] });
    if (url.includes("/files") || url.includes("/changes")) return json({ files: [] });
    const body = script.polls[Math.min(pollN, script.polls.length - 1)];
    pollN += 1;
    return json(body);
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

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
    const fetchMock = installFetch({
      polls: [
        { status: "running", completion_basis: "agent_reported" },
        { status: "succeeded", completion_basis: "agent_reported" },
      ],
      outputs: { outputs: [{ content: "ok" }] },
    });
    const a = adapter();
    const handle = await a.run("a1", { schema_version: "workflow.v1" } as never);
    // backend create contract: POST /v1/workflows with {workflow} wrapper
    expect(fetchMock.mock.calls[0][0]).toBe("http://api/v1/workflows");
    const createInit = fetchMock.mock.calls[0][1] as RequestInit | undefined;
    expect(JSON.parse(String(createInit?.body))).toEqual({ workflow: { schema_version: "workflow.v1" } });
    expect(JSON.parse(String((fetchMock.mock.calls[1][1] as RequestInit).body))).toEqual({ workflow_id: "w1", paid_inference_consent: false });
    expect(handle).toEqual({ nodeId: "a1", runId: "r1" });
    const out = await pollUntilTerminal(a, handle, { sleep: async () => undefined, intervalMs: 0 });
    expect(fetchMock.mock.calls.map((c) => String(c[0]))).toContain("http://api/v1/runs/r1/outputs");
    expect(out.status).toBe("succeeded");
    expect(out.basis).toBe("agent_reported");
    expect(out.output).toContain("ok");
  });

  it("keeps run-body token cost and event files without letting events steal the poll", async () => {
    const said: string[] = [];
    installFetch({
      polls: [
        { status: "running" },
        { status: "succeeded", completion_basis: "agent_reported", usage: { prompt_tokens: 11, completion_tokens: 7, cost_usd: 0.02 } },
      ],
      outputs: { outputs: [{ content: "ok" }] },
      events: {
        next_after_seq: 2,
        events: [
          { seq: 1, type: "assistant_message", content: "hello from tick" },
          { seq: 2, type: "workspace_file", payload: { path: "work/a.ts", kind: "added", summary: "new file" } },
        ],
      },
    });
    const out = await pollUntilTerminal(adapter(), { nodeId: "a1", runId: "r9" }, {
      sleep: async () => undefined,
      intervalMs: 0,
      onEvents: (_h, ev) => said.push(...ev.messages),
    });
    expect(out.status).toBe("succeeded");
    expect(out.usage).toMatchObject({ promptTokens: 11, completionTokens: 7, totalTokens: 18, costUsd: 0.02, source: "live" });
    expect(out.workspace).toEqual([expect.objectContaining({ path: "work/a.ts", kind: "added", agentId: "a1" })]);
    expect(said).toContain("hello from tick");
  });

  it("runNodes maps a live run to queued -> processing -> done, labelled as proposal", async () => {
    installFetch({
      runId: "r2",
      polls: [
        { status: "running" },
        { status: "succeeded", completion_basis: "agent_reported" },
      ],
      outputs: { outputs: [{ content: "done" }] },
    });
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

  it("lists workspace runs without model text and omits the Identity cookie", async () => {
    const session = new IdentitySession("http://id", "http://api");
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/password/login")) return json({ access_token: "tok", csrf_token: "c", user: { id: "1", username: "ada", roles: [] } });
      if (url.endsWith("/v1/workspaces")) return json({ workspaces: [{ workspace_id: "ws", project_id: "p", task_id: "t", status: "ready" }] });
      if (url.includes("/v1/runs?")) {
        return json({
          runs: [{
            run_id: "run-1", status: "succeeded", completion_basis: "agent_reported",
            workflow_id: "wf-1", workspace_id: "ws", created_at: "2026-10-23T00:00:00Z",
            output: "SECRET TEXT", content: "also secret",
          }],
        });
      }
      if (url.endsWith("/v1/runs/run-1")) return json({ run_id: "run-1", status: "succeeded", completion_basis: "agent_reported", content: "SECRET TEXT" });
      return json({});
    });
    vi.stubGlobal("fetch", fetchMock);
    const a = new LiveAdapter("http://api", session);
    await session.login("ada", "pw");
    const page = await a.listRuns();
    expect(page.runs).toEqual([{
      runId: "run-1", workflowId: "wf-1", workspaceId: "ws", status: "succeeded",
      completionBasis: "agent_reported", createdAt: "2026-10-23T00:00:00Z", updatedAt: null,
    }]);
    expect(JSON.stringify(page)).not.toContain("SECRET");
    const listCall = fetchMock.mock.calls.find((c) => String(c[0]).includes("/v1/runs?"));
    expect(String(listCall?.[0])).toContain("workspace_id=ws");
    expect((listCall?.[1] as RequestInit).credentials).toBe("omit");
    expect(((listCall?.[1] as RequestInit).headers as Record<string, string>).authorization).toBe("Bearer tok");
    expect(fetchMock.mock.calls.some((c) => String(c[0]).includes("/outputs"))).toBe(false);
    const detail = await a.runDetail("run-1");
    expect(detail.summary).toBe("succeeded · agent_reported. Model text is not loaded.");
    expect(JSON.stringify(detail)).not.toContain("SECRET");
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("does not invent runs when the account has no workspace", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ workspaces: [] })));
    const page = await adapter().listRuns();
    expect(page.runs).toEqual([]);
    expect(page.note).toMatch(/workspace/i);
    expect(vi.mocked(fetch).mock.calls.some((c) => String(c[0]).includes("/v1/runs"))).toBe(false);
  });

  it("pollUntilTerminal is bounded on timeout", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => json({ status: "running" })));
    const out = await pollUntilTerminal(adapter(), { nodeId: "a1", runId: "r1" }, { sleep: async () => undefined, intervalMs: 10, timeoutMs: 20 });
    expect(out.status).toBe("unknown");
    expect(out.state).toBe("running");
  });
});
