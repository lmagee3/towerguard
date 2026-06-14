from enum import Enum
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class DroneStatus(str, Enum):
    PATROLLING = "PATROLLING"
    READY = "READY"
    CHARGING = "CHARGING"
    MAINTENANCE = "MAINTENANCE"
    RTN = "RTN"  # Return to nest

class NestStatus(str, Enum):
    SECURED = "SECURED"
    LAUNCHING = "LAUNCHING"
    RECOVERING = "RECOVERING"
    FAULT = "FAULT"

class AlertSeverity(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class AlertType(str, Enum):
    MOTION = "MOTION"
    ANOMALY = "ANOMALY"
    LOW_BATTERY = "LOW_BATTERY"
    TAKEOVER_REQUEST = "TAKEOVER_REQUEST"
    FAULT = "FAULT"

class LatLng(BaseModel):
    lat: float
    lng: float

class DroneState(BaseModel):
    id: str
    status: DroneStatus
    battery_pct: int
    position: LatLng
    mission_id: Optional[str] = None
    last_seen: datetime

class NestState(BaseModel):
    id: str
    status: NestStatus
    active_mission: Optional[str] = None
    drones: List[DroneState]

class Alert(BaseModel):
    id: str
    type: AlertType
    severity: AlertSeverity
    source_drone: str
    position: Optional[LatLng] = None
    timestamp: datetime
    acknowledged: bool = False
    message: str

class Mission(BaseModel):
    id: str
    name: str
    status: str
    assigned_drone: Optional[str] = None
