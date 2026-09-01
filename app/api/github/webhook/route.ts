import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { apiError } from "@/lib/api";
import { insertEvents } from "@/lib/events/store";
import { CACHE_TAGS, REPOS } from "@/lib/data/github";

// GitHub push-webhook receiver — the wire's inbound half.
// Configure on each monitored repo: payload URL /api/github/webhook,
// content type application/json, secret = GITHUB_WEBHOOK_SECRET.

const pushSchema = z.object({
  repository: z.object({ name: z.string() }),
  commits: z
    .array(
      z.object({
        id: z.string(),
        message: z.string(),
        timestamp: z.string(),
        author: z.object({ name: z.string() }).partial(),
      }),
    )
    .default([]),
});

function verify(signature: string | null, body: string): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret || !signature?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const given = signature.slice("sha256=".length);
  if (given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given, "hex"), Buffer.from(expected, "hex"));
}

export async function POST(req: Request) {
  const body = await req.text();
  if (!verify(req.headers.get("x-hub-signature-256"), body)) {
    return apiError(401, "unauthorized", "Bad signature.");
  }

  const eventType = req.headers.get("x-github-event");
  if (eventType === "ping") return Response.json({ ok: true });
  if (eventType !== "push") return Response.json({ ignored: eventType });

  const parsed = pushSchema.safeParse(JSON.parse(body));
  if (!parsed.success) {
    return apiError(400, "validation_failed", "Unrecognized push payload.");
  }

  const repo = parsed.data.repository.name;
  if (!(REPOS as readonly string[]).includes(repo)) {
    return Response.json({ ignored: repo });
  }

  const inserted = await insertEvents(
    parsed.data.commits.map((c) => ({
      repo,
      sha: c.id.slice(0, 7),
      message: c.message.split("\n")[0],
      ai:
        c.message.toLowerCase().includes("co-authored-by: claude") ||
        (c.author.name ?? "").toLowerCase().includes("claude"),
      committedAt: new Date(c.timestamp),
    })),
  );

  // the pushed repo's facts and the wire snapshot are now stale
  revalidateTag(CACHE_TAGS.wire, "minutes");
  revalidateTag(CACHE_TAGS.repoFacts, "hours");

  return Response.json({ ok: true, inserted }, { status: 202 });
}
