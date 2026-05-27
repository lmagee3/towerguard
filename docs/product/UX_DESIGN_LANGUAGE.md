# TowerGuard — UX Design Language

## The Philosophy

**The interface mirrors the threat.**

When nothing is happening, TowerGuard looks like a luxury product. Near-empty. Dark. A single heartbeat. The system breathes.

When something is happening, information surfaces — controlled, organized, immediate. The dashboard becomes a command center. Not chaotic. More of everything, in its right place.

**The user should feel two things at all times:**
1. In CLEAR state: *I am protected. I don't need to think about this.*
2. In ACTIVE/LOCKDOWN state: *I know exactly what is happening and exactly what I can do about it.*

This is calm technology. The interface is as quiet as the situation allows — and as loud as the situation demands.

---

## Buyer Profile

The TowerGuard buyer is not a security hobbyist. They are:

- The rancher with 400 acres and a history of equipment theft
- The warehouse operations director signing the security contract
- The facility manager at a data center or utility substation
- The private security firm owner deploying for a premium client
- The base commander evaluating an autonomous patrol system

**They are busy. They are skeptical. They are expensive.**

They will not read a manual. They will not attend training. They will open the dashboard, look at it for 8 seconds, and either trust it or dismiss it.

The design earns that trust in 8 seconds or it fails.

---

## Aesthetic Direction

**Data/Zen Minimalist Techno Punk**

The tension between these words is the point:

| Zen Minimalist | Techno Punk |
|---|---|
| Negative space | Monospaced readouts |
| Typography-first | Sharp geometric edges |
| Calm | Raw technical confidence |
| Nothing unnecessary | Everything precise |
| Luxury stillness | Operational gravity |

**References:**
- Vercel dashboard — clean, dark, fast, technical
- Linear — minimal, keyboard-native, confident
- Palantir Gotham — data-dense but organized, operationally serious
- Teenage Engineering — industrial minimalism, everything earned
- Apple spatial compute UI — floating, breathing, alive
- A military COP (Common Operating Picture) — stripped clean

**Not:**
- RGB gaming aesthetic
- Cluttered security vendor dashboards (alarm panels, NVR software)
- Consumer app friendliness (rounded everything, pastel colors)
- Enterprise dashboard bloat (too many widgets, too many numbers)

---

## Color System

### Base Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-deep` | `#080810` | Primary background. Near-black with blue undertone. Not pure black. |
| `--bg-surface` | `#0F0F1A` | Card / panel backgrounds |
| `--bg-elevated` | `#161625` | Hover states, secondary panels |
| `--border` | `#1E1E32` | Subtle borders, dividers |
| `--text-primary` | `#E8E8F0` | Primary text. Off-white, not harsh. |
| `--text-secondary` | `#6B6B8A` | Labels, metadata, secondary info |
| `--text-muted` | `#3A3A55` | Timestamps, disabled states |

### Threat State Accent Colors

The accent color shifts with threat state. This is the primary visual signal that the situation has changed.

| Threat State | Color | Hex | Feeling |
|---|---|---|---|
| CLEAR | Teal | `#00D4B1` | Calm. Operational. All good. |
| ELEVATED | Amber | `#F5A623` | Attention. Something to watch. |
| ACTIVE | Orange-Red | `#FF5733` | Action required. Eyes on. |
| LOCKDOWN | Full Red | `#FF2020` | Maximum. All systems. |

**Rule:** Only ONE accent color is active at a time. The accent color bleeds subtly into backgrounds, borders, and status indicators. The entire interface shifts tone with the threat state — not just a badge.

### No gradients. No drop shadows. No glow effects.

Exception: a single, very subtle radial gradient on the background in ACTIVE/LOCKDOWN state — like a dim pulse. That's it.

---

## Typography

Two typefaces. Used with discipline.

### Primary — Geometric Sans

**Recommendation:** Inter, Neue Haas Grotesk, or DM Sans

Usage:
- Site names, headings, status labels, button text
- All operator-facing narrative text
- Clean, modern, neutral authority

### Secondary — Monospace

**Recommendation:** JetBrains Mono, Geist Mono, or IBM Plex Mono

Usage:
- Telemetry readouts (battery %, coordinates, timestamps)
- Drone IDs (WT-01, WT-02)
- Alert codes and incident IDs
- Any number that is "live data"

**The mix of these two typefaces IS the techno-punk tension.** Clean headers. Raw data. The system is sophisticated and it knows what it's doing.

### Type Scale

| Role | Size | Weight | Typeface |
|---|---|---|---|
| Site name | 24px | 300 (light) | Sans |
| Threat state | 14px | 500 | Sans, uppercase, tracked |
| Drone ID | 13px | 400 | Mono |
| Battery readout | 20px | 300 | Mono |
| Alert message | 14px | 400 | Sans |
| Timestamp | 12px | 400 | Mono |
| GPS coordinates | 11px | 400 | Mono |

---

## Layout Principles

### Breathing Room Is the Product

Margins are generous. The negative space is not wasted — it communicates that the system is in control. A crowded dashboard looks like it's panicking. TowerGuard never panics.

**Minimum padding:** 24px on all panels. 40px page margins.

### Information Hierarchy

**One thing is always the hero.** That thing is the threat state.

The threat state indicator is the largest, most prominent element on the page. Everything else is subordinate to it. The operator should know the threat state before they read anything else.

### Progressive Disclosure

