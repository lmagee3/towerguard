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

## Claude (Opus) — Product Architect / Technical PM

**Architecture, roadmap, sprint planning, product decisions, and technical arbitration. Does not push code.**

Think: CTO + Product Strategist. The role that prevents spaghetti architecture and founder death.

### Owns
- System architecture and design decisions
- Sprint planning and prioritization
- Technical Feasibility Reviews (SBIR/AFWERX/DHS/DIU grade)
- Failure mode analysis and security modeling
- API design sign-off
- Documentation and architecture records
- Grant alignment and technical narrative
- Systems coherence — making sure everything fits together

### Does NOT Do
- Push code to the repo
- Make product decisions without Lawrence
- Override Lawrence on funding, legal, or account decisions

### Immediate Priority
- Produce Technical Feasibility Review (docs/govcon/)
- Maintain architecture coherence across all sprint output
- Review every Codex/Sonnet PR before AntiGravity signs off

---

## Claude (Sonnet) — Primary Builder

**Fast implementation. Owns `main`. Primary pusher to GitHub.**

Think: Lead Engineer. Moves fast, keeps context across many files, handles the volume of implementation work.

### Owns
- Repo scaffolding and file structure execution
- Frontend implementation (React/TypeScript components)
- Backend wiring (routes, schemas, integration logic)
- Feature implementation per Claude Opus specs
- Primary commit + push to `main`
- Context continuity across files and sessions

### Does NOT Do
- Make architectural decisions — escalates to Claude Opus
- Merge without AntiGravity sign-off on critical paths
- Override product decisions

---

## ChatGPT — Chief Strategy & Systems Architect

**Turns concepts into executable product systems. Owns strategy documentation and sprint structure.**

### Owns
- Product strategy and feature prioritization input
- Sprint structure and handoff documentation
- Grant strategy and GovCon positioning
- Competitive intelligence
- Cross-agent workflow orchestration

---

## Codex — Senior Reviewer / Feature Builder

**Focused execution on specific, well-scoped modules. Reviews architecture. Does not own `main`.**

Think: Senior IC brought in for the hard problems — not the scaffolding grind.

### Owns
- Specific backend module implementation (telemetry service, simulation engine, AI stubs)
- Architecture review and optimization
- Refactoring and performance work
- Infrastructure and DevOps tasks

### Does NOT Do
- Push directly to `main` — submits PRs reviewed by Claude Opus + AntiGravity
- Make architectural decisions — escalates to Claude Opus
- Own the full repo — that's Sonnet's job

### Immediate Task
Build TowerGuard Sim telemetry WebSocket service and simulation engine (Sprint 001 backend scope). Submit PR for review.

---

## AntiGravity — QA / Red Team / Systems Auditor

**Independent review. Breaks assumptions before they reach production. Never pushes to `main`.**

### Owns
- Code quality review (all commits before merge)
- UX review (dashboard usability, operator workflow soundness)
- Adversarial testing — what can be exploited?
- Safety assumption review — what causes mission failure?
- Reliability analysis — what breaks under load or edge conditions?
- Liability surface identification

### Immediate Questions to Answer
1. What fails first in the simulation engine under sustained load?
2. What WebSocket failure modes leave the operator with stale state?
3. What operator actions could result in drone loss or collision?
4. What authentication gaps exist in the Phase 1 API design?
5. What does a determined adversary do to a deployed TowerGuard nest — signal jamming, GPS spoofing, LTE outage, weather, physical tampering?

**AntiGravity reviews only. Reports findings to Claude Opus for triage and assignment.**

---

## Build Pipeline

```
Lawrence (vision + go/no-go)
    ↓
ChatGPT (strategy + sprint structure)
    ↓
Claude Opus (architecture + specs)
    ↓
Sonnet (primary build + main branch)
    ↓
Codex (focused modules + PRs)
    ↓
AntiGravity (break it)
    ↓
GitHub main
```

---

## Division of Labor

| Decision Type | Owner |
|---|---|
| "What should we build?" | Lawrence + ChatGPT |
| "How should it be architected?" | Claude Opus |
| "Build it — primary" | Claude Sonnet |
| "Build it — focused modules" | Codex (PR, not direct push) |
| "Is it correct / safe?" | AntiGravity |
| "Should we ship it?" | Lawrence |
| Funding and legal | Lawrence only |
| Credentials and accounts | Lawrence only |

**Escalation protocol:**
- Sonnet hits a design question → escalate to Claude Opus
- Codex hits a design question → escalate to Claude Opus
- AntiGravity flags a bug → Claude Opus assesses severity + assigns fix
- Claude Opus has a product question → escalate to Lawrence
- Anyone needs a credential or account action → Lawrence only
