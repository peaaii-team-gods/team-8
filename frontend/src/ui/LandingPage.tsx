import { motion } from "framer-motion";
import SyntheticBadge from "./SyntheticBadge";

interface Props {
  mode: "simulated" | "live";
  onSignIn: () => void;
  onEnterCanvas: () => void;
  sessionError?: string | null;
}

export default function LandingPage({ mode, onSignIn, onEnterCanvas, sessionError }: Props) {
  return (
    <div className="relative min-h-full overflow-hidden" data-testid="landing-page">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#3b1470_0%,transparent_55%),radial-gradient(ellipse_at_80%_80%,#150826_0%,#070312_70%)]" />
      <div className="relative z-10 mx-auto flex min-h-full max-w-3xl flex-col justify-center px-6 py-16">
        <SyntheticBadge className="mb-6 self-start" />
        {sessionError && <p role="alert" className="mb-4 text-sm text-red-300">{sessionError}</p>}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-sm uppercase tracking-[0.35em] text-fuchsia-300/90"
        >
          Team 8 · Pea.AI
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display mt-3 text-5xl leading-tight text-[#f8f4ff] md:text-6xl"
        >
          Science data,<br />orchestrated.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-xl text-base text-white/75 md:text-lg"
        >
          Bounded agents map, QC, and repair contracts across synthetic lab panels, assay plates, and payer clearinghouses — without PHI.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {mode === "live" ? (
            <button type="button" className="glass px-5 py-2.5 text-sm font-semibold text-fuchsia-200" onClick={onSignIn}>
              Sign in
            </button>
          ) : (
            <button type="button" className="glass px-5 py-2.5 text-sm font-semibold text-fuchsia-200" onClick={onEnterCanvas}>
              Enter canvas
            </button>
          )}
          <a href="#how-it-works" className="glass px-5 py-2.5 text-sm text-white/80">
            How it works
          </a>
        </motion.div>
        <section id="how-it-works" className="mt-20 space-y-3 text-sm text-white/70">
          <h2 className="font-display text-xl text-white">How it works</h2>
          <p>1. Attach a synthetic science data lake to an agent.</p>
          <p>2. Agents propose bounded JSON contracts. Live tools require backend authorization.</p>
          <p>3. Explore repair proposals on the pilot storyboard. Model output is not verified acceptance.</p>
        </section>
      </div>
    </div>
  );
}
