# Sprint 001 — TowerGuard Sim Foundation

**Duration:** ~2 weeks
**Owner:** Codex (implementation) / Claude (architecture sign-off) / Lawrence (go/no-go)
**Goal:** Functional simulation backend + dashboard shell with threat state machine. Demo-ready by end of sprint.

---

## Backend Tasks (Codex)

### FastAPI Scaffold
- [ ] `backend/api/main.py` — FastAPI app, CORS, startup/shutdown hooks
- [ ] `backend/api/routes/` — route modules for drones, nest, missions, alerts, telemetry
- [ ] `backend/api/models/` — SQLAlchemy models: Drone, Nest, Mission, Alert, ThreatState
- [ ] `backend/api/schemas/` — Pydantic schemas for request/response
- [ ] `backend/api/auth.py` — static token auth middleware (Phase 1)
- [ ] `docker-compose.yml` — FastAPI + SQLite, hot reload
- [ ] `requirements.txt`

### Telemetry (WebSocket)
- [ ] `backend/telemetry/hub.py` — WebSocket connection manager
- [ ] `backend/telemetry/broadcast.py` — push drone/nest state + threat state updates
- [ ] Route: `WS /telemetry`
- [ ] Route: `WS /alerts/live`

### Simulation Engine
- [ ] `simulation/drone-sim/engine.py` — asyncio event loop, tick rate 2s
- [ ] `simulation/drone-sim/drone.py` — DroneSimulator class, per-drone state machine
- [ ] `simulation/drone-sim/nest.py` — NestSimulator class with teaming config support
- [ ] `simulation/drone-sim/threat_state.py` — ThreatStateMachine (CLEAR/ELEVATED/ACTIVE/LOCKDOWN)
- [ ] `simulation/drone-sim/patrol_mode.py` — PatrolMode enum + mode transition logic (SWEEP/PATROL/OVERWATCH/LOCKDOWN)
- [ ] Battery drain: linear 0.3%/tick + noise
- [ ] RTN trigger: battery < 20%
- [ ] Charging: 0.5%/tick when docked
- [ ] Sweep interval: configurable per-site, default 1800s (30 min)
- [ ] Anomaly injection: random chance per tick (configurable), triggers state transition
- [ ] GPS coordinates on every telemetry frame — no exceptions

### Simulation Scenarios
- [ ] `simulation/scenarios/sweep-all-clear.json` — SWEEP mode, 30-min cycle, no events
- [ ] `simulation/scenarios/sweep-to-overwatch.json` — SWEEP detects anomaly → ACTIVE, response drone dispatches, alert pushed
- [ ] `simulation/scenarios/threat-escalation-full.json` — CLEAR → ELEVATED → ACTIVE → LOCKDOWN full state walk
- [ ] `simulation/scenarios/de-escalation.json` — ACTIVE sustained all-clear → steps back to SWEEP
- [ ] `simulation/scenarios/battery-handoff.json` — mid-patrol battery swap, zero coverage gap

### AI Stubs (CRITICAL — build interfaces, not the brain)

> Do NOT build real AI models in Sprint 001. Build stub modules with real interfaces that return simulated outputs. Phase 2 plugs in real models without changing the API surface.

- [ ] `backend/ai/anomaly_engine.py` — stub: scores telemetry frame, returns `AnomalyScore(value: float, classification: str, confidence: float)`
- [ ] `backend/ai/mission_reasoner.py` — stub: evaluates nest state, returns `PatrolDecision(recommended_mode: PatrolMode, sweep_interval_seconds: int, reason: str)`
- [ ] `backend/ai/terrain_model.py` — stub: returns `SiteAwareness(risk_zones: list, blind_spots: list, baseline_patterns: list)`
- [ ] Each stub must define the full function signature and return types that the real model will eventually satisfy
- [ ] Stubs feed real telemetry pipeline, threat state machine, and alert system — the rest of the platform must not know or care that they are stubs
- [ ] GPS coordinates must be included in every stub input/output where position is relevant

**Why:** Architecture hardens the moment Sonnet/Codex start building. The state machine, patrol modes, and AI interfaces must be defined as a system before any single piece is built in isolation.

---

## Frontend Tasks (Codex)

### Scaffold
- [ ] Vite + React + TypeScript in `frontend/dashboard/`
- [ ] Tailwind CSS
- [ ] WebSocket client hook

### Components
- [ ] `ThreatStateIndicator.tsx` — prominent display of current threat state (CLEAR/ELEVATED/ACTIVE/LOCKDOWN) with color coding
- [ ] `PatrolModePanel.tsx` — current patrol mode, sweep interval, next scheduled sweep countdown
- [ ] `FleetCard.tsx` — drone ID, type (Sentinel/Response), status badge, battery bar, GPS position
- [ ] `NestStatus.tsx` — nest state, teaming config, active mission name
- [ ] `AlertFeed.tsx` — scrolling real-time alert list (WebSocket), includes GPS coordinates
- [ ] `IncidentReport.tsx` — auto-populated incident detail (time, GPS, drone ID, severity, confidence)
- [ ] `ManualControls.tsx` — Takeover button, Return-to-Nest button, Force Escalate, Force Clear
- [ ] `Dashboard.tsx` — layout shell, assembles all components

### State
- [ ] `useDroneState.ts` — WebSocket hook, updates fleet cards
- [ ] `useAlerts.ts` — WebSocket hook, appends to alert feed
- [ ] `useThreatState.ts` — WebSocket hook, updates threat state indicator + patrol mode panel

---

## Definition of Done (Sprint 001)

1. `docker-compose up` spins up backend + simulation engine
2. All drones show in dashboard with live battery drain and GPS coordinates
3. Threat state indicator shows CLEAR on startup
4. Sweep scenario runs: drone launches, sweeps, returns, "All Clear" logged
5. Anomaly scenario runs: anomaly injected → CLEAR transitions to ACTIVE → response drone dispatches → alert appears in feed with GPS coordinates
6. De-escalation scenario runs: sustained all-clear → state steps back to CLEAR
7. Takeover button posts to API, drone status changes to MANUAL
8. Return-to-nest posts to API, drone status transitions to RTN → CHARGING
9. No console errors in browser
10. AntiGravity review complete, no P1 bugs open

---

## Handoff Notes

**To Codex:** Build against the API spec in [ARCHITECTURE.md](../../ARCHITECTURE.md) and patrol doctrine in [docs/product/PATROL_DOCTRINE.md](../../docs/product/PATROL_DOCTRINE.md). Start with `threat_state.py` and `patrol_mode.py` — everything else in the simulation depends on these. Use static token `dev-token-001` for Phase 1 auth. Document any API deviations in `ops/handoffs/`.

**To AntiGravity:** Primary review focus — the threat state machine. What are the impossible or dangerous transitions? Can the system get stuck in LOCKDOWN? Can a false positive cascade to LOCKDOWN without operator action? What happens when a drone loses GPS signal mid-patrol? What happens when WebSocket drops during an ACTIVE event?
