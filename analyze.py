"""Fixed hospital analysis and a numeric guard for proposed summaries."""
import csv
from contextlib import closing
from decimal import Decimal, InvalidOperation
from pathlib import Path
import re
import sqlite3
from statistics import median

from ingest import LEDGER_FIELDS
from store import store_ledger

BASELINE_LABEL = "Medicare Advantage rates in this hospital's file"
MONEY = re.compile(r'[-+]?\$\s*[-+]?(?:[\d,]+(?:\.\d+)?|\.\d+)(?:[eE][-+]?\d+|_\d+)*')


def summary_violations(text, rows):
    """Return unsupported currency tokens in appearance order (including repeats)."""
    allowed = {Decimal(str(value)) for row in rows for value in row.values()
               if isinstance(value, (int, float, Decimal)) and not isinstance(value, bool)}
    violations = []
    for match in MONEY.finditer(text):
        token = match.group()
        try:
            number = token.replace('$', '').replace(',', '').replace(' ', '')
            valid_format = re.fullmatch(r'[-+]?\$\s*[-+]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?', token)
            if not valid_format or Decimal(number) not in allowed:
                violations.append(token)
        except InvalidOperation:
            violations.append(token)
    return violations


def summary_guard(text, rows):
    return not summary_violations(text, rows)


COMMERCIAL_EXCLUSION_PATTERN = r'medicare|medicaid|masshealth|self.?pay|cash|gross'
MA_PLAN = 'Medicare Managed Care Plan'


class _Median:
    def __init__(self):
        self.values = []

    def step(self, value):
        if value is not None:
            self.values.append(value)

    def finalize(self):
        return float(median(Decimal(str(value)) for value in self.values)) if self.values else None


def _connect(db_path):
    connection = sqlite3.connect(Path(db_path).resolve().as_uri() + '?mode=ro', uri=True)
    connection.row_factory = sqlite3.Row
    connection.create_aggregate('median', 1, _Median)
    connection.create_function('commercial', 1, lambda plan: int(
        re.search(COMMERCIAL_EXCLUSION_PATTERN, plan or '', re.IGNORECASE) is None))
    return connection


def _money(value):
    return 'n/a' if value is None else '$' + format(Decimal(str(value)), 'f')


def _cell(value):
    return str(value).replace('|', '\\|').replace('\r', ' ').replace('\n', ' ')


FULL_QUERY = (
    "WITH grouped AS (SELECT billing_code, code_type, billing_class, min(description) AS description, "
    "median(CASE WHEN commercial(plan_name) THEN negotiated_rate END) AS commercial_median, "
    "median(CASE WHEN plan_name = ? THEN negotiated_rate END) AS ma_median, "
    "median(gross_charge) AS gross_charge, median(discounted_cash) AS discounted_cash, "
    "min(min_charge) AS min_charge, max(max_charge) AS max_charge, "
    "sum(commercial(plan_name) AND negotiated_rate IS NOT NULL) AS n_commercial, "
    "sum(CASE WHEN plan_name = ? AND negotiated_rate IS NOT NULL THEN 1 ELSE 0 END) AS n_MA "
    "FROM hospital_rates GROUP BY billing_code, code_type, billing_class) "
    "SELECT *, round(commercial_median - ma_median, 6) AS difference, "
    "round(commercial_median / nullif(ma_median, 0), 2) AS ratio FROM grouped "
    "WHERE commercial_median IS NOT NULL AND ma_median IS NOT NULL "
    "ORDER BY difference DESC, billing_code ASC, code_type ASC, billing_class ASC")
SPREAD_QUERY = (
    "SELECT payer_name, plan_name, min(negotiated_rate) AS min_rate, median(negotiated_rate) AS median_rate, "
    "max(negotiated_rate) AS max_rate, count(*) AS n FROM hospital_rates WHERE negotiated_rate IS NOT NULL "
    "GROUP BY payer_name, plan_name ORDER BY payer_name ASC, plan_name ASC")
def ma_caveat(rows):
    multi = [row for row in rows if (row.get('n_MA') or 0) >= 2]
    if not multi:
        return 'Medicare Managed Care Plan is a single-plan baseline: no comparison group has MA n>=2 in this file.'
    return ('Medicare Managed Care Plan is not a single-plan baseline here: '
            f'{len(multi)} comparison groups have MA n>=2 (max n_MA={max(row["n_MA"] for row in multi)}).')


def ma_plan_scope(spread):
    payers = sorted({row.get('payer_name') or '' for row in spread if (row.get('plan_name') or '') == MA_PLAN} - {''})
    if len(payers) <= 1:
        return 'Medicare Managed Care Plan names a single payer in this file.'
    return ('Medicare Managed Care Plan is a cross-payer label shared by '
            f'{len(payers)} payer names: {", ".join(payers)}.')


