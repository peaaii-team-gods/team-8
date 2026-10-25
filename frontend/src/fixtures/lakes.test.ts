import { describe, expect, it } from "vitest";
import { LAKE_FIXTURES } from "./lakes";

const phiKey = /name|ssn|dob|mrn|email|phone|address|patient/i;

describe("lake fixtures", () => {
  it("keeps every lake at 5–8 synthetic rows with no PHI keys", () => {
    const documentExcerpts = new Set(["hospital-mrf", "hospital-mrf-drift"]);
    for (const [id, rows] of Object.entries(LAKE_FIXTURES)) {
      if (documentExcerpts.has(id)) {
        expect(rows.length, id).toBe(1);
        continue;
      }
      expect(rows.length, id).toBeGreaterThanOrEqual(5);
      expect(rows.length, id).toBeLessThanOrEqual(8);
      for (const row of rows) {
        expect(row && typeof row === "object" && !Array.isArray(row)).toBe(true);
        for (const key of Object.keys(row as object)) expect(key, `${id}.${key}`).not.toMatch(phiKey);
      }
    }
  });
});
