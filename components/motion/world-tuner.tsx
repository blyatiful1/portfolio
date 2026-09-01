"use client";

import { useEffect } from "react";

// Stamps the world under the viewport's midline onto <html>; CSS does the rest
// (globals.css maps data-active-world → the @property-typed --tuned-accent pair).
export function WorldTuner() {
  useEffect(() => {
    // [data-world-rest] sections (hero, operator) release the tuning back to
    // rest chrome — without them the last-visited world stays latched (r4 d3)
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-world],[data-world-rest]",
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            document.documentElement.dataset.activeWorld =
              e.target.getAttribute("data-world") ?? "";
          }
        }
      },
      // a section is "active" while it crosses the viewport's middle band
      { rootMargin: "-45% 0px -45%" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      delete document.documentElement.dataset.activeWorld;
    };
  }, []);
  return null;
}
