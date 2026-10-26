"""Stdlib streaming reader for a CMS hospital v3 MRF. No new dependencies."""
import codecs, hashlib, json, math, os, sys, time
from pathlib import Path

SOURCE_SHA256 = "0ba485a4805fae35fd4f1ed425750cf655aaa05c09df0c2939fce07e5b6881bd"
CHUNK, RSS_CAP = 1024 * 1024, 400 * 1024 * 1024
HEADER_LIMIT = 8 * CHUNK
LEDGER_FIELDS = (
    "billing_code", "code_type", "description", "payer_name", "plan_name", "billing_class", "setting",
    "methodology", "negotiated_rate", "percent_rate", "algorithm", "gross_charge", "discounted_cash", "min_charge", "max_charge")
FACT_KEYS = ("gross_charge", "discounted_cash", "min_charge", "max_charge")
FACT_ALIASES = (("gross_charge", ("gross_charge",)), ("discounted_cash", ("discounted_cash",)),
                ("min_charge", ("minimum", "standard_charge_minimum")), ("max_charge", ("maximum", "standard_charge_maximum")))

def peak_rss():
    if os.name != "nt":
        n = __import__("resource").getrusage(__import__("resource").RUSAGE_SELF).ru_maxrss
        return n if sys.platform == "darwin" else n * 1024
    import ctypes
    buf = (ctypes.c_size_t * 10)()
    buf[0] = ctypes.sizeof(buf)
    k32, psapi = ctypes.WinDLL("kernel32", use_last_error=True), ctypes.WinDLL("psapi", use_last_error=True)
    psapi.GetProcessMemoryInfo.argtypes = [ctypes.c_void_p, ctypes.c_void_p, ctypes.c_uint]
    return int(buf[1]) if psapi.GetProcessMemoryInfo(k32.GetCurrentProcess(), buf, buf[0]) else 0

def _number(obj, key):
    value = obj.get(key) if isinstance(obj, dict) else None
    ok = isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value)
    return (int(value) if ok and value == int(value) else value) if ok else None

def _text(obj, key):
    value = obj.get(key) if isinstance(obj, dict) else None
    return value if isinstance(value, str) else ""

def _codes(item):
    seen, codes = set(), []
    for entry in item.get("code_information") or []:
        if isinstance(entry, dict):
            code, kind = _text(entry, "code"), _text(entry, "type")
            if code and kind and (code, kind) not in seen:
                seen.add((code, kind)); codes.append((code, kind))
    return codes

def _inject(item):
    for charge in item.get("standard_charges") or []:
        if isinstance(charge, dict):
            for payer in charge.get("payers_information") or []:
                if isinstance(payer, dict) and "standard_charge_dollar" in payer:
                    payer["standard_charge_amount"] = payer.pop("standard_charge_dollar")
    return item

def _stream_items(path):
    decoder, incremental, hasher = json.JSONDecoder(), codecs.getincrementaldecoder("utf-8-sig")(), hashlib.sha256()
    buf, parsed, header, n = "", 0, None, 0
    with Path(path).open("rb") as stream:
        def pull(size=CHUNK):
            nonlocal buf, n
            chunk = stream.read(size)
            if chunk:
                hasher.update(chunk); n += len(chunk); buf += incremental.decode(chunk, False)
            return chunk
        while header is None:
            if not pull():
                raise ValueError("truncated MRF header")
            key = buf.find('"standard_charge_information"')
            if key < 0:
                if n > HEADER_LIMIT:
                    raise ValueError("MRF header too large")
                continue
            prefix = buf[:key].rstrip()
            header = json.loads((prefix[:-1] if prefix.endswith(",") else prefix) + "}")
            rest = buf[key:]
            bracket = rest.find("[")
            if bracket < 0:
                raise ValueError("missing standard_charge_information array")
            buf, parsed = rest[bracket + 1:], 0
        yield header
        while True:
            while parsed < len(buf) and buf[parsed] in " \t\r\n,":
                parsed += 1
            if parsed < len(buf) and buf[parsed] == "]":
                break
            try:
                item, end = decoder.raw_decode(buf, parsed)
            except json.JSONDecodeError:
                remaining = len(buf) - parsed
                if remaining >= CHUNK:
                    print("ingest_item_exceeds_buffer", file=sys.stderr)
                    raise ValueError("MRF item exceeds 1 MB buffer") from None
                if parsed:
                    buf, parsed = buf[parsed:], 0
                if not pull(CHUNK - remaining):
                    raise ValueError("truncated MRF item") from None
                continue
            buf, parsed = buf[end:], 0
            yield item
        buf = ""
        while pull():
            buf = ""
        incremental.decode(b"", True)
    yield {"_meta": True, "sha256": hasher.hexdigest(), "bytes_streamed": n, "parse_mode": "streamed"}

