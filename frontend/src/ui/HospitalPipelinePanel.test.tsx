import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import HospitalPipelinePanel from "./HospitalPipelinePanel";
import { scenarioById } from "../registry/scenarios";
import { canLink } from "../registry/linkRules";
import { useStore } from "../state/store";
import { hospitalModelAdapter } from "../run/hospitalPipeline";
import type { RhmAdapter, RunHandle } from "../adapters/RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
// @ts-ignore -- test-only Node builtins
import { readFileSync } from "node:fs";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const reportMd = "# Hospital rate comparison\n\nMedicare Managed Care Plan is a single-plan baseline: no comparison group has MA n>=2 in this file.\n";
const report = "Recorded SQL report: 5 eligible groups";
const reportResponse = () => new Response(reportMd, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
// Captured from actual PipelineService.route POST /run then GET /runs/<id> on fresh-main 605e6f0e; public-network source fetch, inject_error=true, completed GET. No CMS contacts or downloaded source body are included.
const realResult = JSON.parse(readFileSync("src/ui/fixtures/hospital-run.real.json", "utf8"));
const result = { status: "completed", report_md: report, steps: [
  { node: "source", status: "completed", counts: {}, telemetry: [{ type: "trace", label: "cached", trace: [], sha256: "0ba485a4805fae35fd4f1ed425750cf655aaa05c09df0c2939fce07e5b6881bd", golden_source_sha256: "0ba485a4805fae35fd4f1ed425750cf655aaa05c09df0c2939fce07e5b6881bd" }] },
  { node: "builder", status: "completed", counts: {}, telemetry: [
    { type: "repair", label: "injected", checks: [] },
  ] },
  { node: "store", status: "completed", counts: { row_count: 42 }, telemetry: [{ type: "artifact", label: "local SQLite" }] },
  { node: "analyst", status: "completed", counts: {}, telemetry: [{ type: "top10", rows: [{ billing_code: "12345", rate: 120 }], baseline_label: "Medicare Advantage rates in this hospital's file" }] },
] };
const response = (data: unknown) => new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
const load = (name: string) => JSON.parse(readFileSync(`../fixtures/${name}`, "utf8"));
function modelSetup(summary: string, broken = false) {
  useStore.getState().loadScenario("hospital-pipeline");
  const mapping = load("hospital-golden-mapping.json"), repair = load("hospital-golden-repair.json");
  const snapshot = structuredClone(result);
  const evidence = { type: "evidence", source_excerpt: { standard_charge_dollar: 120 }, drift_excerpt: { standard_charge_amount: 120 }, golden_mapping: mapping, golden_repair: repair };
  (snapshot.steps[1].telemetry as unknown[]).push(evidence);
  (snapshot.steps[1].telemetry as unknown[]).push({ type: "checks", checks: [{ name: "fields.rate", pass: false, expected: "standard_charge_dollar", actual: "missing" }, { name: "after_repair", pass: true }] });
  const requests: { url: string; body: any }[] = [], workflows: WorkflowV1[] = [];
  vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
    const body = init?.body ? JSON.parse(init.body as string) : undefined; requests.push({ url, body });
    if (url === "/api/pipeline/run") return response({ run_id: "run-model" });
    if (url === "/api/pipeline/runs/run-model") return response(snapshot);
    if (url.endsWith("/artifacts/report.md")) return reportResponse();
    if (url.endsWith("/proposals")) return response({ mapping: { valid: true, matches_golden: true, diffs: [] }, repair: { valid: true, fixed_rows: 42, remaining_errors: [] } });
    if (url.endsWith("/summary")) return response({ ok: !body.text.includes("99999"), violations: body.text.includes("99999") ? ["99999"] : [] });
    throw new Error("unexpected URL");
  });
  const outputs = [mapping, { action: "replace_mapping", mapping: repair }, { summary }];
  const adapter: RhmAdapter = { mode: "live", capabilities: async () => null,
    run: async (nodeId, workflow) => { if (broken) throw new Error("offline model"); workflows.push(workflow); return { nodeId, runId: String(workflows.length - 1) }; },
    poll: async (handle: RunHandle) => ({ nodeId: handle.nodeId, status: "succeeded", basis: "agent_reported", output: JSON.stringify(outputs[Number(handle.runId)]) }), cancel: async () => undefined };
  return { adapter, workflows, requests, mapping, repair };
}
const setup = (exported: unknown = { status: "unavailable", reason: "drive_export_unavailable" }, runResult = result) => {
  const requests: { url: string; init?: RequestInit }[] = [];
  vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
    requests.push({ url, init });
    if (url === "/api/pipeline/run") return response({ run_id: "run-test" });
    if (url === "/api/pipeline/runs/run-test") return response(runResult);
    if (url.endsWith("/artifacts/report.md")) return reportResponse();
    if (url === "/api/pipeline/runs/run-test/export") return response(exported);
    throw new Error("Unexpected request");
  });
  return requests;
};

