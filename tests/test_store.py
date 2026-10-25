import hashlib
import sqlite3

import pytest
from pydantic import ValidationError

from ingest import ingest_file
from mrf_apply import apply_mapping, load_json
from store import store_ledger, store_rows


def golden_rows():
    return apply_mapping(load_json('hospital-v3-slice.json'), load_json('hospital-golden-mapping.json'))['rows']


def test_store_golden_and_stable_hash(tmp_path):
    first = store_rows(golden_rows(), tmp_path / 'first.sqlite')
    second = store_rows(golden_rows(), tmp_path / 'second.sqlite')
    assert first['row_count'] == 42
    assert first['sha256'] == second['sha256']
    assert first['sha256'] == hashlib.sha256((tmp_path / 'first.sqlite').read_bytes()).hexdigest()
    with sqlite3.connect(first['path']) as connection:
        assert connection.execute('SELECT count(*) FROM hospital_rates').fetchone() == (42,)
        columns = [row[1] for row in connection.execute('PRAGMA table_info(hospital_rates)')]
        assert columns == list(golden_rows()[0])


def test_parameterized_insert_and_invalid_rows_leave_no_database(tmp_path):
    row = {**golden_rows()[0], 'description': "'); DROP TABLE hospital_rates; --"}
    result = store_rows([row], tmp_path / 'safe.sqlite')
    with sqlite3.connect(result['path']) as connection:
        assert connection.execute('SELECT description FROM hospital_rates').fetchone() == (row['description'],)
    with pytest.raises(ValidationError):
        store_rows([{**row, 'negotiated_rate': 'not a number'}], tmp_path / 'invalid.sqlite')
    assert not (tmp_path / 'invalid.sqlite').exists()


def test_existing_database_is_not_silently_appended_or_replaced(tmp_path):
    path = tmp_path / 'existing.sqlite'
    store_rows(golden_rows(), path)
    before = path.read_bytes()
    with pytest.raises(FileExistsError):
        store_rows(golden_rows(), path)
    assert path.read_bytes() == before


def test_ledger_batches_indexes_and_report_view(tmp_path):
    from pathlib import Path
    parsed = ingest_file(Path(__file__).resolve().parents[1] / 'fixtures' / 'hospital-v3-slice.json')
    first = store_ledger(parsed['rows'], tmp_path / 'ledger.sqlite')
    second = store_ledger(parsed['rows'], tmp_path / 'ledger2.sqlite')
    assert first['row_count'] == parsed['counts']['inserted_row_count'] > 42
    assert first['sha256'] == second['sha256']
    with sqlite3.connect(first['path']) as connection:
        indexes = [row[1] for row in connection.execute("PRAGMA index_list('hospital_rates')")]
        assert any('code_plan' in name for name in indexes)
        view = connection.execute("SELECT sql FROM sqlite_master WHERE name='report'").fetchone()[0]
        assert 'hospital_rates' in view
        assert connection.execute('SELECT count(*) FROM report').fetchone()[0] == first['row_count']
