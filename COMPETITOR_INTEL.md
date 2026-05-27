# TowerGuard — Competitor Intelligence

> **Status:** Initial framework. Research required. See `docs/market-research/` for deep-dive files.

---

## Competitive Landscape Overview

The drone-in-a-box and perimeter security markets are active but fragmented. Most players fall into one of three categories:

1. **Hardware vendors** selling the drone + dock as a product
2. **Enterprise platforms** built on top of a single hardware partner (DJI or Skydio)
3. **Specialized GovCon players** with classified programs

TowerGuard's position: **platform-layer software** that is hardware-agnostic and focused on the persistent multi-drone rotation problem none of the above solve elegantly.

---

## Key Competitors

### Percepto

**What:** Drone-in-a-box platform. Autonomous inspection and security patrols.
**Hardware:** Proprietary dock + drone system.
**Market:** Critical infrastructure (oil & gas, utilities, telecom).
**Funding:** ~$67M raised (as of 2023).
**Weakness:** Single-drone per dock. Downtime during charging. High per-unit cost. Closed hardware ecosystem.
**TowerGuard angle:** Multi-drone rotation eliminates Percepto's coverage gap. Platform-agnostic = faster customer adoption.

---

### Skydio

**What:** US-based autonomous drone manufacturer. AI-driven obstacle avoidance.
**Hardware:** Skydio 2+, X2, X10.
**Market:** Public safety, defense, inspection.
**Funding:** ~$340M raised.
**Weakness:** Hardware company first. Limited nest/dock ecosystem. Software platform is shallow compared to hardware capability.
**TowerGuard angle:** Skydio drones could be integrated as a hardware layer under TowerGuard. Not a competitor on the platform level.

---

### Nightingale Security (acquired by Motorola Solutions)

**What:** Autonomous drone security patrols for enterprise campuses.
**Hardware:** DJI-based systems + custom dock.
**Market:** Corporate campus security, data centers.
**Status:** Acquired by Motorola Solutions — signals market validation for autonomous security drones.
**Weakness:** Pre-acquisition focus on commercial real estate, not GovCon or critical infrastructure. DJI hardware creates federal procurement friction (Chinese origin).
**TowerGuard angle:** US-origin hardware path is a differentiator for federal buyers. GovCon positioning is uncrowded.

---

### Dedrone (now part of Dedrone by Axon)

**What:** Counter-drone (C-UAS) detection and mitigation platform.
**Hardware:** Sensor networks, not patrol drones.
**Market:** Military, airports, critical infrastructure.
**Weakness:** Reactive detection, not proactive patrol. Different mission set — detecting inbound threats vs. persistent outbound awareness.
**TowerGuard angle:** Complementary, not competing. TowerGuard could integrate Dedrone sensors as an input layer.

---

### FlytBase

**What:** Cloud-based drone management platform. API layer for drone fleets.
**Hardware:** Hardware-agnostic (DJI, Autel, others).
**Market:** Enterprise inspection, security, public safety.
**Notes:** Potential integration partner rather than competitor. TowerGuard could use FlytBase APIs in Phase 2 rather than building raw SDK integrations.
**TowerGuard angle:** Evaluate as integration layer vs. direct SDK path. Decision needed in Phase 2.

---

### Joby / Shield AI / Autonodyne (Defense-Focused)

**What:** Various defense-focused autonomous systems players.
**Market:** Military autonomy, classified programs.
**Notes:** Competing for same SBIR/AFWERX funding pools. Differentiate on: cost-effectiveness, rapid deployment, non-classified commercial path.

---

## Competitive Positioning Matrix

| | TowerGuard | Percepto | Skydio | Nightingale |
|---|---|---|---|---|
| Multi-drone rotation | ✅ Core feature | ❌ | ❌ | ❌ |
| Hardware-agnostic | ✅ Planned | ❌ Proprietary | ❌ Own HW | ❌ DJI-dependent |
| US-origin hardware path | ✅ Required | ❓ | ✅ | ❌ DJI |
| GovCon positioning | ✅ Primary | ❌ | Partial | ❌ |
| Platform software focus | ✅ | ❌ | ❌ | ❌ |
| AI event classification | Planned Phase 2 | Basic | Limited | Basic |

---

## Research Priorities

- [ ] Percepto pricing and deployment model (public case studies)
- [ ] AFWERX previous awards in autonomous security drone space
- [ ] SBIR awards search: "autonomous perimeter" "drone security" "nest"
- [ ] DJI federal procurement restrictions (NDAA Section 848 implications)
- [ ] FlytBase API capabilities and partnership model
- [ ] Nightingale/Motorola post-acquisition product direction
- [ ] Identify any classified DARPA/SOCOM programs in this space

---

*Update this file as research is completed. Deep-dive notes go in `docs/market-research/`.*
