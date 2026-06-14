# TowerGuard — Local AI Brain Architecture

## Overview

TowerGuard uses a local AI model (Gemma via Ollama) as a mission reasoning layer — not as a flight controller.

The separation is absolute and intentional:

| Layer | System | Responsible For |
|---|---|---|
| Reasoning | Gemma / Ollama | Mission decisions, anomaly classification, operator recommendations |
| Vision | YOLO / OpenCV | Object detection, motion classification from camera feeds |
| Command bridge | MAVLink / ROS2 | Translates high-level mission commands to flight controller protocol |
| Flight control | PX4 / ArduPilot | Motors, stabilization, RTH, failsafes, geofence, altitude hold |
| Operator layer | TowerGuard Command | Audit log, human authorization, dashboard, incident records |

> The AI brain does not touch motors. PX4 and ArduPilot do not take orders from a language model. The bridge between them is MAVLink — a protocol designed for exactly this companion-computer architecture.

---

## Why This Stack

### PX4 / ArduPilot for Flight Control

PX4 and ArduPilot are the industry standard for autonomous flight control. They are:
- Battle-tested in commercial, military, and research applications
- Designed explicitly for companion computer integration via MAVLink
- Running deterministic safety loops that cannot be overridden by higher-level software
- Responsible for all emergency failsafes independent of the companion computer state

PX4's own architecture describes the flight controller as the layer running core flight and safety code, with a companion computer running Linux handling higher-level software via MAVLink. TowerGuard's local AI is that companion computer.

### MAVLink / ROS2 as the Command Bridge

MAVLink is the protocol. ROS2 is an optional middleware layer for more complex multi-drone orchestration.

The AI brain speaks high-level intent:
> "Dispatch WT-02 to East Gate waypoint. Maintain 25m altitude. Hold and observe."

MAVLink translates that to the precise command sequence PX4 understands. The AI never sends raw motor commands.

### Gemma / Ollama for Reasoning

Gemma running locally via Ollama is the mission brain. Local because:
- No cloud dependency in the field (LTE outage does not kill the AI)
- Data stays on-premise (critical for GovCon and privacy-sensitive civilian deployments)
- Latency is deterministic — no round-trip to an API

Gemma interprets context and produces structured recommendations. It does not execute them.

### YOLO / OpenCV for Vision

YOLO (You Only Look Once) handles real-time object detection from drone camera feeds. OpenCV handles pre-processing, motion detection, and frame analysis.

Vision output feeds the reasoning layer:
- "Person detected, confidence 0.87, East Gate sector"
- "Vehicle, confidence 0.91, moving NE at ~15 km/h"
- "No object detected, sector clear"

Gemma takes that classification and decides what to do with it.

---

## Responsibilities

### Gemma / Ollama IS Responsible For

- Summarizing site status for the operator
- Classifying anomaly events from sensor and vision data
- Recommending drone dispatch decisions
- Selecting patrol route based on threat state and site context
- Explaining decisions in plain language (audit log)
- Requesting human approval before escalation
- Generating incident summaries
- Adapting sweep frequency based on historical data

### Gemma / Ollama Is NOT Responsible For

- Motor control
- Stabilization and attitude control
- Emergency failsafe (RTH on signal loss, low battery cutoff)
- Geofence enforcement
- Collision avoidance
- Armed or security response decisions
- Any action requiring human authorization

---

## Example: Anomaly Response Flow

**Input context to Gemma:**
```
Site: Demo Test Range
Threat state: CLEAR
Active drone: WT-01 — patrolling North Fence — battery 31%
Ready drone: WT-02 — battery 94%
Vision event: Motion detected near East Gate — confidence 0.82 — unclassified
Time: 02:14 local
```

**Gemma recommendation output:**
```
Recommended actions:
1. Dispatch WT-02 to East Gate — waypoint GPS: [lat, lng] — altitude 25m — hold and observe
2. Initiate WT-01 RTN — battery below threshold, anomaly coverage transferred
3. Escalate threat state: CLEAR → ELEVATED
4. Push alert to operator: "Motion detected East Gate 02:14 — WT-02 dispatched — review feed"
5. Hold LOCKDOWN pending operator review

Reasoning: Unclassified motion at 02:14 warrants observation. WT-01 battery insufficient for extended response. WT-02 is optimal dispatch. Human review required before escalation to ACTIVE.

Confidence: 0.74
Recommended operator action: Review WT-02 feed — confirm or dismiss within 5 minutes
```

**What happens next:**
- TowerGuard Command receives the recommendation
- Mission Brain executes: dispatches WT-02 via MAVLink, initiates WT-01 RTN via MAVLink
- Alert pushed to operator dashboard and app
- PX4 on WT-02 handles the actual flight — takeoff, navigation to waypoint, hover
- PX4 on WT-01 handles RTN — navigation back to nest, landing sequence
- Operator reviews feed and makes escalation decision
- Gemma's reasoning is logged to incident record verbatim

---

## Phase Implementation

### Phase 1 — Simulation (Current)

Gemma is stubbed in `backend/ai/mission_reasoner.py`. The stub returns structured recommendations matching the interface contract above. The rest of the platform — telemetry pipeline, alert engine, dashboard — doesn't know or care that the reasoning is fake.

### Phase 2 — Ollama Integration

- Ollama installed on companion computer (Raspberry Pi 5 or Jetson Nano)
- Gemma 3 (4B or 9B depending on hardware) loaded locally
- `mission_reasoner.py` stub replaced with Ollama API client
- Same interface contract, real inference
- MAVLink bridge wired to actual drone hardware

### Phase 3 — Fine-tuned Model

- Gemma fine-tuned on TowerGuard-specific incident data from pilot deployments
- Site-specific patrol behavior trained into the model
- Response accuracy improves with operational history

---

## Why This Is Fundable Language

This architecture is explicitly safe, layered, and explainable:

1. **Safe:** Flight-critical code runs on PX4/ArduPilot, not a language model. Failsafes are hardware-level.
2. **Layered:** Each layer has a defined scope. The AI reasons. The bridge translates. The controller flies.
3. **Explainable:** Every Gemma recommendation is logged with reasoning. The operator and any auditor can see exactly why each action was taken.
4. **Human-in-the-loop:** Gemma recommends. The operator authorizes escalation. The system does not independently escalate to LOCKDOWN or contact authorities.

For SBIR, AFWERX, DHS, and DIU reviewers: this is not "we gave a chatbot a quadcopter." This is a companion computer architecture with a local reasoning layer, flight-tested autopilot, and defined human authorization gates.
