import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { ProductListing } from "@/components/product/product-listing";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { collections, getCollectionByHandle, getProductsInCollection } from "@/lib/commerce";
import { buildMetadata } from "@/lib/site";

/** Pre-render every known collection handle. */
export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) {
    return buildMetadata({
      title: "Collection not found",
      description: "This NOVA collection could not be found.",
      path: `/collections/${handle}`,
    });
  }

  return buildMetadata({
    title: `${collection.name} — ${collection.season}`,
    description: `${collection.description} Shop the NOVA ${collection.name.toLowerCase()} collection.`,
    path: `/collections/${collection.handle}`,
    image: collection.hero.src,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) notFound();

  const items = getProductsInCollection(collection.handle);
  const others = collections.filter((c) => c.handle !== collection.handle).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={`Collection — ${collection.season}`}
        title={collection.name}
        description={collection.longDescription}
        image={collection.hero}
        meta={[{ label: "Pieces", value: `${items.length} in this collection` }]}
      />

      <section className="container-nova pb-20 md:pb-28">
        <ProductListing
          products={items}
          emptyAction={{ label: "Shop everything", href: "/shop" }}
        />
      </section>

      <section className="border-t border-ink/10 bg-sand py-16">
        <div className="container-nova">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="text-3xl md:text-4xl">More collections</h2>
            <ButtonLink href="/shop" variant="outline" size="sm">
              Shop all
            </ButtonLink>
          </div>
          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {others.map((c, i) => (
              <Reveal as="li" key={c.handle} delay={i * 0.06}>
                <Link href={`/collections/${c.handle}`} className="group block">
                  <p className="text-sm group-hover:underline">{c.name}</p>
                  <p className="mt-1 text-xs text-ink-soft">{c.description}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
