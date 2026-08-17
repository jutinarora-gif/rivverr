import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";

const TITLE = "Start a Project with Rivverr Web Studio";
const DESC =
  "Tell us about your project and get a fixed quote, scope and delivery date within 24 hours. Websites from $600, live in 7 days.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESC, type: "website", url: "/contact" },
  twitter: { card: "summary_large_image" },
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}
