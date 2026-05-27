# Sprint 001 — TowerGuard Sim Foundation

**Duration:** ~2 weeks  
**Owner:** Codex (implementation) / Claude (architecture sign-off) / Lawrence (go/no-go)  
**Goal:** Functional simulation backend + dashboard shell. Demo-ready by end of sprint.

---

## Backend Tasks (Codex)

### FastAPI Scaffold
- [ ] `backend/api/main.py` — FastAPI app, CORS, startup/shutdown hooks
- [ ] `backend/api/routes/` — route modules for drones, nest, missions, alerts, telemetry
- [ ] `backend/api/models/` — SQLAlchemy models: Drone, Nest, Mission, Alert
- [ ] `backend/api/schemas/` — Pydantic schemas for request/response
- [ ] `backend/api/auth.py` — static token auth middleware (Phase 1)
- [ ] `docker-compose.yml` — FastAPI + SQLite, hot reload
- [ ] `requirements.txt`

### Telemetry (WebSocket)
- [ ] `backend/telemetry/hub.py` — WebSocket connection manager
- [ ] `backend/telemetry/broadcast.py` — push drone/nest state updates
- [ ] Route: `WS /telemetry`
- [ ] Route: `WS /alerts/live`

### Simulation Engine
- [ ] `simulation/drone-sim/engine.py` — asyncio event loop, tick rate 2s
- [ ] `simulation/drone-sim/drone.py` — DroneSimulator class, state machine
- [ ] `simulation/drone-sim/nest.py` — NestSimulator class
- [ ] Battery drain: linear 0.3%/tick + noise
- [ ] RTN trigger: battery < 20%
- [ ] Charging: 0.5%/tick when docked
- [ ] Anomaly injection: random chance per tick (configurable)
- [ ] `simulation/scenarios/perimeter-sweep-alpha.json` — standard 4-waypoint loop

### AI Stubs (CRITICAL — build interfaces, not the brain)

> Do NOT build real AI models in Sprint 001. Build stub modules with real interfaces that return simulated outputs. Phase 2 plugs in real models without changing the API surface.

- [ ] `backend/ai/anomaly_engine.py` — stub interface, returns scored anomaly events
- [ ] `backend/ai/mission_reasoner.py` — stub interface, returns patrol/rotation decisions
- [ ] `backend/ai/terrain_model.py` — stub interface, returns site awareness data
- [ ] Each stub must define the full function signature and return type that the real model will eventually satisfy
- [ ] Stubs feed real telemetry pipeline and alert system — the rest of the platform should not know or care that they are stubs

**Why:** Architecture hardens once Sonnet/Codex start building. If the AI interfaces aren't defined now, they'll get bolted on as afterthoughts. Defining them as stubs locks in the contract between the AI layer and the rest of the platform before it matters.

---

## Frontend Tasks (Codex)

### Scaffold
- [ ] Vite + React + TypeScript in `frontend/dashboard/`
- [ ] Tailwind CSS
- [ ] WebSocket client hook

### Components
- [ ] `FleetCard.tsx` — drone ID, status badge, battery bar
- [ ] `NestStatus.tsx` — nest state, active mission name
- [ ] `AlertFeed.tsx` — scrolling real-time alert list (WebSocket)
- [ ] `MissionPanel.tsx` — current mission name + trigger button
- [ ] `ManualControls.tsx` — Takeover button + Return-to-Nest button
- [ ] `Dashboard.tsx` — layout shell, assembles components

### State
- [ ] `useDroneState.ts` — WebSocket hook, updates fleet cards
- [ ] `useAlerts.ts` — WebSocket hook, appends to alert feed

---

## Definition of Done (Sprint 001)

1. `docker-compose up` spins up backend + simulation engine
2. All 4 drones show in dashboard with live battery drain
3. At least one anomaly alert appears in feed without manual trigger
4. Takeover button posts to API, drone status changes to MANUAL
5. Return-to-nest posts to API, drone status transitions to RTN → CHARGING
6. No console errors in browser
7. AntiGravity review complete, no P1 bugs open

---

## Handoff Notes

**To Codex:** Build against the API spec in [ARCHITECTURE.md](../../ARCHITECTURE.md). Start with the simulation engine and FastAPI models — frontend can wait for a working backend. Use static token `dev-token-001` for Phase 1 auth. Document any API deviations in `ops/handoffs/`.

**To AntiGravity:** Review the simulation engine state machine for impossible transitions. Review WebSocket reconnection handling. Check that manual takeover cannot be issued to a drone in CHARGING or MAINTENANCE state.
