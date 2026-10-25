"""Loopback-only local hospital demo. Golden artifacts never depend on proposals."""
import copy
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import re
import sys
import threading
import time
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
from analyze import summary_violations, write_run_artifacts
from discovery import discover
from hospital_mapping import generate_row_model
from mrf_apply import apply_mapping, load_json
from resources import digest
from scripts.slice_hpt import slice_hpt

PREFIX = '/api/pipeline'
LIMIT = 256 * 1024
ARTIFACTS = {'rows.csv': 'text/csv', 'mrf.sqlite': 'application/vnd.sqlite3', 'report.md': 'text/markdown; charset=utf-8'}
IDENTITY_ISS = 'https://identity.right-hand-man.space'
IDENTITY_AUD = 'rhm-fleet'
IDENTITY_JWKS = IDENTITY_ISS + '/.well-known/jwks.json'
JWKS_TTL = 600
JWKS_FAIL_BACKOFF = 60


class IdentityUnavailable(Exception):
    pass


def _load_jwt():
    import jwt
    from jwt.algorithms import RSAAlgorithm
    return jwt, RSAAlgorithm


class _JwksCache:
    def __init__(self):
        self.payload, self.at, self.fail_until = None, 0.0, 0.0

    def get(self):
        now = time.monotonic()
        if now < self.fail_until:
            if self.payload is None:
                raise IdentityUnavailable()
            return self.payload
        if self.payload is None or now - self.at >= JWKS_TTL:
            try:
                request = urllib.request.Request(IDENTITY_JWKS, headers={'Accept': 'application/json'})
                with urllib.request.urlopen(request, timeout=5) as resp:
                    payload = json.loads(resp.read().decode())
                if not isinstance(payload, dict) or not payload.get('keys'):
                    raise ValueError('jwks')
                self.payload, self.at, self.fail_until = payload, now, 0.0
            except Exception as exc:
                print(f'jwks_refresh_failed {type(exc).__name__}', file=sys.stderr)
                self.fail_until = now + JWKS_FAIL_BACKOFF
                if self.payload is None:
                    raise IdentityUnavailable() from exc
        return self.payload


_jwks = _JwksCache()


def _signing_key(token):
    jwt, RSAAlgorithm = _load_jwt()
    header = jwt.get_unverified_header(token)
    kid, keys = header.get('kid'), _jwks.get()['keys']
    jwk = next((item for item in keys if item.get('kid') == kid), None)
    if jwk is None and len(keys) == 1 and not kid:
        jwk = keys[0]
    if jwk is None:
        raise jwt.InvalidTokenError('kid')
    return RSAAlgorithm.from_jwk(jwk)


def authenticate(headers):
    raw = headers.get('Authorization') or headers.get('authorization') or ''
    parts = raw.split(None, 1)
    if len(parts) != 2 or parts[0].lower() != 'bearer' or not parts[1].strip():
        return 401, {'error': 'unauthorized'}
    token = parts[1].strip()
    try:
        jwt, _ = _load_jwt()
        claims = jwt.decode(token, _signing_key(token), algorithms=['RS256'], issuer=IDENTITY_ISS,
                            audience=IDENTITY_AUD, options={'require': ['exp', 'iss', 'aud', 'sub']})
    except IdentityUnavailable:
        return 503, {'error': 'identity_unavailable'}
    except ModuleNotFoundError as exc:
        print(f'auth_failed {type(exc).__name__}', file=sys.stderr)
        return 503, {'error': 'identity_unavailable'}
    except Exception as exc:
        print(f'auth_failed {type(exc).__name__}', file=sys.stderr)
        return 401, {'error': 'unauthorized'}
    if not claims.get('sub') or claims.get('token_type') != 'access' or claims.get('principal_type') != 'user':
        return 401, {'error': 'unauthorized'}
    return None, claims


def _checks(result, expected):
    return [{'name': key, 'pass': result[key] == value, 'expected': value, 'actual': result[key]}
            for key, value in expected['counts'].items()] + [
                {'name': 'digest', 'pass': digest(result['rows']) == expected['digest'],
                 'expected': expected['digest'], 'actual': digest(result['rows'])}]


