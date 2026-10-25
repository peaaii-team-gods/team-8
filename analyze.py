"""Fixed hospital analysis and a numeric guard for proposed summaries."""
import csv
from contextlib import closing
from decimal import Decimal, InvalidOperation
from pathlib import Path
import re
import sqlite3
from statistics import median

from store import store_rows, validated_rows

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
FIXED_QUERY = '''
WITH grouped AS (
    SELECT billing_code, billing_class, min(description) AS description,
           median(CASE WHEN commercial(plan_name) THEN negotiated_rate END) AS commercial_median,
           median(CASE WHEN plan_name = ? THEN negotiated_rate END) AS ma_median,
           median(gross_charge) AS gross_charge, median(discounted_cash) AS discounted_cash,
           sum(commercial(plan_name)) AS n_commercial,
           sum(CASE WHEN plan_name = ? THEN 1 ELSE 0 END) AS n_MA
    FROM hospital_rates GROUP BY billing_code, billing_class
)
SELECT *, round(commercial_median - ma_median, 6) AS difference,
       round(commercial_median / nullif(ma_median, 0), 2) AS ratio
FROM grouped WHERE commercial_median IS NOT NULL AND ma_median IS NOT NULL
ORDER BY difference DESC, billing_code ASC, billing_class ASC LIMIT ?
'''


class _Median:
    def __init__(self):
        self.values = []

    def step(self, value):
        if value is not None:
            self.values.append(value)

    def finalize(self):
        return float(median(Decimal(str(value)) for value in self.values)) if self.values else None


def analyze(db_path, top_n=10):
    """Run the fixed ranked median query against an existing local SQLite store."""
    if type(top_n) is not int or not 1 <= top_n <= 10:
        raise ValueError('top_n must be an integer from 1 to 10')
    uri = Path(db_path).resolve().as_uri() + '?mode=ro'
    with closing(sqlite3.connect(uri, uri=True)) as connection:
        connection.row_factory = sqlite3.Row
        connection.create_aggregate('median', 1, _Median)
        connection.create_function('commercial', 1, lambda plan: int(
            re.search(COMMERCIAL_EXCLUSION_PATTERN, plan, re.IGNORECASE) is None))
        return [dict(row) for row in connection.execute(FIXED_QUERY, (MA_PLAN, MA_PLAN, top_n))]


def _money(value):
    return 'n/a' if value is None else '$' + format(Decimal(str(value)), 'f')


def _cell(value):
    return str(value).replace('|', '\\|').replace('\r', ' ').replace('\n', ' ')


def render_report(rows, *, excluded_counts=None):
    counts = excluded_counts or {}
    lines = ['# Hospital rate comparison', '', 'Storage: local SQLite.', '',
             'Medicare Advantage baseline: ' + BASELINE_LABEL + '.', '',
             'Ranked by commercial median minus the Medicare Advantage baseline, descending.',
             'Commercial plans exclude names matching: ' + COMMERCIAL_EXCLUSION_PATTERN + '.', '',
             '| Code | Class | Description | Commercial median | MA median | Difference | Ratio | n_commercial | n_MA | Gross | Cash |',
             '| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |']
    for row in rows:
        cells = [row['billing_code'], row['billing_class'], row['description'],
                 _money(row['commercial_median']), _money(row['ma_median']), _money(row['difference']),
                 'n/a' if row['ratio'] is None else f"{row['ratio']:.2f}", row['n_commercial'], row['n_MA'],
                 _money(row['gross_charge']), _money(row['discounted_cash'])]
        lines.append('| ' + ' | '.join(_cell(value) for value in cells) + ' |')
    if not rows:
        lines.extend(['', 'No groups have both eligible commercial and Medicare Advantage baseline rates.'])
    lines.extend(['', 'Small-n medians (some groups contain one plan) are indicative only.',
                  'Percent/algorithm prices are never converted into dollar rates.',
                  f"Excluded non-dollar payer entries: {counts.get('skipped_no_dollar_count', 0)}.",
                  f"Quarantined source items: {counts.get('quarantined_row_count', 0)}.", ''])
    text = '\n'.join(lines)
    violations = summary_violations(text, rows)
    if violations:
        raise ValueError('report contains unsupported dollar figures')
    return text


def write_run_artifacts(rows, run_id, *, data_dir=Path('data'), mapping=None, excluded_counts=None):
    """Write data/runs/<run_id>/{rows.csv,mrf.sqlite,report.md}; never invoke a model.

    excluded_counts accepts skipped_no_dollar_count and quarantined_row_count
    from apply_mapping; quarantined items are distinct from eligible non-dollar payers.
    """
    if not isinstance(run_id, str) or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9_-]{0,127}', run_id):
        raise ValueError('invalid run_id')
    counts = dict(excluded_counts or {})
    if set(counts) - {'skipped_no_dollar_count', 'quarantined_row_count'} or any(
            type(value) is not int or value < 0 for value in counts.values()):
        raise ValueError('invalid excluded_counts')
    validated = validated_rows(rows, mapping)
    directory = Path(data_dir) / 'runs' / run_id
    directory.mkdir(parents=True, exist_ok=False)
    stored = store_rows(validated, directory / 'mrf.sqlite', mapping=mapping)
    top_rows = analyze(stored['path'])
    report = render_report(top_rows, excluded_counts=counts)
    csv_path, report_path = directory / 'rows.csv', directory / 'report.md'
    with csv_path.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(validated[0]) if validated else [
            'billing_code', 'description', 'payer_name', 'plan_name', 'billing_class',
            'negotiated_rate', 'gross_charge', 'discounted_cash'])
        writer.writeheader()
        writer.writerows(validated)
    report_path.write_text(report, encoding='utf-8')
    return {**stored, 'db_path': stored['path'], 'rows_csv': str(csv_path), 'report_path': str(report_path),
            'top_rows': top_rows, 'baseline_label': BASELINE_LABEL, 'excluded_counts': counts}
