import { describe, expect, it, vi } from "vitest";
import { buildSessionDownload, downloadSessionJson, serializeSessionDownload, sessionDownloadFilename } from "./sessionDownload";
import { emptyTelemetryUsage, type TelemetryEvent } from "./telemetryEvents";

const event = (): TelemetryEvent => ({
  schema_version: "canvas.telemetry.v1",
  session_id: "sess-abc",
  scenario_id: "pilot-storyboard",
  agent_node_id: "agent-1",
  agent_preset_id: "builder",
  lake_fixture_ids: ["clinical-lab"],
  t_start_ms: 1,
  t_end_ms: 2,
  status: "succeeded",
  completion_basis: "agent_reported",
  usage: emptyTelemetryUsage(),
  source: "simulated",
});

describe("session download", () => {
  it("builds a session document from telemetry already on the client", () => {
    const doc = buildSessionDownload({
      sessionId: "sess-abcdef12",
      scenarioId: "pilot-storyboard",
      events: [event()],
      exportedAt: "2026-10-23T22:00:00.000Z",
    });
    expect(doc.schema_version).toBe("canvas.session.v1");
    expect(doc.events).toHaveLength(1);
    expect(doc.events[0].completion_basis).toBe("agent_reported");
    const events = [event()];
    const dated = buildSessionDownload({
      sessionId: "sess-abcdef12",
      scenarioId: "pilot-storyboard",
      events,
      exportedAt: new Date("2026-10-23T22:00:00.000Z"),
    });
    expect(dated.exported_at).toBe("2026-10-23T22:00:00.000Z");
    expect(dated.events).not.toBe(events);
    expect(dated.events).toEqual(events);
    const empty = buildSessionDownload({ sessionId: "sess-2", events: [] });
    expect(empty.scenario_id).toBeNull();
    const text = serializeSessionDownload(doc);
    expect(text).toContain("pilot-storyboard");
    expect(text).not.toMatch(/password|authorization|bearer|api_key/i);
    expect(sessionDownloadFilename(doc)).toBe("canvas-session-2026-10-23T22-00-00-000Z.json");
  });

  it("downloads that JSON through an anchor", () => {
    const doc = buildSessionDownload({
      sessionId: "sess-abcdef12",
      scenarioId: null,
      events: [],
      exportedAt: "2026-10-23T22:00:00.000Z",
    });
    const click = vi.fn();
    const remove = vi.fn();
    const anchor = { href: "", download: "", rel: "", click, remove } as unknown as HTMLAnchorElement;
    if (typeof URL.createObjectURL !== "function") {
      Object.defineProperty(URL, "createObjectURL", { configurable: true, writable: true, value: () => "" });
      Object.defineProperty(URL, "revokeObjectURL", { configurable: true, writable: true, value: () => undefined });
    }
    vi.spyOn(document, "createElement").mockReturnValue(anchor);
    vi.spyOn(document.body, "appendChild").mockImplementation(() => anchor);
    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:session");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    downloadSessionJson(doc);
    expect(anchor.download).toBe(sessionDownloadFilename(doc));
    expect(anchor.href).toBe("blob:session");
    expect(click).toHaveBeenCalledOnce();
  });
});
