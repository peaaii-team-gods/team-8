"""Replay the cached South Shore MRF against the recorded golden. Not collected by pytest."""
import hashlib
import gc
import json
import sys
from pathlib import Path
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from ingest import SOURCE_SHA256, ingest_file, peak_rss
from resources import digest_rows
from server.pipeline_server import PipelineService, run_pipeline


def _fail(message):
    print(message, file=sys.stderr)
    return 1


def main():
    golden = json.loads((ROOT / "fixtures" / "hospital-full-golden-result.json").read_text(encoding="utf-8"))
    def file_sha(path):
        with path.open('rb') as stream:
            return hashlib.file_digest(stream, 'sha256').hexdigest()
    cached = next((path for path in (ROOT / "data").rglob("*.mrf") if file_sha(path) == SOURCE_SHA256), None)
    if cached is None:
        print("NO_CACHE")
        return 2
    first = ingest_file(cached)
    if first["sha256"] != SOURCE_SHA256:
        return _fail("source sha mismatch")
    if first["parse_mode"] != golden["parse_mode"] or first["parse_mode"] != "streamed":
        return _fail("parse_mode mismatch")
    if {key: first["counts"][key] for key in golden["counts"]} != golden["counts"]:
        return _fail("counts mismatch")
    if first['code_type_counts'] != golden['code_type_counts']:
        return _fail('code type counts mismatch')
    first_digest = digest_rows(first['rows'])
    if first_digest != golden["digest"]:
        return _fail("digest mismatch")
    n, mode = len(first['rows']), first['parse_mode']
    elapsed_ms = first['metrics']['stage_ms']
    del first
    gc.collect()
    second = ingest_file(cached)
    if second['sha256'] != SOURCE_SHA256 or digest_rows(second['rows']) != first_digest:
        return _fail('second ingest mismatch')
    if {key: second['counts'][key] for key in golden['counts']} != golden['counts']:
        return _fail('second counts mismatch')
    if max(elapsed_ms, second['metrics']['stage_ms']) >= 60_000:
        return _fail("ingest exceeded 60 s")
    del second
    gc.collect()
    steps = {node: {'node': node, 'status': 'pending', 'counts': {}, 'telemetry': []}
             for node in ('source', 'builder', 'store', 'analyst')}
    def emit(node, status, counts, telemetry):
        steps[node].update(status=status, counts=counts)
        steps[node]['telemetry'].append(telemetry)
    def discover(*args, **kwargs):
        return {'path': str(cached), 'trace': [], 'label': 'cached', 'sha256': SOURCE_SHA256}
    # No network, inference, or HTTP listener: execute the real injected pipeline
    # and existing proposal/status routes in-process, then remove its artifacts.
    with TemporaryDirectory(prefix='verify-full-', dir=ROOT / 'data') as scratch:
        run_id = 'run_' + 'ab' * 16
        result = run_pipeline(run_id, emit, Path(scratch), inject_error=True, discoverer=discover)
        if result != {}:
            return _fail('pipeline retained row buffers')
        service = PipelineService(data_dir=scratch)
        service.runs[run_id] = {'status': 'completed', 'steps': list(steps.values())}
        path = '/api/pipeline/runs/' + run_id
        _, proposal, _ = service.route('POST', path + '/proposals', json.dumps({
            'repair': json.loads((ROOT / 'fixtures' / 'hospital-golden-repair.json').read_text())}).encode())
        if proposal.get('repair', {}).get('fixed_rows') != 127887 or steps['builder']['counts']['rows_repaired'] != 127887:
            return _fail('full-file restored rate count mismatch')
        _, record, _ = service.route('GET', path)
        poll_bytes = len(json.dumps(record).encode())
        if poll_bytes >= 64_000 or 'report_md' in record:
            return _fail('poll payload exceeded bound')
        top = steps['analyst']['telemetry'][-1]
        if len(top['rows']) > 10 or top['row_count'] != golden['comparison_groups'] or len(top['spread']) != golden['spread_groups']:
            return _fail('report group counts mismatch')
        report = (Path(scratch) / 'runs' / run_id / 'report.md').read_bytes()
        if report != (ROOT / 'fixtures' / 'hospital-full-report.md').read_bytes() or hashlib.sha256(report).hexdigest() != golden['report_sha256']:
            return _fail('full-file report mismatch')
    if peak_rss() > 300_000_000:
        return _fail('injected run peak RSS exceeded 300 MB')
    print('OK', json.dumps({'rows': n, 'parse_mode': mode, 'digest': first_digest,
          'restored_rates': 127887, 'comparison_groups': top['row_count'], 'spread_groups': len(top['spread']),
          'poll_bytes': poll_bytes, 'peak_rss': peak_rss(), 'report_sha256': golden['report_sha256']}))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
