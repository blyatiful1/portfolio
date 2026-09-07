import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema, CONTACT_LIMITS } from "./contact.ts";

const good = {
  name: "Lena Example",
  email: "lena@example.com",
  message: "We are building an internal tool and need someone who ships.",
};

test("a well-formed inquiry parses", () => {
  assert.equal(contactSchema.safeParse(good).success, true);
});

test("lower bounds still hold", () => {
  assert.equal(contactSchema.safeParse({ ...good, name: "L" }).success, false);
  assert.equal(contactSchema.safeParse({ ...good, message: "too short" }).success, false);
  assert.equal(contactSchema.safeParse({ ...good, email: "not-an-email" }).success, false);
});

test("upper bounds reject oversized payloads", () => {
  assert.equal(
    contactSchema.safeParse({ ...good, name: "x".repeat(CONTACT_LIMITS.name + 1) }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...good, message: "x".repeat(CONTACT_LIMITS.message + 1) }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({
      ...good,
      email: "a".repeat(CONTACT_LIMITS.email) + "@example.com",
    }).success,
    false,
  );
});

test("values at the limit are accepted", () => {
  assert.equal(
    contactSchema.safeParse({ ...good, message: "x".repeat(CONTACT_LIMITS.message) }).success,
    true,
  );
});
