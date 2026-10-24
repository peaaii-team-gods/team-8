import { useEffect, useRef } from "react";
import { useStore } from "../../state/store";
import { focusFromActivity, type ActivityItem } from "./activity";

const LEVEL: Record<ActivityItem["level"], string> = {
  info: "border-white/25",
  ok: "border-emerald-300/70",
  warn: "border-amber-300/70",
  error: "border-rose-300/70",
};

export default function ActivityPanel({ onFocus }: { onFocus?: (nodeId: string) => void }) {
  const activity = useStore((state) => state.activity);
  const clearActivity = useStore((state) => state.clearActivity);
  const scroller = useRef<HTMLUListElement>(null);
  const focus = onFocus ?? focusNode;

  useEffect(() => {
    const list = scroller.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [activity.length]);

  return (
    <aside className="glass w-full p-4 text-sm" data-testid="activity-panel">
      <div className="mb-2 flex items-center gap-2">
        <h2 className="font-semibold">Activity</h2>
        <button
          type="button"
          className="ml-auto text-[10px] opacity-70 disabled:opacity-40"
          disabled={activity.length === 0}
          title={activity.length === 0 ? "Nothing to clear." : "Clear the timeline. The canvas stays."}
          onClick={() => clearActivity()}
        >
          Clear activity
        </button>
      </div>
      <p className="mb-2 text-[10px] opacity-60">This session only. Not loaded from the API. Rows are status labels, not model output.</p>
      {activity.length === 0 ? (
        <p className="text-xs opacity-70">Load a storyboard or Run. The story shows up here.</p>
      ) : (
        <ul ref={scroller} className="max-h-52 space-y-1.5 overflow-y-auto text-xs" aria-label="Session activity">
          {activity.map((item) => {
            const nodeId = focusFromActivity(item);
            const body = (
              <>
                <span className="opacity-50 tabular-nums">{formatAt(item.at)}</span>
                <span className="font-medium">{item.title}</span>
                {item.detail && <span className="opacity-60">{item.detail}</span>}
              </>
            );
            return (
              <li key={item.id} className={`border-l-2 pl-2 ${LEVEL[item.level]}`} data-testid={`activity-${item.kind}`}>
                {nodeId ? (
                  <button type="button" className="flex w-full flex-col items-start text-left" onClick={() => focus(nodeId)}>
                    {body}
                  </button>
                ) : (
                  <div className="flex flex-col items-start">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

function formatAt(at: number): string {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function focusNode(nodeId: string) {
  const { setUiState, nodes } = useStore.getState();
  setUiState({ kind: "menu", nodeId });
  useStore.setState({ nodes: nodes.map((node) => ({ ...node, selected: node.id === nodeId })) });
}
