import type { DataLakePreset } from "./types";
export const DATA_LAKE_PRESETS: DataLakePreset[] = [
  { id: "supabase-primary", kind: "dataLake", title: "Supabase Data Lake", description: "Primary synthetic records lake", color: "blue", fixtureId: "supabase-primary" },
  { id: "medicare", kind: "dataLake", title: "Medicare Clearinghouse", description: "Synthetic Medicare audit records", color: "teal", fixtureId: "medicare" },
  { id: "medicaid", kind: "dataLake", title: "Medicaid Clearinghouse", description: "Synthetic Medicaid audit records", color: "indigo", fixtureId: "medicaid" },
  { id: "commercial", kind: "dataLake", title: "Commercial Clearinghouse", description: "Synthetic commercial audit records", color: "rose", fixtureId: "commercial" },
];
export const dataLakePreset = (id: string) => DATA_LAKE_PRESETS.find((p) => p.id === id);
