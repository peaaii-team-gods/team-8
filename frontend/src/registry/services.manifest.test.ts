import { describe, expect, it } from "vitest";
import { SERVICE_FEATURES, featureLive } from "./services.manifest";

const byId = (id: string) => SERVICE_FEATURES.find((f) => f.id === id)!;
const caps = (entries: Record<string, string>) => ({
  capabilities: Object.fromEntries(Object.entries(entries).map(([k, status]) => [k, { status }])),
});

describe("services.manifest X2 flip", () => {
  it("hosted shell/check are fleet-proven defaults; tier-3 is not flipped", () => {
    expect(byId("execute-shell").liveToday).toBe(true);
    expect(byId("execute-check").liveToday).toBe(true);
    expect(byId("tier3-merge").liveToday).toBe(false);
  });

  it("a fetched backend report wins over the flipped default", () => {
    const off = caps({ shell_execution: "unavailable", tool_execution: "unavailable" });
    expect(featureLive(byId("execute-shell"), off)).toBe(false);
    expect(featureLive(byId("execute-check"), off)).toBe(false);
    const on = caps({ shell_execution: "available", tool_execution: "available" });
    expect(featureLive(byId("execute-shell"), on)).toBe(true);
    expect(featureLive(byId("execute-check"), on)).toBe(true);
  });

  it("manifest default applies only when no capabilities were fetched", () => {
    expect(featureLive(byId("execute-shell"), null)).toBe(true);
    expect(featureLive(byId("tier3-merge"), null)).toBe(false);
  });
});
