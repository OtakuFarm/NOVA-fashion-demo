import type { Metadata } from "next";

import { BrandStory } from "@/components/home/brand-story";
import { CollectionCards } from "@/components/home/collection-cards";
import { EditorialSection } from "@/components/home/editorial";
import { Hero } from "@/components/home/hero";
import { SocialGrid } from "@/components/home/social-grid";
import { Testimonials } from "@/components/home/testimonials";
import { PromoStrip } from "@/components/layout/announcement";
import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink, SectionHeading } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { bestSellers, collections, newArrivals, socialTiles, testimonials } from "@/lib/commerce";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Premium Streetwear & Essentials",
  description:
    "NOVA designs heavyweight essentials, technical outerwear and rigid selvedge denim in small runs. Shop the AW26 drop — free shipping over $150 and 30-day returns.",
  path: "/",
});

export default function HomePage() {
  const arrivals = newArrivals().slice(0, 6);
  const sellers = bestSellers().slice(0, 4);
  const spotlight = arrivals[0];

  return (
    <>
      <PromoStrip />
      <Hero />

      <CollectionCards collections={collections} />

      {/* New arrivals */}
      <section className="container-nova pb-20 md:pb-28">
        <SectionHeading
          eyebrow="Just Landed"
          title="New arrivals"
          action={{ label: "Shop all new arrivals", href: "/collections/new-arrivals" }}
          className="mb-12"
        />
        <ProductGrid products={arrivals} columns={3} priorityCount={3} />
      </section>

      <EditorialSection spotlight={spotlight} />

      {/* Bestsellers */}
      <section className="container-nova py-20 md:py-28">
        <SectionHeading
          eyebrow="Most Reordered"
          title="Bestsellers"
          description="Ranked by reorders, not by ad spend. These are the pieces people buy a second time."
          action={{ label: "Shop bestsellers", href: "/collections/bestsellers" }}
          className="mb-12"
        />
        <ProductGrid products={sellers} columns={4} />
      </section>

      <BrandStory />
      <Testimonials reviews={testimonials} />
      <SocialGrid tiles={socialTiles} />

      {/* Closing CTA */}
      <Reveal as="section" className="container-nova pb-24">
        <div className="relative overflow-hidden bg-ink px-6 py-20 text-center text-bone md:py-28">
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="eyebrow mb-5 text-bone/60">AW26 — Drop 04</p>
            <h2 className="text-4xl text-bone md:text-6xl">Move Different.</h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-bone/60">
              Eight new pieces, produced once. When a size goes, it is gone — and we do not
              restock.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/collections/new-arrivals" variant="accent" size="lg">
                Shop New Arrivals
              </ButtonLink>
              <ButtonLink
                href="/collections/essentials"
                size="lg"
                className="border-bone/30 text-bone hover:border-bone"
              >
                Start with Essentials
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
