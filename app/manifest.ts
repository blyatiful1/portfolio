import type { MetadataRoute } from "next";
import { tokens } from "@/lib/tokens";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Iwan Braun — agent infrastructure",
    short_name: "iwan·braun",
    description:
      "One operator, four worlds. AI agents write the code; the standard is human.",
    start_url: "/",
    display: "browser",
    background_color: tokens.dark.background,
    theme_color: tokens.dark.background,
  };
}
