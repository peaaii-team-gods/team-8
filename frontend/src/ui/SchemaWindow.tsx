import { Braces } from "lucide-react";
import { useStore } from "../state/store";
import { OUTPUT_SCHEMAS, defaultSchemaText, matchingSchemaId, parseSchemaText, schemaById, schemaText } from "../registry/schemas";

export default function SchemaWindow() {
  const { uiState, nodes, setUiState, setSchema } = useStore();
  if (uiState.kind !== "schema") return null;
  const node = nodes.find((n) => n.id === uiState.nodeId && n.data.kind === "agent");
  if (!node) return null;
  const text = node.data.schemaText ?? "";
  const parsed = text.trim() ? parseSchemaText(text) : { ok: false as const, error: "Schema is empty." };
  const selected = matchingSchemaId(text) ?? "";

  return (
    <aside
      className="glass absolute top-14 left-4 z-20 w-[min(420px,calc(100%-2rem))] p-4 flex flex-col gap-2 max-h-[70vh]"
      data-testid="schema-window"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-2">
        <Braces size={14} className="text-fuchsia-300" />
        <h2 className="font-semibold text-sm">{node.data.title} control</h2>
        <button type="button" className="ml-auto text-xs opacity-70" onClick={() => setUiState({ kind: "idle" })}>Close</button>
      </div>
      <p className="text-[10px] opacity-60">Output schema sent with this agent. Presets start from the pilot contracts. Edit the JSON if you need a different shape.</p>
      <label className="text-[10px] uppercase opacity-60" htmlFor="schema-preset">Predefined schema</label>
      <select
        id="schema-preset"
        className="glass px-2 py-1 text-sm bg-transparent"
        value={selected}
        onChange={(e) => {
          const next = schemaById(e.target.value);
          if (next) setSchema(node.id, schemaText(next));
        }}
      >
        <option value="" disabled>{selected ? "Predefined" : "Hand-edited"}</option>
        {OUTPUT_SCHEMAS.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
      </select>
      <label className="text-[10px] uppercase opacity-60" htmlFor="schema-json">Schema JSON</label>
      <textarea
        id="schema-json"
        aria-label="Output schema"
        spellCheck={false}
        className={`glass px-3 py-2 text-xs font-mono leading-relaxed bg-transparent min-h-48 flex-1 resize-y ${parsed.ok ? "" : "ring-1 ring-rose-400/80"}`}
        value={text}
        onChange={(e) => setSchema(node.id, e.target.value)}
      />
      <div className="flex items-center gap-2 text-[10px]">
        <span className={parsed.ok ? "text-emerald-300" : "text-rose-300"} data-testid="schema-status">
          {parsed.ok ? "Valid JSON object. This schema is sent on Run." : `${parsed.error} Run will not send a schema until this parses.`}
        </span>
        <button
          type="button"
          className="ml-auto underline opacity-80"
          onClick={() => setSchema(node.id, defaultSchemaText(node.data.presetId))}
        >Reset to preset</button>
      </div>
    </aside>
  );
}
