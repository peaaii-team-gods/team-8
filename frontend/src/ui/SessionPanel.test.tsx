import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import SessionPanel from "./SessionPanel";
import { ToastProvider } from "./toasts/ToastProvider";
import { LiveAdapter } from "../adapters/live";
import type { IdentitySession } from "../adapters/identity";

const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

afterEach(() => { cleanup(); vi.unstubAllGlobals(); localStorage.clear(); sessionStorage.clear(); });

const fakeSession = (login: () => Promise<void>) =>
  ({ login, token: "tok" }) as unknown as IdentitySession;

describe("SessionPanel", () => {
  it("clears the password after dispatch, builds a LiveAdapter, shows capabilities truthfully", async () => {
    const login = vi.fn(async () => undefined);
    const onAuthenticated = vi.fn();
    // capabilities fetch through the constructed LiveAdapter
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ capabilities: { run_execution: { status: "available" }, run_cancellation: { status: "available" }, shell_execution: { status: "unavailable", reason_code: "shell_execution_not_verified" }, tool_execution: { status: "unavailable" }, approval_tier3_elevation: { status: "unavailable" } } })));
    render(<ToastProvider><SessionPanel apiBase="http://api" identityBase="http://id" session={fakeSession(login)} onAuthenticated={onAuthenticated} /></ToastProvider>);

    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "brandon" } });
    const pw = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(pw, { target: { value: "hunter2" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(pw.value).toBe(""); // cleared on dispatch, before login resolves are observed
    await waitFor(() => expect(onAuthenticated).toHaveBeenCalled());
    expect(onAuthenticated.mock.calls[0][0]).toBeInstanceOf(LiveAdapter);
    expect(login).toHaveBeenCalledWith("brandon", "hunter2");
    // hosted/tool features stay unavailable per manifest + capabilities
    expect(await screen.findByText(/Hosted shell execution.*unavailable/)).toBeTruthy();
    expect(screen.getByText(/Run a bounded agent workflow: live/)).toBeTruthy();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("shows the login error and does not authenticate on failure", async () => {
    const login = vi.fn(async () => { throw new Error("login failed (401)"); });
    const onAuthenticated = vi.fn();
    render(<ToastProvider><SessionPanel apiBase="http://api" identityBase="http://id" session={fakeSession(login)} onAuthenticated={onAuthenticated} /></ToastProvider>);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "brandon" } });
    const pw = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(pw, { target: { value: "s3cret-value" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(pw.value).toBe("");
    expect(await screen.findByRole("alert")).toHaveProperty("textContent", "Wrong username or password");
    expect(screen.getByTestId("toast").textContent).toMatch(/Sign in failed/);
    expect(screen.getByTestId("toast").textContent).not.toMatch(/s3cret-value/);
    expect(onAuthenticated).not.toHaveBeenCalled();
  });

  const attempt = async (login: () => Promise<void>) => {
    render(<ToastProvider><SessionPanel apiBase="http://api" identityBase="http://id" session={fakeSession(login)} /></ToastProvider>);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "brandon" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "pw" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    return screen.findByRole("alert");
  };

  it("maps 403, network and abort failures; keeps other messages raw", async () => {
    expect((await attempt(async () => { throw new Error("login failed (403)"); })).textContent).toBe("Wrong username or password");
    cleanup();
    expect((await attempt(async () => { throw new TypeError("Failed to fetch"); })).textContent).toBe("Couldn't reach the sign-in service. Try again.");
    cleanup();
    expect((await attempt(async () => { throw new DOMException("aborted", "AbortError"); })).textContent).toBe("Couldn't reach the sign-in service. Try again.");
    cleanup();
    expect((await attempt(async () => { throw new Error("login failed (500)"); })).textContent).toBe("login failed (500)");
  });

  it("maps each browser fetch-failure message to network copy but not other TypeErrors", async () => {
    const network = "Couldn't reach the sign-in service. Try again.";
    for (const msg of ["Failed to fetch", "NetworkError when attempting to fetch resource.", "Load failed", "fetch failed"]) {
      expect((await attempt(async () => { throw new TypeError(msg); })).textContent).toBe(network);
      cleanup();
    }
    expect((await attempt(async () => { throw new TypeError("x is undefined"); })).textContent).toBe("x is undefined");
    cleanup();
    expect((await attempt(async () => { throw new Error("login failed (401)"); })).textContent).toBe("Wrong username or password");
  });

  it("keeps autocomplete attrs, plain-language copy, focus, and the busy label", async () => {
    let release: () => void = () => undefined;
    const login = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    render(<ToastProvider><SessionPanel apiBase="http://api" identityBase="http://id" session={fakeSession(login)} /></ToastProvider>);
    const user = screen.getByLabelText("Username");
    expect(user.getAttribute("autocomplete")).toBe("username");
    expect(screen.getByLabelText("Password").getAttribute("autocomplete")).toBe("current-password");
    expect(document.activeElement).toBe(user);
    expect(screen.getByText(/Sign in with your Right Hand Man account/).className).toContain("text-sm");
    expect(screen.queryByText(/RHM Identity/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    const busyButton = screen.getByRole("button", { name: "Signing in…" }) as HTMLButtonElement;
    expect(busyButton.disabled).toBe(true);
    release();
    await waitFor(() => expect(screen.queryByRole("button", { name: "Signing in…" })).toBeNull());
  });

  it("page variant: Back and Escape call onCancel, disabled while busy; overlay has no Back", async () => {
    const onCancel = vi.fn();
    let release: () => void = () => undefined;
    const login = vi.fn(() => new Promise<void>((resolve) => { release = resolve; }));
    render(<ToastProvider><SessionPanel variant="page" onCancel={onCancel} apiBase="http://api" identityBase="http://id" session={fakeSession(login)} /></ToastProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(2);
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect((screen.getByRole("button", { name: "Back" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledTimes(2);
    release();
    await waitFor(() => expect(screen.queryByRole("button", { name: "Signing in…" })).toBeNull());
    cleanup();
    render(<ToastProvider><SessionPanel onCancel={onCancel} apiBase="http://api" identityBase="http://id" session={fakeSession(login)} /></ToastProvider>);
    expect(screen.queryByRole("button", { name: "Back" })).toBeNull();
  });
});
