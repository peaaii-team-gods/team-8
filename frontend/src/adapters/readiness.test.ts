import { describe, expect, it, vi } from "vitest";
import { liveReadiness, simulatedReadiness } from "./readiness";
import { SERVICE_FEATURES, featureChip } from "../registry/services.manifest";
import type { LiveAdapter } from "./live";

describe("readiness port", () => {
  it("simulated mode is unavailable and has no workspaces", async () => {
    const report = await simulatedReadiness.capabilities();
    for (const feature of SERVICE_FEATURES) {
      expect(featureChip(feature, report)).toBe("unavailable");
    }
    expect(await simulatedReadiness.workspaces()).toEqual([]);
  });

  it("live mode delegates to the adapter", async () => {
    const capabilities = vi.fn().mockResolvedValue({ capabilities: { run_execution: { status: "available" } } });
    const workspaces = vi.fn().mockResolvedValue([{ workspace_id: "ws", project_id: "p", task_id: "t", status: "ready" }]);
    const port = liveReadiness({ capabilities, workspaces } as unknown as LiveAdapter);
    expect(await port.capabilities()).toEqual({ capabilities: { run_execution: { status: "available" } } });
    expect(await port.workspaces()).toHaveLength(1);
    expect(capabilities).toHaveBeenCalledOnce();
    expect(workspaces).toHaveBeenCalledOnce();
  });
});
