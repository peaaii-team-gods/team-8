import { DEMO_CAPTION, DEMO_SCENARIO_IDS, demoScenarioTitle, type DemoScenarioId } from "./boot";

export default function DemoBanner({
  scenarioId,
  onScenario,
  onReset,
  onExit,
}: {
  scenarioId: DemoScenarioId;
  onScenario: (id: DemoScenarioId) => void;
  onReset: () => void;
  onExit: () => void;
}) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-fuchsia-300/20 bg-fuchsia-950/50 px-3 py-1.5 text-xs" data-testid="demo-banner">
      <span className="font-semibold text-fuchsia-100">Demo mode · Synthetic · no PHI</span>
      <span className="text-white/70">{DEMO_CAPTION}</span>
      <span className="text-white/45">Fixture badge, not acceptance.</span>
      <label className="ml-auto flex items-center gap-1">
        Load scenario
        <select
          aria-label="Load scenario"
          className="rounded bg-black/30 px-1 py-0.5"
          value={scenarioId}
          onChange={(event) => onScenario(event.target.value as DemoScenarioId)}
        >
          {DEMO_SCENARIO_IDS.map((id) => (
            <option key={id} value={id}>{demoScenarioTitle(id)}</option>
          ))}
        </select>
      </label>
      <button type="button" className="glass px-2 py-1" onClick={onReset}>Reset demo</button>
      <button type="button" className="glass px-2 py-1" onClick={onExit}>Exit demo</button>
    </div>
  );
}
