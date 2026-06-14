"""
@file        engine.py
@description TowerGuard simulation engine — drives drone state transitions,
             battery drain, patrol rotation, and anomaly injection via the
             FastAPI backend's /sim endpoints.
@module      simulation
@author      Codex (original), Opus (httpx→urllib fix for proxy compat)
@created     2026-06-05
@modified    2026-06-07
"""

import asyncio
import json
import random
import uuid
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.error import URLError

API_URL = "http://127.0.0.1:8000"


def _post(path: str, payload: dict) -> None:
    """Fire-and-forget POST to the backend. Swallows errors."""
    try:
        req = Request(
            f"{API_URL}{path}",
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urlopen(req, timeout=5) as _:
            pass
    except (URLError, OSError):
        pass


def _get(path: str) -> dict | None:
    """GET JSON from the backend. Returns None on failure."""
    try:
        req = Request(f"{API_URL}{path}")
        with urlopen(req, timeout=5) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except (URLError, OSError, json.JSONDecodeError) as e:
        print(f"Failed to connect to backend: {e}")
        return None


async def get_current_state() -> dict | None:
    return await asyncio.to_thread(_get, "/nest/status")


async def update_backend_state(nest_state: dict) -> None:
    await asyncio.to_thread(_post, "/sim/update", nest_state)


async def trigger_alert(drone_id: str, alert_type: str, severity: str, message: str) -> None:
    alert = {
        "id": str(uuid.uuid4()),
        "type": alert_type,
        "severity": severity,
        "source_drone": drone_id,
        "position": {
            "lat": 30.2672 + random.uniform(-0.005, 0.005),
            "lng": -97.7431 + random.uniform(-0.005, 0.005),
        },
        "timestamp": datetime.now().isoformat(),
        "acknowledged": False,
        "message": message,
    }
    await asyncio.to_thread(_post, "/sim/alert", alert)


async def simulate_tick() -> None:
    print("Starting simulation engine...")
    tick = 0
    while True:
        state = await get_current_state()
        if state:
            drones = state.get("drones", [])
            for drone in drones:
                drone["last_seen"] = datetime.now().isoformat()

                if drone["status"] == "PATROLLING":
                    # Jitter position to simulate movement
                    drone["position"]["lat"] += random.uniform(-0.0001, 0.0001)
                    drone["position"]["lng"] += random.uniform(-0.0001, 0.0001)
                    drone["battery_pct"] = max(0, drone["battery_pct"] - 1)

                    if drone["battery_pct"] < 20 and random.random() < 0.1:
                        drone["status"] = "RTN"
                        await trigger_alert(
                            drone["id"], "LOW_BATTERY", "MEDIUM",
                            f"{drone['id']} returning to nest — low battery ({drone['battery_pct']}%)",
                        )
                    elif random.random() < 0.05:
                        await trigger_alert(
                            drone["id"], "MOTION", "HIGH",
                            f"Motion detected near perimeter by {drone['id']}",
                        )

                elif drone["status"] == "RTN":
                    # Fly back toward nest
                    drone["position"]["lat"] += (30.2672 - drone["position"]["lat"]) * 0.1
                    drone["position"]["lng"] += (-97.7431 - drone["position"]["lng"]) * 0.1
                    drone["battery_pct"] = max(0, drone["battery_pct"] - 1)
                    if abs(drone["position"]["lat"] - 30.2672) < 0.0005:
                        drone["status"] = "CHARGING"
                        drone["position"] = {"lat": 30.2672, "lng": -97.7431}

                elif drone["status"] == "CHARGING":
                    drone["battery_pct"] = min(100, drone["battery_pct"] + 2)
                    if drone["battery_pct"] >= 95:
                        drone["status"] = "READY"

                elif drone["status"] == "READY":
                    patrolling = [d for d in drones if d["status"] in ("PATROLLING", "RTN")]
                    if not patrolling:
                        drone["status"] = "PATROLLING"

            await update_backend_state(state)
            tick += 1
            if tick % 5 == 0:
                statuses = ", ".join(f"{d['id']}:{d['status']}({d['battery_pct']}%)" for d in drones)
                print(f"[tick {tick}] {statuses}")

        await asyncio.sleep(2)


if __name__ == "__main__":
    asyncio.run(simulate_tick())
