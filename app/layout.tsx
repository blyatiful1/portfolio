import type { Metadata } from "next";
import { sans, displayUw, mono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/providers";
import { FocusOnNavigate } from "@/components/layout/focus-on-navigate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iwan Braun — agent infrastructure",
  description:
    "One operator, four worlds. AI agents write the code; the standard is human. A portfolio that verifies its own claims, live.",
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
        <ThemeProvider>
          <FocusOnNavigate />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
