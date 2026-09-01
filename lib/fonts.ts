import { Space_Grotesk, Fraunces, IBM_Plex_Mono } from "next/font/google";

export const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const displayUw = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});
