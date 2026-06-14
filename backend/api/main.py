from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from datetime import datetime
import json
from .models import DroneState, NestState, Alert, Mission, NestStatus, DroneStatus, LatLng, AlertType, AlertSeverity

app = FastAPI(title="TowerGuard API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory state (to be populated by the simulation engine)
mock_drones = {
    "WT-01": DroneState(id="WT-01", status=DroneStatus.READY, battery_pct=100, position=LatLng(lat=30.2672, lng=-97.7431), last_seen=datetime.now()),
    "WT-02": DroneState(id="WT-02", status=DroneStatus.READY, battery_pct=100, position=LatLng(lat=30.2672, lng=-97.7431), last_seen=datetime.now()),
    "WT-03": DroneState(id="WT-03", status=DroneStatus.CHARGING, battery_pct=42, position=LatLng(lat=30.2672, lng=-97.7431), last_seen=datetime.now()),
    "WT-04": DroneState(id="WT-04", status=DroneStatus.MAINTENANCE, battery_pct=0, position=LatLng(lat=30.2672, lng=-97.7431), last_seen=datetime.now())
}

mock_nest = NestState(
    id="NEST-ALPHA",
    status=NestStatus.SECURED,
    drones=list(mock_drones.values())
)

alerts: List[Alert] = []
missions: List[Mission] = []

# WebSocket connection managers
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

telemetry_manager = ConnectionManager()
alerts_manager = ConnectionManager()


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/nest/status", response_model=NestState)
def get_nest_status():
    mock_nest.drones = list(mock_drones.values())
    return mock_nest

@app.get("/drones", response_model=List[DroneState])
def get_drones():
    return list(mock_drones.values())

@app.get("/drones/{drone_id}", response_model=DroneState)
def get_drone(drone_id: str):
    if drone_id not in mock_drones:
        raise HTTPException(status_code=404, detail="Drone not found")
    return mock_drones[drone_id]

@app.post("/drones/{drone_id}/takeover")
def drone_takeover(drone_id: str):
    if drone_id not in mock_drones:
        raise HTTPException(status_code=404, detail="Drone not found")
    # In a real system, this would hand off control. For now, just ack.
    return {"status": "takeover_acknowledged", "drone_id": drone_id}

@app.post("/drones/{drone_id}/return-to-nest")
def drone_rtn(drone_id: str):
    if drone_id not in mock_drones:
        raise HTTPException(status_code=404, detail="Drone not found")
    mock_drones[drone_id].status = DroneStatus.RTN
    return {"status": "rtn_initiated", "drone_id": drone_id}

@app.get("/alerts", response_model=List[Alert])
def get_alerts():
    return alerts

@app.post("/alerts/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: str):
    for alert in alerts:
        if alert.id == alert_id:
            alert.acknowledged = True
            return {"status": "acknowledged"}
    raise HTTPException(status_code=404, detail="Alert not found")

@app.get("/missions", response_model=List[Mission])
def get_missions():
    return missions

@app.post("/missions")
def create_mission(mission: Mission):
    missions.append(mission)
    return mission

# Integration endpoint for the simulation engine to update state
@app.post("/sim/update")
async def update_simulation_state(nest_state: NestState):
    global mock_nest, mock_drones
    mock_nest = nest_state
    for drone in nest_state.drones:
        mock_drones[drone.id] = drone
    
    # Broadcast new state via WebSockets
    state_json = nest_state.model_dump_json()
    await telemetry_manager.broadcast(state_json)
    return {"status": "updated"}

@app.post("/sim/alert")
async def inject_alert(alert: Alert):
    alerts.insert(0, alert)  # Add to top
    await alerts_manager.broadcast(alert.model_dump_json())
    return {"status": "alert_injected"}

@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await telemetry_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        telemetry_manager.disconnect(websocket)

@app.websocket("/ws/alerts/live")
async def websocket_alerts(websocket: WebSocket):
    await alerts_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        alerts_manager.disconnect(websocket)
