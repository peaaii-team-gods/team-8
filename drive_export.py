"""Explicit Google Drive (direct API, not MCP) export of local run artifacts.

Set DRIVE_SECRETS_FILE to a gitignored JSON file (for example under data/)
containing client_id, client_secret, refresh_token and optionally
DRIVE_PARENT_FOLDER_ID. Endpoint overrides are restricted to loopback tests.
"""
import hashlib
import json
import os
from pathlib import Path
import re
import secrets
import sys
from urllib.error import HTTPError
from urllib.parse import urlencode, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

SCOPE = 'https://www.googleapis.com/auth/drive.file'
MAX_SIZE = 50 * 1024 * 1024
ARTIFACTS = ('rows.csv', 'mrf.sqlite', 'report.md')
FOLDER_TYPE = 'application/vnd.google-apps.folder'
MARKER = {'rhmDemoExport': 'v1'}


class DriveExportError(RuntimeError):
    """A short safe reason, never an upstream body, URL, path or credential."""

    @property
    def reason(self):
        return str(self)


class _NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def load_config(*, refresh=True):
    filename = os.environ.get('DRIVE_SECRETS_FILE')
    if not filename:
        raise DriveExportError('DRIVE_SECRETS_FILE')
    try:
        config = json.loads(Path(filename).read_text(encoding='utf-8'))
        if not isinstance(config, dict):
            raise ValueError
    except Exception:
        raise DriveExportError('invalid_config') from None
    for key in ('client_id', 'client_secret') + (('refresh_token',) if refresh else ()):
        if not isinstance(config.get(key), str) or not config[key].strip():
            raise DriveExportError(key)
    return Path(filename), config


def endpoint(key, default):
    value = os.environ.get(key)
    if value is None:
        return default
    parsed = urlsplit(value)
    if (parsed.scheme != 'http' or parsed.hostname not in ('127.0.0.1', '::1')
            or parsed.username or parsed.password or parsed.query or parsed.fragment):
        raise DriveExportError('invalid_test_endpoint')
    return value.rstrip('/')


def request_json(url, *, data=None, headers=None, method=None):
    try:
        request = Request(url, data=data, headers=headers or {}, method=method)
        with build_opener(_NoRedirect()).open(request, timeout=30) as response:
            raw = response.read(1024 * 1024 + 1)
        if len(raw) > 1024 * 1024:
            raise ValueError
        result = json.loads(raw)
        if not isinstance(result, dict):
            raise ValueError
        return result
    except HTTPError as error:
        status = error.code
        error.close()
        raise DriveExportError('unauthorized' if status == 401 else 'drive_request_failed') from None
    except Exception:
        raise DriveExportError('drive_request_failed') from None


def token_request(config, **fields):
    url = endpoint('DRIVE_TOKEN_URL', 'https://oauth2.googleapis.com/token')
    return request_json(url, data=urlencode({
        'client_id': config['client_id'], 'client_secret': config['client_secret'], **fields
    }).encode(), headers={'Content-Type': 'application/x-www-form-urlencoded'})


def _drive_id(value):
    if not isinstance(value, str) or not re.fullmatch(r'[A-Za-z0-9_-]{1,256}', value):
        raise DriveExportError('invalid_drive_response')
    return value


