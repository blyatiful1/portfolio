import { notFound } from "next/navigation";
import { connection } from "next/server";
import { readArtifact, listShots } from "./lib";
import { Feed } from "./feed";

// dev-only construction window: allowed to block (never prerendered)
export const instant = false;

const mono: React.CSSProperties = {
  fontFamily: "ui-monospace, monospace",
  fontSize: 13,
  lineHeight: 1.5,
};

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ border: "1px solid #999", padding: 12, marginBottom: 16 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function gateColor(line: string): string | undefined {
  if (/\bFAIL\b/.test(line)) return "#b00020";
  if (/\bUNVERIFIED\b/.test(line)) return "#a06000";
  if (/\bPASS\b/.test(line)) return "#006420";
  return undefined;
}

export default async function StudioPage() {
  await connection(); // request-time rendering under cacheComponents
  if (process.env.NODE_ENV === "production") notFound();

  const progress = await readArtifact("PROGRESS.md");
  const qa = await readArtifact("QA.md");
  const reviews = await readArtifact("REVIEWS.md");
  const shots = await listShots();

  return (
    <main style={{ ...mono, maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
        studio — construction site (dev only)
      </h1>

      <Panel title="Now / Waiting on you">
        {progress ? (
          <pre style={{ ...mono, whiteSpace: "pre-wrap" }}>
            {progress.split("## Done")[0]}
          </pre>
        ) : (
          <p>nothing yet — Phase 1 writes design/PROGRESS.md</p>
        )}
      </Panel>

      <Panel title="Gates">
        {qa ? (
          <pre style={{ ...mono, whiteSpace: "pre-wrap" }}>
            {qa.split("\n").map((l, i) => (
              <span key={i} style={{ color: gateColor(l), display: "block" }}>
                {l}
              </span>
            ))}
          </pre>
        ) : (
          <p>nothing yet — Phase 11 writes design/QA.md</p>
        )}
      </Panel>

      <Panel title="Checkpoints">
        {reviews ? (
          <pre style={{ ...mono, whiteSpace: "pre-wrap" }}>{reviews}</pre>
        ) : (
          <p>nothing yet — checkpoints write design/REVIEWS.md</p>
        )}
      </Panel>

      <Panel title="Contact sheet">
        {shots.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {shots.map((s) => (
              <figure key={s.name} style={{ margin: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/studio/shot?f=${encodeURIComponent(s.name)}`}
                  alt={s.name}
                  width={260}
                  style={{ border: "1px solid #999", display: "block" }}
                />
                <figcaption style={{ fontSize: 11 }}>{s.name}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p>nothing yet — gates and checkpoints save screenshots here</p>
        )}
      </Panel>

      <Panel title="Activity">
        <Feed />
      </Panel>
    </main>
  );
}
