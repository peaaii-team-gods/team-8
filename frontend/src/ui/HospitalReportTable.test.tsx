import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import HospitalReportTable, { maCaveat } from "./HospitalReportTable";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";

afterEach(() => cleanup());

it("pages report sections and shows the MA caveat from the recorded fixture", () => {
  const real = JSON.parse(readFileSync("src/ui/fixtures/hospital-run.real.json", "utf8"));
  const top = real.steps.find((step: { node: string }) => step.node === "analyst").telemetry.find((event: { type: string }) => event.type === "top10");
  expect(real.report_md).toContain("Codes with commercial and MA medians");
  expect(real.report_md).toContain("Per-payer spread (dollar rates)");
  expect(real.report_md).toContain("Medicare Managed Care Plan is not a single-plan baseline here");
  expect(real.report_md).toMatch(/Parse mode: (streamed|parsed in memory)/);
  const caveat = real.report_md.split(/\r?\n/).map((line: string) => line.trim()).find((line: string) => line.includes("Medicare Managed Care Plan is"));
  render(<HospitalReportTable rows={top.rows} spread={top.spread ?? []} caveat={caveat} />);
  expect(screen.getByText("Codes with commercial and MA medians")).toBeTruthy();
  expect(screen.getByText("Per-payer spread (dollar rates)")).toBeTruthy();
  expect(screen.getAllByText(/not a single-plan baseline/).length).toBeGreaterThan(1);
  const pager = screen.getByTestId("hospital-report-table-pager");
  expect(pager.textContent).toMatch(/Page 1 of /);
  const next = screen.getAllByRole("button", { name: "Next" })[0];
  fireEvent.click(next);
  expect(screen.getByTestId("hospital-report-table-pager").textContent).toMatch(/Page 2 of /);
});

it("derives the MA caveat from n_MA so a static single-plan claim cannot disagree with the rows", () => {
  expect(maCaveat([{ n_MA: 1 }, { n_MA: 1 }])).toContain("no comparison group has MA n>=2");
  expect(maCaveat([{ n_MA: 5 }, { n_MA: 1 }, { n_MA: 5 }])).toBe(
    "Medicare Managed Care Plan is not a single-plan baseline here: 2 comparison groups have MA n>=2 (max n_MA=5).",
  );
  render(<HospitalReportTable rows={[{ n_MA: 5, billing_code: "A0425" }]} />);
  expect(screen.getAllByText(/not a single-plan baseline here: 1 comparison groups have MA n>=2 \(max n_MA=5\)/).length).toBeGreaterThan(0);
  expect(screen.queryByText(/no comparison group has MA n>=2/)).toBeNull();
});
