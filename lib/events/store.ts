import { desc, gt } from "drizzle-orm";
import { getDb } from "@/db";
import { events, type EventRow } from "@/db/schema";

export type StoredEvent = Pick<
  EventRow,
  "id" | "repo" | "sha" | "message" | "ai"
> & { committedAt: string };

function serialize(row: EventRow): StoredEvent {
  return {
    id: row.id,
    repo: row.repo,
    sha: row.sha,
    message: row.message,
    ai: row.ai,
    committedAt: row.committedAt.toISOString(),
  };
}

export async function insertEvents(
  batch: {
    repo: string;
    sha: string;
    message: string;
    ai: boolean;
    committedAt: Date;
  }[],
): Promise<number> {
  if (!batch.length) return 0;
  const db = await getDb();
  const inserted = await db
    .insert(events)
    .values(batch)
    .onConflictDoNothing({ target: events.sha })
    .returning({ id: events.id });
  return inserted.length;
}

export async function latestEvents(limit = 20): Promise<StoredEvent[]> {
  const db = await getDb();
  const rows = await db
    .select()
    .from(events)
    .orderBy(desc(events.id))
    .limit(limit);
  return rows.map(serialize);
}

export async function eventsSince(id: number): Promise<StoredEvent[]> {
  const db = await getDb();
  const rows = await db
    .select()
    .from(events)
    .where(gt(events.id, id))
    .orderBy(desc(events.id))
    .limit(50);
  return rows.map(serialize);
}
