import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import HospitalReportTable from "./HospitalReportTable";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";

afterEach(() => cleanup());

it("pages report sections and shows the MA caveat from the recorded fixture", () => {
  const real = JSON.parse(readFileSync("src/ui/fixtures/hospital-run.real.json", "utf8"));
  const top = real.steps.find((step: { node: string }) => step.node === "analyst").telemetry.find((event: { type: string }) => event.type === "top10");
  expect(real.report_md).toContain("Codes with commercial and MA medians");
  expect(real.report_md).toContain("Per-payer spread (dollar rates)");
  expect(real.report_md).toContain("Medicare Managed Care Plan is a single-plan baseline");
  expect(real.report_md).toMatch(/Parse mode: (streamed|parsed in memory)/);
  render(<HospitalReportTable rows={top.rows} spread={top.spread ?? []} />);
  expect(screen.getByText("Codes with commercial and MA medians")).toBeTruthy();
  expect(screen.getByText("Per-payer spread (dollar rates)")).toBeTruthy();
  expect(screen.getAllByText(/single-plan baseline/).length).toBeGreaterThan(1);
  const pager = screen.getByTestId("hospital-report-table-pager");
  expect(pager.textContent).toMatch(/Page 1 of /);
  const next = screen.getAllByRole("button", { name: "Next" })[0];
  fireEvent.click(next);
  expect(screen.getByTestId("hospital-report-table-pager").textContent).toMatch(/Page 2 of /);
});
