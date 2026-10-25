const REPORT_COLUMNS = [
  ["billing_code", "Code"], ["billing_class", "Class"], ["description", "Description"],
  ["commercial_median", "Commercial median"], ["ma_median", "MA median"], ["difference", "Difference"],
  ["ratio", "Ratio"], ["n_commercial", "n commercial"], ["n_MA", "n MA"], ["gross_charge", "Gross"], ["discounted_cash", "Cash"],
] as const;

export function openHospitalReportDialog() {
  const dialog = document.getElementById("hospital-report-modal") as HTMLDialogElement | null;
  if (dialog?.showModal) dialog.showModal(); else dialog?.setAttribute("open", "");
}

export default function HospitalReportTable({ rows, className = "" }: { rows: unknown[]; className?: string }) {
  return <table className={`border-collapse text-left text-sm ${className}`} data-testid="hospital-report-table">
    <thead><tr>{REPORT_COLUMNS.map(([key, label]) => <th className="border-b border-white/20 px-2 py-1 align-bottom font-semibold break-words" key={key}>{label}</th>)}</tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}>{REPORT_COLUMNS.map(([key]) => <td className="border-b border-white/10 px-2 py-1 align-top break-words" key={key}>{String((row as Record<string, unknown> | null)?.[key] ?? "")}</td>)}</tr>)}</tbody>
  </table>;
}
