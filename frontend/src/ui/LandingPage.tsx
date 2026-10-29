import { motion } from "framer-motion";
import preview from "./fixtures/hospital-run.preview.json";

const STAGES: ReadonlyArray<readonly [string, string]> = [
  ["Scout", "finds and verifies the source."],
  ["Architect", "proposes a schema."],
  ["Refinery", "validates every row and proposes a repair when the source drifts."],
  ["Ledger", "writes the rows to SQLite."],
  ["Analyst", "writes a plain-language report."],
];

interface PreviewRow { billing_code: string; description: string; commercial_median: number; ma_median: number }
const PREVIEW_ROWS: PreviewRow[] = preview.rows;

interface Props {
  mode: "simulated" | "live";
  onSignIn: () => void;
  onEnterCanvas: () => void;
  onLoadMrf: () => void;
  onTour?: () => void;
  sessionError?: string | null;
}

export default function LandingPage({ mode, onSignIn, onEnterCanvas, onLoadMrf, onTour, sessionError }: Props) {
  return (
    <div className="relative min-h-full overflow-hidden" data-testid="landing-page">
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#3b1470_0%,transparent_55%),radial-gradient(ellipse_at_80%_80%,#150826_0%,#070312_70%)]" />
      <main id="main" tabIndex={-1} className="relative z-10 mx-auto flex min-h-full max-w-3xl flex-col justify-center px-6 py-16">
        {sessionError && <p role="alert" className="mb-4 text-sm text-red-300">{sessionError}</p>}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-sm uppercase tracking-[0.35em] text-fuchsia-300/90"
        >
          PEAAII - Team 8
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display mt-3 text-5xl leading-tight text-[#f8f4ff] md:text-6xl"
        >
          Crucible Cast.<br />Raw data in, checked records out.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-xl text-base text-white/75 md:text-lg"
        >
          An agentic data pipeline that finds a source file, maps its shape, validates every row, stores it in a SQL ledger, and writes a report the ledger has to back up.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <button type="button" data-testid="cta-primary" className="rounded-lg bg-emerald-400 px-6 py-3 text-base font-semibold text-[#070312] hover:bg-emerald-300" onClick={onLoadMrf}>
            Run MRF demo
          </button>
          {mode === "live" ? (
            <button type="button" data-testid="cta-secondary" className="glass px-5 py-3 text-base font-semibold text-fuchsia-200" onClick={onSignIn}>
              Sign in
            </button>
          ) : (
            <button type="button" data-testid="cta-secondary" className="glass px-5 py-3 text-base font-semibold text-fuchsia-200" onClick={onEnterCanvas}>
              Enter canvas
            </button>
          )}
          <a href="#how-it-works" className="self-center px-2 py-2 text-base text-white/85 underline underline-offset-4">
            How it works
          </a>
          {onTour && (
            <button type="button" data-testid="cta-tour" className="self-center px-2 py-2 text-base text-white/85 underline underline-offset-4" onClick={onTour}>
              Take the tour
            </button>
          )}
        </motion.div>
        <p data-testid="demo-hint" className="mt-3 max-w-xl text-base text-white/85">
          The MRF demo opens the hospital price pipeline on the canvas.{mode === "live" ? " Running it requires sign-in." : ""}
        </p>
        <section id="how-it-works" className="mt-20 space-y-3 text-base text-white/85">
          <h2 className="font-display text-xl text-white">How it works</h2>
          <p>MRF means Machine-Readable File, the CMS hospital price-transparency format.</p>
          <p>Scout → Architect → Refinery → Ledger → Analyst.</p>
          <ol className="list-decimal space-y-1 pl-6">
            {STAGES.map(([name, text]) => (
              <li key={name}><strong className="font-semibold text-white">{name}</strong> {text}</li>
            ))}
          </ol>
          <p>Models propose, code decides: nothing is kept until local checks pass. The demo streams a real public hospital price file (183,335 rows) into a ledger and a rate comparison report you can download.</p>
        </section>
        {PREVIEW_ROWS.length > 0 && <section data-testid="recorded-preview" className="mt-10 text-base text-white/85">
          <h2 className="font-display text-xl text-white">Recorded run preview</h2>
          <p className="text-sm">Largest commercial vs Medicare Advantage differences from a recorded run of this pipeline (recorded run, commit {preview.source_commit}).</p>
          <table className="mt-2 w-full text-left text-sm">
            <thead><tr><th>Code</th><th>Description</th><th>Commercial median</th><th>MA median</th></tr></thead>
            <tbody>
              {PREVIEW_ROWS.map((row) => (
                <tr key={row.billing_code}>
                  <td>{row.billing_code}</td><td>{row.description}</td>
                  <td>{row.commercial_median.toLocaleString("en-US")}</td><td>{row.ma_median.toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>}
      </main>
    </div>
  );
}
