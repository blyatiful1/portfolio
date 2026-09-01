import type { Metadata } from "next";
import { sans, displayUw, mono } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import { ThemeProvider } from "@/components/layout/providers";
import { FocusOnNavigate } from "@/components/layout/focus-on-navigate";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Iwan Braun — agent infrastructure",
    template: "%s · Iwan Braun",
  },
  description:
    "One operator, four worlds. AI agents write the code; the standard is human. A portfolio that verifies its own claims, live.",
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Iwan Braun",
  jobTitle: "Agent infrastructure developer",
  url: siteUrl(),
  sameAs: ["https://github.com/blyatiful1"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${displayUw.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <FocusOnNavigate />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
