import { useState } from "react";

const PAGE = 25;
const REPORT = [["billing_code", "Code"], ["code_type", "Type"], ["billing_class", "Class"], ["description", "Description"],
  ["commercial_median", "Commercial median"], ["ma_median", "MA median"], ["difference", "Difference"], ["ratio", "Ratio"],
  ["n_commercial", "n commercial"], ["n_MA", "n MA"], ["gross_charge", "Gross"], ["discounted_cash", "Cash"],
  ["min_charge", "Min"], ["max_charge", "Max"]] as const;
const SPREAD = [["payer_name", "Payer"], ["plan_name", "Plan"], ["min_rate", "Min"], ["median_rate", "Median"],
  ["max_rate", "Max"], ["n", "n"]] as const;
const CAVEAT = "Medicare Managed Care Plan is a single-plan baseline: no code has MA n>=2 in this file.";

export function openHospitalReportDialog() {
  const dialog = document.getElementById("hospital-report-modal") as HTMLDialogElement | null;
  if (dialog?.showModal) dialog.showModal(); else dialog?.setAttribute("open", "");
}

function PagedTable({ rows, columns, className, testid }: { rows: unknown[]; columns: readonly (readonly [string, string])[]; className: string; testid: string }) {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE)), current = Math.min(page, pages - 1);
  return <div>
    <table className={`border-collapse text-left text-sm ${className}`} data-testid={testid}>
      <thead><tr>{columns.map(([key, label]) => <th className="border-b border-white/20 px-2 py-1 align-bottom font-semibold break-words" key={key}>{label}</th>)}</tr></thead>
      <tbody>{rows.slice(current * PAGE, current * PAGE + PAGE).map((row, index) => <tr key={index}>{columns.map(([key]) => <td className="border-b border-white/10 px-2 py-1 align-top break-words" key={key}>{String((row as Record<string, unknown> | null)?.[key] ?? "")}</td>)}</tr>)}</tbody>
    </table>
    <p className="mt-2 flex items-center gap-2 text-xs text-white/70" data-testid={`${testid}-pager`}>
      <button type="button" className="nodrag rounded border border-white/20 px-2 py-0.5 disabled:opacity-40" disabled={current === 0} onClick={event => { event.stopPropagation(); setPage(current - 1); }}>Previous</button>
      Page {current + 1} of {pages} ({rows.length} rows)
      <button type="button" className="nodrag rounded border border-white/20 px-2 py-0.5 disabled:opacity-40" disabled={current >= pages - 1} onClick={event => { event.stopPropagation(); setPage(current + 1); }}>Next</button>
    </p>
  </div>;
}

export default function HospitalReportTable({ rows, spread = [], className = "" }: { rows: unknown[]; spread?: unknown[]; className?: string }) {
  const caveat = <p className="mb-2 text-xs text-white/60">{CAVEAT}</p>;
  return <div className="space-y-4">
    <section><h3 className="mb-2 font-semibold">Codes with commercial and MA medians</h3>{caveat}
      <PagedTable rows={rows} columns={REPORT} className={className} testid="hospital-report-table" /></section>
    {spread.length > 0 && <section><h3 className="mb-2 font-semibold">Per-payer spread (dollar rates)</h3>{caveat}
      <PagedTable rows={spread} columns={SPREAD} className={className} testid="hospital-spread-table" /></section>}
  </div>;
}
