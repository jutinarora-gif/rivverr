export const BRAND = {
  name: "Rivverr",
  line: "Everything flows. Nothing waits.",
  email: "info@rivverr.com",
  domain: "rivverr.com",
};

export type Pkg = {
  id: "ripple" | "current" | "delta";
  index: string;
  name: string;
  price: number;
  timeline: string;
  pages: string;
  pitch: string;
  for: string;
  includes: string[];
  excludes?: string[];
  featured?: boolean;
};

export const PACKAGES: Pkg[] = [
  {
    id: "ripple",
    index: "01",
    name: "Ripple",
    price: 600,
    timeline: "7 days",
    pages: "Up to 4 pages",
    pitch: "A sharp, fast site that makes a small business look like the obvious choice.",
    for: "New businesses, solo operators, launch pages",
    includes: [
      "Custom design, no templates and no themes",
      "Up to 4 pages, fully responsive",
      "Copy polish on your existing text",
      "Contact form with email delivery",
      "On-page SEO basics: titles, meta, sitemap",
      "Core Web Vitals pass on mobile and desktop",
      "Analytics wired up",
      "1 round of revisions",
      "Launch plus 14 days of support",
    ],
    excludes: ["No CMS", "No database or logins"],
  },
  {
    id: "current",
    index: "02",
    name: "Current",
    price: 900,
    timeline: "14 days",
    pages: "Up to 8 pages",
    pitch: "The full brand site, editable by you, built to be found on Google.",
    for: "Growing service businesses, studios, clinics, agencies",
    featured: true,
    includes: [
      "Everything in Ripple",
      "Up to 8 pages with a reusable design system",
      "CMS so you can edit text, images and posts yourself",
      "Blog or case-study system",
      "Full technical SEO: schema, Open Graph, redirects, indexing",
      "Motion design across scroll and hover",
      "Booking or calendar integration",
      "Email capture into your CRM or newsletter",
      "2 rounds of revisions",
      "Launch plus 30 days of support",
    ],
    excludes: ["No custom user accounts"],
  },
  {
    id: "delta",
    index: "03",
    name: "Delta",
    price: 1200,
    timeline: "21 days",
    pages: "Unlimited pages",
    pitch: "A product-grade site with a real backend behind it.",
    for: "Ecommerce, SaaS marketing, membership and booking platforms",
    includes: [
      "Everything in Current",
      "Backend: database, auth, secure server logic",
      "User accounts, dashboards or member areas",
      "Payments with Stripe checkout or subscriptions",
      "Transactional email flows",
      "Third-party API integrations",
      "Admin panel to manage your own data",
      "Advanced SEO: programmatic pages, structured data, speed audit",
      "3 rounds of revisions",
      "Launch plus 60 days of support",
    ],
  },
];

export const ADDONS = [
  { name: "Extra page", price: "$60" },
  { name: "Copywriting, per page", price: "$80" },
  { name: "Logo & brand marks", price: "$250" },
  { name: "Stripe payments", price: "$200" },
  { name: "Rush delivery (half the timeline)", price: "+40%" },
  { name: "Monthly care & edits", price: "$120/mo" },
];

export const FACTS = [
  {
    stat: "$1,500–$5,000",
    label: "US freelance rate",
    note: "What a comparable site costs from a US-based freelancer, before revisions.",
  },
  {
    stat: "$10,000+",
    label: "US agency rate",
    note: "Standard agency minimum for a small marketing site.",
  },
  {
    stat: "4–12 weeks",
    label: "Industry timeline",
    note: "The typical wait, mostly spent in queues and approvals.",
  },
  {
    stat: "$600",
    label: "Rivverr entry",
    note: "Same craft. Custom design, live in seven days.",
  },
];

/** Who the studio is built for. Plain trades and small operators, not tech buyers. */
export const AUDIENCE = [
  { name: "Home-based businesses", note: "Look established from day one, from a kitchen table." },
  { name: "Dentists & clinics", note: "Bookings, hours and trust, all above the fold." },
  { name: "Electricians & trades", note: "Quote requests that land in your inbox, not a voicemail." },
  { name: "Small startups", note: "A launch site that raises eyebrows, not budgets." },
  { name: "Photographers & creatives", note: "Work first, big and fast-loading." },
  { name: "Freelancers & consultants", note: "One page that closes the deal before the call." },
  { name: "Restaurants & cafés", note: "Menu, map and reservations without the plugin mess." },
  { name: "Realtors & brokers", note: "Listings that look premium on a phone." },
  { name: "Coaches & therapists", note: "Calm, credible, and easy to book." },
  { name: "Salons & studios", note: "Photos, prices and a booking button that works." },
  { name: "Accountants & lawyers", note: "Quiet authority, no stock photography." },
  { name: "Local shops", note: "Found on Google, open on every screen." },
];

export const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    time: "Day 0",
    body: "A 30-minute call and a short brief. We agree scope, pages and success metrics, then send a fixed quote. Nothing starts until you approve it.",
  },
  {
    step: "02",
    title: "Design",
    time: "Days 1–3",
    body: "You see real screens, not wireframes. Type, color, layout and motion decided in the browser where they actually live.",
  },
  {
    step: "03",
    title: "Build",
    time: "Days 3–6",
    body: "Hand-built front end, wired to a CMS or backend where the package calls for it. Fast, accessible, indexable.",
  },
  {
    step: "04",
    title: "Launch",
    time: "Day 7",
    body: "Domain, hosting, analytics, SEO checks and a walkthrough video so you can run it yourself. Then support while you settle in.",
  },
];

