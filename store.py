"""Validated hospital rows stored in caller-owned local SQLite."""
import hashlib
from pathlib import Path
import sqlite3
from contextlib import closing

from hospital_mapping import generate_row_model
from ingest import LEDGER_FIELDS
from mrf_apply import load_json

BATCH = 10_000
LEDGER_SQL = {name: kind for name, kind in zip(LEDGER_FIELDS, (
    "TEXT NOT NULL", "TEXT NOT NULL", "TEXT NOT NULL", "TEXT NOT NULL", "TEXT NOT NULL",
    "TEXT NOT NULL", "TEXT NOT NULL", "TEXT NOT NULL", "REAL", "REAL", "TEXT", "REAL", "REAL", "REAL", "REAL"))}


def validated_rows(rows, mapping=None):
    model = generate_row_model(mapping or load_json('hospital-golden-mapping.json'))
    return [model.model_validate(row).model_dump() for row in rows]


def store_rows(rows, db_path, *, mapping=None):
    """Create a new database; return path, inserted row_count and byte SHA-256."""
    validated = validated_rows(rows, mapping)
    schema = generate_row_model(mapping or load_json('hospital-golden-mapping.json')).model_json_schema()
    columns = []
    for name, field in schema['properties'].items():
        variants = field.get('anyOf', [field])
        kind = next(item['type'] for item in variants if item['type'] != 'null')
        nullable = any(item['type'] == 'null' for item in variants)
        sql_type = {'string': 'TEXT', 'number': 'REAL'}[kind]
        columns.append(f'"{name}" {sql_type}' + ('' if nullable else ' NOT NULL'))
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    # Exclusive creation prevents accidental reuse of another run's database.
    with path.open('xb'):
        pass
    names = list(schema['properties'])
    try:
        with closing(sqlite3.connect(path)) as connection, connection:
            connection.execute('CREATE TABLE hospital_rates (' + ', '.join(columns) + ')')
            connection.executemany('INSERT INTO hospital_rates VALUES (' + ','.join('?' for _ in names) + ')',
                                   [tuple(row[name] for name in names) for row in validated])
            count = connection.execute('SELECT count(*) FROM hospital_rates').fetchone()[0]
    except Exception:
        path.unlink(missing_ok=True)
        raise
    return {'row_count': count, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'path': str(path)}


def store_ledger(rows, db_path):
    """Full-file ledger: every code type and charge kind, batched insert, Analyst views."""
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('xb'):
        pass
    names = list(LEDGER_FIELDS)
    columns = ', '.join(f'"{name}" {LEDGER_SQL[name]}' for name in names)
    payload = [tuple(row.get(name) if row.get(name) is not None else
                     ("" if LEDGER_SQL[name].startswith("TEXT") and "REAL" not in LEDGER_SQL[name] else None)
                     for name in names) for row in rows]
    try:
        with closing(sqlite3.connect(path)) as connection, connection:
            connection.execute(f'CREATE TABLE hospital_rates ({columns})')
            insert = 'INSERT INTO hospital_rates VALUES (' + ','.join('?' for _ in names) + ')'
            for start in range(0, len(payload), BATCH):
                connection.executemany(insert, payload[start:start + BATCH])
            connection.execute('CREATE INDEX idx_hospital_rates_code_plan ON hospital_rates(billing_code, plan_name)')
            connection.execute(
                'CREATE VIEW report AS SELECT billing_code, code_type, description, payer_name, plan_name, '
                'billing_class, setting, negotiated_rate, percent_rate, algorithm, gross_charge, discounted_cash, '
                'min_charge, max_charge FROM hospital_rates')
            count = connection.execute('SELECT count(*) FROM hospital_rates').fetchone()[0]
    except Exception:
        path.unlink(missing_ok=True)
        raise
    return {'row_count': count, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'path': str(path)}