def analyze_full(db_path):
    """Every code with commercial and MA medians, plus per-plan spread."""
    with closing(_connect(db_path)) as connection:
        return ([dict(row) for row in connection.execute(FULL_QUERY, (MA_PLAN, MA_PLAN))],
                [dict(row) for row in connection.execute(SPREAD_QUERY)])


def _md(cells):
    return '| ' + ' | '.join(_cell(value) for value in cells) + ' |'


def render_full_report(rows, spread, *, excluded_counts=None, metrics=None):
    counts, metrics, caveat = excluded_counts or {}, metrics or {}, ma_caveat(rows)
    lines = ['# Hospital rate comparison', '',
             'Storage: local SQLite. Parse mode: ' + str(metrics.get('parse_mode', 'streamed')) + '.', '',
             'Medicare Advantage baseline: ' + BASELINE_LABEL + '.', '', caveat, '',
             ma_plan_scope(spread), '',
             '## Codes with commercial and MA medians', '',
             'Ranked by commercial median minus the Medicare Advantage baseline, descending.',
             'Commercial plans exclude names matching: ' + COMMERCIAL_EXCLUSION_PATTERN + '.', '',
             '| Code | Type | Class | Description | Commercial median | MA median | Difference | Ratio | n_commercial | n_MA | Gross | Cash | Min | Max |',
             '| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |']
    for row in rows:
        lines.append(_md([row['billing_code'], row['code_type'], row['billing_class'], row['description'],
                          _money(row['commercial_median']), _money(row['ma_median']), _money(row['difference']),
                          'n/a' if row['ratio'] is None else f"{row['ratio']:.2f}", row['n_commercial'], row['n_MA'],
                          _money(row['gross_charge']), _money(row['discounted_cash']),
                          _money(row['min_charge']), _money(row['max_charge'])]))
    if not rows:
        lines.extend(['', 'No groups have both eligible commercial and Medicare Advantage baseline rates.'])
    lines.extend(['', caveat, '', '## Per-payer spread (dollar rates)', '',
                  '| Payer | Plan | Min | Median | Max | n |', '| --- | --- | ---: | ---: | ---: | ---: |'])
    lines.extend(_md([row['payer_name'], row['plan_name'], _money(row['min_rate']), _money(row['median_rate']),
                      _money(row['max_rate']), row['n']]) for row in spread)
    lines.extend(['', caveat, '', 'Small-n medians (some groups contain one plan) are indicative only.',
                  'Percent/algorithm prices are stored as percent_rate/algorithm and never converted into dollar rates.',
                  f"Non-dollar payer entries stored with a null rate (excluded from medians): {counts.get('skipped_no_dollar_count', 0)}.",
                  f"Quarantined rows: {counts.get('quarantined_row_count', 0)}.", ''])
    text = '\n'.join(lines)
    if summary_violations(text, rows + spread):
        raise ValueError('report contains unsupported dollar figures')
    return text


def write_ledger_artifacts(rows, run_id, *, data_dir=Path('data'), excluded_counts=None, metrics=None):
    """Write data/runs/<run_id>/{rows.csv,report.csv,mrf.sqlite,report.md} from the full ledger."""
    if not isinstance(run_id, str) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,127}', run_id):
        raise ValueError('invalid run_id')
    counts = dict(excluded_counts or {})
    if set(counts) - {'skipped_no_dollar_count', 'quarantined_row_count'} or any(
            type(value) is not int or value < 0 for value in counts.values()):
        raise ValueError('invalid excluded_counts')
    directory = Path(data_dir) / 'runs' / run_id
    directory.mkdir(parents=True, exist_ok=False)
    stored = store_ledger(rows, directory / 'mrf.sqlite')
    top_rows, spread = analyze_full(stored['path'])
    report = render_full_report(top_rows, spread, excluded_counts=counts, metrics=metrics)
    csv_path, report_csv, report_path = directory / 'rows.csv', directory / 'report.csv', directory / 'report.md'
    with csv_path.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(LEDGER_FIELDS))
        writer.writeheader(); writer.writerows({key: row.get(key) for key in LEDGER_FIELDS} for row in rows)
    with report_csv.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(top_rows[0]) if top_rows else ['billing_code'])
        writer.writeheader(); writer.writerows(top_rows)
    with report_path.open('w', encoding='utf-8', newline='\n') as stream:
        stream.write(report)
    return {**stored, 'db_path': stored['path'], 'rows_csv': str(csv_path), 'report_csv': str(report_csv),
            'report_path': str(report_path), 'top_rows': top_rows, 'spread': spread,
            'baseline_label': BASELINE_LABEL, 'excluded_counts': counts}
