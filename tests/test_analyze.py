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

from analyze import analyze, write_ledger_artifacts, write_run_artifacts, BASELINE_LABEL, MA_CAVEAT
from mrf_apply import apply_mapping, load_json
from store import store_rows
import csv
import subprocess


def test_fixed_sql_medians_exclusions_and_ties(tmp_path):
    seed = apply_mapping(load_json('hospital-v3-slice.json'), load_json('hospital-golden-mapping.json'))['rows'][0]
    rows = []
    for code, klass in [('12346', 'facility'), ('12345', 'professional'), ('12345', 'facility')]:
        for plan, rate in [('Commercial', 100), ('Commercial PPO', 200), ('Medicare Managed Care Plan', 50),
                           ('Medicaid', 9000), ('MassHealth', 9000), ('Self-pay', 9000), ('CASH', 9000),
                           ('Gross', 9000), ('Other MEDICARE', 9000)]:
            rows.append({**seed, 'billing_code': code, 'billing_class': klass, 'plan_name': plan, 'negotiated_rate': rate})
    rows.extend([{**seed, 'billing_code': '99998', 'plan_name': 'Commercial'},
                 {**seed, 'billing_code': '99999', 'plan_name': 'Medicare Managed Care Plan'}])
    db = store_rows(rows, tmp_path / 'rates.sqlite')
    result = analyze(db['path'])
    assert [(r['billing_code'], r['billing_class']) for r in result] == [
        ('12345', 'facility'), ('12345', 'professional'), ('12346', 'facility')]
    assert all((r['commercial_median'], r['ma_median'], r['difference'], r['ratio'], r['n_commercial'], r['n_MA'])
               == (150, 50, 100, 3, 2, 1) for r in result)
    assert analyze(db['path'], top_n=1) == result[:1]
    with pytest.raises(ValueError):
        analyze(db['path'], top_n=11)


def test_golden_artifacts_and_percent_exclusion(tmp_path):
    fixture = load_json('hospital-v3-slice.json')
    mapping = load_json('hospital-golden-mapping.json')
    original = apply_mapping(fixture, mapping)
    payer_item = next(item for item in fixture['standard_charge_information']
                      if any(charge.get('payers_information') for charge in item['standard_charges']))
    payer_item['standard_charges'][0]['payers_information'].append(
        {'payer_name': 'Excluded', 'plan_name': 'Commercial', 'standard_charge_percentage': 99999})
    result = apply_mapping(fixture, mapping)
    assert result['rows'] == original['rows']
    assert result['skipped_no_dollar_count'] == 1
    artifacts = write_run_artifacts(result['rows'], 'test-run', data_dir=tmp_path / 'data', excluded_counts={
        'skipped_no_dollar_count': 1, 'quarantined_row_count': result['quarantined_row_count']})
    assert artifacts['row_count'] == 42
    assert [row['billing_code'] for row in artifacts['top_rows']] == ['93799', '94799', '15011', '15015', '15017']
    first = artifacts['top_rows'][0]
    assert (first['commercial_median'], first['ma_median'], first['difference'], first['ratio'],
            first['n_commercial'], first['n_MA']) == (374.175, 154.21, 219.965, 2.43, 4, 1)
    with open(artifacts['rows_csv'], newline='', encoding='utf-8') as stream:
        assert len(list(csv.DictReader(stream))) == 42
    text = open(artifacts['report_path'], encoding='utf-8').read()
    assert BASELINE_LABEL in text and 'Medicare Advantage baseline' in text
    assert 'local SQLite' in text and 'indicative only' in text
    assert 'Excluded non-dollar payer entries: 1' in text
    assert 'Quarantined source items: 1' in text
    assert summary_guard(text, artifacts['top_rows'])
    repeated = write_run_artifacts(result['rows'], 'repeat-run', data_dir=tmp_path / 'data',
                                   excluded_counts=artifacts['excluded_counts'])
    assert repeated['sha256'] == artifacts['sha256']
    assert open(repeated['report_path'], encoding='utf-8').read() == text
    assert open(repeated['rows_csv'], 'rb').read() == open(artifacts['rows_csv'], 'rb').read()
    with pytest.raises(ValueError):
        write_run_artifacts(result['rows'], '../escape', data_dir=tmp_path / 'data')
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
    assert MA_CAVEAT in text
    assert text.count(MA_CAVEAT) >= 3
    assert 'Min' in text and 'Max' in text
    assert artifacts['top_rows']
    assert artifacts['spread']
    assert Path(artifacts['report_csv']).is_file()
    repeated = write_ledger_artifacts(parsed['rows'], 'full-slice-2', data_dir=tmp_path / 'data',
                                      excluded_counts=artifacts['excluded_counts'], metrics=parsed['metrics'])
    assert repeated['sha256'] == artifacts['sha256']
    assert open(repeated['report_path'], encoding='utf-8').read() == text
