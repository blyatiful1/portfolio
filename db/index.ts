import * as schema from "./schema";

// Driver switch: Neon HTTP in production (DATABASE_URL), PGlite (WASM, file-backed)
// for local dev — same pg-core schema, same drizzle query API.
// drizzle-orm pinned to the stable 0.45.x line (recorded in design/BRIEF.md §Backend).

type Db = ReturnType<typeof import("drizzle-orm/pglite").drizzle<typeof schema>>;

let dbPromise: Promise<Db> | null = null;

async function init(): Promise<Db> {
  if (process.env.DATABASE_URL) {
    const { neon } = await import("@neondatabase/serverless");
    const { drizzle } = await import("drizzle-orm/neon-http");
    return drizzle({
      client: neon(process.env.DATABASE_URL),
      schema,
    }) as unknown as Db;
  }
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { mkdir } = await import("node:fs/promises");
  await mkdir(".data/pglite", { recursive: true });
  const client = new PGlite(".data/pglite");
  // dev bootstrap — mirrors drizzle/0000_*.sql (prod applies real migrations)
  await client.exec(`
    CREATE TABLE IF NOT EXISTS "events" (
      "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "repo" text NOT NULL,
      "sha" text NOT NULL UNIQUE,
      "message" text NOT NULL,
      "ai" boolean NOT NULL,
      "committed_at" timestamp with time zone NOT NULL,
      "received_at" timestamp with time zone NOT NULL DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS "events_received_idx" ON "events" ("received_at");
  `);
  return drizzle({ client, schema });
}

export function getDb(): Promise<Db> {
  dbPromise ??= init();
  return dbPromise;
}
