/** The suffix runNodes appends. The inspector splits it off so the JSON can be read, and still says it is a proposal. */
export const PROPOSAL_MARK = "(model proposal, agent_reported — not verification)";

export interface OutputSource {
  id: string;
  title: string;
  presetId: string;
  output?: string;
}

export interface AgentOutputView {
  id: string;
  title: string;
  presetId: string;
  proposal: boolean;
  text: string;
  json: boolean;
}

export function presentOutput(source: OutputSource): AgentOutputView {
  const raw = source.output?.trim() ?? "";
  const proposal = raw.includes(PROPOSAL_MARK);
  const body = proposal ? raw.replace(PROPOSAL_MARK, "").trim() : raw;
  if (!body) {
    return { id: source.id, title: source.title, presetId: source.presetId, proposal, text: "", json: false };
  }
  try {
    const value = JSON.parse(body);
    if (value && typeof value === "object") {
      return { id: source.id, title: source.title, presetId: source.presetId, proposal, text: JSON.stringify(value, null, 2), json: true };
    }
  } catch {
    /* Plain text stays plain text. */
  }
  return { id: source.id, title: source.title, presetId: source.presetId, proposal, text: body, json: false };
}

export function compareOutputs(left: AgentOutputView, right: AgentOutputView): string {
  if (!left.text && !right.text) return "Neither agent has output yet. Run the pipeline to read it here.";
  if (!left.text || !right.text) return "One agent has no output yet.";
  if (left.text === right.text) return "The JSON matches. Both sides are model proposals, not verified acceptance.";
  return "The JSON differs. Neither side is verified acceptance.";
}
