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
    payload = {'iss': IDENTITY_ISS, 'aud': IDENTITY_AUD, 'sub': 'user-a', 'exp': now + 120, 'iat': now,
               'token_type': 'access', 'principal_type': 'user', **claims}
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
    _jwks.payload, _jwks.at, _jwks.fail_until = None, 0.0, 0.0
    yield
    _jwks.payload, _jwks.at, _jwks.fail_until = None, 0.0, 0.0


def test_valid_bearer(monkeypatch):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    code, claims = authenticate(_auth_headers(private))
    assert code is None and claims['sub'] == 'user-a'


def test_missing_bearer():
    assert authenticate({}) == (401, {'error': 'unauthorized'})
    assert authenticate({'Authorization': 'Bearer'}) == (401, {'error': 'unauthorized'})


def test_lowercase_bearer_scheme(monkeypatch):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    assert authenticate({'Authorization': 'bearer ' + _token(private)})[0] is None


def test_rejects_non_access_token_type(monkeypatch):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    assert authenticate(_auth_headers(private, token_type='refresh'))[0] == 401


def test_rejects_non_user_principal(monkeypatch):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    assert authenticate(_auth_headers(private, principal_type='service'))[0] == 401


def test_rejects_missing_user_access_claims(monkeypatch):
    private, jwk = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    now = int(time.time())
    token = jwt.encode({'iss': IDENTITY_ISS, 'aud': IDENTITY_AUD, 'sub': 'user-a', 'exp': now + 120, 'iat': now},
                       private, algorithm='RS256', headers={'kid': 'test'})
    assert authenticate({'Authorization': 'Bearer ' + token})[0] == 401


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
    calls = {'n': 0}

    def down(*_args, **_kwargs):
        calls['n'] += 1
        raise OSError('down')

    monkeypatch.setattr('server.pipeline_server.urllib.request.urlopen', down)
    assert authenticate(_auth_headers(private)) == (503, {'error': 'identity_unavailable'})
    assert authenticate(_auth_headers(private)) == (503, {'error': 'identity_unavailable'})
    assert calls['n'] == 1
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


def test_forged_signature_same_kid_not_logged(monkeypatch, capsys):
    private, jwk = _pair()
    other, _unused = _pair()
    monkeypatch.setattr(_jwks, 'get', lambda: {'keys': [jwk]})
    token = jwt.encode({'iss': IDENTITY_ISS, 'aud': IDENTITY_AUD, 'sub': 'user-a', 'exp': int(time.time()) + 120,
                        'iat': int(time.time()), 'token_type': 'access', 'principal_type': 'user'},
                       other, algorithm='RS256', headers={'kid': 'test'})
    assert authenticate({'Authorization': 'Bearer ' + token}) == (401, {'error': 'unauthorized'})
    err = capsys.readouterr().err
    assert 'auth_failed' in err
    assert token not in err
    assert 'user-a' not in err


def test_route_identity_unavailable(tmp_path, monkeypatch):
    monkeypatch.setenv('PIPELINE_REQUIRE_AUTH', '1')
    monkeypatch.setattr('server.pipeline_server.urllib.request.urlopen',
                        lambda *_args, **_kwargs: (_ for _ in ()).throw(OSError('down')))
    service = PipelineService(data_dir=tmp_path, pipeline=lambda *_args: {})
    private, _jwk = _pair()
    status, body, _ctype = service.route(
        'POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}', _auth_headers(private))
    assert status == 503 and body == {'error': 'identity_unavailable'}


def test_pipeline_server_has_no_module_level_jwt():
    import server.pipeline_server as ps
    assert 'jwt' not in vars(ps)


def test_default_mode_serves_when_jwt_unavailable(tmp_path, monkeypatch):
    monkeypatch.delenv('PIPELINE_REQUIRE_AUTH', raising=False)
    monkeypatch.setattr('server.pipeline_server._load_jwt',
                        lambda: (_ for _ in ()).throw(ModuleNotFoundError('jwt')))
    service = PipelineService(data_dir=tmp_path, pipeline=lambda *_args: {})
    status, created, _ctype = service.route(
        'POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
    assert status == 202
    service.threads[created['run_id']].join(5)


def test_auth_on_without_jwt_is_503(tmp_path, monkeypatch):
    monkeypatch.setenv('PIPELINE_REQUIRE_AUTH', '1')
    monkeypatch.setattr('server.pipeline_server._load_jwt',
                        lambda: (_ for _ in ()).throw(ModuleNotFoundError('jwt')))
    service = PipelineService(data_dir=tmp_path, pipeline=lambda *_args: {})
    assert service.route(
        'POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}',
        {'Authorization': 'Bearer x.y.z'})[:2] == (503, {'error': 'identity_unavailable'})
