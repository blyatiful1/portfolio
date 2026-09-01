import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { tokens } from "@/lib/tokens";

export const alt =
  "Iwan Braun — one operator, four worlds. AI agents write the code; the standard is human.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const sg = await readFile(
    path.join(process.cwd(), "assets", "SpaceGrotesk700.ttf"),
  );
  const d = tokens.dark;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: d.background,
          color: d.foreground,
          fontFamily: "SG",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "-0.02em" }}>IWAN</div>
          <div style={{ display: "flex", width: 13, height: 13, background: d.live }} />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: "-0.02em" }}>BRAUN</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
          }}
        >
          <div style={{ display: "flex" }}>One operator.</div>
          <div style={{ display: "flex" }}>
            <span style={{ color: d.worldUw }}>Four&nbsp;</span>
            <span style={{ color: "#e8c545" }}>wor</span>
            <span style={{ color: "#5f8ee8" }}>lds</span>
            <span>.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: d.mutedForeground,
          }}
        >
          <div style={{ display: "flex" }}>
            The agents write the code. The standard is human.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: d.live }}>
            <div style={{ display: "flex", width: 12, height: 12, background: d.live }} />
            live
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "SG", data: sg, weight: 700, style: "normal" }] },
  );
}
