"""Identity password login and rotating refresh; credentials live in memory only."""
import time
from urllib.parse import urlsplit

import httpx


class AuthError(RuntimeError):
    pass


def origin(value):
    value = value.rstrip("/")
    parsed = urlsplit(value)
    if (not parsed.hostname or parsed.username or parsed.password or parsed.path
            or parsed.query or parsed.fragment or not (
                parsed.scheme == "https" or (parsed.scheme == "http" and
                parsed.hostname in {"localhost", "127.0.0.1", "::1"}))):
        raise ValueError("Use an HTTPS origin (HTTP is allowed only on loopback).")
    return value


class IdentitySession:
    """Separate cookie jar: refresh cookies never go to the public backend."""
    def __init__(self, issuer, client_origin, *, transport=None):
        self.issuer = origin(issuer)
        self.http = httpx.Client(base_url=self.issuer, timeout=15, trust_env=False,
                                 follow_redirects=False, transport=transport,
                                 headers={"Origin": origin(client_origin),
                                          "User-Agent": "rhm-pipeline-pilot/1"})
        self.access_token = self.csrf = None
        self.user_id = None
        self.expires_at = 0

    def _accept(self, response):
        if response.status_code not in {200, 201}:
            self._discard()
            raise AuthError(f"Identity authentication failed (HTTP {response.status_code}).")
        try:
            body = response.json()
            token, csrf, user = body["access_token"], body["csrf_token"], body["user"]["id"]
            lifetime = body["expires_in"]
            if (not isinstance(body["token_type"], str) or body["token_type"].lower() != "bearer"
                    or origin(body["issuer"]) != self.issuer
                    or not all(isinstance(x, str) and x for x in (token, csrf, user))
                    or type(lifetime) is not int or not 0 < lifetime <= 300
                    or (self.user_id is not None and user != self.user_id)):
                raise ValueError
        except (KeyError, TypeError, ValueError):
            self._discard()
            raise AuthError("Identity returned an invalid or mismatched session.") from None
        self.access_token, self.csrf, self.user_id = token, csrf, user
        self.expires_at = time.monotonic() + lifetime
        return self

    def _discard(self):
        self.access_token = self.csrf = None
        self.expires_at = 0
        self.http.cookies.clear()

    def login(self, username, password):
        try:
            return self._accept(self.http.post("/v1/auth/password/login",
                                               json={"username": username, "password": password}))
        except httpx.HTTPError:
            raise AuthError("Identity login response unavailable; sign in again explicitly.") from None

    def enroll(self, username, password, invite):
        try:
            return self._accept(self.http.post("/v1/auth/invite/redeem", json={
                "username": username, "password": password, "invite_token": invite}))
        except httpx.HTTPError:
            raise AuthError("Enrollment response unavailable. Try ordinary login before "
                            "redeeming the invitation again.") from None

    def refresh(self):
        # Rotation is not blindly retried after a lost response.
        try:
            self._accept(self.http.post("/v1/auth/refresh", headers={"X-CSRF-Token": self.csrf}))
        except (httpx.HTTPError, AuthError):
            self.access_token = None
            raise AuthError("Refresh failed or its result is uncertain; sign in again.") from None

    def bearer(self):
        if not self.access_token:
            raise AuthError("Sign in before calling the API.")
        if time.monotonic() >= self.expires_at - 15:
            self.refresh()
        return self.access_token

    def close(self):
        try:
            if self.csrf:
                response = self.http.post("/v1/auth/logout", headers={"X-CSRF-Token": self.csrf})
                if response.status_code not in {200, 204}:
                    raise AuthError("Remote logout was not confirmed; local credentials cleared.")
        except httpx.HTTPError:
            raise AuthError("Remote logout was not confirmed; local credentials cleared.") from None
        finally:
            self.access_token = self.csrf = None
            self.http.cookies.clear()
            self.http.close()
