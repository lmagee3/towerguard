# TowerGuard — System Architecture

## Overview

TowerGuard is structured as a platform with four primary layers:

```
┌─────────────────────────────────────────────────────┐
│                  OPERATOR LAYER                      │
│          Dashboard (Web) + Mobile App                │
└──────────────────────┬──────────────────────────────┘
                       │ WebSocket + REST
┌──────────────────────▼──────────────────────────────┐
│                 PLATFORM LAYER                       │
│     FastAPI Backend — Mission, Alert, Telemetry      │
└──────┬────────────────┬──────────────────────────────┘
       │                │
┌──────▼──────┐  ┌──────▼──────────────────────────────┐
│  AI ENGINE  │  │         SIMULATION ENGINE            │
│  (anomaly,  │  │  (drone state, nest state, events)   │
│   classify) │  └─────────────────────────────────────┘
└─────────────┘
       │
┌──────▼──────────────────────────────────────────────┐
│                 INTEGRATION LAYER                    │
│      DJI SDK / FlytBase / Camera APIs / Sensors      │
└─────────────────────────────────────────────────────┘
```

---

## Layer Definitions

### Operator Layer

Web dashboard and mobile app. All operator interaction happens here.

**Dashboard** (`frontend/dashboard/`)
- Fleet status cards (per-drone battery, state, position)
- Nest status panel
- Alert feed (real-time, WebSocket)
- Mission control panel
- Manual takeover UI
- Return-to-nest trigger
- Incident log

**Mobile** (`frontend/mobile/`) — Phase 2
- Alert push notifications
- Lightweight status view
- Manual override

---

### Platform Layer

FastAPI backend. The coordination brain.

**Modules:**

| Module | Path | Responsibility |
|---|---|---|
| API Gateway | `backend/api/` | REST endpoints, auth middleware, rate limiting |
| Telemetry | `backend/telemetry/` | Drone telemetry ingestion, state updates, WebSocket broadcast |
| Auth | `backend/auth/` | Operator authentication, role-based access, audit log |
| AI Engine | `backend/ai/` | Anomaly scoring, event classification, alert generation |

**Key data models:**

```python
DroneState:
  id: str              # WT-01, WT-02, etc.
  status: Enum         # PATROLLING | READY | CHARGING | MAINTENANCE | RTN
  battery_pct: int
  position: LatLng
  mission_id: str | None
  last_seen: datetime

NestState:
  id: str
  status: Enum         # SECURED | LAUNCHING | RECOVERING | FAULT
  active_mission: str | None
  drones: List[DroneState]

Alert:
  id: str
  type: Enum           # MOTION | ANOMALY | LOW_BATTERY | TAKEOVER_REQUEST | FAULT
  severity: Enum       # LOW | MEDIUM | HIGH | CRITICAL
  source_drone: str
  position: LatLng | None
  timestamp: datetime
  acknowledged: bool
```

---

### Simulation Engine

Runs during Phase 1 (no hardware). Generates realistic drone/nest state transitions and telemetry.

**Location:** `simulation/drone-sim/`

**Simulated events:**
- Patrol launch from nest
- Battery drain curve (linear + wind noise)
- Patrol waypoint progression
- Anomaly detection trigger (random + scenario-scripted)
- Low-battery RTN sequence
- Charging completion + readiness transition
- Manual takeover handoff
- Fault injection (motor warning, GPS loss, link degradation)

**Scenarios** (`simulation/scenarios/`)
- `perimeter-sweep-alpha.json` — standard patrol loop
- `east-gate-anomaly.json` — motion detection sequence
- `battery-failure.json` — mid-patrol emergency RTN
- `dual-launch.json` — simultaneous launch test

---

### Integration Layer

Phase 2+. Real hardware connectivity.

| Integration | Path | Notes |
|---|---|---|
| DJI SDK | `integrations/dji/` | Mobile SDK or MSDK v5 for direct drone control |
| FlytBase | `integrations/flytbase/` | Enterprise drone-in-a-box platform API |
| Cameras | `integrations/cameras/` | RTSP stream ingestion, thermal camera APIs |
| Sensors | `integrations/sensors/` | Radar, RF, acoustic sensor adapters |

---

## Data Flow — Normal Patrol Cycle

```
1. Operator triggers "Perimeter Sweep Alpha" from dashboard
2. Platform creates Mission record, assigns WT-01
3. Simulation engine (Phase 1) / DJI SDK (Phase 2) executes launch
4. Telemetry stream opens — position, battery, status updates every 2s
5. AI engine scores each telemetry frame for anomaly indicators
6. Score threshold exceeded → Alert generated → WebSocket push to dashboard
7. Operator sees alert, reviews feed, chooses action
8. If manual takeover: operator assumes control, platform hands off
9. WT-01 battery < 20% → RTN command issued automatically
10. WT-02 launched on overlap, WT-01 returns, charging begins
11. Incident record closed, log entry written
```

---

## API Surface (Sprint 001 Targets)

```
GET  /health
GET  /nest/status
GET  /drones
GET  /drones/{id}
POST /drones/{id}/takeover
POST /drones/{id}/return-to-nest
GET  /missions
POST /missions
GET  /alerts
POST /alerts/{id}/acknowledge
WS   /telemetry          — live telemetry stream
WS   /alerts/live        — live alert feed
```

---

## Security Model

- All API endpoints require bearer token auth (Phase 1: static dev token)
- WebSocket connections authenticated on handshake
- Operator roles: VIEWER | OPERATOR | ADMIN
- All manual commands (takeover, RTN, mission launch) require OPERATOR or ADMIN
- Full audit log on all state-changing actions
- No drone command execution without authenticated session

---

## Technology Stack

| Layer | Technology |
|---|---|
| Backend | Python 3.11 + FastAPI |
| State store | SQLite (Phase 1) → PostgreSQL (Phase 2) |
| Real-time | WebSockets (FastAPI native) |
| Frontend | React + TypeScript |
| Simulation | Python asyncio event loop |
| Deployment | Docker Compose (Phase 1) |
| CI/CD | GitHub Actions |
