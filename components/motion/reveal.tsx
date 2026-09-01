"use client";

import { m, useReducedMotion } from "motion/react";
import { dur, ease } from "@/lib/motion";

// initial/whileInView are CONSTANT on both server and client — a reduce-dependent
// initial style diverges from the SSR HTML and throws a hydration error for every
// reduced-motion user. Reduce is honored in the transition alone: duration 0 =
// instant appearance, no movement.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: dur.section, ease: ease.out, delay }
      }
    >
      {children}
    </m.div>
  );
}
