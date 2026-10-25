import hashlib
import json
from contextlib import contextmanager
from email.parser import BytesParser
from email.policy import default
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import sys
from threading import Thread
from urllib.parse import parse_qs, urlsplit

import pytest

import drive_export


SENSITIVE = ['test-client-secret-private', 'test-refresh-private', 'test-access-private']


@contextmanager
def fake_drive(*, fail_once=False, fail_always=False, bad_md5=False, bad_size=False, leak=False):
    state = {'refreshes': 0, 'uploads': [], 'folders': [], 'queries': [], 'rejected': False}

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def reply(self, status, body):
            raw = json.dumps(body).encode()
            self.send_response(status)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)

        def do_GET(self):
            query = parse_qs(urlsplit(self.path).query)
            state['queries'].append(query)
            assert self.headers['Authorization'].startswith('Bearer ')
            files = [folder for folder in state['folders'] if
                     "name = '" + folder['name'] + "'" in query['q'][0] and
                     (not folder.get('parents') or "'" + folder['parents'][0] + "' in parents" in query['q'][0])]
            self.reply(200, {'files': files})

        def do_POST(self):
            body = self.rfile.read(int(self.headers['Content-Length']))
            if self.path == '/token':
                form = parse_qs(body.decode())
                state['refreshes'] += 1
                if form['grant_type'] == ['refresh_token']:
                    assert form['refresh_token'] == [SENSITIVE[1]]
                else:
                    assert form['grant_type'] == ['authorization_code']
                    state['consent_form'] = form
                self.reply(200, {'access_token': SENSITIVE[2], 'refresh_token': SENSITIVE[1],
                                 'scope': drive_export.SCOPE})
                return
            if fail_always or (fail_once and '/upload/' in self.path and not state['rejected']):
                state['rejected'] = True
                self.reply(401, {'error': ' '.join(SENSITIVE)})
                return
            if leak:
                self.reply(500, {'error': ' '.join(SENSITIVE)})
                return
            assert self.headers['Authorization'] == 'Bearer ' + SENSITIVE[2]
            if urlsplit(self.path).path == '/drive/v3/files':
                metadata = json.loads(body)
                metadata['id'] = 'folder-' + str(len(state['folders']))
                state['folders'].append(metadata)
                self.reply(200, metadata)
                return
            assert urlsplit(self.path).path == '/upload/drive/v3/files'
            assert parse_qs(urlsplit(self.path).query) == {
                'uploadType': ['multipart'], 'fields': ['id,webViewLink,size,md5Checksum']}
            message = BytesParser(policy=default).parsebytes(
                ('Content-Type: ' + self.headers['Content-Type'] + '\r\n\r\n').encode() + body)
            parts = list(message.iter_parts())
            metadata = json.loads(parts[0].get_payload(decode=True))
            payload = parts[1].get_payload(decode=True)
            state['uploads'].append((metadata, payload))
            ident = 'upload-' + str(len(state['uploads']))
            self.reply(200, {'id': ident, 'webViewLink': 'https://drive.google.com/file/d/' + ident + '/view',
                             'size': str(len(payload) + int(bad_size)),
                             'md5Checksum': 'bad' if bad_md5 else hashlib.md5(payload).hexdigest()})

    server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f'http://127.0.0.1:{server.server_port}', state
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


@pytest.fixture
def configured(tmp_path, monkeypatch):
    secrets_path = tmp_path / 'secrets.json'
    secrets_path.write_text(json.dumps({'client_id': 'test-client', 'client_secret': SENSITIVE[0],
                                       'refresh_token': SENSITIVE[1]}))
    monkeypatch.setenv('DRIVE_SECRETS_FILE', str(secrets_path))
    directory = tmp_path / 'run-example'
    directory.mkdir()
    for name, content in [('rows.csv', b'a,b\n1,2\n'), ('mrf.sqlite', b'SQLite test bytes\x00\xff'),
                          ('report.md', b'# Guarded report\n')]:
        (directory / name).write_bytes(content)
    return directory, secrets_path


def use_server(monkeypatch, base):
    monkeypatch.setenv('DRIVE_TOKEN_URL', base + '/token')
    monkeypatch.setenv('DRIVE_API_BASE', base)


