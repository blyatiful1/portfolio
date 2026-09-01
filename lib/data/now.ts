import { cacheLife } from "next/cache";

// Time reads live in cached scopes — Cache Components forbids Date.now()
// during prerender outside them.
export async function getYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
