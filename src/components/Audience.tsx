import Link from "next/link";
import { AUDIENCE } from "@/lib/site-data";
import { ChapterHead, Reveal } from "./Reveal";

export function Audience() {
  return (
    <section className="mid px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <ChapterHead
          index="03"
          label="Who we're for"
          title={
            <>
              Built for people who run a business, <em>not a tech team.</em>
            </>
          }
          lead="You don't need to know what a CMS is. You need a site that makes the phone ring, at a price that doesn't need a board meeting."
        />

        <ul className="mt-14 grid gap-px border border-current/15 bg-current/15 md:mt-20 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <li key={a.name} className="bg-background p-6 md:p-8">
              <Reveal delay={(i % 3) * 0.05}>
                <p className="label text-primary">{String(i + 1).padStart(2, "0")}</p>
                <p className="headline mt-3 text-[clamp(1.4rem,2.4vw,2rem)]">{a.name}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">{a.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="standfirst mt-12 max-w-2xl md:mt-16">
            Not on the list? If you sell something to someone, we can build it.{" "}
            <Link href="/contact" className="text-primary underline underline-offset-4">
              Ask us.
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
