export default function SyntheticBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-emerald-200 ${className}`}
      data-testid="synthetic-badge"
    >
      Synthetic · no PHI
    </span>
  );
}
