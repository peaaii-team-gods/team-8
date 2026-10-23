/** Best-effort parse of public run / event / workspace payloads. Unknown shapes never throw. */

export type ChangeKind = "added" | "changed" | "removed";

export interface UsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUsd: number;
  source: "live" | "simulated" | "estimated";
}

export interface WorkspaceChange {
  path: string;
  kind: ChangeKind;
  summary?: string;
  agentId?: string;
}

export interface AgentMessage {
  id: string;
  fromId: string;
  toId: string;
  fromTitle: string;
  toTitle: string;
  text: string;
  at: number;
  edgeId?: string;
}

export interface ParsedTelemetry {
  usage: UsageMetrics;
  messages: string[];
  workspace: WorkspaceChange[];
  nextAfterSeq: number;
}

export const emptyUsage = (source: UsageMetrics["source"] = "estimated"): UsageMetrics => ({
  promptTokens: 0, completionTokens: 0, totalTokens: 0, costUsd: 0, source,
});

export const addUsage = (a: UsageMetrics, b: UsageMetrics): UsageMetrics => ({
  promptTokens: a.promptTokens + b.promptTokens,
  completionTokens: a.completionTokens + b.completionTokens,
  totalTokens: a.totalTokens + b.totalTokens,
  costUsd: a.costUsd + b.costUsd,
  source: a.source === "live" || b.source === "live" ? "live" : a.source === "simulated" || b.source === "simulated" ? "simulated" : "estimated",
});

export const hasUsage = (u?: UsageMetrics) => !!u && (u.totalTokens > 0 || u.promptTokens > 0 || u.completionTokens > 0 || u.costUsd > 0);

/** Prefer a later snapshot (run GET is typically cumulative). */
export const preferLatest = (prev: UsageMetrics, next?: UsageMetrics): UsageMetrics =>
  next && hasUsage(next) ? next : prev;

export const mergeChanges = (a: WorkspaceChange[], b: WorkspaceChange[]): WorkspaceChange[] => {
  const m = new Map<string, WorkspaceChange>();
  for (const x of [...a, ...b]) m.set(`${x.path}::${x.kind}`, x);
  return [...m.values()];
};

const num = (v: unknown): number => {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const pick = (obj: Record<string, unknown> | null | undefined, keys: string[]): number => {
  if (!obj) return 0;
  for (const k of keys) if (k in obj) return num(obj[k]);
  return 0;
};

/** Pull token/cost fields from a run body, event payload, or nested `usage`. */
export function usageFromUnknown(raw: unknown, source: UsageMetrics["source"] = "live"): UsageMetrics {
  const out = emptyUsage(source);
  if (!raw || typeof raw !== "object") return out;
  const root = raw as Record<string, unknown>;
  const nested = (root.usage && typeof root.usage === "object" ? root.usage : root) as Record<string, unknown>;
  out.promptTokens = pick(nested, ["prompt_tokens", "promptTokens", "tokens_prompt", "input_tokens", "tokens_in"]);
  out.completionTokens = pick(nested, ["completion_tokens", "completionTokens", "tokens_completion", "output_tokens", "tokens_out"]);
  out.totalTokens = pick(nested, ["total_tokens", "totalTokens", "tokens_total", "tokens"]) || (out.promptTokens + out.completionTokens);
  out.costUsd = pick(nested, ["cost_usd", "costUsd", "estimated_cost_usd", "usd"]);
  if (!out.costUsd) out.costUsd = pick(root, ["cost_usd", "costUsd"]);
  return out;
}

const asRecord = (v: unknown): Record<string, unknown> | null =>
  v && typeof v === "object" && !Array.isArray(v) ? v as Record<string, unknown> : null;

const changeKind = (v: unknown): ChangeKind => {
  const s = String(v ?? "").toLowerCase();
  if (s.includes("add") || s === "created" || s === "new") return "added";
  if (s.includes("remov") || s === "deleted" || s === "delete") return "removed";
  return "changed";
};

const fileFromUnknown = (raw: unknown, agentId?: string): WorkspaceChange | null => {
  if (typeof raw === "string" && raw.trim()) return { path: raw.trim(), kind: "changed", agentId };
  const o = asRecord(raw);
  if (!o) return null;
  const path = String(o.path ?? o.file ?? o.filename ?? o.name ?? "").trim();
  if (!path) return null;
  return { path, kind: changeKind(o.kind ?? o.op ?? o.action ?? o.status), summary: typeof o.summary === "string" ? o.summary : typeof o.detail === "string" ? o.detail : undefined, agentId };
};

const textFromEvent = (ev: Record<string, unknown>): string | null => {
  const candidates = [asRecord(ev.payload), asRecord(ev.data), ev].filter((x): x is Record<string, unknown> => !!x);
  for (const payload of candidates) {
    for (const k of ["content", "text", "message", "output", "reply", "delta"]) {
      const v = payload[k];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
  }
  return null;
};

export function parseEvents(body: unknown, agentId?: string): ParsedTelemetry {
  const parsed: ParsedTelemetry = { usage: emptyUsage("live"), messages: [], workspace: [], nextAfterSeq: 0 };
  const root = asRecord(body);
  if (!root) return parsed;
  parsed.nextAfterSeq = num(root.next_after_seq ?? root.nextAfterSeq);
  const events = Array.isArray(root.events) ? root.events : Array.isArray(body) ? body as unknown[] : [];
  for (const item of events) {
    const ev = asRecord(item);
    if (!ev) continue;
    const seq = num(ev.seq ?? ev.sequence);
    if (seq > parsed.nextAfterSeq) parsed.nextAfterSeq = seq;
    parsed.usage = addUsage(parsed.usage, usageFromUnknown(ev));
    parsed.usage = addUsage(parsed.usage, usageFromUnknown(asRecord(ev.payload)));
    const type = String(ev.type ?? ev.kind ?? ev.event ?? "").toLowerCase();
    const payload = asRecord(ev.payload) ?? asRecord(ev.data) ?? ev;
    if (type.includes("message") || type.includes("assistant") || type.includes("tick") || type.includes("output")) {
      const t = textFromEvent(ev);
      if (t) parsed.messages.push(t);
    }
    const files = payload.files ?? payload.paths ?? payload.changes ?? payload.workspace;
    if (Array.isArray(files)) {
      for (const f of files) {
        const c = fileFromUnknown(f, agentId);
        if (c) parsed.workspace.push(c);
      }
    }
    const one = fileFromUnknown(payload, agentId);
    if (one && (type.includes("file") || type.includes("workspace") || type.includes("patch") || type.includes("write"))) {
      parsed.workspace.push(one);
    }
  }
  if (!parsed.usage.totalTokens) parsed.usage.totalTokens = parsed.usage.promptTokens + parsed.usage.completionTokens;
  return parsed;
}

export function parseWorkspaceList(body: unknown, agentId?: string): WorkspaceChange[] {
  const root = asRecord(body);
  const list = Array.isArray(body) ? body
    : Array.isArray(root?.files) ? root!.files
    : Array.isArray(root?.changes) ? root!.changes
    : Array.isArray(root?.tree) ? root!.tree
    : [];
  return list.map((x) => fileFromUnknown(x, agentId)).filter((x): x is WorkspaceChange => !!x);
}

export const formatUsd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n);

export const formatTokens = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));
