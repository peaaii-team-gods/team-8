import SyntheticBadge from "./SyntheticBadge";

interface Props {
  mode: "simulated" | "live";
  username: string | null;
  signedIn: boolean;
  busy: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  onClear: () => void;
  onPilot: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function UserBar({ mode, username, signedIn, busy, onSignIn, onSignOut, onClear, onPilot, onExport, onImport }: Props) {
  return (
    <header
      className="flex h-12 shrink-0 items-center gap-3 overflow-x-auto border-b border-white/10 bg-[#070312]/90 px-3 text-xs"
      data-testid="user-bar"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="font-display text-sm text-fuchsia-100">Team 8</span>
      <SyntheticBadge />
      <span data-testid="mode-label">Mode: {mode}{mode === "live" && !signedIn ? " — sign in required" : ""}</span>
      <span className="ml-auto flex items-center gap-2">
        {mode === "live" && signedIn && <span data-testid="user-name">{username ?? "Signed in"}</span>}
        {mode === "live" && !signedIn && (
          <button type="button" className="glass px-2 py-1" onClick={onSignIn}>Sign in</button>
        )}
        {mode === "live" && signedIn && (
          <button type="button" className="glass px-2 py-1" onClick={onSignOut}>Sign out</button>
        )}
        <button type="button" className="glass px-2 py-1 disabled:opacity-50" disabled={busy} onClick={onClear}>Clear canvas</button>
        <button type="button" className="glass px-2 py-1 disabled:opacity-50" disabled={busy} onClick={onPilot}>Load Pilot storyboard</button>
        <button type="button" className="glass px-2 py-1 disabled:opacity-50" disabled={busy} onClick={onExport}>Export snapshot</button>
        <label className={`glass px-2 py-1 ${busy ? "pointer-events-none opacity-50" : "cursor-pointer"}`}>
          Import snapshot
          <input
            data-testid="snapshot-file"
            className="hidden"
            type="file"
            accept="application/json,.json"
            disabled={busy}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) onImport(file);
            }}
          />
        </label>
      </span>
    </header>
  );
}
