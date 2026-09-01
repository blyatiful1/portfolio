import Link from "next/link";
import { getYear } from "@/lib/data/now";

const groups = [
  {
    label: "Worlds",
    links: [
      { href: "/work/ultraweb", label: "ultraweb — case study" },
      { href: "/work/hardmode", label: "hardmode — case study" },
      { href: "https://github.com/blyatiful1/gtheme", label: "gtheme ↗", external: true },
      { href: "https://github.com/blyatiful1", label: "GitHub profile ↗", external: true },
    ],
  },
  {
    label: "This site",
    links: [
      // ship-time: repoint at the published portfolio repo once it exists (design/PROGRESS.md)
      { href: "https://github.com/blyatiful1", label: "build ledger ↗", external: true },
      { href: "https://ultraweb-site.vercel.app", label: "built by world 01 ↗", external: true },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
] as const;

export async function Footer() {
  const year = await getYear();
  return (
    <footer className="border-t border-border bg-[oklch(0.12_0.01_280)]">
      <div className="mx-auto max-w-content px-4 pt-16 sm:px-6">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-10 sm:grid-cols-3"
        >
          {groups.map((g) => (
            <div key={g.label}>
              <p className="font-mono text-2xs tracking-[0.14em] uppercase text-muted-foreground">
                {g.label}
              </p>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      {...("external" in l && l.external
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="nav-link py-1.5 text-sm text-foreground/85 hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-5 pb-2 font-mono text-2xs text-muted-foreground">
          <p>© {year} Iwan Braun · agent infrastructure</p>
          <p>254/256 commits: not mine. That is the point.</p>
        </div>
      </div>

      {/* oversized-type closer — baseline-cropped, the deliberate ending */}
      <div className="overflow-hidden" aria-hidden="true">
        <p className="display-features translate-y-[14%] text-center text-[clamp(4rem,15.5vw,14rem)] leading-[0.8] font-bold tracking-tighter text-foreground/[0.13] select-none">
          IWAN·BRAUN
        </p>
      </div>
    </footer>
  );
}
