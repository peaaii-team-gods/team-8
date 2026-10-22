// Memory-only session: tokens are NEVER written to localStorage/sessionStorage
// (asserted by identity.test.ts). Password is cleared by the caller after dispatch.
// Live Identity contract (integrate-identity app/routers/auth.py:283,
// app/browser_contracts.py:14-27): POST /v1/auth/password/login returns
// AuthTokens {access_token, csrf_token, user} directly + refresh cookie.
// POST /v1/auth/session/bootstrap returns ONLY {csrf_token} (cookie+Origin
// required) — it issues no access token, so login must not depend on it.
export interface IdentityUser { id: string; username: string; roles: string[] }

export class IdentitySession {
  private accessToken: string | null = null;
  private csrfToken: string | null = null;
  private currentUser: IdentityUser | null = null;
  // apiBase kept for constructor compatibility with existing callers; the
  // live session flow talks only to Identity (backend takes the bearer).
  constructor(private identityBase: string, private apiBase?: string) {}
  async login(username: string, password: string): Promise<void> {
    const r = await fetch(`${this.identityBase}/v1/auth/password/login`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ username, password }), credentials: "include" });
    if (!r.ok) throw new Error(`login failed (${r.status})`);
    const j = (await r.json()) as { access_token?: string; csrf_token?: string; user?: IdentityUser };
    if (!j.access_token) throw new Error("login failed (no access token)");
    this.accessToken = j.access_token;
    this.csrfToken = j.csrf_token ?? null;
    this.currentUser = j.user ?? null;
  }
  /** Recover the generation-bound CSRF token after a reload (cookie+Origin). */
  async bootstrapCsrf(): Promise<string> {
    const r = await fetch(`${this.identityBase}/v1/auth/session/bootstrap`, { method: "POST", credentials: "include" });
    if (!r.ok) throw new Error(`bootstrap failed (${r.status})`);
    const j = (await r.json()) as { csrf_token?: string };
    if (!j.csrf_token) throw new Error("bootstrap failed (no csrf token)");
    this.csrfToken = j.csrf_token;
    return j.csrf_token;
  }
  get token() { return this.accessToken; }
  get csrf() { return this.csrfToken; }
  get user() { return this.currentUser; }
  clear() { this.accessToken = null; this.csrfToken = null; this.currentUser = null; }
}