def _memory_items(path):
    raw = Path(path).read_bytes()
    document = json.loads(raw.decode("utf-8-sig"))
    rss = peak_rss()
    if rss > RSS_CAP:
        raise MemoryError(f"parsed in memory RSS {rss} exceeded 400 MB")
    if not isinstance(document, dict) or document.get("version") != "3.0.0":
        raise ValueError("expected a CMS hospital MRF v3.0.0 document")
    items = document.get("standard_charge_information")
    if not isinstance(items, list):
        raise ValueError("expected standard_charge_information array")
    yield {k: v for k, v in document.items() if k != "standard_charge_information"}
    yield from items
    yield {"_meta": True, "sha256": hashlib.sha256(raw).hexdigest(), "bytes_streamed": len(raw),
           "parse_mode": "parsed in memory", "peak_rss": rss}

def iter_mrf(path, *, parse_mode="streamed"):
    if parse_mode == "parsed in memory":
        yield from _memory_items(path)
        return
    if parse_mode != "streamed":
        print(f"ingest_parse_mode_invalid {parse_mode!r}", file=sys.stderr)
        raise ValueError("parse_mode")
    try:
        yield from _stream_items(path)
    except (ValueError, json.JSONDecodeError, UnicodeError) as exc:
        print(f"ingest_stream_failed {type(exc).__name__}", file=sys.stderr)
        raise

def _jk(code, kind, billing_class=""):
    return f"{code}\0{kind}\0{billing_class}"

def _from_charge(charge):
    slot = dict.fromkeys(FACT_KEYS)
    if isinstance(charge, dict):
        for target, keys in FACT_ALIASES:
            slot[target] = next((n for key in keys if (n := _number(charge, key)) is not None), None)
    return slot

def _facts(item, joined):
    for code, kind in _codes(item):
        if kind != "HCPCS":
            continue
        for charge in (c for c in item.get("standard_charges") or [] if isinstance(c, dict)):
            slot = joined.setdefault(_jk(code, kind, _text(charge, "billing_class")), dict.fromkeys(FACT_KEYS))
            for target, number in _from_charge(charge).items():
                if number is None:
                    continue
                if slot[target] is not None and slot[target] != number:
                    slot[target + "_conflict"] = True
                else:
                    slot[target] = number

def _row(code, kind, item, charge, payer, facts, rate_key=None):
    payer, charge = payer or {}, charge or {}
    return {"billing_code": code, "code_type": kind, "description": _text(item, "description"),
            "payer_name": _text(payer, "payer_name"), "plan_name": _text(payer, "plan_name"),
            "billing_class": _text(charge, "billing_class"), "setting": _text(charge, "setting"),
            "methodology": _text(payer, "methodology") or _text(charge, "methodology"),
            "negotiated_rate": _number(payer, rate_key) if rate_key else None,
            "percent_rate": _number(payer, "standard_charge_percentage"),
            "algorithm": _text(payer, "standard_charge_algorithm") or None, **facts}