export const CAPABILITIES = [
  {
    title: "Design",
    items: ["Art direction", "Brand systems", "Interface design", "Motion & interaction", "Design systems"],
  },
  {
    title: "Build",
    items: ["React & TypeScript", "Headless CMS", "Ecommerce & Stripe", "Databases & auth", "API integrations"],
  },
  {
    title: "Growth",
    items: ["Technical SEO", "Schema & structured data", "Core Web Vitals", "Analytics & events", "Conversion copy"],
  },
];

export type Project = {
  slug: string;
  client: string;
  url: string;
  domain: string;
  sector: string;
  year: string;
  pkg: string;
  headline: string;
  result: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "coworking-dispatch",
    client: "Coworking Dispatch",
    url: "https://www.coworkingdispatch.com",
    domain: "coworkingdispatch.com",
    sector: "Media · Coworking industry, India-first",
    year: "2025",
    pkg: "Current",
    headline:
      "Live price intelligence across 278 tracked coworking spaces in 12 Indian cities, plus editor-picked rankings and dispatches on the industry.",
    result: "A searchable, constantly-updating index the team runs itself",
    image: "/work/coworking-dispatch.png",
  },
  {
    slug: "leidenschaft",
    client: "Leidenschaft",
    url: "https://www.leidenschaft.in",
    domain: "leidenschaft.in",
    sector: "Ecommerce · Concrete home decor, India",
    year: "2025",
    pkg: "Ripple",
    headline:
      "A storefront for sculptural, handcrafted concrete lighting, tables and artworks, built to carry the same quiet elegance as the pieces themselves.",
    result: "Live inside the first week",
    image: "/work/leidenschaft.png",
  },
  {
    slug: "what-happened",
    client: "What Happened",
    url: "https://whathappened.wiki",
    domain: "whathappened.wiki",
    sector: "Community Q&A · Local history",
    year: "2025",
    pkg: "Delta",
    headline:
      "A no-signup, no-ads Q&A where people crowdsource what happened to the shops, diners and landmarks the internet forgot to record.",
    result: "Hundreds of questions answered by the crowd, not us",
    image: "/work/what-happened.png",
  },
  {
    slug: "everyday-theory",
    client: "Everyday Theory",
    url: "https://everydaytheory.com",
    domain: "everydaytheory.com",
    sector: "Ecommerce · Fine jewellery, India",
    year: "2025",
    pkg: "Current",
    headline:
      "A jewellery storefront built around a single idea, gold vermeil and cat-eye stone pieces, each one named for what it argues for.",
    result: "A brand voice that carries through every product page",
    image: "/work/everyday-theory-v2.png",
  },
  {
    slug: "founders-playbook",
    client: "Founders Playbook",
    url: "https://foundersplaybook.co",
    domain: "foundersplaybook.co",
    sector: "Content · Guides for first-time founders",
    year: "2025",
    pkg: "Delta",
    headline:
      "129 free, jargon-free guides on marketing, operations, finance and hiring, organized so a first-time founder always knows the next step.",
    result: "A growing library, still free, still no signup wall on the guides",
    image: "/work/founders-playbook.png",
  },
];

export const FAQS = [
  {
    q: "Do you use AI to build my website?",
    a: "Yes. Everyone does, in some way. We use it the way a photographer uses autofocus: it speeds up the mechanical parts so we can spend the time on art direction, structure and the details that make your site feel expensive.",
  },
  {
    q: "Will I know it's AI when I look at it?",
    a: "No. Every layout, type choice and interaction is designed and reviewed by a human. Nothing ships from a template, a theme or a generator, and nothing ships until it looks like your business and no one else's.",
  },
  {
    q: "How is $600 possible?",
    a: "We're a small studio based in India working with US clients. No offices, no account managers, no sales team taking a cut. You pay for design and engineering, nothing else. The craft is the same; the overhead isn't.",
  },
  {
    q: "Who actually does the work?",
    a: "The same people you talk to. Rivverr is deliberately small: one design lead, one build lead, no handoffs to juniors. You get direct access over email and calls.",
  },
  {
    q: "How do the time zones work?",
    a: "We overlap with US mornings and keep everything async in writing. In practice you brief at the end of your day and wake up to progress.",
  },
  {
    q: "What do you need from me?",
    a: "Your logo if you have one, any existing copy and images, and 30 minutes for discovery. If copy doesn't exist, we can write it as an add-on.",
  },
  {
    q: "What if I don't like the design?",
    a: "You see direction in the first 72 hours, before the build starts. Every package includes revision rounds. If the first direction misses, we redirect early. That's the point of showing real screens fast.",
  },
  {
    q: "Who owns the site?",
    a: "You do. Code, design files, domain, hosting accounts, all in your name from day one. No lock-in, no proprietary builder.",
  },
  {
    q: "How does payment work?",
    a: "50% to start after discovery approval, 50% at launch. Bank transfer, card or Wise. Fixed price: the quote you approve is the invoice you get.",
  },
  {
    q: "What happens after launch?",
    a: "Support is included with every package, from 14 to 60 days. After that you can leave it alone or put it on a monthly care plan for edits and updates.",
  },
];
