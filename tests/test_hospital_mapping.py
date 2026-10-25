import copy

import pytest
from pydantic import ValidationError

from mrf_apply import apply_mapping, load_json
from resources import digest


def test_hospital_golden():
    result = apply_mapping(load_json('hospital-v3-slice.json'), load_json('hospital-golden-mapping.json'))
    golden = load_json('hospital-golden-result.json')
    assert {key: result[key] for key in golden['counts']} == golden['counts']
    assert digest(result['rows']) == golden['digest']
    assert all(row['gross_charge'] is not None and row['discounted_cash'] is not None for row in result['rows'])


def test_bad_codes_and_no_dollar_are_not_rates_and_join_is_order_independent():
    mapping = load_json('hospital-golden-mapping.json')
    payer = {'payer_name': 'A', 'plan_name': 'B', 'standard_charge_dollar': 12}
    item = {'description': 'test', 'code_information': [{'type': 'HCPCS', 'code': '12345'}],
            'standard_charges': [{'billing_class': 'facility', 'payers_information': [payer, {'standard_charge_algorithm': 'x'}]}]}
    gross = copy.deepcopy(item)
    gross['standard_charges'] = [{'gross_charge': 30, 'discounted_cash': 20}]
    bad = copy.deepcopy(item)
    bad['code_information'][0]['code'] = 'A1234'
    result = apply_mapping({'standard_charge_information': [item, bad, gross]}, mapping)
    assert result['quarantined_row_count'] == 1
    assert result['skipped_no_dollar_count'] == 1
    assert result['rows'] == [{'billing_code': '12345', 'description': 'test', 'payer_name': 'A', 'plan_name': 'B',
                              'billing_class': 'facility', 'negotiated_rate': 12, 'gross_charge': 30, 'discounted_cash': 20}]


def test_generated_model_and_display_source_are_deterministic():
    from hospital_mapping import generate_row_model, pydantic_source
    mapping = load_json('hospital-golden-mapping.json')
    model = generate_row_model(mapping)
    row = apply_mapping(load_json('hospital-v3-slice.json'), mapping)['rows'][0]
    assert model.model_validate(row).model_dump() == row
    with pytest.raises(ValidationError):
        model.model_validate({**row, 'billing_code': 'A1234'})
    with pytest.raises(ValidationError):
        model.model_validate({**row, 'negotiated_rate': '12'})
    source = pydantic_source(mapping)
    assert source == pydantic_source(copy.deepcopy(mapping))
    namespace = {'__name__': 'hospital_display'}
    exec(source, namespace)
    assert namespace['HospitalRate'].model_json_schema() == model.model_json_schema()
    changed = copy.deepcopy(mapping)
    changed['fields']['rate'] = 'other_rate'
    assert generate_row_model(changed).model_json_schema()['properties']['negotiated_rate']['description'] == 'source: other_rate'
