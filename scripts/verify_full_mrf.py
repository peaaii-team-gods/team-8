"""Replay the cached South Shore MRF against the recorded golden. Not collected by pytest."""
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from ingest import SOURCE_SHA256, ingest_file, peak_rss
from resources import digest


def _fail(message):
    print(message, file=sys.stderr)
    return 1


def main():
    golden = json.loads((ROOT / "fixtures" / "hospital-full-golden-result.json").read_text(encoding="utf-8"))
    cached = next((path for path in (ROOT / "data").rglob("*.mrf") if hashlib.sha256(path.read_bytes()).hexdigest() == SOURCE_SHA256), None)
    if cached is None:
        print("NO_CACHE")
        return 2
    first, second = ingest_file(cached), ingest_file(cached)
    if first["sha256"] != SOURCE_SHA256:
        return _fail("source sha mismatch")
    if first["parse_mode"] != golden["parse_mode"] or first["parse_mode"] != "streamed":
        return _fail("parse_mode mismatch")
    if {key: first["counts"][key] for key in golden["counts"]} != golden["counts"]:
        return _fail("counts mismatch")
    if digest(first["rows"]) != digest(second["rows"]) or digest(first["rows"]) != golden["digest"]:
        return _fail("digest mismatch")
    if peak_rss() >= 1024 * 1024 * 1024:
        return _fail("peak rss exceeded 1 GB")
    if first["metrics"]["stage_ms"] >= 60_000:
        return _fail("ingest exceeded 60 s")
    print("OK", first["counts"]["inserted_row_count"], first["parse_mode"])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
