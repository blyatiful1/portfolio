import { cacheLife, cacheTag } from "next/cache";

// The monitored repos — the curated worlds (design/BRIEF.md). The portfolio's own
// repo joins the wire automatically once it exists publicly (ship-time user action).
export const OWNER = "blyatiful1";
export const REPOS = ["ultraweb", "hardmode", "gtheme", "portfolio"] as const;
export type RepoName = (typeof REPOS)[number];

export const CACHE_TAGS = {
  repoFacts: "repo-facts",
  wire: "wire-events",
} as const;

const API = "https://api.github.com";

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

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { headers: headers() });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
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

// Mirrors the README's stated methodology: git log --no-merges | grep -ci claude
function isMerge(c: CommitEntry): boolean {
  return c.parents.length > 1;
}

function isAiAuthored(c: CommitEntry): boolean {
  const msg = c.commit.message.toLowerCase();
  const name = c.commit.author?.name.toLowerCase() ?? "";
  return msg.includes("co-authored-by: claude") || name.includes("claude");
}

export type RepoFacts = {
  name: RepoName;
  description: string | null;
  pushedAt: string | null;
  languages: { name: string; bytes: number }[];
  totalCommits: number;
  aiCommits: number;
  available: boolean;
};

async function fetchAllCommits(repo: string): Promise<CommitEntry[]> {
  const all: CommitEntry[] = [];
  for (let page = 1; page <= 5; page++) {
    const batch = await gh<CommitEntry[]>(
      `/repos/${OWNER}/${repo}/commits?per_page=100&page=${page}`,
    );
    if (!batch || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

export async function getRepoFacts(): Promise<RepoFacts[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.repoFacts);

  return Promise.all(
    REPOS.map(async (name): Promise<RepoFacts> => {
      const [meta, langs, commits] = await Promise.all([
        gh<{ description: string | null; pushed_at: string }>(
          `/repos/${OWNER}/${name}`,
        ),
        gh<Record<string, number>>(`/repos/${OWNER}/${name}/languages`),
        fetchAllCommits(name),
      ]);
      const content = commits.filter((c) => !isMerge(c));
      return {
        name,
        description: meta?.description ?? null,
        pushedAt: meta?.pushed_at ?? null,
        languages: Object.entries(langs ?? {})
          .map(([n, bytes]) => ({ name: n, bytes }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 4),
        totalCommits: content.length,
        aiCommits: content.filter(isAiAuthored).length,
        available: meta !== null,
      };
    }),
  );
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
      return (commits ?? [])
        .filter((c) => !isMerge(c))
        .map(
          (c): WireEvent => ({
            repo,
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split("\n")[0],
            date: c.commit.committer?.date ?? c.commit.author?.date ?? "",
            ai: isAiAuthored(c),
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
  computedAt: string;
};

export async function getAuthorship(): Promise<Authorship> {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.repoFacts);

  const facts = await getRepoFacts();
  const present = facts.filter((f) => f.available && f.totalCommits > 0);
  return {
    ai: present.reduce((n, f) => n + f.aiCommits, 0),
    total: present.reduce((n, f) => n + f.totalCommits, 0),
    perRepo: present.map((f) => ({
      name: f.name,
      ai: f.aiCommits,
      total: f.totalCommits,
    })),
    computedAt: new Date().toISOString(),
  };
}
