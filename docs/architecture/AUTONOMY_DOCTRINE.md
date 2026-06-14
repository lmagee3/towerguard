# TowerGuard Autonomy Doctrine

TowerGuard uses a hybrid autonomy model.

The central TowerGuard Command/Nest Brain coordinates missions, drone rotation, alerts, operator workflows, and incident intelligence.

Each drone maintains a local autonomy layer responsible for safe flight, obstacle avoidance, geofence compliance, emergency return-to-home, and degraded-mode operation if communications are lost.

---

**The central brain commands missions.**

**The drone brain protects the aircraft.**

**Humans authorize critical escalation.**

---

## Responsibility Map

| Layer | System | Owns |
|---|---|---|
| Mission command | TowerGuard Command / Nest Brain | Patrol scheduling, drone rotation, alert generation, incident logging, operator notifications |
| Local autonomy | PX4 / ArduPilot (on-drone) | Safe flight, stabilization, obstacle avoidance, geofence enforcement, RTH on comms loss |
| Reasoning | Gemma / Ollama (companion computer) | Anomaly classification, mission recommendations, threat state input, incident summaries |
| Critical escalation | Human operator | LOCKDOWN authorization, law enforcement contact, response coordination |

---

## Degraded Mode

If the central brain loses communication with a drone:

- The drone does **not** stop flying
- Local autonomy holds last known mission parameters
- If comms are not restored within the configured timeout, the drone executes Return-to-Home autonomously
- PX4/ArduPilot handles RTH — no central brain required

The central brain cannot cause a crash by going offline. The drone defaults to safe behavior.

---

## Authority Hierarchy

```
1. Flight safety (PX4/ArduPilot)     ← always wins, cannot be overridden
2. Geofence compliance (PX4)         ← hardware-enforced
3. Human operator override           ← manual takeover supersedes AI
4. TowerGuard Command / Nest Brain   ← mission coordination
5. AI reasoning (Gemma/Ollama)       ← recommendation only
```

No AI recommendation can bypass levels 1–3. No mission command can bypass levels 1–2.
