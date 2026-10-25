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
    id_column: { enum: ["specimen_id", "sensor_id", "record_id", "well_id"] },
    reading_column: { enum: ["reading", "value", "readout", "amount_band"] },
  },
};

const sourcePaths = (names: string[]) => ({ type: "object", additionalProperties: false, required: names,
  properties: Object.fromEntries(names.map(name => [name, { type: "string", minLength: 1 }])) });
const hospitalMapping: Record<string, unknown> = {
  type: "object", additionalProperties: false,
  required: ["schema_version", "collection", "code_selector", "charge_list", "payer_list", "fields", "gross_key", "cash_key"],
  properties: {
    schema_version: { const: "mrf.mapping.v2-hospital" },
    ...sourcePaths(["collection", "charge_list", "payer_list", "gross_key", "cash_key"]).properties,
    code_selector: { ...sourcePaths(["list", "type_field", "code_field", "accept_types", "pattern"]), properties: {
      ...sourcePaths(["list", "type_field", "code_field"]).properties,
      accept_types: { const: ["HCPCS"] }, pattern: { const: "^\\d{5}$" },
    } },
    fields: sourcePaths(["description", "payer_name", "plan_name", "billing_class", "rate"]),
  },
};

export const OUTPUT_SCHEMAS: OutputSchema[] = [
  {
    id: "mapping.v1",
    title: "Field mapping",
    summary: "Builder must name an id column and a reading/value column from the lake.",
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
    title: "Protocol finding",
    summary: "Protocol Auditor returns compliance against one named rule.",
    presetIds: ["policy-audit"],
    document: {
      title: "Protocol audit finding",
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
    id: "assay_qc.v1",
    title: "Assay QC",
    summary: "Assay QC returns pass/fail with synthetic flag codes.",
    presetIds: ["assay-qc"],
    document: {
      title: "Assay plate QC",
      type: "object",
      additionalProperties: false,
      required: ["outcome", "flags", "note"],
      properties: {
        outcome: { enum: ["pass", "fail"] },
        flags: { type: "array", items: { type: "string" } },
        note: { type: "string" },
      },
    },
  },
  {
    id: "mrf.mapping.v1",
    title: "MRF flatten mapping",
    summary: "Builder names nested paths, field sources, a null fill, and a dedupe key.",
    presetIds: ["mrf-builder"],
    document: {
      title: "MRF flatten mapping",
      type: "object",
      additionalProperties: false,
      required: ["schema_version", "collection", "rate_groups", "prices", "fields", "standard_charge_lookup", "null_policy", "dedupe_key"],
      properties: {
        schema_version: { const: "mrf.mapping.v1" },
        collection: { type: "string" },
        rate_groups: { type: "string" },
        prices: { type: "string" },
        fields: {
          type: "object",
          additionalProperties: false,
          required: ["billing_code", "description", "payer_name", "billing_class", "negotiated_type", "rate"],
          properties: {
            billing_code: { type: "string" },
            description: { type: "string" },
            payer_name: { type: "string" },
            billing_class: { type: "string" },
            negotiated_type: { type: "string" },
            rate: { type: "string" },
          },
        },
        standard_charge_lookup: { type: "string" },
        null_policy: {
          type: "object",
          additionalProperties: false,
          required: ["rate"],
          properties: {
            rate: {
              type: "object",
              additionalProperties: false,
              required: ["fill_from", "by"],
              properties: {
                fill_from: { type: "string" },
                by: { type: "string" },
              },
            },
          },
        },
        dedupe_key: { type: "array", minItems: 1, items: { type: "string" } },
      },
    },
  },
  {
    id: "mrf.repair.v1",
    title: "MRF mapping repair",
    summary: "Maintainer may replace the MRF mapping once, or fail with a reason code.",
    presetIds: ["mrf-maintainer"],
    document: {
      title: "One bounded MRF maintenance decision",
      oneOf: [
        {
          type: "object",
          additionalProperties: false,
          required: ["action", "mapping"],
          properties: {
            action: { const: "replace_mapping" },
            mapping: { $ref: "#/definitions/mrfMapping" },
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
      definitions: {
        mrfMapping: {
          type: "object",
          additionalProperties: false,
          required: ["schema_version", "collection", "rate_groups", "prices", "fields", "standard_charge_lookup", "null_policy", "dedupe_key"],
          properties: {
            schema_version: { const: "mrf.mapping.v1" },
            collection: { type: "string" },
            rate_groups: { type: "string" },
            prices: { type: "string" },
            fields: {
              type: "object",
              additionalProperties: false,
              required: ["billing_code", "description", "payer_name", "billing_class", "negotiated_type", "rate"],
              properties: {
                billing_code: { type: "string" },
                description: { type: "string" },
                payer_name: { type: "string" },
                billing_class: { type: "string" },
                negotiated_type: { type: "string" },
                rate: { type: "string" },
              },
            },
            standard_charge_lookup: { type: "string" },
            null_policy: {
              type: "object",
              additionalProperties: false,
              required: ["rate"],
              properties: {
                rate: {
                  type: "object",
                  additionalProperties: false,
                  required: ["fill_from", "by"],
                  properties: {
                    fill_from: { type: "string" },
                    by: { type: "string" },
                  },
                },
              },
            },
            dedupe_key: { type: "array", minItems: 1, items: { type: "string" } },
          },
        },
      },
    },
  },
  {
    id: "mrf.mapping.v2-hospital", title: "Hospital v3 mapping", summary: "Builder names hospital v3 source keys.",
    presetIds: ["mrf-hospital-builder"], document: hospitalMapping,
  },
  {
    id: "mrf.repair.v2-hospital", title: "Hospital v3 repair", summary: "Maintainer proposes one injected-drift repair or declines.",
    presetIds: ["mrf-hospital-maintainer"], document: {
      oneOf: [
        { type: "object", additionalProperties: false, required: ["action", "mapping"],
          properties: { action: { const: "replace_mapping" }, mapping: hospitalMapping } },
        { type: "object", additionalProperties: false, required: ["action", "reason_code"],
          properties: { action: { const: "fail" }, reason_code: { enum: ["unsupported_schema", "insufficient_evidence"] } } },
      ],
    },
  },
  {
    id: "hospital.summary.v1", title: "Hospital SQL summary", summary: "A short model proposal checked against this run's SQL figures.",
    presetIds: ["hospital-analyst"], document: { type: "object", additionalProperties: false, required: ["summary"],
      properties: { summary: { type: "string", minLength: 1, maxLength: 1200 } } },
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
