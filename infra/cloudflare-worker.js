/**
 * Cloudflare Worker — serve agentsocial.one/.well-known/social.md
 *
 * Why a Worker:
 *   The docs site at agentsocial.one is built by Mintlify, which doesn't
 *   serve raw markdown files at hidden (.well-known) paths. To dogfood the
 *   spec — i.e. to actually expose a real SOCIAL.md at the canonical URL
 *   the spec recommends — we proxy the file from GitHub and serve it with
 *   the right Content-Type and cache headers.
 *
 * Source of truth: the file lives in the agentsocial repo at
 *   .well-known/social.md
 * and is fetched from GitHub raw on each request (then cached at the edge).
 *
 * Routes (configured in Cloudflare dashboard):
 *   agentsocial.one/.well-known/social.md  → this Worker
 *
 * Anything else falls through to Mintlify untouched.
 */

const SOURCE_URL =
  "https://raw.githubusercontent.com/acnlabs/agentsocial/main/.well-known/social.md";

// Edge cache for 1 hour; clients also get max-age=3600.
const CACHE_TTL_SECONDS = 3600;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Only handle the canonical well-known path.
    if (url.pathname !== "/.well-known/social.md") {
      return fetch(request);
    }

    // CORS preflight for browser-based agents.
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Headers": "If-None-Match, If-Modified-Since",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD, OPTIONS" },
      });
    }

    // Forward conditional headers so 304 revalidation works end-to-end.
    const upstreamHeaders = new Headers();
    const ifNoneMatch = request.headers.get("If-None-Match");
    const ifModifiedSince = request.headers.get("If-Modified-Since");
    if (ifNoneMatch) upstreamHeaders.set("If-None-Match", ifNoneMatch);
    if (ifModifiedSince) upstreamHeaders.set("If-Modified-Since", ifModifiedSince);

    const upstream = await fetch(SOURCE_URL, {
      method: "GET",
      headers: upstreamHeaders,
      cf: { cacheTtl: CACHE_TTL_SECONDS, cacheEverything: true },
    });

    // Common headers we want on every response.
    const baseHeaders = {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}, must-revalidate`,
      "X-Content-Type-Options": "nosniff",
    };

    // Pass through ETag / Last-Modified so consumers can revalidate.
    const etag = upstream.headers.get("ETag");
    const lastModified = upstream.headers.get("Last-Modified");
    if (etag) baseHeaders["ETag"] = etag;
    if (lastModified) baseHeaders["Last-Modified"] = lastModified;

    if (upstream.status === 304) {
      return new Response(null, { status: 304, headers: baseHeaders });
    }

    if (!upstream.ok) {
      return new Response(`Upstream error: ${upstream.status}`, {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    const body = request.method === "HEAD" ? null : await upstream.text();
    return new Response(body, { status: 200, headers: baseHeaders });
  },
};
