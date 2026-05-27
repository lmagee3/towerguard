# ADR 001 — Technology Stack Selection

**Date:** 2026-05-27  
**Status:** Accepted  
**Deciders:** Lawrence Magee, Claude

---

## Context

We need to select the initial technology stack for TowerGuard Sim (Phase 1). Choices should optimize for: speed of implementation, GovCon credibility, real-time capability, and a clean path to production hardware integration.

---

## Decision

| Layer | Choice | Rationale |
|---|---|---|
| Backend | Python 3.11 + FastAPI | Async-native, WebSocket support built-in, widely understood, strong ecosystem for simulation |
| State store | SQLite (Phase 1) | Zero-config, sufficient for single-site sim, easy migration to PostgreSQL |
| Real-time | FastAPI WebSockets | No additional broker required for Phase 1 scale |
| Frontend | React + TypeScript + Vite | Type safety, large ecosystem, fast iteration |
| Styling | Tailwind CSS | Rapid layout, consistent design tokens |
| Simulation | Python asyncio | Same runtime as backend, no separate process manager needed |
| Deployment | Docker Compose | Reproducible dev + demo environment, simple to hand off |
| CI/CD | GitHub Actions | Free for public repo, standard |

---

## Alternatives Considered

**FastAPI vs Django/DRF:** Django adds too much overhead for an API-first, real-time platform. FastAPI's async model is a better fit.

**SQLite vs PostgreSQL:** PostgreSQL adds a required service dependency for Phase 1. SQLite is sufficient for single-site simulation with < 10 concurrent operators.

**WebSockets vs Redis Pub/Sub:** Redis adds infrastructure complexity. Phase 1 scale does not justify it. Redis Pub/Sub is the natural upgrade path when multi-node coordination is needed.

**Vue vs React:** React has broader adoption in GovCon/enterprise contexts. Larger talent pool for future hires.

---

## Consequences

- Simulation engine and backend share one Python runtime — tight coupling acceptable for Phase 1, will need to decouple in Phase 2 for hardware integration
- SQLite will need migration to PostgreSQL before multi-site deployment
- WebSocket implementation needs reconnection handling from day one (AntiGravity flag)
