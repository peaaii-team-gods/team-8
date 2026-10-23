import type { CanvasEdge, CanvasNode } from "../state/store";
import { defaultSchemaText } from "./schemas";
import { agentPreset } from "./agentPresets";
import { dataLakePreset } from "./dataLakePresets";

export interface DemoScenario {
  id: string;
  title: string;
  blurb: string;
  build: (nextId: (p: string) => string) => { nodes: CanvasNode[]; edges: CanvasEdge[] };
}

const agentNode = (nextId: (p: string) => string, presetId: string, x: number, y: number): CanvasNode => {
  const p = agentPreset(presetId)!;
  return {
    id: nextId("agent"),
    type: "agent",
    position: { x, y },
    data: {
      kind: "agent",
      presetId,
      title: p.title,
      description: p.description,
      color: p.color,
      schemaText: defaultSchemaText(presetId),
      verification: "proposal",
    },
  };
};

const lakeNode = (nextId: (p: string) => string, presetId: string, x: number, y: number): CanvasNode => {
  const p = dataLakePreset(presetId)!;
  return {
    id: nextId("dataLake"),
    type: "dataLake",
    position: { x, y },
    data: { kind: "dataLake", presetId, title: p.title, description: p.description, color: p.color },
  };
};

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "pilot-storyboard",
    title: "Pilot storyboard",
    blurb: "Clinical lab → Builder → Maintainer (drift → one repair)",
    build: (nextId) => {
      const lake = lakeNode(nextId, "clinical-lab", 40, 160);
      const builder = agentNode(nextId, "builder", 360, 80);
      const maintainer = agentNode(nextId, "maintainer", 360, 280);
      return {
        nodes: [lake, builder, maintainer],
        edges: [
          { id: nextId("e"), source: lake.id, target: builder.id, type: "packet", data: { active: false } },
          { id: nextId("e"), source: builder.id, target: maintainer.id, type: "packet", data: { active: false } },
        ],
      };
    },
  },
  {
    id: "medicare-claim-risk",
    title: "Claim risk on Medicare",
    blurb: "Medicare lake → Denial Predictor → Protocol Auditor",
    build: (nextId) => {
      const lake = lakeNode(nextId, "medicare", 40, 180);
      const denial = agentNode(nextId, "denial-predictor", 360, 80);
      const policy = agentNode(nextId, "policy-audit", 360, 300);
      return {
        nodes: [lake, denial, policy],
        edges: [
          { id: nextId("e"), source: lake.id, target: denial.id, type: "packet", data: { active: false } },
          { id: nextId("e"), source: denial.id, target: policy.id, type: "packet", data: { active: false } },
        ],
      };
    },
  },
  {
    id: "assay-qc",
    title: "Assay QC on plate",
    blurb: "Assay plate → Assay QC agent",
    build: (nextId) => {
      const lake = lakeNode(nextId, "assay-plate", 80, 180);
      const qc = agentNode(nextId, "assay-qc", 400, 180);
      return {
        nodes: [lake, qc],
        edges: [{ id: nextId("e"), source: lake.id, target: qc.id, type: "packet", data: { active: false } }],
      };
    },
  },
];

export const scenarioById = (id: string) => DEMO_SCENARIOS.find((s) => s.id === id);
