import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response(null, { status: 404 });
  }
  let lines: string[] = [];
  try {
    const raw = await readFile(
      path.join(process.cwd(), "design", "studio-log.jsonl"),
      "utf8",
    );
    lines = raw.trim().split("\n").slice(-40);
  } catch {
    // no log yet
  }
  const entries = lines.flatMap((l) => {
    try {
      return [JSON.parse(l)];
    } catch {
      return []; // half-flushed line — skip, never throw
    }
  });
  return Response.json(entries.reverse(), {
    headers: { "cache-control": "no-store" },
  });
}
