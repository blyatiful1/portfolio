// Tiny module-level stores shared by wire client leaves — no provider, no context.
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

// Pause store — WCAG 2.2.2 Pause, Stop, Hide (panel I18). The live feed is an
// aria-live region a screen-reader user must be able to silence; the choice is
// persisted so it survives navigation. Server snapshot is always "not paused".
const PAUSE_KEY = "wire:paused";
let paused = false;
let pauseHydrated = false;
const pauseListeners = new Set<() => void>();

function readStored(): boolean {
  try {
    return window.localStorage.getItem(PAUSE_KEY) === "1";
  } catch {
    return false;
  }
}

export function hydrateWirePaused() {
  if (pauseHydrated || typeof window === "undefined") return;
  pauseHydrated = true;
  const stored = readStored();
  if (stored !== paused) {
    paused = stored;
    pauseListeners.forEach((l) => l());
  }
}

export function setWirePaused(next: boolean) {
  if (next === paused) return;
  paused = next;
  try {
    window.localStorage.setItem(PAUSE_KEY, next ? "1" : "0");
  } catch {
    /* storage unavailable — the choice still holds for this page */
  }
  pauseListeners.forEach((l) => l());
}

export function getWirePaused(): boolean {
  return paused;
}

export function getWirePausedServer(): boolean {
  return false;
}

export function subscribeWirePaused(listener: () => void): () => void {
  pauseListeners.add(listener);
  return () => pauseListeners.delete(listener);
}
