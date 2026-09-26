import type { MetadataRoute } from "next";

import { collections, products } from "@/lib/commerce";
import { site } from "@/lib/site";

/** Dynamic sitemap covering every static page, collection and product. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.5 },
    { path: "/faq", priority: 0.5 },
    { path: "/shipping-returns", priority: 0.4 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    { path: "/search", priority: 0.3 },
    { path: "/wishlist", priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r.priority,
    })),
    ...collections.map((c) => ({
      url: `${site.url}/collections/${c.handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/products/${p.handle}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
