# TowerGuard

**Persistent Perimeter Awareness**

TowerGuard is a multi-drone perimeter intelligence platform. An autonomous nest stores, charges, launches, recovers, and coordinates a fleet of 3–4 drones for continuous perimeter coverage — eliminating the downtime gap that single-drone systems cannot solve.

---

## What TowerGuard Is

A **Perimeter Intelligence Platform** — not a drone product.

The drone fleet is the sensor layer. The platform is the product.

| Capability | Phase |
|---|---|
| Automated patrol rotation | Phase 1 |
| Anomaly detection + alerting | Phase 1 |
| Remote manual takeover | Phase 1 |
| Incident logging | Phase 1 |
| Thermal imaging integration | Phase 2 |
| Radar + RF detection | Phase 2 |
| AI event classification | Phase 2 |
| Guard dispatch workflows | Phase 2 |
| Multi-site orchestration | Phase 3 |

---

## Current Phase: Simulation

We are building **TowerGuard Sim** — a functional command-and-control prototype before any hardware investment.

**Deliverables (Sprint 001):**
- [ ] FastAPI backend with drone/nest state models
- [ ] Telemetry simulation engine
- [ ] Mission dispatch and alert generation
- [ ] React dashboard (fleet cards, alert feed, manual controls)
- [ ] Return-to-nest workflow

---

## Nest Concept

A single deployed nest holds 3–4 low-cost drones in continuous rotation:

```
WT-01 → Patrolling
WT-02 → Ready (standby)
WT-03 → Charging
WT-04 → Maintenance / Backup
```

This rotation eliminates coverage gaps. When WT-01 returns low-battery, WT-02 launches. No dead time. No missed events.

---

## Repository Structure

```
towerguard/
├── docs/           — product, govcon, architecture, market research
├── frontend/       — dashboard (React) + mobile
├── backend/        — FastAPI: api, telemetry, auth, ai
├── simulation/     — drone-sim engine, scenarios, test environments
├── integrations/   — DJI, FlytBase, cameras, sensors
└── ops/            — sprint plans, handoffs, decisions
```

---

## Funding Target

Non-dilutive government funding via:

- **AFWERX** — Air Force innovation program
- **SBIR** — Small Business Innovation Research
- **DHS** — Dept. of Homeland Security
- **DIU** — Defense Innovation Unit
- **Army xTech**

Pitch framing: *Autonomous perimeter intelligence for persistent infrastructure security*

---

## Team

| Role | Owner |
|---|---|
| Founder / Principal Systems Architect | Lawrence Magee |
| Chief Strategy & Systems Architect | ChatGPT |
| Senior Technical Architect | Claude |
| Lead Implementation Engineer | Codex |
| QA / Red Team / Systems Auditor | AntiGravity |

See [TEAM.md](TEAM.md) for full role definitions.

---

## Docs

- [VISION.md](VISION.md) — product vision and doctrine
- [ARCHITECTURE.md](ARCHITECTURE.md) — system architecture
- [ROADMAP.md](ROADMAP.md) — phase plan and milestones
- [FUNDING_STRATEGY.md](FUNDING_STRATEGY.md) — grant and GovCon strategy
- [TEAM.md](TEAM.md) — team roles and division of labor
- [COMPETITOR_INTEL.md](COMPETITOR_INTEL.md) — competitive landscape
- [OPUS_START_HERE.md](OPUS_START_HERE.md) — full project brief for AI agents

---

*Built under Malleus Prendere. Chaos Monk product line.*
