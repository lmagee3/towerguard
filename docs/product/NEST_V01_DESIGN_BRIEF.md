# TOWERGUARD NEST V0.1
## Mechanical Prototype Design Brief

**Author:** Lawrence Magee
**Mechanical Lead:** Ralph
**Project:** TowerGuard
**Phase:** Sprint 002 – Nest Prototype Development
**Status:** Concept Design

---

## Purpose

The TowerGuard Nest is a weather-protected autonomous drone enclosure designed to support persistent perimeter awareness operations.

The nest serves as:
- Drone storage
- Drone charging
- Autonomous launch platform
- Autonomous recovery platform
- Fleet management node
- Edge-computing hub

The nest is the physical infrastructure that enables continuous drone rotation and eliminates coverage gaps caused by battery limitations.

---

## Design Doctrine

**TowerGuard is not a drone product.**

The drone is a replaceable sensor.
The nest is permanent infrastructure.
The platform is the product.

Design decisions should prioritize:
1. Reliability
2. Maintainability
3. Weather resistance
4. Modular upgrades
5. Low-cost manufacturing
6. Field serviceability

---

## Initial Physical Requirements

### Proposed Exterior Dimensions (Prototype V0.1)

- Length: 48 inches
- Width: 48 inches
- Height: 48 inches

**Reason:** Earlier 36" x 42" x 36" dimensions appear adequate for a single drone but insufficient for long-term multi-drone operations. The larger footprint provides room for 3–4 drones, charging systems, communications equipment, local compute, cooling systems, and maintenance access.

---

## Internal Layout

### Drone Bay

Target capacity:
- WT-01 Patrol Drone
- WT-02 Ready Drone
- WT-03 Charging Drone
- WT-04 Maintenance / Backup Drone

Configuration: Radial arrangement around central service core.

```
          WT-01

WT-04      HUB      WT-02

          WT-03
```

### Central Service Core

Contains:
- Power distribution
- Battery charging
- Network equipment
- Environmental controls
- Edge compute hardware

Future support:
- Ollama
- Gemma
- Local inference server
- AI event processing

---

## Launch and Recovery System

### Preferred Option: Motorized Roof Hatch

Operation:
1. Nest verifies conditions
2. Roof opens
3. Drone launches
4. Mission executes
5. Drone returns
6. Roof closes

Advantages:
- Mechanically simple
- Easier weather sealing
- Lower maintenance burden

### Alternative Concepts

**Clamshell Roof** — Pros: Large opening, excellent access. Cons: More moving parts, higher failure risk.

**Sliding Roof** — Pros: Compact. Cons: More susceptible to dirt and debris.

**Current recommendation: Motorized hatch.**

---

## Autonomous Landing System

### Primary Goal: Reliable Docking

The landing system determines product success. Failure to dock equals mission failure.

### Landing Guidance

- Visual Markers: AprilTags, fiducial markers, high-contrast landing symbols
- Guidance Lighting: LED perimeter indicators, night operation support

### Capture Funnel (Recommended)

```
 \                /
  \              /
   \____________/
```

Benefits:
- Compensates for landing error
- Increases docking success rate
- Reduces dependence on precision navigation

---

## Charging System

### Preferred Method: Magnetic Contact Charging

Drone lands on guided charging pads.

```
Drone Contacts:  +      -
                ===========
Dock Pads:       +      -
```

Advantages: Simple, reliable, inexpensive, weather tolerant.

**Future Option:** Automated battery swap (not part of V0.1).

---

## Environmental Requirements

- Target: IP54 minimum
- Protection from: Rain, dust, insects, direct sunlight
- Future target: IP65 equivalent

### Cooling and Ventilation

- Intake vents at base
- Exhaust vents near roof
- Replaceable filters
- Temperature monitoring

---

## Sensor Package

### Exterior Sensors
- Temperature, humidity, rain detection, wind speed, ambient light, security camera

### Interior Sensors
- Battery temperature, smoke detection, charging current monitoring, internal security camera

---

## Communications

Prototype: Wi-Fi, Ethernet
Future: LTE, 5G, Starlink, mesh networking

---

## Power System

Prototype: AC utility power
Future: Solar integration, battery backup, UPS support

---

## Serviceability

Field maintenance must be possible by a single technician.

Requirements:
- Tool-access panels
- Replaceable charging pads
- Replaceable cooling fans
- Modular electronics tray

Maximum maintenance objective: Under 15 minutes for common repairs.

---

## Manufacturing Concepts

**Frame:** Aluminum extrusion
**Exterior panels:** Powder-coated aluminum, composite panel, polycarbonate inspection windows
**Fasteners:** Stainless steel
**Landing surface:** Non-slip composite material

---

## Future Growth Path

```
TowerGuard Nest V0.1 → Single-site deployment
TowerGuard Nest V0.2 → Multiple coordinated drones
TowerGuard Nest V1.0 → Commercial pilot deployment
TowerGuard Nest V2.0 → Networked perimeter intelligence node
```

---

## Ralph Deliverables — Phase 1 Mechanical Review

1. External dimensions validation
2. Internal layout proposal
3. Roof mechanism recommendation
4. Charging pad concept
5. Material selection
6. Weatherproofing approach
7. CAD concept model

**Success Criteria:** Produce first CAD representation of the TowerGuard Nest suitable for simulation, visualization, and future prototype fabrication.

The objective is not perfection. The objective is proving the nest concept is physically achievable.
