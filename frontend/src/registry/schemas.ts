/** Predefined output schemas. Programmers can replace the text on an agent; these are the starting contracts. */

export interface OutputSchema {
  id: string;
  title: string;
  summary: string;
  presetIds: string[];
  document: Record<string, unknown>;
}

const mapping: Record<string, unknown> = {
  title: "Bounded field mapping",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "id_column", "reading_column"],
  properties: {
    schema_version: { const: "mapping.v1" },
    id_column: { const: "sensor_id" },
    reading_column: { enum: ["reading", "value"] },
  },
};

export const OUTPUT_SCHEMAS: OutputSchema[] = [
  {
    id: "mapping.v1",
    title: "Field mapping",
    summary: "Builder must name sensor_id and either reading or value.",
    presetIds: ["builder"],
    document: mapping,
  },
  {
    id: "repair.v1",
    title: "Repair decision",
    summary: "Maintainer may replace the mapping once, or fail with a reason code.",
    presetIds: ["maintainer"],
    document: {
      title: "One bounded maintenance decision",
      oneOf: [
        {
          type: "object",
          additionalProperties: false,
          required: ["action", "mapping"],
          properties: {
            action: { const: "replace_mapping" },
            mapping,
          },
        },
        {
          type: "object",
          additionalProperties: false,
          required: ["action", "reason_code"],
          properties: {
            action: { const: "fail" },
            reason_code: { enum: ["unsupported_schema", "insufficient_evidence"] },
          },
        },
      ],
    },
  },
  {
    id: "denial.v1",
    title: "Denial flags",
    summary: "Denial Predictor returns a risk level and synthetic flags only.",
    presetIds: ["denial-predictor"],
    document: {
      title: "Denial risk review",
      type: "object",
      additionalProperties: false,
      required: ["risk", "flags", "note"],
      properties: {
        risk: { enum: ["low", "medium", "high"] },
        flags: { type: "array", items: { type: "string" } },
        note: { type: "string" },
      },
    },
  },
  {
    id: "policy.v1",
    title: "Policy finding",
    summary: "Policy Audit returns compliance against one named rule.",
    presetIds: ["policy-audit"],
    document: {
      title: "Policy audit finding",
      type: "object",
      additionalProperties: false,
      required: ["compliant", "rule", "action"],
      properties: {
        compliant: { type: "boolean" },
        rule: { type: "string" },
        action: { enum: ["repair", "fail", "none"] },
      },
    },
  },
  {
    id: "custom.v1",
    title: "Custom object",
    summary: "Blank object. Replace this JSON with the shape you want back.",
    presetIds: ["custom-agent"],
    document: {
      title: "Custom agent reply",
      type: "object",
      additionalProperties: false,
      required: ["status"],
      properties: {
        status: { type: "string" },
        note: { type: "string" },
      },
    },
  },
];

export const schemaById = (id: string) => OUTPUT_SCHEMAS.find((s) => s.id === id);

export function defaultSchema(presetId: string): OutputSchema {
  return OUTPUT_SCHEMAS.find((s) => s.presetIds.includes(presetId)) ?? schemaById("custom.v1")!;
}

export const schemaText = (schema: OutputSchema) => JSON.stringify(schema.document, null, 2);

export const defaultSchemaText = (presetId: string) => schemaText(defaultSchema(presetId));

export function parseSchemaText(text: string): { ok: true; value: Record<string, unknown> } | { ok: false; error: string } {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON." };
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return { ok: false, error: "Schema must be a JSON object." };
  return { ok: true, value: value as Record<string, unknown> };
}

/** Compact JSON for the workflow input. Invalid or empty text is omitted. */
export function outputSchemaInput(text?: string): string | undefined {
  if (!text?.trim()) return undefined;
  const parsed = parseSchemaText(text);
  return parsed.ok ? JSON.stringify(parsed.value) : undefined;
}

export function matchingSchemaId(text?: string): string | undefined {
  const compact = outputSchemaInput(text);
  if (!compact) return undefined;
  return OUTPUT_SCHEMAS.find((s) => JSON.stringify(s.document) === compact)?.id;
}
