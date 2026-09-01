"use client";

import { useEffect } from "react";

// The reward for whoever opens devtools. Logs once; never secrets.
export function ConsoleSignature() {
  useEffect(() => {
    const ink = "color:#4bcb71;font:600 13px ui-monospace,monospace";
    console.log("%cIWAN·BRAUN — you found the fifth world.", ink);
    console.log(
      "%cThe agents wrote this site; I held the standard. Check the claim: git log --no-merges | grep -ci claude",
      "color:inherit;font:12px ui-monospace,monospace",
    );
  }, []);
  return null;
}
