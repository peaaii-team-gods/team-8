import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InferenceSettings, modelPrice, readOverride, writeOverride, type InferenceConnection, type InferenceModel, type ModelOverride, type ModelTier, type InferenceStatus } from "../adapters/inference";
import type { IdentitySession } from "../adapters/identity";
import InferencePanel from "./InferencePanel";

type Props = {
  open: boolean;
  onModelReady?: (ready: boolean) => void;
  onModelLabel?: (label: string) => void;
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

const FOCUSABLE = 'summary,a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

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

  const [override, setOverride] = useState(readOverride);
  const [connections, setConnections] = useState<InferenceConnection[]>([]);
  const [models, setModels] = useState<InferenceModel[]>([]);
  const [listState, setListState] = useState("loading");
  useEffect(() => {
    let active = true; setModels([]); setConnections([]); setListState("loading");
    if (!props.inference?.configured) { setListState("host"); return; }
    void new InferenceSettings(props.apiBase, props.session).listConnections().then(rows => {
      if (active) setConnections(rows);
    }).catch(() => { if (active) setConnections([]); });
    void new InferenceSettings(props.apiBase, props.session).listModels().then(rows => {
      if (active) { setModels(rows); setListState(rows.length ? "ready" : "empty"); }
    }).catch(() => { if (active) setListState("error"); });
    return () => { active = false; };
  }, [props.apiBase, props.session.token, props.inference?.configured, props.inference?.revision]);
  const selected = props.inference?.configured ? models.find(model => model.id === override.pin?.model_id) : undefined;
  const helperModel = props.inference?.configured ? models.find(model => model.id === override.helper?.model_id) : undefined;
  const helperReady = !override.helper || (!!helperModel && connections.some(connection => connection.id === override.helper?.connection_id));
  const modelLabel = `${selected?.label ?? "Auto"} - ${modelPrice(selected)}`;
  useEffect(() => { props.onModelLabel?.(modelLabel); }, [modelLabel, props.onModelLabel]);
  const save = (next: ModelOverride) => {
    try { writeOverride(next); setOverride(next); props.setPaidConsent(false); }
    catch { setListState("error"); }
  };
  const selectTier = (tier: ModelTier) => {
    save({ ...override, tier }); props.setTier(tier === "free" ? "free" : "premium");
    if (tier === "free") props.setSpendCap("0");
  };
  useEffect(() => { props.onModelReady?.((!props.inference?.configured || !override.pin || !!selected) && helperReady); }, [props.inference?.configured, override.pin, selected, helperReady, props.onModelReady]);
  useEffect(() => {
    if (props.inference && !props.inference.configured && override.pin) save({ ...override, pin: null });
  }, [props.inference?.configured]);
  const close = () => props.onClose();
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); if (!props.disabled) close(); return; }
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => !(el as HTMLInputElement).disabled && (el.tagName === "SUMMARY" || !el.closest("details:not([open])")));
    if (!focusable.length) { event.preventDefault(); return; }
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !dialog.current?.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !dialog.current?.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  };

  return <div hidden={!props.open} data-testid="settings-backdrop" className="fixed inset-0 z-40 flex items-center justify-center bg-black/50" onClick={(event) => { if (event.target === event.currentTarget && !props.disabled) close(); }}>
    <div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="settings-title" onClick={(event) => event.stopPropagation()} onKeyDown={onKeyDown} className="glass w-[min(520px,92vw)] max-h-[85vh] overflow-auto p-5">
      <div className="mb-4 flex items-center justify-between"><h2 id="settings-title" className="text-lg font-semibold">Settings</h2><button type="button" aria-label="Close settings" disabled={props.disabled} onClick={close}>Close</button></div>
      <label>Run model<select aria-label="Run model" disabled={props.disabled} value={selected?.id ?? ""} onChange={event => {
        const model = models.find(row => row.id === event.target.value);
        save({ ...override, pin: model ? { model_id: model.id, is_free: model.is_free } : null });
      }}><option value="">Auto (recommended)</option>{props.inference?.configured && models.map(model => <option key={model.id} value={model.id}>{model.label} - {model.is_free ? "Free" : "Paid"} - {modelPrice(model)}</option>)}</select></label>
      <label>Helper model<select aria-label="Helper model" disabled={props.disabled || !props.inference?.configured || !connections.length} value={helperModel?.id ?? ""} onChange={event => {
        const model = models.find(row => row.id === event.target.value);
        save({ ...override, helper: model ? { model_id: model.id, is_free: model.is_free, connection_id: override.helper?.connection_id ?? connections[0].id } : null });
      }}><option value="">Auto</option>{props.inference?.configured && models.map(model => <option key={model.id} value={model.id}>{model.label} - {model.is_free ? "Free" : "Paid"} - {modelPrice(model)}</option>)}</select></label>
      <label>Helper connection<select aria-label="Helper connection" disabled={props.disabled || !override.helper} value={override.helper?.connection_id ?? connections[0]?.id ?? ""} onChange={event => {
        if (override.helper) save({ ...override, helper: { ...override.helper, connection_id: event.target.value } });
      }}>{connections.map((connection, index) => <option key={connection.id} value={connection.id}>{connection.label || `Connection ${index + 1}`}</option>)}</select></label>
      {!helperReady && <p>Saved helper unavailable. <button type="button" disabled={props.disabled} onClick={() => save({ ...override, helper: null })}>Use Auto</button> before running.</p>}
      {props.inference?.configured && override.pin && !selected && <p>Saved model unavailable. <button type="button" disabled={props.disabled} onClick={() => save({ ...override, pin: null })}>Use Auto</button> before running.</p>}
      {listState === "loading" && <p>Loading models…</p>}
      {listState === "error" && <p>Model list unavailable — Auto only</p>}
      {listState === "empty" && <p>No matching models — Auto only</p>}
      <fieldset className="mb-4 grid gap-2" disabled={props.disabled}>
        <legend className="mb-2 text-sm font-semibold">Inference tier</legend>
        {([["free", "Free"], ["cheaper_slow", "Cheaper slow"], ["cheap_fast", "Cheap fast"], ["premium", "Premium"]] as const).map(([tier, label]) =>
          <label key={tier}><input type="radio" name="inference-tier" value={tier} checked={override.tier === tier} onChange={() => selectTier(tier)} />{label}</label>)}
      </fieldset>
      {props.inference?.configured && <div className="grid gap-2">
        <p>This run may use a paid model ({modelLabel}).</p>
        <h3 className="text-sm font-semibold">Spend cap</h3>
        <label className="glass block p-3 text-xs"><input type="checkbox" checked={props.paidConsent} disabled={props.disabled} onChange={(event) => props.setPaidConsent(event.target.checked)} />I permit paid inference on this account's configured providers for these runs.</label>
        <label className="glass block p-3 text-xs">USD admission budget per agent run<input aria-label="USD admission budget per agent run" type="number" min="0" step="0.01" value={props.spendCap} disabled={props.disabled} onChange={(event) => props.setSpendCap(event.target.value)} />Each agent submits a separate bounded run. All configured endpoints require a positive admission cap; charges may apply. Dollar accounting is provider-dependent; set a hard spending limit on your provider key. No automatic paid retries.</label>
      </div>}
      <details className="mt-4"><summary className="cursor-pointer text-sm font-semibold">Provider connection</summary><InferencePanel apiBase={props.apiBase} session={props.session} onStatus={props.onStatus} disabled={props.disabled} /></details>
    </div>
  </div>;
}
