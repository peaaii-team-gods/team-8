import copy
import json
from io import BytesIO
import threading
import time
from concurrent.futures import ThreadPoolExecutor

import pytest

from mrf_apply import load_json
from server.pipeline_server import Handler, PipelineService, ROOT, run_pipeline


def fake_pipeline(run_id, emit, data_dir):
    from analyze import write_ledger_artifacts
    from ingest import ingest_file
    parsed = ingest_file(ROOT / 'fixtures' / 'hospital-v3-slice.json')
    result = write_ledger_artifacts(parsed['rows'], run_id, data_dir=data_dir)
    emit('analyst', 'completed', {'row_count': len(result['top_rows'])},
         {'type': 'top10', 'rows': result['top_rows'][:10], 'row_count': len(result['top_rows'])})
    return {}


def ready(tmp_path, exporter=None):
    service = PipelineService(data_dir=tmp_path, pipeline=fake_pipeline, exporter=exporter)
    status, value, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
    assert status == 202
    service.threads[value['run_id']].join(5)
    return service, value['run_id']


def route(service, method, path, body=None):
    return service.route(method, path, json.dumps(body).encode() if body is not None else b'')[:2]


def test_frontend_launch_keeps_data_under_repository_root(monkeypatch):
    monkeypatch.chdir(ROOT / 'frontend')
    assert PipelineService().data_dir == ROOT / 'data'


def test_status_and_artifact_allowlist(tmp_path):
    service, run_id = ready(tmp_path)
    prefix = '/api/pipeline/runs/' + run_id
    status, result = route(service, 'GET', prefix)
    assert status == 200 and result['status'] == 'completed'
    assert result['steps'][-1]['telemetry'][0]['type'] == 'top10'
    assert '_rows' not in result and 'report_md' not in result
    status, report = route(service, 'GET', prefix + '/artifacts/report.md')
    assert status == 200 and b'local SQLite' in report
    for name in ('rows.csv', 'mrf.sqlite', 'report.md'):
        status, body = route(service, 'GET', prefix + '/artifacts/' + name)
        assert status == 200 and body
    for name in ('../report.md', 'source.json', 'rows.csv/extra'):
        assert route(service, 'GET', prefix + '/artifacts/' + name)[0] == 404
    assert route(service, 'GET', '/api/pipeline/runs/unknown')[0] == 404


def test_proposals_summary_and_golden_record_never_changed(tmp_path):
    service, run_id = ready(tmp_path)
    prefix = '/api/pipeline/runs/' + run_id
    mapping = load_json('hospital-golden-mapping.json')
    before = (tmp_path / 'runs' / run_id / 'rows.csv').read_bytes()
    repair = load_json('hospital-golden-repair.json')
    status, result = route(service, 'POST', prefix + '/proposals', {'mapping': mapping, 'repair': repair})
    assert status == 200 and result['mapping'] == {'valid': True, 'matches_golden': True, 'diffs': []}
    assert result['repair'] == {'valid': True, 'fixed_rows': 0, 'remaining_errors': []}
    wrong = copy.deepcopy(mapping)
    wrong['fields']['rate'] = 'standard_charge_amount'
    _, result = route(service, 'POST', prefix + '/proposals', {'mapping': wrong})
    assert not result['mapping']['valid'] and not result['mapping']['matches_golden']
    assert 'fields.rate' in result['mapping']['diffs']
    assert route(service, 'POST', prefix + '/summary', {'text': 'No invented figures.'}) == (200, {'ok': True, 'violations': []})
    assert route(service, 'POST', prefix + '/summary', {'text': '$9999999'})[1] == {'ok': False, 'violations': ['$9999999']}
    assert (tmp_path / 'runs' / run_id / 'rows.csv').read_bytes() == before
    assert route(service, 'POST', '/api/pipeline/runs/unknown/proposals', {'mapping': mapping})[0] == 404


def test_bad_bodies_and_incomplete_export(tmp_path):
    entered, release = threading.Event(), threading.Event()
    def pending(run_id, emit, data_dir):
        entered.set()
        release.wait(5)
        return {}
    service = PipelineService(data_dir=tmp_path, pipeline=pending)
    for body in (b'not json', b'[]', b'{"source":"elsewhere"}', b'{"source":"south-shore","inject_error":NaN}', b'{"source":"south-shore","inject_error":1}'):
        assert service.route('POST', '/api/pipeline/run', body)[0] == 400
    assert service.route('POST', '/api/pipeline/run', b'x' * (256 * 1024 + 1))[0] == 413
    _, run, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
    assert entered.wait(2)
    assert route(service, 'POST', '/api/pipeline/runs/' + run['run_id'] + '/export')[0] == 409
    release.set()
    service.threads[run['run_id']].join(5)


