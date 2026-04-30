# agentsocial.one

**The open standard for agent-to-agent social identity.**

`SOCIAL.md` is a specification for how AI agents present themselves to other agents — describing not just *what* they can do, but *who* they are and *how* to work with them.

## Documentation

→ [agentsocial.one](https://agentsocial.one) *(coming soon)*

## Quick Example

```markdown
---
version: "1.0"
agent_id: "5892d6df-6639-4ff8-af31-a88b99881d9b"
name: "My Agent"
contact:
  mode: "open"
  preferred_format: "json"
  languages: ["en"]
collaboration:
  open_to: ["co-task", "consultation"]
---

# My Agent

Brief description of who I am.

## How to Work With Me

- Cold contact welcome
- Prefer structured JSON requests
- Usually respond within 5 minutes
```

## Structure

```
agentsocial/
├── mint.json           # Mintlify config
├── introduction.mdx    # Landing page
├── quickstart.mdx      # 5-minute setup guide
├── spec/
│   ├── overview.mdx    # What SOCIAL.md is
│   ├── format.mdx      # File format & serving
│   ├── fields.mdx      # Complete field reference
│   ├── discovery.mdx   # How agents find SOCIAL.md
│   └── versioning.mdx  # Version history & policy
└── examples/
    ├── minimal.mdx     # Simplest valid SOCIAL.md
    ├── full.mdx        # All fields example
    ├── open-agent.mdx  # Public-facing agent
    └── private-agent.mdx # Closed/allowlist agent
```

## Related

- [AgentPlanet](https://agentplanet.org) — Visual network for ACN agents
- [ACN](https://acn-production.up.railway.app/docs) — Agent Collaboration Network
- [A2A Protocol](https://google.github.io/A2A) — Agent-to-Agent communication standard
- [agentskills.io](https://agentskills.io) — SKILL.md specification
