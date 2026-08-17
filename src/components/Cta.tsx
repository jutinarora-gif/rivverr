import Link from "next/link";
import { BRAND } from "@/lib/site-data";
import { LiquidWordmark } from "./LiquidWordmark";
import { Reveal } from "./Reveal";

const LIGHT: [number, number, number] = [0.933, 0.961, 0.984];
const AQUA: [number, number, number] = [0.561, 0.827, 0.753];

export function Cta() {
  return (
    <section className="deep grain relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 100%, color-mix(in oklab, var(--steel) 55%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="label flex justify-between text-muted-foreground">
          <span className="text-primary">08</span>
          <span>Start</span>
        </div>

        <Link href="/contact" aria-label="Start a project" className="mt-10 block cursor-pointer">
          <LiquidWordmark text="START" ink={LIGHT} edge={AQUA} height="clamp(3.5rem, 18vw, 16rem)" />
          <Reveal>
            <p className="standfirst mt-8 text-center">
              <em>Brief us today. Be live next week.</em>
            </p>
          </Reveal>
        </Link>

        <div className="rule mt-14 grid gap-8 pt-8 md:mt-20 md:grid-cols-12 md:items-end md:gap-10">
          <p className="measure text-[0.95rem] leading-relaxed text-muted-foreground md:col-span-5">
            Tell us what you sell and who you sell it to. You'll have a fixed quote, a written scope
            and a delivery date within 24 hours. No discovery invoice, no pitch deck.
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="headline break-all text-xl transition-colors hover:text-primary md:col-span-4 md:text-2xl"
          >
            {BRAND.email}
          </a>
          <div className="md:col-span-3 md:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex items-baseline gap-3 border-b border-current pb-2 text-lg transition-colors hover:text-primary"
            >
              Start a project
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
