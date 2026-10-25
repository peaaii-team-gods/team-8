import json
import time

import jwt
import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from jwt.algorithms import RSAAlgorithm

from server.pipeline_server import IDENTITY_AUD, IDENTITY_ISS, PipelineService, _jwks, authenticate


def _pair():
    private = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    jwk = json.loads(RSAAlgorithm.to_jwk(private.public_key()))
    jwk.update(kid='test', use='sig', alg='RS256')
    return private, jwk


def _token(private, **claims):
    now = int(time.time())
    payload = {'iss': IDENTITY_ISS, 'aud': IDENTITY_AUD, 'sub': 'user-a', 'exp': now + 120, 'iat': now, **claims}
    return jwt.encode(payload, private, algorithm='RS256', headers={'kid': 'test'})


def _auth_headers(private, **claims):
    return {'Authorization': 'Bearer ' + _token(private, **claims)}


class _JwksResp:
    def __init__(self, body):
        self.body = body

    def read(self):
        return self.body

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False


@pytest.fixture(autouse=True)
def reset_jwks():
    _jwks.payload, _jwks.at = None, 0.0
    yield
    _jwks.payload, _jwks.at = None, 0.0


def test_valid_bearer(monkeypatch):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    code, claims = authenticate(_auth_headers(private))
    assert code is None and claims['sub'] == 'user-a'


def test_missing_bearer():
    assert authenticate({}) == (401, {'error': 'unauthorized'})
    assert authenticate({'Authorization': 'Bearer'}) == (401, {'error': 'unauthorized'})


def test_expired_token_logs_auth_failed(monkeypatch, capsys):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    assert authenticate(_auth_headers(private, exp=int(time.time()) - 30))[0] == 401
    assert 'auth_failed' in capsys.readouterr().err


def test_wrong_iss(monkeypatch, capsys):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    assert authenticate(_auth_headers(private, iss='https://evil.example'))[0] == 401
    assert 'auth_failed' in capsys.readouterr().err


def test_wrong_aud(monkeypatch, capsys):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    assert authenticate(_auth_headers(private, aud='identity-service'))[0] == 401
    assert 'auth_failed' in capsys.readouterr().err


def test_jwks_down_no_cache_returns_503(monkeypatch, capsys):
    private, _jwk = _pair()

    def down(*_args, **_kwargs):
        raise OSError('down')

    monkeypatch.setattr('server.pipeline_server.urllib.request.urlopen', down)
    assert authenticate(_auth_headers(private)) == (503, {'error': 'identity_unavailable'})
    assert 'jwks_refresh_failed' in capsys.readouterr().err


def test_jwks_refresh_failure_keeps_cached_keys(monkeypatch, capsys):
    private, jwk = _pair()
    body = json.dumps({'keys': [jwk]}).encode()
    calls = {'n': 0}

    def urlopen(*_args, **_kwargs):
        calls['n'] += 1
        if calls['n'] == 1:
            return _JwksResp(body)
        raise OSError('down')

    monkeypatch.setattr('server.pipeline_server.urllib.request.urlopen', urlopen)
    assert authenticate(_auth_headers(private))[0] is None
    _jwks.at = 0.0
    assert authenticate(_auth_headers(private))[0] is None
    assert calls['n'] == 2
    assert 'jwks_refresh_failed' in capsys.readouterr().err


def test_owner_isolation(tmp_path, monkeypatch):
    monkeypatch.setenv('PIPELINE_REQUIRE_AUTH', '1')
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})

    def pending(run_id, emit, data_dir):
        return {}

    service = PipelineService(data_dir=tmp_path, pipeline=pending)
    alice, bob = _auth_headers(private, sub='alice'), _auth_headers(private, sub='bob')
    assert service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')[0] == 401
    status, created, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}', alice)
    assert status == 202
    path = '/api/pipeline/runs/' + created['run_id']
    assert service.route('GET', path, b'', alice)[0] == 200
    assert service.route('GET', path, b'', bob)[:2] == (404, {'error': 'unknown_run'})
    assert service.route('POST', path + '/export', b'', bob)[:2] == (404, {'error': 'unknown_run'})
    status, record, _ = service.route('GET', path, b'', alice)
    assert status == 200 and record['owner'] == 'alice'
    service.threads[created['run_id']].join(5)
