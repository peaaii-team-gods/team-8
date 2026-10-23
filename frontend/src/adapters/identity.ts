// Memory-only session: tokens are NEVER written to localStorage/sessionStorage
// (asserted by identity.test.ts). Password is cleared by the caller after dispatch.
// RHM browser session protocol: login → access+CSRF in memory; restore via
// bootstrap → refresh; logout with CSRF. Refresh cookie is HttpOnly on Identity.
export interface IdentityUser { id: string; username: string; roles: string[] }

export class IdentitySession {
  private accessToken: string | null = null;
  private csrfToken: string | null = null;
  private currentUser: IdentityUser | null = null;
  constructor(private identityBase: string, private apiBase?: string) {}

  private async post(path: string, body?: unknown, csrf?: string): Promise<Response> {
    const headers: Record<string, string> = { accept: "application/json" };
    if (body !== undefined) headers["content-type"] = "application/json";
    if (csrf) headers["X-CSRF-Token"] = csrf;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);
    try {
      return await fetch(`${this.identityBase}${path}`, {
        method: "POST",
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        credentials: "include",
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  private applyTokens(j: {
    access_token?: string;
    csrf_token?: string;
    user?: IdentityUser;
  }): void {
    if (!j.access_token) throw new Error("login failed (no access token)");
    this.accessToken = j.access_token;
    this.csrfToken = j.csrf_token ?? null;
    this.currentUser = j.user ?? null;
  }

  async login(username: string, password: string): Promise<void> {
    const r = await this.post("/v1/auth/password/login", { username, password });
    if (!r.ok) throw new Error(`login failed (${r.status})`);
    this.applyTokens((await r.json()) as { access_token?: string; csrf_token?: string; user?: IdentityUser });
  }

  /** Recover CSRF after reload (cookie + Origin). Does not issue an access token. */
  async bootstrapCsrf(): Promise<string> {
    const r = await this.post("/v1/auth/session/bootstrap");
    if (!r.ok) throw new Error(`bootstrap failed (${r.status})`);
    const j = (await r.json()) as { csrf_token?: string };
    if (!j.csrf_token) throw new Error("bootstrap failed (no csrf token)");
    this.csrfToken = j.csrf_token;
    return j.csrf_token;
  }

  /** Rotate refresh cookie and restore access + CSRF into memory. */
  async refresh(csrf?: string): Promise<void> {
    const token = csrf ?? this.csrfToken;
    if (!token) throw new Error("refresh failed (no csrf)");
    const r = await this.post("/v1/auth/refresh", undefined, token);
    if (!r.ok) throw new Error(`refresh failed (${r.status})`);
    this.applyTokens((await r.json()) as { access_token?: string; csrf_token?: string; user?: IdentityUser });
  }

  /** Bootstrap then refresh — used on live page load to restore a cookie session. */
  async restore(): Promise<boolean> {
    try {
      const csrf = await this.bootstrapCsrf();
      await this.refresh(csrf);
      return true;
    } catch {
      this.clear();
      return false;
    }
  }

  async logout(): Promise<void> {
    const csrf = this.csrfToken;
    try {
      if (!csrf) await this.bootstrapCsrf();
      const token = this.csrfToken;
      if (token) {
        const r = await this.post("/v1/auth/logout", undefined, token);
        if (!r.ok && r.status !== 204) throw new Error(`logout failed (${r.status})`);
      }
    } finally {
      this.clear();
    }
  }

  get token() { return this.accessToken; }
  get csrf() { return this.csrfToken; }
  get user() { return this.currentUser; }
  get authenticated() { return !!this.accessToken; }
  clear() { this.accessToken = null; this.csrfToken = null; this.currentUser = null; }
}
