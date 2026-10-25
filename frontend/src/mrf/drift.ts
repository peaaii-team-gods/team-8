import { fixtureFor } from "../fixtures/lakes";
import type { CompiledNode } from "../run/runNodes";
import { evaluateMapping } from "./oracle";
import { MRF_CHUNK, MRF_CHUNK_DRIFT } from "./data";
import type { MrfMapping } from "./types";

export const mrfDocument = (source: "base" | "drift") => source === "drift" ? MRF_CHUNK_DRIFT : MRF_CHUNK;

export function recheckMapping(source: "base" | "drift", mapping: MrfMapping) {
  return evaluateMapping(mrfDocument(source), mapping);
}

export function withDriftEvidence(compiled: CompiledNode[], source: "base" | "drift"): CompiledNode[] {
  if (source !== "drift") return compiled;
  const evidence = JSON.stringify([{ lake: "hospital-mrf-drift", records: fixtureFor("hospital-mrf-drift") }]);
  return compiled.map((item) => ({
    ...item,
    workflow: { ...item.workflow, inputs: { ...item.workflow.inputs, evidence } },
  }));
}