def test_export_once_even_concurrently_and_missing_config_keeps_artifacts(tmp_path, monkeypatch):
    calls = []
    files = [{'name': name, 'drive_id': 'file-' + str(index), 'link': 'https://drive.google.com/file/d/test',
              'sha256': '0' * 64, 'size': 123, 'verified': True}
             for index, name in enumerate(('rows.csv', 'mrf.sqlite', 'report.md'))]
    def exporter(directory, run_id):
        calls.append((directory, run_id))
        return {'folder_id': 'drive-folder', 'folder_link': 'https://drive.google.com/drive/folders/drive-folder', 'files': files, 'events': []}
    service, run_id = ready(tmp_path / 'one', exporter)
    path = '/api/pipeline/runs/' + run_id + '/export'
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda _: route(service, 'POST', path), range(4)))
    assert len(calls) == 1 and all(value == results[0] for value in results)
    assert results[0] == (200, {'status': 'exported', 'folder_id': 'drive-folder', 'folder_link': 'https://drive.google.com/drive/folders/drive-folder', 'files': files})
    monkeypatch.delenv('DRIVE_SECRETS_FILE', raising=False)
    service, run_id = ready(tmp_path / 'two')
    status, result = route(service, 'POST', '/api/pipeline/runs/' + run_id + '/export')
    assert status == 200 and result['status'] == 'unavailable'
    assert (tmp_path / 'two' / 'runs' / run_id / 'rows.csv').exists()


def test_real_pipeline_offline_with_injected_repair(tmp_path):
    fixture = load_json('hospital-v3-slice.json')
    source = tmp_path / 'source.json'
    source.write_text(json.dumps(fixture), encoding='utf-8')
    def discover(domain, location_hint, **kwargs):
        assert domain == 'www.southshorehealth.org' and location_hint == 'South Shore Hospital'
        return {'path': str(source), 'trace': [], 'label': 'cached', 'sha256': 'fixture'}
    events = []
    result = run_pipeline('offline', lambda *args: events.append(args), tmp_path, inject_error=True, discoverer=discover)
    from ingest import ingest_file
    from resources import digest
    restored = ingest_file(source, inject_error=True, rate_key='standard_charge_amount')
    assert result == {}
    assert restored['counts']['inserted_row_count'] > 42
    assert any(event[3]['type'] == 'repair' for event in events)
    assert any(event[3].get('label') == 'cached' for event in events)
    assert (tmp_path / 'runs' / 'offline' / 'mrf.sqlite').exists()
    evidence = next(event[3] for event in events if event[3]['type'] == 'evidence')
    assert 'standard_charge_dollar' in json.dumps(evidence['source_excerpt'])
    assert 'standard_charge_amount' in json.dumps(evidence['drift_excerpt'])
    assert len(json.dumps(evidence)) < 8192
    assert any(check['name'] == 'fields.rate' and not check['pass'] for event in events
               for check in event[3].get('checks', []))
    repair = next(event[3] for event in events if event[3].get('type') == 'repair')
    assert any(check['name'] == 'self-consistency' and check['pass'] for check in repair['checks'])
    assert all(check['name'] != 'rows_repaired' for check in repair['checks'])
    builder = next(event for event in events if event[0] == 'builder' and event[1] == 'completed')
    restored_count = builder[2]['rows_repaired']
    assert restored_count > 0 and restored_count != restored['counts']['inserted_row_count']


def test_source_path_repair_rejects_invalid_mapping(tmp_path, capsys):
    service = PipelineService(data_dir=tmp_path)
    source = tmp_path / 'source.json'
    source.write_bytes((ROOT / 'fixtures' / 'hospital-v3-slice.json').read_bytes())
    run_id = 'run_' + 'ab' * 16
    service.runs[run_id] = {'status': 'completed', 'steps': [], '_accessed': 0}
    status, result = route(service, 'POST', '/api/pipeline/runs/' + run_id + '/proposals',
                           {'repair': {'fields': {'rate': 'SECRET must never escape'}}})
    assert status == 200 and result['repair'] == {'valid': False, 'fixed_rows': 0, 'remaining_errors': ['invalid_mapping']}
    err = capsys.readouterr().err
    assert 'proposal_repair_invalid' in err and 'SECRET' not in err


