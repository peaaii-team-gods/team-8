import { describe, expect, it, vi, afterEach } from "vitest";
import { IdentitySession } from "./identity";

const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); localStorage.clear(); sessionStorage.clear(); });

describe("IdentitySession", () => {
  it("logs in via password/login, keeps tokens memory-only, never calls the old paths", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const fetchMock = vi.fn().mockResolvedValue(json({ access_token: "secret-token", csrf_token: "csrf-1", token_type: "Bearer", expires_in: 300, issuer: "id", user: { id: "u1", username: "brandon", roles: ["user"] } }));
    vi.stubGlobal("fetch", fetchMock);
    const session = new IdentitySession("http://id", "http://api");
    await session.login("brandon", "pw");
    expect(session.token).toBe("secret-token");
    expect(session.csrf).toBe("csrf-1");
    expect(session.user?.username).toBe("brandon");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://id/v1/auth/password/login");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ username: "brandon", password: "pw" });
    expect(String(url)).not.toContain("/v1/auth/bootstrap");
    expect(setItem).not.toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    session.clear();
    expect(session.token).toBeNull();
    expect(session.csrf).toBeNull();
  });

  it("bootstrapCsrf posts to identity session/bootstrap and stores only csrf", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ csrf_token: "csrf-2" }));
    vi.stubGlobal("fetch", fetchMock);
    const session = new IdentitySession("http://id", "http://api");
    await expect(session.bootstrapCsrf()).resolves.toBe("csrf-2");
    expect(session.csrf).toBe("csrf-2");
    expect(session.token).toBeNull();
    expect(fetchMock.mock.calls[0][0]).toBe("http://id/v1/auth/session/bootstrap");
    expect(fetchMock.mock.calls[0][1].method).toBe("POST");
  });

  it("surfaces login failure without storing anything", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 401 })));
    const session = new IdentitySession("http://id", "http://api");
    await expect(session.login("brandon", "bad")).rejects.toThrow("login failed (401)");
    expect(session.token).toBeNull();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });
});
