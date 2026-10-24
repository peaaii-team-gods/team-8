import { useEffect, useState } from "react";
import { OPEN_CONTRACTS_EVENT } from "../commands/commands";
import { listContracts } from "./contracts";

const CONTRACTS = listContracts();

export default function ContractLibrary() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(CONTRACTS[0]?.id ?? "");
  const selected = CONTRACTS.find((card) => card.id === selectedId) ?? CONTRACTS[0];

  useEffect(() => {
    const open = () => setOpen(true);
    window.addEventListener(OPEN_CONTRACTS_EVENT, open);
    return () => window.removeEventListener(OPEN_CONTRACTS_EVENT, open);
  }, []);

  return (
    <div className="absolute top-4 right-4 z-20" data-testid="contract-library" onClick={(event) => event.stopPropagation()}>
      <button type="button" className="glass px-3 py-1.5 text-xs" onClick={() => setOpen((value) => !value)}>
        Contracts
      </button>
      {open && (
        <aside className="glass mt-2 flex max-h-[70vh] w-[min(380px,70vw)] flex-col gap-2 overflow-y-auto p-3 text-xs">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Schema library</h2>
            <button type="button" className="ml-auto opacity-70" onClick={() => setOpen(false)}>Close</button>
          </div>
          <p className="opacity-70">Registry output contracts. Opening one does not edit an agent, call the API, or start a run.</p>
          {CONTRACTS.length === 0 && <p>No contracts in the registry.</p>}
          <ul className="flex flex-col gap-1">
            {CONTRACTS.map((card) => (
              <li key={card.id}>
                <button
                  type="button"
                  className={`w-full rounded px-2 py-1 text-left ${card.id === selected?.id ? "bg-fuchsia-400/20" : "bg-white/5"}`}
                  onClick={() => setSelectedId(card.id)}
                >
                  <span className="font-semibold">{card.title}</span>
                  <span className="ml-2 font-mono opacity-60">{card.id}</span>
                </button>
              </li>
            ))}
          </ul>
          {selected && (
            <div data-testid="contract-detail">
              <p>{selected.summary}</p>
              <p className="mt-1 opacity-70">Starts on {selected.presets.map((preset) => preset.title).join(", ") || "no preset"}.</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/30 p-2 font-mono text-[10px] leading-relaxed">{selected.json}</pre>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
