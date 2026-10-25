"""Create a small, deterministic slice of a local hospital v3 MRF."""

from __future__ import annotations

import argparse
import hashlib
import json
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
from typing import Any

SOURCE_URL = "https://zencloud-southshorehealth.s3.us-east-1.amazonaws.com/www.southshorehealth.org/assets/2026-03/042769210_south-shore-hospital_standardcharges.json"
DEFAULT_SOURCE = Path(__file__).resolve().parents[1] / "data" / "cms-hpt.txt"
DEFAULT_OUTPUT = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-v3-slice.json"
DEFAULT_PROVENANCE = Path(__file__).resolve().parents[1] / "fixtures" / "hospital-v3-slice.provenance.json"
TARGET_CODES = 25


def _hcpcs(code_info: dict[str, Any]) -> str | None:
    value = str(code_info.get("code", ""))
    if code_info.get("type") == "HCPCS" and value.isdigit() and len(value) == 5:
        return value
    return None


def _encoded_size(value: Any) -> int:
    return len(json.dumps(value, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))


def slice_hpt(source: Path, output: Path, provenance: Path) -> dict[str, Any]:
    raw = source.read_bytes()
    document = json.loads(raw.decode("utf-8-sig"))
    if document.get("version") != "3.0.0" or not isinstance(document.get("standard_charge_information"), list):
        raise ValueError("expected a CMS hospital MRF v3.0.0 document")

    code_items: dict[str, list[dict[str, Any]]] = defaultdict(list)
    code_flags: dict[str, dict[str, bool]] = defaultdict(lambda: {"gross_cash": False, "medicare_managed": False})
    algorithm_items: list[dict[str, Any]] = []
    for item in document["standard_charge_information"]:
        if any(
            payer.get("standard_charge_dollar") is None
            and (payer.get("standard_charge_algorithm") is not None or payer.get("standard_charge_percentage") is not None)
            for charge in item.get("standard_charges", [])
            for payer in charge.get("payers_information", [])
        ):
            algorithm_items.append(item)
        item_codes = {_hcpcs(code) for code in item.get("code_information", [])}
        item_codes.discard(None)
        for code in item_codes:
            code_items[code].append(item)
            for charge in item.get("standard_charges", []):
                code_flags[code]["gross_cash"] |= charge.get("gross_charge") is not None or charge.get("discounted_cash") is not None
                for payer in charge.get("payers_information", []):
                    code_flags[code]["medicare_managed"] |= payer.get("plan_name") == "Medicare Managed Care Plan"

    candidates = [
        code for code, flags in code_flags.items()
        if flags["gross_cash"] and flags["medicare_managed"]
    ]
    selected = sorted(
        candidates,
        key=lambda code: (sum(_encoded_size(item) for item in code_items[code]), code),
    )[:TARGET_CODES]
    if len(selected) != TARGET_CODES:
        raise ValueError("source does not contain 25 HCPCS codes with gross/cash and Medicare Managed Care Plan items")
    if not algorithm_items:
        raise ValueError("source does not contain an algorithm-only payer item")

    selected_items = []
    seen_ids: set[int] = set()
    for code in selected:
        for item in code_items[code]:
            if id(item) not in seen_ids:
                selected_items.append(item)
                seen_ids.add(id(item))
    algorithm_item = min(algorithm_items, key=_encoded_size)
    if id(algorithm_item) not in seen_ids:
        selected_items.append(algorithm_item)

    sliced = {key: value for key, value in document.items() if "contact" not in key.lower()}
    sliced["standard_charge_information"] = selected_items
    type_codes = {
        (code.get("type"), str(code.get("code", "")))
        for item in selected_items
        for code in item.get("code_information", [])
    }
    type_counts = Counter(code_type for code_type, _ in type_codes)
    content = (json.dumps(sliced, ensure_ascii=False, separators=(",", ":")) + "\n").encode("utf-8")
    if len(content) >= 150_000:
        raise ValueError(f"slice exceeds 150 KB ({len(content)} bytes)")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_bytes(content)
    provenance_data = {
        "source_url": SOURCE_URL,
        "source_sha256": hashlib.sha256(raw).hexdigest(),
        "date": date.today().isoformat(),
    }
    provenance.parent.mkdir(parents=True, exist_ok=True)
    provenance.write_text(json.dumps(provenance_data, indent=2) + "\n", encoding="utf-8")

    has_algorithm = any(
        payer.get("standard_charge_dollar") is None
        and (payer.get("standard_charge_algorithm") is not None or payer.get("standard_charge_percentage") is not None)
        for item in selected_items
        for charge in item.get("standard_charges", [])
        for payer in charge.get("payers_information", [])
    )
    has_managed = any(
        payer.get("plan_name") == "Medicare Managed Care Plan"
        for item in selected_items
        for charge in item.get("standard_charges", [])
        for payer in charge.get("payers_information", [])
    )
    return {
        "hcpcs_code_count": len(selected),
        "item_count": len(selected_items),
        "code_type_counts": dict(type_counts),
        "has_algorithm_only_payer": has_algorithm,
        "has_medicare_managed_care_plan": has_managed,
        "output_bytes": len(content),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", nargs="?", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("output", nargs="?", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--provenance", type=Path, default=DEFAULT_PROVENANCE)
    args = parser.parse_args()
    result = slice_hpt(args.source, args.output, args.provenance)
    print(json.dumps(result, sort_keys=True))


if __name__ == "__main__":
    main()