def test_running_run_is_not_evicted(tmp_path, monkeypatch):
    from server import pipeline_server as mod
    entered, release = threading.Event(), threading.Event()
    state = {'hold': True}
    def pipeline(run_id, emit, data_dir):
        if state['hold']:
            (data_dir / 'runs' / run_id).mkdir(parents=True)
            entered.set()
            release.wait(5)
            return {}
        return fake_pipeline(run_id, emit, data_dir)
    service = PipelineService(data_dir=tmp_path, pipeline=pipeline)
    _, running, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
    assert entered.wait(2)
    # More than 30 minutes unpolled, while the worker is still running.
    service.runs[running['run_id']]['_accessed'] = time.monotonic() - mod.RETAIN_IDLE_S - 1
    state['hold'] = False
    for _ in range(3):
        status, value, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
        assert status == 202
        service.threads[value['run_id']].join(5)
    assert route(service, 'GET', '/api/pipeline/runs/' + running['run_id'])[0] == 200
    assert (tmp_path / 'runs' / running['run_id']).is_dir()
    release.set()
    service.threads[running['run_id']].join(5)


def test_idle_finished_run_folder_is_deleted(tmp_path, monkeypatch):
    from server import pipeline_server as mod
    service = PipelineService(data_dir=tmp_path, pipeline=fake_pipeline)
    _, first, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
    service.threads[first['run_id']].join(5)
    assert (tmp_path / 'runs' / first['run_id']).is_dir()
    service.runs[first['run_id']]['_accessed'] = time.monotonic() - mod.RETAIN_IDLE_S - 1
    _, second, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":false}')
    service.threads[second['run_id']].join(5)
    assert route(service, 'GET', '/api/pipeline/runs/' + first['run_id'])[0] == 404
    assert not (tmp_path / 'runs' / first['run_id']).exists()
    assert (tmp_path / 'runs' / second['run_id']).is_dir()


def test_polled_finished_run_survives_retention(tmp_path):
    from server import pipeline_server as mod
    service, run_id = ready(tmp_path)
    service.runs[run_id]['_accessed'] = time.monotonic() - mod.RETAIN_IDLE_S - 1
    assert route(service, 'GET', '/api/pipeline/runs/' + run_id)[0] == 200
    with service.lock:
        service._retain()
    assert run_id in service.runs
    assert (tmp_path / 'runs' / run_id).is_dir()


def test_retention_deletes_finished_folder_from_previous_process(tmp_path):
    previous, old_id = ready(tmp_path)
    old_folder = tmp_path / 'runs' / old_id
    assert old_folder.is_dir() and previous.runs[old_id]['status'] == 'completed'
    restarted, new_id = ready(tmp_path)
    assert old_id not in restarted.runs and not old_folder.exists()
    assert (tmp_path / 'runs' / new_id).is_dir()


def test_retention_logs_delete_failure_and_retries_orphan(tmp_path, monkeypatch, capsys):
    from server import pipeline_server as mod
    service, run_id = ready(tmp_path)
    folder = tmp_path / 'runs' / run_id
    service.runs[run_id]['_accessed'] = time.monotonic() - mod.RETAIN_IDLE_S - 1
    real_rmtree = mod.shutil.rmtree
    def locked(path):
        raise PermissionError('SECRET path must never escape')
    monkeypatch.setattr(mod.shutil, 'rmtree', locked)
    with service.lock:
        service._retain()
    assert folder.is_dir()
    err = capsys.readouterr().err
    assert f'run_delete_failed run_id={run_id} PermissionError' in err
    assert 'SECRET' not in err and str(tmp_path) not in err
    monkeypatch.setattr(mod.shutil, 'rmtree', real_rmtree)
    with service.lock:
        service._retain()
    assert not folder.exists()


