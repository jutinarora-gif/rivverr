"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BRAND, PACKAGES, PROCESS } from "@/lib/site-data";

const field =
  "w-full border-b border-foreground/25 bg-transparent py-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const VALID_PKGS = new Set(PACKAGES.map((p) => p.id));

export function ContactForm() {
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get("pkg");
  const initial = pkgParam && VALID_PKGS.has(pkgParam as (typeof PACKAGES)[number]["id"]) ? pkgParam : "current";
  const [selected, setSelected] = useState<string>(initial);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    if (!name || !email) {
      toast.error("Name and email, please. That's all we need to reply.");
      return;
    }

    const payload = {
      name,
      email,
      company: String(data.get("company") || ""),
      site: String(data.get("site") || ""),
      pkg: selected,
      deadline: String(data.get("deadline") || ""),
      details: String(data.get("details") || ""),
    };

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      toast.success("Sent. We reply within 24 hours.");
      form.reset();
      setSelected("current");
    } catch {
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Company: ${payload.company || "not given"}`,
        `Current site: ${payload.site || "not given"}`,
        `Package: ${payload.pkg}`,
        `Deadline: ${payload.deadline || "not given"}`,
        "",
        "Project:",
        payload.details || "not given",
      ].join("\n");
      window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
        `New project from ${name}`,
      )}&body=${encodeURIComponent(body)}`;
      toast.error("Couldn't send automatically, opening your email client instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SmoothScroll />
      <Nav />
      <main className="mx-auto max-w-[1500px] px-5 pt-32 md:px-10 md:pt-44">
        <div className="label flex justify-between text-muted-foreground">
          <span className="text-primary">Start</span>
          <span>Reply within 24 hours</span>
        </div>
        <h1 className="headline mt-6 text-[clamp(2.6rem,11vw,10rem)]">
          Tell us <em className="text-primary">everything.</em>
        </h1>

        <div className="mt-14 grid gap-12 md:mt-20 md:gap-16 md:grid-cols-12">
          <form onSubmit={onSubmit} className="flex flex-col gap-8 md:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
              <input name="name" className={field} placeholder="Your name *" autoComplete="name" />
              <input name="email" type="email" className={field} placeholder="Email *" autoComplete="email" />
              <input name="company" className={field} placeholder="Company" autoComplete="organization" />
              <input name="site" className={field} placeholder="Current website (if any)" />
            </div>

            <fieldset>
              <legend className="label text-muted-foreground">Package</legend>
              <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
                {PACKAGES.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className={`flex flex-col gap-1 p-4 text-left transition-colors ${
                      selected === p.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background hover:text-primary"
                    }`}
                  >
                    <span className="headline text-2xl">{p.name}</span>
                    <span className="label">
                      ${p.price} · {p.timeline}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <input name="deadline" className={field} placeholder="Do you have a deadline?" />
            <textarea
              name="details"
              rows={5}
              className={`${field} resize-none`}
              placeholder="What does the business do, and what should the site achieve?"
            />

            <button
              type="submit"
              disabled={sending}
              className="label group inline-flex items-center justify-between border border-primary bg-primary px-6 py-5 text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send the brief"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            <p className="text-xs text-muted-foreground">
              Prefer email? Write to{" "}
              <a href={`mailto:${BRAND.email}`} className="text-primary">
                {BRAND.email}
              </a>
              . No newsletters, no follow-up sequences.
            </p>
          </form>

          <aside className="md:col-span-4 md:col-start-9">
            <p className="label text-muted-foreground">What happens next</p>
            <ol className="mt-6 flex flex-col">
              {PROCESS.map((p) => (
                <li key={p.step} className="rule py-5">
                  <div className="label flex justify-between text-muted-foreground">
                    <span className="text-primary">{p.step}</span>
                    <span>{p.time}</span>
                  </div>
                  <p className="headline mt-2 text-2xl">{p.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                </li>
              ))}
            </ol>
            <p className="label mt-8 text-muted-foreground">
              50% to start · 50% at launch · You own everything
            </p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
