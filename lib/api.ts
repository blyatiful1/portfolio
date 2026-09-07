export type ApiError = { error: { code: string; message: string } };

export function apiError(status: number, code: string, message: string) {
  return Response.json({ error: { code, message } } satisfies ApiError, {
    status,
  });
}

// Rate-limit seam for public unauthenticated endpoints. In-memory and therefore
// PER SERVERLESS INSTANCE: it resets on a cold start and does not span
// concurrent lambdas (panel I44 — documented, not hidden). It blunts a single
// hot loop; a distributed store (Vercel KV / Upstash) is the upgrade path if
// abuse ever demands it. Expired entries are evicted on each call so the map
// cannot grow without bound.
const hits = new Map<string, { n: number; reset: number }>();
const EVICT_EVERY = 256;
let calls = 0;

function evict(now: number) {
  for (const [key, entry] of hits) if (entry.reset < now) hits.delete(key);
}

export function checkRateLimit(key: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  if (++calls % EVICT_EVERY === 0) evict(now);
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  entry.n += 1;
  return entry.n <= max;
}

// Test/introspection hook — never used by request paths.
export function _resetRateLimits() {
  hits.clear();
  calls = 0;
}

// First hop of x-forwarded-for, or a stable fallback for local runs.
export function clientKey(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
