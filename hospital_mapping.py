"""Hospital v3 mapping: fixed traversal and generated validation, never model code."""
import math
import re

from pydantic import ConfigDict, Field, create_model

VERSION = "mrf.mapping.v2-hospital"
TEXT_FIELDS = ("description", "payer_name", "plan_name", "billing_class")


def parse_hospital_mapping(value):
    if not isinstance(value, dict) or value.get("schema_version") != VERSION:
        raise ValueError("unsupported mapping schema_version")
    selector, fields = value.get("code_selector"), value.get("fields")
    if not isinstance(selector, dict) or not isinstance(fields, dict):
        raise ValueError("mapping requires code_selector and fields")
    for obj, keys in ((value, ("collection", "charge_list", "payer_list", "gross_key", "cash_key")),
                      (selector, ("list", "type_field", "code_field")), (fields, (*TEXT_FIELDS, "rate"))):
        if any(not isinstance(obj.get(k), str) or not obj[k] for k in keys):
            raise ValueError("mapping paths must be non-empty strings")
    if selector.get("accept_types") != ["HCPCS"] or selector.get("pattern") != r"^\d{5}$":
        raise ValueError("code_selector requires HCPCS and five-digit codes")
    return value


def _array(obj, key):
    value = obj.get(key) if isinstance(obj, dict) else None
    return value if isinstance(value, list) else []


def _number(obj, key):
    value = obj.get(key) if isinstance(obj, dict) else None
    if isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value):
        return int(value) if value == int(value) else value
    return None


def _text(obj, key):
    value = obj.get(key) if isinstance(obj, dict) else None
    return value if isinstance(value, str) else ""


def apply_hospital_mapping(fixture, mapping):
    mapping = parse_hospital_mapping(mapping)
    if not isinstance(fixture, dict):
        raise ValueError("fixture must be an object")
    selector, fields = mapping["code_selector"], mapping["fields"]
    selected, quarantined, charges_by_code = [], [], {}
    for index, item in enumerate(_array(fixture, mapping["collection"])):
        codes = list(dict.fromkeys(_text(code, selector["code_field"]) for code in _array(item, selector["list"])
                                 if _text(code, selector["type_field"]) in selector["accept_types"]
                                 and re.fullmatch(r"[0-9]{5}", _text(code, selector["code_field"]))))
        if not codes:
            quarantined.append({"item_index": index, "reason": "bad_code"})
        for code in codes:
            selected.append((code, item))
            joined = charges_by_code.setdefault(code, {"gross_charge": None, "discounted_cash": None})
            for charge in _array(item, mapping["charge_list"]):
                for target, key in (("gross_charge", "gross_key"), ("discounted_cash", "cash_key")):
                    number = _number(charge, mapping[key])
                    if number is not None:
                        if joined[target] is not None and joined[target] != number:
                            raise ValueError(f"conflicting {target} for code {code}")
                        joined[target] = number
    rows, skipped = [], 0
    for code, item in selected:
        for charge in _array(item, mapping["charge_list"]):
            for payer in _array(charge, mapping["payer_list"]):
                rate = _number(payer, fields["rate"])
                if rate is None:
                    skipped += 1
                    continue
                rows.append({"billing_code": code, "description": _text(item, fields["description"]),
                             "payer_name": _text(payer, fields["payer_name"]), "plan_name": _text(payer, fields["plan_name"]),
                             "billing_class": _text(charge, fields["billing_class"]), "negotiated_rate": rate,
                             **charges_by_code[code]})
    return {"rows": rows, "flattened": rows, "flattened_row_count": len(rows), "inserted_row_count": len(rows),
            "nulls_repaired": 0, "skipped_no_dollar_count": skipped,
            "quarantined_row_count": len(quarantined), "quarantined": quarantined}


def _model_fields(mapping):
    parse_hospital_mapping(mapping)
    return {"billing_code": (str, Field(pattern=mapping["code_selector"]["pattern"])),
            **{key: (str, Field(description=f"source: {mapping['fields'][key]}")) for key in TEXT_FIELDS},
            "negotiated_rate": (float, Field(description=f"source: {mapping['fields']['rate']}")),
            "gross_charge": (float | None, None), "discounted_cash": (float | None, None)}


def generate_row_model(mapping):
    return create_model("HospitalRate", __config__=ConfigDict(strict=True, extra="forbid", allow_inf_nan=False),
                        **_model_fields(mapping))


def pydantic_source(mapping):
    """Display-only reproducible source, containing no executable mapping expressions."""
    parse_hospital_mapping(mapping)
    lines = ["from pydantic import ConfigDict, Field, create_model", "", "HospitalRate = create_model(",
             "    'HospitalRate',", "    __config__=ConfigDict(strict=True, extra='forbid', allow_inf_nan=False),",
             f"    billing_code=(str, Field(pattern={mapping['code_selector']['pattern']!r})),"]
    lines.extend(f"    {key}=(str, Field(description={'source: ' + mapping['fields'][key]!r}))," for key in TEXT_FIELDS)
    lines.extend([f"    negotiated_rate=(float, Field(description={'source: ' + mapping['fields']['rate']!r})),", "    gross_charge=(float | None, None),",
                  "    discounted_cash=(float | None, None),", ")", ""])
    return "\n".join(lines)
