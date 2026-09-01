// gate-code check 8 — dependency-free. Run: node qa/token-contract.mjs
// Adapted: this build is dark-leading (:root = dark, .light = light theme).
import { readFileSync, readdirSync, existsSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");
const declared = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));
// tokens set by JS/next-font at runtime, or Tailwind-namespace generated
const runtimeDeclared = new Set([
  "font-space-grotesk", "font-fraunces", "font-plex-mono",
]);
let fail = 0;

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`],
  );
for (const f of ["app", "components"]
  .filter(existsSync)
  .flatMap(walk)
  .filter((f) => /\.(tsx?|css)$/.test(f)))
  for (const [, t] of readFileSync(f, "utf8").matchAll(/var\(\s*--([\w-]+)/g))
    if (!declared.has(t) && !runtimeDeclared.has(t)) {
      console.error(`UNDECLARED  var(--${t})  ${f}`);
      fail = 1;
    }

const lum = ([L, C, H]) => {
  const h = (H * Math.PI) / 180,
    a = C * Math.cos(h),
    b = C * Math.sin(h),
    cube = (x) => x ** 3;
  const l = cube(L + 0.3963377774 * a + 0.2158037573 * b),
    m = cube(L - 0.1055613458 * a - 0.0638541728 * b),
    s = cube(L - 0.0894841775 * a - 1.291485548 * b),
    [r, g, bl] = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ].map((v) => Math.min(1, Math.max(0, v)));
  const f = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
  const [R, G, B] = [r, g, bl].map(f).map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};
const ratio = (x, y) => {
  const [hi, lo] = [lum(x), lum(y)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};
const parse = (block) =>
  Object.fromEntries(
    [...block.matchAll(/--([\w-]+)\s*:\s*oklch\(([^)]+)\)/g)].map(([, n, v]) => [
      n,
      v
        .split("/")[0]
        .trim()
        .split(/\s+/)
        .map((x) => parseFloat(x) / (x.endsWith("%") ? 100 : 1)),
    ]),
  );
for (const [name, sel] of [
  ["root(dark)", ":root"],
  ["light", "\\.light"],
]) {
  const t = parse((css.match(new RegExp(`${sel}\\s*\\{([^}]*)\\}`, "s")) || [, ""])[1]);
  for (const fg in t) {
    const bg =
      fg === "foreground"
        ? "background"
        : fg.endsWith("-foreground")
          ? fg.slice(0, -11)
          : null;
    if (!bg || !t[bg]) continue;
    const r = ratio(t[fg], t[bg]);
    if (r < 4.5) {
      console.error(`AA FAIL [${name}]  --${fg} on --${bg}  ${r.toFixed(2)}:1 (<4.5)`);
      fail = 1;
    }
  }
}
console.log(fail ? "token-contract: FAIL" : "token-contract: PASS");
process.exit(fail);
