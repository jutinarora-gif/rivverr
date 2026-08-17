import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { Facts } from "@/components/Facts";
import { Capabilities } from "@/components/Capabilities";
import { Audience } from "@/components/Audience";
import { WorkStrip } from "@/components/WorkStrip";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

const TITLE = "Rivverr: Custom Websites for US Businesses from $600";
const DESC =
  "Design-led web studio building custom, SEO-ready websites for US businesses. Three fixed packages from $600 to $1,200, live in 7 to 21 days.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESC, type: "website", url: "/" },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rivverr",
  description: DESC,
  areaServed: "United States",
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  email: "info@rivverr.com",
  priceRange: "$600-$1200",
  makesOffer: [
    { "@type": "Offer", name: "Ripple", price: "600", priceCurrency: "USD" },
    { "@type": "Offer", name: "Current", price: "900", priceCurrency: "USD" },
    { "@type": "Offer", name: "Delta", price: "1200", priceCurrency: "USD" },
  ],
};

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Facts />
        <Capabilities />
        <Audience />
        <WorkStrip />
        <Process />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
