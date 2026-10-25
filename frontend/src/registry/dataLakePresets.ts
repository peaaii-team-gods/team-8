import type { DataLakePreset } from "./types";

export const DATA_LAKE_PRESETS: DataLakePreset[] = [
  { id: "clinical-lab", kind: "dataLake", title: "Clinical Lab Panel", description: "Synthetic analyte readings with units", color: "blue", fixtureId: "clinical-lab" },
  { id: "medicare", kind: "dataLake", title: "Medicare Clearinghouse", description: "Synthetic Medicare audit records", color: "teal", fixtureId: "medicare" },
  { id: "medicaid", kind: "dataLake", title: "Medicaid Clearinghouse", description: "Synthetic Medicaid audit records", color: "indigo", fixtureId: "medicaid" },
  { id: "commercial", kind: "dataLake", title: "Commercial Clearinghouse", description: "Synthetic commercial audit records", color: "rose", fixtureId: "commercial" },
  { id: "assay-plate", kind: "dataLake", title: "Assay Plate", description: "Synthetic well/compound concentration readouts", color: "lime", fixtureId: "assay-plate" },
  { id: "hospital-mrf", kind: "dataLake", title: "Hospital MRF excerpt", description: "Synthetic nested price-transparency sample (not the full file)", color: "blue", fixtureId: "hospital-mrf" },
];

export const dataLakePreset = (id: string) => DATA_LAKE_PRESETS.find((p) => p.id === id);