In CLEAR state, the dashboard shows:
- Threat state (hero)
- Drone readiness summary (4 drones, status chips)
- Last sweep time + next scheduled sweep
- Nothing else unless the operator requests it

Detailed telemetry, GPS coordinates, incident log — all available, but behind a single tap/click. Don't surface data that isn't needed right now.

In ACTIVE/LOCKDOWN state, the dashboard surfaces:
- Everything relevant to the active event
- Video feed (Phase 2)
- GPS map with drone positions and incident marker
- Alert detail
- Action buttons prominent and large

---

## Component Principles

### Drone Status Chips

Not cards. Chips. Small, clean, readable at a glance.

```
[ WT-01  PATROLLING  87% ]
[ WT-02  READY       93% ]
[ WT-03  CHARGING    42% ]
[ WT-04  MAINTENANCE  —  ]
```

- Drone ID in monospace
- Status in sans, uppercase
- Battery in monospace
- Color-coded status dot — nothing more
- No icons, no illustrations, no decoration

### Alert Feed

Calm by default. Active when it needs to be.

- Each alert is a single line: timestamp + message + severity dot
- New alerts slide in from the top — no flash, no sound by default (configurable)
- High-severity alerts get a subtle left-border color in the threat accent
- The feed doesn't shout. It informs.

### Action Buttons

Large. Unambiguous. Two types only:

**Primary action** (e.g., TAKE CONTROL, ACKNOWLEDGE):
- Full-width in its container
- Accent color background
- Sans, uppercase, slightly tracked

**Destructive/Escalation action** (e.g., CONTACT AUTHORITIES, FORCE LOCKDOWN):
- Outlined, not filled, until hover
- Red accent on ACTIVE/LOCKDOWN state
- Requires a second confirmation tap — never one-click for irreversible actions

### Map View (Phase 2)

Dark tile map (Mapbox dark style or custom).
Drone positions as minimal dots with ID label.
Patrol route as a thin dashed line.
Incident markers as a subtle pulse at GPS coordinates.

No cluttered overlays. No satellite view by default. The map is a canvas, not a feature.

---

## Threat-Responsive UI States

The entire interface shifts with threat state. This is the design feature.

### CLEAR State

```
[dark, near-empty, breathing]

TOWERGUARD                    DEMO TEST RANGE

                ● CLEAR

        WT-01  PATROLLING  87%
        WT-02  READY       93%
        WT-03  CHARGING    42%
        WT-04  MAINTENANCE  —

        NEXT SWEEP  14:32

```

Accent: Teal. Minimal. Confident silence.

---

### ELEVATED State

Sweep frequency has increased. Something was noticed.

- Amber accent bleeds into borders and status indicator
- Sweep interval panel becomes more prominent (showing increased frequency)
- Last anomaly event surfaces in the feed
- Drone readiness panel slightly emphasized

---

### ACTIVE State

Response drone is airborne. Operator has been alerted.

- Orange-red accent throughout
- Alert detail panel opens automatically
- GPS map becomes prominent (if visible)
- Incident report panel surfaces
- Action buttons (TAKE CONTROL, RETURN TO NEST, ACKNOWLEDGE) are large and prominent
- All drone cards visible with real-time battery readout

---

### LOCKDOWN State

Full deployment. Maximum information. Operator in control.

- Full red accent
- All panels visible
- Video feed prominent (Phase 2)
- Manual control takeover prominent
- CONTACT AUTHORITIES button visible (outlined until tapped)
- Incident report live-updating

---

## Motion & Animation

Minimal. Purposeful. Never decorative.

| Interaction | Animation |
|---|---|
| Threat state transition | 400ms crossfade of accent color across all elements |
| New alert appearance | Slide in from top, 200ms ease-out |
| Drone status change | 150ms opacity transition on status chip |
| Dashboard state expansion (ACTIVE) | 300ms height expansion, panels fade in |
| Button press | 100ms scale down to 0.97, immediate release |

**No looping animations. No spinners except on actual loading states. No parallax.**

The system moves when it has something to say. It is still otherwise.

---

## What We Are NOT Building

❌ Dark mode toggle (always dark — that's the product)
❌ A "friendly" consumer app (rounded corners everywhere, emoji, casual copy)
❌ A surveillance aesthetic (black and green, prison-cam vibes)
❌ A gaming aesthetic (RGB, glows, excessive animation)
❌ Enterprise bloat (widgets, charts nobody asked for, nested nav)
❌ A cluttered NVR/DVR interface (the thing this replaces)

---

## Voice & Copy Tone

The interface speaks like the system itself: **calm, direct, precise.**

| Context | Wrong | Right |
|---|---|---|
| Status | "Everything looks good!" | "All Clear" |
| Alert | "WARNING! Motion detected!" | "Motion detected — East Gate" |
| Low battery | "Your drone needs charging soon" | "WT-01 — 18% — RTN initiated" |
| Escalation prompt | "Are you sure you want to do this?" | "Confirm: Contact Authorities" |
| All clear after event | "Great news, the threat has passed!" | "Threat cleared — returning to SWEEP" |

The system does not celebrate. It does not panic. It reports.

---

## Summary

TowerGuard's UI is designed for one type of person: the high-value buyer who needs to trust the system in 8 seconds, ignore it for 29 minutes, and know exactly what to do in the 30th.

**Dark. Clean. Data-precise. Threat-responsive. Confident silence.**

The interface earns trust by being exactly as complex as the situation demands — and no more.