describe("hospital canvas deterministic record", () => {
  it("adds five ordered nodes and preserves all existing tether rules", () => {
    const scenario = scenarioById("hospital-pipeline");
    expect(scenario).toBeDefined();
    const graph = scenario!.build((prefix) => `${prefix}-${Math.random()}`);
    expect(graph.nodes.map(n => n.data.title)).toEqual(["Scout", "Architect", "Refinery", "Ledger", "Analyst"]);
    expect(graph.edges).toHaveLength(4);
    for (const edge of graph.edges) {
      const from = graph.nodes.find(n => n.id === edge.source)!, to = graph.nodes.find(n => n.id === edge.target)!;
      expect(canLink(from.data.kind, to.data.kind).allowed).toBe(true);
    }
    expect(canLink("agent", "dataLake").allowed).toBe(false);
    expect(scenarioById("mrf-pipeline")).toBeDefined();
  });

  it("runs the relative API, displays recorded labels and artifacts, and never auto-exports", async () => {
    const requests = setup();
    render(<HospitalPipelinePanel adapter={null} budget={0} />);
    expect(screen.queryByRole("button", { name: "Export to Google Drive (direct API, not MCP)" })).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "Golden SQL report" });
    expect(requests.every(r => r.url.startsWith("/api/pipeline/"))).toBe(true);
    expect(JSON.parse(requests[0].init!.body as string)).toEqual({ source: "south-shore", inject_error: false });
    expect(requests.some(r => r.url.endsWith("/export"))).toBe(false);
    expect(screen.getAllByText(/cached/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/injected/).length).toBeGreaterThan(0);
    expect(screen.getByText("Medicare Advantage rates in this hospital's file")).toBeTruthy();
    expect(screen.getByRole("link", { name: "rows.csv" }).getAttribute("href")).toBe("/api/pipeline/runs/run-test/artifacts/rows.csv");
    expect(screen.getByText("model unavailable, golden path used")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Export to Google Drive (direct API, not MCP)" }));
    await screen.findByText("Drive not configured");
    const exportRequest = requests.find(r => r.url.endsWith("/export"))!;
    expect(exportRequest.init?.method).toBe("POST");
    expect(exportRequest.init?.body).toBeUndefined();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders the real run's source trace, ordered furnace checks, SQLite count, and complete SQL report", async () => {
    useStore.getState().loadScenario("hospital-pipeline");
    setup(undefined, realResult);
    render(<HospitalPipelinePanel adapter={null} budget={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByText(/183335 rows - local SQLite/);
    const sourceSummary = screen.getByText(/Scout (fetch cached|files fetched)/);
    const sourceDetails = sourceSummary.parentElement?.querySelector("details");
    expect(sourceDetails?.open).toBe(false);
    expect(sourceDetails?.querySelector("pre")?.textContent).toContain("https://www.southshorehealth.org/cms-hpt.txt");
    expect(sourceDetails?.querySelector("pre")?.textContent).toContain("https://zencloud-southshorehealth.s3.us-east-1.amazonaws.com/www.southshorehealth.org/assets/2026-03/042769210_south-shore-hospital_standardcharges.json");
    expect(sourceDetails?.querySelector("pre")?.textContent).toContain("0ba485a4805fae35fd4f1ed425750cf655aaa05c09df0c2939fce07e5b6881bd");
    expect(screen.getByText(/Golden repair: 127887\/127887 dollar rates restored/)).toBeTruthy();
    expect(screen.getByText("Golden SQL report")).toBeTruthy();
    expect(screen.getByText("Commercial vs Medicare Managed Care Plan median, this hospital's file")).toBeTruthy();
    expect(screen.getByText("6938 comparison groups")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Open full report" })).toBeTruthy();
    const detailSummaries = screen.getAllByText("Show details");
    expect(detailSummaries).toHaveLength(4);
    expect(detailSummaries.every(summary => summary.closest("details")?.open === false)).toBe(true);
    expect(screen.getByText("model unavailable, golden path used")).toBeTruthy();
    const source = useStore.getState().nodes.find(node => node.data.presetId === "hospital-source")!;
    expect(JSON.parse(source.data.output!).telemetry.find((event: { type: string }) => event.type === "trace").trace.map((item: { url: string }) => item.url)).toEqual([
      "https://www.southshorehealth.org/cms-hpt.txt",
      "https://zencloud-southshorehealth.s3.us-east-1.amazonaws.com/www.southshorehealth.org/assets/2026-03/042769210_south-shore-hospital_standardcharges.json",
    ]);
    const furnace = useStore.getState().nodes.find(node => node.data.presetId === "mrf-hospital-maintainer")!;
    const furnaceTelemetry = JSON.parse(furnace.data.output!).telemetry;
    expect(furnaceTelemetry.find((event: { type: string }) => event.type === "checks").checks.find((check: { name: string }) => check.name === "fields.rate")).toMatchObject({ pass: false, expected: "standard_charge_dollar", actual: "missing" });
    expect(furnaceTelemetry.find((event: { type: string }) => event.type === "repair").checks.find((check: { name: string }) => check.name === "rows_repaired")).toMatchObject({ pass: true, expected: 127887, actual: 127887 });
  });

  it("labels a sha mismatch as no golden without storing a new field", async () => {
    const snapshot = structuredClone(result);
    snapshot.steps[0].telemetry = [{ type: "trace", label: "cached", trace: [], sha256: "def", golden_source_sha256: "0ba485a4805fae35fd4f1ed425750cf655aaa05c09df0c2939fce07e5b6881bd" }];
    snapshot.steps[3].telemetry = [{ type: "top10", rows: [{ billing_code: "12345" }], row_count: 2, baseline_label: "Medicare Advantage rates in this hospital's file" }];
    setup(undefined, snapshot);
    render(<HospitalPipelinePanel adapter={null} budget={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "No golden for this file" });
    expect(screen.queryByText("Golden SQL report")).toBeNull();
    expect(screen.queryByText(/remains golden/)).toBeNull();
    expect(snapshot.steps[0].telemetry[0].sha256).not.toBe(snapshot.steps[0].telemetry[0].golden_source_sha256);
    expect(JSON.stringify(snapshot)).not.toMatch(/no_golden|no-golden|golden_label/);
  });

  it("exports only on click and shows the returned folder", async () => {
    const requests = setup({ status: "exported", folder_id: "folder-test", folder_link: "https://drive.google.com/drive/folders/folder-test", files: ["rows.csv"] });
    render(<HospitalPipelinePanel adapter={null} budget={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "Golden SQL report" });
    fireEvent.click(screen.getByRole("button", { name: "Export to Google Drive (direct API, not MCP)" }));
    const driveLink = await screen.findByRole("link", { name: "Exported to Drive" });
    expect(driveLink.getAttribute("href")).toBe("https://drive.google.com/drive/folders/folder-test");
    expect(requests.filter(r => r.url.endsWith("/export"))).toHaveLength(1);
  });

  it("polls a running record again after one second and forwards the injected flag", async () => {
    const polls: number[] = [];
    let submitted: unknown;
    vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
      if (url === "/api/pipeline/run") { submitted = JSON.parse(init!.body as string); return response({ run_id: "run-poll" }); }
      if (url.endsWith("/artifacts/report.md")) return reportResponse();
      polls.push(Date.now());
      return response(polls.length === 1 ? { status: "running", steps: [] } : result);
    });
    render(<HospitalPipelinePanel adapter={null} budget={0} />);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "Golden SQL report" }, { timeout: 2500 });
    expect(submitted).toEqual({ source: "south-shore", inject_error: true });
    expect(polls).toHaveLength(2);
    expect(polls[1] - polls[0]).toBeGreaterThanOrEqual(990);
  });

  it("submits model proposals separately and rejects unsupported summary figures", async () => {
    const model = modelSetup("The rate is $99999.");
    render(<HospitalPipelinePanel adapter={model.adapter} budget={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByText("Summary rejected by guard: 1 unsupported figures");
    expect(screen.getByRole("button", { name: "Open full report" })).toBeTruthy();
    expect(screen.getByText("Model repair: valid / matches golden")).toBeTruthy();
    expect(model.requests.filter(r => r.url.endsWith("/proposals")).map(r => r.body))
      .toEqual([{ mapping: model.mapping }, { repair: { action: "replace_mapping", mapping: model.repair } }]);
    expect(model.workflows).toHaveLength(3);
    expect(model.workflows.every(workflow => workflow.allowed_tools.length === 0)).toBe(true);
    expect(model.workflows[0].inputs.evidence).toContain("standard_charge_dollar");
    expect(model.workflows[1].inputs.evidence).toContain("standard_charge_amount");
    expect(JSON.parse(model.workflows[1].inputs.failing_checks)).toEqual([{ name: "fields.rate", pass: false, expected: "standard_charge_dollar", actual: "missing" }]);
    expect(model.workflows[2].inputs.sql_rows).toContain("120");
    expect(model.requests.some(r => r.url.endsWith("/export"))).toBe(false);
    const furnace = useStore.getState().nodes.find(node => node.data.presetId === "mrf-hospital-maintainer")!;
    expect(JSON.parse(furnace.data.output!).modelRepair).toBe("Model repair: valid / matches golden");
    const analyst = useStore.getState().nodes.find(node => node.data.presetId === "hospital-analyst")!;
    expect(JSON.parse(analyst.data.output!).analystText).toBe(reportMd);
    expect(analyst.data.output).not.toContain("99999");
  });

  it("shows a model summary only after this run's guard accepts it", async () => {
    const model = modelSetup("The selected rate is $120.");
    let prepared = false;
    const dispatch = model.adapter.run;
    model.adapter.run = async (...args) => { expect(prepared).toBe(true); return dispatch(...args); };
    render(<HospitalPipelinePanel adapter={model.adapter} budget={0} prepareLocalModel={() => { prepared = true; }} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByText("Model summary · guard passed; recorded report remains golden");
    expect(screen.getByTestId("hospital-report-summary").textContent).toBe("The selected rate is $120.");
    expect(screen.getByRole("button", { name: "Open full report" })).toBeTruthy();
    const analyst = useStore.getState().nodes.find(node => node.data.presetId === "hospital-analyst")!;
    expect(JSON.parse(analyst.data.output!).analystText).toBe(reportMd);
    expect(model.requests.find(r => r.url.endsWith("/summary"))?.body).toEqual({ text: "The selected rate is $120." });
  });

  it("keeps the golden record and a neutral note when the model fails", async () => {
    const model = modelSetup("unused", true);
    render(<HospitalPipelinePanel adapter={model.adapter} budget={0} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByText("model unavailable, golden path used");
    expect(screen.getByRole("button", { name: "Open full report" })).toBeTruthy();
    expect(screen.queryByRole("alert")).toBeNull();
    expect(useStore.getState().pipelineStage).toBe("complete");
  });

  it("tells signed-out live users to sign in and does not call the pipeline", async () => {
    const requests = setup();
    render(<HospitalPipelinePanel adapter={null} budget={0} mode="live" accessToken={null} />);
    expect(screen.getByText("Sign in to run the pipeline")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    expect(requests).toHaveLength(0);
    expect(screen.queryByRole("button", { name: "Export to Google Drive (direct API, not MCP)" })).toBeNull();
  });

  it("surfaces a 401 when a live artifact download fails", async () => {
    vi.stubGlobal("fetch", async (url: string) => {
      if (url === "/api/pipeline/run") return response({ run_id: "run-test" });
      if (url === "/api/pipeline/runs/run-test") return response(result);
      if (url.endsWith("/artifacts/report.md")) return reportResponse();
      if (url.includes("/artifacts/")) return new Response("no", { status: 401 });
      throw new Error("Unexpected request");
    });
    render(<HospitalPipelinePanel adapter={null} budget={0} mode="live" accessToken="live-token" />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "Golden SQL report" });
    fireEvent.click(screen.getByRole("link", { name: "rows.csv" }));
    expect((await screen.findByRole("alert")).textContent).toBe("Artifact unavailable (401)");
  });

  it("surfaces a connection failure when a live artifact download cannot reach the pipeline", async () => {
    vi.stubGlobal("fetch", async (url: string) => {
      if (url === "/api/pipeline/run") return response({ run_id: "run-test" });
      if (url === "/api/pipeline/runs/run-test") return response(result);
      if (url.endsWith("/artifacts/report.md")) return reportResponse();
      if (url.includes("/artifacts/")) throw new TypeError("Failed to fetch");
      throw new Error("Unexpected request");
    });
    render(<HospitalPipelinePanel adapter={null} budget={0} mode="live" accessToken="live-token" />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "Golden SQL report" });
    fireEvent.click(screen.getByRole("link", { name: "rows.csv" }));
    expect((await screen.findByRole("alert")).textContent).toBe("Artifact unavailable: connection failed");
  });

  it("sends the live identity bearer on pipeline run and export", async () => {
    const requests = setup();
    render(<HospitalPipelinePanel adapter={null} budget={0} mode="live" accessToken="live-token" />);
    expect(screen.queryByText("Sign in to run the pipeline")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByRole("heading", { name: "Golden SQL report" });
    expect((requests[0].init?.headers as Record<string, string>).Authorization).toBe("Bearer live-token");
    fireEvent.click(screen.getByRole("button", { name: "Export to Google Drive (direct API, not MCP)" }));
    await screen.findByText("Drive not configured");
    const exported = requests.find(request => request.url.endsWith("/export"))!;
    expect((exported.init?.headers as Record<string, string>).Authorization).toBe("Bearer live-token");
  });

  it("never dispatches a configured remote provider even when its paid gate permits it", async () => {
    const model = modelSetup("unused");
    const gated = hospitalModelAdapter(model.adapter, { configured: true, host_models_authorized: true, revision: "r", credential_lifetime: "backend_process", provider: "openrouter" }, "1", true);
    expect(gated).toBeNull();
    render(<HospitalPipelinePanel adapter={gated} budget={1} />);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    await screen.findByText("model unavailable, golden path used");
    expect(model.workflows).toHaveLength(0);
    expect(model.requests.some(r => r.url.endsWith("/proposals") || r.url.endsWith("/summary"))).toBe(false);
  });
});
