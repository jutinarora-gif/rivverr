import { FACTS } from "@/lib/site-data";
import { ChapterHead, Reveal } from "./Reveal";

export function Facts() {
  return (
    <section className="shallow px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <ChapterHead
          index="01"
          label="The case for us"
          title={
            <>
              Great web work was never expensive because it was good.
              <br className="hidden md:block" />
              <em className="text-primary"> It was expensive because of where it was made.</em>
            </>
          }
        />

        <div className="mt-14 grid gap-12 md:mt-20 md:gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="standfirst measure text-foreground">
              Rivverr is a small studio in India working with American clients. No offices, no account
              managers, no sales floor taking a cut of your budget. What you pay for is design and
              engineering, and you get the same standard the expensive people sell you.
            </p>
            <p className="mt-8 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
              We don't compete on being cheap. We compete on the work, and then we price it honestly.
              Every project is quoted before it starts, delivered on the date we gave you, and handed
              over in your name.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-5">
            <dl className="border-t border-foreground/20">
              {FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className={`grid grid-cols-12 items-baseline gap-4 border-b border-foreground/15 py-6 ${
                    i === FACTS.length - 1 ? "text-primary" : ""
                  }`}
                >
                  <dt className="label col-span-5 min-w-0 text-muted-foreground">{f.label}</dt>
                  <dd className="headline col-span-7 text-right text-[clamp(1.5rem,7vw,2.6rem)]">
                    {f.stat}
                  </dd>
                  <p className="col-span-12 text-xs leading-relaxed text-muted-foreground">{f.note}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
