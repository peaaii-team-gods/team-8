import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import OutputInspector from "./OutputInspector";
import { PROPOSAL_MARK } from "./outputView";

afterEach(() => cleanup());

describe("OutputInspector", () => {
  it("compares two proposal JSON bodies without writing storage", () => {
    render(<OutputInspector sources={[
      { id: "a", title: "Builder", presetId: "builder", output: `{"reading_column":"reading"} ${PROPOSAL_MARK}` },
      { id: "b", title: "Maintainer", presetId: "maintainer", output: `{"reading_column":"value"} ${PROPOSAL_MARK}` },
    ]} />);
    fireEvent.click(screen.getByRole("button", { name: "Outputs" }));
    expect(screen.getByText(/not verification/)).toBeTruthy();
    expect(screen.getByTestId("output-compare").textContent).toMatch(/differs/);
    expect(screen.getByTestId("output-left").textContent).toMatch(/reading/);
    expect(screen.getByTestId("output-right").textContent).toMatch(/value/);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });
});
