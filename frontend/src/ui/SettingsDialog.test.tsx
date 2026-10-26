import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import type { InferenceStatus } from "../adapters/inference";
import { IdentitySession } from "../adapters/identity";
import SettingsDialog from "./SettingsDialog";

const configured: InferenceStatus = { configured: true, revision: "r1", credential_lifetime: "backend_process", host_models_authorized: false };
const hostOnly: InferenceStatus = { configured: false, revision: null, credential_lifetime: "backend_process", host_models_authorized: true };
const renderDialog = (inference: InferenceStatus | null, disabled = false) => {
  const setters = { setPaidConsent: vi.fn(), setSpendCap: vi.fn(), onClose: vi.fn(), onStatus: vi.fn() };
  function Harness() {
    const [tier, setTier] = useState<"free" | "premium">("free");
    const [paidConsent, updatePaidConsent] = useState(false);
    const [spendCap, updateSpendCap] = useState("0");
    return <SettingsDialog open inference={inference} apiBase="" session={new IdentitySession("", "")} tier={tier} setTier={setTier}
      paidConsent={paidConsent} setPaidConsent={value => { setters.setPaidConsent(value); updatePaidConsent(value); }}
      spendCap={spendCap} setSpendCap={value => { setters.setSpendCap(value); updateSpendCap(value); }}
      onClose={setters.onClose} onStatus={setters.onStatus} disabled={disabled} />;
  }
  render(<Harness />);
  return setters;
};

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("SettingsDialog", () => {
  it("is a named modal with Free selected and the provider section", () => {
    renderDialog(configured);
    expect(screen.getByRole("dialog", { name: "Settings" }).getAttribute("aria-modal")).toBe("true");
    expect((screen.getByRole("radio", { name: "Free" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("region", { name: "Account inference settings" })).toBeTruthy();
  });

  it("shows Premium controls and resets them when Free is selected", () => {
    const setters = renderDialog(configured);
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    expect(screen.getByLabelText("USD admission budget per agent run")).toBeTruthy();
    expect(screen.getByLabelText(/I permit paid inference/)).toBeTruthy();
    fireEvent.click(screen.getByRole("radio", { name: "Free" }));
    expect(screen.queryByLabelText("USD admission budget per agent run")).toBeNull();
    expect(setters.setPaidConsent).toHaveBeenCalledWith(false);
    expect(setters.setSpendCap).toHaveBeenCalledWith("0");
    expect(document.querySelector('[value="0.01"]')).toBeNull();
  });

  it.each([hostOnly, { ...hostOnly, host_models_authorized: false }, null])("disables Premium without a configured provider", (status) => {
    renderDialog(status);
    expect((screen.getByRole("radio", { name: /Premium.*Add your own provider to use Premium/ }) as HTMLInputElement).disabled).toBe(true);
  });

  it("closes from Escape, the close button and the backdrop", () => {
    const setters = renderDialog(configured);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: "Close settings" }));
    fireEvent.click(screen.getByTestId("settings-backdrop"));
    expect(setters.onClose).toHaveBeenCalledTimes(3);
  });

  it("stays open when Escape is pressed while a run disables the close button", () => {
    const setters = renderDialog(configured, true);
    expect((screen.getByRole("button", { name: "Close settings" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(setters.onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeTruthy();
  });

  it("does not close from the backdrop while disabled", () => {
    const setters = renderDialog(configured, true);
    fireEvent.click(screen.getByTestId("settings-backdrop"));
    expect(setters.onClose).not.toHaveBeenCalled();
  });

  it("closes from the backdrop while enabled", () => {
    const setters = renderDialog(configured);
    fireEvent.click(screen.getByTestId("settings-backdrop"));
    expect(setters.onClose).toHaveBeenCalledTimes(1);
  });

  it("wraps Tab in both directions and skips disabled controls", async () => {
    renderDialog(null);
    const close = screen.getByRole("button", { name: "Close settings" });
    await waitFor(() => expect((screen.getByLabelText("Primary API key") as HTMLInputElement).disabled).toBe(false));
    const dialog = screen.getByRole("dialog");
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'));
    const enabled = focusable.filter(element => !(element as HTMLInputElement).disabled);
    enabled[enabled.length - 1].focus();
    fireEvent.keyDown(enabled[enabled.length - 1], { key: "Tab" });
    expect(document.activeElement).toBe(close);
    close.focus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(enabled[enabled.length - 1]);
    expect(enabled).not.toContain(screen.getByRole("radio", { name: /Premium/ }));
  });
});
