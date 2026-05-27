# TowerGuard — Patrol Doctrine

## Core Principle

TowerGuard does not run a fixed patrol schedule.

TowerGuard runs an **adaptive posture system** — the Mission Brain continuously evaluates threat state and determines what patrol mode the nest should be in. The system escalates and de-escalates autonomously. The human authorizes critical actions and receives the output.

> The nest always knows what it should be doing. The operator always knows what the nest is doing.

---

## Patrol Modes

TowerGuard operates in four patrol modes. The Mission Brain transitions between them based on threat state, time-of-day profiles, AI pattern learning, and manual operator override.

### Mode 1 — SWEEP

**Trigger:** Default. No active threat.

**Behavior:**
- Single drone (primary: Sentinel type) launches on schedule
- Ascends to patrol altitude
- 360° camera captures full area panorama
- AI scores the frame — no anomaly → "All Clear" logged
- Drone returns to nest
- Incident report updated with timestamp, GPS position, sweep result

**Frequency:** Configurable. Default 30 minutes. AI-adjusted based on:
- Historical anomaly frequency at this site
- Time-of-day risk profile (auto-elevated at night)
- Manual operator override
- Sustained all-clear history → frequency can decrease
- Recent anomaly activity → frequency automatically increases

**Drone load:** 1 active / 3 in reserve

---

### Mode 2 — PATROL

**Trigger:** Elevated threat state. Recent anomaly history. High-risk time window. Operator-initiated.

**Behavior:**
- Single drone flies continuous perimeter waypoint loop
- GPS-defined patrol route (set at deployment, adjustable)
- AI monitors live feed continuously
- Battery rotation maintains zero coverage gap
- All anomaly events scored in real time

**Frequency:** Continuous until threat state drops or operator stands down

**Drone load:** 1 active patrol / 1 ready / 2 charging or reserve

---

### Mode 3 — OVERWATCH

**Trigger:** Anomaly detected in SWEEP or PATROL mode above confidence threshold.

**Behavior:**
- Response drone (secondary type) dispatches immediately to GPS coordinates of flagged event
- Sentinel drone (if airborne) maintains high-altitude area awareness
- Response drone provides close visual: tracking, zoom, stream
- AI continues scoring — confirms or dismisses anomaly
- Push alert sent to operator: incident report auto-populated
- Operator reviews and decides action

**Concurrent drones:** 2 active (Sentinel overwatch + Response detail)

**Drone load:** 2 active / 1 ready / 1 charging or reserve

---

### Mode 4 — LOCKDOWN

**Trigger:** Confirmed high-priority event. Operator-initiated. Critical alert threshold breached.

**Behavior:**
- Maximum drone deployment — all available assets active
- Sentinel maintains area picture
- Response drone(s) on target
- Operator has full manual takeover capability on any drone
- All video feeds streaming to dashboard simultaneously
- Incident report updating in real time
- Operator initiates notification chain

**Drone load:** All available assets active

---

## Threat State Machine

```
CLEAR
  │
  │ AI detects anomaly above low threshold
  ▼
ELEVATED ──────────────────────────────────────┐
  │                                            │
  │ Anomaly confirmed / confidence threshold   │ All clear sustained
  ▼                                            │ AI de-escalates
ACTIVE                                         │
  │                                            │
  │ Critical event / operator-initiated        │
  ▼                                            │
LOCKDOWN ──────────────────────────────────────┘
  │
  │ Operator clears / all-clear confirmed
  ▼
CLEAR
```

**State transitions are AI-driven with human override at every step.**

The operator can:
- Force-escalate to LOCKDOWN at any time
- Force-hold any state (prevent de-escalation while reviewing)
- Force-clear and return to SWEEP

The AI can:
- Escalate CLEAR → ELEVATED → ACTIVE automatically
- Recommend escalation to LOCKDOWN (operator confirms)
- De-escalate ACTIVE → ELEVATED → CLEAR automatically after sustained all-clear window

---

## Drone Teaming Configurations

The nest accommodates 3–4 drones. Drone types are configurable at deployment. The platform supports mixed-type nests.

### Drone Types

**Type A — Sentinel**
- Spherical or enclosed form factor
- 360° camera array
- Optimized for: area awareness, high-altitude sweep, full panoramic coverage
- Ideal mission: SWEEP, OVERWATCH altitude layer
- Limitation: not optimized for close pursuit

