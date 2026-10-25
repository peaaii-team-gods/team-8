"""Validated hospital rows stored in caller-owned local SQLite."""
import hashlib
from pathlib import Path
import sqlite3
from contextlib import closing

from hospital_mapping import generate_row_model
from mrf_apply import load_json


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
