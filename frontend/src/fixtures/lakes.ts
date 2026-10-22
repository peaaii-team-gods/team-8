// Synthetic, de-identified fixtures only. No PHI, no real datasets.
export const LAKE_FIXTURES: Record<string, unknown[]> = {
  "supabase-primary": [{ record_id: "syn-001", reading: 12, category: "audit" }, { record_id: "syn-002", reading: 7, category: "audit" }],
  medicare: [{ record_id: "syn-mcr-001", claim_type: "synthetic", amount_band: "low" }],
  medicaid: [{ record_id: "syn-mcd-001", claim_type: "synthetic", amount_band: "mid" }],
  commercial: [{ record_id: "syn-com-001", claim_type: "synthetic", amount_band: "high" }],
};
export const fixtureFor = (fixtureId: string) => LAKE_FIXTURES[fixtureId] ?? [];