def assert_no_secrets(value):
    assert not any(secret in str(value) for secret in SENSITIVE)


def test_refresh_multipart_upload_verification_and_duplicate_names(configured, monkeypatch, capsys):
    directory, secrets_path = configured
    original = secrets_path.read_bytes()
    (directory / 'unapproved.txt').write_text('never upload this')
    with fake_drive() as (base, state):
        use_server(monkeypatch, base)
        first = drive_export.export_run(directory, directory.name)
        second = drive_export.export_run(directory, directory.name)
    assert state['refreshes'] == 2
    assert len(state['folders']) == 2
    assert state['folders'][0]['name'] == 'RHM Demo Exports'
    assert state['folders'][1]['name'] == directory.name
    assert state['folders'][1]['parents'] == ['folder-0']
    assert len(state['uploads']) == 6
    assert first['folder_id'] == second['folder_id'] == 'folder-1'
    assert {f['drive_id'] for f in first['files']}.isdisjoint(f['drive_id'] for f in second['files'])
    assert set(first) == {'folder_id', 'files', 'events'}
    assert first['events'] == []
    for item, (metadata, payload) in zip(first['files'], state['uploads']):
        assert set(item) == {'name', 'drive_id', 'link', 'sha256', 'size', 'verified'}
        assert payload == (directory / item['name']).read_bytes()
        assert metadata['parents'] == ['folder-1']
        assert item['size'] == len(payload)
        assert item['sha256'] == hashlib.sha256(payload).hexdigest()
        assert item['verified'] is True
    assert all('appProperties has' in q['q'][0] for q in state['queries'])
    assert secrets_path.read_bytes() == original
    assert_no_secrets(first)
    assert_no_secrets(capsys.readouterr())


def test_one_refresh_retry_after_401(configured, monkeypatch):
    with fake_drive(fail_once=True) as (base, state):
        use_server(monkeypatch, base)
        result = drive_export.export_run(configured[0], 'run-example')
    assert state['refreshes'] == 2
    assert len(result['files']) == 3


def test_repeated_401_stops_with_safe_error(configured, monkeypatch):
    with fake_drive(fail_always=True) as (base, state):
        use_server(monkeypatch, base)
        with pytest.raises(drive_export.DriveExportError) as error:
            drive_export.export_run(configured[0], 'run-example')
    assert state['refreshes'] == 2
    assert_no_secrets(error.value)


@pytest.mark.parametrize('option', ['bad_md5', 'bad_size'])
def test_unverified_when_remote_integrity_differs(configured, monkeypatch, option):
    with fake_drive(**{option: True}) as (base, _):
        use_server(monkeypatch, base)
        result = drive_export.export_run(configured[0], 'run-example')
    assert all(f['verified'] is False for f in result['files'])


def test_size_cap_before_network_and_no_local_changes(configured, monkeypatch):
    directory, _ = configured
    with (directory / 'mrf.sqlite').open('wb') as stream:
        stream.truncate(50 * 1024 * 1024 + 1)
    with fake_drive() as (base, state):
        use_server(monkeypatch, base)
        with pytest.raises(drive_export.DriveExportError, match='artifact_too_large'):
            drive_export.export_run(directory, 'run-example')
    assert state['refreshes'] == 0
    assert (directory / 'mrf.sqlite').stat().st_size == 50 * 1024 * 1024 + 1


@pytest.mark.parametrize('key', ['client_id', 'client_secret', 'refresh_token'])
def test_missing_key_only_names_key(configured, key):
    directory, secrets_path = configured
    config = json.loads(secrets_path.read_text())
    del config[key]
    secrets_path.write_text(json.dumps(config))
    with pytest.raises(drive_export.DriveExportError) as error:
        drive_export.export_run(directory, 'run-example')
    assert str(error.value) == key


def test_parent_folder_override(configured, monkeypatch):
    directory, secrets_path = configured
    config = json.loads(secrets_path.read_text())
    config['DRIVE_PARENT_FOLDER_ID'] = 'configured-parent'
    secrets_path.write_text(json.dumps(config))
    with fake_drive() as (base, state):
        use_server(monkeypatch, base)
        drive_export.export_run(directory, 'run-example')
    assert len(state['folders']) == 1
    assert state['folders'][0]['parents'] == ['configured-parent']


