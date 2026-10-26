import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup, within } from "@testing-library/react";
import App from "./App";
import { ToastProvider } from "./ui/toasts/ToastProvider";
import { nextId, useStore, type CanvasNode } from "./state/store";
import { agentPreset } from "./registry/agentPresets";
import { dataLakePreset } from "./registry/dataLakePresets";
import { defaultSchemaText } from "./registry/schemas";
import { emptyUsage } from "./run/telemetry";
import { newSessionId } from "./run/telemetryEvents";
import { SimulatedAdapter } from "./adapters/simulated";
import { IdentitySession } from "./adapters/identity";
import { InferenceSettings } from "./adapters/inference";
import { LiveAdapter } from "./adapters/live";
import type { RunOutcome } from "./adapters/RhmAdapter";
import type { InferenceStatus } from "./adapters/inference";
import { MRF_GOLDEN_MAPPING } from "./mrf/data";
// @ts-ignore -- test-only Node builtin; fixture is the exact public GET captured from a real run.
import { readFileSync } from "node:fs";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

// jsdom has no layout engine. React Flow asks for these on mount, so stub them.
// This is a DOM-level smoke test, not a real browser drive.
class RO { observe() {} unobserve() {} disconnect() {} }
vi.stubGlobal("ResizeObserver", RO);
if (!window.DOMMatrixReadOnly) {
  vi.stubGlobal("DOMMatrixReadOnly", class { m22 = 1; });
}
window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} })) as never;

const renderApp = () => render(<ToastProvider><App /></ToastProvider>);

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  useStore.setState({
  nodes: [], edges: [], uiState: { kind: "void" },
  tracks: [], messages: [], workspace: [], totals: emptyUsage(),
  scenarioId: null, pipelineStage: "idle", runStartedAt: null, runEndedAt: null,
  sessionId: newSessionId(), telemetryEvents: [], scienceReceipt: null, inspectedLakeId: null,
  mrfSource: "base" as const, mrfMapping: null,
  selectedWorkspaceId: null, activity: [], statusHint: null,
});
});

