# ADR 003 — Adaptive Patrol Architecture (Episodic + Continuous Hybrid)

**Date:** 2026-05-27
**Status:** Accepted
**Deciders:** Lawrence Magee, Claude Opus

---

## Context

Two patrol models were on the table:

**Model A — Continuous waypoint patrol**
One drone always airborne, flying a perimeter loop. Battery rotation maintains zero coverage gap. Simple, reliable, high power consumption.

**Model B — Episodic sentinel sweep**
Single spherical/360° drone launches on a schedule, ascends, sweeps the full area, returns. Lower power consumption. Event-driven response layer on anomaly.

Neither model alone is optimal. Continuous patrol burns resources when there's nothing happening. Episodic sweeps create windows of no coverage between launches.

---

## Decision

**Implement both as patrol modes within an adaptive threat-state machine.**

The Mission Brain (Layer 2) manages which mode the nest is in based on current threat state. The Command Brain (Layer 3) drives state transitions based on anomaly detection, confidence scoring, time-of-day profiles, and historical site data.

**Four patrol modes:**
- SWEEP — episodic, configurable interval (default CLEAR state)
- PATROL — continuous waypoint loop (ELEVATED state)
- OVERWATCH — Sentinel altitude layer + Response detail drone (ACTIVE state)
- LOCKDOWN — all assets, manual operator control (CRITICAL state)

**Sweep frequency is AI-adaptive**, not operator-set-and-forget. The Mission Brain increases frequency after anomaly history and decreases it after sustained all-clear periods. Operators can override at any time.

---

## Drone Teaming

Two drone types are defined:

**Type A — Sentinel:** Spherical/enclosed, 360° camera array. Area awareness and high-altitude sweep. Primary mission: SWEEP and OVERWATCH altitude layer.

**Type B — Response:** Compact agile form (DJI Neo class), forward camera, high maneuverability. Primary mission: PATROL perimeter loop and OVERWATCH detail layer.

Teaming configuration (mix of Type A and Type B in the nest) is set at deployment and reconfigurable via dashboard. The Mission Brain adapts patrol logic automatically to the active teaming config.

GPS is foundational infrastructure across all layers — geofencing, waypoint navigation, incident geo-tagging, live map view.

---

## Notification Architecture

Human-in-the-loop for all consequence decisions.

- Anomaly → AI scores → threshold exceeded → push alert to operator
- Operator reviews auto-populated incident report (time, GPS, drone ID, confidence, severity)
- Operator decides: acknowledge / dismiss / escalate
- Escalation options: manual 911, third-party monitoring center (if subscribed), security team contacts

Third-party monitoring center integration is a platform tier — alarm companies can subscribe to a TowerGuard monitoring API and handle dispatch through their existing protocols. This creates a B2B distribution channel through the existing alarm monitoring industry.

---

## Why This Matters Competitively

No competitor is combining:
1. Adaptive patrol posture (episodic ↔ continuous, AI-driven)
2. Two-drone-type teaming with configurable nest configuration
3. Threat state machine with autonomous escalation/de-escalation
4. Human-in-the-loop notification chain with third-party monitoring tier

This architecture is the defensible moat. It's not a feature list — it's a fundamentally different system design.

---

## Consequences

- Simulation engine must implement the four-mode state machine (not just a single patrol loop)
- Sprint 001 simulation scenarios need to cover state transitions, not just patrol events
- AI stub interfaces must support: anomaly scoring, threat state recommendation, sweep frequency recommendation
- GPS must be included in every telemetry frame from day one
- Dashboard must visualize current threat state and patrol mode prominently
- Monitoring center integration goes in `integrations/` as a Phase 2 module

---

## Reference

Full patrol behavior specification: `docs/product/PATROL_DOCTRINE.md`
