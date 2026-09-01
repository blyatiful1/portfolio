import { readFile } from "node:fs/promises";
import { resolveShot } from "../lib";

export const dynamic = "force-dynamic";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response(null, { status: 404 });
  }
  const f = new URL(req.url).searchParams.get("f") ?? "";
  const p = resolveShot(f);
  const ext = f.slice(f.lastIndexOf("."));
  if (!p || !MIME[ext.toLowerCase()]) return new Response(null, { status: 400 });
  try {
    const buf = await readFile(p);
    return new Response(new Uint8Array(buf), {
      headers: { "content-type": MIME[ext.toLowerCase()], "cache-control": "no-store" },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
