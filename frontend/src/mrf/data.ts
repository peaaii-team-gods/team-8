import mrfChunk from "./data/mrf-chunk.json";
import mrfChunkDrift from "./data/mrf-chunk-drift.json";
import mrfGoldenMapping from "./data/mrf-golden-mapping.json";
import mrfGoldenRepair from "./data/mrf-golden-repair.json";
import type { MrfMapping } from "./types";

export const MRF_CHUNK = mrfChunk;
export const MRF_CHUNK_DRIFT = mrfChunkDrift;
export const MRF_GOLDEN_MAPPING = mrfGoldenMapping as MrfMapping;
export const MRF_GOLDEN_REPAIR = mrfGoldenRepair as MrfMapping;
export const MRF_GOLDEN_REPAIR_REPLY = { action: "replace_mapping" as const, mapping: MRF_GOLDEN_REPAIR };
