"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function FocusOnNavigate() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.getElementById("main-heading")?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
