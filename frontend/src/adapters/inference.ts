import type { IdentitySession } from "./identity";
export type Provider = "openrouter" | "freellmapi" | "openai" | "local";
export interface ProviderMetadata { provider: Provider; model_id: string; base_url: string }
export interface InferenceStatus { configured: boolean; revision: string | null; provider?: Provider | null; model_id?: string | null; base_url?: string | null; helper?: ProviderMetadata | null; credential_lifetime: "backend_process" | "encrypted_vault"; host_models_authorized: boolean }
/** Live Run/Drift are blocked only when the account has no provider and is not host-authorized. Configured accounts still need paid consent and a positive cap. */
export function liveProviderBlocked(inference: InferenceStatus | null, spendCap: string, paidConsent: boolean): boolean {
  const configured = !!inference?.configured;
  const hostAuthorized = !!inference?.host_models_authorized;
  if (!configured && !hostAuthorized) return true;
  const cap = Number(spendCap);
  if (!Number.isFinite(cap) || cap < 0) return true;
  return configured && (!paidConsent || cap <= 0);
}
export function liveRunBlocked(inference: InferenceStatus | null, _tier: "free" | "premium", spendCap: string, paidConsent: boolean): boolean {
  return liveProviderBlocked(inference, spendCap, paidConsent);
}
export interface ProviderInput { provider: Provider; model_id: string; base_url?: string; api_key: string }
class InferenceSettingsError extends Error {}
export class InferenceSettings {
  constructor(private base: string, private session: IdentitySession) {}
  async request(method = "GET", body?: unknown): Promise<InferenceStatus> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`${this.base}/v1/account/inference-provider`, {
        method, headers: { "content-type": "application/json", authorization: `Bearer ${this.session.token ?? ""}` },
        body: body === undefined ? undefined : JSON.stringify(body), cache: "no-store", redirect: "error", signal: controller.signal,
      });
      if (!response.ok) {
        if (response.status === 409) throw new InferenceSettingsError("Settings changed in another session. Refresh before replacing or removing them.");
        if (response.status === 422) throw new InferenceSettingsError("Provider settings rejected. Use a public HTTPS endpoint without credentials in its URL. Host loopback and private addresses are forbidden.");
        if (response.status === 401 || response.status === 403) throw new InferenceSettingsError("Sign in again or ask for account inference permission.");
        throw new InferenceSettingsError(`Inference settings request failed (${response.status}). Refresh to check its outcome before retrying.`);
      }
      return await response.json() as InferenceStatus;
    } catch (error) {
      if (error instanceof InferenceSettingsError) throw error;
      throw new InferenceSettingsError("Inference settings connection failed. Refresh to check its outcome before retrying.");
    } finally { clearTimeout(timeout); }
  }
}

export type ModelTier = "free" | "cheaper_slow" | "cheap_fast" | "premium";
export interface ModelOverride { v: 1; tier: ModelTier; pin: null | { model_id: string; is_free: boolean } }
export const MODEL_OVERRIDE_KEY = "crucible.modelOverride.v1";
export function readOverride(): ModelOverride {
  const fallback: ModelOverride = { v: 1, tier: "free", pin: null };
  try {
    const value = JSON.parse(localStorage.getItem(MODEL_OVERRIDE_KEY) ?? "null");
    if (!value || Object.keys(value).sort().join() !== "pin,tier,v" || value.v !== 1 ||
      !["free", "cheaper_slow", "cheap_fast", "premium"].includes(value.tier)) return fallback;
    const pin = value.pin;
    if (pin !== null && (!pin || Object.keys(pin).sort().join() !== "is_free,model_id" ||
      typeof pin.model_id !== "string" || !pin.model_id.trim() || typeof pin.is_free !== "boolean")) return fallback;
    return value;
  } catch { return fallback; }
}
export async function runSelection(base: string, session: IdentitySession) {
  const { tier, pin } = readOverride();
  if (pin) {
    const response = await fetch(`${base}/v1/account/inference-connections`, {
      headers: { authorization: `Bearer ${session.token ?? ""}` }, cache: "no-store", redirect: "error", credentials: "omit",
    });
    if (!response.ok) throw new Error("Could not read inference connections. Refresh before running.");
    const body = await response.json() as { connections?: { id?: unknown }[] };
    if (!Array.isArray(body.connections)) throw new Error("Invalid inference connections response.");
    const primary = body.connections[0];
    if (primary) {
      if (typeof primary.id !== "string" || !/^[a-f0-9]{32}$/.test(primary.id)) throw new Error("Invalid primary inference connection id.");
      return { mode: "manual", connection_id: primary.id, model_id: pin.model_id, allow_fallback: false };
    }
  }
  return { mode: "auto", tier };
}
