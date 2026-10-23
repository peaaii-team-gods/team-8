import { useState } from "react";
import { ChevronDown, FileCode2 } from "lucide-react";
import { useStore } from "../state/store";

const KIND: Record<string, { text: string; mark: string }> = {
  added: { text: "text-emerald-300", mark: "+" },
  changed: { text: "text-amber-300", mark: "~" },
  removed: { text: "text-rose-300", mark: "−" },
};

export default function WorkspacePanel() {
  const { workspace, nodes, totals } = useStore();
  const [open, setOpen] = useState(true);
  const title = (id?: string) => nodes.find((n) => n.id === id)?.data.title ?? id;
  const counts = {
    added: workspace.filter((f) => f.kind === "added").length,
    changed: workspace.filter((f) => f.kind === "changed").length,
    removed: workspace.filter((f) => f.kind === "removed").length,
  };
  return (
    <aside className="glass p-4 text-sm w-full max-h-[46vh] flex flex-col" data-testid="workspace-panel">
      <button type="button" className="flex items-center gap-2 font-semibold w-full text-left" onClick={() => setOpen((v) => !v)}>
        <FileCode2 size={14} className="text-emerald-300" /> Artifacts {totals.source === "live" ? "" : "(simulated)"}
        <ChevronDown size={14} className={`ml-auto opacity-60 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <>
        <div className="my-2 flex gap-2 text-[10px]">
          <span className="text-emerald-300">+{counts.added} added</span>
          <span className="text-amber-300">~{counts.changed} changed</span>
          <span className="text-rose-300">−{counts.removed} removed</span>
        </div>
        <p className="mb-2 text-[10px] opacity-60">
          {totals.source === "live"
            ? "Paths reported by this session’s run events and workspace listings."
            : "Simulated artifact paths only — models do not write code. Live runs list files the API returns."}
        </p>
        {workspace.length === 0 ? (
          <p className="text-xs opacity-70">Nothing written yet.</p>
        ) : (
          <ul className="text-xs space-y-1.5 overflow-auto">
            {workspace.map((f) => {
              const kind = KIND[f.kind] ?? KIND.changed;
              return (
                <li key={`${f.kind}-${f.path}`} className="flex gap-2 items-start" data-testid="workspace-file">
                  <span className={`font-mono w-3 shrink-0 ${kind.text}`}>{kind.mark}</span>
                  <span className="min-w-0">
                    <span className="font-mono break-all block">{f.path}</span>
                    <span className={`uppercase tracking-wide text-[10px] ${kind.text}`}>
                      {f.kind}{f.agentId ? ` · ${title(f.agentId)}` : ""}{f.summary ? ` — ${f.summary}` : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </>}
    </aside>
  );
}
