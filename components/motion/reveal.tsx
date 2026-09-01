"use client";

import { m, useReducedMotion } from "motion/react";
import { dur, ease } from "@/lib/motion";

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
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0 : dur.section,
        ease: ease.out,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </m.div>
  );
}