def test_timeout_retries_then_cached_pipeline_run(tmp_path, monkeypatch):
    import hashlib
    import socket
    import time
    import discovery

    monkeypatch.setattr(time, "sleep", lambda *_: None)
    payload = (ROOT / 'fixtures' / 'hospital-v3-slice.json').read_bytes()
    digest = hashlib.sha256(payload).hexdigest()
    cache = tmp_path / 'hpt-cache'
    cache.mkdir()
    (cache / f'{digest}.mrf').write_bytes(payload)
    (cache / 'index.json').write_text(json.dumps({'www.southshorehealth.org|south shore hospital': digest}), encoding='utf-8')

    class TimeoutOpener:
        def __init__(self):
            self.calls = 0

        def open(self, request, timeout=30):
            self.calls += 1
            raise socket.timeout('timed out')

    opener = TimeoutOpener()

    def discoverer(domain, location_hint, **kwargs):
        return discovery.discover(domain, location_hint, cache_dir=kwargs['cache_dir'], opener=opener)

    events = []
    run_pipeline('retry-cache', lambda *args: events.append(args), tmp_path, discoverer=discoverer)
    assert opener.calls == 3
    trace = next(event[3] for event in events if event[3].get('type') == 'trace')
    assert trace['label'] == 'cached' and trace['sha256'] == digest
    assert (tmp_path / 'runs' / 'retry-cache' / 'mrf.sqlite').exists()


def test_handler_exceptions_return_json_error_not_html(capsys):
    handler = Handler.__new__(Handler)
    handler.headers = {'Content-Length': '0'}
    handler.rfile, handler.wfile = BytesIO(), BytesIO()
    handler.command, handler.path = 'GET', '/api/pipeline/runs/preflight-probe'

    class Boom:
        def route(self, *_args):
            raise RuntimeError('SECRET must never escape')

    handler.service = Boom()
    codes, headers = [], []
    handler.send_response = codes.append
    handler.send_header = lambda *args: headers.append(args)
    handler.end_headers = lambda: None
    handler._handle()
    raw = handler.wfile.getvalue()
    err = capsys.readouterr().err
    assert codes == [500]
    assert json.loads(raw) == {'error': 'internal_error'}
    assert b'SECRET' not in raw and b'<html' not in raw.lower()
    assert 'handler_failed GET RuntimeError' in err
    assert 'SECRET' not in err


def test_http_handler_rejects_oversize_before_reading_body():
    handler = Handler.__new__(Handler)
    handler.headers = {'Content-Length': str(256 * 1024 + 1)}
    handler.rfile, handler.wfile = BytesIO(b'never read'), BytesIO()
    codes, headers = [], []
    handler.send_response = codes.append
    handler.send_header = lambda *args: headers.append(args)
    handler.end_headers = lambda: None
    handler._handle()
    assert codes == [413] and handler.rfile.tell() == 0
    assert not any(name.lower().startswith('access-control') for name, _ in headers)
    assert json.loads(handler.wfile.getvalue()) == {'error': 'body_too_large'}


def test_mismatched_fingerprint_completes_without_golden_checks(tmp_path):
    fixture = load_json('hospital-v3-slice.json')
    source = tmp_path / 'source.json'
    source.write_text(json.dumps(fixture), encoding='utf-8')
    def discover(domain, location_hint, **kwargs):
        return {'path': str(source), 'trace': [], 'label': 'cached', 'sha256': 'not-the-golden'}
    events = []
    result = run_pipeline('no-golden', lambda *args: events.append(args), tmp_path, discoverer=discover)
    assert result == {}
    names = [check['name'] for event in events for check in event[3].get('checks', [])]
    assert 'digest' not in names
    assert any(event[3].get('type') == 'trace' and event[3].get('sha256') == 'not-the-golden' for event in events)


def test_get_run_omits_private_fields(tmp_path):
    service, run_id = ready(tmp_path)
    status, result = route(service, 'GET', '/api/pipeline/runs/' + run_id)
    payload = json.dumps(result)
    assert status == 200 and '_rows' not in result and '_top_rows' not in result and 'report_md' not in result
    top = result['steps'][-1]['telemetry'][0]
    assert top['type'] == 'top10' and len(top['rows']) <= 10
    assert 'SECRET' not in payload and len(payload) < 64_000


def test_export_failure_is_safe_and_first_result_is_retained(tmp_path):
    calls = []
    def exporter(*args):
        calls.append(1)
        raise RuntimeError('SECRET must never escape')
    service, run_id = ready(tmp_path, exporter)
    path = '/api/pipeline/runs/' + run_id + '/export'
    first = route(service, 'POST', path)
    assert first == (200, {'status': 'unavailable', 'reason': 'drive_export_unavailable'})
    assert route(service, 'POST', path) == first and len(calls) == 1


def _slice_discover(source):
    def discover(domain, location_hint, **kwargs):
        return {'path': str(source), 'trace': [], 'label': 'cached', 'sha256': 'fixture'}
    return discover


