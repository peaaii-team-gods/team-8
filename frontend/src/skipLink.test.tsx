import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
// @ts-ignore -- test-only Node builtin
import { readFileSync } from "node:fs";
import App from "./App";
import { ToastProvider } from "./ui/toasts/ToastProvider";

afterEach(cleanup);

// jsdom has no layout engine; React Flow needs these on mount (same stubs as App.smoke.test.tsx).
class RO { observe() {} unobserve() {} disconnect() {} }
vi.stubGlobal("ResizeObserver", RO);
if (!window.DOMMatrixReadOnly) vi.stubGlobal("DOMMatrixReadOnly", class { m22 = 1; });
window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })) as never;

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function expectSkipLinkFirst(container: HTMLElement) {
  const first = container.querySelector<HTMLElement>(FOCUSABLE);
  expect(first?.textContent).toBe("Skip to main content");
  expect(first?.getAttribute("href")).toBe("#main");
  const target = container.querySelector("#main");
  expect(target?.tagName).toBe("MAIN");
}

it("landing page: skip link is first focusable and targets the main landmark", () => {
  window.history.replaceState({}, "", "/");
  const { container } = render(<ToastProvider><App /></ToastProvider>);
  expectSkipLinkFirst(container);
});

it("canvas view: skip link is first focusable and targets the main landmark", () => {
  window.history.replaceState({}, "", "/");
  const { container } = render(<ToastProvider><App /></ToastProvider>);
  fireEvent.click(screen.getByRole("button", { name: "Enter canvas" }));
  expect(container.querySelector('[data-testid="landing-page"]')).toBeNull();
  expectSkipLinkFirst(container);
});

it("index.css defines one global focus-visible outline", () => {
  const css = readFileSync("src/index.css", "utf8");
  expect(css).toMatch(/^:focus-visible \{ outline: 2px solid #f0abfc; outline-offset: 2px; \}/m);
});
