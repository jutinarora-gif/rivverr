import Link from "next/link";
import { BRAND } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="deep px-5 pb-12 pt-20 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 border-t border-current/20 pt-12 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <p className="headline text-[clamp(2.6rem,9vw,7rem)] leading-[0.9]">Rivverr</p>
            <p className="standfirst mt-4 text-muted-foreground">
              <em>{BRAND.line}</em>
            </p>
          </div>
          <div className="label flex flex-col gap-3 md:col-span-3">
            <span className="text-muted-foreground">Menu</span>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/work" className="hover:text-primary">
              Work
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Start a project
            </Link>
          </div>
          <div className="label flex flex-col gap-3 md:col-span-3">
            <span className="text-muted-foreground">Contact</span>
            <a href={`mailto:${BRAND.email}`} className="hover:text-primary">
              {BRAND.email}
            </a>
            <span className="text-muted-foreground">New Delhi, India</span>
            <span className="text-muted-foreground">Working US hours</span>
          </div>
        </div>
        <div className="label mt-12 flex flex-wrap justify-between gap-3 md:mt-16 border-t border-current/15 pt-6 text-muted-foreground">
          <span>© {new Date().getFullYear()} Rivverr Studio</span>
          <span>Fixed price · Fixed date · You own everything</span>
        </div>
      </div>
    </footer>
  );
}
