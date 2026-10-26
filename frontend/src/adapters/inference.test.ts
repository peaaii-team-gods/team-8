import { IdentitySession } from "./identity";
import { describe, expect, it, vi } from "vitest";
import { InferenceSettings, liveProviderBlocked, liveRunBlocked, readOverride, runSelection, type InferenceStatus } from "./inference";

const configured: InferenceStatus = {
  configured: true, revision: "r1", provider: "local", model_id: "m",
  credential_lifetime: "backend_process", host_models_authorized: false,
};
const hostOnly: InferenceStatus = {
  configured: false, revision: null,
  credential_lifetime: "backend_process", host_models_authorized: true,
};
const neither: InferenceStatus = {
  configured: false, revision: null,
  credential_lifetime: "backend_process", host_models_authorized: false,
};

describe("liveProviderBlocked", () => {
  it("allows a configured account after paid consent and a positive cap", () => {
    expect(liveProviderBlocked(configured, "0.01", true)).toBe(false);
    expect(liveProviderBlocked(configured, "0.01", false)).toBe(true);
    expect(liveProviderBlocked(configured, "0", true)).toBe(true);
  });

  it("allows a host-authorized account without its own provider or paid consent", () => {
    expect(liveProviderBlocked(hostOnly, "0", false)).toBe(false);
    expect(liveProviderBlocked(hostOnly, "0.01", false)).toBe(false);
  });

  it("blocks an account that is neither configured nor host-authorized", () => {
    expect(liveProviderBlocked(neither, "0.01", true)).toBe(true);
    expect(liveProviderBlocked(null, "0.01", true)).toBe(true);
  });
});

describe("liveRunBlocked", () => {
  it("allows Free for configured and host-authorized accounts, but blocks neither or unknown", () => {
    expect(liveRunBlocked(configured, "free", "0", false)).toBe(true);
    expect(liveRunBlocked(hostOnly, "free", "0", false)).toBe(false);
    expect(liveRunBlocked(neither, "free", "0", false)).toBe(true);
    expect(liveRunBlocked(null, "free", "0", false)).toBe(true);
  });

  it("keeps Premium behind a configured provider, consent and positive cap", () => {
    expect(liveRunBlocked(configured, "premium", "0.5", true)).toBe(false);
    expect(liveRunBlocked(configured, "premium", "0", true)).toBe(true);
    expect(liveRunBlocked(hostOnly, "premium", "0.5", true)).toBe(false);
  });
});

 it("strictly reads the versioned override or defaults", () => {
   for (const raw of [null, "broken", '{}', '{"v":2,"tier":"free","pin":null}', '{"v":1,"tier":"free","pin":{"model_id":"m","is_free":"false"}}']) {
     localStorage.clear(); if (raw) localStorage.setItem("crucible.modelOverride.v1", raw);
     expect(readOverride()).toEqual({ v: 1, tier: "free", pin: null });
   }
   localStorage.setItem("crucible.modelOverride.v1", JSON.stringify({v:1,tier:"cheap_fast",pin:{model_id:"m",is_free:false}}));
   expect(readOverride()).toEqual({v:1,tier:"cheap_fast",pin:{model_id:"m",is_free:false}});
   localStorage.clear();
 });

it("reads the catalog with account headers and rejects malformed responses", async () => {
 const session = new IdentitySession("https://id.example");
 const fetcher = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({models:[]}))).mockResolvedValueOnce(new Response(JSON.stringify({models:[{id:"bad"}]})));
 vi.stubGlobal("fetch",fetcher);
 try {
   const api = new InferenceSettings("https://api.example",session);
   expect(await api.listModels()).toEqual([]);
   expect(fetcher.mock.calls[0]).toEqual(["https://api.example/v1/inference/models",expect.objectContaining({headers:{"content-type":"application/json",authorization:"Bearer "},credentials:"omit",cache:"no-store",redirect:"error"})]);
   await expect(api.listModels()).rejects.toThrow("Invalid model list");
 } finally { vi.unstubAllGlobals(); }
});

it.each([{}, {connections:[{}]}, {connections:[{id:"bad"}]}])("rejects malformed connections before Auto selection: %j", async body => {
 const fetcher=vi.fn(async()=>new Response(JSON.stringify(body)));
 vi.stubGlobal("fetch",fetcher);
 localStorage.clear();
 try { await expect(runSelection("https://api.example", new IdentitySession("https://id.example"))).rejects.toThrow(/Invalid/); }
 finally { vi.unstubAllGlobals(); }
});
