/**
 * Global site configuration — brand constants, navigation and SEO helpers.
 * NOVA is a fictional brand created for this portfolio demo.
 */

export const site = {
  name: "NOVA",
  tagline: "Move Different.",
  description:
    "NOVA is a fictional premium streetwear label built around heavyweight essentials, technical outerwear and rigid denim. Designed in small runs, made to be worn daily.",
  url: "https://nova-demo.example.com",
  email: "studio@nova-demo.example.com",
  phone: "+1 (000) 000-0000",
  address: "Unit 4, 18 Mercer Yard, Brooklyn, NY 11222",
  hours: "Mon–Fri, 9am–6pm ET",
  social: [
    { label: "Instagram", href: "https://instagram.com", handle: "@nova" },
    { label: "TikTok", href: "https://tiktok.com", handle: "@nova" },
    { label: "Pinterest", href: "https://pinterest.com", handle: "@nova" },
    { label: "YouTube", href: "https://youtube.com", handle: "@nova" },
  ],
} as const;

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const navigation: NavItem[] = [
  { label: "Shop", href: "/shop" },
  {
    label: "Collections",
    href: "/collections/new-arrivals",
    children: [
      { label: "New Arrivals", href: "/collections/new-arrivals", description: "The latest AW26 drop" },
      { label: "Essentials", href: "/collections/essentials", description: "The permanent core" },
      { label: "Bestsellers", href: "/collections/bestsellers", description: "Most reordered" },
      { label: "Outerwear", href: "/collections/outerwear", description: "Technical shells and layers" },
      { label: "Accessories", href: "/collections/accessories", description: "Caps, bags and knitwear" },
      { label: "AW26 Season", href: "/collections/new-season", description: "The full system" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/collections/new-arrivals" },
      { label: "Essentials", href: "/collections/essentials" },
      { label: "Bestsellers", href: "/collections/bestsellers" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Size Guide", href: "/faq#sizing" },
      { label: "Track Order", href: "/faq#orders" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Search", href: "/search" },
    ],
  },
] as const;

export const announcementMessages = [
  "Complimentary shipping on orders over $150",
  "AW26 drop is live — small runs, never restocked",
  "Free 30-day returns, no questions asked",
];

/** Builds a consistent Metadata object with Open Graph + Twitter tags. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/media/og.svg",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  /** Open Graph only supports website/article/profile/music/video/book. */
  type?: "website" | "article";
}) {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      images: [{ url: `${site.url}${image}`, width: 1200, height: 630, alt: title }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
      images: [`${site.url}${image}`],
    },
  };
}
