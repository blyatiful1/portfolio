import { test } from "node:test";
import assert from "node:assert/strict";
import { clampSince } from "./wire-since.ts";

test("no cursor starts from the tip", () => {
  assert.equal(clampSince(null, 42), 42);
  assert.equal(clampSince(undefined, 42), 42);
  assert.equal(clampSince("", 42), 42);
  assert.equal(clampSince("nope", 42), 42);
});

test("a valid cursor inside the store is kept", () => {
  assert.equal(clampSince("10", 42), 10);
});

test("negative, fractional, huge and non-finite cursors are clamped", () => {
  assert.equal(clampSince("-1", 42), 0);
  assert.equal(clampSince("-999999", 42), 0);
  assert.equal(clampSince("10.9", 42), 10);
  assert.equal(clampSince("1e12", 42), 42);
  assert.equal(clampSince("Infinity", 42), 42);
  assert.equal(clampSince("-Infinity", 42), 42);
});

test("an empty store clamps everything to zero", () => {
  assert.equal(clampSince("5", 0), 0);
  assert.equal(clampSince(null, 0), 0);
});
