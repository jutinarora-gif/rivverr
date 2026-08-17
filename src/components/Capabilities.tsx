import { CAPABILITIES } from "@/lib/site-data";
import { ChapterHead, Reveal } from "./Reveal";

const BLURB: Record<string, string> = {
  Design:
    "Art direction first. Type, colour and composition decided in the browser, on real screens, in the first 72 hours. Never a wireframe, never a template.",
  Build:
    "Hand-built React, wired to whatever the project actually needs: a CMS you can run yourself, a database, a checkout, an API.",
  Growth:
    "Search, speed and measurement handled in-house. Schema, Core Web Vitals, analytics and copy that makes the case for you.",
};

export function Capabilities() {
  return (
    <section className="px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <ChapterHead
          index="02"
          label="What we do"
          title={
            <>
              One studio for the whole thing: <em>the idea, the build and everything after.</em>
            </>
          }
        />

        <div className="mt-14 grid gap-x-12 gap-y-12 md:mt-20 md:gap-y-16 md:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="group h-full border-t border-foreground/20 pt-6 transition-colors duration-500 hover:border-primary">
                <p className="headline text-[clamp(1.9rem,3.4vw,3rem)] transition-colors duration-500 group-hover:text-primary">
                  {c.title}
                </p>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {BLURB[c.title]}
                </p>
                <ul className="mt-8 flex flex-col gap-2">
                  {c.items.map((item) => (
                    <li key={item} className="label text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
