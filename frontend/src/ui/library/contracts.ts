import { agentPreset } from "../../registry/agentPresets";
import { OUTPUT_SCHEMAS, schemaText, type OutputSchema } from "../../registry/schemas";

/** One registry contract, ready for a read-only drawer. Not a canvas edit and not an API call. */
export interface ContractCard {
  id: string;
  title: string;
  summary: string;
  presets: { id: string; title: string }[];
  json: string;
}

export function contractCard(schema: OutputSchema): ContractCard {
  return {
    id: schema.id,
    title: schema.title,
    summary: schema.summary,
    presets: schema.presetIds.map((id) => ({ id, title: agentPreset(id)?.title ?? id })),
    json: schemaText(schema),
  };
}

export function listContracts(): ContractCard[] {
  return OUTPUT_SCHEMAS.map(contractCard);
}
