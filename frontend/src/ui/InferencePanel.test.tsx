import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LiveAdapter } from "../adapters/live";
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
    fireEvent.change(screen.getByLabelText("Primary API key"), { target: { value: "secret-for-test" } });
    fireEvent.click(screen.getByLabelText(/I approve/));
    fireEvent.click(screen.getByRole("button", { name: "Save account provider" }));
    expect((screen.getByLabelText("Primary API key") as HTMLInputElement).value).toBe("");
    const request = fetcher.mock.calls[1][1];
    expect(JSON.parse(request.body)).toEqual({ provider: "openrouter", model_id: "auto", api_key: "secret-for-test", base_url: "", helper: null, expected_revision: null });
    expect(request.cache).toBe("no-store");
    reject(new Response("secret-for-test", { status: 409 }));
    expect((await screen.findByRole("alert")).textContent).toContain("Settings changed");
    expect(document.body.textContent).not.toContain("secret-for-test");
    expect(onStatus).toHaveBeenLastCalledWith(null);
  });
  it("does not tell a host-authorized account that live runs are blocked", async () => {
    const hostOnly = { configured: false, revision: null, credential_lifetime: "backend_process", host_models_authorized: true };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(hostOnly))));
    render(<InferencePanel apiBase="https://api.example" session={new IdentitySession("https://identity.example")} onStatus={vi.fn()} disabled={false} />);
    expect((await screen.findByRole("status")).textContent).toMatch(/host model/i);
    expect(document.body.textContent).not.toMatch(/Live runs are blocked/);
    expect(document.body.textContent).not.toMatch(/no operator-key or operator-model fallback/i);
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

 it("onboards a fresh provider with Auto and no catalog then sends explicit Auto selection", async () => {
   const calls: {url:string;init?:RequestInit}[]=[];
   vi.stubGlobal("fetch", vi.fn(async (url:string,init?:RequestInit) => {
     calls.push({url,init});
     return new Response(JSON.stringify(url.endsWith("workflows") ? {workflow_id:"w"} : url.endsWith("runs") ? {run_id:"r"} : initial));
   }));
   const session = new IdentitySession("https://identity.example");
   render(<InferencePanel apiBase="https://api.example" session={session} onStatus={vi.fn()} disabled={false} />);
   await waitFor(()=>expect((screen.getByLabelText("Primary API key") as HTMLInputElement).disabled).toBe(false));
   expect(screen.queryByLabelText("Primary model")).toBeNull();
   fireEvent.change(screen.getByLabelText("Primary API key"),{target:{value:"fixture-key"}});
   fireEvent.click(screen.getByLabelText(/I approve/));fireEvent.click(screen.getByRole("button",{name:"Save account provider"}));
   await waitFor(()=>expect(calls.some(call=>call.init?.method === "PUT")).toBe(true));
   expect(JSON.parse(String(calls.find(call=>call.init?.method === "PUT")?.init?.body)).model_id).toBe("auto");
   const adapter = new LiveAdapter("https://api.example",session);
   await adapter.run("n",{} as never);
   expect(JSON.parse(String(calls.find(call=>call.url.endsWith("/runs"))?.init?.body))).toMatchObject({inference_selection:{mode:"auto",tier:"free"},paid_inference_consent:false});
 });

it("preserves an existing shared account legacy model without showing a model control", async () => {
 const current={...initial,configured:true,revision:"r1",model_id:"legacy-model",provider:"openrouter"};
 const fetcher=vi.fn(async (_url:string,_init?:RequestInit)=>new Response(JSON.stringify(current)));vi.stubGlobal("fetch",fetcher);
 render(<InferencePanel apiBase="https://api.example" session={new IdentitySession("https://identity.example")} onStatus={vi.fn()} disabled={false}/>);
 await waitFor(()=>expect((screen.getByLabelText("Primary API key") as HTMLInputElement).disabled).toBe(false));
 fireEvent.change(screen.getByLabelText("Primary API key"),{target:{value:"fixture-key"}});
 fireEvent.click(screen.getByLabelText(/I approve/));fireEvent.click(screen.getByRole("button",{name:"Save account provider"}));
 await waitFor(()=>expect(fetcher).toHaveBeenCalledTimes(2));
 expect(JSON.parse(String(fetcher.mock.calls[1][1]?.body))).toMatchObject({model_id:"legacy-model",helper:null});
 expect(screen.queryByLabelText("Primary model")).toBeNull();
});
