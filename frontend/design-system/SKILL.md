---
name: towerguard-design
description: Use this skill to generate well-branded interfaces and assets for TowerGuard, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a dark-mode autonomous perimeter-security command-and-control platform.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.

## Fast orientation
- **Brand in one line:** dark-mode-only perimeter-intelligence C2. Calm when CLEAR, fully
  surfaced when ACTIVE/LOCKDOWN. Operators must trust it in 8 seconds.
- **Link `styles.css`** for all tokens + fonts (Inter + JetBrains Mono). Components live on
  `window.DesignSystem_91a397` after loading `_ds_bundle.js`.
- **The one rule that matters:** exactly one threat accent is active at a time. Wrap a scope
  in `data-threat="clear|elevated|active|lockdown"` and everything recolors via `--tg-accent*`.
- **Type split is the identity:** Inter for prose/headings, JetBrains Mono for every live
  number (battery %, GPS, IDs, timestamps). Never mix this up.
- **Forbidden:** gradients, drop shadows, glow, looping animation, emoji, large corner radii,
  RGB-gaming or consumer-app vibes. Depth = layered backgrounds + 1px hairlines only.

## Key files
- `README.md` — full brand guide (content + visual foundations, iconography, manifest)
- `HANDOFF.md` — team backlog + open work + ground rules (read this if you're picking up a task)
- `tokens/` — color / type / spacing / motion custom properties
- `components/core/` + `components/fleet/` — React primitives + `.prompt.md` usage notes
- `ui_kits/towerguard-dashboard/` — interactive Command Dashboard reference
- `assets/logos/`, `assets/imagery/` — logo set + drone feed mock
- `guidelines/*.card.html` — copyable foundation specimens
