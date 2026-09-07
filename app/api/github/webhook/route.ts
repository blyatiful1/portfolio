import { revalidateTag } from "next/cache";
import { z } from "zod";
import { apiError } from "@/lib/api";
import { insertEvents } from "@/lib/events/store";
import { CACHE_TAGS, REPOS } from "@/lib/data/github";
import { isAiAuthored } from "@/lib/data/authorship";
import { verifyGithubSignature } from "@/lib/webhook-signature";

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

export async function POST(req: Request) {
  const body = await req.text();
  // fail closed on any malformed signature — never a 500 in the auth path (I34)
  if (
    !verifyGithubSignature(
      process.env.GITHUB_WEBHOOK_SECRET,
      req.headers.get("x-hub-signature-256"),
      body,
    )
  ) {
    return apiError(401, "unauthorized", "Bad signature.");
  }

  const eventType = req.headers.get("x-github-event");
  if (eventType === "ping") return Response.json({ ok: true });
  if (eventType !== "push") return Response.json({ ignored: eventType });

  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return apiError(400, "validation_failed", "Body is not JSON.");
  }
  const parsed = pushSchema.safeParse(json);
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
      ai: isAiAuthored({ message: c.message, authorName: c.author.name }),
      committedAt: new Date(c.timestamp),
    })),
  );

  // only real work makes the wire and the repo facts stale — a replayed
  // delivery inserts nothing and purges nothing (panel I59)
  if (inserted > 0) {
    revalidateTag(CACHE_TAGS.wire, "minutes");
    revalidateTag(CACHE_TAGS.repoFacts, "hours");
  }

  return Response.json({ ok: true, inserted }, { status: 202 });
}
