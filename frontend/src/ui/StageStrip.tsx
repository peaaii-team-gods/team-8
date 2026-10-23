import { PIPELINE_STAGES } from "../run/observability";
import { useStore } from "../state/store";

export default function StageStrip() {
  const stage = useStore((s) => s.pipelineStage);
  if (stage === "idle") return null;
  return (
    <div className="glass flex flex-wrap items-center gap-1.5 px-3 py-2 text-[10px]" data-testid="stage-strip">
      {PIPELINE_STAGES.map((s) => {
        const current = s.id === stage;
        return (
          <span
            key={s.id}
            className={`rounded-full px-2 py-0.5 ${current ? "bg-fuchsia-400/30 text-fuchsia-100" : "bg-white/5 text-white/40"}`}
          >
            {s.label}
          </span>
        );
      })}
    </div>
  );
}
