# Concept: Terrain Learning

**Status:** Parked — post-pilot
**Do not build until:** Phase 2 pilot data exists

---

## Idea

TowerGuard learns its deployment environment over time. Each sweep, each patrol, each incident — the system builds a model of what "normal" looks like at this specific site.

Over weeks and months:
- Blind spots and dead zones are identified and flagged
- High-risk zones emerge from incident clustering
- Normal traffic patterns are baselined (delivery windows, guard movement, regular vehicles)
- False positive zones (trees, animals, shadows) are tuned out

The longer TowerGuard runs at a site, the smarter it gets. Month 6 performance is meaningfully better than week 1.

## Why It Matters

This is the lock-in moat. A competitor can copy the nest. They can't copy 6 months of terrain intelligence at a specific customer site.

## Build Trigger

Don't touch this until:
1. At least one pilot site has 30 days of real telemetry data
2. `backend/ai/terrain_model.py` stub is live and has been feeding real data
3. We have enough incidents to train against

## Notes

- Terrain model stub is already stubbed in `backend/ai/terrain_model.py`
- The interface contract is defined — real implementation plugs in without architecture changes
- Consider: does terrain data stay on-device/on-nest, or does it aggregate to cloud? Privacy implications for civilian customers.
