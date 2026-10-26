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
from analyze import summary_violations, write_ledger_artifacts
from discovery import discover
from hospital_mapping import generate_row_model
from ingest import ingest_file
from mrf_apply import apply_mapping, load_json
from resources import digest

PREFIX = '/api/pipeline'
LIMIT = 256 * 1024
KEEP_RUNS = 2
ARTIFACTS = {'rows.csv': 'text/csv', 'report.csv': 'text/csv', 'mrf.sqlite': 'application/vnd.sqlite3',
             'report.md': 'text/markdown; charset=utf-8'}
STAGE = ('bytes_streamed', 'items_parsed', 'rows_emitted', 'rows_quarantined', 'rows_repaired',
         'stage_ms', 'rows_per_s', 'mb_per_s')
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
    counts = result['counts'] if 'rows' in result else result
    return [{'name': key, 'pass': counts[key] == value, 'expected': value, 'actual': counts[key]}
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


def _rate_check(present, key):
    return {'name': 'fields.rate', 'pass': present, 'expected': key, 'actual': key if present else 'missing'}


def _wrap_excerpt(items):
    return _excerpt({'standard_charge_information': items})


def _metrics(parsed):
    metrics = dict(parsed['metrics'])
    counts = {key: metrics[key] for key in STAGE if key in metrics}
    counts.update(item_count=parsed['counts']['items_parsed'], code_type_counts=parsed['code_type_counts'],
                  parse_mode=parsed['parse_mode'])
    return counts, metrics


def run_pipeline(run_id, emit, data_dir, *, inject_error=False, discoverer=discover):
    emit('source', 'running', {}, {'type': 'start'})
    fetched = discoverer('www.southshorehealth.org', 'South Shore Hospital', cache_dir=data_dir / 'hpt-cache')
    emit('source', 'running', {}, {'type': 'trace', **{k: fetched[k] for k in ('trace', 'label', 'sha256')}})
    baseline = ingest_file(fetched['path'], inject_error=False)
    source_counts, source_metrics = _metrics(baseline)
    emit('source', 'completed', source_counts, {'type': 'ingest', 'parse_mode': baseline['parse_mode'], **source_metrics})
    mapping, repair = load_json('hospital-golden-mapping.json'), load_json('hospital-golden-repair.json')
    golden_path = ROOT / 'fixtures' / 'hospital-full-golden-result.json'
    loaded = json.loads(golden_path.read_text(encoding='utf-8')) if golden_path.is_file() else None
    expected = loaded if loaded and baseline['sha256'] == loaded.get('source_sha256') else None
    drifted = ingest_file(fetched['path'], inject_error=True) if inject_error else baseline
    emit('builder', 'running', {}, {'type': 'evidence', 'source_excerpt': _wrap_excerpt(baseline['excerpt']),
                                   'drift_excerpt': _wrap_excerpt(drifted['excerpt']),
                                   'golden_mapping': mapping, 'golden_repair': repair})
    result, rate_key = drifted if inject_error else baseline, mapping['fields']['rate']
    checks = [_rate_check(result['rate_present'], rate_key)]
    if expected:
        checks.extend(_checks(result if not inject_error else drifted, expected))
    emit('builder', 'running', {}, {'type': 'checks', 'checks': checks})
    if inject_error:
        result = ingest_file(fetched['path'], inject_error=True, rate_key=repair['fields']['rate'])
        skipped_delta = drifted['counts']['skipped_no_dollar_count'] - result['counts']['skipped_no_dollar_count']
        result['counts']['rows_repaired'] = skipped_delta
        result['metrics']['rows_repaired'] = skipped_delta
        expected_repaired = drifted['counts']['skipped_no_dollar_count'] - (
            expected['counts']['skipped_no_dollar_count'] if expected else result['counts']['skipped_no_dollar_count'])
        repair_checks = [_rate_check(result['rate_present'], repair['fields']['rate'])]
        if expected:
            repair_checks.extend(_checks(result, expected))
        else:
            repair_checks.append({'name': 'digest', 'pass': digest(result['rows']) == digest(baseline['rows']),
                                  'expected': digest(baseline['rows']), 'actual': digest(result['rows'])})
        repair_checks.append({'name': 'rows_repaired', 'pass': skipped_delta == expected_repaired,
                              'expected': expected_repaired, 'actual': skipped_delta})
        emit('builder', 'running', {}, {'type': 'repair', 'label': 'injected', 'mapping': repair, 'checks': repair_checks})
        checks = repair_checks
    if expected and not all(check['pass'] for check in checks):
        raise ValueError('golden_checks_failed')
    emit('builder', 'completed', {'row_count': len(result['rows']), **result['metrics']},
         {'type': 'checks', 'checks': checks})
    emit('store', 'running', {}, {'type': 'start'})
    artifacts = write_ledger_artifacts(
        result['rows'], run_id, data_dir=data_dir,
        excluded_counts={k: result['counts'][k] for k in ('skipped_no_dollar_count', 'quarantined_row_count')},
        metrics=result['metrics'])
    store_counts = {'row_count': artifacts['row_count'], **{k: result['metrics'][k] for k in STAGE}}
    emit('store', 'completed', store_counts,
         {'type': 'artifact', 'row_count': artifacts['row_count'], 'sha256': artifacts['sha256'],
          'label': 'local SQLite', **result['metrics']})
    emit('analyst', 'completed', {'row_count': len(artifacts['top_rows']), **result['metrics']},
         {'type': 'top10', 'rows': artifacts['top_rows'], 'row_count': len(artifacts['top_rows']),
          'spread': artifacts['spread'], 'baseline_label': artifacts['baseline_label']})
    return {'_source_path': fetched['path'], '_inject_error': inject_error, '_row_count': len(result['rows']),
            '_top_rows': artifacts['top_rows'],
            'report_md': Path(artifacts['report_path']).read_text(encoding='utf-8')}


def _diffs(value, golden, prefix=''):
    if isinstance(value, dict) and isinstance(golden, dict):
        return [path for key in sorted(set(value) | set(golden))
                for path in _diffs(value.get(key), golden.get(key), f'{prefix}.{key}' if prefix else key)]
    return [] if value == golden else [prefix]


def _load_source(run, *, drifted):
    cached = run.get('_fixture' if drifted else '_baseline')
    if cached is not None:
        return cached
    raise ValueError('source_not_cached')


def _proposal(mapping, fixture, rows):
    try:
        result = apply_mapping(fixture, mapping)
        model = generate_row_model(mapping)
        for row in result['rows']:
            model.model_validate(row)
        errors = [] if digest(result['rows']) == digest(rows) else ['run_rows']
        return not errors, len(result['rows']), errors
    except (ValueError, TypeError, KeyError, AttributeError) as exc:
        print(f'proposal_apply_invalid {type(exc).__name__}', file=sys.stderr)
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
                self._retain()
        except Exception:
            with self.lock:
                self.runs[run_id].update(status='failed', error='pipeline_failed')
                for step in self.runs[run_id]['steps']:
                    if step['status'] == 'running':
                        step['status'] = 'failed'
                self._retain()
            print(f'pipeline_failed run_id={run_id}', file=sys.stderr)

    def _retain(self, reserved=None):
        while len(self.runs) > KEEP_RUNS:
            rid = next((k for k, rec in self.runs.items()
                        if k != reserved and rec.get('status') != 'running'), None)
            if rid is None:
                break
            self.runs.pop(rid, None)
            self.threads.pop(rid, None)
            self.export_results.pop(rid, None)

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
                self._retain(reserved=run_id)
                thread = threading.Thread(target=self._run, args=(run_id, body['inject_error']), daemon=True)
                self.threads[run_id] = thread
                thread.start()
            return response(202, {'run_id': run_id})
        match = re.fullmatch(re.escape(PREFIX) + r'/runs/(run_[a-f0-9]{32})(?:/(.*))?', path)
        if not match:
            return response(404, {'error': 'not_found'})
        run_id, action = match.groups()
        with self.lock:
            stored = self.runs.get(run_id)
            if stored is None:
                run, private = None, {}
            else:
                run = {k: copy.deepcopy(v) for k, v in stored.items() if not k.startswith('_')}
                private = {k: stored[k] for k in stored if k.startswith('_')}
        if run is None or (caller and run.get('owner') and run['owner'] != caller['sub']):
            return response(404, {'error': 'unknown_run'})
        if method == 'GET' and action is None:
            return response(200, run)
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
                violations = summary_violations(body['text'], private.get('_top_rows') or [])
                return response(200, {'ok': not violations, 'violations': violations})
            if not body or set(body) - {'mapping', 'repair'}:
                return response(400, {'error': 'invalid_proposals'})
            result = {}
            cached = {**run, **private}
            if 'mapping' in body:
                golden = load_json('hospital-golden-mapping.json')
                diffs = _diffs(body['mapping'], golden)
                if private.get('_baseline') is not None or private.get('_fixture') is not None:
                    baseline = _load_source(cached, drifted=False)
                    baseline_rows = apply_mapping(baseline, golden)['rows']
                    valid, _, _ = _proposal(body['mapping'], baseline, baseline_rows)
                else:
                    valid = not diffs
                result['mapping'] = {'valid': valid, 'matches_golden': not diffs, 'diffs': diffs}
            if 'repair' in body:
                repair = body['repair']
                if isinstance(repair, dict) and repair.get('action') == 'replace_mapping':
                    repair = repair.get('mapping')
                try:
                    from hospital_mapping import parse_hospital_mapping
                    parse_hospital_mapping(repair)
                    if private.get('_fixture') is not None or private.get('_baseline') is not None:
                        valid, fixed, errors = _proposal(repair, _load_source(cached, drifted=True), private.get('_rows') or [])
                        result['repair'] = {'valid': valid, 'fixed_rows': fixed, 'remaining_errors': errors}
                    else:
                        diffs = _diffs(repair, load_json('hospital-golden-repair.json'))
                        valid = not diffs
                        result['repair'] = {'valid': valid, 'fixed_rows': 0 if not valid else int(private.get('_row_count') or 0),
                                            'remaining_errors': [] if valid else ['run_rows']}
                except (ValueError, TypeError, KeyError, AttributeError) as exc:
                    print(f'proposal_repair_invalid {type(exc).__name__}', file=sys.stderr)
                    result['repair'] = {'valid': False, 'fixed_rows': 0, 'remaining_errors': ['invalid_mapping']}
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