**Type B — Response**
- Compact agile form (e.g., DJI Neo class)
- Forward-facing camera, high maneuverability
- Optimized for: close inspection, target tracking, rapid dispatch
- Ideal mission: OVERWATCH detail layer, PATROL perimeter loop
- Under 249g variants: no FAA registration required (civilian advantage)

### Teaming Configurations

| Config | Makeup | Best For |
|---|---|---|
| **Alpha** (default) | 1× Sentinel + 1× Response + 2× Response reserve | Standard residential/commercial site |
| **Bravo** | 2× Sentinel + 1× Response + 1× Response reserve | Large area, dual-zone coverage |
| **Charlie** | 1× Sentinel + 3× Response | High-risk site, rapid response priority |
| **Delta** | 4× Response | No sentinel, all perimeter — dense obstacle environment |
| **Echo** | 2× Sentinel + 2× Response | Full dual-layer — area picture + response at all times |

**Teaming configs are set at deployment and can be reconfigured by the operator from the dashboard.** The Mission Brain automatically adjusts patrol logic based on the active config.

---

## GPS Integration

GPS is not a feature. GPS is infrastructure. It is baked into every layer of the system.

| Layer | GPS Usage |
|---|---|
| Layer 1 — Reflex Brain | Geofence enforcement, RTH coordinates, altitude floor/ceiling |
| Layer 2 — Mission Brain | Patrol waypoints, rotation handoff coordinates, nest position |
| Layer 3 — Command Brain | Anomaly GPS tagging, pattern mapping, terrain learning |
| Operator Dashboard | Live drone position map, incident location markers, patrol route visualization |
| Incident Reports | GPS coordinates of every detection event |
| Alert Notifications | GPS coordinates included in push alert payload |

**Every incident report includes:**
- Timestamp
- Drone ID
- GPS coordinates of detection
- GPS coordinates of drone at time of detection
- Confidence score
- Video/image clip (Phase 2+)
- Patrol mode at time of detection
- Threat state transition log

---

## Notification Chain

TowerGuard is human-in-the-loop for all critical notifications. The system alerts. The human decides.

```
Anomaly detected → AI scores → threshold exceeded
        ↓
Push alert to operator (app notification)
        ↓
Incident report auto-populated:
  - Time, GPS, drone ID, severity, confidence score
  - Video clip / image (Phase 2)
        ↓
Operator reviews dashboard
        ↓
Operator action:
  ├── Acknowledge (log, no escalation)
  ├── Dismiss (false positive, feed back to AI)
  └── Escalate:
        ├── Call 911 (manual — operator's action)
        ├── Notify monitoring center (if third-party service active)
        └── Alert security team (configurable contacts)
```

### Third-Party Monitoring Integration

TowerGuard supports integration with third-party security monitoring centers as a platform tier.

**Why this matters:** Alarm monitoring companies (ADT, Allied Universal, G4S, and hundreds of regional operators) have existing relationships with thousands of properties. If TowerGuard provides a monitoring center API, every alarm company becomes a potential distribution channel. The customer doesn't call TowerGuard — they call their existing alarm company, who resells TowerGuard coverage as a tier.

**Integration model:**
- Monitoring center subscribes to TowerGuard's monitoring API
- Incidents above a configurable severity threshold auto-push to the center's dispatch system
- Monitoring center follows their existing response protocol (call police, dispatch guard, etc.)
- Operator retains full visibility — monitoring center is additive, not a replacement

**Service tiers (concept):**

| Tier | Notification | Monitoring |
|---|---|---|
| Basic | App push only | None |
| Standard | App push + incident report | None |
| Professional | App + report + SMS/email | None |
| Enterprise | All above + third-party monitoring center | Active |

---

## AI Learning — Adaptive Frequency Model

Sweep frequency is not static. The Mission Brain adjusts based on:

**Factors that increase frequency:**
- Recent anomaly events at this site
- Nighttime / configurable high-risk time windows
- Operator-defined high-alert periods (events, holidays, shutdowns)
- Sustained ELEVATED threat state

**Factors that decrease frequency:**
- Extended all-clear history
- Low historical anomaly rate at this site
- Daytime / business hours (configurable)
- Operator-defined low-risk periods

**Learning over time:**
The terrain model accumulates knowledge of the site:
- Which zones generate false positives (animals, trees, shadows)
- Which zones have historically produced real events
- What normal traffic looks like at different times of day
- Delivery/vendor vehicle patterns, guard movement, regular access times

Goal: a TowerGuard nest at month 6 is significantly smarter than the same nest at week 1 — and the operator sees that improvement in fewer false alerts and more accurate escalations.
