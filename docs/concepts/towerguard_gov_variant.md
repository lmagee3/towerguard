# Concept: TowerGuard Gov Variant

**Status:** Parked — Phase 3 / post-SBIR Phase II
**Do not build until:** Commercial platform proven, GovCon contract in hand

---

## Idea

A hardened, compliance-ready variant of TowerGuard for DoD, DHS, and federal law enforcement customers. Same platform, different packaging, different hardware requirements, different compliance posture.

## Differences from Commercial Platform

| Dimension | Commercial | Gov Variant |
|---|---|---|
| Hardware | COTS drones (DJI, etc.) | US-origin only (NDAA-compliant) |
| Data residency | Cloud (standard) | On-prem / GovCloud (FedRAMP) |
| Authentication | Standard auth | CAC/PIV integration |
| Network | Commercial LTE/WiFi | MILNET / classified network option |
| Encryption | Standard TLS | FIPS 140-2 compliant |
| Compliance | None | FedRAMP, CMMC, ITAR (if required) |
| Audit logging | Standard | SIEM integration, full chain of custody |

## Why Hardware Matters

DJI drones are prohibited for DoD use (NDAA Section 848 and subsequent guidance). The Gov Variant must use US-origin or approved-vendor hardware. Current candidates:
- Skydio (US-made, DoD approved)
- Autel Robotics (US-headquartered, evaluating)
- Custom/contracted airframe

## Build Trigger

- SBIR Phase II award
- DoD contract or Letter of Intent
- Legal review of ITAR implications for sensor payload
- FedRAMP authorization path scoped with a compliance partner

## Note

The commercial platform is the proof. Every commercial deployment, every incident log, every all-clear sweep makes the Gov Variant pitch more credible. Build commercial first. Let the data make the GovCon case.
