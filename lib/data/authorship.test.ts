import { test } from "node:test";
import assert from "node:assert/strict";
import { isAiAuthored, VERIFY_COMMAND } from "./authorship.ts";

test("a Co-Authored-By: Claude trailer marks the commit AI-authored", () => {
  assert.equal(
    isAiAuthored({
      message: "feat: wire\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
      authorName: "Iwan Braun",
    }),
    true,
  );
});

test("the match is case-insensitive", () => {
  assert.equal(
    isAiAuthored({ message: "x\n\nco-authored-by: CLAUDE <a@b>" }),
    true,
  );
});

test("an author name containing claude counts", () => {
  assert.equal(isAiAuthored({ message: "plain", authorName: "claude[bot]" }), true);
});

test("a human commit with no trailer is not AI-authored", () => {
  assert.equal(
    isAiAuthored({ message: "fix typo\n\nSigned-off-by: Iwan", authorName: "Iwan Braun" }),
    false,
  );
});

test("a Claude-Session URL alone is not a trailer", () => {
  assert.equal(
    isAiAuthored({
      message: "x\n\nClaude-Session: https://claude.ai/code/session_1",
      authorName: "Iwan",
    }),
    false,
  );
});

test("a null author name is tolerated", () => {
  assert.equal(isAiAuthored({ message: "x", authorName: null }), false);
});

test("the published command counts commits, not lines", () => {
  // one grep per commit (--grep + --oneline + wc -l), merges excluded
  assert.match(VERIFY_COMMAND, /--no-merges/);
  assert.match(VERIFY_COMMAND, /--grep=/);
  assert.match(VERIFY_COMMAND, /--oneline \| wc -l$/);
  assert.doesNotMatch(VERIFY_COMMAND, /grep -c/);
});
