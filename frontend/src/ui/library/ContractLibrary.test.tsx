import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ContractLibrary from "./ContractLibrary";

afterEach(() => cleanup());

describe("ContractLibrary", () => {
  it("shows a registry contract without writing storage", () => {
    render(<ContractLibrary />);
    expect(screen.queryByTestId("contract-detail")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Contracts" }));
    expect(screen.getByText(/does not edit an agent/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Field mapping/ }));
    expect(screen.getByTestId("contract-detail").textContent).toMatch(/reading_column/);
    expect(screen.getByTestId("contract-detail").textContent).toMatch(/Builder/);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByTestId("contract-detail")).toBeNull();
  });
});
