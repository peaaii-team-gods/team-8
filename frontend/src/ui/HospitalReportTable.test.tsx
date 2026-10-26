import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import HospitalReportTable, { tablesFromReport } from "./HospitalReportTable";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";

afterEach(() => cleanup());

it("pages report sections and shows the MA caveat from the recorded report artifact", () => {
  const md = readFileSync("../fixtures/hospital-full-report.md", "utf8");
  const parsed = tablesFromReport(md);
  expect(parsed.caveat).toContain('cross-payer label shared by 11 payer names');
  expect(md).toContain("Codes with commercial and MA medians");
  expect(md).toContain("Per-payer spread (dollar rates)");
  expect(md).toContain("Medicare Managed Care Plan is not a single-plan baseline here");
  expect(md).toMatch(/Parse mode: (streamed|parsed in memory)/);
  expect(md).not.toContain("n and the MA single-plan caveat apply to every section");
  expect(md).toContain("cross-payer label shared by 11 payer names");
  render(<HospitalReportTable rows={parsed.rows} spread={parsed.spread} caveat={parsed.caveat} />);
  expect(screen.getByText("Codes with commercial and MA medians")).toBeTruthy();
  expect(screen.getByText("Per-payer spread (dollar rates)")).toBeTruthy();
  expect(screen.getAllByText(/not a single-plan baseline/).length).toBeGreaterThan(1);
  const pager = screen.getByTestId("hospital-report-table-pager");
  expect(pager.textContent).toMatch(/Page 1 of /);
  fireEvent.click(screen.getAllByRole("button", { name: "Next" })[0]);
  expect(screen.getByTestId("hospital-report-table-pager").textContent).toMatch(/Page 2 of /);
});

it("uses the server caveat text instead of deriving a second copy", () => {
  const caveat = "Medicare Managed Care Plan is not a single-plan baseline here: 12 comparison groups have MA n>=2 (max n_MA=5).";
  render(<HospitalReportTable rows={[{ n_MA: 5, billing_code: "A0425" }]} caveat={caveat} />);
  expect(screen.getAllByText(caveat).length).toBeGreaterThan(0);
  expect(screen.queryByText(/no comparison group has MA n>=2/)).toBeNull();
});
