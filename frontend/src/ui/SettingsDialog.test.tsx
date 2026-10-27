import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import type { InferenceStatus } from "../adapters/inference";
import { IdentitySession } from "../adapters/identity";
import SettingsDialog from "./SettingsDialog";

const configured: InferenceStatus = { configured: true, revision: "r1", credential_lifetime: "backend_process", host_models_authorized: false };
const hostOnly: InferenceStatus = { configured: false, revision: null, credential_lifetime: "backend_process", host_models_authorized: true };
const renderDialog = (inference: InferenceStatus | null, disabled = false) => {
  const setters = { setPaidConsent: vi.fn(), setSpendCap: vi.fn(), onClose: vi.fn(), onStatus: vi.fn() };
  function Harness() {
    const [tier, setTier] = useState<"free" | "premium">("free");
    const [paidConsent, updatePaidConsent] = useState(false);
    const [spendCap, updateSpendCap] = useState("0");
    return <SettingsDialog open inference={inference} apiBase="" session={new IdentitySession("", "")} tier={tier} setTier={setTier}
      paidConsent={paidConsent} setPaidConsent={value => { setters.setPaidConsent(value); updatePaidConsent(value); }}
      spendCap={spendCap} setSpendCap={value => { setters.setSpendCap(value); updateSpendCap(value); }}
      onClose={setters.onClose} onStatus={setters.onStatus} disabled={disabled} />;
  }
  render(<Harness />);
  return setters;
};

afterEach(() => { cleanup(); vi.restoreAllMocks(); localStorage.clear(); });

