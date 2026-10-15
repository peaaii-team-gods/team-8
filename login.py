"""Sign in through the existing AGS identity issuer's browser PKCE flow.

The session returns directly to Python; it is never printed. session() saves it
using an approved native operating-system credential store.
"""

import base64
import hashlib
import os
import secrets
import time
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlsplit

import httpx


# The browser flow below is deliberately kept separate from AGS work execution:
# it obtains and validates the user's identity session before any agent is created.
def login(issuer=None):
    # Build the PKCE verifier/challenge and CSRF state used for this one login.
    verifier = secrets.token_urlsafe(48)
    challenge = (
        base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).decode().rstrip("=")
    )
    state = secrets.token_urlsafe(32)
    callback = {}

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):
            # Accept only the expected loopback callback, matching state and code.
            url = urlsplit(self.path)
            query = parse_qs(url.query)
            valid = (
                url.path == "/callback"
                and secrets.compare_digest(query.get("state", [""])[0], state)
                and bool(query.get("code", [""])[0])
            )
            self.send_response(200 if valid else 400)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(
                b"Return to your Python console." if valid else b"Invalid sign-in callback."
            )
            if valid:
                callback["code"] = query["code"][0]

        def log_message(self, *args):
            pass  # Callback URLs contain a one-time authorization code.

    issuer = issuer or os.getenv("AGS_IDENTITY_BASE", "https://id.right-hand-man.space").rstrip("/")
    # Start a short-lived local callback server and identity HTTP client.
    with (
        HTTPServer(("127.0.0.1", 0), Handler) as server,
        httpx.Client(timeout=20, trust_env=False) as client,
    ):
        redirect = f"http://127.0.0.1:{server.server_port}/callback"
        response = client.post(
            f"{issuer}/api/v1/auth/native/start",
            json={
                "code_challenge": challenge,
                "redirect_uri": redirect,
                "state": state,
            },
        )
        response.raise_for_status()
        started = response.json()
        # Open the issuer's authorization page and wait for the browser redirect.
        print(
            "Sign in with your own passkey, then choose 'Verify passkey and authorize'.", flush=True
        )
        print(f"If your browser doesn't open: {started['authorization_url']}", flush=True)
        webbrowser.open(started["authorization_url"])
        server.timeout = 1
        deadline = time.monotonic() + 300
        while not callback and time.monotonic() < deadline:
            server.handle_request()
        if not callback:
            raise RuntimeError("Browser sign-in timed out. Run the demo again.")
        # Exchange the one-time browser code for the Python client's session token.
        response = client.post(
            f"{issuer}/api/v1/auth/native/exchange",
            json={
                "request_id": started["request_id"],
                "code_verifier": verifier,
                "code": callback["code"],
                "redirect_uri": redirect,
            },
        )
        response.raise_for_status()
        return response.json()["session_token"]


def origin(value):
    """Bind cached credentials to exact trusted origins, without URL credentials."""
    # Reject paths, embedded credentials, and non-HTTPS origins except loopback.
    value = value.rstrip("/")
    parsed = urlsplit(value)
    if (
        not parsed.hostname
        or parsed.username
        or parsed.password
        or parsed.path
        or parsed.query
        or parsed.fragment
        or not (
            parsed.scheme == "https"
            or (parsed.scheme == "http" and parsed.hostname in {"127.0.0.1", "localhost", "::1"})
        )
    ):
        raise RuntimeError(
            "Use an HTTPS origin, or a literal loopback HTTP origin, without a path."
        )
    return value


def credential_store():
    """Refuse plaintext, null, and unknown third-party keyring backends."""
    # Select only OS-backed keyrings; never silently fall back to a plaintext file.
    try:
        import keyring
    except ImportError as exc:
        raise RuntimeError(
            "Install the demo dependencies: python -m pip install httpx keyring"
        ) from exc
    backend = keyring.get_keyring()
    native = {
        "keyring.backends.Windows",
        "keyring.backends.macOS",
        "keyring.backends.SecretService",
        "keyring.backends.kwallet",
    }
    candidates = (
        getattr(backend, "backends", [])
        if type(backend).__module__ == "keyring.backends.chainer"
        else [backend]
    )
    for candidate in candidates:
        if type(candidate).__module__ in native and candidate.priority > 0:
            return candidate
    raise RuntimeError(
        "No supported native credential store is available; no plaintext fallback is used."
    )


def cache_name(ags_base, issuer):
    # Bind the cache key to both services so tokens cannot cross environments.
    bound = origin(ags_base) + "\n" + origin(issuer)
    return "rhm-ags-demo-" + hashlib.sha256(bound.encode()).hexdigest()[:24]


def session(ags_base, issuer):
    """Reuse a valid OS-stored session; reauthenticate only after a cached 401."""
    # Load an explicitly supplied token first, otherwise retrieve the native cache.
    store = credential_store()
    name = cache_name(ags_base, issuer)
    supplied = os.getenv("AGS_TOKEN")
    token = supplied or store.get_password(name, "session")
    with httpx.Client(base_url=origin(issuer), timeout=20, trust_env=False) as client:
        if token:
            # Validate cached credentials before using them for AGS work.
            response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
            if response.status_code == 401 and not supplied:
                store.delete_password(name, "session")
                token = None
            else:
                response.raise_for_status()
        fresh = not token
        if fresh:
            # Only an absent or revoked cached session starts the browser flow.
            token = login(origin(issuer))
            response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
            response.raise_for_status()
        account = response.json()
        try:
            # Persist the verified token only after identity validation succeeds.
            store.set_password(name, "session", token)
        except Exception as exc:
            if fresh:
                client.post("/api/v1/auth/logout", headers={"Authorization": f"Bearer {token}"})
            raise RuntimeError(
                "Could not save the session in the native credential store."
            ) from exc
    print(f"{'Signed in' if fresh else 'Reusing session'} as {account['username']}.", flush=True)
    return token, account


def logout(ags_base, issuer):
    # Revoke the cached session at the issuer, then remove its local cache entry.
    store = credential_store()
    name = cache_name(ags_base, issuer)
    token = store.get_password(name, "session")
    if token:
        with httpx.Client(base_url=origin(issuer), timeout=20, trust_env=False) as client:
            response = client.post(
                "/api/v1/auth/logout", headers={"Authorization": f"Bearer {token}"}
            )
            if response.status_code != 401:
                response.raise_for_status()
        store.delete_password(name, "session")
    print("Saved demo session revoked/removed.")
