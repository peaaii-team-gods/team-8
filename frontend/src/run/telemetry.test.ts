import { describe, expect, it } from "vitest";
import { addUsage, emptyUsage, parseEvents, parseWorkspaceList, usageFromUnknown } from "./telemetry";

describe("usageFromUnknown", () => {
  it("reads nested usage and cost_usd", () => {
    const u = usageFromUnknown({ status: "running", usage: { prompt_tokens: 10, completion_tokens: 5, cost_usd: 0.0012 } });
    expect(u).toMatchObject({ promptTokens: 10, completionTokens: 5, totalTokens: 15, costUsd: 0.0012, source: "live" });
  });
  it("totals when only prompt/completion present", () => {
    expect(usageFromUnknown({ tokens_in: 3, tokens_out: 4 }).totalTokens).toBe(7);
  });
  it("returns zeros for junk", () => {
    expect(usageFromUnknown(null)).toEqual(emptyUsage("live"));
    expect(usageFromUnknown("x").totalTokens).toBe(0);
  });
});

describe("parseEvents", () => {
  it("walks next_after_seq, messages, files, and tick usage", () => {
    const t = parseEvents({
      next_after_seq: 3,
      events: [
        { seq: 1, type: "model_tick", payload: { prompt_tokens: 20, completion_tokens: 8 } },
        { seq: 2, type: "assistant_message", content: "mapping.v1 on sensor_id" },
        { seq: 3, type: "workspace_file", payload: { path: "work/mapping.json", kind: "added", summary: "proposal" } },
      ],
    }, "a1");
    expect(t.nextAfterSeq).toBe(3);
    expect(t.usage.totalTokens).toBe(28);
    expect(t.messages).toEqual(["mapping.v1 on sensor_id"]);
    expect(t.workspace).toEqual([{ path: "work/mapping.json", kind: "added", summary: "proposal", agentId: "a1" }]);
  });
});

describe("parseWorkspaceList / addUsage", () => {
  it("accepts files[] and tree[]", () => {
    expect(parseWorkspaceList({ files: [{ path: "a.ts", op: "created" }] })).toEqual([{ path: "a.ts", kind: "added" }]);
    expect(parseWorkspaceList({ tree: ["b.ts"] })).toEqual([{ path: "b.ts", kind: "changed" }]);
  });
  it("adds usage and prefers live source", () => {
    const sum = addUsage(emptyUsage("simulated"), { promptTokens: 1, completionTokens: 2, totalTokens: 3, costUsd: 0, source: "live" });
    expect(sum).toMatchObject({ totalTokens: 3, source: "live" });
  });
});
