import { eventsSince, latestEvents } from "@/lib/events/store";

// The wire's outbound half: SSE. Serverless-honest design — the stream polls
// the event store every 4s and closes after ~55s; EventSource reconnects with
// Last-Event-ID, so no event is missed across segment boundaries.

const POLL_MS = 4_000;
const LIFETIME_MS = 55_000;

const enc = new TextEncoder();

function frame(id: number, data: unknown): Uint8Array {
  return enc.encode(`id: ${id}\ndata: ${JSON.stringify(data)}\n\n`);
}

export async function GET(req: Request) {
  const lastHeader = req.headers.get("last-event-id");
  const url = new URL(req.url);
  let since = Number(lastHeader ?? url.searchParams.get("since") ?? NaN);

  if (Number.isNaN(since)) {
    // fresh connection: start from the current tip (SSR already showed history)
    const tip = await latestEvents(1);
    since = tip[0]?.id ?? 0;
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const close = () => {
        if (closed) return;
        closed = true;
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
