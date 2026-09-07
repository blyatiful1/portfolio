import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit, clientKey, _resetRateLimits } from "./api.ts";

beforeEach(() => _resetRateLimits());

test("allows up to max hits in a window, then refuses", () => {
  for (let i = 0; i < 5; i++) assert.equal(checkRateLimit("k", 5, 60_000), true);
  assert.equal(checkRateLimit("k", 5, 60_000), false);
});

test("keys are independent", () => {
  for (let i = 0; i < 5; i++) checkRateLimit("a", 5, 60_000);
  assert.equal(checkRateLimit("a", 5, 60_000), false);
  assert.equal(checkRateLimit("b", 5, 60_000), true);
});

test("the window resets", async () => {
  assert.equal(checkRateLimit("w", 1, 10), true);
  assert.equal(checkRateLimit("w", 1, 10), false);
  await new Promise((r) => setTimeout(r, 15));
  assert.equal(checkRateLimit("w", 1, 10), true);
});

test("clientKey takes the first forwarded hop and falls back locally", () => {
  assert.equal(clientKey(new Headers({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" })), "203.0.113.9");
  assert.equal(clientKey(new Headers()), "local");
});
