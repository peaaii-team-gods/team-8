import hashlib
import json
from collections import Counter, defaultdict
from pathlib import Path

import pytest

from scripts.slice_hpt import slice_hpt

ROOT = Path(__file__).resolve().parents[1]


def hospital_document():
    items = []
    for number in range(10000, 10027):
        code = [{"code": str(number), "type": "HCPCS"}]
        items.extend([
            {"description": "Procedure", "code_information": code,
             "standard_charges": [{"setting": "both", "billing_class": "facility",
                                   "gross_charge": 100, "discounted_cash": 75}]},
            {"description": "Procedure", "code_information": code,
             "standard_charges": [{"setting": "both", "billing_class": "facility",
                                   "payers_information": [{"payer_name": "Plan provider",
                                       "plan_name": "Medicare Managed Care Plan",
                                       "methodology": "fee schedule", "standard_charge_dollar": 50}]}]},
        ])
    items.append({"description": "Algorithm procedure",
                  "code_information": [{"code": "043", "type": "MS-DRG"}],
                  "standard_charges": [{"setting": "inpatient", "billing_class": "facility",
                      "payers_information": [{"payer_name": "Plan provider", "plan_name": "Commercial",
                          "methodology": "other", "standard_charge_algorithm": "case rate"}]}]})
    return {"version": "3.0.0", "hospital_name": "Test hospital", "last_updated_on": "2026-01-01",
            "attestation": {"attestation_information": "Accurate"},
            "contact_information": {"name": "Synthetic test contact"},
            "standard_charge_information": items}


def assert_slice(document):
    assert document["version"] == "3.0.0"
    assert not any("contact" in key.lower() for key in document)
    codes = defaultdict(list)
    all_codes = set()
    payers = []
    for item in document["standard_charge_information"]:
        assert isinstance(item["description"], str)
        assert isinstance(item["standard_charges"], list)
        for code in item["code_information"]:
            all_codes.add((code["type"], code["code"]))
            if code["type"] == "HCPCS":
                assert len(code["code"]) == 5 and code["code"].isascii() and code["code"].isdigit()
                codes[code["code"]].extend(item["standard_charges"])
        for charge in item["standard_charges"]:
            assert charge["setting"] and charge["billing_class"]
            payers.extend(charge.get("payers_information", []))
    assert len(codes) == 25
    for charges in codes.values():
        assert any(c.get("gross_charge") is not None for c in charges)
        assert any(c.get("discounted_cash") is not None for c in charges)
        assert any(c.get("payers_information") for c in charges)
    assert any(p.get("standard_charge_dollar") is None and
               (p.get("standard_charge_algorithm") is not None or
                p.get("standard_charge_percentage") is not None) for p in payers)
    assert any(p["plan_name"] == "Medicare Managed Care Plan" for p in payers)
    return dict(Counter(kind for kind, _ in all_codes))


def test_bom_source_metadata_schema_provenance_and_counts(tmp_path):
    original = hospital_document()
    source = tmp_path / "input.json"
    source.write_text(json.dumps(original), encoding="utf-8-sig")
    output, provenance = tmp_path / "slice.json", tmp_path / "provenance.json"
    result = slice_hpt(source, output, provenance)
    document = json.loads(output.read_bytes())
    assert assert_slice(document) == result["code_type_counts"] == {"HCPCS": 25, "MS-DRG": 1}
    assert {k: v for k, v in document.items() if k != "standard_charge_information"} == {
        k: v for k, v in original.items() if k not in ("standard_charge_information", "contact_information")}
    assert result["hcpcs_code_count"] == 25
    assert result["item_count"] == len(document["standard_charge_information"]) == 51
    assert result["has_algorithm_only_payer"] is True
    assert result["has_medicare_managed_care_plan"] is True
    assert result["output_bytes"] == output.stat().st_size < 150_000
    receipt = json.loads(provenance.read_bytes())
    assert receipt["source_sha256"] == hashlib.sha256(source.read_bytes()).hexdigest()
    assert receipt["source_url"].startswith("https://")
    assert len(receipt["date"].split("-")) == 3


def test_committed_real_slice_schema_counts_and_size():
    fixture = ROOT / "fixtures" / "hospital-v3-slice.json"
    assert assert_slice(json.loads(fixture.read_bytes())) == {"HCPCS": 25, "MS-DRG": 1, "CDM": 25, "RC": 4}
    assert fixture.stat().st_size < 150_000


def test_two_runs_have_identical_bytes(tmp_path):
    source = tmp_path / "source.json"
    source.write_text(json.dumps(hospital_document()), encoding="utf-8-sig")
    first, second = tmp_path / "first.json", tmp_path / "second.json"
    p1, p2 = tmp_path / "p1.json", tmp_path / "p2.json"
    slice_hpt(source, first, p1)
    slice_hpt(source, second, p2)
    assert first.read_bytes() == second.read_bytes()
    assert p1.read_bytes() == p2.read_bytes()


@pytest.mark.parametrize("mutation", ["version", "codes", "algorithm"])
def test_rejects_source_without_required_coverage(tmp_path, mutation):
    document = hospital_document()
    if mutation == "version":
        document["version"] = "2.0.0"
    elif mutation == "codes":
        document["standard_charge_information"] = document["standard_charge_information"][:2]
    else:
        document["standard_charge_information"].pop()
    source = tmp_path / "source.json"
    source.write_text(json.dumps(document), encoding="utf-8")
    with pytest.raises(ValueError):
        slice_hpt(source, tmp_path / "out.json", tmp_path / "provenance.json")
