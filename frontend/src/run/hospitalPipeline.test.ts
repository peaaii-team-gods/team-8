import { afterEach, describe, expect, it, vi } from "vitest";
import { hospitalModelAdapter, hospitalModelGate, ANALYST_INPUT_CAP, analystSqlRows, hospitalModels, pipelineHeaders, pipelineRequest, type PipelineRecord } from "./hospitalPipeline";
import { tablesFromReport } from "../ui/HospitalReportTable";
import { useStore } from "../state/store";
import type { RhmAdapter } from "../adapters/RhmAdapter";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";

afterEach(() => { vi.unstubAllGlobals(); });

describe("hospital pipeline client bearer", () => {
  it("attaches the identity bearer on live /api/pipeline calls", async () => {
    const seen: RequestInit[] = [];
    vi.stubGlobal("fetch", async (_url: string, init?: RequestInit) => {
      seen.push(init ?? {});
      return new Response(JSON.stringify({ run_id: "run_live" }), { headers: { "Content-Type": "application/json" } });
    });
    await pipelineRequest("/api/pipeline/run", { source: "south-shore", inject_error: false }, undefined, "access-token");
    expect(pipelineHeaders("access-token")).toEqual({ Authorization: "Bearer access-token" });
    expect(seen[0].headers).toMatchObject({ Authorization: "Bearer access-token", "Content-Type": "application/json" });
  });

  it("omits Authorization when no token is present", async () => {
    const seen: RequestInit[] = [];
    vi.stubGlobal("fetch", async (_url: string, init?: RequestInit) => {
      seen.push(init ?? {});
      return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
    });
    await pipelineRequest("/api/pipeline/runs/run_local");
    expect(pipelineHeaders(null, true)).toEqual({ "Content-Type": "application/json" });
    expect(seen[0].headers).toEqual({ "Content-Type": "application/json" });
  });

  it("keeps the analyst prompt under the input cap", () => {
    const rows = Array.from({ length: 6938 }, (_, index) => ({ billing_code: String(index), n_MA: 1, description: "x".repeat(80) }));
    const text = analystSqlRows({ type: "top10", rows, row_count: 6938, spread: [{ payer_name: "Aetna", n: 10 }], baseline_label: "Medicare Advantage rates in this hospital's file" });
    expect(text.length).toBeLessThanOrEqual(ANALYST_INPUT_CAP);
    expect(JSON.parse(text).top_groups).toHaveLength(10);
    expect(JSON.parse(text).aggregates.n_groups).toBe(6938);
  });

  it("bounds even oversized individual groups", () => {
    const text = analystSqlRows({ type: 'top10', rows: [{ description: 'x'.repeat(100_000) }], spread: [], baseline_label: 'x'.repeat(100_000) });
    expect(text.length).toBeLessThanOrEqual(ANALYST_INPUT_CAP);
  });

  it("dispatches the live Analyst with all 6938 full-file groups available", async () => {
    useStore.getState().loadScenario('hospital-pipeline');
    const report = tablesFromReport(readFileSync('../fixtures/hospital-full-report.md', 'utf8'));
    expect(report.rows).toHaveLength(6938);
    const record: PipelineRecord = { status: 'completed', steps: [{ node: 'analyst', status: 'completed', counts: {}, telemetry: [
      { type: 'evidence', source_excerpt: {} },
      { type: 'top10', rows: report.rows, row_count: report.rows.length, spread: report.spread },
    ] }] };
    const dispatched: string[] = [];
    const adapter: RhmAdapter = { mode: 'live', capabilities: async () => null, cancel: async () => undefined,
      run: async (nodeId, workflow) => {
        if (workflow.inputs.sql_rows) dispatched.push(workflow.inputs.sql_rows);
        return { nodeId, runId: 'local-model-test' };
      },
      poll: async handle => ({ nodeId: handle.nodeId, status: 'succeeded', basis: 'agent_reported', output: JSON.stringify({ summary: 'Full-file comparisons available.' }) }),
    };
    vi.stubGlobal('fetch', async () => new Response(JSON.stringify({ ok: true, mapping: { valid: true, matches_golden: true } })));
    const view = await hospitalModels(adapter, 'test', record, 0, new AbortController().signal, () => undefined);
    expect(dispatched).toHaveLength(1);
    expect(dispatched[0].length).toBeLessThan(ANALYST_INPUT_CAP);
    expect(JSON.parse(dispatched[0]).row_count).toBe(6938);
    expect(view.summary).toBe('Full-file comparisons available.');
    expect(view.unavailable).toBeUndefined();
  });
});

