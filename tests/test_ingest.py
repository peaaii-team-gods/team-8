import hashlib
from pathlib import Path

import pytest

from ingest import SOURCE_SHA256, ingest_file, peak_rss
from mrf_apply import load_json
from resources import digest


SLICE = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-v3-slice.json"


def test_stream_matches_json_loads_on_slice():
    parsed = ingest_file(SLICE)
    loaded = load_json("hospital-v3-slice.json")
    assert parsed["parse_mode"] == "streamed"
    assert parsed["sha256"] == hashlib.sha256(SLICE.read_bytes()).hexdigest()
    assert parsed["counts"]["items_parsed"] == len(loaded["standard_charge_information"])
    assert parsed["header"]["version"] == loaded["version"]
    assert parsed["code_type_counts"]["HCPCS"] >= 1
    assert parsed["code_type_counts"]["MS-DRG"] == 1
    assert any(row["percent_rate"] is not None or row["algorithm"] for row in parsed["rows"])
    assert any(row["negotiated_rate"] is not None for row in parsed["rows"])
    assert any(row["code_type"] == "CDM" for row in parsed["rows"])
    assert parsed["counts"]["inserted_row_count"] == len(parsed["rows"]) > 42


def test_ingest_slice_is_deterministic():
    first, second = ingest_file(SLICE), ingest_file(SLICE)
    assert digest(first["rows"]) == digest(second["rows"])
    assert first["counts"]["inserted_row_count"] == second["counts"]["inserted_row_count"]
    assert first["metrics"]["bytes_streamed"] == SLICE.stat().st_size


def test_injected_amount_key_restores_baseline_digest():
    baseline = ingest_file(SLICE)
    broken = ingest_file(SLICE, inject_error=True)
    restored = ingest_file(SLICE, inject_error=True, rate_key="standard_charge_amount")
    assert broken["rate_present"] is False
    assert restored["rate_present"] is True
    assert digest(restored["rows"]) == digest(baseline["rows"])
    assert digest(broken["rows"]) != digest(baseline["rows"])


def test_checked_in_full_golden_files():
    golden = load_json("hospital-full-golden-result.json")
    assert golden["source_sha256"] == SOURCE_SHA256
    assert golden["parse_mode"] == "streamed"
    assert golden["counts"]["inserted_row_count"] == 183335
    assert golden["counts"]["items_parsed"] == 25451
    report = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-full-report.md"
    assert hashlib.sha256(report.read_bytes()).hexdigest() == golden["report_sha256"]


def test_full_golden_counts_when_cached():
    cache = Path(__file__).resolve().parents[1] / "data"
    cached = None
    for path in cache.rglob("*.mrf") if cache.is_dir() else []:
        if hashlib.sha256(path.read_bytes()).hexdigest() == SOURCE_SHA256:
            cached = path
            break
    if cached is None:
        pytest.skip("South Shore MRF cache not present")
    golden = load_json("hospital-full-golden-result.json")
    first, second = ingest_file(cached), ingest_file(cached)
    assert first["sha256"] == SOURCE_SHA256
    assert first["parse_mode"] == golden["parse_mode"]
    assert {key: first["counts"][key] for key in golden["counts"]} == golden["counts"]
    assert digest(first["rows"]) == digest(second["rows"]) == golden["digest"]
    assert peak_rss() < 1024 * 1024 * 1024
    assert first["metrics"]["stage_ms"] < 60_000
    report = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-full-report.md"
    assert hashlib.sha256(report.read_bytes()).hexdigest() == golden["report_sha256"]
