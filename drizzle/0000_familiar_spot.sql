CREATE TABLE "events" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "events_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"repo" text NOT NULL,
	"sha" text NOT NULL,
	"message" text NOT NULL,
	"ai" boolean NOT NULL,
	"committed_at" timestamp with time zone NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_sha_unique" UNIQUE("sha")
);
--> statement-breakpoint
CREATE INDEX "events_received_idx" ON "events" USING btree ("received_at");