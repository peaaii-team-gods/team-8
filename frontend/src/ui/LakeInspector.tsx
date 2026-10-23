import { fixtureFor } from "../fixtures/lakes";
import { useStore } from "../state/store";
import { dataLakePreset } from "../registry/dataLakePresets";

function keysOf(rows: unknown[]): string[] {
  const keys: string[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    for (const key of Object.keys(row)) if (!keys.includes(key)) keys.push(key);
  }
  return keys;
}

export default function LakeInspector() {
  const inspectedLakeId = useStore((s) => s.inspectedLakeId);
  const nodes = useStore((s) => s.nodes);
  const inspectLake = useStore((s) => s.inspectLake);
  const node = nodes.find((n) => n.id === inspectedLakeId && n.data.kind === "dataLake");
  if (!node) return null;
  const mrfSource = useStore((s) => s.mrfSource);
  const preset = dataLakePreset(node.data.presetId);
  const fixtureId = node.data.presetId === "hospital-mrf" && mrfSource === "drift" ? "hospital-mrf-drift" : (preset?.fixtureId ?? node.data.presetId);
  const rows = fixtureFor(fixtureId).slice(0, 8);
  return (
    <aside className="glass absolute bottom-24 right-4 z-20 w-[min(420px,92vw)] p-4 text-sm" data-testid="lake-inspector" onClick={(e) => e.stopPropagation()}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="font-semibold">{node.data.title}</div>
        <button type="button" className="text-xs opacity-70" onClick={() => inspectLake(null)}>Close</button>
      </div>
      <p className="mb-2 text-[10px] opacity-60">Synthetic sample rows · no PHI</p>
      {rows.length === 0 ? (
        <p className="text-xs opacity-70">No fixture rows.</p>
      ) : (
        <div className="max-h-56 overflow-auto">
          <table className="w-full text-left text-[10px]">
            <thead>
              <tr className="opacity-60">
                {keysOf(rows).map((k) => <th key={k} className="pr-2 pb-1 font-medium">{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-white/10">
                  {keysOf(rows).map((k) => (
                    <td key={k} className="pr-2 py-1 font-mono">{String((row as Record<string, unknown>)[k] ?? "")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </aside>
  );
}
