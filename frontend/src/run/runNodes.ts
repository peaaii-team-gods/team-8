import type { RhmAdapter, RunHandle, RunOutcome } from "../adapters/RhmAdapter";
import type { WorkflowV1 } from "../compile/toWorkflow";
import type { CanvasEdge, CanvasNode } from "../state/store";
import type { CanvasNodeData } from "../registry/types";
import { addUsage, emptyUsage, hasUsage, mergeChanges, preferLatest, type ParsedTelemetry, type UsageMetrics, type WorkspaceChange } from "./telemetry";
import { agentRunOrder, incomingAgentIds, outgoingAgentEdges, withHandoff } from "./handoff";
import { evaluateMapping, MRF_RETRY_HINT, mrfHandoffInputs, type MrfEvaluation } from "../mrf/oracle";
import { interpretMrfReply, isMrfPreset } from "../mrf/validate";
import type { MrfMapping, NamedCheck } from "../mrf/types";

export const POLL_INTERVAL_MS = 1_000;
export const POLL_TIMEOUT_MS = 120_000;

export interface PollOptions {
  intervalMs?: number;
  timeoutMs?: number;
  sleep?: (ms: number) => Promise<void>;
  shouldStop?: () => boolean;
  onEvents?: (handle: RunHandle, telemetry: ParsedTelemetry) => void;
}

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const TERMINAL = ["succeeded", "failed", "cancelled"] as const;

/** Poll one run until a terminal status, bounded by interval + timeout. */
export async function pollUntilTerminal(adapter: RhmAdapter, handle: RunHandle, opts: PollOptions = {}): Promise<RunOutcome> {
  const intervalMs = opts.intervalMs ?? POLL_INTERVAL_MS;
  const timeoutMs = opts.timeoutMs ?? POLL_TIMEOUT_MS;
  const sleep = opts.sleep ?? defaultSleep;
  let waited = 0;
  let afterSeq = 0;
  let snapshot = emptyUsage("estimated");
  let eventUsage = emptyUsage("estimated");
  let workspace: WorkspaceChange[] = [];
  for (;;) {
    const out = await adapter.poll(handle);
    snapshot = preferLatest(snapshot, out.usage);
    if (out.workspace?.length) workspace = mergeChanges(workspace, out.workspace);
    if (adapter.events) {
      const ev = await adapter.events(handle, afterSeq);
      afterSeq = Math.max(afterSeq, ev.nextAfterSeq);
      if (hasUsage(ev.usage)) eventUsage = addUsage(eventUsage, ev.usage);
      workspace = mergeChanges(workspace, ev.workspace);
      opts.onEvents?.(handle, ev);
    }
    const usage = hasUsage(snapshot) ? snapshot : hasUsage(eventUsage) ? eventUsage : out.usage;
    const merged: RunOutcome = { ...out, usage, workspace: workspace.length ? workspace : out.workspace };
    if ((TERMINAL as readonly string[]).includes(out.status)) return merged;
    if (opts.shouldStop?.()) return { ...merged, status: "cancelled" };
    if (waited >= timeoutMs) return { ...merged, status: "unknown", state: out.state ?? "poll-timeout" };
    await sleep(intervalMs);
    waited += intervalMs;
  }
}

export interface CompiledNode { nodeId: string; workflow: WorkflowV1 }

export interface MrfRunOptions {
  fixture: unknown;
  onEvaluated?: (nodeId: string, evaluation: MrfEvaluation) => void;
}

export interface RunNodesHooks {
  onStatus: (nodeId: string, status: CanvasNodeData["status"], output?: string) => void;
  onHandle?: (handle: RunHandle) => void;
  shouldStop?: () => boolean;
  onTelemetry?: (nodeId: string, usage: UsageMetrics, workspace: WorkspaceChange[]) => void;
  onOutcome?: (nodeId: string, outcome: RunOutcome) => void;
  onUtterance?: (fromId: string, text: string, toIds: string[]) => void;
  onEdgeActive?: (edgeIds: string[], active: boolean) => void;
  graph?: { nodes: CanvasNode[]; edges: CanvasEdge[] };
  mrf?: MrfRunOptions;
}

