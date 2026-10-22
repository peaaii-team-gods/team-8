import { describe, expect, it } from "vitest";
import { resolveMode, apiBaseFromEnv, identityBaseFromEnv, selectAdapter } from "./selectAdapter";
import { SimulatedAdapter } from "./simulated";
import { LiveAdapter } from "./live";
import { IdentitySession } from "./identity";

describe("adapter selection", () => {
  it("defaults to simulated unless mode is exactly live", () => {
    expect(resolveMode({})).toBe("simulated");
    expect(resolveMode({ VITE_RHM_MODE: "simulated" })).toBe("simulated");
    expect(resolveMode({ VITE_RHM_MODE: "bogus" })).toBe("simulated");
    expect(resolveMode({ VITE_RHM_MODE: "live" })).toBe("live");
  });

  it("resolves api/identity bases with defaults", () => {
    expect(apiBaseFromEnv({})).toBe("http://127.0.0.1:8001");
    expect(apiBaseFromEnv({ VITE_RHM_API_BASE: "http://127.0.0.1:9000" })).toBe("http://127.0.0.1:9000");
    expect(identityBaseFromEnv({ VITE_RHM_API_BASE: "http://a" })).toBe("http://a");
    expect(identityBaseFromEnv({ VITE_RHM_API_BASE: "http://a", VITE_RHM_IDENTITY_BASE: "http://i" })).toBe("http://i");
  });

  it("selects simulated by default; live requires a session (no silent fallback)", () => {
    expect(selectAdapter("simulated", {})).toBeInstanceOf(SimulatedAdapter);
    expect(selectAdapter("live", {})).toBeNull();
    const session = new IdentitySession("http://i", "http://a");
    const live = selectAdapter("live", { VITE_RHM_API_BASE: "http://a" }, session);
    expect(live).toBeInstanceOf(LiveAdapter);
    expect(live?.mode).toBe("live");
  });
});
