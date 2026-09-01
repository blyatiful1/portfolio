type Lang = { name: string; bytes: number };

// Stacked language bar — chapter-monochrome (currentColor at stepped alphas),
// per SYSTEM §imagery: chart chroma stays inside the world's own palette.
const steps = ["opacity-90", "opacity-60", "opacity-40", "opacity-25"];

export function LanguageBar({ languages }: { languages: Lang[] }) {
  if (!languages.length) return null;
  const total = languages.reduce((n, l) => n + l.bytes, 0);
  const shares = languages
    .map((l) => ({ name: l.name, pct: Math.round((l.bytes / total) * 100) }))
    .filter((s) => s.pct >= 1); // never draw or label a 0% segment
  return (
    <div>
      <div
        className="flex h-1.5 w-full gap-px"
        role="img"
        aria-label={`Languages: ${shares.map((s) => `${s.name} ${s.pct}%`).join(", ")}`}
      >
        {shares.map((s, i) => (
          <span
            key={s.name}
            className={i === 0 ? "bg-primary" : `bg-current ${steps[i] ?? "opacity-20"}`}
            style={{ width: `${s.pct}%` }}
          />
        ))}
      </div>
      <p aria-hidden="true" className="mt-1.5 font-mono text-2xs tracking-[0.04em] uppercase opacity-70">
        {shares.map((s) => `${s.name} ${s.pct}%`).join(" · ")}
      </p>
    </div>
  );
}
