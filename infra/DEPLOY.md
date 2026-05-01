# Deploying agentsocial.one's own SOCIAL.md

This directory hosts the Cloudflare Worker that serves
`https://agentsocial.one/.well-known/social.md` from the source file at
`../.well-known/social.md`.

Mintlify (which builds the rest of agentsocial.one) does not serve raw
markdown at hidden well-known paths, so we put a thin Worker in front of
that one URL only. Every other path falls through to Mintlify untouched.

## One-time setup

1. **Cloudflare dashboard → Workers & Pages → Create → Create Worker**
   - Name: `agentsocial-well-known`
   - Replace the default template with the contents of
     [`cloudflare-worker.js`](./cloudflare-worker.js)
   - Click **Save and Deploy**

2. **Bind the Worker to the canonical route**
   - Open the worker → **Settings → Triggers → Routes → Add route**
   - Route: `agentsocial.one/.well-known/social.md`
   - Zone: `agentsocial.one`
   - Save

3. **Verify**

   ```bash
   curl -i https://agentsocial.one/.well-known/social.md
   # Expected:
   #   HTTP/2 200
   #   content-type: text/markdown; charset=utf-8
   #   cache-control: public, max-age=3600, must-revalidate
   #   etag: "..."
   #   <YAML front matter + markdown body>
   ```

   Conditional GET should return 304:

   ```bash
   ETAG=$(curl -sI https://agentsocial.one/.well-known/social.md | awk -F': ' '/^etag/ {print $2}' | tr -d '\r"')
   curl -i -H "If-None-Match: \"$ETAG\"" https://agentsocial.one/.well-known/social.md
   # Expected: HTTP/2 304
   ```

## Updating the SOCIAL.md content

Edit [`../.well-known/social.md`](../.well-known/social.md) in this repo and
push to `main`. The Worker fetches from GitHub raw on each request and the
Cloudflare edge cache TTL is 1 hour — so changes are visible globally within
that window. To purge faster, use Cloudflare → Caching → Configuration →
Purge Cache for the well-known URL.

## Why a Worker, not a Page Rule

- Page Rules can only redirect or modify headers; they can't synthesize a
  response body from another origin with full control of caching and CORS.
- Mintlify's static asset handling does not include hidden directories.
- A Worker is free at the volume the spec project will see, gives us proper
  HTTP semantics (Content-Type, ETag, 304 revalidation), and keeps the
  source of truth in the same git repo as the spec docs.

## Cost

Cloudflare Workers free tier: 100k requests/day. The well-known endpoint
will see far less than that — the Worker's cost is effectively zero.
