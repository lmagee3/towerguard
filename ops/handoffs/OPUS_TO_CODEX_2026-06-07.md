# TowerGuard — Codex Handoff: Get It Running

**From:** Opus (Cowork)
**To:** Codex (IDE)
**Date:** 2026-06-07
**Priority:** HIGH — Lawrence needs a working demo NOW

---

## Objective

Get TowerGuard running on Lawrence's Mac. The frontend is rendering (port 5174) but the backend + sim engine aren't starting. Fix whatever dependency/import/path issues exist and get all three processes running.

## Current State

- **Frontend**: ✅ Running on `http://localhost:5174` — React + Vite + Tailwind v4. Shows "WebSocket error — is the backend running on port 8000?" because backend isn't up.
- **Backend**: ❌ Not running. Needs FastAPI on port 8000.
- **Sim Engine**: ❌ Not running. Depends on backend.

## What Exists

Project location: `~/Desktop/Project_01/TowerGuard/`

```
backend/
  api/main.py      — FastAPI app (imports from backend.api.models)
  api/models.py    — Pydantic models (DroneState, NestState, Alert, Mission)
  requirements.txt — fastapi, uvicorn, pydantic, websockets, httpx

simulation/
  drone-sim/engine.py — asyncio sim loop, uses urllib (NOT httpx — I already fixed this)

frontend/
  dashboard/         — React + TypeScript + Vite on port 5174
```

## Known Issues

1. **Import paths**: `main.py` uses `from .models import ...` (relative import). Running with `python3 -m uvicorn backend.api.main:app` from project root should work but might need `__init__.py` files or PYTHONPATH adjustment depending on Mac's Python setup.

2. **Python version**: Lawrence has Python 3.14.3. All code is compatible (no StrEnum like HUDDLE).

3. **Dependencies**: `pip install fastapi uvicorn pydantic websockets httpx` — should already be installed from prior work but verify.

4. **Port conflicts**: HUDDLE uses 8765 (backend) and 5173 (frontend). TowerGuard uses 8000 (backend) and 5174 (frontend). No conflict unless something else is on 8000.

## What To Do

1. `cd ~/Desktop/Project_01/TowerGuard`
2. Install deps if needed: `pip3 install fastapi uvicorn pydantic websockets`
3. Start backend: `python3 -m uvicorn backend.api.main:app --host 127.0.0.1 --port 8000`
4. If import errors, try: `PYTHONPATH=. python3 -m uvicorn backend.api.main:app --host 127.0.0.1 --port 8000`
5. If that fails, add `__init__.py` to `backend/` and `backend/api/`
6. Verify: `curl http://127.0.0.1:8000/health` should return `{"status":"ok"}`
7. Start sim: `python3 simulation/drone-sim/engine.py` — should print "Starting simulation engine..." and tick logs every 10s
8. Verify: `curl http://127.0.0.1:8000/drones` should show 4 drones with changing battery levels
9. Open `http://localhost:5174` — fleet cards should populate live

## Sim Engine Note

I already replaced `httpx` with `urllib` in `engine.py` because httpx fails in proxy environments. The current engine.py uses `urllib.request` — do NOT revert to httpx.

## Success Criteria

Lawrence opens `http://localhost:5174` and sees:
- TOWERGUARD header with NEST STATUS: SECURED
- 4 drone fleet cards with live battery drain
- WT-01 cycling through PATROLLING → RTN → CHARGING → READY
- Alerts appearing in the feed
- TAKEOVER and RTN buttons functional

## Do NOT

- Change the frontend code (it's working)
- Change ports (5174 frontend, 8000 backend)
- Add any new features — just get it running
- Touch HUDDLE's code or ports

---

**Once it's running, backbrief to `ops/handoffs/CODEX_TO_OPUS_2026-06-07.md` with what you fixed.**
