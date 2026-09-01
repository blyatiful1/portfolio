import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const DESIGN = path.join(process.cwd(), "design");

export async function readArtifact(name: string): Promise<string | null> {
  try {
    return await readFile(path.join(DESIGN, name), "utf8");
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}

export const SHOT_DIRS = [
  path.join(DESIGN, "screenshots"),
  path.join(DESIGN, "qa"),
];

export async function listShots(): Promise<{ name: string; mtime: number }[]> {
  const out: { name: string; mtime: number }[] = [];
  for (const dir of SHOT_DIRS) {
    try {
      for (const f of await readdir(dir)) {
        if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
        const s = await stat(path.join(dir, f));
        out.push({ name: f, mtime: s.mtimeMs });
      }
    } catch {
      // dir absent — a later phase creates it
    }
  }
  return out.sort((a, b) => b.mtime - a.mtime);
}

export function resolveShot(basename: string): string | null {
  if (basename !== path.basename(basename)) return null;
  for (const dir of SHOT_DIRS) {
    const p = path.join(dir, basename);
    if (p.startsWith(dir)) return p;
  }
  return null;
}
