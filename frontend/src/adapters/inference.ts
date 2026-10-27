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
export function liveRunBlocked(inference: InferenceStatus | null, tier: "free" | "premium", spendCap: string, paidConsent: boolean): boolean {
  if (tier === "premium" && !inference?.configured) return true;
  return liveProviderBlocked(inference, spendCap, paidConsent);
}
export interface ProviderInput { provider: Provider; model_id: string; base_url?: string; api_key: string }
class InferenceSettingsError extends Error {}
export class InferenceSettings {
  constructor(private base: string, private session: IdentitySession) {}
  async listConnections(): Promise<InferenceConnection[]> {
    const response = await fetch(`${this.base}/v1/account/inference-connections`, {
      headers: { authorization: `Bearer ${this.session.token ?? ""}` }, cache: "no-store", redirect: "error", credentials: "omit",
    });
    if (!response.ok) throw new Error("Could not read inference connections. Refresh before running.");
    const body = await response.json();
    if (!Array.isArray(body?.connections)) throw new Error("Invalid inference connections response.");
    if (body.connections.some((connection: InferenceConnection) => !connection || typeof connection.id !== "string" || !/^[a-f0-9]{32}$/.test(connection.id))) throw new Error("Invalid primary inference connection id.");
    return body.connections;
  }
  async listModels(): Promise<InferenceModel[]> {
    const controller = new AbortController(), timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`${this.base}/v1/inference/models`, { headers: { "content-type": "application/json", authorization: `Bearer ${this.session.token ?? ""}` }, cache: "no-store", redirect: "error", credentials: "omit", signal: controller.signal });
      if (!response.ok) throw new Error("Model list unavailable");
      const body = await response.json();
      if (!Array.isArray(body?.models) || body.models.some((model: InferenceModel) => !model || typeof model.id !== "string" || !model.id || typeof model.label !== "string" || typeof model.provider !== "string" || typeof model.is_free !== "boolean" || typeof model.tool_capable !== "boolean" ||
        ![model.price_in_per_m, model.price_out_per_m].every(value => value === null || (typeof value === "number" && Number.isFinite(value))) ||
        !(model.context === null || (Number.isInteger(model.context))) || !(model.band === null || typeof model.band === "string"))) throw new Error("Invalid model list");
      return body.models;
    } finally { clearTimeout(timeout); }
  }
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
export interface InferenceConnection { id: string; label?: string | null }
export interface ModelOverride { v: 1; tier: ModelTier; pin: null | { model_id: string; is_free: boolean }; helper: null | { connection_id: string; model_id: string; is_free: boolean } }
export const MODEL_OVERRIDE_KEY = "crucible.modelOverride.v1";
export function readOverride(): ModelOverride {
  const fallback: ModelOverride = { v: 1, tier: "free", pin: null, helper: null };
  try {
    const value = JSON.parse(localStorage.getItem(MODEL_OVERRIDE_KEY) ?? "null");
    if (!value || !["pin,tier,v", "helper,pin,tier,v"].includes(Object.keys(value).sort().join()) || value.v !== 1 ||
      !["free", "cheaper_slow", "cheap_fast", "premium"].includes(value.tier)) return fallback;
    const pin = value.pin;
    if (pin !== null && (!pin || Object.keys(pin).sort().join() !== "is_free,model_id" ||
      typeof pin.model_id !== "string" || !pin.model_id.trim() || typeof pin.is_free !== "boolean")) return fallback;
    const helper = value.helper;
    const validHelper = helper && Object.keys(helper).sort().join() === "connection_id,is_free,model_id" &&
      typeof helper.connection_id === "string" && /^[a-f0-9]{32}$/.test(helper.connection_id) &&
      typeof helper.model_id === "string" && helper.model_id.length <= 200 && /^[A-Za-z0-9_./:+-]+$/.test(helper.model_id) && typeof helper.is_free === "boolean";
    return { ...value, helper: validHelper ? helper : null };
  } catch { return fallback; }
}
export async function runSelection(base: string, session: IdentitySession) {
  const { tier, pin, helper } = readOverride();
  const connections = await new InferenceSettings(base, session).listConnections();
  if (connections.length === 0) return undefined;
  if (helper && !connections.some(connection => connection.id === helper.connection_id)) throw new Error("Saved helper unavailable. Use Auto before running.");
  const helperSelection = helper ? { helper: { connection_id: helper.connection_id, model_id: helper.model_id } } : {};
  if (pin) return { mode: "manual", connection_id: connections[0].id, model_id: pin.model_id, allow_fallback: false, ...helperSelection };
  return { mode: "auto", tier, ...helperSelection };
}

export interface InferenceModel { id: string; label: string; provider: string; is_free: boolean; price_in_per_m: number | null; price_out_per_m: number | null; context: number | null; tool_capable: boolean; band: string | null }
export const modelPrice = (model?: InferenceModel) => model ? `${model.price_in_per_m === null ? "unknown" : `$${model.price_in_per_m}`} in / ${model.price_out_per_m === null ? "unknown" : `$${model.price_out_per_m}`} out per M` : "price unavailable";
export function writeOverride(value: ModelOverride) { localStorage.setItem(MODEL_OVERRIDE_KEY, JSON.stringify(value)); }
