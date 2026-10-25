import { describe, expect, it } from "vitest";
import { verificationFromOracle, verificationText } from "./labels";

describe("MRF honesty labels", () => {
  it("never says Verified without a Coding SHA pass", () => {
    expect(verificationFromOracle({ checksPassed: true })).toBe("checked_locally");
    expect(verificationFromOracle({ checksPassed: true, codingShaOk: false })).toBe("checked_locally");
    expect(verificationFromOracle({ checksPassed: false })).toBe("proposal");
    expect(verificationText("checked_locally")).toBe("Checked locally");
    expect(verificationText("proposal")).toBe("Proposal");
  });

  it("lights Verified only when Coding reports ok at a SHA", () => {
    expect(verificationFromOracle({ checksPassed: true, codingShaOk: true })).toBe("verified");
    expect(verificationText("verified")).toBe("Verified");
  });
});
