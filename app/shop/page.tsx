import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { ProductListing } from "@/components/product/product-listing";
import { getAllCategories, priceBounds, products } from "@/lib/commerce";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Shop All Products",
  description:
    "Shop the full NOVA range — heavyweight tees, brushed fleece, technical outerwear, rigid selvedge denim and accessories. Filter by category, colour, size and price.",
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Shop All"
        title="The full range"
        description="Every piece NOVA currently makes, in one place. Filter by category, colour, size or price — or just scroll and see what catches your eye."
        meta={[
          { label: "Products", value: `${products.length} pieces` },
          { label: "Categories", value: getAllCategories().join(", ") },
          { label: "Price range", value: `$${priceBounds.min} – $${priceBounds.max}` },
        ]}
      />

      <section className="container-nova pb-20 md:pb-28">
        <ProductListing
          products={products}
          emptyAction={{ label: "Browse new arrivals", href: "/collections/new-arrivals" }}
        />
      </section>

      {/* Quick category links for crawlability and fast navigation */}
      <section className="border-t border-ink/10 bg-sand py-14">
        <div className="container-nova">
          <h2 className="eyebrow mb-6 text-ink-soft">Shop by category</h2>
          <ul className="flex flex-wrap gap-3">
            {getAllCategories().map((c) => (
              <li key={c}>
                <Link
                  href={`/shop?category=${encodeURIComponent(c)}`}
                  className="inline-block border border-ink/20 px-5 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
