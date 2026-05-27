# ADR 002 — AI Stub Architecture (Build Interfaces, Not the Brain)

**Date:** 2026-05-27
**Status:** Accepted
**Deciders:** Lawrence Magee, Claude Opus

---

## Context

TowerGuard's product vision includes a three-layer AI brain (Reflex, Mission, Command). Building real AI models in Phase 1 would mean:

1. Weeks of ML work before a single demo frame renders
2. Architecture that couples AI behavior tightly to simulation logic
3. No clean seam between AI inference and the rest of the platform
4. High risk of the "build the AI" task expanding to swallow the sprint

At the same time, if we ignore AI entirely in Phase 1, the platform gets built in a way that treats AI as a future bolt-on — which inevitably means architectural surgery when Phase 2 arrives.

---

## Decision

**Build stub modules with real interfaces. Return simulated outputs. Do not build real models yet.**

```
backend/ai/
├── anomaly_engine.py      # stub → returns scored anomaly events
├── mission_reasoner.py    # stub → returns patrol/rotation decisions
└── terrain_model.py       # stub → returns site awareness data
```

Each stub defines the full function signature and return types that a real model will eventually satisfy. The rest of the platform (telemetry pipeline, alert engine, mission engine) calls these interfaces and does not care whether the underlying implementation is a stub or a trained model.

---

## Interface Contracts (Sprint 001 targets)

```python
# anomaly_engine.py
def score_telemetry_frame(frame: TelemetryFrame) -> AnomalyScore:
    """Returns a score 0.0–1.0 and event classification."""
    ...

# mission_reasoner.py
def get_rotation_decision(nest_state: NestState) -> RotationDecision:
    """Returns which drone to launch next and why."""
    ...

# terrain_model.py
def get_site_awareness(site_id: str) -> SiteAwareness:
    """Returns known blind spots, risk zones, and baseline patterns."""
    ...
```

Stubs return hardcoded or lightly randomized values that produce realistic-looking dashboard behavior for the demo.

---

## What Phase 2 Looks Like

When real AI is ready, the swap is:

```python
# anomaly_engine.py — Phase 2
def score_telemetry_frame(frame: TelemetryFrame) -> AnomalyScore:
    return cv_model.infer(frame)   # real model, same interface
```

No changes to the alert engine, telemetry pipeline, or dashboard. The contract is preserved.

---

## Alternatives Considered

**Build no AI layer at all:** Faster in Phase 1, but creates a bolt-on problem in Phase 2. The alert system ends up hard-coded in ways that resist abstraction.

**Build real anomaly detection in Phase 1:** Premature. We don't have real sensor data yet. Any model trained now would be trained on synthetic data and would need to be retrained anyway post-pilot.

**Use a third-party AI API (OpenAI, Gemini) as a placeholder:** Adds cost and API dependency to a Phase 1 sim. Overkill. Stubs are cleaner.

---

## Consequences

- Platform is AI-native from day one in architecture, not behavior
- Sprint 001 stays scoped to simulation + dashboard
- Phase 2 AI work is a clean drop-in, not a refactor
- GovCon reviewers see a platform designed for AI integration, not a demo with "AI" painted on the side
