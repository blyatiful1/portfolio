export type ApiError = { error: { code: string; message: string } };

export function apiError(status: number, code: string, message: string) {
  return Response.json({ error: { code, message } } satisfies ApiError, {
    status,
  });
}

// Rate-limit seam for public unauthenticated POSTs. In-memory: adequate per
// serverless instance; swap the backing store if abuse ever demands it.
const hits = new Map<string, { n: number; reset: number }>();

export function checkRateLimit(key: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    return true;
  }
  entry.n += 1;
  return entry.n <= max;
}
