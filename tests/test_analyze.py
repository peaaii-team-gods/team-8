import pytest

from analyze import summary_guard, summary_violations


def test_summary_guard_checks_dollars_against_only_numeric_row_values():
    rows = [{'billing_code': '12345', 'description': '$999', 'commercial_median': 1234.5,
             'baseline_median': 100, 'gross_charge': None}]
    assert summary_guard('Commercial $1,234.50 versus $100.00.', rows)
    assert summary_guard('No currency claims.', rows)
    assert not summary_guard('Invented $12345 or $999 or $8.00.', rows)
    assert summary_violations('Invented $12345 and $8.00 and $8.00.', rows) == ['$12345', '$8.00', '$8.00']
    assert not summary_guard('Negative -$100.', rows)
    assert not summary_guard('Bad precision $100.001.', rows)

from analyze import analyze_full, write_ledger_artifacts, BASELINE_LABEL, ma_caveat
from mrf_apply import load_json
from store import store_ledger
from ingest import ingest_file
from pathlib import Path
import json
import csv
import subprocess


def test_fixed_sql_medians_exclusions_and_ties(tmp_path):
    seed = ingest_file(Path(__file__).resolve().parents[1] / 'fixtures' / 'hospital-v3-slice.json')['rows'][0]
    rows = []
    for code, klass in [('12346', 'facility'), ('12345', 'professional'), ('12345', 'facility')]:
        for plan, rate in [('Commercial', 100), ('Commercial PPO', 200), ('Medicare Managed Care Plan', 50),
                           ('Medicaid', 9000), ('MassHealth', 9000), ('Self-pay', 9000), ('CASH', 9000),
                           ('Gross', 9000), ('Other MEDICARE', 9000)]:
            rows.append({**seed, 'billing_code': code, 'billing_class': klass, 'plan_name': plan, 'negotiated_rate': rate})
    rows.extend([{**seed, 'billing_code': '99998', 'plan_name': 'Commercial'},
                 {**seed, 'billing_code': '99999', 'plan_name': 'Medicare Managed Care Plan'}])
    db = store_ledger(rows, tmp_path / 'rates.sqlite')
    result, _ = analyze_full(db['path'])
    assert [(r['billing_code'], r['billing_class']) for r in result] == [
        ('12345', 'facility'), ('12345', 'professional'), ('12346', 'facility')]
    assert all((r['commercial_median'], r['ma_median'], r['difference'], r['ratio'], r['n_commercial'], r['n_MA'])
               == (150, 50, 100, 3, 2, 1) for r in result)


def test_ledger_artifacts_and_percent_exclusion(tmp_path):
    fixture = load_json('hospital-v3-slice.json')
    source = tmp_path / 'source.json'
    source.write_text(json.dumps(fixture), encoding='utf-8')
    original = ingest_file(source)
    baseline = write_ledger_artifacts(original['rows'], 'baseline', data_dir=tmp_path / 'data')
    payer_item = next(item for item in fixture['standard_charge_information']
                      if any(charge.get('payers_information') for charge in item['standard_charges']))
    payer_item['standard_charges'][0]['payers_information'].append(
        {'payer_name': 'Excluded', 'plan_name': 'Commercial', 'standard_charge_percentage': 99999})
    source.write_text(json.dumps(fixture), encoding='utf-8')
    result = ingest_file(source)
    percent_rows = [row for row in result['rows'] if row['payer_name'] == 'Excluded']
    assert percent_rows and all(row['negotiated_rate'] is None and row['percent_rate'] == 99999 for row in percent_rows)
    assert result['counts']['skipped_no_dollar_count'] == original['counts']['skipped_no_dollar_count'] + len(percent_rows)
    counts = {key: result['counts'][key] for key in ('skipped_no_dollar_count', 'quarantined_row_count')}
    artifacts = write_ledger_artifacts(result['rows'], 'test-run', data_dir=tmp_path / 'data', excluded_counts=counts)
    assert artifacts['row_count'] == len(original['rows']) + len(percent_rows)
    assert artifacts['top_rows'] == baseline['top_rows']
    assert artifacts['spread'] == baseline['spread']
    with open(artifacts['rows_csv'], newline='', encoding='utf-8') as stream:
        assert len(list(csv.DictReader(stream))) == artifacts['row_count']
    text = Path(artifacts['report_path']).read_text(encoding='utf-8')
    assert BASELINE_LABEL in text and 'Medicare Advantage baseline' in text
    assert 'local SQLite' in text and 'indicative only' in text
    assert f"Non-dollar payer entries stored with a null rate (excluded from medians): {counts['skipped_no_dollar_count']}" in text
    assert f"Quarantined rows: {counts['quarantined_row_count']}" in text
    assert summary_guard(text, artifacts['top_rows'] + artifacts['spread'])
    repeated = write_ledger_artifacts(result['rows'], 'repeat-run', data_dir=tmp_path / 'data', excluded_counts=counts)
    assert repeated['sha256'] == artifacts['sha256']
    assert Path(repeated['report_path']).read_text(encoding='utf-8') == text
    assert Path(repeated['rows_csv']).read_bytes() == Path(artifacts['rows_csv']).read_bytes()
    with pytest.raises(ValueError):
        write_ledger_artifacts(result['rows'], '../escape', data_dir=tmp_path / 'data')
    ignored = subprocess.run(['git', 'check-ignore', 'data/runs/test-run/mrf.sqlite'], capture_output=True, text=True)
    assert ignored.returncode == 0



