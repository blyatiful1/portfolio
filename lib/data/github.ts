import { cacheLife, cacheTag } from "next/cache";
import { isAiAuthored } from "@/lib/data/authorship";

// The monitored repos — the curated worlds (design/BRIEF.md). The portfolio's own
// repo joins the wire automatically once it exists publicly (ship-time user action).
export const OWNER = "blyatiful1";
export const REPOS = ["ultraweb", "hardmode", "gtheme", "portfolio"] as const;
export type RepoName = (typeof REPOS)[number];

export const CACHE_TAGS = {
  repoFacts: "repo-facts",
  wire: "wire-events",
} as const;

// Paging ceiling per repo: 5 × 100. When a repo crosses it the flag below says
// so and the copy stops claiming "all commits" (panel I45).
const MAX_PAGES = 5;
const PER_PAGE = 100;

// Testability seam: gates and CI can point the site at a fixture server.
// Never set in production — the default is the real API.
const API = process.env.GITHUB_API_BASE ?? "https://api.github.com";

function headers(): HeadersInit {
  const h: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": "iwanbraun-dev-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    h.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

// "Repo absent" and "fetch failed" are different facts (panel I23): a 404 means
// the world does not exist; a 403/5xx/network error means we could not look.
type Fetched<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "missing" | "unreachable" };

async function gh<T>(path: string): Promise<Fetched<T>> {
  try {
    const res = await fetch(`${API}${path}`, { headers: headers() });
    if (res.status === 404) return { ok: false, reason: "missing" };
    if (!res.ok) return { ok: false, reason: "unreachable" };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, reason: "unreachable" };
  }
}

type CommitEntry = {
  sha: string;
  parents: { sha: string }[];
  commit: {
    message: string;
    author: { name: string; date: string } | null;
    committer: { date: string } | null;
  };
};

// Merge commits are excluded — the same `--no-merges` the published command uses.
function isMerge(c: CommitEntry): boolean {
  return c.parents.length > 1;
}

function aiAuthored(c: CommitEntry): boolean {
  return isAiAuthored({
    message: c.commit.message,
    authorName: c.commit.author?.name,
  });
}

export type RepoFacts = {
  name: RepoName;
  description: string | null;
  pushedAt: string | null;
  languages: { name: string; bytes: number }[];
  totalCommits: number;
  aiCommits: number;
  /** the repo exists on GitHub (a 404 makes this false) */
  available: boolean;
  /** every fetch behind these facts succeeded — false means the numbers are
   *  not to be trusted and the chapter shows its unreachable state */
  reachable: boolean;
  /** the commit list hit the paging ceiling; totals are a floor, not a count */
  truncated: boolean;
};

async function fetchAllCommits(
  repo: string,
): Promise<{ commits: CommitEntry[]; truncated: boolean; ok: boolean }> {
  const all: CommitEntry[] = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await gh<CommitEntry[]>(
      `/repos/${OWNER}/${repo}/commits?per_page=${PER_PAGE}&page=${page}`,
    );
    if (!batch.ok) return { commits: all, truncated: false, ok: false };
    all.push(...batch.data);
    if (batch.data.length < PER_PAGE) {
      return { commits: all, truncated: false, ok: true };
    }
  }
  // five full pages: there may be more history than we read
  return { commits: all, truncated: true, ok: true };
}

