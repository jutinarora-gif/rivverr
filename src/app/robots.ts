import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/blocked"],
    },
    sitemap: "https://rivverr.com/sitemap.xml",
  };
}
