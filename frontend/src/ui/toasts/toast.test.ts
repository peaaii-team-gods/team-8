import { describe, expect, it } from "vitest";
import { toastText, toToastRecord } from "./toast";

describe("toast text", () => {
  it("drops credential-shaped copy", () => {
    expect(toastText("login failed (401)")).toBe("login failed (401)");
    expect(toastText("password=hunter2")).toBeUndefined();
    expect(toastText("Bearer tok")).toBeUndefined();
    expect(toToastRecord({ level: "error", title: "Sign in failed", detail: "access_token=abc" }, "t1")?.detail).toBeUndefined();
  });
});
