import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import InferencePanel from "./InferencePanel";
import { IdentitySession } from "../adapters/identity";
const initial = { configured: false, revision: null, credential_lifetime: "backend_process", host_models_authorized: false };
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
describe("Account inference", () => {
  it("guards revisions and clears write-only credentials even on conflict", async () => {
    let reject!: (value: Response) => void;
    const fetcher = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify(initial))).mockImplementationOnce(() => new Promise(resolve => { reject = resolve; }));
    vi.stubGlobal("fetch", fetcher);
    const onStatus = vi.fn();
    render(<InferencePanel apiBase="https://api.example" session={new IdentitySession("https://identity.example")} onStatus={onStatus} disabled={false} />);
    await waitFor(() => expect(onStatus).toHaveBeenCalledWith(initial));
    fireEvent.change(screen.getByLabelText("Primary model"), { target: { value: "my/model" } });
    fireEvent.change(screen.getByLabelText("Primary API key"), { target: { value: "secret-for-test" } });
    fireEvent.click(screen.getByLabelText(/I approve/));
    fireEvent.click(screen.getByRole("button", { name: "Save account provider" }));
    expect((screen.getByLabelText("Primary API key") as HTMLInputElement).value).toBe("");
    const request = fetcher.mock.calls[1][1];
    expect(JSON.parse(request.body)).toEqual({ provider: "openrouter", model_id: "my/model", api_key: "secret-for-test", base_url: "", helper: null, expected_revision: null });
    expect(request.cache).toBe("no-store");
    reject(new Response("secret-for-test", { status: 409 }));
    expect((await screen.findByRole("alert")).textContent).toContain("Settings changed");
    expect(document.body.textContent).not.toContain("secret-for-test");
    expect(onStatus).toHaveBeenLastCalledWith(null);
  });
  it("ignores late metadata after unmount", async () => {
    let resolve!: (value: Response) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise(done => { resolve = done; })));
    const onStatus = vi.fn();
    const mounted = render(<InferencePanel apiBase="https://api.example" session={new IdentitySession("https://identity.example")} onStatus={onStatus} disabled={false} />);
    mounted.unmount(); resolve(new Response(JSON.stringify(initial)));
    await new Promise(done => setTimeout(done, 0));
    expect(onStatus).not.toHaveBeenCalledWith(initial);
  });
});