def test_cli_outputs_only_file_table_and_safe_failure(configured, monkeypatch):
    directory, _ = configured
    with fake_drive() as (base, _):
        use_server(monkeypatch, base)
        result = subprocess.run([sys.executable, '-m', 'drive_export', str(directory)],
                                capture_output=True, text=True)
    assert result.returncode == 0
    lines = result.stdout.splitlines()
    assert lines[0].split('\t') == ['name', 'link', 'verified']
    assert len(lines) == 4
    assert not result.stderr
    assert_no_secrets(result)
    with fake_drive(leak=True) as (base, _):
        use_server(monkeypatch, base)
        failed = subprocess.run([sys.executable, '-m', 'drive_export', str(directory)],
                                capture_output=True, text=True)
    assert failed.returncode == 1
    assert not failed.stdout
    assert_no_secrets(failed)
    assert 'Traceback' not in failed.stderr


def test_non_loopback_overrides_and_invalid_run_rejected(configured, monkeypatch):
    directory, _ = configured
    monkeypatch.setenv('DRIVE_TOKEN_URL', 'http://example.com/token')
    with pytest.raises(drive_export.DriveExportError):
        drive_export.export_run(directory, 'run-example')
    with pytest.raises(drive_export.DriveExportError, match='invalid_run_id'):
        drive_export.export_run(directory, "bad'folder")


def test_consent_loopback_pkce_and_only_refresh_token_saved(configured, monkeypatch, capsys):
    from scripts.drive_consent import consent
    from urllib.request import urlopen
    from urllib.parse import urlencode
    from urllib.error import HTTPError
    import base64

    _, secrets_path = configured
    original = json.loads(secrets_path.read_text())
    del original['refresh_token']
    original['custom'] = 'preserved'
    secrets_path.write_text(json.dumps(original))
    captured = {}

    def browser(url):
        query = parse_qs(urlsplit(url).query)
        assert query['scope'] == [drive_export.SCOPE]
        assert query['code_challenge_method'] == ['S256']
        assert query['access_type'] == ['offline']
        captured['challenge'] = query['code_challenge'][0]
        with pytest.raises(HTTPError) as error:
            urlopen(query['redirect_uri'][0] + '?' + urlencode({'code': 'wrong-code', 'state': 'wrong-state'}))
        assert error.value.code == 400
        with urlopen(query['redirect_uri'][0] + '?' + urlencode({
                'code': 'test-code', 'state': query['state'][0]})) as response:
            assert response.status == 200
        return True

    with fake_drive() as (base, state):
        use_server(monkeypatch, base)
        consent(open_browser=browser)
    saved = json.loads(secrets_path.read_text())
    assert saved == {**original, 'refresh_token': SENSITIVE[1]}
    assert 'access_token' not in saved
    assert state['consent_form']['code'] == ['test-code']
    verifier = state['consent_form']['code_verifier'][0]
    assert base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b'=').decode() == captured['challenge']
    assert capsys.readouterr().out == 'saved\n'


def test_consent_browser_failure_preserves_config(configured):
    from scripts.drive_consent import consent

    _, secrets_path = configured
    original = secrets_path.read_bytes()
    with pytest.raises(drive_export.DriveExportError, match='consent_incomplete'):
        consent(open_browser=lambda _: False)
    assert secrets_path.read_bytes() == original
    assert not list(secrets_path.parent.glob('.drive-consent-*'))


def test_missing_config_and_malformed_config_never_echo_input(configured, monkeypatch, capsys):
    directory, secrets_path = configured
    secrets_path.write_text(' '.join(SENSITIVE))
    with pytest.raises(drive_export.DriveExportError) as error:
        drive_export.export_run(directory, 'run-example')
    assert str(error.value) == 'invalid_config'
    assert_no_secrets(error.value)
    monkeypatch.delenv('DRIVE_SECRETS_FILE')
    with pytest.raises(drive_export.DriveExportError) as error:
        drive_export.export_run(directory, 'run-example')
    assert str(error.value) == 'DRIVE_SECRETS_FILE'
    assert_no_secrets(capsys.readouterr())
