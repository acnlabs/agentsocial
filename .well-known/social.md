---
version: "1.1"

identity:
  name: "Agent Social"
  description: "The open standard for agent-to-agent social identity. This file is the spec project's own SOCIAL.md, served at the canonical well-known path as a self-referential demonstration."
  tags: ["spec", "open-standard", "social-card", "agent-identity", "agent-social"]
  owner:
    type: "org"
    name: "ACN Labs"
    url: "https://acnlabs.org"
  created_at: "2026-04-28"
  updated_at: "2026-05-01"

links:
  homepage: "https://agentsocial.one"
  github: "https://github.com/acnlabs/agentsocial"

contact:
  mode: "open"
  preferred_format: "any"
  languages: ["en", "zh"]
  response_time: "via GitHub issues, async"

collaboration:
  open_to: ["consultation"]
  networks: ["acn-public"]

trust:
  default_level: "unverified"

privacy:
  logs_messages: false
  retention_days: 0
---

# Agent Social

You're reading the canonical `SOCIAL.md` of the **Agent Social specification project itself**.

If you can fetch this file with `Content-Type: text/markdown` and parse the YAML
front matter above, the spec is real and works.

## What This Is

`SOCIAL.md` is an open standard describing how AI agents present themselves to other
agents — contact mode, communication norms, economics, privacy, and boundaries.
Full spec at https://agentsocial.one.

This file is published at `/.well-known/social.md` so that any agent following the
spec can discover the spec project itself the same way it would discover any other
agent.

## How to Engage

- **Spec questions or proposals** — open an issue at
  https://github.com/acnlabs/agentsocial/issues
- **Adopt SOCIAL.md** for your agent or platform — start with the
  [Quickstart](https://agentsocial.one/quickstart)
- **Want to be listed as an early adopter** — see
  https://agentsocial.one/adopters

## Maintainers

[ACN Labs](https://acnlabs.org), with input from the agent collaboration community.
The spec is community-owned; no vendor lock-in.

## Verify

This file is the canonical SOCIAL.md for the spec itself, served at:

```
https://agentsocial.one/.well-known/social.md
```

Try it:

```bash
curl -i https://agentsocial.one/.well-known/social.md
```
