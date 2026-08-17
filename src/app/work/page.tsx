import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { PROJECTS } from "@/lib/site-data";

const TITLE = "Work by Rivverr: Web Design & Development Studio";
const DESC =
  "Selected websites built by Rivverr for media, publishing, reference and SaaS clients, each shipped inside a fixed timeline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/work" },
  openGraph: { title: TITLE, description: DESC, type: "website", url: "/work" },
  twitter: { card: "summary_large_image" },
};

export default function Work() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="mx-auto max-w-[1500px] px-5 pt-32 md:px-10 md:pt-44">
        <div className="label flex justify-between text-muted-foreground">
          <span className="text-primary">Index of work</span>
          <span>2024 to 2025</span>
        </div>
        <h1 className="headline mt-6 text-[clamp(2.6rem,11vw,10rem)]">
          Built. Shipped. <em className="text-primary">Working.</em>
        </h1>
        <p className="standfirst mt-8 max-w-2xl text-muted-foreground">
          Recent projects, all live right now. Every one custom designed, hand built and delivered
          inside the window we promised at discovery. Click any card to visit the site.
        </p>

        <div className="mt-14 grid gap-x-5 gap-y-16 md:mt-20 md:gap-y-20 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit ${p.client} at ${p.domain}`}
                className="group block"
              >
                <div className="relative overflow-hidden border border-foreground/10" style={{ aspectRatio: "2000 / 920" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={`${p.client} website designed and built by Rivverr`}
                    loading={i < 2 ? "eager" : "lazy"}
                    width={2000}
                    height={920}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <span className="label absolute left-4 top-4 bg-background/85 px-3 py-1.5 text-primary backdrop-blur">
                    {p.pkg} · ${p.pkg === "Ripple" ? 600 : p.pkg === "Current" ? 900 : 1200}
                  </span>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-foreground/20 pt-4">
                  <h2 className="headline text-[clamp(1.6rem,3.2vw,2.6rem)] transition-colors group-hover:text-primary">
                    {p.client}
                  </h2>
                  <span className="label text-muted-foreground">{p.year}</span>
                </div>
                <p className="label mt-2 text-muted-foreground">{p.sector}</p>
                <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed">{p.headline}</p>
                <p className="mt-3 text-[0.95rem] italic text-primary">{p.result}</p>
                <span className="label mt-4 inline-flex items-center gap-2 text-primary">
                  {p.domain}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Link
            href="/contact"
            className="group inline-flex items-baseline gap-3 border-b border-foreground pb-2 text-lg transition-colors hover:border-primary hover:text-primary"
          >
            Put your project on this page
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </main>
      <Cta />
      <Footer />
    </>
  );
}
