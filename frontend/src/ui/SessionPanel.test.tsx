import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SessionPanel from "./SessionPanel";
import { LiveAdapter } from "../adapters/live";
import type { IdentitySession } from "../adapters/identity";

const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); sessionStorage.clear(); });

const fakeSession = (login: () => Promise<void>) =>
  ({ login, token: "tok" }) as unknown as IdentitySession;

describe("SessionPanel", () => {
  it("clears the password after dispatch, builds a LiveAdapter, shows capabilities truthfully", async () => {
    const login = vi.fn(async () => undefined);
    const onAuthenticated = vi.fn();
    // capabilities fetch through the constructed LiveAdapter
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json({ capabilities: { run_execution: { status: "available" }, run_cancellation: { status: "available" }, shell_execution: { status: "unavailable", reason_code: "shell_execution_not_verified" }, tool_execution: { status: "unavailable" }, approval_tier3_elevation: { status: "unavailable" } } })));
    render(<SessionPanel apiBase="http://api" identityBase="http://id" session={fakeSession(login)} onAuthenticated={onAuthenticated} />);

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
    render(<SessionPanel apiBase="http://api" identityBase="http://id" session={fakeSession(login)} onAuthenticated={onAuthenticated} />);
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "brandon" } });
    const pw = screen.getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(pw, { target: { value: "bad" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(pw.value).toBe("");
    expect(await screen.findByRole("alert")).toHaveProperty("textContent", expect.stringContaining("login failed (401)"));
    expect(onAuthenticated).not.toHaveBeenCalled();
  });
});
