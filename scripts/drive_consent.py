"""One-time loopback OAuth consent; only the refresh token is added to config.

Provision a Desktop OAuth client, enable Drive API and put client_id/client_secret
in gitignored data/drive-secrets.json; set DRIVE_SECRETS_FILE to its path.
Run explicitly: python scripts/drive_consent.py. No access token is saved.
"""
import base64
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import secrets
import sys
import tempfile
from threading import Event, Thread
from urllib.parse import parse_qs, urlencode, urlsplit
import webbrowser

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from drive_export import DriveExportError, SCOPE, load_config, token_request


def consent(*, open_browser=None):
    filename, config = load_config(refresh=False)
    state, verifier = secrets.token_urlsafe(32), secrets.token_urlsafe(48)
    challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b'=').decode()
    done, reply = Event(), {}

    class Callback(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_GET(self):
            parsed = urlsplit(self.path)
            query = parse_qs(parsed.query)
            valid = (parsed.path == '/callback' and query.get('state') == [state]
                     and len(query.get('code', [])) == 1 and 'error' not in query and not done.is_set())
            self.send_response(200 if valid else 400)
            self.end_headers()
            self.wfile.write(b'Consent received. You may close this window.' if valid else b'Consent rejected.')
            if valid:
                reply['code'] = query['code'][0]
                done.set()

    temporary = None
    try:
        with ThreadingHTTPServer(('127.0.0.1', 0), Callback) as server:
            redirect = f'http://127.0.0.1:{server.server_port}/callback'
            thread = Thread(target=server.serve_forever, daemon=True)
            thread.start()
            try:
                url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlencode({
                    'client_id': config['client_id'], 'redirect_uri': redirect, 'response_type': 'code',
                    'scope': SCOPE, 'state': state, 'code_challenge': challenge,
                    'code_challenge_method': 'S256', 'access_type': 'offline', 'prompt': 'consent'})
                if not (open_browser or webbrowser.open)(url) or not done.wait(300):
                    raise DriveExportError('consent_incomplete')
            finally:
                server.shutdown()
                thread.join()
        response = token_request(config, grant_type='authorization_code', code=reply['code'],
                                 redirect_uri=redirect, code_verifier=verifier)
        token = response.get('refresh_token')
        if not isinstance(token, str) or not token:
            raise DriveExportError('refresh_token')
        if response.get('scope', SCOPE).split() != [SCOPE]:
            raise DriveExportError('unexpected_scope')
        config['refresh_token'] = token
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=filename.parent,
                                         prefix='.drive-consent-', delete=False) as stream:
            temporary = Path(stream.name)
            os.chmod(temporary, 0o600)
            json.dump(config, stream)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, filename)
    except DriveExportError:
        raise
    except Exception:
        raise DriveExportError('consent_failed') from None
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    print('saved')


if __name__ == '__main__':
    try:
        consent()
    except DriveExportError as error:
        print(error.reason, file=sys.stderr)
        raise SystemExit(1)
