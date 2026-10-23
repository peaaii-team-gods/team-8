import { useStore } from "../state/store";

export default function ScienceReceipt() {
  const receipt = useStore((s) => s.scienceReceipt);
  if (!receipt) return null;
  return (
    <aside className="glass w-full p-4 text-sm" data-testid="science-receipt">
      <div className="mb-2 font-semibold">Science receipt</div>
      <p className="mb-2 text-[10px] opacity-60">Synthetic model proposals · no verified acceptance</p>
      <dl className="space-y-1.5 text-xs">
        {receipt.mapping && <div><dt className="opacity-60">Mapping</dt><dd className="font-mono break-all">{receipt.mapping}</dd></div>}
        {receipt.riskOrQc && <div><dt className="opacity-60">Risk / QC</dt><dd>{receipt.riskOrQc}</dd></div>}
        {receipt.flags.length > 0 && <div><dt className="opacity-60">Flags</dt><dd>{receipt.flags.join(", ")}</dd></div>}
        <div><dt className="opacity-60">Tokens</dt><dd className="tabular-nums">{receipt.tokens}</dd></div>
        {receipt.contentFreeIds.length > 0 && (
          <div><dt className="opacity-60">Ids</dt><dd className="font-mono text-[10px] break-all">{receipt.contentFreeIds.join(" · ")}</dd></div>
        )}
        {receipt.oracleNote && <div><dt className="opacity-60">Oracle</dt><dd>{receipt.oracleNote}</dd></div>}
      </dl>
    </aside>
  );
}
