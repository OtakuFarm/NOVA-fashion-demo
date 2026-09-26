import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHero } from "@/components/layout/page-hero";
import { SearchView } from "@/components/search-view";
import { products } from "@/lib/commerce";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Search",
  description:
    "Search the full NOVA range by product name, category, colour or fabric — heavyweight fleece, technical outerwear, selvedge denim and more.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find your piece"
        description="Search by name, category or fabric. Try “hoodie”, “denim” or “cargo”."
      />
      <section className="container-nova pb-20 md:pb-28">
        {/* useSearchParams requires a Suspense boundary */}
        <Suspense
          fallback={<p className="text-sm text-ink-soft">Loading results…</p>}
        >
          <SearchView products={products} />
        </Suspense>
      </section>
    </>
  );
}
