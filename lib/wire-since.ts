// The SSE stream's resume cursor comes from the client (Last-Event-ID or
// ?since=). It is attacker-controlled, so it is clamped to [0, tip] — a
// negative, fractional, huge or non-numeric value can never replay the whole
// event store or ask for an id that does not exist yet (panel I22). Pure and
// dependency-free so it is testable with `node --test`.
export function clampSince(raw: string | null | undefined, tip: number): number {
  const n = raw == null || raw === "" ? NaN : Number(raw);
  if (!Number.isFinite(n)) return tip; // fresh connection: start from the tip
  const safeTip = Math.max(0, Math.trunc(tip));
  return Math.min(Math.max(0, Math.trunc(n)), safeTip);
}
