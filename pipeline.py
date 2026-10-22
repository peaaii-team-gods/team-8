"""Fixed deterministic CSV executor. Model decisions select field names, never code."""
import csv
import hashlib
from html import escape
import io
import json
from pathlib import Path
import re
from typing import Protocol

from resources import PilotError, canonical, digest

MAPPING_KEYS = {"schema_version", "id_column", "reading_column"}
ID = re.compile(r"^[a-z][a-z0-9_-]{0,31}$")
INTEGER = re.compile(r"^(0|[1-9][0-9]{0,5})$")
ALLOWED_COLUMNS = {"sensor_id", "reading", "value"}


class ContractError(PilotError):
    def __init__(self, code, **details):
        self.evidence = {"code": code, **details}
        super().__init__(f"Pipeline contract failed: {code}")


def strict_json(text):
    def pairs(items):
        out = {}
        for key, value in items:
            if key in out:
                raise ValueError("duplicate key")
            out[key] = value
        return out
    try:
        if not isinstance(text, str) or len(text) > 4096:
            raise ValueError
        return json.loads(text, object_pairs_hook=pairs,
                          parse_constant=lambda _: (_ for _ in ()).throw(ValueError()))
    except (ValueError, TypeError, RecursionError):
        raise ContractError("invalid_model_json") from None


def mapping(value):
    if (not isinstance(value, dict) or set(value) != MAPPING_KEYS
            or value["schema_version"] != "mapping.v1"
            or any(type(value[k]) is not str or value[k] not in ALLOWED_COLUMNS
                   for k in ("id_column", "reading_column"))
            or value["id_column"] != "sensor_id"
            or value["reading_column"] not in {"reading", "value"}):
        raise ContractError("invalid_mapping")
    return dict(value)


def repair(value):
    if not isinstance(value, dict):
        raise ContractError("invalid_repair")
    if set(value) == {"action", "reason_code"} and value["action"] == "fail" and type(value["reason_code"]) is str and value["reason_code"] in {
            "unsupported_schema", "insufficient_evidence"}:
        raise ContractError("maintainer_declined_repair", reason_code=value["reason_code"])
    if set(value) != {"action", "mapping"} or value["action"] != "replace_mapping":
        raise ContractError("invalid_repair")
    return mapping(value["mapping"])


def source(path):
    path = Path(path)
    with path.open("rb") as stream:
        raw = stream.read(4097)
    if len(raw) > 4096:
        raise ContractError("source_too_large")
    try:
        text = raw.decode("utf-8")
        reader = csv.DictReader(io.StringIO(text, newline=""), strict=True)
        headers = reader.fieldnames
        rows = list(reader)
    except (UnicodeError, csv.Error):
        raise ContractError("invalid_csv") from None
    if (not headers or len(headers) != 2 or len(set(headers)) != len(headers)
            or any(h not in ALLOWED_COLUMNS for h in headers)
            or not 1 <= len(rows) <= 16
            or any(set(row) != set(headers) or any(v is None for v in row.values()) for row in rows)):
        raise ContractError("invalid_source_shape")
    return {"sha256": hashlib.sha256(raw).hexdigest(), "headers": headers, "rows": rows}


class Executor(Protocol):
    """Future hosted adapter must return physical results with comparable provenance."""
    def execute(self, data: dict, config: dict) -> dict: ...


class LocalExecutor:
    def execute(self, data, config):
        config = mapping(config)
        missing = sorted({config["id_column"], config["reading_column"]} - set(data["headers"]))
        if missing:
            raise ContractError("missing_column", missing=missing, actual_headers=data["headers"],
                                source_sha256=data["sha256"], mapping_sha256=digest(config))
        rows, ids = [], set()
        for row in data["rows"]:
            label, value = row[config["id_column"]], row[config["reading_column"]]
            if not ID.fullmatch(label) or label in ids:
                raise ContractError("invalid_or_duplicate_id")
            if not isinstance(value, str) or not INTEGER.fullmatch(value):
                raise ContractError("invalid_reading")
            ids.add(label)
            reading = int(value)
            rows.append({"sensor_id": label, "reading": reading, "doubled": reading * 2})
        return {"schema_version": "output.v1", "rows": rows, "row_count": len(rows),
                "total": sum(row["doubled"] for row in rows)}


def validate_output(output, data):
    """Independent acceptance oracle for the deliberately fixed three-record fixture."""
    expected = {"north": 2, "south": 4, "west": 6}
    if (not isinstance(output, dict) or set(output) != {"schema_version", "rows", "row_count", "total"}
            or output["schema_version"] != "output.v1" or not isinstance(output["rows"], list)
            or type(output["row_count"]) is not int or output["row_count"] != 3
            or type(output["total"]) is not int or output["total"] != 24
            or len(output["rows"]) != 3):
        raise ContractError("output_contract_failed")
    seen = {}
    for row in output["rows"]:
        if (not isinstance(row, dict) or set(row) != {"sensor_id", "reading", "doubled"}
                or type(row["sensor_id"]) is not str or row["sensor_id"] in seen
                or type(row["reading"]) is not int or type(row["doubled"]) is not int
                or row["sensor_id"] not in expected
                or row["reading"] != expected[row["sensor_id"]]
                or row["doubled"] != expected[row["sensor_id"]] * 2):
            raise ContractError("output_row_failed")
        seen[row["sensor_id"]] = row["reading"]
    if seen != expected:
        raise ContractError("output_contract_failed")
    return {"executor": "local_deterministic", "validator": "fixed_fixture_oracle.v1",
            "source_sha256": data["sha256"], "output_sha256": digest(output),
            "row_count": 3, "total": 24, "valid": True}


def untrusted(data, *, role, run_id):
    text = canonical(data)
    if len(text) > 12000:
        raise ContractError("handoff_too_large")
    return (f'<untrusted_artefact source="pilot" author="{escape(role, quote=True)}" '
            f'run_id="{escape(run_id, quote=True)}">\n{escape(text)}\n</untrusted_artefact>')
