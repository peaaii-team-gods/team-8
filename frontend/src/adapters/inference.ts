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
