import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { TOUR_STEPS, type TourStep } from "./tourSteps";

const GAP = 12;
const EDGE = 16;

// In memory only: the canvas writes no browser storage, so the tour auto-opens once per page load.
let seen = false;
export const tourSeen = () => seen;
export const markTourSeen = (value = true) => { seen = value; };

const findTarget = (step: TourStep | undefined) => (step?.target ? document.querySelector<HTMLElement>(step.target) : null);
const onScreen = (step: TourStep) => !step.target || !!findTarget(step);

interface Box { top: number; left: number; width: number; height: number }

/** Below, above, left, then right of the target; centered when none fits. */
function place(target: Box | null, card: { width: number; height: number }): { top: number; left: number } {
  const vw = window.innerWidth, vh = window.innerHeight;
  const center = { top: Math.max(EDGE, (vh - card.height) / 2), left: Math.max(EDGE, (vw - card.width) / 2) };
  if (!target) return center;
  const clampX = (x: number) => Math.min(Math.max(EDGE, x), vw - card.width - EDGE);
  const clampY = (y: number) => Math.min(Math.max(EDGE, y), vh - card.height - EDGE);
  const bottom = target.top + target.height, right = target.left + target.width;
  if (bottom + GAP + card.height <= vh - EDGE) return { top: bottom + GAP, left: clampX(target.left) };
  if (target.top - GAP - card.height >= EDGE) return { top: target.top - GAP - card.height, left: clampX(target.left) };
  if (target.left - GAP - card.width >= EDGE) return { top: clampY(target.top), left: target.left - GAP - card.width };
  if (right + GAP + card.width <= vw - EDGE) return { top: clampY(target.top), left: right + GAP };
  return center;
}

interface Props {
  open: boolean;
  onClose: () => void;
  /** Offered on the first card when the canvas is empty, so node/Create/Run steps have something to show. */
  onLoadPilot?: () => void;
  canvasEmpty?: boolean;
}

export default function WelcomeTour({ open, onClose, onLoadPilot, canvasEmpty }: Props) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState<Box | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const next = useRef<HTMLButtonElement>(null);
  const step = TOUR_STEPS[index];

  useEffect(() => { if (open) setIndex(0); }, [open]);

  const close = useCallback(() => { markTourSeen(); onClose(); }, [onClose]);

  const go = useCallback((dir: 1 | -1) => {
    let i = index + dir;
    while (i >= 0 && i < TOUR_STEPS.length && !onScreen(TOUR_STEPS[i])) i += dir;
    if (i >= TOUR_STEPS.length) close();
    else if (i >= 0) setIndex(i);
  }, [index, close]);

  const measure = useCallback(() => {
    const el = findTarget(step);
    if (!el) { setBox(null); return; }
    const r = el.getBoundingClientRect();
    setBox({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  useLayoutEffect(() => {
    if (!open) return;
    findTarget(step)?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => { window.removeEventListener("resize", measure); window.removeEventListener("scroll", measure, true); };
  }, [open, step, measure]);

  useLayoutEffect(() => {
    if (!open || !card.current) return;
    setPos(place(box, { width: card.current.offsetWidth, height: card.current.offsetHeight }));
  }, [open, box, index]);

  useEffect(() => { if (open) next.current?.focus(); }, [open, index]);

  useEffect(() => {
    if (!open) return;
    // Capture phase on window, so canvas shortcuts (Esc, ?, Ctrl+Enter, Delete) never fire under the tour.
    const onKey = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (event.key === "Escape") { event.preventDefault(); close(); }
      else if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      else if (event.key === "Tab" && card.current) {
        const items = card.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (items.length === 0) return;
        const first = items[0], last = items[items.length - 1];
        const inside = card.current.contains(document.activeElement);
        if (event.shiftKey && (!inside || document.activeElement === first)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (!inside || document.activeElement === last)) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, go, close]);

  if (!open || !step) return null;

  const visible = TOUR_STEPS.filter(onScreen);
  const position = Math.max(visible.indexOf(step), 0) + 1;
  const last = position === visible.length;
  const pad = 6;

  return createPortal(
    <div data-testid="welcome-tour" onClick={(event) => event.stopPropagation()}>
      <div className="fixed inset-0 z-[60]" aria-hidden="true" style={box ? undefined : { background: "rgba(7,3,18,.72)" }} />
      {box && (
        <div
          aria-hidden="true"
          data-testid="tour-spotlight"
          className="pointer-events-none fixed z-[61] rounded-2xl ring-2 ring-fuchsia-300 transition-all duration-200"
          style={{ top: box.top - pad, left: box.left - pad, width: box.width + pad * 2, height: box.height + pad * 2, boxShadow: "0 0 0 9999px rgba(7,3,18,.72)" }}
        />
      )}
      <motion.div
        key={step.id}
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass fixed z-[62] w-[min(340px,calc(100vw-32px))] bg-[#140a24]/95 p-4 text-sm"
        style={pos ?? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="flex items-baseline justify-between gap-2">
          <h2 id="tour-title" className="font-display text-base text-fuchsia-100">{step.title}</h2>
          <span className="text-[10px] opacity-60" data-testid="tour-count">{position} / {visible.length}</span>
        </div>
        <dl className="mt-2 space-y-1.5 text-xs">
          <div><dt className="inline font-semibold text-fuchsia-300">What </dt><dd className="inline text-white/85">{step.what}</dd></div>
          <div><dt className="inline font-semibold text-emerald-300">How </dt><dd className="inline text-white/85">{step.how}</dd></div>
          <div><dt className="inline font-semibold text-amber-200">Why </dt><dd className="inline text-white/85">{step.why}</dd></div>
        </dl>
        {step.id === "welcome" && canvasEmpty && onLoadPilot && (
          <button
            type="button"
            className="mt-3 w-full rounded-full bg-fuchsia-400/90 px-4 py-2 text-xs font-semibold text-[#1a0b28]"
            onClick={() => { onLoadPilot(); window.setTimeout(() => go(1), 0); }}
          >
            Load Pilot storyboard and tour
          </button>
        )}
        <div className="mt-3 flex items-center gap-2">
          <button type="button" className="text-xs opacity-70" onClick={close}>Skip</button>
          <span className="ml-auto" />
          <button type="button" className="glass px-3 py-1 text-xs disabled:opacity-40" disabled={position === 1} onClick={() => go(-1)}>Back</button>
          <button ref={next} type="button" className="glass px-3 py-1 text-xs text-fuchsia-100" onClick={() => (last ? close() : go(1))}>{last ? "Done" : step.id === "welcome" && canvasEmpty && onLoadPilot ? "Tour as-is" : "Next"}</button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
