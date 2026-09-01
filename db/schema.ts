import {
  pgTable,
  text,
  boolean,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

// The organism's memory: every webhook-delivered event, persisted so the wire's
// history survives redeploys (design/BRIEF.md §Backend: needs — database).
export const events = pgTable(
  "events",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    repo: text("repo").notNull(),
    sha: text("sha").notNull().unique(),
    message: text("message").notNull(),
    ai: boolean("ai").notNull(),
    committedAt: timestamp("committed_at", { withTimezone: true }).notNull(),
    receivedAt: timestamp("received_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("events_received_idx").on(t.receivedAt)],
);

export type EventRow = typeof events.$inferSelect;
