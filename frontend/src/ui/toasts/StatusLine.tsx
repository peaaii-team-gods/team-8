import { useStore } from "../../state/store";

export default function StatusLine() {
  const hint = useStore((state) => state.statusHint);
  const clearStatusHint = useStore((state) => state.clearStatusHint);
  if (!hint) return null;
  return (
    <div className="fixed bottom-4 left-4 z-40 flex max-w-sm items-center gap-3 rounded-full border border-white/15 bg-[#070312]/90 px-3 py-1.5 text-xs" data-testid="status-line">
      <span>{hint}</span>
      <button type="button" className="opacity-70" onClick={() => clearStatusHint()}>Clear status</button>
    </div>
  );
}
