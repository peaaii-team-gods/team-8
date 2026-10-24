import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";

afterEach(() => cleanup());
import ReadinessPanel from "./ReadinessPanel";
import type { ReadinessPort } from "../adapters/readiness";
import type { WorkspaceBinding } from "../compile/toWorkflow";

const ready = (id: string): WorkspaceBinding => ({ workspace_id: id, project_id: "p", task_id: "t", status: "ready" });

describe("ReadinessPanel", () => {
  it("asks for a choice when several workspaces are ready and keeps the pick in the summary", async () => {
    const onSelect = vi.fn();
    const port: ReadinessPort = {
      capabilities: async () => ({ capabilities: { shell_execution: { status: "available" }, tool_execution: { status: "unavailable" } } }),
      workspaces: async () => [ready("ws-a"), ready("ws-b")],
    };
    const view = render(
      <ReadinessPanel mode="live" port={port} selectedWorkspaceId={null} onSelectWorkspace={onSelect} />,
    );
    expect(await screen.findByText(/will not guess/)).toBeTruthy();
    expect(screen.getByTestId("bound-workspace").textContent).toBe("Bound for next Run: none");
    expect(screen.getByTestId("cap-execute-shell").textContent).toBe("live");
    expect(screen.getByTestId("cap-execute-check").textContent).toBe("unavailable");
    fireEvent.click(screen.getByDisplayValue("ws-b"));
    expect(onSelect).toHaveBeenCalledWith("ws-b");
    view.rerender(<ReadinessPanel mode="live" port={port} selectedWorkspaceId="ws-b" onSelectWorkspace={onSelect} />);
    await waitFor(() => expect(screen.getByTestId("bound-workspace").textContent).toBe("Bound for next Run: ws-b"));
  });

  it("shows a read error instead of an empty success", async () => {
    const port: ReadinessPort = {
      capabilities: async () => null,
      workspaces: async () => { throw new Error("down"); },
    };
    render(<ReadinessPanel mode="live" port={port} selectedWorkspaceId={null} onSelectWorkspace={() => undefined} />);
    expect(await screen.findByText(/Could not read workspaces/)).toBeTruthy();
    expect(screen.getByText(/Capabilities unavailable/)).toBeTruthy();
    expect(screen.getByTestId("cap-execute-shell").textContent).toBe("unknown");
  });
});