describe("SettingsDialog", () => {
  it("is a named modal with Free selected and the provider section", () => {
    renderDialog(configured);
    expect(screen.getByRole("dialog", { name: "Settings" }).getAttribute("aria-modal")).toBe("true");
    expect((screen.getByRole("radio", { name: "Free" }) as HTMLInputElement).checked).toBe(true);
    fireEvent.click(screen.getByText("Provider connection"));
    expect(screen.getByRole("region", { name: "Account inference settings" })).toBeTruthy();
  });

  it("shows Premium controls and resets them when Free is selected", () => {
    const setters = renderDialog(configured);
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    expect(screen.getByLabelText("USD admission budget per agent run")).toBeTruthy();
    expect(screen.getByLabelText(/I permit paid inference/)).toBeTruthy();
    fireEvent.click(screen.getByRole("radio", { name: "Free" }));
    expect(screen.getByLabelText("USD admission budget per agent run")).toBeTruthy();
    expect(setters.setPaidConsent).toHaveBeenCalledWith(false);
    expect(setters.setSpendCap).toHaveBeenCalledWith("0");
    expect(document.querySelector('[value="0.01"]')).toBeNull();
  });

  it.each([hostOnly, { ...hostOnly, host_models_authorized: false }, null])("allows the saved tier selector without enabling host pins", (status) => {
    renderDialog(status);
    expect((screen.getByRole("radio", { name: "Premium" }) as HTMLInputElement).disabled).toBe(false);
  });

  it("closes from Escape, the close button and the backdrop", () => {
    const setters = renderDialog(configured);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: "Close settings" }));
    fireEvent.click(screen.getByTestId("settings-backdrop"));
    expect(setters.onClose).toHaveBeenCalledTimes(3);
  });

  it("stays open when Escape is pressed while a run disables the close button", () => {
    const setters = renderDialog(configured, true);
    expect((screen.getByRole("button", { name: "Close settings" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(setters.onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeTruthy();
  });

  it("does not close from the backdrop while disabled", () => {
    const setters = renderDialog(configured, true);
    fireEvent.click(screen.getByTestId("settings-backdrop"));
    expect(setters.onClose).not.toHaveBeenCalled();
  });

  it("closes from the backdrop while enabled", () => {
    const setters = renderDialog(configured);
    fireEvent.click(screen.getByTestId("settings-backdrop"));
    expect(setters.onClose).toHaveBeenCalledTimes(1);
  });

  it("wraps Tab in both directions and skips disabled controls", async () => {
    renderDialog(null);
    const close = screen.getByRole("button", { name: "Close settings" });
    fireEvent.click(screen.getByText("Provider connection"));
    await waitFor(() => expect((screen.getByLabelText("Primary API key") as HTMLInputElement).disabled).toBe(false));
    const dialog = screen.getByRole("dialog");
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('summary,a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'));
    const enabled = focusable.filter(element => !(element as HTMLInputElement).disabled);
    enabled[enabled.length - 1].focus();
    fireEvent.keyDown(enabled[enabled.length - 1], { key: "Tab" });
    expect(document.activeElement).toBe(close);
    close.focus();
    fireEvent.keyDown(close, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(enabled[enabled.length - 1]);
    expect(enabled).toContain(screen.getByRole("radio", { name: /Premium/ }));
  });
});

 describe("catalog model picker", () => {
   afterEach(() => { localStorage.clear(); vi.unstubAllGlobals(); });
   const model = {id:"paid/model",label:"Paid reasoning",provider:"openrouter",is_free:false,price_in_per_m:1,price_out_per_m:2,context:1000,tool_capable:true,band:"premium"};
   const respond = (models:unknown[], status=200) => vi.stubGlobal("fetch", vi.fn(async (url:string) => new Response(JSON.stringify(url.endsWith("/models") ? {models} : configured), {status:url.endsWith("/models") ? status : 200})));
   it("loads Auto first, prices and tier, and persists only the approved choice", async () => {
     respond([{...model,id:"free",label:"Free reasoning",is_free:true,price_in_per_m:0,price_out_per_m:0},model]);
     renderDialog(configured);
     const picker = await screen.findByRole("combobox", {name:"Run model"}) as HTMLSelectElement;
     await within(picker).findByRole("option", {name:"Paid reasoning - Paid - $1 in / $2 out per M"});
     expect(picker.options[0].text).toBe("Auto (recommended)");
     expect(within(picker).getByRole("option", {name:"Free reasoning - Free - $0 in / $0 out per M"})).toBeTruthy();
     fireEvent.change(picker,{target:{value:model.id}});
     fireEvent.click(screen.getByRole("radio",{name:"Cheaper slow"}));
     expect(JSON.parse(localStorage.getItem("crucible.modelOverride.v1")!)).toEqual({v:1,tier:"cheaper_slow",pin:{model_id:model.id,is_free:false},helper:null});
     expect(screen.getByText("This run may use a paid model (Paid reasoning - $1 in / $2 out per M).")).toBeTruthy();
     expect(document.querySelector('input[aria-label="Primary model"]')).toBeNull();
   });
   it("shows loading with only Auto selectable", async () => {
     vi.stubGlobal("fetch", vi.fn((url:string)=>url.endsWith("/models") ? new Promise(()=>{}) : Promise.resolve(new Response(JSON.stringify(configured)))));
     renderDialog(configured);
     expect(screen.getByText("Loading models" + String.fromCharCode(8230))).toBeTruthy();
     expect((screen.getByRole("combobox",{name:"Run model"}) as HTMLSelectElement).options).toHaveLength(1);
   });
   it.each([[503,"Model list unavailable"],[200,"No matching models"]])("fails to Auto only for %s", async (status,text) => {
     respond([],status);renderDialog(configured);
     await screen.findByText(new RegExp(text));
     expect((screen.getByRole("combobox",{name:"Run model"}) as HTMLSelectElement).options).toHaveLength(1);
   });
   it("keeps host users on Auto even when catalog models and an old pin exist", async () => {
     respond([model]); localStorage.setItem("crucible.modelOverride.v1",JSON.stringify({v:1,tier:"premium",pin:{model_id:model.id,is_free:false}}));
     renderDialog(hostOnly);
     expect((screen.getByRole("combobox",{name:"Run model"}) as HTMLSelectElement).options).toHaveLength(1);
     expect((screen.getByRole("combobox",{name:"Run model"}) as HTMLSelectElement).value).toBe("");
   });
 });

it("restores a saved tier and pin across remounts with unknown prices explicit", async () => {
 const model={id:"saved",label:"Saved model",provider:"openrouter",is_free:true,price_in_per_m:null,price_out_per_m:null,context:null,tool_capable:true,band:null};
 vi.stubGlobal("fetch",vi.fn(async (url:string)=>new Response(JSON.stringify(url.endsWith("/models") ? {models:[model]} : configured))));
 localStorage.setItem("crucible.modelOverride.v1",JSON.stringify({v:1,tier:"cheap_fast",pin:{model_id:model.id,is_free:true}}));
 renderDialog(configured);
 await within(screen.getByRole("combobox",{name:"Run model"})).findByRole("option",{name:"Saved model - Free - unknown in / unknown out per M"});
 expect((screen.getByRole("combobox",{name:"Run model"}) as HTMLSelectElement).value).toBe("saved");
 expect((screen.getByRole("radio",{name:"Cheap fast"}) as HTMLInputElement).checked).toBe(true);
 cleanup();renderDialog(configured);
 await within(screen.getByRole("combobox",{name:"Run model"})).findByRole("option",{name:/Saved model - Free/});
 expect((screen.getByRole("combobox",{name:"Run model"}) as HTMLSelectElement).value).toBe("saved");
 vi.unstubAllGlobals();
});

it("includes the collapsed provider summary in the focus trap and skips its fields", async () => {
 renderDialog(configured);
 const summary=screen.getByText("Provider connection");
 expect(summary.closest("details")?.open).toBe(false);
 const close=screen.getByRole("button",{name:"Close settings"});
 close.focus();fireEvent.keyDown(close,{key:"Tab",shiftKey:true});
 expect(document.activeElement).toBe(summary);
 fireEvent.keyDown(summary,{key:"Tab"});expect(document.activeElement).toBe(close);
 expect(document.activeElement).not.toBe(screen.getByLabelText("Primary API key"));
});

describe("helper model picker",()=>{
 afterEach(()=>vi.unstubAllGlobals());
 const helper={connection_id:"b".repeat(32),model_id:"repair",is_free:true};
 const model={id:"repair",label:"Repair",provider:"openrouter",is_free:true,price_in_per_m:0,price_out_per_m:0,context:null,tool_capable:true,band:"free"};
 const setup=(models:unknown[]=[model],connections:unknown[]=[{id:"a".repeat(32)},{id:"b".repeat(32)}])=>vi.stubGlobal("fetch",vi.fn(async(url:string)=>new Response(JSON.stringify(url.endsWith("models")?{models}:url.endsWith("inference-connections")?{connections}:configured))));
 it("saves a helper on the second connection and resets it to Auto",async()=>{
  setup();const setters=renderDialog(configured);
  const picker=screen.getByRole("combobox",{name:"Helper model"});
  await within(picker).findByRole("option",{name:/Repair - Free/});
  fireEvent.change(picker,{target:{value:"repair"}});
  fireEvent.change(screen.getByRole("combobox",{name:"Helper connection"}),{target:{value:helper.connection_id}});
  expect(JSON.parse(localStorage.getItem("crucible.modelOverride.v1")!).helper).toEqual(helper);
  expect(setters.setPaidConsent).toHaveBeenLastCalledWith(false);
  fireEvent.change(picker,{target:{value:""}});expect(JSON.parse(localStorage.getItem("crucible.modelOverride.v1")!).helper).toBeNull();
 });
 it.each(["model","connection"])("blocks an unavailable saved helper %s until Auto",async missing=>{
  setup(missing==="model"?[]:[model],missing==="connection"?[]:[{id:helper.connection_id}]);
  localStorage.setItem("crucible.modelOverride.v1",JSON.stringify({v:1,tier:"free",pin:null,helper}));
  const ready=vi.fn();
  render(<SettingsDialog open inference={configured} apiBase="" session={new IdentitySession("")} tier="free" setTier={vi.fn()} paidConsent={false} setPaidConsent={vi.fn()} spendCap="0" setSpendCap={vi.fn()} onClose={vi.fn()} onStatus={vi.fn()} disabled={false} onModelReady={ready}/>);
  await screen.findByText(/Saved helper unavailable/);await waitFor(()=>expect(ready).toHaveBeenLastCalledWith(false));
  fireEvent.click(screen.getByRole("button",{name:"Use Auto"}));await waitFor(()=>expect(ready).toHaveBeenLastCalledWith(true));
 });
});