def test_guard_does_not_accept_partial_currency_tokens():
    rows = [{'commercial_median': 1, 'ma_median': 100, 'difference': 99}]
    assert not summary_guard('Unsupported $.50 and $1e3 and $1_000.', rows)


def test_full_ledger_report_sections(tmp_path):
    from ingest import ingest_file
    from pathlib import Path
    parsed = ingest_file(Path(__file__).resolve().parents[1] / 'fixtures' / 'hospital-v3-slice.json')
    artifacts = write_ledger_artifacts(parsed['rows'], 'full-slice', data_dir=tmp_path / 'data', excluded_counts={
        'skipped_no_dollar_count': parsed['counts']['skipped_no_dollar_count'],
        'quarantined_row_count': parsed['counts']['quarantined_row_count']}, metrics=parsed['metrics'])
    text = open(artifacts['report_path'], encoding='utf-8').read()
    assert '## Codes with commercial and MA medians' in text
    assert '## Per-payer spread (dollar rates)' in text
    caveat = ma_caveat(artifacts["top_rows"])
    assert caveat in text
    assert text.count(caveat) >= 3
    assert 'n and the MA single-plan caveat apply to every section' not in text
    assert 'Min' in text and 'Max' in text
    assert artifacts['top_rows']
    assert artifacts['spread']
    assert Path(artifacts['report_csv']).is_file()
    repeated = write_ledger_artifacts(parsed['rows'], 'full-slice-2', data_dir=tmp_path / 'data',
                                      excluded_counts=artifacts['excluded_counts'], metrics=parsed['metrics'])
    assert repeated['sha256'] == artifacts['sha256']
    assert open(repeated['report_path'], encoding='utf-8').read() == text


def test_ma_caveat_text_cannot_disagree_with_n_ma():
    from analyze import render_full_report
    row = {'billing_code': 'A0425', 'code_type': 'HCPCS', 'billing_class': 'facility', 'description': 'ambulance',
           'commercial_median': 10, 'ma_median': 5, 'difference': 5, 'ratio': 2, 'n_commercial': 2, 'n_MA': 1,
           'gross_charge': 20, 'discounted_cash': 8, 'min_charge': 1, 'max_charge': 30}
    single = ma_caveat([{**row}])
    assert 'no comparison group has MA n>=2' in single
    assert single in render_full_report([{**row}], [])
    multi = [{**row, 'n_MA': 5}, {**row, 'billing_code': 'A0426', 'n_MA': 2}]
    note = ma_caveat(multi)
    text = render_full_report(multi, [])
    assert 'not a single-plan baseline' in note
    assert '2 comparison groups' in note and 'max n_MA=5' in note
    assert note in text and text.count(note) >= 3
    assert single not in text


def test_ma_plan_scope_is_derived_from_spread_payers():
    from analyze import ma_plan_scope, render_full_report
    row = {'billing_code': 'A0425', 'code_type': 'HCPCS', 'billing_class': 'facility', 'description': 'ambulance',
           'commercial_median': 10, 'ma_median': 5, 'difference': 5, 'ratio': 2, 'n_commercial': 2, 'n_MA': 1,
           'gross_charge': 20, 'discounted_cash': 8, 'min_charge': 1, 'max_charge': 30}
    spread = [
        {'payer_name': 'Aetna', 'plan_name': 'Medicare Managed Care Plan', 'min_rate': 1, 'median_rate': 2, 'max_rate': 3, 'n': 1},
        {'payer_name': 'Tufts', 'plan_name': 'Medicare Managed Care Plan', 'min_rate': 1, 'median_rate': 2, 'max_rate': 3, 'n': 1},
    ]
    note = ma_plan_scope(spread)
    text = render_full_report([{**row}], spread)
    assert 'cross-payer label shared by 2 payer names' in note
    assert 'Aetna' in note and 'Tufts' in note
    assert note in text
    assert 'n and the MA single-plan caveat apply to every section' not in text
    assert 'single payer' in ma_plan_scope(spread[:1])
