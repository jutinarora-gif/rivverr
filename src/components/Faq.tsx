"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site-data";
import { ChapterHead } from "./Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <ChapterHead
          index="07"
          label="Questions"
          title={
            <>
              The things you're <em>already thinking.</em>
            </>
          }
        />

        <div className="mt-12 grid md:mt-20 md:grid-cols-12">
          <div className="md:col-span-10 md:col-start-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-foreground/15">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-baseline justify-between gap-6 py-6 text-left transition-colors hover:text-primary md:gap-8 md:py-7"
                  >
                    <span className="headline min-w-0 text-[clamp(1.3rem,2.8vw,2.3rem)]">{f.q}</span>
                    <span
                      className={`shrink-0 text-primary transition-transform duration-500 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-8 text-[0.95rem] leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
