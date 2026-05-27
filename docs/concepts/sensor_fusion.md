# Concept: Sensor Fusion

**Status:** Parked — Phase 2+
**Do not build until:** Drone patrol platform is stable

---

## Idea

Drones are the initial sensor layer. They are not the only sensor layer.

TowerGuard's architecture is sensor-agnostic. The platform ingests telemetry and event data from any connected sensor. Over time, additional sensors feed the same Command Brain, creating a richer picture than any single sensor type can provide.

## Sensor Roadmap

| Sensor | Phase | Value |
|---|---|---|
| Drone cameras (visible) | Phase 1 | Core — already in |
| Thermal imaging | Phase 2 | Night coverage, heat signature detection |
| Fixed perimeter cameras (RTSP) | Phase 2 | Always-on coverage for key chokepoints |
| Acoustic sensors | Phase 2 | Gunshot detection, glass break, vehicle |
| Radar (short-range ground) | Phase 3 | All-weather, through-vegetation detection |
| RF detection | Phase 3 | Detect unauthorized drones, comms intercept |
| Seismic sensors | Phase 3 | Underground tunnel detection (GovCon) |

## Architecture Implication

The platform already has `integrations/sensors/` and `integrations/cameras/` in the directory structure. These are placeholders. The Command Brain stub (`anomaly_engine.py`) should eventually accept multi-sensor input frames, not just drone telemetry.

## Build Trigger

- Pilot site requests fixed camera integration
- Customer has existing sensor infrastructure to integrate
- Phase 2 thermal imaging is the natural first expansion
