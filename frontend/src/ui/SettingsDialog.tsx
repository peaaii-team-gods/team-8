import { useLayoutEffect, useRef } from "react";
import type { InferenceStatus } from "../adapters/inference";
import type { IdentitySession } from "../adapters/identity";
import InferencePanel from "./InferencePanel";

type Props = {
  open: boolean;
  inference: InferenceStatus | null;
  apiBase: string;
  session: IdentitySession;
  tier: "free" | "premium";
  setTier: (tier: "free" | "premium") => void;
  paidConsent: boolean;
  setPaidConsent: (value: boolean) => void;
  spendCap: string;
  setSpendCap: (value: string) => void;
  onStatus: (status: InferenceStatus | null) => void;
  onClose: () => void;
  disabled: boolean;
};

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function SettingsDialog(props: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!props.open) return;
    opener.current = document.activeElement as HTMLElement;
    const first = dialog.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    return () => opener.current?.focus();
  }, [props.open]);

  const close = () => props.onClose();
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => !(el as HTMLInputElement).disabled);
    if (!focusable.length) { event.preventDefault(); return; }
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialog.current?.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.current?.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  };

  return <div hidden={!props.open} data-testid="settings-backdrop" className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={(event) => event.stopPropagation()} onKeyDown={onKeyDown} className="glass w-[min(520px,92vw)] max-h-[85vh] overflow-auto p-5">
      <div className="mb-4 flex items-center justify-between"><h2 id="settings-title" className="text-lg font-semibold">Settings</h2><button type="button" aria-label="Close settings" disabled={props.disabled} onClick={close}>Close</button></div>
      <fieldset className="mb-4 grid gap-2" disabled={props.disabled}>
        <legend className="mb-2 text-sm font-semibold">Inference tier</legend>
        <label><input type="radio" name="inference-tier" value="free" checked={props.tier === "free"} onChange={() => { props.setTier("free"); props.setPaidConsent(false); props.setSpendCap("0"); }} />Free</label>
        <label><input type="radio" name="inference-tier" value="premium" checked={props.tier === "premium"} disabled={!props.inference?.configured} onChange={() => props.setTier("premium")} />Premium{!props.inference?.configured && " — Add your own provider to use Premium"}</label>
      </fieldset>
      {props.tier === "premium" && <div className="grid gap-2">
        <h3 className="text-sm font-semibold">Spend cap</h3>
        <label className="glass block p-3 text-xs"><input type="checkbox" checked={props.paidConsent} disabled={props.disabled} onChange={(event) => props.setPaidConsent(event.target.checked)} />I permit paid inference on this account's configured providers for these runs.</label>
        <label className="glass block p-3 text-xs">USD admission budget per agent run<input aria-label="USD admission budget per agent run" type="number" min="0" step="0.01" value={props.spendCap} disabled={props.disabled} onChange={(event) => props.setSpendCap(event.target.value)} />Each agent submits a separate bounded run. All configured endpoints require a positive admission cap; charges may apply. Dollar accounting is provider-dependent; set a hard spending limit on your provider key. No automatic paid retries.</label>
      </div>}
      <section className="mt-4" aria-label="Provider (optional)"><h3 className="mb-2 text-sm font-semibold">Provider (optional)</h3><InferencePanel apiBase={props.apiBase} session={props.session} onStatus={props.onStatus} disabled={props.disabled} /></section>
    </div>
  </div>;
}
