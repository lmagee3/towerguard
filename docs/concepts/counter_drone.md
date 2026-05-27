# Concept: Counter-Drone (C-UAS) Integration

**Status:** Parked — Phase 3+
**Do not build until:** GovCon contract secured

---

## Idea

TowerGuard nests are already airborne assets with sensor coverage. The logical extension for military and critical infrastructure customers is counter-drone capability — detecting, tracking, and potentially disrupting unauthorized drone incursions.

Not TowerGuard *shooting down* drones. TowerGuard *detecting and tracking* inbound UAS and handing off to authorized C-UAS systems (jammers, net guns, dedicated C-UAS platforms).

## Capability Tiers

**Tier 1 — Detection only:** RF signature detection, visual ID via sentinel 360° camera. Log and alert. No action.

**Tier 2 — Detection + tracking:** Sentinel drone follows inbound UAS, maintains visual track, streams to operator and law enforcement.

**Tier 3 — Detection + tracking + handoff:** TowerGuard telemetry feeds a dedicated C-UAS system (e.g., Dedrone, D-Fend, Fortem) that handles neutralization. TowerGuard is the sensor. C-UAS is the effector.

## Why It's Parked

- Tier 3 has regulatory and legal complexity (FAA, FCC, Title 18)
- Requires specific GovCon authority for anything beyond detection
- Hardware additions required (RF sensor, potentially directional antenna)
- This is a Phase 3+ capability that requires a funded, contracted program

## Competitive Note

Dedrone (now Axon) is a detection-only C-UAS platform. They don't do patrol. TowerGuard + Dedrone integration is a natural partnership pitch — complementary, not competing.

## Build Trigger

- GovCon contract with explicit C-UAS requirement
- Legal review of applicable regulations for customer jurisdiction
- Dedrone/partner API evaluated
