"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/button";
import { collectionPath, type Collection } from "@/lib/commerce";

/** Large editorial collection cards with a hover zoom + image cross-fade. */
export function CollectionCards({ collections }: { collections: Collection[] }) {
  return (
    <section id="featured" className="container-nova py-20 md:py-28">
      <SectionHeading
        eyebrow="Featured Collections"
        title="Shop by edit"
        description="Four ways into the AW26 system — from permanent essentials to technical outerwear built for weather that does not cooperate."
        action={{ label: "View all collections", href: "/collections/new-arrivals" }}
        className="mb-12"
      />

      <ul className="grid gap-5 md:grid-cols-2">
        {collections.slice(0, 4).map((collection, i) => (
          <motion.li
            key={collection.handle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={i % 3 === 0 ? "md:row-span-2" : ""}
          >
            <Link href={collectionPath(collection.handle)} className="group relative block h-full">
              <MediaImage
                src={collection.image.src}
                alt={collection.image.alt}
                width={collection.image.width}
                height={collection.image.height}
                aspect={i % 3 === 0 ? "aspect-[4/5] md:aspect-[4/4.6]" : "aspect-[4/5]"}
                className="h-full w-full"
                imgClassName="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20"
                />
              </MediaImage>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-bone md:p-7">
                <div>
                  <p className="eyebrow mb-2 text-bone/70">{collection.season}</p>
                  <h3 className="text-2xl text-bone md:text-3xl">{collection.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-bone/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {collection.description}
                  </p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-bone/40 transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
