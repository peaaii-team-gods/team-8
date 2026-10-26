"""Replay the cached South Shore MRF against the recorded golden. Not collected by pytest."""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from ingest import SOURCE_SHA256, ingest_file, peak_rss
from resources import digest


def main():
    golden = json.loads((ROOT / "fixtures" / "hospital-full-golden-result.json").read_text(encoding="utf-8"))
    cached = next((path for path in (ROOT / "data").rglob("*.mrf") if hashlib.sha256(path.read_bytes()).hexdigest() == SOURCE_SHA256), None)
    if cached is None:
        print("NO_CACHE")
        return 2
    first, second = ingest_file(cached), ingest_file(cached)
    assert first["sha256"] == SOURCE_SHA256
    assert first["parse_mode"] == golden["parse_mode"] == "streamed"
    assert {key: first["counts"][key] for key in golden["counts"]} == golden["counts"]
    assert digest(first["rows"]) == digest(second["rows"]) == golden["digest"]
    assert peak_rss() < 1024 * 1024 * 1024
    assert first["metrics"]["stage_ms"] < 60_000
    print("OK", first["counts"]["inserted_row_count"], first["parse_mode"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
