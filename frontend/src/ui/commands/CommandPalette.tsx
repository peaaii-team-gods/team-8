import { useEffect, useMemo, useState } from "react";
import { fuzzyMatch, type Command } from "./commands";

export function CheatSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div role="dialog" aria-label="Shortcuts" data-testid="cheat-sheet" className="glass w-full max-w-sm p-4 text-sm" onClick={(event) => event.stopPropagation()}>
        <h2 className="font-semibold">Shortcuts</h2>
        <ul className="mt-2 space-y-1 text-xs opacity-80">
          <li>Ctrl+K or ⌘K — command palette</li>
          <li>Ctrl+Enter — Run when a link exists</li>
          <li>? — this list</li>
          <li>Tour button or palette — welcome tour</li>
          <li>Esc — close</li>
        </ul>
        <p className="mt-2 text-[10px] opacity-60">Shortcuts stay quiet while a text field is focused. They do not sign in or call the API.</p>
        <button type="button" className="mt-3 text-xs opacity-70" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function CommandPalette({ commands, onClose }: { commands: Command[]; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const matches = useMemo(
    () => commands.filter((command) => fuzzyMatch(query, command.title)),
    [commands, query],
  );
  const current = matches[Math.min(active, Math.max(matches.length - 1, 0))];

  useEffect(() => { setActive(0); }, [query]);

  const choose = (command: Command | undefined) => {
    if (!command?.enabled) return;
    command.run();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh]" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Commands"
        data-testid="command-palette"
        className="glass w-full max-w-md p-3 text-sm"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          autoFocus
          aria-label="Find a command"
          className="glass w-full bg-transparent px-3 py-2"
          placeholder="Load Pilot storyboard"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              onClose();
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => Math.min(index + 1, matches.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter") {
              event.preventDefault();
              choose(current);
            }
          }}
        />
        <ul className="mt-2 max-h-64 overflow-y-auto" role="listbox" aria-label="Matching commands">
          {matches.length === 0 && <li className="px-2 py-1 opacity-60">No matching command.</li>}
          {matches.map((command, index) => (
            <li key={command.id}>
              <button
                type="button"
                role="option"
                aria-selected={index === active}
                disabled={!command.enabled}
                className={`flex w-full items-center justify-between px-2 py-1.5 text-left disabled:opacity-40 ${index === active ? "bg-fuchsia-400/20" : ""}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => choose(command)}
              >
                <span>{command.title}</span>
                {command.reason && <span className="text-[10px] opacity-60">{command.reason}</span>}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] opacity-60">Ctrl+K palette · Ctrl+Enter Run · ? shortcuts</p>
      </div>
    </div>
  );
}