def _excerpt(fixture):
    examples = []
    for item in fixture['standard_charge_information'][:2]:
        example = {'description': item.get('description', '')[:400], 'code_information': item.get('code_information', [])[:6],
                   'standard_charges': []}
        for charge in item.get('standard_charges', [])[:2]:
            sample = {k: charge[k] for k in ('gross_charge', 'discounted_cash', 'billing_class', 'setting') if k in charge}
            if 'payers_information' in charge:
                sample['payers_information'] = [{k: payer[k] for k in ('payer_name', 'plan_name', 'standard_charge_dollar',
                                                                     'standard_charge_amount') if k in payer}
                                                 for payer in charge['payers_information'][:2]]
            example['standard_charges'].append(sample)
        examples.append(example)
    return {'standard_charge_information': examples}


def _rate_check(fixture, mapping):
    key = mapping['fields']['rate']
    present = any(key in payer for item in fixture['standard_charge_information'] for charge in item['standard_charges']
                  for payer in charge.get('payers_information', []))
    return {'name': 'fields.rate', 'pass': present, 'expected': key, 'actual': key if present else 'missing'}


def run_pipeline(run_id, emit, data_dir, *, inject_error=False, discoverer=discover):
    emit('source', 'running', {}, {'type': 'start'})
    fetched = discoverer('www.southshorehealth.org', 'South Shore Hospital', cache_dir=data_dir / 'hpt-cache')
    emit('source', 'running', {}, {'type': 'trace', **{k: fetched[k] for k in ('trace', 'label', 'sha256')}})
    scratch = data_dir / 'slices' / run_id
    scratch.mkdir(parents=True)
    counts = slice_hpt(Path(fetched['path']), scratch / 'slice.json', scratch / 'provenance.json')
    fixture = json.loads((scratch / 'slice.json').read_text(encoding='utf-8'))
    emit('source', 'completed', counts, {'type': 'slice', 'counts': counts})
    mapping, repair = load_json('hospital-golden-mapping.json'), load_json('hospital-golden-repair.json')
    expected = load_json('hospital-golden-result.json')
    baseline = copy.deepcopy(fixture)
    if inject_error:
        fixture['injected_drift'] = 'injected: standard_charge_dollar -> standard_charge_amount'
        for item in fixture['standard_charge_information']:
            for charge in item.get('standard_charges', []):
                for payer in charge.get('payers_information', []):
                    if 'standard_charge_dollar' in payer:
                        payer['standard_charge_amount'] = payer.pop('standard_charge_dollar')
    # Bounded actual source examples only; never include top-level hospital contacts.
    emit('builder', 'running', {}, {'type': 'evidence', 'source_excerpt': _excerpt(baseline), 'drift_excerpt': _excerpt(fixture),
                                   'golden_mapping': mapping, 'golden_repair': repair})
    result = apply_mapping(fixture, mapping)
    checks = [_rate_check(fixture, mapping), *_checks(result, expected)]
    emit('builder', 'running', {}, {'type': 'checks', 'checks': checks})
    if inject_error:
        result = apply_mapping(fixture, repair)
        checks = [_rate_check(fixture, repair), *_checks(result, expected)]
        emit('builder', 'running', {}, {'type': 'repair', 'label': 'injected', 'mapping': repair, 'checks': checks})
    if not all(check['pass'] for check in checks):
        raise ValueError('golden_checks_failed')
    emit('builder', 'completed', {'row_count': len(result['rows'])}, {'type': 'checks', 'checks': checks})
    emit('store', 'running', {}, {'type': 'start'})
    artifacts = write_run_artifacts(result['rows'], run_id, data_dir=data_dir, mapping=repair if inject_error else mapping,
                                   excluded_counts={k: result[k] for k in ('skipped_no_dollar_count', 'quarantined_row_count')})
    emit('store', 'completed', {'row_count': artifacts['row_count']},
         {'type': 'artifact', 'row_count': artifacts['row_count'], 'sha256': artifacts['sha256'], 'label': 'local SQLite'})
    emit('analyst', 'completed', {'row_count': len(artifacts['top_rows'])},
         {'type': 'top10', 'rows': artifacts['top_rows'], 'baseline_label': artifacts['baseline_label']})
    return {'_fixture': fixture, '_baseline': baseline, '_rows': result['rows'], '_top_rows': artifacts['top_rows'],
            'report_md': Path(artifacts['report_path']).read_text(encoding='utf-8')}


