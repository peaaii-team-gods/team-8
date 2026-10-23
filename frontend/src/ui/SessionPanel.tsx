import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { IdentitySession } from "../adapters/identity";
import { LiveAdapter } from "../adapters/live";
import { SERVICE_FEATURES, featureLive } from "../registry/services.manifest";
import SyntheticBadge from "./SyntheticBadge";

interface Props {
  apiBase: string;
  identityBase: string;
  /** Injectable for tests; defaults to a real memory-only IdentitySession. */
  session?: IdentitySession;
  onAuthenticated?: (adapter: LiveAdapter, session: IdentitySession) => void;
  onLogout?: () => void;
  /** Full-page gate styling for live sign-in. */
  variant?: "overlay" | "page";
}

/**
 * Live-mode login. The password is cleared from state as soon as the login
 * is dispatched (success or failure). Tokens stay memory-only in
 * IdentitySession — nothing is ever written to localStorage/sessionStorage.
 */
export default function SessionPanel({
  apiBase,
  identityBase,
  session,
  onAuthenticated,
  onLogout,
  variant = "overlay",
}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [capabilities, setCapabilities] = useState<Record<string, unknown> | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [activeSession, setActiveSession] = useState<IdentitySession | null>(null);

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
      setActiveSession(sess);
      onAuthenticated?.(adapter, sess);
      setSignedIn(true);
      setCapabilities(await adapter.capabilities().catch(() => null));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    try {
      await (activeSession ?? session)?.logout?.().catch(() => undefined);
    } finally {
      setSignedIn(false);
      setCapabilities(null);
      setActiveSession(null);
      setBusy(false);
      onLogout?.();
    }
  };

  const shell = (body: ReactNode) =>
    variant === "page" ? (
      <div className="relative flex min-h-full items-center justify-center px-4" data-testid="session-page">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,#3b1470_0%,#070312_65%)]" />
        <div className="relative z-10 w-full max-w-md">{body}</div>
      </div>
    ) : (
      body
    );

  if (signedIn) {
    return shell(
      <div className="glass p-5 text-sm" data-testid="session-panel">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="font-semibold">Live session</div>
          <SyntheticBadge />
        </div>
        {capabilities === null && <div className="mb-2 text-xs opacity-70">Capabilities unavailable — manifest defaults shown.</div>}
        <ul className="space-y-1 text-xs">
          {SERVICE_FEATURES.map((f) => (
            <li key={f.id}>{f.feature}: {featureLive(f, capabilities) ? "live" : "unavailable"}</li>
          ))}
        </ul>
        {onLogout && (
          <button type="button" className="glass mt-4 px-3 py-1 text-xs" disabled={busy} onClick={() => void logout()}>
            Sign out
          </button>
        )}
      </div>,
    );
  }

  return shell(
    <form className="glass flex flex-col gap-3 p-6 text-sm" data-testid="session-panel" onSubmit={(e) => void submit(e)}>
      <div className="font-display text-xl text-fuchsia-100">Sign in</div>
      <p className="text-xs text-white/65">Uses the shared RHM Identity. Access tokens stay in memory only.</p>
      <SyntheticBadge className="self-start" />
      <label className="text-xs">Username
        <input aria-label="Username" className="mt-1 w-full rounded bg-black/30 p-2" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
      </label>
      <label className="text-xs">Password
        <input aria-label="Password" type="password" className="mt-1 w-full rounded bg-black/30 p-2" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error && <div role="alert" className="text-xs text-red-300">{error}</div>}
      <button type="submit" disabled={busy} className="glass self-start px-4 py-2 text-sm font-semibold text-fuchsia-200">{busy ? "Signing in…" : "Sign in"}</button>
    </form>,
  );
}
