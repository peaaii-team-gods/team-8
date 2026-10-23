// Synthetic, de-identified fixtures only. No PHI, no real datasets.
export const LAKE_FIXTURES: Record<string, unknown[]> = {
  "clinical-lab": [
    { specimen_id: "syn-lab-001", analyte: "glucose", reading: 92, unit: "mg/dL" },
    { specimen_id: "syn-lab-002", analyte: "glucose", reading: 101, unit: "mg/dL" },
    { specimen_id: "syn-lab-003", analyte: "potassium", reading: 4.1, unit: "mmol/L" },
    { specimen_id: "syn-lab-004", analyte: "potassium", value: 3.9, unit: "mmol/L" },
  ],
  medicare: [
    { record_id: "syn-mcr-001", claim_type: "synthetic", amount_band: "low", denial_code: null },
    { record_id: "syn-mcr-002", claim_type: "synthetic", amount_band: "mid", denial_code: "CO-97" },
    { record_id: "syn-mcr-003", claim_type: "synthetic", amount_band: "low", denial_code: null },
    { record_id: "syn-mcr-004", claim_type: "synthetic", amount_band: "high", denial_code: "PR-1" },
  ],
  medicaid: [
    { record_id: "syn-mcd-001", claim_type: "synthetic", amount_band: "mid", denial_code: null },
    { record_id: "syn-mcd-002", claim_type: "synthetic", amount_band: "low", denial_code: "CO-16" },
    { record_id: "syn-mcd-003", claim_type: "synthetic", amount_band: "mid", denial_code: null },
  ],
  commercial: [
    { record_id: "syn-com-001", claim_type: "synthetic", amount_band: "high", denial_code: null },
    { record_id: "syn-com-002", claim_type: "synthetic", amount_band: "high", denial_code: "N95" },
    { record_id: "syn-com-003", claim_type: "synthetic", amount_band: "mid", denial_code: null },
  ],
  "assay-plate": [
    { well_id: "A01", compound_code: "CMP-100", concentration_uM: 10, readout: 0.42 },
    { well_id: "A02", compound_code: "CMP-100", concentration_uM: 1, readout: 0.11 },
    { well_id: "B01", compound_code: "CMP-220", concentration_uM: 10, readout: 1.05 },
    { well_id: "B02", compound_code: "CMP-220", concentration_uM: 1, readout: 0.08 },
    { well_id: "C01", compound_code: "VEHICLE", concentration_uM: 0, readout: 0.02 },
  ],
};
export const fixtureFor = (fixtureId: string) => LAKE_FIXTURES[fixtureId] ?? [];
