# ADR 004 — Flight Control Separation (AI Reasons, PX4 Flies)

**Date:** 2026-05-27
**Status:** Accepted
**Deciders:** Lawrence Magee, Claude

---

## Context

TowerGuard's AI layer (Gemma/Ollama) makes mission-level decisions: which drone to dispatch, what route to fly, when to escalate threat state. The question is whether the AI should also handle low-level flight control — motors, stabilization, failsafes.

The answer is no, and the separation must be architectural, not just a coding convention.

---

## Decision

**Flight control runs on PX4 or ArduPilot. The AI never sends motor commands.**

```
Gemma/Ollama  →  MAVLink/ROS2  →  PX4/ArduPilot  →  motors
  (reasoning)     (bridge)        (flight control)
```

The AI sends high-level mission commands via MAVLink:
- "Go to waypoint [lat, lng, alt]"
- "Hold position"
- "Return to home"
- "Land"

PX4/ArduPilot translates those into the precise actuator commands that actually move the aircraft. All safety-critical logic — failsafes, geofence, altitude limits, collision avoidance, RTH on signal loss — runs in the flight controller, independent of the companion computer state.

If the companion computer (Gemma/Ollama) crashes, PX4 keeps flying. If LTE drops, ArduPilot RTH triggers. The AI has no path to cause a crash.

---

## Why PX4 / ArduPilot

Both are purpose-built for autonomous flight with companion computer support:

- **PX4:** Modern, widely adopted in commercial and research applications, strong MAVLink integration, active SITL (software-in-the-loop) simulator for Phase 2 testing
- **ArduPilot:** Broader community, more vehicle types, battle-tested in military and civilian programs, also MAVLink-native

Both support companion computer patterns explicitly in their documentation. TowerGuard is implementing a well-understood architecture, not inventing one.

TBD: which FC becomes the standard. PX4 is the Phase 2 evaluation target. Decision deferred until hardware selection.

---

## Why MAVLink

MAVLink is the de facto standard protocol for ground control station ↔ autopilot communication. It:
- Is already understood by PX4, ArduPilot, QGroundControl, and most commercial drone platforms
- Provides a well-defined set of mission commands with documented safety semantics
- Does not allow arbitrary code execution on the flight controller
- Has an established audit trail

ROS2 is an optional addition for more complex multi-drone orchestration. It adds overhead but enables richer inter-drone communication patterns for Phase 3 swarm capabilities.

---

## Vision Layer

YOLO + OpenCV run on the companion computer, feeding classified detections to Gemma. The vision layer does not command the drone directly — it provides Gemma with structured scene understanding.

```
Camera frame → OpenCV (pre-process) → YOLO (detect) → Gemma (reason) → MAVLink (command) → PX4 (fly)
```

---

## Phase 1 Implication

The simulation engine replaces everything from MAVLink down. The stub AI interfaces (`anomaly_engine.py`, `mission_reasoner.py`) simulate what Gemma will eventually produce. The FastAPI backend and dashboard don't know the difference.

When Phase 2 wires in real hardware, the swap is:
- Replace simulation engine with MAVLink bridge
- Replace AI stubs with Ollama client
- Everything above stays the same

---

## Why This Is the Right Funding Narrative

Every safety-concerned reviewer — AFWERX, SBIR program managers, DHS, insurance underwriters, civilian customers — will ask: "What stops the AI from crashing the drone?"

The answer is: the AI doesn't fly the drone. PX4 does. The AI makes recommendations. MAVLink enforces the protocol boundary. The flight controller enforces the physics.

That answer is technically correct, architecturally verifiable, and fundable.