describe("App simulated smoke (jsdom DOM-level, not a real browser)", () => {
  it('lists only the five core pipeline nodes in Create, in pipeline order', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Enter canvas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    const picker = screen.getByRole('heading', { name: 'Create' }).parentElement!;
    const corePresets = within(picker).getByRole('group', { name: 'Core pipeline presets' });
    expect(within(corePresets).getAllByRole('button').map((button) => button.firstChild?.textContent)).toEqual([
      'Scout', 'Architect', 'Refinery', 'Ledger', 'Analyst',
    ]);
    expect(within(picker).queryByText('Coding Service MCP')).toBeNull();
    expect(within(picker).queryByText('Knowledge Base MCP')).toBeNull();
    expect(within(picker).queryByText('Hosted Shell MCP')).toBeNull();
    const first = within(picker).getAllByRole('button')[0];
    expect(first.getAttribute('aria-label')).toBe('Hospital source to SQL');
    expect(within(picker).getAllByRole('button', { name: 'Hospital source to SQL' })).toHaveLength(1);
    fireEvent.click(first);
    expect(useStore.getState().scenarioId).toBe('hospital-pipeline');
  });

  it('appends two hospital runs without duplicate done entries after Run ended', async () => {
    const record = JSON.parse(readFileSync('src/ui/fixtures/hospital-run.real.json', 'utf8'));
    let submitted = 0;
    vi.stubGlobal('fetch', async (url: string) => url.endsWith('/artifacts/report.md')
      ? new Response(readFileSync('../fixtures/hospital-full-report.md', 'utf8'))
      : new Response(JSON.stringify(url.endsWith('/run') ? { run_id: `run-${++submitted}` } : record)));
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Run MRF demo' }));
    for (let run = 1; run <= 2; run++) {
      fireEvent.click(screen.getByRole('button', { name: 'Run hospital pipeline' }));
      await waitFor(() => expect(useStore.getState().activity.filter(item => item.kind === 'run-end')).toHaveLength(run));
      const activity = useStore.getState().activity;
      expect(activity.filter(item => item.kind === 'run-start')).toHaveLength(run);
      for (const title of ['Scout', 'Architect', 'Refinery', 'Ledger', 'Analyst']) {
        expect(activity.filter(item => item.title === `${title} done`)).toHaveLength(run);
      }
      const end = activity.map(item => item.kind).lastIndexOf('run-end');
      expect(activity.slice(end + 1).some(item => item.kind === 'agent-done')).toBe(false);
    }
    expect(submitted).toBe(2);
  });

  it("opens Hospital source to SQL directly from the landing MRF button", () => {
    renderApp();
    const landing = screen.getByTestId('landing-page');
    expect(landing.textContent).toContain('Scout → Architect → Refinery → Ledger → Analyst');
    expect(landing.textContent).not.toMatch(/SYNTHETIC|birds propose|16\/2\/14|synthetic lab panels/);
    fireEvent.click(screen.getByRole('button', { name: 'Run MRF demo' }));
    expect(useStore.getState().scenarioId).toBe('hospital-pipeline');
    expect(useStore.getState().nodes).toHaveLength(5);
    expect(screen.getByRole('button', { name: 'Run hospital pipeline' })).toBeTruthy();
    expect(screen.queryByTestId('history-panel')).toBeNull();
    expect(screen.queryByText(/SYNTHETIC/)).toBeNull();
    expect(useStore.getState().runStartedAt).toBeNull();
  });

  it("never labels a captured pipeline node Golden when the source fingerprint differs", async () => {
    const record = JSON.parse(readFileSync('src/ui/fixtures/hospital-run.real.json', 'utf8'));
    record.steps[0].telemetry.find((event: { type: string }) => event.type === 'trace').sha256 = 'another-file';
    vi.stubGlobal('fetch', async (url: string) => url.endsWith('/artifacts/report.md')
      ? new Response(readFileSync('../fixtures/hospital-full-report.md', 'utf8'))
      : new Response(JSON.stringify(url.endsWith('/run') ? { run_id: 'run-other' } : record)));
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hospital source to SQL' }));
    fireEvent.click(screen.getByRole('button', { name: 'Run hospital pipeline' }));
    await screen.findByText('No golden for this file');
    const furnace = useStore.getState().nodes.find(node => node.data.presetId === 'mrf-hospital-maintainer')!;
    await waitFor(() => expect(screen.getByTestId(`node-${furnace.id}`).textContent).toContain('Self-consistency repair: 127887/127887'));
    expect(screen.queryByText(/Golden repair|golden path|matches golden|differs from golden/)).toBeNull();
  });

  it("shows the hospital's presentation labels and keeps unavailable capabilities in a closed disclosure", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Hospital source to SQL" }));

    const expected: Array<[string, string]> = [
      ["Scout", "Research agent finds data sources and passes verified URLs to the next agent"],
      ["Architect", "Data engineer ingests raw. Outputs a streaming data pipe and a target schema contract"],
      ["Refinery", "Transforms and cleans data. Outputs perfectly clean, validated, normalized JSON objects"],
      ["Ledger", "Connects to database MCPs or other data storage locations. Outputs a fully searchable, structured relational database"],
      ["Analyst", "Finds data patterns through plaintext queries. Outputs Clean Markdown reports, delivered directly in the UI"],
    ];
    for (const [title, description] of expected) {
      expect(await screen.findByText(title, { selector: ".react-flow__node .font-semibold" })).toBeTruthy();
      expect(screen.getByText(description)).toBeTruthy();
    }
    expect(screen.queryByText("Mode: simulated")).toBeNull();
    expect(screen.getByText("Pipeline: local server · Model: recorded path")).toBeTruthy();
    const unavailable = await screen.findAllByText("unavailable");
    expect(unavailable.length).toBeGreaterThan(0);
    expect(unavailable.every(chip => chip.closest("details") && !chip.closest("details")!.open)).toBe(true);
    expect(document.querySelector(".react-flow__attribution")).toBeTruthy();
    const css = readFileSync("src/index.css", "utf8");
    expect(css).toMatch(/\.react-flow__attribution\s*\{[^}]*background:\s*rgba\(7,\s*3,\s*18,/s);
  });

  it("shows the recorded-path readiness line in simulated hospital mode", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Hospital source to SQL" }));
    const summary = await screen.findByTestId("hospital-readiness-summary");
    expect(summary.textContent).toBe("RHM live stack: not connected - recorded path used");
  });

  it("renders every actual captured pipeline node, opens the complete SQL report, and exports only on click", async () => {
    const requests: { url: string; init?: RequestInit }[] = [];
    const realRun = JSON.parse(readFileSync("src/ui/fixtures/hospital-run.real.json", "utf8"));
    const reportMd = readFileSync("../fixtures/hospital-full-report.md", "utf8");
    vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
      requests.push({ url, init });
      if (url.includes("/artifacts/report.md")) return new Response(reportMd, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
      const value = url.endsWith("/export") ? { status: "unavailable", reason: "drive_export_unavailable" } : url.endsWith("/run") ? { run_id: "run-node" } : realRun;
      return new Response(JSON.stringify(value), { headers: { "Content-Type": "application/json" } });
    });
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Hospital source to SQL" }));
    const storage = useStore.getState().nodes.find(node => node.data.presetId === "hospital-store")!;
    const storageNode = () => screen.getByTestId(`node-${storage.id}`);
    expect(within(storageNode()).queryByText("Export to Google Drive (direct API, not MCP)", { selector: "button" })).toBeNull();
    const injector = screen.getByRole("checkbox");
    expect((injector as HTMLInputElement).checked).toBe(false);
    fireEvent.click(injector);
    fireEvent.click(screen.getByRole("button", { name: "Run hospital pipeline" }));
    // React Flow hides unmeasured nodes in jsdom; inspect the actual button DOM.
    const exportButton = await waitFor(() => within(storageNode()).getByText("Export to Google Drive (direct API, not MCP)", { selector: "button" }));
    expect(JSON.parse(requests.find(request => request.url.endsWith("/run"))!.init!.body as string)).toEqual({ source: "south-shore", inject_error: true });
    const source = useStore.getState().nodes.find(node => node.data.presetId === "hospital-source")!;
    const sourceNode = screen.getByTestId(`node-${source.id}`);
    const cmsUrl = "https://www.southshorehealth.org/cms-hpt.txt";
    const mrfUrl = "https://zencloud-southshorehealth.s3.us-east-1.amazonaws.com/www.southshorehealth.org/assets/2026-03/042769210_south-shore-hospital_standardcharges.json";
    expect(sourceNode.textContent).toContain(cmsUrl);
    expect(sourceNode.textContent).toContain(mrfUrl);
    expect(sourceNode.textContent!.indexOf(cmsUrl)).toBeLessThan(sourceNode.textContent!.indexOf(mrfUrl));
    expect(sourceNode.textContent).toContain("374 bytes");
    expect(sourceNode.textContent).toContain("36771540 bytes");
    expect(sourceNode.textContent).toContain("MRF SHA-256: 0ba485a4");
    expect(sourceNode.textContent!.match(/MRF SHA-256:/g)).toHaveLength(1);
    expect(within(storageNode()).getByText("183335 rows - local SQLite")).toBeTruthy();
    expect(screen.queryByTestId('workspace-panel')).toBeNull();
    for (const name of ['rows.csv', 'report.csv', 'mrf.sqlite', 'report.md']) {
      expect(screen.getByRole('link', { name })).toBeTruthy();
    }
    const metrics = screen.getByTestId('metrics-panel');
    expect(metrics.textContent).not.toMatch(/Repairs applied|QC pass|Drift/);
    expect(within(metrics).getByText('Local pipeline')).toBeTruthy();
    expect(within(metrics).getAllByText('Complete · checked locally')).toHaveLength(2);
    expect(metrics.textContent).not.toMatch(/agent_reported|Complete · proposal/);
    expect(useStore.getState().activity.some(item => item.title === 'Stage Complete · checked locally')).toBe(true);
    expect(requests.some(request => request.url.endsWith("/export"))).toBe(false);
    fireEvent.click(exportButton);
    const driveNote = await waitFor(() => within(storageNode()).getByText("Drive not configured"));
    expect(driveNote.className).toContain("text-white/80");
    expect(within(storageNode()).queryByRole("alert")).toBeNull();
    expect(requests.find(request => request.url.endsWith("/export"))?.init?.body).toBeUndefined();
    const analyst = useStore.getState().nodes.find(node => node.data.presetId === "hospital-analyst")!;
    const analystElement = screen.getByTestId(`node-${analyst.id}`);
    const analystNode = within(analystElement);
    expect(analystElement.textContent).toContain("Analyst");
    expect(analystElement.textContent).toContain("Finds data patterns through plaintext queries.");
    expect(analystNode.getByText("model unavailable, recorded path used")).toBeTruthy();
    const openReportButton = [...analystElement.querySelectorAll("button")].find(button => button.textContent?.includes("Open full report"))!;
    fireEvent.click(openReportButton);
    const dialog = analystElement.querySelector("dialog") as HTMLDialogElement;
    expect(dialog.querySelector('h2')?.textContent).toBe('Hospital rate comparison');
    expect(dialog.open).toBe(true);
    const reportTable = dialog.querySelector('[data-testid="hospital-report-table"]') as HTMLTableElement;
    expect([...reportTable.querySelectorAll("thead th")].map(header => header.textContent)).toEqual(["Code", "Type", "Class", "Description", "Commercial median", "MA median", "Difference", "Ratio", "n commercial", "n MA", "Gross", "Cash", "Min", "Max"]);
    expect(reportTable.querySelectorAll("tbody tr")).toHaveLength(25);
    expect(dialog.className).toContain("m-auto");
    expect(reportTable.className).toContain("text-sm");
    expect(dialog.textContent).toContain("Small-n medians (some groups contain one plan) are indicative only.");
    expect(dialog.textContent).toContain("Percent/algorithm prices are stored as percent_rate/algorithm and never converted into dollar rates.");
    expect(dialog.textContent).toContain("Non-dollar payer entries stored with a null rate (excluded from medians): 29340.");
    expect(dialog.textContent).toContain("Quarantined rows: 0.");
    expect(dialog.textContent).toContain("Codes with commercial and MA medians");
    expect(dialog.textContent).toContain("Per-payer spread (dollar rates)");
    const furnace = useStore.getState().nodes.find(node => node.data.presetId === "mrf-hospital-maintainer")!;
    const furnaceNode = within(screen.getByTestId(`node-${furnace.id}`));
    const errorLine = furnaceNode.getByText("Injected error: fields.rate expected standard_charge_dollar, got missing");
    const repairLine = furnaceNode.getByText("Golden repair: 127887/127887 dollar rates restored");
    expect(errorLine.className).toContain("text-rose-200");
    expect(repairLine.className).toContain("text-emerald-200");
    expect(Boolean(errorLine.compareDocumentPosition(repairLine) & Node.DOCUMENT_POSITION_FOLLOWING)).toBe(true);
  });

  it("declares a valid SVG favicon in the page head", () => {
    const page = new DOMParser().parseFromString(readFileSync("index.html", "utf8"), "text/html");
    expect(page.head.querySelector('link[rel="icon"]')?.getAttribute("href")).toBe("/favicon.svg");
    const icon = new DOMParser().parseFromString(readFileSync("public/favicon.svg", "utf8"), "image/svg+xml");
    expect(icon.documentElement.localName).toBe("svg");
    expect(icon.documentElement.namespaceURI).toBe("http://www.w3.org/2000/svg");
  });

  it("loads the hospital canvas with public-source labels and its separate local run button", async () => {
    const modelRun = vi.spyOn(SimulatedAdapter.prototype, "run");
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Hospital source to SQL" }));
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("hospital-pipeline"));
    expect(screen.getByRole("button", { name: "Run hospital pipeline" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Run pipeline" })).toBeNull();
    expect(screen.queryByTestId("synthetic-badge")).toBeNull();
    const source = useStore.getState().nodes.find(node => node.data.presetId === "hospital-source")!;
    fireEvent.doubleClick(screen.getByTestId(`node-${source.id}`));
    expect(screen.getByText("Public hospital source · see the pipeline run trace")).toBeTruthy();
    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true });
    expect(modelRun).not.toHaveBeenCalled();
  });

  it("keeps a normal load on the landing page", () => {
    renderApp();
    expect(screen.getByTestId("landing-page")).toBeTruthy();
    expect(screen.queryByTestId("toast")).toBeNull();
    expect(screen.queryByTestId("demo-banner")).toBeNull();
    expect(useStore.getState().nodes).toEqual([]);
  });

  it("opens the pilot from ?demo=1 without a run and returns to the landing page", async () => {
    window.history.replaceState({}, "", "/?demo=1");
    renderApp();
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("pilot-storyboard"));
    expect(useStore.getState().nodes.length).toBeGreaterThan(0);
    expect(useStore.getState().pipelineStage).toBe("idle");
    expect(screen.queryByTestId("landing-page")).toBeNull();
    expect(screen.getByTestId("demo-banner").textContent).toMatch(/Demo mode · Synthetic · no PHI/);
    expect(screen.getByTestId("demo-banner").textContent).toMatch(/Propose/);
    expect(screen.getByRole("button", { name: "Create" })).toBeTruthy();
    expect(screen.getByRole("button", { name: /run pipeline/i })).toBeTruthy();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Exit demo" }));
    expect(screen.getByTestId("landing-page")).toBeTruthy();
    expect(window.location.search).not.toMatch(/demo/);
    expect(useStore.getState().nodes).toEqual([]);
  });

  it("does not call identity while demo mode is on", async () => {
    window.history.replaceState({}, "", "/?demo=1&scenario=assay-qc");
    vi.stubEnv("VITE_RHM_MODE", "live");
    const restore = vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(false);
    renderApp();
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("assay-qc"));
    expect(restore).not.toHaveBeenCalled();
    expect(screen.getByTestId("mode-label").textContent).toMatch(/simulated/);
  });

  it("loads the pilot from the command palette and ignores the shortcut while typing", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    const field = document.createElement("textarea");
    document.body.appendChild(field);
    field.focus();
    fireEvent.keyDown(field, { key: "k", ctrlKey: true });
    expect(screen.queryByTestId("command-palette")).toBeNull();
    field.remove();

    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const box = await screen.findByLabelText("Find a command");
    fireEvent.change(box, { target: { value: "pilot" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("pilot-storyboard"));
    expect(useStore.getState().edges.length).toBeGreaterThan(0);
    expect(screen.queryByTestId("command-palette")).toBeNull();
    expect(localStorage.length).toBe(0);

    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true });
    await waitFor(() => expect(useStore.getState().pipelineStage).not.toBe("idle"));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("complete"));
  });

  it("keeps the pilot a proposal and emits only one real terminal event per agent", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilot storyboard/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("complete"));
    fireEvent.click(screen.getByRole("button", { name: "Outputs" }));
    expect(screen.getByTestId("output-inspector").textContent).toMatch(/not verification/);
    expect(screen.getByTestId("output-left").textContent).toMatch(/reading_column/);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(useStore.getState().telemetryEvents).toHaveLength(2);
    expect(useStore.getState().telemetryEvents.every((e) => e.status === "succeeded" && e.completion_basis === "agent_reported")).toBe(true);
    expect(useStore.getState().nodes.filter((n) => n.data.kind === "agent").every((n) => n.data.verification === "proposal")).toBe(true);
    expect(screen.getByTestId("stage-strip")).toBeTruthy();
    expect(screen.getByTestId("verified-badge").textContent).toBe("Verified");
    const activity = screen.getByTestId("activity-panel").textContent ?? "";
    expect(activity).toMatch(/Loaded Pilot storyboard/);
    expect(activity).toMatch(/Run started/);
    expect(activity).toMatch(/done/);
    expect(activity).toMatch(/Complete/);
    expect(activity).toMatch(/Fixture check passed/);
    expect(activity).not.toMatch(/reading_column/);
    expect(screen.getByRole("button", { name: /Download session JSON/ })).toBeTruthy();
  });

  it("reports a failed pilot honestly", async () => {
    vi.spyOn(SimulatedAdapter.prototype, "poll").mockImplementation(async (h) => ({ nodeId: h.nodeId, status: "failed", basis: "agent_reported", usage: emptyUsage("simulated") }));
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilot storyboard/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().pipelineStage).toBe("fail"));
    expect(useStore.getState().telemetryEvents.every((e) => e.status === "failed")).toBe(true);
    expect(screen.getByTestId("stage-strip")).toBeTruthy();
    expect(screen.queryByTestId("verified-badge")).toBeNull();
  });

  it("clears owner data on logout and rejects a late poll result", async () => {
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(true);
    vi.spyOn(InferenceSettings.prototype, "request").mockResolvedValue({ configured: true, revision: "fixture", provider: "local", model_id: "fixture", credential_lifetime: "backend_process", host_models_authorized: false });
    vi.spyOn(IdentitySession.prototype, "logout").mockRejectedValue(new Error("offline"));
    vi.spyOn(LiveAdapter.prototype, "capabilities").mockResolvedValue(null);
    vi.spyOn(LiveAdapter.prototype, "workspaces").mockResolvedValue([]);
    vi.spyOn(LiveAdapter.prototype, "run").mockImplementation(async (nodeId) => ({ nodeId, runId: "live-run" }));
    vi.spyOn(LiveAdapter.prototype, "events").mockResolvedValue({ usage: emptyUsage("live"), workspace: [], messages: [], nextAfterSeq: 0 });
    const cancel = vi.spyOn(LiveAdapter.prototype, "cancel").mockResolvedValue();
    let release!: (value: RunOutcome) => void;
    const poll = vi.spyOn(LiveAdapter.prototype, "poll").mockImplementation(() => new Promise((resolve) => { release = resolve; }));
    renderApp();
    fireEvent.click((await screen.findAllByRole("button", { name: /Pilot storyboard/ }))[0]);
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    fireEvent.change(screen.getByLabelText("USD admission budget per agent run"), { target: { value: "0.01" } });
    fireEvent.click(screen.getByLabelText(/I permit paid inference/));
    await waitFor(() => expect((screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(false));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(poll).toHaveBeenCalledTimes(1));
    expect(vi.mocked(LiveAdapter.prototype.run).mock.calls[0][1]).toMatchObject({ budget: { max_usd: .01 }, loop_limits: { max_ticks: 2, max_tokens_per_tick: 512, max_tokens_total: 2048 } });
    const oldSession = useStore.getState().sessionId;
    fireEvent.click(screen.getByRole("button", { name: /Sign out/ }));
    await waitFor(() => expect(screen.getByTestId("landing-page")).toBeTruthy());
    expect(screen.getByRole("alert").textContent).toMatch(/Server sign-out failed/);
    release({ nodeId: "old-node", status: "succeeded", output: "old owner content", usage: emptyUsage("live") });
    await waitFor(() => expect(cancel).toHaveBeenCalled());
    expect(useStore.getState()).toMatchObject({ nodes: [], messages: [], telemetryEvents: [], scienceReceipt: null, pipelineStage: "idle" });
    expect(useStore.getState().sessionId).not.toBe(oldSession);
  });
  it("uses the workspace picked in the readiness panel on the next live run", async () => {
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(true);
    vi.spyOn(InferenceSettings.prototype, "request").mockResolvedValue({ configured: true, revision: "fixture", provider: "local", model_id: "fixture", credential_lifetime: "backend_process", host_models_authorized: false });
    vi.spyOn(LiveAdapter.prototype, "capabilities").mockResolvedValue({
      capabilities: { shell_execution: { status: "available" } },
    });
    vi.spyOn(LiveAdapter.prototype, "workspaces").mockResolvedValue([
      { workspace_id: "ws-a", project_id: "p", task_id: "t", status: "ready" },
      { workspace_id: "ws-b", project_id: "p2", task_id: "t2", status: "ready" },
    ]);
    const seen: { workspace_id: string; project_id?: string; allowed_tools: string[] }[] = [];
    vi.spyOn(LiveAdapter.prototype, "run").mockImplementation(async (nodeId, workflow) => {
      seen.push({ workspace_id: workflow.workspace_id, project_id: workflow.project_id, allowed_tools: workflow.allowed_tools });
      return { nodeId, runId: "r1" };
    });
    vi.spyOn(LiveAdapter.prototype, "events").mockResolvedValue({ usage: emptyUsage("live"), workspace: [], messages: [], nextAfterSeq: 0 });
    vi.spyOn(LiveAdapter.prototype, "poll").mockImplementation(async (h) => ({ nodeId: h.nodeId, status: "succeeded", basis: "agent_reported", usage: emptyUsage("live") }));
    vi.spyOn(LiveAdapter.prototype, "cancel").mockResolvedValue();
    renderApp();
    expect(await screen.findByText(/will not guess/)).toBeTruthy();
    fireEvent.click(screen.getByDisplayValue("ws-b"));
    await waitFor(() => expect(screen.getByTestId("bound-workspace").textContent).toBe("Bound for next Run: ws-b"));
    fireEvent.click(screen.getAllByRole("button", { name: /Pilot storyboard/ })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    fireEvent.change(screen.getByLabelText("USD admission budget per agent run"), { target: { value: "0.01" } });
    fireEvent.click(screen.getByLabelText(/I permit paid inference/));
    await waitFor(() => expect((screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(false));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(seen.length).toBeGreaterThan(0));
    expect(seen.every((workflow) => workflow.workspace_id === "ws-b" && workflow.project_id === "p2")).toBe(true);
    expect(seen[0].allowed_tools).toEqual(["execute_shell"]);
  });

  it("imports a shared snapshot without identity and keeps a bad file off the canvas", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    expect(screen.getByRole("button", { name: "Export snapshot" })).toBeTruthy();
    fireEvent.change(screen.getByTestId("snapshot-file"), { target: { files: [new File(["{}"], "nope.json", { type: "application/json" })] } });
    expect((await screen.findByTestId("snapshot-notice")).textContent).toMatch(/not a canvas snapshot/);
    expect(useStore.getState().nodes).toEqual([]);
    const shared = JSON.stringify({
      schema_version: "canvas.snapshot.v1",
      nodes: [{
        id: "agent-share", type: "agent", position: { x: 10, y: 20 },
        data: { kind: "agent", presetId: "builder", title: "Builder", description: "shared", color: "nope", status: "done", output: "hidden", verification: "verified" },
      }],
      edges: [],
    });
    fireEvent.change(screen.getByTestId("snapshot-file"), { target: { files: [new File([shared], "canvas-snapshot.json", { type: "application/json" })] } });
    await waitFor(() => expect(useStore.getState().nodes.map((node) => node.id)).toEqual(["agent-share"]));
    expect(useStore.getState().nodes[0].data.verification).toBe("proposal");
    expect(useStore.getState().nodes[0].data.output).toBeUndefined();
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    expect(screen.getByRole("button", { name: "Create" })).toBeTruthy();
    expect(screen.queryByTestId("snapshot-notice")).toBeNull();
  });

  it("spawns agents, links them, and shows the handoff", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    const spawnPreset = (kind: "agent" | "dataLake", presetId: string) => {
      const preset = kind === "agent" ? agentPreset(presetId)! : dataLakePreset(presetId)!;
      const node: CanvasNode = {
        id: nextId(kind), type: kind, position: { x: 80, y: 120 },
        data: {
          kind, presetId, title: preset.title, description: preset.description, color: preset.color,
          ...(kind === "agent" ? { schemaText: defaultSchemaText(presetId), verification: "proposal" as const } : {}),
        },
      };
      useStore.getState().spawn(node);
    };
    expect(screen.getByText(/Mode: simulated/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Contracts" }));
    expect(screen.getByText(/does not edit an agent/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText(/does not edit an agent/)).toBeNull();
    expect(screen.getByTestId("history-panel").textContent).toMatch(/no server history/i);
    expect(screen.getByTestId("readiness-panel").textContent).toMatch(/live mode for binding/i);
    await waitFor(() => expect(screen.getByTestId("cap-execute-shell").textContent).toBe("unavailable"));
    expect(screen.getByTestId("bound-workspace").textContent).toMatch(/none/);

    spawnPreset("agent", "builder");
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(1));
    expect(useStore.getState().tracks).toHaveLength(1);
    expect(screen.getByTestId("metrics-panel").textContent).toMatch(/Builder/);
    expect(useStore.getState().nodes[0].data.schemaText).toMatch(/mapping\.v1/);

    spawnPreset("dataLake", "clinical-lab");
    await waitFor(() => expect(useStore.getState().nodes).toHaveLength(2));
    expect(useStore.getState().tracks).toHaveLength(1);

    const agent = useStore.getState().nodes.find((n) => n.data.kind === "agent")!;
    const lake = useStore.getState().nodes.find((n) => n.data.kind === "dataLake")!;
    fireEvent.click(screen.getByTestId(`node-${lake.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(1));

    spawnPreset("agent", "maintainer");
    const maintainer = useStore.getState().nodes.find((n) => n.data.presetId === "maintainer")!;
    expect(useStore.getState().tracks.map((t) => t.title)).toEqual(["Builder", "Maintainer"]);

    fireEvent.click(screen.getByTestId(`node-${agent.id}`));
    fireEvent.click(screen.getByLabelText("Link from node"));
    fireEvent.click(screen.getByTestId(`node-${maintainer.id}`));
    await waitFor(() => expect(useStore.getState().edges).toHaveLength(2));

    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => {
      const builder = useStore.getState().nodes.find((n) => n.id === agent.id)!;
      const repair = useStore.getState().nodes.find((n) => n.id === maintainer.id)!;
      expect(builder.data.status).toBe("done");
      expect(repair.data.status).toBe("done");
      expect(builder.data.output).toContain("model proposal, agent_reported — not verification");
    });

    expect(useStore.getState().totals.totalTokens).toBeGreaterThan(0);
    expect(useStore.getState().totals.costUsd).toBe(0);
    expect(screen.getByTestId("metrics-panel").textContent).toContain("Unknown");

    expect(screen.getAllByTestId("workspace-file").map((el) => el.textContent).join("\n")).toMatch(/mapping\.proposal\.json/);

    const talk = screen.getAllByTestId("agent-message").map((el) => el.textContent).join("\n");
    expect(talk).toMatch(/Builder/);
    expect(talk).toMatch(/Maintainer/);
    expect(talk).toMatch(/reading_column/);
    const handoff = useStore.getState().edges.find((e) => e.source === agent.id && e.target === maintainer.id)!;
    expect(handoff.data?.packetLabel).toMatch(/reading_column/);
    expect(await screen.findAllByText(/Status: done/)).toHaveLength(2);
  });

  it("clears the canvas from the bar without writing browser storage", () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Load Pilot storyboard/i })[0]);
    expect(useStore.getState().nodes.length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: "Clear canvas" }));
    expect(useStore.getState().nodes).toEqual([]);
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("toasts a loaded storyboard and a run that has no session", async () => {
    renderApp();
    fireEvent.click(screen.getByRole("button", { name: /Enter canvas/i }));
    fireEvent.click(screen.getAllByRole("button", { name: /Load Pilot storyboard/i })[0]);
    expect((await screen.findByTestId("toast")).textContent).toMatch(/Loaded Pilot storyboard/);
    expect(localStorage.length).toBe(0);

    cleanup();
    vi.stubEnv("VITE_RHM_MODE", "live");
    vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(false);
    renderApp();
    await screen.findByTestId("landing-page");
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const box = await screen.findByLabelText("Find a command");
    fireEvent.change(box, { target: { value: "pilot" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(useStore.getState().edges.length).toBeGreaterThan(0));
    fireEvent.keyDown(window, { key: "Enter", ctrlKey: true });
    expect((await screen.findAllByText("Sign in required")).length).toBeGreaterThan(0);
    expect(screen.getByTestId("status-line").textContent).toMatch(/Sign in required/);
    fireEvent.click(screen.getByRole("button", { name: "Clear status" }));
    expect(screen.queryByTestId("status-line")).toBeNull();
    expect(useStore.getState().nodes.length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: /run pipeline/i })).toBeTruthy();
  });
});

const liveInference = (status: InferenceStatus) => {
  vi.stubEnv("VITE_RHM_MODE", "live");
  vi.spyOn(IdentitySession.prototype, "restore").mockResolvedValue(true);
  vi.spyOn(InferenceSettings.prototype, "request").mockResolvedValue(status);
  vi.spyOn(LiveAdapter.prototype, "capabilities").mockResolvedValue(null);
  vi.spyOn(LiveAdapter.prototype, "workspaces").mockResolvedValue([]);
  const run = vi.spyOn(LiveAdapter.prototype, "run").mockImplementation(async (nodeId) => ({ nodeId, runId: "live-run" }));
  vi.spyOn(LiveAdapter.prototype, "events").mockResolvedValue({ usage: emptyUsage("live"), workspace: [], messages: [], nextAfterSeq: 0 });
  vi.spyOn(LiveAdapter.prototype, "poll").mockImplementation(async (h) => ({ nodeId: h.nodeId, status: "succeeded", basis: "agent_reported", usage: emptyUsage("live") }));
  vi.spyOn(LiveAdapter.prototype, "cancel").mockResolvedValue();
  return { run };
};

const configuredStatus: InferenceStatus = { configured: true, revision: "fixture", provider: "local", model_id: "fixture", credential_lifetime: "backend_process", host_models_authorized: false };
const hostOnlyStatus: InferenceStatus = { configured: false, revision: null, credential_lifetime: "backend_process", host_models_authorized: true };
const neitherStatus: InferenceStatus = { configured: false, revision: null, credential_lifetime: "backend_process", host_models_authorized: false };

describe("live provider gate (configured / host-authorized / neither)", () => {
  it("shows connected readiness in live hospital mode", async () => {
    liveInference(configuredStatus);
    renderApp();
    fireEvent.click(await screen.findByRole("button", { name: "Create" }));
    fireEvent.click(screen.getByRole("button", { name: "Hospital source to SQL" }));
    const summary = await screen.findByTestId("hospital-readiness-summary");
    expect(summary.textContent).not.toMatch(/not connected/);
    expect(summary.textContent).toBe("RHM live stack: connected");
  });

  it("lets a configured account Run on Free and requires consent and a positive cap on Premium", async () => {
    liveInference(configuredStatus);
    renderApp();
    fireEvent.click((await screen.findAllByRole("button", { name: /Pilot storyboard/ }))[0]);
    const runBtn = () => screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement;
    await waitFor(() => expect(runBtn().disabled).toBe(false));
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    await waitFor(() => expect(runBtn().disabled).toBe(true));
    fireEvent.change(screen.getByLabelText("USD admission budget per agent run"), { target: { value: "0.01" } });
    fireEvent.click(screen.getByLabelText(/I permit paid inference/));
    await waitFor(() => expect(runBtn().disabled).toBe(false));
    fireEvent.click(screen.getByRole("radio", { name: "Free" }));
    await waitFor(() => expect(runBtn().disabled).toBe(false));
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    expect((screen.getByLabelText("USD admission budget per agent run") as HTMLInputElement).value).toBe("0");
    expect((screen.getByLabelText(/I permit paid inference/) as HTMLInputElement).checked).toBe(false);
  });

  it("opens Settings, returns focus on Escape, and shows the Free server error", async () => {
    const { run } = liveInference(configuredStatus);
    run.mockRejectedValue(new Error("This run needs a spend cap. Choose Premium in Settings and set one."));
    renderApp();
    const settings = await screen.findByRole("button", { name: "Settings" });
    expect(screen.queryByRole("button", { name: /Account inference settings/ })).toBeNull();
    settings.focus();
    fireEvent.click(settings);
    expect(screen.getByRole("dialog", { name: "Settings" })).toBeTruthy();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    await waitFor(() => expect(document.activeElement).toBe(settings));
    fireEvent.click((await screen.findAllByRole("button", { name: /Pilot storyboard/ }))[0]);
    await waitFor(() => expect((screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(false));
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(run.mock.calls.length).toBeGreaterThan(0));
    expect(run.mock.calls[0][1]).toMatchObject({ budget: { max_usd: 0 } });
    await waitFor(() => expect(useStore.getState().nodes.some((node) => node.data.output?.includes("This run needs a spend cap. Choose Premium in Settings and set one."))).toBe(true));
  });

  it("clears paid consent after a provider change before the next Free run", async () => {
    const actualRun = LiveAdapter.prototype.run;
    liveInference(configuredStatus);
    vi.mocked(LiveAdapter.prototype.run).mockImplementation(function (this: LiveAdapter, nodeId, workflow) {
      return actualRun.call(this, nodeId, workflow);
    });
    const workflowRequests: unknown[] = [];
    const runRequests: unknown[] = [];
    vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
      if (url.endsWith("/v1/workflows")) {
        workflowRequests.push(JSON.parse(String(init?.body)));
        return new Response(JSON.stringify({ workflow_id: "workflow-1" }));
      }
      if (url.endsWith("/v1/runs")) {
        runRequests.push(JSON.parse(String(init?.body)));
        return new Response(JSON.stringify({ run_id: "run-1" }));
      }
      return new Response("{}", { status: 200 });
    }));
    renderApp();
    fireEvent.click((await screen.findAllByRole("button", { name: /Pilot storyboard/ }))[0]);
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    fireEvent.click(screen.getByRole("radio", { name: "Premium" }));
    fireEvent.change(screen.getByLabelText("USD admission budget per agent run"), { target: { value: "0.5" } });
    fireEvent.click(screen.getByLabelText(/I permit paid inference/));
    fireEvent.change(screen.getByLabelText("Primary provider"), { target: { value: "freellmapi" } });
    fireEvent.change(screen.getByLabelText("Primary model"), { target: { value: "fixture-model" } });
    fireEvent.change(screen.getByLabelText("Primary API key"), { target: { value: "fixture-key" } });
    fireEvent.click(screen.getByLabelText(/I approve changing this shared account/));
    fireEvent.click(screen.getByRole("button", { name: "Save account provider" }));
    await waitFor(() => expect((screen.getByLabelText(/I permit paid inference/) as HTMLInputElement).checked).toBe(false));
    fireEvent.click(screen.getByRole("radio", { name: "Free" }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(runRequests).toHaveLength(1));
    expect(workflowRequests[0]).toMatchObject({ workflow: { budget: { max_usd: 0 } } });
    expect(runRequests[0]).toMatchObject({ paid_inference_consent: false });
  });

  it("lets a host-authorized account Run and Drift without its own provider", async () => {
    const { run } = liveInference(hostOnlyStatus);
    renderApp();
    await screen.findAllByRole("button", { name: /Pilot storyboard/ });
    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /MRF price file/ }));
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("mrf-pipeline"));
    const runBtn = () => screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement;
    await waitFor(() => expect(runBtn().disabled).toBe(false));
    expect(screen.queryByText(/cannot use the operator's model automatically/)).toBeNull();
    useStore.setState({ mrfMapping: MRF_GOLDEN_MAPPING });
    const driftBtn = () => screen.getByRole("button", { name: /Upstream schema drift/i }) as HTMLButtonElement;
    await waitFor(() => expect(driftBtn().disabled).toBe(false));
    fireEvent.click(driftBtn());
    await waitFor(() => expect(useStore.getState().scienceReceipt?.oracleNote ?? "").toMatch(/Named check failed: nulls_repaired/));
    fireEvent.click(runBtn());
    await waitFor(() => expect(run).toHaveBeenCalled());
  });

  it("blocks Run and Drift when the account is neither configured nor host-authorized", async () => {
    liveInference(neitherStatus);
    renderApp();
    await screen.findAllByRole("button", { name: /Pilot storyboard/ });
    fireEvent.click(screen.getByLabelText("Create"));
    fireEvent.click(screen.getByRole("button", { name: /MRF price file/ }));
    await waitFor(() => expect(useStore.getState().scenarioId).toBe("mrf-pipeline"));
    await waitFor(() => expect((screen.getByRole("button", { name: /run pipeline/i }) as HTMLButtonElement).disabled).toBe(true));
    expect(screen.getByText("Open Settings and add a provider before running.")).toBeTruthy();
    useStore.setState({ mrfMapping: MRF_GOLDEN_MAPPING });
    expect((screen.getByRole("button", { name: /Upstream schema drift/i }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /Upstream schema drift/i }));
    expect(useStore.getState().scienceReceipt).toBeNull();
  });
});

describe("MRF drift + one repair (jsdom)", () => {
  it("keeps the original MRF demo's canned simulated repair story available", async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Enter canvas' }));
    fireEvent.click(screen.getByRole('button', { name: 'Create' }));
    fireEvent.click(screen.getByRole('button', { name: 'MRF price file' }));
    expect(useStore.getState().scenarioId).toBe("mrf-pipeline");
    fireEvent.click(screen.getByRole("button", { name: /run pipeline/i }));
    await waitFor(() => expect(useStore.getState().scienceReceipt?.checks?.every((c) => c.pass)).toBe(true));
    expect(useStore.getState().nodes.filter((n) => n.data.presetId === "mrf-builder").every((n) => n.data.verification === "checked_locally")).toBe(true);
    expect(screen.queryByText(/^Verified$/)).toBeNull();
    expect(useStore.getState().mrfSource).toBe("base");
    fireEvent.click(screen.getByRole("button", { name: /Upstream schema drift/i }));
    await waitFor(() => expect(useStore.getState().scienceReceipt?.oracleNote).toMatch(/Named check failed: nulls_repaired/));
    await waitFor(() => expect(useStore.getState().scienceReceipt?.checks?.every((c) => c.pass)).toBe(true));
    expect(useStore.getState().mrfSource).toBe("drift");
    expect(useStore.getState().mrfMapping?.fields.rate).toBe("negotiated_amount");
    expect(useStore.getState().nodes.filter((n) => n.data.presetId === "mrf-maintainer").every((n) => n.data.verification === "checked_locally")).toBe(true);
  });
});

