import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";
// @ts-ignore -- test-only Node builtin
import { resolve } from "node:path";
import LandingPage from "./LandingPage";

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

  const html = readFileSync(resolve(process.cwd(), "src/ui", "../../index.html"), "utf8");
  expect(html).toContain("<title>Crucible Cast</title>");
  expect(html).not.toContain("Science Data Canvas");
});
