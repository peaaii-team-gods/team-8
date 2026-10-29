# Canvas app

The visual front end for the hospital pipeline. You draw agents and data sources on a canvas, link them, and run the pipeline. Each node shows live counts, checks and results.

## Run

```bash
npm install
npm run dev          # simulated mode by default, no account needed
npm test             # vitest suite
npm run build        # type-check and production build
npm run docs:check   # EXTENDING.md registry tables must match the code
npm run rehearse:mrf # offline rehearsal of the drift-and-repair story
```

`npm run pipeline:serve` starts the local hospital pipeline server (Python, localhost only). The dev server proxies `/api/pipeline` to it.

## Modes

- **Simulated (default):** the whole UI with a scripted run. No network calls. Good for demos without a backend.
- **Live:** enabled at build time for the public deployment. A sign-in panel appears. Access tokens stay in memory and are never written to browser storage. Live mode never quietly falls back to simulated.

## Demo shortcuts

- `?demo=1` opens a guided storyboard. `&autorun=1` starts it.
- `Ctrl+K` opens the command palette.
- **Tour** (top bar, the palette, or "Take the tour" on the landing page) walks each canvas control with a What / How / Why card. It opens on its own once per page load, never in `?demo=1`, and writes no browser storage.
- **Export snapshot** saves the graph to a local file. **Import** loads it back.

## Honest labels

Model output is always labelled a proposal. A stage turns green only after deterministic checks pass. When the model isn't available, the UI says "recorded path used".

## Extending

See [EXTENDING.md](EXTENDING.md) to add agent presets, data sources, output schemas and service features.