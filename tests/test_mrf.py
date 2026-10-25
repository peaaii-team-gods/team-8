"""Pinned MRF oracle numbers must match the TypeScript checks."""
from mrf_apply import apply_mapping, failing_checks, load_json, run_checks


def test_golden_passes_base():
    result = apply_mapping(load_json("mrf-chunk.json"), load_json("mrf-golden-mapping.json"))
    assert result["flattened_row_count"] == 16
    assert result["nulls_repaired"] == 2
    assert result["inserted_row_count"] == 14
    failed = failing_checks(run_checks(result))
    assert failed == [], failed


def test_golden_fails_named_check_on_drift():
    checks = run_checks(apply_mapping(load_json("mrf-chunk-drift.json"), load_json("mrf-golden-mapping.json")))
    failed = failing_checks(checks)
    names = [c["name"] for c in failed]
    assert "nulls_repaired" in names
    hit = next(c for c in failed if c["name"] == "nulls_repaired")
    assert hit["expected"] == 2 and hit["pass"] is False


def test_golden_repair_passes_drift():
    result = apply_mapping(load_json("mrf-chunk-drift.json"), load_json("mrf-golden-repair.json"))
    assert result["flattened_row_count"] == 16
    assert result["nulls_repaired"] == 2
    assert result["inserted_row_count"] == 14
    assert failing_checks(run_checks(result)) == []
