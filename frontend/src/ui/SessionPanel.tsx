import { useState } from "react";
import type { FormEvent } from "react";
import { IdentitySession } from "../adapters/identity";
import { LiveAdapter } from "../adapters/live";
import { SERVICE_FEATURES, featureLive } from "../registry/services.manifest";

interface Props {
  apiBase: string;
  identityBase: string;
  /** Injectable for tests; defaults to a real memory-only IdentitySession. */
  session?: IdentitySession;
  onAuthenticated?: (adapter: LiveAdapter) => void;
}

/**
 * Live-mode login. The password is cleared from state as soon as the login
 * is dispatched (success or failure). Tokens stay memory-only in
 * IdentitySession — nothing is ever written to localStorage/sessionStorage.
 */
export default function SessionPanel({ apiBase, identityBase, session, onAuthenticated }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [capabilities, setCapabilities] = useState<Record<string, unknown> | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const sess = session ?? new IdentitySession(identityBase, apiBase);
    const submittedPassword = password;
    setPassword(""); // clear immediately on dispatch, before any await resolves
    setError(null);
    setBusy(true);
    try {
      await sess.login(username, submittedPassword);
      const adapter = new LiveAdapter(apiBase, sess);
      onAuthenticated?.(adapter);
      setSignedIn(true);
      setCapabilities(await adapter.capabilities().catch(() => null));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  if (signedIn) {
    return (
      <div className="glass p-4 text-sm" data-testid="session-panel">
        <div className="font-semibold mb-2">Live session</div>
        {capabilities === null && <div className="text-xs opacity-70 mb-2">Capabilities unavailable — manifest defaults shown.</div>}
        <ul className="text-xs space-y-1">
          {SERVICE_FEATURES.map((f) => (
            <li key={f.id}>{f.feature}: {featureLive(f, capabilities) ? "live" : "unavailable"}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form className="glass p-4 text-sm flex flex-col gap-2" data-testid="session-panel" onSubmit={(e) => void submit(e)}>
      <div className="font-semibold">Live session — sign in</div>
      <label className="text-xs">Username
        <input aria-label="Username" className="w-full mt-1 p-2 rounded bg-black/30" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
      </label>
      <label className="text-xs">Password
        <input aria-label="Password" type="password" className="w-full mt-1 p-2 rounded bg-black/30" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error && <div role="alert" className="text-xs text-red-300">{error}</div>}
      <button type="submit" disabled={busy} className="glass px-3 py-1 text-sm self-start">{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
