import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { IdentitySession } from "../adapters/identity";
import { LiveAdapter } from "../adapters/live";
import { SERVICE_FEATURES, featureLive } from "../registry/services.manifest";
import SyntheticBadge from "./SyntheticBadge";
import { useToast } from "./toasts/ToastProvider";

interface Props {
  apiBase: string;
  identityBase: string;
  /** Injectable for tests; defaults to a real memory-only IdentitySession. */
  session?: IdentitySession;
  onAuthenticated?: (adapter: LiveAdapter, session: IdentitySession) => void;
  onLogout?: () => void;
  /** Full-page gate styling for live sign-in. */
  variant?: "overlay" | "page";
  /** Page variant only: leave the sign-in page (Back button and Escape). Ignored while busy. */
  onCancel?: () => void;
}

/** Map known identity failures to plain copy; unknown errors keep their raw message. */
function friendlyError(err: unknown): string {
  const e = err as { name?: string; message?: string } | null;
  const message = typeof e?.message === "string" ? e.message : "";
  if (/\((401|403)\)/.test(message)) return "Wrong username or password";
  const fetchFailure = e?.name === "TypeError" && /Failed to fetch|NetworkError when attempting to fetch|Load failed|fetch failed/i.test(message);
  if (e?.name === "AbortError" || fetchFailure) return "Couldn't reach the sign-in service. Try again.";
  return message || "Sign in failed";
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
  onCancel,
}: Props) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [capabilities, setCapabilities] = useState<Record<string, unknown> | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [activeSession, setActiveSession] = useState<IdentitySession | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const canCancel = variant === "page" && !!onCancel && !busy && !signedIn;

  useEffect(() => { usernameRef.current?.focus(); }, []);
  useEffect(() => {
    if (!canCancel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel?.(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canCancel, onCancel]);

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
      const message = friendlyError(err);
      setError(message);
      toast({ level: "error", title: "Sign in failed", detail: message });
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
      {variant === "page" && onCancel && (
        <button type="button" className="glass self-start px-3 py-1 text-sm disabled:opacity-50" disabled={busy} onClick={onCancel}>Back</button>
      )}
      <div className="font-display text-xl text-fuchsia-100">Sign in</div>
      <p className="text-sm text-white/80">Sign in with your Right Hand Man account. Your session stays in this browser tab's memory.</p>
      <SyntheticBadge className="self-start" />
      <label className="text-xs">Username
        <input ref={usernameRef} aria-label="Username" className="mt-1 w-full rounded bg-black/30 p-2" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
      </label>
      <label className="text-xs">Password
        <input aria-label="Password" type="password" className="mt-1 w-full rounded bg-black/30 p-2" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
      </label>
      {error && <div role="alert" className="text-xs text-red-300">{error}</div>}
      <button type="submit" disabled={busy} className="glass self-start px-4 py-2 text-sm font-semibold text-fuchsia-200">{busy ? "Signing in…" : "Sign in"}</button>
    </form>,
  );
}
