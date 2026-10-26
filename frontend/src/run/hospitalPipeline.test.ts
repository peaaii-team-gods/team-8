import { afterEach, describe, expect, it, vi } from "vitest";
import { ANALYST_INPUT_CAP, analystSqlRows, pipelineHeaders, pipelineRequest } from "./hospitalPipeline";

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
});
