"""Fixed deterministic MRF flatten. Model decisions select field paths, never code."""
import json
from pathlib import Path

from resources import digest

ROOT = Path(__file__).resolve().parent
FIXTURES = ROOT / "fixtures"
MAPPING_VERSION = "mrf.mapping.v1"
FIELD_TARGETS = ("billing_code", "description", "payer_name", "billing_class", "negotiated_type", "rate")
PINNED = {
    "flattened_row_count": 16,
    "nulls_repaired": 2,
    "inserted_row_count": 14,
    "digest": "4bc453d89a199a71a454ed713db26bd199b8b424fec7c65a988c823ff269bbcc",
}


def load_json(name):
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


def parse_mapping(value):
    if isinstance(value, dict) and value.get("schema_version") == "mrf.mapping.v2-hospital":
        from hospital_mapping import parse_hospital_mapping
        return parse_hospital_mapping(value)
    if not isinstance(value, dict) or value.get("schema_version") != MAPPING_VERSION:
        raise ValueError("unsupported mapping schema_version")
    fields = value.get("fields")
    policy = (value.get("null_policy") or {}).get("rate") or {}
    if not isinstance(fields, dict) or any(not isinstance(fields.get(k), str) or not fields[k] for k in FIELD_TARGETS):
        raise ValueError("mapping.fields must name every target")
    if not isinstance(policy.get("fill_from"), str) or not isinstance(policy.get("by"), str):
        raise ValueError("mapping.null_policy.rate must name fill_from and by")
    if not isinstance(value.get("dedupe_key"), list) or not value["dedupe_key"] or any(
            not isinstance(k, str) for k in value["dedupe_key"]):
        raise ValueError("mapping.dedupe_key must be a non-empty string array")
    for key in ("collection", "rate_groups", "prices", "standard_charge_lookup"):
        if not isinstance(value.get(key), str):
            raise ValueError(f"mapping.{key} must be a string")
    return value


def _text(obj, key):
    value = obj.get(key) if isinstance(obj, dict) else None
    return value if isinstance(value, str) else ""


def apply_mapping(fixture, mapping_input):
    mapping = parse_mapping(mapping_input)
    if mapping["schema_version"] == "mrf.mapping.v2-hospital":
        from hospital_mapping import apply_hospital_mapping
        return apply_hospital_mapping(fixture, mapping)
    if not isinstance(fixture, dict):
        raise ValueError("fixture must be an object")
    lookup = fixture.get(mapping["standard_charge_lookup"]) or {}
    if not isinstance(lookup, dict):
        lookup = {}
    flattened = []
    nulls_repaired = 0
    for item in fixture.get(mapping["collection"]) or []:
        if not isinstance(item, dict):
            continue
        billing_code = _text(item, mapping["fields"]["billing_code"])
        description = _text(item, mapping["fields"]["description"])
        for group in item.get(mapping["rate_groups"]) or []:
            if not isinstance(group, dict):
                continue
            payer = _text(group, mapping["fields"]["payer_name"])
            for price in group.get(mapping["prices"]) or []:
                price = price if isinstance(price, dict) else {}
                rate_key = mapping["fields"]["rate"]
                rate = price.get(rate_key, None) if rate_key in price else None
                if not isinstance(rate, (int, float)) or isinstance(rate, bool):
                    rate = None
                if rate is None:
                    fill = lookup.get(billing_code)
                    if isinstance(fill, (int, float)) and not isinstance(fill, bool):
                        rate = fill
                        nulls_repaired += 1
                flattened.append({
                    "billing_code": billing_code,
                    "description": description,
                    "payer_name": payer,
                    "billing_class": _text(price, mapping["fields"]["billing_class"]),
                    "negotiated_type": _text(price, mapping["fields"]["negotiated_type"]),
                    "negotiated_rate": rate,
                })
    seen, rows = set(), []
    for row in flattened:
        key = "\0".join(str(row.get(k, "")) for k in mapping["dedupe_key"])
        if key in seen:
            continue
        seen.add(key)
        rows.append(row)
    return {
        "rows": rows,
        "flattened": flattened,
        "flattened_row_count": len(flattened),
        "nulls_repaired": nulls_repaired,
        "inserted_row_count": len(rows),
    }


def run_checks(result):
    actual = digest(result["rows"])
    checks = [
        ("flattened_row_count", PINNED["flattened_row_count"], result["flattened_row_count"]),
        ("nulls_repaired", PINNED["nulls_repaired"], result["nulls_repaired"]),
        ("inserted_row_count", PINNED["inserted_row_count"], result["inserted_row_count"]),
        ("digest", PINNED["digest"], actual),
    ]
    return [{"name": name, "pass": expected == actual_value, "expected": expected, "actual": actual_value,
             "evidence": {name: actual_value}} for name, expected, actual_value in checks]


def failing_checks(checks):
    return [c for c in checks if not c["pass"]]