def _emit(item, joined, rate_key, rows, counts):
    codes = _codes(item)
    if not codes:
        # Count rejected ledger row slots, including a charge with no payer,
        # using the same charge/payer expansion as valid coded items below.
        counts["quarantined_row_count"] += max(1, sum(
            max(1, sum(isinstance(p, dict) for p in charge.get("payers_information") or []))
            for charge in item.get("standard_charges") or [] if isinstance(charge, dict)))
        return
    for code, kind in codes:
        counts["code_types"][kind] = counts["code_types"].get(kind, 0) + 1
        emitted, facts, empty = False, dict.fromkeys(FACT_KEYS), {}
        for charge in item.get("standard_charges") or []:
            if not isinstance(charge, dict):
                continue
            facts = _from_charge(charge)
            if kind == "HCPCS":
                slot = joined.get(_jk(code, kind, _text(charge, "billing_class")), dict.fromkeys(FACT_KEYS))
                facts = {k: facts[k] if facts[k] is not None or slot.get(k + "_conflict") else slot.get(k) for k in facts}
            payers = [p for p in (charge.get("payers_information") or []) if isinstance(p, dict)] or [empty]
            for payer in payers:
                if payer is not empty and _number(payer, rate_key) is None:
                    counts["skipped_no_dollar_count"] += 1
                rows.append(_row(code, kind, item, charge, None if payer is empty else payer, facts,
                                 None if payer is empty else rate_key))
                emitted = True
        if not emitted:
            rows.append(_row(code, kind, item, None, None, facts))

def _walk(path, inject_error, parse_mode="streamed"):
    stream = iter_mrf(path, parse_mode=parse_mode)
    header, meta = next(stream), None
    def items():
        nonlocal meta
        for item in stream:
            if isinstance(item, dict) and item.get("_meta"):
                meta = item
                return
            if inject_error and isinstance(item, dict):
                item = _inject(item)
            if isinstance(item, dict):
                yield item
    return header, items, lambda: meta

def ingest_file(path, *, rate_key="standard_charge_dollar", inject_error=False, parse_mode="streamed"):
    started = time.perf_counter()
    header, items, meta_of = _walk(path, inject_error, parse_mode)
    joined, excerpt, n_items, rate_present = {}, [], 0, False
    for item in items():
        n_items += 1
        if len(excerpt) < 2:
            excerpt.append(item)
        _facts(item, joined)
        rate_present = rate_present or any(
            isinstance(p, dict) and rate_key in p
            for c in item.get("standard_charges") or [] if isinstance(c, dict)
            for p in c.get("payers_information") or [])
    meta = meta_of()
    if meta is None:
        raise ValueError("missing ingest meta")
    _, items, meta_of = _walk(path, inject_error, parse_mode)
    rows, counts = [], {"quarantined_row_count": 0, "skipped_no_dollar_count": 0, "nulls_repaired": 0, "code_types": {}}
    for item in items():
        _emit(item, joined, rate_key, rows, counts)
    meta2 = meta_of()
    if meta2 is None:
        raise ValueError("missing ingest meta")
    if meta2["sha256"] != meta["sha256"]:
        print("ingest_sha_mismatch", file=sys.stderr)
        raise ValueError("ingest sha mismatch")
    n, elapsed = len(rows), max(time.perf_counter() - started, 1e-9)
    metrics = {"bytes_streamed": meta["bytes_streamed"], "items_parsed": n_items, "rows_emitted": n,
               "rows_quarantined": counts["quarantined_row_count"], "rows_repaired": 0,
               "stage_ms": round(elapsed * 1000, 3), "rows_per_s": round(n / elapsed, 3),
               "mb_per_s": round((meta["bytes_streamed"] / 1_000_000) / elapsed, 3),
               "parse_mode": meta["parse_mode"], "peak_rss": peak_rss()}
    counts.update(flattened_row_count=n, inserted_row_count=n, **{k: metrics[k] for k in
        ("bytes_streamed", "items_parsed", "rows_emitted", "rows_quarantined", "rows_repaired")})
    return {"header": header, "rows": rows, "counts": counts, "metrics": metrics, "sha256": meta["sha256"],
            "parse_mode": meta["parse_mode"], "rate_present": rate_present, "excerpt": excerpt,
            "code_type_counts": dict(counts["code_types"])}
