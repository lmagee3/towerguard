# TowerGuard — Roadmap

## Phase Overview

| Phase | Name | Horizon | Goal |
|---|---|---|---|
| **Phase 1** | TowerGuard Sim | 0–45 days | Working simulation + demo-ready dashboard |
| **Phase 2** | Hardware Integration | 45–120 days | Real drone connectivity, pilot deployment |
| **Phase 3** | Platform Scale | 120+ days | Multi-site, AI maturity, GovCon ready |

---

## Phase 1 — TowerGuard Sim

**Definition of Done:**
- GitHub repo live and documented
- Simulation running with realistic state transitions
- Dashboard rendering fleet status, alerts, manual controls
- Demo video recorded
- Architecture docs complete
- Funding narrative written
- Pilot partner outreach materials ready

### Sprint 001 — Foundation

**Duration:** 1–2 weeks

#### Backend
- [ ] FastAPI project scaffold with Docker Compose
- [ ] Drone state model + CRUD
- [ ] Nest state model + CRUD
- [ ] Telemetry endpoint (WebSocket broadcast)
- [ ] Mission engine (create, assign, track)
- [ ] Alert engine (generate, acknowledge)
- [ ] Manual takeover endpoint
- [ ] Return-to-nest endpoint
- [ ] `/health` + basic auth middleware

#### Frontend
- [ ] React + TypeScript scaffold (Vite)
- [ ] Dashboard shell layout
- [ ] Fleet status cards (per-drone battery, state, ID)
- [ ] Nest status panel
- [ ] Alert feed (WebSocket, real-time)
- [ ] Manual takeover button
- [ ] Return-to-nest button
- [ ] Mission status display

#### Simulation Engine
- [ ] Asyncio event loop with configurable tick rate
- [ ] Battery drain simulation
- [ ] Patrol waypoint progression
- [ ] Random anomaly injection
- [ ] Low-battery RTN trigger
- [ ] Charging completion + readiness transition

### Sprint 002 — Demo Polish

**Duration:** 1 week

- [ ] Scripted demo scenario (East Gate Anomaly)
- [ ] Map view (drone position overlay — Mapbox or Leaflet)
- [ ] Alert detail modal
- [ ] Incident log view
- [ ] Fault injection scenario
- [ ] Demo video recording
- [ ] README updated with setup instructions

### Sprint 003 — Funding Artifacts

**Duration:** 1 week

- [ ] Architecture diagrams (draw.io or Mermaid)
- [ ] Technical Feasibility Review (Claude output → docs/govcon/)
- [ ] SBIR topic alignment memo
- [ ] AFWERX capability brief (1-pager)
- [ ] Competitive analysis complete
- [ ] Pilot outreach email template

---

## Phase 2 — Hardware Integration

**Trigger:** Phase 1 complete + at least one pilot partner conversation active

### Milestones

- [ ] DJI SDK integration (Mavic 3E or M30 series target)
- [ ] FlytBase API evaluation + integration decision
- [ ] Nest enclosure design (RFQ to fabricator or COTS evaluation)
- [ ] First real drone flight controlled via TowerGuard platform
- [ ] Thermal camera stream integrated into dashboard
- [ ] Pilot site deployment (1 nest, 2 drones minimum)
- [ ] 30-day pilot data collected

---

## Phase 3 — Platform Scale

**Trigger:** Successful pilot + non-dilutive funding secured

### Milestones

- [ ] Multi-site dashboard (N nests, unified map view)
- [ ] AI event classification model (trained on pilot data)
- [ ] Guard dispatch workflow
- [ ] Mobile app (iOS — alert notifications + status)
- [ ] SBIR Phase I application submitted
- [ ] Enterprise sales motion defined
- [ ] Second pilot site active

---

## Key Decisions Pending

| Decision | Owner | Target Date |
|---|---|---|
| Frontend framework (React vs Vue) | Claude / Lawrence | Sprint 001 |
| Map provider (Mapbox vs Leaflet) | Lawrence | Sprint 002 |
| Drone hardware target (DJI vs Skydio vs COTS) | Lawrence | Phase 2 |
| Nest enclosure (custom fab vs COTS) | Lawrence | Phase 2 |
| FlytBase vs direct SDK | Claude | Phase 2 |
| Cloud deployment target (AWS GovCloud vs Azure Gov) | TBD | Phase 3 |
