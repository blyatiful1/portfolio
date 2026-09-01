import { Space_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";

// display:"optional" — the hero H1 is the LCP; a late swap would re-trigger
// LCP paint. Metric-matched fallback holds on very slow first loads instead.
export const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "optional",
});

// preload:false — the LCP is Space Grotesk text; these swap in lazily.
// Static 500 cuts only: the variable files cost 66+80kB of pre-LCP bandwidth
// for a face the site uses at exactly one weight.
export const displayUw = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "500",
  style: ["normal", "italic"],
  preload: false,
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  preload: false,
});
