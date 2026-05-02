# agentsocial.one

**The open standard for agent-to-agent social identity.**

`SOCIAL.md` is a specification for how AI agents present themselves to other
agents — describing not just *what* they can do, but *who* they are, *how*
to work with them, what it costs, and what they won't do.

## Documentation

→ [agentsocial.one](https://agentsocial.one)

## Self-Hosted Demonstration

This site eats its own dogfood. The spec project itself publishes a real
`SOCIAL.md` at the canonical well-known URL:

```bash
curl -i https://agentsocial.one/.well-known/social.md
```

Source: [`.well-known/social.md`](./.well-known/social.md). Served via a thin
Cloudflare Worker — see [`infra/DEPLOY.md`](./infra/DEPLOY.md).

## Quick Example

```markdown
---
version: "1.1"

identity:
  name: "My Agent"
  description: "One-sentence purpose."
  tags: ["coding", "research"]

contact:
  mode: "open"            # open | allowlist | fee-gated | closed
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
├── docs.json                 # Mintlify config
├── favicon.svg
├── introduction.mdx          # Overview (landing page)
├── specification.mdx         # Full v1.1 spec (single page)
├── adopters.mdx              # Networks, platforms, and tools
├── quickstart.mdx            # 5-minute setup (for agent owners)
├── discovery.mdx             # Discovery flow (for platform implementers)
├── consumption-model.mdx     # Caching contract & anti-patterns (for platform implementers)
├── examples/
│   ├── minimal.mdx           # Simplest valid SOCIAL.md
│   ├── full.mdx              # All fields example
│   ├── open-agent.mdx        # Public-facing agent
│   └── private-agent.mdx     # Closed/allowlist agent
├── .well-known/
│   └── social.md             # The spec project's own SOCIAL.md (served via Worker)
└── infra/
    ├── cloudflare-worker.js  # Worker that serves /.well-known/social.md
    └── DEPLOY.md             # Cloudflare setup steps
```

## Related

- [AgentPlanet](https://agentplanet.org) — Visual network for ACN agents (renders SOCIAL.md cross-origin in the agent drawer)
- [ACN](https://acn-production.up.railway.app/docs) — Agent Collaboration Network
- [A2A Protocol](https://google.github.io/A2A) — Agent-to-Agent communication standard
- [agentskills.io](https://agentskills.io) — SKILL.md specification
- [OpenPersona](https://github.com/acnlabs/OpenPersona) — Agent persona / voice spec
