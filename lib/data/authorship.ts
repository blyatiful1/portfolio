// ONE classifier for "did an agent author this commit" — imported by the GitHub
// API path (lib/data/github.ts) AND the webhook path (app/api/github/webhook),
// so a commit can never render AI before a reload and HUM after it (panel I46).
//
// What it counts, precisely: a commit whose message carries a
// `Co-Authored-By: Claude …` trailer, or whose author name contains "claude".
// The trailer is written by the agent tooling itself — the count therefore
// identifies WHICH TOOL made the commit, not how hard the work was (panel I17).
// Pure and dependency-free so it is testable with `node --test`.

export type CommitIdentity = {
  message: string;
  authorName?: string | null;
};

export const AI_TRAILER = "co-authored-by: claude";

export function isAiAuthored({ message, authorName }: CommitIdentity): boolean {
  const msg = message.toLowerCase();
  const name = (authorName ?? "").toLowerCase();
  return msg.includes(AI_TRAILER) || name.includes("claude");
}

// The reproduction command shown to readers. It counts COMMITS (one per
// matching commit, merges excluded) — the old `git log | grep -ci claude`
// counted LINES and doubled every commit that also carried a Claude-Session
// trailer (panel I10). This string is the single source for README, the
// operator card and the console signature.
export const VERIFY_COMMAND =
  "git log --no-merges -i --grep='co-authored-by: claude' --oneline | wc -l";
