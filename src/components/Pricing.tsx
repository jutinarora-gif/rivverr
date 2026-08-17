import Link from "next/link";
import { ADDONS, PACKAGES } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const GROUND = ["", "mid", "deep"] as const;

export function Pricing() {
  return (
    <section id="pricing">
      <div className="mx-auto max-w-[1500px] px-5 pb-8 pt-28 md:px-10 md:pt-40">
        <div className="grid gap-5 md:grid-cols-12 md:gap-10">
          <div className="label flex items-baseline gap-4 text-primary md:col-span-3">
            <span>06</span>
            <span className="text-muted-foreground">Pricing</span>
          </div>
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="headline text-[clamp(2.1rem,6vw,5.5rem)]">
                Three packages. <em>One fixed number.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="standfirst mt-6 max-w-2xl text-muted-foreground md:mt-8">
                Pick your depth. The number you approve is the number you pay. Revisions, launch and
                support are already inside it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {PACKAGES.map((p, i) => (
        <div key={p.id} className={`${GROUND[i]} px-5 py-16 md:px-10 md:py-28`}>
          <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="label text-primary">
                {p.index} · {p.featured ? "Most chosen" : p.pages}
              </p>
              <h3 className="headline mt-4 text-[clamp(2.9rem,9vw,8rem)]">{p.name}</h3>
              <p className="headline mt-4 text-[clamp(1.9rem,4vw,3.4rem)] text-primary">
                ${p.price.toLocaleString()}
              </p>
              <p className="label mt-2 text-muted-foreground">One time · {p.timeline} delivery</p>
              <p className="standfirst mt-6 max-w-md md:mt-8">{p.pitch}</p>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                Built for {p.for.toLowerCase()}.
              </p>
              <Link
                href={`/contact?pkg=${p.id}`}
                className="group mt-8 inline-flex md:mt-10 items-baseline gap-3 border-b border-current pb-2 text-lg transition-colors hover:text-primary"
              >
                Start with {p.name}
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <ul className="border-t border-current/20">
                {p.includes.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-12 gap-4 border-b border-current/15 py-3 text-[0.95rem]"
                  >
                    <span className="col-span-1 text-primary">·</span>
                    <span className="col-span-11">{item}</span>
                  </li>
                ))}
                {p.excludes?.map((item) => (
                  <li
                    key={item}
                    className="grid grid-cols-12 gap-4 border-b border-current/15 py-3 text-[0.95rem] text-muted-foreground"
                  >
                    <span className="col-span-1">×</span>
                    <span className="col-span-11">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <div className="deep px-5 pb-28 md:px-10 md:pb-40">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-12">
          <p className="label text-muted-foreground md:col-span-3">Add-ons</p>
          <ul className="md:col-span-9 md:columns-2 md:gap-14">
            {ADDONS.map((a) => (
              <li
                key={a.name}
                className="flex items-baseline justify-between gap-6 border-b border-current/15 py-4 text-[0.95rem]"
              >
                <span>{a.name}</span>
                <span className="headline text-xl text-primary">{a.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
