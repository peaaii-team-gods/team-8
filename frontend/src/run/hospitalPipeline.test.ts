import { afterEach, describe, expect, it, vi } from "vitest";
import { ANALYST_INPUT_CAP, analystSqlRows, hospitalModels, pipelineHeaders, pipelineRequest, type PipelineRecord } from "./hospitalPipeline";
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
