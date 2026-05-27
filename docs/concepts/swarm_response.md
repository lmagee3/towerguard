# Concept: Swarm Response

**Status:** Parked — Phase 3+
**Do not build until:** Multi-site platform is stable

---

## Idea

Multiple nests at the same site — or adjacent sites — coordinating as a single intelligent system. When an event occurs, the nearest available drone from *any* nest dispatches. Nests share situational awareness. The system behaves as a unified fleet, not isolated units.

## Use Cases

**Large campus or industrial site:** Three nests positioned for optimal coverage. Incident at the east perimeter — the east nest dispatches. East nest fully committed — the north nest assists.

**Adjacent properties:** Two neighboring warehouses share a TowerGuard deployment. Cost-sharing model. Shared coverage.

**Multi-building complex:** Hospital campus, university, military installation with multiple buildings. One command dashboard. Distributed nests. Unified intelligence picture.

## Architecture Implication

Single-nest architecture (Phase 1) doesn't need to change to support this. The Mission Brain abstraction already operates at the "nest" level. Phase 3 adds a "site" layer above nest — coordinating multiple Mission Brains under one Command Brain.

## Commercial Angle

Swarm response unlocks a managed service model. TowerGuard operates the fleet on behalf of the customer. Monthly subscription per nest, centrally managed. This is the ADT/alarm monitoring company model — but for drone fleets.

## Build Trigger

- First multi-nest customer inquiry
- Phase 2 single-nest architecture proven stable
- Backend multi-site data model designed
