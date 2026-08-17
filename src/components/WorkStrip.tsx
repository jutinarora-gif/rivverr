import Link from "next/link";
import { PROJECTS } from "@/lib/site-data";
import { ChapterHead, Reveal } from "./Reveal";

export function WorkStrip() {
  const plates = PROJECTS.slice(0, 4);

  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <ChapterHead
          index="04"
          label="Selected work"
          title={
            <>
              Sites that had <em>a job to do.</em>
            </>
          }
          lead="Recent builds across media, publishing, reference and SaaS. Every one shipped inside the window we quoted."
        />

        <div className="mt-14 grid gap-x-10 gap-y-16 md:mt-24 md:gap-y-20 md:grid-cols-2">
          {plates.map((p, i) => {
            return (
              <Reveal key={p.slug} delay={0.05}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block"
                  aria-label={`Visit ${p.client} at ${p.domain}`}
                >
                  <figure className="overflow-hidden border border-foreground/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={`${p.client} website designed and built by Rivverr`}
                      loading="lazy"
                      width={2000}
                      height={920}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{ aspectRatio: "2000 / 920" }}
                    />
                  </figure>
                  <figcaption className="mt-6 flex items-baseline justify-between gap-6 border-t border-foreground/20 pt-4">
                    <h3 className="headline text-[clamp(1.5rem,2.6vw,2.4rem)] transition-colors group-hover:text-primary">
                      {p.client}
                    </h3>
                    <span className="label text-muted-foreground">{p.year}</span>
                  </figcaption>
                  <p className="label mt-2 text-muted-foreground">{p.sector}</p>
                  <p className="measure mt-4 text-[0.95rem] leading-relaxed">{p.headline}</p>
                  <p className="mt-3 text-[0.95rem] italic text-primary">{p.result}</p>
                  <span className="label mt-4 inline-flex items-center gap-2 text-primary">
                    {p.domain}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <Link
            href="/work"
            className="group mt-16 inline-flex md:mt-24 items-baseline gap-3 border-b border-foreground pb-2 text-lg transition-colors hover:border-primary hover:text-primary"
          >
            See all work
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
