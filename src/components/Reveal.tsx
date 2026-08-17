"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ChapterHead({
  index,
  label,
  title,
  lead,
  align = "left",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "wide";
}) {
  return (
    <div className="grid gap-5 md:grid-cols-12 md:gap-10">
      <div className="label flex items-baseline gap-4 text-primary md:col-span-3">
        <span>{index}</span>
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className={align === "wide" ? "md:col-span-9" : "md:col-span-8"}>
        <Reveal>
          <h2 className="headline text-[clamp(2.1rem,6vw,5.5rem)]">{title}</h2>
        </Reveal>
        {lead ? (
          <Reveal delay={0.08}>
            <p className="standfirst mt-6 max-w-2xl text-muted-foreground md:mt-8">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
