#!/usr/bin/env bash
# TowerGuard Single-Click Demo Launcher
# Used for the Kyle McKuhen POC demo

echo "[TowerGuard] Initializing Proof-of-Concept Simulation..."

# Start Backend
echo "-> Starting Platform API (FastAPI)..."
cd backend
uv run uvicorn api.main:app --host 127.0.0.1 --port 8000 > /dev/null 2>&1 &
BACKEND_PID=$!
cd ..

# Start Simulation Engine
echo "-> Starting Simulation Engine..."
cd backend
uv run python ../simulation/drone-sim/engine.py > /dev/null 2>&1 &
SIM_PID=$!
cd ..

# Start Frontend
echo "-> Starting Operator Dashboard..."
cd frontend/dashboard
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
cd ../..

echo "[TowerGuard] System Online!"
echo "Dashboard running at http://localhost:5173"
echo "Press Ctrl+C to shutdown all systems."

# Trap Ctrl+C to kill all background processes
trap "echo 'Shutting down TowerGuard...'; kill $BACKEND_PID $SIM_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM

# Wait indefinitely so the trap works
wait
