import { AGENT_PRESETS } from "./agentPresets";
import { DATA_LAKE_PRESETS } from "./dataLakePresets";

export const CREATE_MENU_PRESET_IDS = [
  "hospital-source",
  "mrf-hospital-builder",
  "mrf-hospital-maintainer",
  "hospital-store",
  "hospital-analyst",
] as const;

export const CREATE_MENU_PRESETS = CREATE_MENU_PRESET_IDS.map((id) =>
  DATA_LAKE_PRESETS.find((preset) => preset.id === id) ?? AGENT_PRESETS.find((preset) => preset.id === id)!,
);
