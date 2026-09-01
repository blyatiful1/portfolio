import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // DATABASE_URL lives in .env (drizzle-kit reads .env and nothing else);
  // generate works offline, migrate/push need the URL (prod/ship only).
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
