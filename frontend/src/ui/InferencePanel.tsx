import { useEffect, useMemo, useRef, useState } from "react";
import type { IdentitySession } from "../adapters/identity";
import { InferenceSettings, type InferenceStatus, type Provider, type ProviderInput } from "../adapters/inference";
const empty = (): ProviderInput => ({ provider: "openrouter", model_id: "auto", api_key: "", base_url: "" });
export default function InferencePanel({ apiBase, session, onStatus, disabled }: { apiBase: string; session: IdentitySession; onStatus: (status: InferenceStatus | null) => void; disabled: boolean }) {
  const api = useMemo(() => new InferenceSettings(apiBase, session), [apiBase, session]);
  const live = useRef(true);
  const operation = useRef(0);
  const [status, setStatus] = useState<InferenceStatus | null>(null);
  const [primary, setPrimary] = useState(empty);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const apply = (next: InferenceStatus) => { setStatus(next); onStatus(next); setConfirmed(false); };
  useEffect(() => {
    let active = true; live.current = true;
    const attempt = ++operation.current;
    setBusy(true); setStatus(null); onStatus(null);
    void api.request().then(next => { if (active && attempt === operation.current) apply(next); }).catch(() => { if (active && attempt === operation.current) setError("Could not read account inference settings. Refresh before running."); }).finally(() => { if (active && attempt === operation.current) setBusy(false); });
    return () => { active = false; live.current = false; operation.current += 1; };
  }, [api]);
  const mutate = async (remove: boolean) => {
    if (!status || !confirmed || busy || disabled) return;
    const attempt = ++operation.current;
    const current = () => live.current && attempt === operation.current;
    setBusy(true); setError("");
    const body = remove ? { expected_revision: status.revision } : { ...primary, model_id: status.model_id?.trim() ? status.model_id : "auto", helper: null, expected_revision: status.revision };
    // Clear write-only key fields before the request settles, including failed requests.
    setPrimary(value => ({ ...value, api_key: "" }));
    try { const next = await api.request(remove ? "DELETE" : "PUT", body); if (current()) apply(next); }
    catch (failure) { if (!current()) return; setError(failure instanceof Error ? failure.message : "Settings request failed."); onStatus(null); }
    finally { if (current()) setBusy(false); }
  };
  const fields = (value: ProviderInput, change: (next: ProviderInput) => void, label: string) => <fieldset className="grid gap-2" disabled={busy || disabled}>
    <legend>Connection</legend>
    <label>Provider<select aria-label={`${label} provider`} value={value.provider} onChange={e => change({ ...value, provider: e.target.value as Provider, api_key: "", base_url: "" })}>
      <option value="openrouter">OpenRouter BYOK</option><option value="openai">Custom OpenAI-compatible (public HTTPS)</option><option value="freellmapi">FreeLLMAPI</option>
    </select></label>
    {value.provider !== "openrouter" && <label>Endpoint override<input aria-label={`${label} endpoint`} type="url" autoComplete="off" value={value.base_url} placeholder="https://your-endpoint.example/v1" onChange={e => change({ ...value, base_url: e.target.value })} /></label>}
    <label>API key<input aria-label={`${label} API key`} type="password" autoComplete="new-password" value={value.api_key} maxLength={4096} onChange={e => change({ ...value, api_key: e.target.value })} /></label>
  </fieldset>;
  return <section className="glass m-2 grid gap-3 p-3 text-xs" aria-label="Account inference settings">
    <h2>Provider credentials</h2>
    <p>This login shares its provider and key across RHM and the hackathon. Replacing or removing settings affects every teammate using this account. There is no operator-key fallback.{status?.host_models_authorized ? " This account may use the operator host model without its own provider." : " There is no operator-model fallback."}</p>
    <p>{status?.credential_lifetime === "encrypted_vault" ? "Keys are stored in the encrypted account vault across restarts." : "Keys stay in Backend memory until its process restarts. Re-enter them after a restart."} Keys are write-only and never returned here.</p>
    <p>Your endpoint must be reachable by Backend over public HTTPS. Browser localhost would refer to the server, not your PC. Do not expose an unauthenticated llama server.</p>
    <p role="status">{status?.configured ? `Connected: ${status.provider}. Choose the run model above.` : status?.host_models_authorized ? "No account provider. This login may use the operator host model." : "No confirmed account provider. Live runs are blocked."}</p>
    <button type="button" disabled={busy || disabled} onClick={() => { const attempt = ++operation.current; setBusy(true); setError(""); onStatus(null); void api.request().then(next => { if (live.current && attempt === operation.current) apply(next); }).catch(() => { if (live.current && attempt === operation.current) setError("Refresh failed. Live runs remain blocked."); }).finally(() => { if (live.current && attempt === operation.current) setBusy(false); }); }}>Refresh settings</button>
    {fields(primary, setPrimary, "Primary")}
    <p>Choose the run model above. Saving replaces this account's provider and removes its legacy helper.</p>
    <label><input type="checkbox" checked={confirmed} disabled={busy || disabled} onChange={e => setConfirmed(e.target.checked)} />I approve changing this shared account for everyone.</label>
    <button type="button" disabled={!status || !confirmed || busy || disabled || !primary.model_id || !primary.api_key} onClick={() => void mutate(false)}>Save account provider</button>
    <button type="button" disabled={!status?.configured || !confirmed || busy || disabled} onClick={() => void mutate(true)}>Remove account provider</button>
    {error && <p role="alert">{error}</p>}
  </section>;
}
