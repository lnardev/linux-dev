# AGENTS.md

## What this repo is
Static HTML page (`index.html`) with separate CSS (`styles.css`) and JS (`app.js`) files — a searchable Linux/VPS command cheat-sheet ("Autogestión de un VPS"). The cheat-sheet content lives in `js/data.json` and is loaded via `fetch()`, so the site requires an HTTP server (local or GitHub Pages). No build tool, no package manager, no dependencies, no test suite, no CI.

## Running / verifying changes
- Serve the folder over HTTP and open http://localhost:8000: python -m http.server 8000 (or GitHub Pages). file:// no longer works — the browser blocks fetch() of js/data.json by CORS.
- There is nothing to compile, lint, or test — verify visually in the browser.

## Content structure (read before editing)
- All cheat-sheet content lives in `js/data.json`.
- `js/data.json` is a list of categories: `{ id, title, desc, items: [...] }`.
- Each item: `{ cmd, desc, flags?, warn?, danger? }`.
  - `flags`: optional HTML string shown in monospace below the description (use `<b>` for emphasis, e.g. explaining flags).
  - `warn`: optional string shown with a red ⚠ warning line.
  - `danger: true`: adds red-tinted border/styling to the card (for destructive commands).
- The page is rendered entirely client-side by JS that reads the JSON and builds the TOC nav + cards — do not hand-edit generated DOM/HTML sections (hero, cards, TOC), edit `js/data.json` instead.
- CSS is in `styles.css`, linked from `index.html`.
- Content language is Spanish — keep new entries in Spanish for consistency.

## Gotchas
- The page fetches js/data.json — it won't render when opened via file://. Serve over HTTP.
- The footer text `"22 categorías · generado para uso local · sin dependencias externas"` hardcodes the category count. If you add/remove a top-level category in `js/data.json`, update this number manually — it is NOT auto-computed.
- `cmd` and `desc` strings are escaped via `escapeHtml`/`escapeAttr` before rendering — don't pre-escape them yourself in `DATA`.
- Search filtering matches against `cmd + ' ' + desc` (lowercased) via `data-search` attribute — keep relevant keywords in `desc` if you want an item discoverable by search.