export async function getRepoFacts(): Promise<RepoFacts[]> {
  "use cache";
  cacheTag(CACHE_TAGS.repoFacts);

  const facts = await Promise.all(
    REPOS.map(async (name): Promise<RepoFacts> => {
      const [meta, langs, history] = await Promise.all([
        gh<{ description: string | null; pushed_at: string }>(
          `/repos/${OWNER}/${name}`,
        ),
        gh<Record<string, number>>(`/repos/${OWNER}/${name}/languages`),
        fetchAllCommits(name),
      ]);
      const available = !(meta.ok === false && meta.reason === "missing");
      const reachable = meta.ok && langs.ok && history.ok;
      const content = history.commits.filter((c) => !isMerge(c));
      return {
        name,
        description: meta.ok ? meta.data.description : null,
        pushedAt: meta.ok ? meta.data.pushed_at : null,
        languages: Object.entries(langs.ok ? langs.data : {})
          .map(([n, bytes]) => ({ name: n, bytes }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 4),
        totalCommits: reachable ? content.length : 0,
        aiCommits: reachable ? content.filter(aiAuthored).length : 0,
        available,
        reachable,
        truncated: history.truncated,
      };
    }),
  );

  // A degraded fetch must not stick for hours: retry soon, serve the good
  // answer for the full profile (panel I23 d — no stale-smaller cache).
  if (facts.some((f) => f.available && !f.reachable)) cacheLife("minutes");
  else cacheLife("hours");
  return facts;
}

export type WireEvent = {
  repo: RepoName;
  sha: string;
  message: string;
  date: string;
  ai: boolean;
};

export async function getWireEvents(): Promise<WireEvent[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.wire);

  const perRepo = await Promise.all(
    REPOS.map(async (repo) => {
      const commits = await gh<CommitEntry[]>(
        `/repos/${OWNER}/${repo}/commits?per_page=5`,
      );
      return (commits.ok ? commits.data : [])
        .filter((c) => !isMerge(c))
        .map(
          (c): WireEvent => ({
            repo,
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split("\n")[0],
            date: c.commit.committer?.date ?? c.commit.author?.date ?? "",
            ai: aiAuthored(c),
          }),
        );
    }),
  );
  return perRepo.flat().sort((a, b) => b.date.localeCompare(a.date));
}

export type Authorship = {
  ai: number;
  total: number;
  perRepo: { name: RepoName; ai: number; total: number }[];
  /** worlds that exist but could not be read this recompute */
  missing: RepoName[];
  /** true when `missing` is non-empty — the fraction spans fewer worlds than
   *  the page shows, and the copy must say so instead of shrinking quietly */
  partial: boolean;
  /** at least one repo hit the paging ceiling — totals are floors */
  truncated: boolean;
  computedAt: string;
};

export async function getAuthorship(): Promise<Authorship> {
  "use cache";
  cacheTag(CACHE_TAGS.repoFacts);

  const facts = await getRepoFacts();
  const present = facts.filter((f) => f.reachable && f.totalCommits > 0);
  const missing = facts.filter((f) => f.available && !f.reachable).map((f) => f.name);
  if (missing.length) cacheLife("minutes");
  else cacheLife("hours");
  return {
    ai: present.reduce((n, f) => n + f.aiCommits, 0),
    total: present.reduce((n, f) => n + f.totalCommits, 0),
    perRepo: present.map((f) => ({
      name: f.name,
      ai: f.aiCommits,
      total: f.totalCommits,
    })),
    missing,
    partial: missing.length > 0,
    truncated: present.some((f) => f.truncated),
    computedAt: new Date().toISOString(),
  };
}

// The operator's dated anchor — read from the GitHub account itself, so the
// "shipping since" row is recomputed like every other number (panel I04).
export type OperatorFacts = {
  /** ISO date the GitHub account was created, or null when unreachable */
  since: string | null;
};

export async function getOperatorFacts(): Promise<OperatorFacts> {
  "use cache";
  cacheTag(CACHE_TAGS.repoFacts);
  const user = await gh<{ created_at: string }>(`/users/${OWNER}`);
  if (!user.ok) {
    cacheLife("minutes");
    return { since: null };
  }
  cacheLife("days");
  return { since: user.data.created_at };
}

// Which world a repo name is — shared by pages and the wire.
export const WORLD_OF: Record<RepoName, "uw" | "hm" | "gt" | "me"> = {
  ultraweb: "uw",
  hardmode: "hm",
  gtheme: "gt",
  portfolio: "me",
};
