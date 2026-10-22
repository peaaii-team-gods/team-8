import type { RhmAdapter, RunHandle, RunOutcome } from "../adapters/RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import type { CanvasNodeData } from "../registry/types";

export const POLL_INTERVAL_MS = 1_000;
export const POLL_TIMEOUT_MS = 120_000;

export interface PollOptions {
  intervalMs?: number;
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
  shouldStop?: () => boolean;
}

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const TERMINAL = ["succeeded", "failed", "cancelled"] as const;

/** Poll one run until a terminal status, bounded by interval + timeout. */
export async function pollUntilTerminal(adapter: RhmAdapter, handle: RunHandle, opts: PollOptions = {}): Promise<RunOutcome> {
  const intervalMs = opts.intervalMs ?? POLL_INTERVAL_MS;
  const timeoutMs = opts.timeoutMs ?? POLL_TIMEOUT_MS;
  const sleep = opts.sleep ?? defaultSleep;
  let waited = 0;
  for (;;) {
    const out = await adapter.poll(handle);
    if ((TERMINAL as readonly string[]).includes(out.status)) return out;
    if (opts.shouldStop?.()) return { ...out, status: "cancelled" };
    if (waited >= timeoutMs) return { ...out, status: "unknown", state: out.state ?? "poll-timeout" };
    await sleep(intervalMs);
    waited += intervalMs;
  }
}

export interface CompiledNode { nodeId: string; workflow: WorkflowV1 }

export interface RunNodesHooks {
  onStatus: (nodeId: string, status: CanvasNodeData["status"], output?: string) => void;
  onHandle?: (handle: RunHandle) => void;
  shouldStop?: () => boolean;
}

/** Outputs are model proposals (agent_reported), never verification. */
export const proposalLabel = (out: RunOutcome): string =>
  `${out.output ?? ""} (model proposal, agent_reported — not verification)`.trim();

/**
 * Run each compiled agent workflow through the selected adapter.
 * Node status follows the real run state: queued -> processing -> done/error.
 * Only handles created here are reported via onHandle (cancel scope).
 */
export async function runNodes(
  adapter: RhmAdapter,
  compiled: CompiledNode[],
  hooks: RunNodesHooks,
  pollOpts: PollOptions = {},
): Promise<RunHandle[]> {
  const handles: RunHandle[] = [];
  for (const { nodeId, workflow } of compiled) {
    if (hooks.shouldStop?.()) break;
    hooks.onStatus(nodeId, "queued");
    try {
      hooks.onStatus(nodeId, "processing");
      const handle = await adapter.run(nodeId, workflow);
      handles.push(handle);
      hooks.onHandle?.(handle);
      const out = await pollUntilTerminal(adapter, handle, { ...pollOpts, shouldStop: hooks.shouldStop });
      if (hooks.shouldStop?.() && out.status === "cancelled") break;
      hooks.onStatus(nodeId, out.status === "succeeded" ? "done" : "error", proposalLabel(out));
    } catch (err) {
      hooks.onStatus(nodeId, "error", err instanceof Error ? err.message : String(err));
    }
  }
  return handles;
}
