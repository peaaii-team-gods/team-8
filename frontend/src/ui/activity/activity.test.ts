import { describe, expect, it } from "vitest";
import { focusFromActivity, loadRemoteActivity, publicDetail, stageActivity } from "./activity";

describe("activity timeline", () => {
  it("keeps remote loading as an empty seam and drops output bodies", () => {
    expect(loadRemoteActivity()).toEqual([]);
    expect(publicDetail('{"reading_column":"reading"}')).toBeUndefined();
    expect(stageActivity("idle")).toBeNull();
    expect(stageActivity("complete")?.title).toBe("Stage Complete · proposal");
    expect(focusFromActivity({ nodeId: "agent-1" })).toBe("agent-1");
    expect(focusFromActivity({})).toBeNull();
  });
});
