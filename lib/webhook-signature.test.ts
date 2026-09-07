import { test } from "node:test";
import assert from "node:assert/strict";
import { signGithubPayload, verifyGithubSignature } from "./webhook-signature.ts";

const secret = "test-secret";
const body = JSON.stringify({ repository: { name: "portfolio" }, commits: [] });

test("a correctly signed body verifies", () => {
  assert.equal(verifyGithubSignature(secret, signGithubPayload(secret, body), body), true);
});

test("a tampered body fails", () => {
  const sig = signGithubPayload(secret, body);
  assert.equal(verifyGithubSignature(secret, sig, body + " "), false);
});

test("the wrong secret fails", () => {
  assert.equal(verifyGithubSignature("other", signGithubPayload(secret, body), body), false);
});

test("a 64-char NON-hex signature fails closed instead of throwing", () => {
  const bogus = "sha256=" + "g".repeat(64);
  assert.doesNotThrow(() => verifyGithubSignature(secret, bogus, body));
  assert.equal(verifyGithubSignature(secret, bogus, body), false);
});

test("wrong length, missing prefix, missing header and missing secret all fail", () => {
  assert.equal(verifyGithubSignature(secret, "sha256=abc", body), false);
  assert.equal(verifyGithubSignature(secret, "abcdef", body), false);
  assert.equal(verifyGithubSignature(secret, null, body), false);
  assert.equal(verifyGithubSignature(undefined, signGithubPayload(secret, body), body), false);
});

test("uppercase hex is accepted (GitHub sends lowercase; be lenient on case only)", () => {
  const sig = signGithubPayload(secret, body);
  assert.equal(verifyGithubSignature(secret, sig.toUpperCase().replace("SHA256=", "sha256="), body), true);
});
