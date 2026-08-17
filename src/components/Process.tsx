"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PROCESS } from "@/lib/site-data";
import { ChapterHead, Reveal } from "./Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="shallow px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <ChapterHead
          index="05"
          label="How it runs"
          title={
            <>
              Seven days, <em>brief to live.</em>
            </>
          }
          lead="The clock starts the moment you approve discovery. These dates are the Ripple package; Current runs fourteen days and Delta twenty-one."
        />

        <div ref={ref} className="relative mt-14 pl-7 md:mt-24 md:pl-0">
          <div className="absolute left-[3px] top-0 h-full w-px bg-foreground/15 md:left-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-[3px] top-0 w-px bg-primary md:left-1/2"
          />

          <div className="flex flex-col gap-14 md:gap-28">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={0.04}>
                <div className="relative grid gap-3 md:grid-cols-2 md:gap-20">
                  <span className="absolute -left-7 top-3 h-[7px] w-[7px] rounded-full bg-primary md:left-1/2 md:-translate-x-1/2" />
                  <div className={i % 2 === 0 ? "md:text-right" : "md:order-2"}>
                    <p className="label text-primary">{p.time}</p>
                    <h3 className="headline mt-3 text-[clamp(1.9rem,4vw,3.4rem)]">{p.title}</h3>
                  </div>
                  <p
                    className={`measure text-[0.95rem] leading-relaxed text-muted-foreground ${
                      i % 2 === 0 ? "" : "md:order-1 md:justify-self-end md:text-right"
                    }`}
                  >
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
