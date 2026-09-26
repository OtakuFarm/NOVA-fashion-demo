import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { RecentlyViewed } from "@/components/product/recently-viewed";
import { ReviewsSection } from "@/components/product/reviews-section";
import { SectionHeading } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { getProductByHandle, getRelatedProducts, products } from "@/lib/commerce";
import { buildMetadata, site } from "@/lib/site";

/** Pre-render every product handle. */
export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) {
    return buildMetadata({
      title: "Product not found",
      description: "This NOVA product could not be found.",
      path: `/products/${handle}`,
    });
  }

  return buildMetadata({
    title: product.name,
    description: product.description.slice(0, 155),
    path: `/products/${product.handle}`,
    image: product.images[0].src,
    type: "website",
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${site.url}${i.src}`),
    brand: { "@type": "Brand", name: site.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price.amount,
      priceCurrency: product.price.currencyCode,
      availability:
        product.stock === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="container-nova pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          <li>
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/shop`} className="hover:text-ink">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Gallery + buy box */}
      <section className="container-nova grid gap-12 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-14">
        <ProductGallery images={product.images} name={product.name} />
        <ProductPurchasePanel product={product} />
      </section>

      {/* Details */}
      <section className="container-nova grid gap-12 pb-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-2xl">Description</h2>
          <p className="mt-5 text-sm leading-relaxed text-ink-soft md:text-base">
            {product.description}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-2xl">Details &amp; care</h2>
          <ul className="mt-5 space-y-3">
            {product.details.map((d) => (
              <li key={d} className="flex gap-3 text-sm text-ink-soft">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-ink" />
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Reviews */}
      <div className="container-nova pb-16">
        <ReviewsSection product={product} />
      </div>

      {/* Recently viewed */}
      <div className="container-nova pb-20">
        <RecentlyViewed currentHandle={product.handle} />
      </div>

      {/* Recommendations */}
      <section className="border-t border-ink/10 bg-sand py-20">
        <div className="container-nova">
          <SectionHeading
            eyebrow="Complete the look"
            title="You may also like"
            action={{ label: "Shop all", href: "/shop" }}
            className="mb-12"
          />
          <ProductGrid products={related} columns={4} />
        </div>
      </section>
    </>
  );
}
