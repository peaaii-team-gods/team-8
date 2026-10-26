import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";
// @ts-ignore -- test-only Node builtin
import { resolve } from "node:path";
import LandingPage from "./LandingPage";
import recorded from "./fixtures/hospital-run.real.json";

afterEach(cleanup);

it("presents Crucible Cast as the Team 8 landing page", () => {
  render(
    <LandingPage
      mode="live"
      onSignIn={() => undefined}
      onEnterCanvas={() => undefined}
      onLoadMrf={() => undefined}
    />,
  );

  expect(screen.getByText("PEAAII - Team 8")).toBeTruthy();
  expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Crucible Cast.");
  expect(screen.queryByText("Team 8 · Pea.AI")).toBeNull();
  expect(screen.getByRole("button", { name: "Sign in" })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Run MRF demo" })).toBeTruthy();
  expect(screen.getByRole("link", { name: "How it works" })).toBeTruthy();

  const primary = screen.getByTestId("cta-primary");
  expect(primary.textContent).toBe("Run MRF demo");
  expect(primary.className).toContain("bg-emerald-400");
  expect(primary.compareDocumentPosition(screen.getByTestId("cta-secondary")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByTestId("cta-secondary").className).toContain("glass");
  expect(screen.getByText(/Machine-Readable File/)).toBeTruthy();
  expect(screen.getByTestId("demo-hint").textContent).toContain("hospital price pipeline on the canvas");
  expect(screen.getByTestId("demo-hint").textContent).toContain("requires sign-in");
  expect(screen.getByText("Scout").tagName).toBe("STRONG");
  expect(screen.getAllByRole("listitem")).toHaveLength(5);

  const html = readFileSync(resolve(process.cwd(), "src/ui", "../../index.html"), "utf8");
  expect(html).toContain("<title>Crucible Cast</title>");
  expect(html).not.toContain("Science Data Canvas");
});

it("previews only rows from the recorded run fixture", () => {
  const rows = (recorded as any).steps.flatMap((s: any) => s.telemetry).find((t: any) => t.type === "top10").rows.slice(0, 3);
  render(<LandingPage mode="simulated" onSignIn={() => undefined} onEnterCanvas={() => undefined} onLoadMrf={() => undefined} />);
  const preview = screen.getByTestId("recorded-preview");
  for (const row of rows) {
    expect(preview.textContent).toContain(row.billing_code);
    expect(preview.textContent).toContain(row.commercial_median.toLocaleString("en-US"));
  }
  expect(screen.queryByTestId("demo-hint")?.textContent).not.toContain("requires sign-in");
  expect(screen.getByRole("button", { name: "Enter canvas" })).toBeTruthy();
});
