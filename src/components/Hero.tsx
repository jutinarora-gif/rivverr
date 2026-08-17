"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LiquidWordmark } from "./LiquidWordmark";
import { BRAND } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 md:px-10 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, color-mix(in oklab, var(--ice-deep) 45%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="label relative flex items-baseline justify-between gap-4 text-muted-foreground"
      >
        <span>Design & development studio</span>
        <span className="hidden md:inline">Est. 2024 · Working US hours</span>
      </motion.div>

      <div className="relative">
        <h1 className="sr-only">
          Rivverr, a design and development studio building custom websites for US businesses
        </h1>
        <LiquidWordmark height="clamp(3.5rem, 20vw, 19rem)" />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="standfirst mt-6 text-center text-foreground/80"
        >
          <em>{BRAND.line}</em>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="rule relative grid gap-6 pt-8 md:grid-cols-12 md:items-end md:gap-8"
      >
        <p className="measure text-[0.95rem] leading-relaxed text-muted-foreground md:col-span-5">
          We make websites for American businesses that want the work of a good agency without the
          theatre of one. Art direction, engineering and search. One small studio, one fixed number,
          one date.
        </p>
        <p className="label text-muted-foreground md:col-span-4">
          Fixed price · Fixed date · You own everything
        </p>
        <div className="md:col-span-3 md:justify-self-end">
          <Link
            href="/contact"
            className="group inline-flex items-baseline gap-3 border-b border-foreground pb-2 text-lg transition-colors hover:border-primary hover:text-primary"
          >
            Start a project
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
