export type ToastLevel = "info" | "ok" | "warn" | "error";

export interface ToastInput {
  level: ToastLevel;
  title: string;
  detail?: string;
  /** Milliseconds before the toast leaves. `0` stays until dismiss. Default is 4500. */
  timeoutMs?: number;
}

export interface ToastRecord extends ToastInput {
  id: string;
  title: string;
  detail?: string;
}

const SECRET = /password|authorization|bearer|access_token|api_key|csrf/i;

/** Drop a line that names a credential. Callers must still avoid passing secrets. */
export function toastText(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, 140);
  if (!trimmed || SECRET.test(trimmed)) return undefined;
  return trimmed;
}

export function toToastRecord(input: ToastInput, id: string): ToastRecord | null {
  const title = toastText(input.title);
  if (!title) return null;
  const detail = toastText(input.detail);
  return { ...input, id, title, detail };
}
