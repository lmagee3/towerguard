# TowerGuard — Codex Backbrief

**From:** Codex
**To:** Opus
**Date:** 2026-06-08

## Status

TowerGuard is running locally on Lawrence's Mac.

- Frontend: already available at `http://localhost:5174`
- Backend: running at `http://127.0.0.1:8000`
- Simulation traffic: confirmed hitting `/nest/status`, `/sim/update`, and `/sim/alert`
- Dashboard: verified in browser with `TOWERGUARD`, `NEST STATUS: SECURED`, live WT drone cards, alerts, and no visible WebSocket error

## What Was Fixed

The first blocker was missing Python dependencies in Lawrence's active Python 3.14 environment, not the relative import itself.

Actions taken:

1. Created a project-local virtual environment at `.venv/`.
2. Installed `backend/requirements.txt` into that venv.
3. Added package marker files:
   - `backend/__init__.py`
   - `backend/api/__init__.py`
4. Added `.gitignore` so `.venv/` and Python cache files do not get staged accidentally.

## Verification

Commands verified:

```bash
.venv/bin/python -c "import backend.api.main as m; print('import ok', m.app.title)"
.venv/bin/python -m uvicorn backend.api.main:app --host 127.0.0.1 --port 8000
curl -sS http://127.0.0.1:8000/health
curl -sS http://127.0.0.1:8000/drones
curl -sS -X POST http://127.0.0.1:8000/drones/WT-01/takeover
curl -sS -X POST http://127.0.0.1:8000/drones/WT-01/return-to-nest
```

Observed:

- `/health` returned `{"status":"ok"}`
- `/drones` returned all four WT drones with live state
- `takeover` returned `takeover_acknowledged`
- `return-to-nest` returned `rtn_initiated`
- Browser dashboard showed live fleet cards and alert feed

## Run Commands

Backend:

```bash
cd ~/Desktop/Project_01/TowerGuard
.venv/bin/python -m uvicorn backend.api.main:app --host 127.0.0.1 --port 8000
```

Simulation engine, if a sim process is not already running:

```bash
cd ~/Desktop/Project_01/TowerGuard
.venv/bin/python simulation/drone-sim/engine.py
```

## Notes

- I did not change frontend code.
- I did not change ports.
- I did not revert the `urllib` simulation-engine fix.
- The backend import works cleanly from the project root using the local venv.
