import copy
import json
from io import BytesIO
import threading
from concurrent.futures import ThreadPoolExecutor

from mrf_apply import apply_mapping, load_json
from server.pipeline_server import Handler, PipelineService, ROOT, run_pipeline


def fake_pipeline(run_id, emit, data_dir):
    from analyze import write_run_artifacts
    fixture, mapping = load_json('hospital-v3-slice.json'), load_json('hospital-golden-mapping.json')
    rows = apply_mapping(fixture, mapping)['rows']
    result = write_run_artifacts(rows, run_id, data_dir=data_dir)
    emit('analyst', 'completed', {'row_count': len(rows)}, {'type': 'top10', 'rows': result['top_rows']})
    return {'_fixture': fixture, '_baseline': fixture, '_rows': rows, '_top_rows': result['top_rows'],
            'report_md': open(result['report_path'], encoding='utf-8').read()}


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
    assert '_rows' not in result and 'local SQLite' in result['report_md']
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
    status, result = route(service, 'POST', prefix + '/proposals', {'mapping': mapping, 'repair': mapping})
    assert status == 200 and result['mapping'] == {'valid': True, 'matches_golden': True, 'diffs': []}
    assert result['repair'] == {'valid': True, 'fixed_rows': 42, 'remaining_errors': []}
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
        return {'folder_id': 'drive-folder', 'files': files, 'events': []}
    service, run_id = ready(tmp_path / 'one', exporter)
    path = '/api/pipeline/runs/' + run_id + '/export'
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda _: route(service, 'POST', path), range(4)))
    assert len(calls) == 1 and all(value == results[0] for value in results)
    assert results[0] == (200, {'status': 'exported', 'folder': 'RHM Demo Exports/' + run_id, 'files': files})
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
    assert len(result['_rows']) == 42
    assert any(event[3]['type'] == 'repair' for event in events)
    assert any(event[3].get('label') == 'cached' for event in events)
    assert (tmp_path / 'runs' / 'offline' / 'mrf.sqlite').exists()
    evidence = next(event[3] for event in events if event[3]['type'] == 'evidence')
    assert 'standard_charge_dollar' in json.dumps(evidence['source_excerpt'])
    assert 'standard_charge_amount' in json.dumps(evidence['drift_excerpt'])
    assert len(json.dumps(evidence)) < 8192
    assert any(check['name'] == 'fields.rate' and not check['pass'] for event in events
               for check in event[3].get('checks', []))


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
