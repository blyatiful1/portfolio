// Tiny module-level store shared by wire client leaves — no provider, no context.
type WireStatus = "idle" | "live" | "error";

let status: WireStatus = "idle";
const listeners = new Set<() => void>();

export function setWireStatus(next: WireStatus) {
  if (next === status) return;
  status = next;
  listeners.forEach((l) => l());
}

export function getWireStatus(): WireStatus {
  return status;
}

export function subscribeWireStatus(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
