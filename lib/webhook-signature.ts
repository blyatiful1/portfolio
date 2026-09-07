import { createHmac, timingSafeEqual } from "node:crypto";

// GitHub's X-Hub-Signature-256 check, fail-closed. A 64-char non-hex string
// used to pass the length guard, get truncated by Buffer.from(…, "hex") and
// make timingSafeEqual throw a RangeError — a 500 in the auth path of a
// public endpoint (panel I34). The charset guard makes both buffers exactly
// 32 bytes before the constant-time compare. Pure node:crypto; testable.
const HEX64 = /^[0-9a-f]{64}$/;

export function verifyGithubSignature(
  secret: string | undefined,
  signature: string | null | undefined,
  body: string,
): boolean {
  if (!secret || !signature?.startsWith("sha256=")) return false;
  const given = signature.slice("sha256=".length).toLowerCase();
  if (!HEX64.test(given)) return false;
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(given, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function signGithubPayload(secret: string, body: string): string {
  return `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
}
