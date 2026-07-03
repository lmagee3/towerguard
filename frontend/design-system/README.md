# TowerGuard Design System

**Persistent Perimeter Intelligence** — the design system for TowerGuard, an AI-native
perimeter security platform that turns low-cost autonomous drone fleets into persistent
security infrastructure.

> Designed for operators who need to trust the system in **8 seconds** and know exactly
> what to do when it matters. Dark mode only. No toggle.

---

## What TowerGuard is

TowerGuard is **not a drone company** — it's a *Perimeter Intelligence Platform*. A
deployed "nest" holds 3–4 low-cost drones in permanent rotation (one airborne, one ready,
one charging, one in reserve) so coverage is **persistent, not episodic**. The AI detects
and flags; the human authorizes; manual takeover is always one click away.

Two markets reinforce each other: **commercial** (ranches, warehouses, construction sites,
campuses — fast revenue) and **government / GovCon** (military installations, critical
infrastructure, border security — scale + non-dilutive funding). Federal buyers are the
aspirational audience: the work must read **clean, authoritative, premium**.

**Current phase:** TowerGuard Sim — a believable command-and-control prototype, no hardware.

### Sources used to build this system
- **GitHub:** [`lmagee3/towerguard`](https://github.com/lmagee3/towerguard) — product docs
  (`VISION.md`, `ARCHITECTURE.md`, `OPUS_START_HERE.md`) and the `frontend/dashboard` React
  prototype (`src/App.tsx`) that defines the real dashboard layout: fleet cards, alert feed,
  takeover / RTN / feed controls, live-feed modal, battery + GPS telemetry. Explore the repo
  to design more faithfully against the product.
- **Brand kit (uploaded):** the TowerGuard logo set — hexagonal "nest" mark, horizontal
  and stacked lockups, badge. Now in `assets/logos/`.
- **Imagery:** `frontend/dashboard/public/drone_feed_mock.png` → `assets/imagery/drone-feed-mock.jpg`
  (night IR perimeter feed with HUD overlay).

> Note on the prototype: the repo's `App.tsx` uses a generic slate/blue Vite palette. This
> system **supersedes** that with the refined brand color language below. Keep the layout,
> drop the slate.

---

## Content fundamentals — how TowerGuard writes

The voice is **operational, terse, and certain** — a mission console, not a consumer app.

- **Tone:** calm authority under pressure. Plain declaratives. *"Coverage becomes
  persistent, not episodic." "The nest is the beachhead. The platform is the moat."*
- **Casing:** `UPPERCASE` for states, labels, IDs and system strings — `CLEAR`, `PATROLLING`,
  `NEST STATUS`, `WT-01`, `PERIMETER SECURED`. Title/sentence case for narrative prose.
- **Person:** mostly impersonal/system voice ("Movement detected near East Gate"). Doctrine
  copy uses "we" for the company stance. Rarely addresses "you" directly.
- **Data is literal and exact:** `BAT 78%`, `145ft AGL`, `40°37'51"N`, `03:17:42Z`, `WT-02`.
  Coordinates, headings, timestamps and IDs are always concrete, always mono.
- **Verbs are commands:** `TAKEOVER`, `RTN`, `DISPATCH GUARD`, `ESCALATE`, `CONTAIN`.
- **No marketing fluff, no exclamation, no emoji.** Severity is shown by color + word
  (`CRITICAL`, `HIGH`), never by punctuation. Checkmarks/crosses appear only in doctrine docs,
  never in the product UI.
- **Threat lexicon (memorize):** `CLEAR → ELEVATED → ACTIVE → LOCKDOWN`. Nest states:
  `SECURED / WATCH / ENGAGING / BREACH`. Fleet states: `PATROLLING / READY / CHARGING /
  RTN / MAINTENANCE`.

---

## Visual foundations

**The design language is "Data/Zen Minimalist Techno Punk"** — the tension between calm
luxury and raw operational precision. References: Vercel dashboard, Linear, Palantir Gotham,
Teenage Engineering, military COP displays. *Not* RGB gaming, cluttered NVR/DVR software,
friendly consumer app, or surveillance-cam aesthetic.

**The core mechanic — the UI mirrors the threat state.** Near-empty when `CLEAR`; everything
surfaces in `ACTIVE` / `LOCKDOWN`. Exactly **one accent color is active at a time**, and it
propagates across the entire interface. Components reference only the semantic
`--tg-accent*` tokens; a single `[data-threat="…"]` attribute on a scope re-points them.

- **Color:** three near-black backgrounds (`#080810` deep / `#0F0F1A` surface / `#161625`
  elevated) + an inset well (`#050509`). Ink descends `#E8E8F0 → #6B6B8A → #3A3A55`. Borders
  are a single hairline `#1E1E32`. Threat accents: teal `#00D4B1` (CLEAR), amber `#F5A623`
  (ELEVATED), orange `#FF5733` (ACTIVE), red `#FF2020` (LOCKDOWN).
- **Type:** **Inter** for headings + narrative; **JetBrains Mono** for *all* live data
  (battery %, GPS, timestamps, drone IDs, coordinates). The mix **is** the identity — never
  set a ticking number in Inter. Mono uses tabular figures so columns stay aligned. Section
  labels are `UPPERCASE`, 12px, `0.08em` tracking, secondary ink.
- **Backgrounds:** flat color only. **No gradients. No background images** except real
  sensor/feed imagery (cool, nocturnal, IR/low-light, slightly desaturated, HUD-overlaid).
  No textures, no patterns.
- **Depth:** comes from **layering the three backgrounds + 1px hairlines only**. **No drop
  shadows. No glow. No blur** except a subtle scrim behind the feed modal.
- **Corners:** small and technical — `2px` bars/badges, `4px` buttons/inputs, `6px` cards/panels,
  `8px` modals. Sharpness is brand; never large rounding. Pills (`999px`) only for status dots.
- **Cards / panels:** surface background, 1px `#1E1E32` border, 6px radius, **24px minimum
  interior padding**, optional uppercase label header with a right-aligned action slot. Flat —
  no shadow, ever.
- **Motion:** purposeful, never decorative. `120ms` hover/press, `200ms` state, `320ms`
  threat propagation, all on `cubic-bezier(0.2,0,0,1)`. **No looping animations.** No bounce.
  Respects `prefers-reduced-motion`.
- **Hover:** ghost elements fill to the elevated surface; borders step from `#1E1E32` to
  `#2A2A45`. **Press:** color/opacity shift, no scale toys.
- **Transparency:** only for tinted threat fills (flat ~14% accent over surface) and the feed
  modal scrim. Never frosted-glass panels.
- **Imagery vibe:** cool, dark, nocturnal, documentary. Mono HUD caps overlaid at the corners.

---

## Iconography

TowerGuard ships **no proprietary icon set** — the repo's `icons.svg` was Vite-template
social glyphs (discarded). This system uses **[Lucide](https://lucide.dev)** via CDN: thin
`1.5px` stroke, monochrome, square feel — consistent with the Linear/Vercel lineage.

- **Substitution flag:** Lucide is a substitute, chosen for stroke weight + geometric
  restraint. If a branded icon set is produced later, swap it in and update this section.
- **Usage:** icons are `var(--tg-text-primary)` by default, `var(--tg-text-secondary)` when
  secondary, and `var(--tg-accent)` only when active/selected. `22px` in `56px` boxes for
  toolbar tiles; `16–18px` inline. Common glyphs: `shield, radar, plane, battery-medium,
  triangle-alert, video, navigation, map-pin`.
- **Status semaphores** use filled color dots (not icons). **No emoji. No unicode-as-icon**
  beyond the occasional `●` REC dot and `✕` close. See *Brand → Iconography* card.
- Load: `<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>`
  then `lucide.createIcons()`.

---

## Index / manifest

**Global entry:** `styles.css` (import-only) → `tokens/{fonts,colors,typography,spacing,base}.css`.
Consumers link `styles.css` alone. Namespace for the compiled bundle: **`DesignSystem_91a397`**
(`const { Button } = window.DesignSystem_91a397`).

**Tokens** (`tokens/`)
- `colors.css` — backgrounds, ink, borders, threat palette + the `[data-threat]` accent scopes
- `typography.css` — families, scale, weights, tracking
- `spacing.css` — 4px space scale, radii, motion, z-layers
- `base.css` — body reset + `.tg-mono` / `.tg-label` / `.tg-hud` helpers

**Components** (`components/`) — namespace `window.DesignSystem_91a397`
- `core/` — `Button`, `ThreatBadge`, `StatusPill`, `BatteryMeter`, `Panel`, `DataField`
- `fleet/` — `DroneCard`, `AlertRow`

**UI kit** (`ui_kits/towerguard-dashboard/`)
- `index.html` — interactive Command Dashboard. Step the **SIM** scenario
  (`ESCALATE →`) to drive the perimeter `CLEAR → ELEVATED → ACTIVE → LOCKDOWN` and watch the
  whole UI recolor + progressively surface the live feed and guard dispatch.
- `Header.jsx`, `FeedView.jsx` (FeedPanel + FeedModal), `App.jsx`

**Template** (`templates/command-dashboard/`) — `CommandDashboard.dc.html`, a one-file
starting point consuming projects can copy. A static Command Dashboard with a **threat**
tweak (`clear / elevated / active / lockdown`) that recolors the entire frame. Loads the
system via `ds-base.js`.

**Foundations** (`guidelines/*.card.html`) — specimen cards shown in the Design System tab,
grouped Colors / Type / Spacing / Brand.

**Assets** (`assets/`)
- `logos/` — `towerguard-mark.png` (hex nest), `towerguard-horizontal.png`, `-stacked.png`,
  `-badge.png`, `-horizontal-dark.png`, `favicon.svg`
- `imagery/` — `drone-feed-mock.jpg`

**Skill:** `SKILL.md` — Agent-Skills-compatible entry point.

**Handoff:** `HANDOFF.md` — open work, prioritized backlog, ground rules for not breaking the
compile, and open questions for the human. **New teammate? Start there.**

---

*Built under Malleus Prendere · Chaos Monk product line.*
