import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import UserBar from "./UserBar";

it("brands the bar Crucible Cast at text-sm", () => {
  const noop = () => undefined;
  render(
    <UserBar mode="simulated" username={null} signedIn={false} busy={false}
      onSignIn={noop} onSignOut={noop} onClear={noop} onPilot={noop} onExport={noop} onImport={noop} />,
  );
  const bar = screen.getByTestId("user-bar");
  expect(screen.getByText("Crucible Cast")).toBeTruthy();
  expect(screen.queryByText("Team 8")).toBeNull();
  expect(bar.className).toContain("text-sm");
  expect(bar.className).not.toContain("text-xs");
  expect(bar.className).toContain("overflow-x-auto");
});
