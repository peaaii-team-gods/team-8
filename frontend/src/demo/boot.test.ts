import { describe, expect, it } from "vitest";
import { bootDemo, demoPath, exitDemoPath } from "./boot";

describe("bootDemo", () => {
  it("stays off without the flag and does not autorun by default", () => {
    expect(bootDemo("")).toEqual({ enabled: false, scenarioId: "pilot-storyboard", autorun: false });
    expect(bootDemo("?demo=1")).toEqual({ enabled: true, scenarioId: "pilot-storyboard", autorun: false });
    expect(bootDemo("?demo=1&autorun=1").autorun).toBe(true);
  });

  it("accepts the three storyboards and ignores an unknown id", () => {
    expect(bootDemo("?demo=1&scenario=assay-qc").scenarioId).toBe("assay-qc");
    expect(bootDemo("?demo=1&scenario=medicare-claim-risk").scenarioId).toBe("medicare-claim-risk");
    expect(bootDemo("?demo=1&scenario=not-real").scenarioId).toBe("pilot-storyboard");
  });

  it("rewrites the query without touching storage keys", () => {
    expect(demoPath("?demo=1", "assay-qc")).toBe("/?demo=1&scenario=assay-qc");
    expect(exitDemoPath("?demo=1&scenario=assay-qc&autorun=1&keep=1")).toBe("/?keep=1");
    expect(exitDemoPath("?demo=1")).toBe("/");
  });
});