describe("hospitalModelGate reasons", () => {
  const live = { mode: "live" } as RhmAdapter;
  const own = { configured: true, host_models_authorized: false, revision: "r", credential_lifetime: "backend_process" } as const;
  const none = { configured: false, host_models_authorized: false, revision: null, credential_lifetime: "backend_process" } as const;
  const ctx = { shellMode: "live", modelReady: true };
  it("names the first failing check", () => {
    expect(hospitalModelGate(live, own, "1", true, { shellMode: "simulated", modelReady: true })).toEqual({ reason: "model off: Crucible is not in live mode" });
    expect(hospitalModelGate(null, own, "1", true, ctx)).toEqual({ reason: "model off: not signed in" });
    expect(hospitalModelGate(live, own, "1", true, { shellMode: "live", modelReady: false })).toEqual({ reason: "model off: selected model not loaded - open Settings" });
    expect(hospitalModelGate(live, null, "1", true, ctx)).toEqual({ reason: "model off: provider status not loaded" });
    expect(hospitalModelGate(live, none, "1", true, ctx)).toEqual({ reason: "model off: no provider configured - add your OpenRouter key in Settings" });
    expect(hospitalModelGate(live, own, "1", false, ctx)).toEqual({ reason: "model off: paid consent not ticked in Settings" });
    expect(hospitalModelGate(live, own, "0", true, ctx)).toEqual({ reason: "model off: spend cap is 0 - set a cap in Settings" });
    expect(hospitalModelGate(live, { ...none, host_models_authorized: true }, "-1", false, ctx)).toEqual({ reason: "model off: spend cap is 0 - set a cap in Settings" });
    expect(hospitalModelGate(live, own, "1", true, ctx)).toEqual({ adapter: live });
  });
  const record: PipelineRecord = { status: "completed", steps: [{ node: "analyst", status: "completed", counts: {}, telemetry: [
    { type: "evidence", source_excerpt: {} }, { type: "top10", rows: [], row_count: 0, spread: [] }] }] };
  const adapterWith = (run: RhmAdapter["run"], output = "{}"): RhmAdapter => ({ mode: "live", capabilities: async () => null, cancel: async () => undefined, run,
    poll: async handle => ({ nodeId: handle.nodeId, status: "succeeded", output }) });
  it("keeps the run start copy as the reason", async () => {
    useStore.getState().loadScenario("hospital-pipeline");
    vi.stubGlobal("fetch", async () => new Response(JSON.stringify({ ok: true, mapping: { valid: true } })));
    const adapter = adapterWith(async () => { throw new Error("This run needs a spend cap. Choose Premium in Settings and set one."); });
    const view = await hospitalModels(adapter, "t", record, 0, new AbortController().signal, () => undefined);
    expect(view.reason).toBe("This run needs a spend cap. Choose Premium in Settings and set one.");
  });
  it("reports a parse failure and a failed run reason", async () => {
    useStore.getState().loadScenario("hospital-pipeline");
    const parse = await hospitalModels(adapterWith(async nodeId => ({ nodeId, runId: "1" }), "not json"), "t", record, 0, new AbortController().signal, () => undefined);
    expect(parse.reason).toBe("model reply failed to parse");
    const failed: RhmAdapter = { ...adapterWith(async nodeId => ({ nodeId, runId: "1" })), poll: async handle => ({ nodeId: handle.nodeId, status: "failed", reason: "provider_unavailable" }) };
    const view = await hospitalModels(failed, "t", record, 0, new AbortController().signal, () => undefined);
    expect(view.reason).toBe("model run failed: provider_unavailable");
  });
});

 it("allows own-key hospital proposals only after explicit consent and cap", () => {
   const adapter = {mode:"live"} as RhmAdapter;
   const status = {configured:true,host_models_authorized:false,revision:null,credential_lifetime:"backend_process"} as const;
   expect(hospitalModelAdapter(adapter,status,"1",true)).toBe(adapter);
   expect(hospitalModelAdapter(adapter,status,"1",false)).toBeNull();
   expect(hospitalModelAdapter(adapter,status,"0",true)).toBeNull();
 });
