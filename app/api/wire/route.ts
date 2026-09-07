import { eventsSince, latestEvents } from "@/lib/events/store";
import { apiError, checkRateLimit, clientKey } from "@/lib/api";
import { clampSince } from "@/lib/wire-since";

// The wire's outbound half: SSE. Serverless-honest design — the stream polls
// the event store every 4s and closes after ~55s; EventSource reconnects with
// Last-Event-ID, so no event is missed across segment boundaries.
//
// Perimeter (panel I22): the resume cursor is clamped to the store's tip, each
// client IP gets a connection budget per minute, and each instance caps the
// streams it holds open at once. None of it is authentication — the feed is
// public by design — it is a cost ceiling.

const POLL_MS = 4_000;
const LIFETIME_MS = 55_000;
const CONNECTIONS_PER_MINUTE = 12; // a tab reconnects ~once a minute
const MAX_OPEN_STREAMS = 64; // per instance

const enc = new TextEncoder();
let openStreams = 0;

function frame(id: number, data: unknown): Uint8Array {
  return enc.encode(`id: ${id}\ndata: ${JSON.stringify(data)}\n\n`);
}

export async function GET(req: Request) {
  if (!checkRateLimit(`wire:${clientKey(req.headers)}`, CONNECTIONS_PER_MINUTE)) {
    return apiError(429, "rate_limited", "Too many wire connections — try again in a minute.");
  }
  if (openStreams >= MAX_OPEN_STREAMS) {
    return apiError(503, "busy", "The wire is at capacity — the page still works; retry shortly.");
  }

  const url = new URL(req.url);
  const tip = (await latestEvents(1))[0]?.id ?? 0;
  let since = clampSince(
    req.headers.get("last-event-id") ?? url.searchParams.get("since"),
    tip,
  );

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      openStreams += 1;
      let closed = false;
      const close = () => {
        if (closed) return;
        closed = true;
        openStreams -= 1;
        clearInterval(poll);
        clearTimeout(lifetime);
        try {
          controller.close();
        } catch {
          /* already closed by peer */
        }
      };

      controller.enqueue(enc.encode(`retry: 1500\n\n`));

      const poll = setInterval(async () => {
        try {
          const fresh = await eventsSince(since);
          for (const e of fresh.reverse()) {
            since = Math.max(since, e.id);
            controller.enqueue(frame(e.id, e));
          }
          controller.enqueue(enc.encode(`: heartbeat\n\n`));
        } catch {
          close();
        }
      }, POLL_MS);

      const lifetime = setTimeout(close, LIFETIME_MS);
      req.signal.addEventListener("abort", close);
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-store, no-transform",
      connection: "keep-alive",
    },
  });
}