/** Outputs are model proposals (agent_reported), never verification. */
export const proposalLabel = (out: RunOutcome): string =>
  `${out.output ?? ""} (model proposal, agent_reported — not verification)`.trim();

/**
 * Run each compiled agent workflow through the selected adapter.
 * Node status follows the real run state: queued -> processing -> done/error.
 * Only handles created here are reported via onHandle (cancel scope).
 * When graph edges exist, upstream agent outputs are handed to downstream workflows.
 * MRF agents skip stuffed handoff.ts text: they receive mapping JSON + check results only.
 */
export async function runNodes(
  adapter: RhmAdapter,
  compiled: CompiledNode[],
  hooks: RunNodesHooks,
  pollOpts: PollOptions = {},
): Promise<RunHandle[]> {
  const handles: RunHandle[] = [];
  const byId = new Map(compiled.map((c) => [c.nodeId, c]));
  const nodes = hooks.graph?.nodes ?? compiled.map((c) => ({ id: c.nodeId, type: "agent", position: { x: 0, y: 0 }, data: { kind: "agent" as const, presetId: "", title: c.nodeId, description: "", color: "" } }));
  const edges = hooks.graph?.edges ?? [];
  const order = agentRunOrder(nodes, edges).filter((id) => byId.has(id));
  const leftover = compiled.map((c) => c.nodeId).filter((id) => !order.includes(id));
  const outputs = new Map<string, { title: string; output: string }>();
  let mrfMapping: MrfMapping | null = null;
  let mrfChecks: NamedCheck[] = [];

  for (const nodeId of [...order, ...leftover]) {
    if (hooks.shouldStop?.()) break;
    const compiledNode = byId.get(nodeId);
    if (!compiledNode) continue;
    const node = nodes.find((n) => n.id === nodeId);
    const title = node?.data.title ?? nodeId;
    const presetId = node?.data.presetId ?? "";
    const mrfAgent = !!hooks.mrf && isMrfPreset(presetId);
    const incoming = incomingAgentIds(nodeId, edges, nodes)
      .map((id) => outputs.get(id))
      .filter((x): x is { title: string; output: string } => !!x);
    const workflow = mrfAgent
      ? { ...compiledNode.workflow, inputs: { ...compiledNode.workflow.inputs, ...mrfHandoffInputs(mrfMapping, mrfChecks) } }
      : withHandoff(compiledNode.workflow, incoming);
    const feedEdges = edges.filter((e) => e.target === nodeId).map((e) => e.id);
    hooks.onStatus(nodeId, "queued");
    try {
      hooks.onStatus(nodeId, "processing");
      if (feedEdges.length) hooks.onEdgeActive?.(feedEdges, true);

      const spoken: string[] = [];
      const downTargets = () => outgoingAgentEdges(nodeId, edges, nodes).map((e) => e.target);
      const say = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || spoken.includes(trimmed)) return;
        spoken.push(trimmed);
        hooks.onUtterance?.(nodeId, trimmed, downTargets());
      };
      let rolling = emptyUsage(adapter.mode === "live" ? "live" : "estimated");
      let files: WorkspaceChange[] = [];

      const runOnce = async (wf: WorkflowV1): Promise<RunOutcome | null> => {
        const handle = await adapter.run(nodeId, wf);
        handles.push(handle);
        hooks.onHandle?.(handle);
        if (hooks.shouldStop?.()) {
          await adapter.cancel(handle).catch(() => undefined);
          return null;
        }
        const out = await pollUntilTerminal(adapter, handle, {
          ...pollOpts,
          shouldStop: hooks.shouldStop,
          onEvents: (h, ev) => {
            pollOpts.onEvents?.(h, ev);
            if (hasUsage(ev.usage)) rolling = addUsage(rolling, ev.usage);
            if (ev.workspace.length) files = mergeChanges(files, ev.workspace);
            if (hasUsage(rolling) || files.length) hooks.onTelemetry?.(nodeId, rolling, files);
            for (const m of ev.messages) say(m);
          },
        });
        return out;
      };

      let out = await runOnce(workflow);
      if (!out || hooks.shouldStop?.()) {
        if (feedEdges.length) hooks.onEdgeActive?.(feedEdges, false);
        break;
      }

      let retried = false;
      if (mrfAgent && out.status === "succeeded") {
        let interpreted = interpretMrfReply(presetId, out.output);
        if (!interpreted.ok && interpreted.error === "invalid_json") {
          retried = true;
          const retryWf = { ...workflow, inputs: { ...workflow.inputs, retry: MRF_RETRY_HINT } };
          const retryOut = await runOnce(retryWf);
          if (!retryOut || hooks.shouldStop?.()) {
            if (feedEdges.length) hooks.onEdgeActive?.(feedEdges, false);
            break;
          }
          out = retryOut;
          interpreted = interpretMrfReply(presetId, out.output);
        }
        if (out.status === "succeeded") {
          if (!interpreted.ok) {
            const evaluation: MrfEvaluation = {
              mapping: mrfMapping, applied: null, checks: mrfChecks, passed: false,
              invalidProposal: true, retried,
            };
            hooks.mrf?.onEvaluated?.(nodeId, evaluation);
            hooks.onStatus(nodeId, "error", "invalid proposal");
            if (out.usage || out.workspace?.length) hooks.onTelemetry?.(nodeId, out.usage ?? emptyUsage(adapter.mode), out.workspace ?? []);
            hooks.onOutcome?.(nodeId, { ...out, status: "failed", output: "invalid proposal" });
            if (feedEdges.length) hooks.onEdgeActive?.(feedEdges, false);
            continue;
          }
          if (interpreted.mapping) {
            const evaluated = evaluateMapping(hooks.mrf!.fixture, interpreted.mapping);
            mrfMapping = evaluated.mapping;
            mrfChecks = evaluated.checks;
            hooks.mrf?.onEvaluated?.(nodeId, { ...evaluated, invalidProposal: false, retried });
          } else {
            hooks.mrf?.onEvaluated?.(nodeId, {
              mapping: mrfMapping, applied: null, checks: mrfChecks, passed: false,
              invalidProposal: false, retried, declined: interpreted.declined,
            });
          }
        }
      }

      const labelled = proposalLabel(out);
      hooks.onStatus(nodeId, out.status === "succeeded" ? "done" : "error", labelled);
      if (out.usage || out.workspace?.length) hooks.onTelemetry?.(nodeId, out.usage ?? emptyUsage(adapter.mode), out.workspace ?? []);
      if (adapter.workspaceChanges && workflow.workspace_id) {
        const extra = await adapter.workspaceChanges(workflow.workspace_id, nodeId).catch(() => []);
        if (extra.length) hooks.onTelemetry?.(nodeId, out.usage ?? emptyUsage(adapter.mode), extra);
      }
      if (hooks.shouldStop?.()) break;
      hooks.onOutcome?.(nodeId, out);
      outputs.set(nodeId, { title, output: out.output ?? labelled });
      say(out.output || spoken.at(-1) || "");
      const down = outgoingAgentEdges(nodeId, edges, nodes);
      if (down.length) hooks.onEdgeActive?.(down.map((e) => e.id), true);
      if (feedEdges.length) hooks.onEdgeActive?.(feedEdges, false);
    } catch (err) {
      if (hooks.shouldStop?.()) break;
      hooks.onStatus(nodeId, "error", err instanceof Error ? err.message : String(err));
      hooks.onOutcome?.(nodeId, { nodeId, status: "failed" });
      if (feedEdges.length) hooks.onEdgeActive?.(feedEdges, false);
    }
  }
  return handles;
}