def _diffs(value, golden, prefix=''):
    if isinstance(value, dict) and isinstance(golden, dict):
        return [path for key in sorted(set(value) | set(golden))
                for path in _diffs(value.get(key), golden.get(key), f'{prefix}.{key}' if prefix else key)]
    return [] if value == golden else [prefix]


def _proposal(mapping, fixture, rows):
    try:
        result = apply_mapping(fixture, mapping)
        model = generate_row_model(mapping)
        for row in result['rows']:
            model.model_validate(row)
        errors = [] if digest(result['rows']) == digest(rows) else ['run_rows']
        return not errors, len(result['rows']), errors
    except (ValueError, TypeError, KeyError, AttributeError):
        return False, 0, ['invalid_mapping']


class PipelineService:
    def __init__(self, *, data_dir=None, pipeline=None, exporter=None):
        self.data_dir = Path(data_dir) if data_dir is not None else ROOT / 'data'
        self.pipeline, self.exporter = pipeline or run_pipeline, exporter
        self.runs, self.threads, self.export_results = {}, {}, {}
        self.lock, self.export_lock = threading.RLock(), threading.Lock()

    def _run(self, run_id, inject):
        def emit(node, status, counts, telemetry):
            with self.lock:
                step = next(s for s in self.runs[run_id]['steps'] if s['node'] == node)
                step.update(status=status, counts=counts)
                step['telemetry'].append(telemetry)
        with self.lock:
            self.runs[run_id]['status'] = 'running'
        try:
            if self.pipeline is run_pipeline:
                result = self.pipeline(run_id, emit, self.data_dir, inject_error=inject)
            else:
                result = self.pipeline(run_id, emit, self.data_dir)
            with self.lock:
                self.runs[run_id].update(result, status='completed')
        except Exception:
            with self.lock:
                self.runs[run_id].update(status='failed', error='pipeline_failed')
                for step in self.runs[run_id]['steps']:
                    if step['status'] == 'running':
                        step['status'] = 'failed'
            print(f'pipeline_failed run_id={run_id}', file=sys.stderr)

    def _export(self, run_id):
        with self.export_lock:
            if run_id not in self.export_results:
                try:
                    exporter = self.exporter
                    if exporter is None:
                        if not os.environ.get('DRIVE_SECRETS_FILE'):
                            raise RuntimeError('drive_unavailable')
                        from drive_export import export_run
                        exporter = export_run
                    uploaded = exporter(self.data_dir / 'runs' / run_id, run_id)
                    result = {'status': 'exported', 'folder_id': uploaded['folder_id'],
                              'folder_link': uploaded['folder_link'], 'files': uploaded['files']}
                except Exception:
                    result = {'status': 'unavailable', 'reason': 'drive_export_unavailable'}
                    print(f'drive_export_unavailable run_id={run_id}', file=sys.stderr)
                self.export_results[run_id] = result
            return copy.deepcopy(self.export_results[run_id])

    def route(self, method, path, raw=b'', headers=None):
        def response(code, value, content='application/json'):
            return code, value, content
        if len(raw) > LIMIT:
            return response(413, {'error': 'body_too_large'})
        caller = None
        if os.environ.get('PIPELINE_REQUIRE_AUTH') == '1':
            code, payload = authenticate(headers or {})
            if code:
                return response(code, payload)
            caller = payload
        body = {}
        if raw:
            try:
                body = json.loads(raw, parse_constant=lambda _: (_ for _ in ()).throw(ValueError()))
                if not isinstance(body, dict):
                    raise ValueError()
            except (ValueError, UnicodeError):
                return response(400, {'error': 'invalid_json'})
        if method == 'POST' and path == PREFIX + '/run':
            if set(body) != {'source', 'inject_error'} or body['source'] != 'south-shore' or type(body['inject_error']) is not bool:
                return response(400, {'error': 'invalid_run'})
            run_id = 'run_' + uuid.uuid4().hex
            record = {'status': 'queued', 'steps': [{'node': node, 'status': 'pending', 'counts': {}, 'telemetry': []}
                                                    for node in ('source', 'builder', 'store', 'analyst')], 'report_md': ''}
            if caller:
                record['owner'] = caller['sub']
            with self.lock:
                self.runs[run_id] = record
                thread = threading.Thread(target=self._run, args=(run_id, body['inject_error']), daemon=True)
                self.threads[run_id] = thread
                thread.start()
            return response(202, {'run_id': run_id})
        match = re.fullmatch(re.escape(PREFIX) + r'/runs/(run_[a-f0-9]{32})(?:/(.*))?', path)
        if not match:
            return response(404, {'error': 'not_found'})
        run_id, action = match.groups()
        with self.lock:
            run = copy.deepcopy(self.runs.get(run_id))
        if run is None or (caller and run.get('owner') and run['owner'] != caller['sub']):
            return response(404, {'error': 'unknown_run'})
        if method == 'GET' and action is None:
            return response(200, {k: v for k, v in run.items() if not k.startswith('_')})
        if method == 'GET' and action and action.startswith('artifacts/'):
            name = action[len('artifacts/'):]
            directory = (self.data_dir / 'runs' / run_id).resolve()
            artifact = directory / name
            if name not in ARTIFACTS or artifact.resolve().parent != directory or not artifact.is_file():
                return response(404, {'error': 'not_found'})
            return response(200, artifact.read_bytes(), ARTIFACTS[name])
        if method == 'POST' and action in ('proposals', 'summary', 'export'):
            if run['status'] != 'completed':
                return response(409, {'error': 'run_incomplete'})
            if action == 'export':
                if raw:
                    return response(400, {'error': 'export_takes_no_body'})
                return response(200, self._export(run_id))
            if action == 'summary':
                if set(body) != {'text'} or not isinstance(body['text'], str):
                    return response(400, {'error': 'invalid_summary'})
                violations = summary_violations(body['text'], run['_top_rows'])
                return response(200, {'ok': not violations, 'violations': violations})
            if not body or set(body) - {'mapping', 'repair'}:
                return response(400, {'error': 'invalid_proposals'})
            result = {}
            if 'mapping' in body:
                golden = load_json('hospital-golden-mapping.json')
                baseline_rows = apply_mapping(run['_baseline'], golden)['rows']
                valid, _, _ = _proposal(body['mapping'], run['_baseline'], baseline_rows)
                diffs = _diffs(body['mapping'], golden)
                result['mapping'] = {'valid': valid, 'matches_golden': not diffs, 'diffs': diffs}
            if 'repair' in body:
                repair = body['repair']
                if isinstance(repair, dict) and repair.get('action') == 'replace_mapping':
                    repair = repair.get('mapping')
                valid, fixed, errors = _proposal(repair, run['_fixture'], run['_rows'])
                result['repair'] = {'valid': valid, 'fixed_rows': fixed, 'remaining_errors': errors}
            return response(200, result)
        return response(404, {'error': 'not_found'})


class Handler(BaseHTTPRequestHandler):
    service = PipelineService()

    def _handle(self):
        try:
            try:
                length = int(self.headers.get('Content-Length', '0'))
                if length < 0:
                    raise ValueError()
            except ValueError:
                length = LIMIT + 1
            if length > LIMIT:
                code, value, content = 413, {'error': 'body_too_large'}, 'application/json'
            else:
                code, value, content = self.service.route(self.command, self.path, self.rfile.read(length), self.headers)
            body = value if isinstance(value, bytes) else json.dumps(value, allow_nan=False).encode('utf-8')
        except Exception as exc:
            print(f'handler_failed {self.command} {type(exc).__name__}', file=sys.stderr)
            code, content = 500, 'application/json'
            body = b'{"error":"internal_error"}'
        self.send_response(code)
        self.send_header('Content-Type', content)
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    do_GET = do_POST = _handle

    def log_message(self, *_args):
        pass


if __name__ == '__main__':
    ThreadingHTTPServer((os.environ.get('PIPELINE_HOST', '127.0.0.1'), int(os.environ.get('PIPELINE_PORT', '8787'))), Handler).serve_forever()
