# TowerGuard — Team Handoff & Backlog

Notes from one builder to the next. Read `README.md` first (full brand guide), then
`SKILL.md`. This file is **open work**: grab a card, build it the TowerGuard way, check it in.

## Ground rules (don't break the compile)
- **Never hand-edit** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — the
  compiler regenerates them every turn. Run `check_design_system` after changes; fix what it
  reports until clean.
- **New component** = `Name.d.ts` + sibling `Name.jsx` in the same dir + a `@dsCard`-tagged
  `.html` thumbnail in that dir. Read it via `window.DesignSystem_91a397`, not a raw `.jsx`
  `<script src>`.
- **Tokens only.** Components reference `--tg-*` custom properties, never literal hex. New
  semantic colors go in `tokens/colors.css`; respect the `[data-threat]` accent scopes so
  the one-accent-at-a-time mechanic keeps working.
- **Type split is law:** Inter for prose/labels, JetBrains Mono for every live number. Never
  set a ticking value in Inter.
- **Forbidden:** gradients, drop shadows, glow, looping animation, emoji, big radii, RGB-gaming
  / consumer vibes. Depth = layered backgrounds + 1px hairlines.
- **Templates** live in `templates/<slug>/<Slug>.dc.html` (`dc_write`, `@template` comment on
  line 1, load via `ds-base.js`). Not root-level files.

## Backlog — prioritized

### P0 · Input & overlay layer (unblocks every future template)
The system has display primitives but **nothing interactive to author forms or modals**.
- `TextField` / `Select` / `Toggle` / `Slider` — mono input text, 4px radius, hairline border,
  `--tg-accent` focus ring, disabled state. Uppercase label via `.tg-label`.
- `Modal` / `Dialog` — 8px radius, the one allowed scrim (subtle blur behind feed-style modals).
  Confirm pattern for destructive ops (e.g. CONFIRM LOCKDOWN).
- `Toast` / `Notification` — transient, severity by color+word, no icon-only severity.
- Each ships `.d.ts` + `.jsx` + thumbnail card in `Components` group.

### P1 · More templates (one is thin)
Consumers need real starting points beyond the dashboard. Each = `templates/<slug>/`:
- **Fleet / list view** — table of drones (DroneCard data in rows), filter/sort by state.
- **Alert / incident detail** — single AlertRow expanded: timeline, feed still, actions
  (TAKEOVER / ESCALATE / CONTAIN), telemetry sidebar.
- **Auth / login** — minimal, authoritative, federal-buyer clean.
- **Settings** — nest config, thresholds, roster. Good showcase for the new input layer (P0).

### P1 · Map / RadarView primitive
A C2 platform with no spatial view is a gap. Top-down perimeter with nest, drone positions
(mono coord labels), threat-tinted zones. Flat, no gradients. Big lift — scope before starting.

### P2 · Documentation cards (make the DS tab read as guidance)
- Do/Don't cards per component.
- Component **state matrices** (default / hover / active / disabled) — currently undocumented.
- A "threat propagation" card explaining the `data-threat` mechanic visually.

### ~~P2 · Theme stress test~~ — DONE (2026-06-21)
Rendered the Command Dashboard in all four threat states. Accent propagation correct across
badge / NEST STATUS / MISSION / alert rail; contrast holds in all four incl. red-on-`#080810`
at LOCKDOWN; fleet-state + link semantic colors correctly do NOT follow the threat accent.
No issues. Note for whoever builds the input/overlay layer: copy is prop-driven and color is
token-driven — keep that split (don't bake threat words into component markup).

## Open questions for the human
- Is a branded **icon set** coming, or is Lucide the permanent substitute? (README flags it.)
- Light mode is explicitly out — confirm that holds for **print/PDF** exports too.
- Priority call: do we want **breadth** (more templates) or **depth** (input layer + docs)
  next? This file assumes depth-first (P0 inputs).

---
*Append your changes below as you go — date, who/what, what changed.*

### Changelog
- 2026-06-21 — Handoff file created. Backlog seeded from current-state review (8 components,
  97 tokens, 1 template). No component/token changes this pass.
- 2026-06-21 — Ran the four-state theme stress test (P2). Passed, no issues. Marked done.
