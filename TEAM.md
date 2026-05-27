# TowerGuard — Team

## Command Structure

TowerGuard operates with a defined division of authority between human and AI agents.

---

## Lawrence Magee — Founder / Principal Systems Architect

**The strategic and operational authority. All final decisions route through Lawrence.**

### Owns
- Product vision and mission doctrine
- GovCon strategy and relationship management
- Customer discovery and pilot partner outreach
- Funding direction (SBIR, AFWERX, DHS, DIU, xTech)
- Security workflows and clearance considerations
- Mission realism — operational validity of all product decisions
- Financial decisions and legal commitments
- Account management, credentials, API keys

### Strategic Advantage
20-year US Army IT veteran with direct tower guard and perimeter security experience. Understands the operational reality that commercial competitors don't: the fatigue curve, the coverage gap psychology, the force protection doctrine, and the procurement pain points that make a real buyer say yes.

---

## Claude — Senior Technical Architect

**Deep technical reasoning, architecture review, and funding-grade documentation.**

### Owns
- Architecture reviews and design refinement
- Technical Feasibility Reviews (SBIR/AFWERX/DHS/DIU grade)
- Failure mode analysis and security modeling
- API design review
- Technical documentation
- Competitive landscape analysis

### Immediate Priority
Produce a Technical Feasibility Review covering:
- Simulation architecture soundness
- Hardware integration path viability
- Failure modes and mitigations
- Security model review
- SBIR topic alignment assessment

---

## ChatGPT — Chief Strategy & Systems Architect

**Turns concepts into executable product systems. Owns strategy and documentation.**

### Owns
- Product strategy and feature prioritization input
- Architecture planning and sprint structure
- Grant strategy and GovCon positioning
- Competitive intelligence
- Systems integration thinking
- Workflow orchestration documentation

---

## Codex — Lead Implementation Engineer

**Execution engine. Builds what the architects design.**

### Owns
- Backend implementation (FastAPI scaffold, all endpoints)
- Frontend scaffolding (React/TypeScript)
- Simulation engine implementation
- CI/CD pipeline
- Repository structure execution
- Infrastructure and DevOps

### Immediate Task
Build the TowerGuard Sim API (Sprint 001 backend scope).

Must deliver:
- FastAPI scaffold with Docker Compose
- Drone + Nest state models
- Mission engine
- Alert engine
- Telemetry WebSocket endpoint
- Manual takeover + RTN endpoints

**Codex works from specs. Does not make architectural decisions. Escalates design questions to Claude or Lawrence.**

---

## AntiGravity — QA / Red Team / Systems Auditor

**Independent review. Breaks assumptions before they reach production.**

### Owns
- Code quality review (all Codex commits before merge)
- UX review (dashboard usability, operator workflow soundness)
- Adversarial testing (what can be exploited?)
- Safety assumption review (what causes mission failure?)
- Reliability analysis (what breaks under load or edge conditions?)
- Liability surface identification

### Immediate Questions to Answer
1. What fails first in the simulation engine under sustained load?
2. What WebSocket failure modes can leave the operator with stale state?
3. What operator actions could result in drone loss or collision?
4. What authentication gaps exist in the Phase 1 API design?
5. What does a determined adversary do to disrupt a TowerGuard deployment?

**AntiGravity reviews only. Does not commit code. Reports findings to Claude for triage.**

---

## Division of Labor

| Decision Type | Owner |
|---|---|
| "What should we build?" | Lawrence + Claude |
| "How should it be architected?" | Claude |
| "Build it" | Codex |
| "Is it correct?" | AntiGravity |
| "Should we ship it?" | Lawrence |
| Funding and legal | Lawrence only |
| Credentials and accounts | Lawrence only |

**Escalation protocol:** Codex hits a design question → escalate to Claude. AntiGravity flags a bug → Claude assesses severity → assigns fix to Codex. Claude has a product question → escalate to Lawrence.
