import type { NextConfig } from "next";

// Security response headers (panel I43). The site is statically prerendered
// with Cache Components, so per-request nonces are off the table; the Next
// runtime's own RSC payload scripts are inline, so script-src must allow
// inline. What is enforced: no framing, no plugins, no base-tag hijack,
// same-origin forms/fetches/fonts, no Referer leakage, no MIME sniffing, no
// device permissions. Verified in the gate: zero CSP console violations on
// every route in both themes.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  // PGlite (the local-dev event store) ships its own WASM loader; bundling it
  // breaks `instantiateWasm` under `next start`. Production uses Neon over
  // HTTP and never loads it.
  serverExternalPackages: ["@electric-sql/pglite"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
