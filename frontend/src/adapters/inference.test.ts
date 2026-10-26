import { describe, expect, it } from "vitest";
import { liveProviderBlocked, liveRunBlocked, type InferenceStatus } from "./inference";

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
    expect(liveRunBlocked(configured, "0", false, false)).toBe(false);
    expect(liveRunBlocked(hostOnly, "0", false, false)).toBe(false);
    expect(liveRunBlocked(neither, "0", false, false)).toBe(true);
    expect(liveRunBlocked(null, "0", false, false)).toBe(true);
  });

  it("keeps Premium behind a configured provider, consent and positive cap", () => {
    expect(liveRunBlocked(configured, "premium", "0.5", true)).toBe(false);
    expect(liveRunBlocked(configured, "premium", "0", true)).toBe(true);
    expect(liveRunBlocked(hostOnly, "premium", "0.5", true)).toBe(true);
  });
});
