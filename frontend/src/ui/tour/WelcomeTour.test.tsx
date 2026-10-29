import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import WelcomeTour, { markTourSeen, tourSeen } from "./WelcomeTour";

afterEach(() => { cleanup(); markTourSeen(false); document.body.innerHTML = ""; });

const title = () => screen.getByRole("dialog").querySelector("h2")?.textContent;

describe("WelcomeTour", () => {
  it("skips steps whose target is not on screen and walks Next/Back", () => {
    const bar = document.createElement("header");
    bar.dataset.testid = "user-bar";
    document.body.appendChild(bar);
    render(<WelcomeTour open onClose={() => undefined} />);
    expect(title()).toBe("Welcome to Crucible Cast");
    expect(screen.getByTestId("tour-count").textContent).toBe("1 / 3");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(title()).toBe("Top bar");
    expect(screen.getByTestId("tour-spotlight")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(title()).toBe("You're set");
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(title()).toBe("Top bar");
  });

  it("closes on Esc, marks itself seen, and keeps the key from the canvas", () => {
    const onClose = vi.fn();
    const canvasKey = vi.fn();
    window.addEventListener("keydown", canvasKey);
    render(<WelcomeTour open onClose={onClose} />);
    fireEvent.keyDown(document.body, { key: "ArrowRight" });
    expect(title()).toBe("You're set");
    fireEvent.keyDown(document.body, { key: "Escape" });
    window.removeEventListener("keydown", canvasKey);
    expect(onClose).toHaveBeenCalledOnce();
    expect(canvasKey).not.toHaveBeenCalled();
    expect(tourSeen()).toBe(true);
  });

  it("offers the pilot on an empty canvas and finishes with Done", () => {
    const onLoadPilot = vi.fn();
    const onClose = vi.fn();
    render(<WelcomeTour open onClose={onClose} canvasEmpty onLoadPilot={onLoadPilot} />);
    fireEvent.click(screen.getByRole("button", { name: "Load Pilot storyboard and tour" }));
    expect(onLoadPilot).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Tour as-is" }));
    fireEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