def test_repair_proposal_reports_restored_rate_count(tmp_path):
    from ingest import ingest_file
    fixture = load_json('hospital-v3-slice.json')
    source = tmp_path / 'source.json'
    source.write_text(json.dumps(fixture), encoding='utf-8')
    steps = {node: {'node': node, 'status': 'pending', 'counts': {}, 'telemetry': []}
             for node in ('source', 'builder', 'store', 'analyst')}
    def emit(node, status, counts, telemetry):
        steps[node].update(status=status, counts=counts)
        steps[node]['telemetry'].append(telemetry)
    run_pipeline('offline-repair', emit, tmp_path, inject_error=True, discoverer=_slice_discover(source))
    run_id = 'run_' + 'cd' * 16
    service = PipelineService(data_dir=tmp_path)
    service.runs[run_id] = {'status': 'completed', 'steps': list(steps.values()), '_accessed': time.monotonic()}
    status, result = route(service, 'POST', '/api/pipeline/runs/' + run_id + '/proposals',
                           {'repair': load_json('hospital-golden-repair.json')})
    broken = ingest_file(source, inject_error=True)
    restored = ingest_file(source, inject_error=True, rate_key='standard_charge_amount')
    delta = broken['counts']['skipped_no_dollar_count'] - restored['counts']['skipped_no_dollar_count']
    assert status == 200 and result['repair']['valid'] is True
    assert result['repair']['fixed_rows'] == delta == steps['builder']['counts']['rows_repaired']
    assert result['repair']['fixed_rows'] != restored['counts']['inserted_row_count']


def test_failing_check_fails_the_run(tmp_path, monkeypatch):
    from server import pipeline_server as mod
    fixture = load_json('hospital-v3-slice.json')
    source = tmp_path / 'source.json'
    source.write_text(json.dumps(fixture), encoding='utf-8')
    monkeypatch.setattr(mod, '_rate_check', lambda *args: {
        'name': 'fields.rate', 'pass': False, 'expected': 'standard_charge_dollar', 'actual': 'missing'})
    with pytest.raises(ValueError, match='checks_failed'):
        run_pipeline('fail-check', lambda *_: None, tmp_path, discoverer=_slice_discover(source))


def test_no_golden_self_consistency_failure_marks_service_failed(tmp_path, monkeypatch):
    from server import pipeline_server as mod
    source = tmp_path / 'source.json'
    source.write_bytes((ROOT / 'fixtures' / 'hospital-v3-slice.json').read_bytes())
    real_ingest = mod.ingest_file
    def corrupted(path, **kwargs):
        parsed = real_ingest(path, **kwargs)
        if kwargs.get('rate_key') == 'standard_charge_amount':
            parsed['rows'][0]['description'] = 'unexpected mutation'
        return parsed
    monkeypatch.setattr(mod, 'ingest_file', corrupted)
    monkeypatch.setattr(mod, 'discover', _slice_discover(source))
    def pipeline(run_id, emit, data_dir):
        return run_pipeline(run_id, emit, data_dir, inject_error=True, discoverer=_slice_discover(source))
    service = PipelineService(data_dir=tmp_path, pipeline=pipeline)
    _, created, _ = service.route('POST', '/api/pipeline/run', b'{"source":"south-shore","inject_error":true}')
    service.threads[created['run_id']].join(5)
    status, record = route(service, 'GET', '/api/pipeline/runs/' + created['run_id'])
    assert status == 200 and record['status'] == 'failed'
    checks = [check for step in record['steps'] for event in step['telemetry'] for check in event.get('checks', [])]
    assert any(check['name'] == 'self-consistency' and not check['pass'] for check in checks)
    assert not (tmp_path / 'runs' / created['run_id']).exists()


def test_pipeline_releases_each_ingest_row_buffer(tmp_path, monkeypatch):
    import gc
    import weakref
    from server import pipeline_server as mod
    source = tmp_path / 'source.json'
    source.write_bytes((ROOT / 'fixtures' / 'hospital-v3-slice.json').read_bytes())
    real_ingest, buffers = mod.ingest_file, []
    class Rows(list):
        pass
    def tracked(path, **kwargs):
        parsed = real_ingest(path, **kwargs)
        parsed['rows'] = Rows(parsed['rows'])
        buffers.append(weakref.ref(parsed['rows']))
        return parsed
    monkeypatch.setattr(mod, 'ingest_file', tracked)
    assert run_pipeline('release-buffers', lambda *_: None, tmp_path, inject_error=True,
                        discoverer=_slice_discover(source)) == {}
    gc.collect()
    assert len(buffers) == 3 and all(ref() is None for ref in buffers)
