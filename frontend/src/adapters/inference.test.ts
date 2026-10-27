import { IdentitySession } from "./identity";
import { describe, expect, it, vi } from "vitest";
import { InferenceSettings, PAID_SPEND_KEY, clearPaidSpend, liveProviderBlocked, liveRunBlocked, readOverride, readPaidSpend, runSelection, writePaidSpend, type InferenceStatus } from "./inference";

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
    expect(liveRunBlocked(hostOnly, "premium", "0.5", true)).toBe(true);
  });
});

 it("strictly reads the versioned override or defaults", () => {
   for (const raw of [null, "broken", '{}', '{"v":2,"tier":"free","pin":null}', '{"v":1,"tier":"free","pin":{"model_id":"m","is_free":"false"}}']) {
     localStorage.clear(); if (raw) localStorage.setItem("crucible.modelOverride.v1", raw);
     expect(readOverride()).toEqual({ v: 1, tier: "free", pin: null, helper: null });
   }
   localStorage.setItem("crucible.modelOverride.v1", JSON.stringify({v:1,tier:"cheap_fast",pin:{model_id:"m",is_free:false}}));
   expect(readOverride()).toEqual({v:1,tier:"cheap_fast",pin:{model_id:"m",is_free:false},helper:null});
   localStorage.clear();
 });

 it("strictly reads, writes and clears the paid spend store", () => {
   const fallback = { v: 1, revision: null, consent: false, cap: "0" };
   for (const raw of [null, "broken", "{}", '{"v":2,"revision":"r","consent":true,"cap":"1"}', '{"v":1,"revision":"r","consent":"true","cap":"1"}', '{"v":1,"revision":"r","consent":true,"cap":"-1"}', '{"v":1,"revision":"r","consent":true,"cap":"1.234"}', '{"v":1,"revision":"r","consent":true,"cap":"1","extra":1}']) {
     localStorage.clear(); if (raw) localStorage.setItem(PAID_SPEND_KEY, raw);
     expect(readPaidSpend()).toEqual(fallback);
   }
   writePaidSpend("r1", true, "0.50");
   expect(readPaidSpend()).toEqual({ v: 1, revision: "r1", consent: true, cap: "0.50" });
   clearPaidSpend();
   expect(localStorage.getItem(PAID_SPEND_KEY)).toBeNull();
   expect(readPaidSpend()).toEqual(fallback);
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

it("round-trips a helper and drops only invalid helper metadata", () => {
 const saved={v:1,tier:"premium",pin:{model_id:"main",is_free:false},helper:{connection_id:"b".repeat(32),model_id:"helper",is_free:true}};
 try {
  localStorage.setItem("crucible.modelOverride.v1",JSON.stringify(saved)); expect(readOverride()).toEqual(saved);
  for(const helper of [{...saved.helper,connection_id:"bad"},{...saved.helper,model_id:"bad model"},{...saved.helper,is_free:"true"},{...saved.helper,extra:true}]) {
   localStorage.setItem("crucible.modelOverride.v1",JSON.stringify({...saved,helper})); expect(readOverride()).toEqual({...saved,helper:null});
  }
 } finally {localStorage.clear();}
});
