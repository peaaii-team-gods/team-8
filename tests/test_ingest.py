import hashlib
from pathlib import Path

import pytest

from ingest import RSS_CAP, SOURCE_SHA256, ingest_file, peak_rss
from mrf_apply import load_json
from resources import digest


SLICE = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-v3-slice.json"
GOLDEN = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-full-golden-result.json"
REPORT = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-full-report.md"


def lf_sha(data):
    return hashlib.sha256(data.replace(b"\r\n", b"\n").replace(b"\r", b"\n")).hexdigest()


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
    repaired = broken["counts"]["skipped_no_dollar_count"] - restored["counts"]["skipped_no_dollar_count"]
    assert repaired == sum(1 for row in restored["rows"] if row["negotiated_rate"] is not None) - sum(
        1 for row in broken["rows"] if row["negotiated_rate"] is not None)
    assert repaired > 0
    assert repaired != restored["counts"]["inserted_row_count"]


def test_memory_parse_chosen_up_front():
    parsed = ingest_file(SLICE, parse_mode="parsed in memory")
    streamed = ingest_file(SLICE)
    assert parsed["parse_mode"] == "parsed in memory"
    assert digest(parsed["rows"]) == digest(streamed["rows"])
    assert parsed["sha256"] == streamed["sha256"]


def test_stream_failure_is_logged_not_retried(tmp_path, capsys):
    bad = tmp_path / "truncated.json"
    bad.write_text("{", encoding="utf-8")
    with pytest.raises(ValueError):
        ingest_file(bad)
    err = capsys.readouterr().err
    assert "ingest_stream_failed" in err
    assert err.count("ingest_stream_failed") == 1


def test_invalid_parse_mode_is_logged(capsys):
    with pytest.raises(ValueError):
        ingest_file(SLICE, parse_mode="retry")
    assert "ingest_parse_mode_invalid" in capsys.readouterr().err


def test_memory_rss_cap_runs_after_loads(monkeypatch):
    import ingest as mod
    order = []
    real_loads = mod.json.loads

    def fake_loads(raw):
        order.append("loads")
        return real_loads(raw)

    def fake_rss():
        order.append("rss")
        return RSS_CAP + 1

    monkeypatch.setattr(mod.json, "loads", fake_loads)
    monkeypatch.setattr(mod, "peak_rss", fake_rss)
    with pytest.raises(MemoryError):
        ingest_file(SLICE, parse_mode="parsed in memory")
    assert order.index("loads") < order.index("rss")


def test_checked_in_full_golden_is_internally_consistent():
    from analyze import ma_caveat
    golden = load_json("hospital-full-golden-result.json")
    assert golden["source_sha256"] == SOURCE_SHA256
    assert golden["parse_mode"] == "streamed"
    assert "db_sha256" not in golden
    assert lf_sha(REPORT.read_bytes()) == golden["report_sha256"]
    assert golden["counts"]["inserted_row_count"] == golden["counts"]["flattened_row_count"]
    assert golden["counts"]["items_parsed"] > 0
    text = REPORT.read_bytes().replace(b"\r\n", b"\n").replace(b"\r", b"\n").decode("utf-8")
    values = []
    for line in text.splitlines():
        if not line.startswith("|") or line.startswith("| Code") or line.startswith("| ---"):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) == 14 and cells[9].isdigit():
            values.append(int(cells[9]))
    caveat = ma_caveat([{"n_MA": value} for value in values])
    assert caveat in text and text.count(caveat) >= 3


def test_slice_report_hash_is_lf_normalised_and_regenerated(tmp_path):
    from analyze import write_ledger_artifacts
    parsed = ingest_file(SLICE)
    artifacts = write_ledger_artifacts(parsed["rows"], "hash-slice", data_dir=tmp_path / "data", excluded_counts={
        "skipped_no_dollar_count": parsed["counts"]["skipped_no_dollar_count"],
        "quarantined_row_count": parsed["counts"]["quarantined_row_count"]}, metrics=parsed["metrics"])
    report = Path(artifacts["report_path"]).read_bytes()
    assert b"\r\n" not in report
    assert lf_sha(report) == hashlib.sha256(report).hexdigest()
    repeated = write_ledger_artifacts(parsed["rows"], "hash-slice-2", data_dir=tmp_path / "data",
                                      excluded_counts=artifacts["excluded_counts"], metrics=parsed["metrics"])
    assert Path(repeated["report_path"]).read_bytes() == report
    assert peak_rss() < 1024 * 1024 * 1024
