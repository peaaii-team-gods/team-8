import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SchemaWindow from "./SchemaWindow";
import { useStore } from "../state/store";
import { defaultSchemaText } from "../registry/schemas";
import { emptyUsage } from "../run/telemetry";

beforeEach(() => {
  useStore.setState({
    nodes: [{
      id: "a1", type: "agent", position: { x: 0, y: 0 },
      data: { kind: "agent", presetId: "builder", title: "Builder", description: "", color: "emerald", schemaText: defaultSchemaText("builder") },
    }],
    edges: [], uiState: { kind: "schema", nodeId: "a1" },
    tracks: [], messages: [], workspace: [], totals: emptyUsage(),
  });
});

describe("SchemaWindow", () => {
  it("opens on the predefined mapping schema and keeps a hand edit", () => {
    render(<SchemaWindow />);
    const box = screen.getByLabelText("Output schema") as HTMLTextAreaElement;
    expect(screen.getByRole("heading", { name: /Builder control/ })).toBeTruthy();
    expect(box.value).toContain("mapping.v1");
    expect(screen.getByTestId("schema-status").textContent).toMatch(/Valid/);

    fireEvent.change(box, { target: { value: "{bad" } });
    expect(screen.getByTestId("schema-status").textContent).toMatch(/Invalid JSON/);

    fireEvent.change(box, { target: { value: '{ "type": "object", "title": "Mine" }' } });
    expect(useStore.getState().nodes[0].data.schemaText).toContain("Mine");
    expect(screen.getByTestId("schema-status").textContent).toMatch(/Valid/);

    fireEvent.change(screen.getByLabelText("Predefined schema"), { target: { value: "repair.v1" } });
    expect(useStore.getState().nodes[0].data.schemaText).toContain("replace_mapping");
  });
});
