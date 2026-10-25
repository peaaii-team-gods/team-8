/** Reproducible injected drift; the source slice is never mutated. */
export function injectHospitalRateDrift<T>(slice: T): T & { injected_drift: string } {
  const renamed = JSON.parse(JSON.stringify(slice), (key, value) => {
    if (value && typeof value === "object" && !Array.isArray(value) && Object.hasOwn(value, "standard_charge_dollar")) {
      value.standard_charge_amount = value.standard_charge_dollar;
      delete value.standard_charge_dollar;
    }
    return value;
  });
  return { ...renamed, injected_drift: "injected: standard_charge_dollar -> standard_charge_amount" };
}
