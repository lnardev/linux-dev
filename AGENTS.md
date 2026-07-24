# AGENTS.md

## What this repo is
Single self-contained static HTML page (`index.html`) — a searchable Linux/VPS command cheat-sheet ("Autogestión de un VPS"). No build tool, no package manager, no dependencies, no test suite, no CI. All HTML/CSS/JS lives inline in `index.html`.

## Running / verifying changes
- Just open `index.html` directly in a browser (double-click or `file://` path). No server, no build step needed.
- There is nothing to compile, lint, or test — verify visually in the browser.

## Content structure (read before editing)
- All cheat-sheet content lives in the `DATA` array inside the `<script>` tag (~line 173 onward).
- `DATA` is a list of categories: `{ id, title, desc, items: [...] }`.
- Each item: `{ cmd, desc, flags?, warn?, danger? }`.
  - `flags`: optional HTML string shown in monospace below the description (use `<b>` for emphasis, e.g. explaining flags).
  - `warn`: optional string shown with a red ⚠ warning line.
  - `danger: true`: adds red-tinted border/styling to the card (for destructive commands).
- The page is rendered entirely client-side by JS that reads `DATA` and builds the TOC nav + cards — do not hand-edit generated DOM/HTML sections (hero, cards, TOC), edit `DATA` instead.
- Content language is Spanish — keep new entries in Spanish for consistency.

## Gotchas
- The footer text `"17 categorías · generado para uso local · sin dependencias externas"` hardcodes the category count. If you add/remove a top-level category in `DATA`, update this number manually — it is NOT auto-computed.
- `cmd` and `desc` strings are escaped via `escapeHtml`/`escapeAttr` before rendering — don't pre-escape them yourself in `DATA`.
- Search filtering matches against `cmd + ' ' + desc` (lowercased) via `data-search` attribute — keep relevant keywords in `desc` if you want an item discoverable by search.
