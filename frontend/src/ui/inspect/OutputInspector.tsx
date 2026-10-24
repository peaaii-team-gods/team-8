import { useState } from "react";
import { useStore } from "../../state/store";
import { compareOutputs, presentOutput, type OutputSource } from "./outputView";

export default function OutputInspector({ sources }: { sources?: OutputSource[] }) {
  const nodes = useStore((state) => state.nodes);
  const agents = (sources ?? nodes.filter((node) => node.data.kind === "agent").map((node) => ({
    id: node.id,
    title: node.data.title,
    presetId: node.data.presetId,
    output: node.data.output,
  }))).map(presentOutput);
  const [open, setOpen] = useState(false);
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");
  const left = agents.find((agent) => agent.id === leftId) ?? agents[0];
  const right = agents.find((agent) => agent.id === rightId) ?? agents[1] ?? agents[0];

  return (
    <div className="absolute top-14 right-4 z-20" data-testid="output-inspector" onClick={(event) => event.stopPropagation()}>
      <button type="button" className="glass px-3 py-1.5 text-xs" onClick={() => setOpen((value) => !value)}>Outputs</button>
      {open && (
        <aside className="glass mt-2 flex max-h-[70vh] w-[min(440px,78vw)] flex-col gap-2 overflow-y-auto p-3 text-xs">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">Agent outputs</h2>
            <button type="button" className="ml-auto opacity-70" onClick={() => setOpen(false)}>Close</button>
          </div>
          <p className="opacity-70">Client-only. Model proposals, agent_reported — not verification. This panel does not load history or change the science receipt.</p>
          {agents.length === 0 && <p>Add an agent to inspect output.</p>}
          {agents.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-1">
                Compare
                <select aria-label="Compare from" className="rounded bg-black/30 px-1 py-0.5" value={left?.id ?? ""} onChange={(event) => setLeftId(event.target.value)}>
                  {agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.title}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-1">
                with
                <select aria-label="Compare with" className="rounded bg-black/30 px-1 py-0.5" value={right?.id ?? ""} onChange={(event) => setRightId(event.target.value)}>
                  {agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.title}</option>)}
                </select>
              </label>
            </div>
          )}
          {left && right && <p data-testid="output-compare">{compareOutputs(left, right)}</p>}
          <div className="grid gap-2 sm:grid-cols-2">
            {left && <OutputPane agent={left} testId="output-left" />}
            {right && right.id !== left?.id && <OutputPane agent={right} testId="output-right" />}
          </div>
        </aside>
      )}
    </div>
  );
}

function OutputPane({ agent, testId }: { agent: ReturnType<typeof presentOutput>; testId: string }) {
  return (
    <section data-testid={testId}>
      <div className="font-semibold">{agent.title}</div>
      <div className="opacity-60">{agent.proposal ? "Proposal" : agent.text ? "Output" : "No output yet"}</div>
      <pre className="mt-1 overflow-x-auto rounded bg-black/30 p-2 font-mono text-[10px] leading-relaxed">{agent.text || "Run the pipeline to read this agent."}</pre>
    </section>
  );
}
