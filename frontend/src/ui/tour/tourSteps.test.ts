import { describe, expect, it } from "vitest";
import { TOUR_STEPS } from "./tourSteps";

describe("TOUR_STEPS", () => {
  it("gives every step a unique id and a what, how and why", () => {
    expect(new Set(TOUR_STEPS.map((step) => step.id)).size).toBe(TOUR_STEPS.length);
    for (const step of TOUR_STEPS) {
      expect(step.title.trim()).not.toBe("");
      expect(step.what.trim()).not.toBe("");
      expect(step.how.trim()).not.toBe("");
      expect(step.why.trim()).not.toBe("");
    }
  });

  it("opens and closes on centered cards", () => {
    expect(TOUR_STEPS[0].target).toBeUndefined();
    expect(TOUR_STEPS[TOUR_STEPS.length - 1].target).toBeUndefined();
  });
});