class _Drive:
    def __init__(self, config):
        self.config = config
        self.base = endpoint('DRIVE_API_BASE', 'https://www.googleapis.com')
        self.token = None
        self.refresh()

    def refresh(self):
        response = token_request(self.config, grant_type='refresh_token',
                                 refresh_token=self.config['refresh_token'])
        if response.get('scope', SCOPE).split() != [SCOPE]:
            raise DriveExportError('unexpected_scope')
        token = response.get('access_token')
        if not isinstance(token, str) or not token or any(ord(c) < 33 for c in token):
            raise DriveExportError('invalid_token_response')
        self.token = token

    def request(self, path, *, data=None, content_type='application/json'):
        for attempt in range(2):
            try:
                return request_json(self.base + path, data=data, headers={
                    'Authorization': 'Bearer ' + self.token, 'Content-Type': content_type})
            except DriveExportError as error:
                if str(error) != 'unauthorized' or attempt:
                    raise
                self.refresh()

    def folder(self, name, parent):
        # Only this application's marked folders are reused. No caller-selected IDs.
        query = (f"name = '{name}' and mimeType = '{FOLDER_TYPE}' and trashed = false and "
                 "appProperties has { key='rhmDemoExport' and value='v1' } and "
                 f"'{parent}' in parents")
        result = self.request('/drive/v3/files?' + urlencode({
            'q': query, 'fields': 'files(id),nextPageToken', 'pageSize': 100}))
        files = result.get('files')
        if not isinstance(files, list):
            raise DriveExportError('invalid_drive_response')
        if files:
            return _drive_id(files[0].get('id'))
        metadata = {'name': name, 'mimeType': FOLDER_TYPE, 'parents': [parent], 'appProperties': MARKER}
        result = self.request('/drive/v3/files?fields=id', data=json.dumps(metadata).encode())
        return _drive_id(result.get('id'))

    def upload(self, name, payload, parent):
        boundary = 'rhm_' + secrets.token_hex(24)
        metadata = json.dumps({'name': name, 'parents': [parent], 'appProperties': MARKER}).encode()
        body = (f'--{boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'.encode()
                + metadata + f'\r\n--{boundary}\r\nContent-Type: application/octet-stream\r\n\r\n'.encode()
                + payload + f'\r\n--{boundary}--\r\n'.encode())
        result = self.request('/upload/drive/v3/files?' + urlencode({
            'uploadType': 'multipart', 'fields': 'id,webViewLink,size,md5Checksum'}),
            data=body, content_type='multipart/related; boundary=' + boundary)
        ident = _drive_id(result.get('id'))
        link = result.get('webViewLink', '')
        parsed = urlsplit(link)
        if (parsed.scheme != 'https' or parsed.hostname not in ('drive.google.com', 'docs.google.com')
                or parsed.username or parsed.password or any(c.isspace() for c in link)):
            raise DriveExportError('invalid_drive_response')
        return {'name': name, 'drive_id': ident, 'link': link, 'sha256': hashlib.sha256(payload).hexdigest(),
                'size': len(payload), 'verified': str(result.get('size')) == str(len(payload))
                and result.get('md5Checksum') == hashlib.md5(payload).hexdigest()}


def export_run(run_dir: Path, run_id: str):
    """Upload three artifacts; creates new files, leaves local data unchanged.

    The HTTP caller owns completed-run admission and repeat-request idempotency.
    Partial remote uploads can remain after a failed request; no overwrite/delete.
    """
    try:
        if not isinstance(run_id, str) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,127}', run_id):
            raise DriveExportError('invalid_run_id')
        _, config = load_config()
        parent = config.get('DRIVE_PARENT_FOLDER_ID')
        if parent is not None:
            parent = _drive_id(parent)
        paths = [Path(run_dir) / name for name in ARTIFACTS]
        for path in paths:
            if path.is_symlink() or not path.is_file():
                raise DriveExportError('artifact_unavailable')
            if path.stat().st_size > MAX_SIZE:
                raise DriveExportError('artifact_too_large')
        payloads = []
        for path in paths:
            with path.open('rb') as stream:
                payload = stream.read(MAX_SIZE + 1)
            if len(payload) > MAX_SIZE:
                raise DriveExportError('artifact_too_large')
            payloads.append(payload)
        drive = _Drive(config)
        parent = parent or drive.folder('RHM Demo Exports', 'root')
        folder = drive.folder(run_id, parent)
        files = [drive.upload(name, payload, folder) for name, payload in zip(ARTIFACTS, payloads)]
        result = {'folder_id': folder, 'files': files, 'events': []}
        serialized = json.dumps(result)
        if any(config[key] in serialized for key in ('client_secret', 'refresh_token')) or drive.token in serialized:
            raise DriveExportError('invalid_drive_response')
        return result
    except DriveExportError:
        raise
    except Exception:
        raise DriveExportError('export_failed') from None


def main():
    if len(sys.argv) != 2:
        print('usage: python -m drive_export <run_dir>', file=sys.stderr)
        return 1
    try:
        result = export_run(Path(sys.argv[1]), Path(sys.argv[1]).name)
    except DriveExportError as error:
        print(error.reason, file=sys.stderr)
        return 1
    print('name\tlink\tverified')
    for item in result['files']:
        print(f"{item['name']}\t{item['link']}\t{str(item['verified']).lower()}")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
