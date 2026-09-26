"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ButtonLink, SectionHeading } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { formatPrice, productPath, type Product } from "@/lib/commerce";

/** Asymmetric editorial split: lookbook artwork next to a product callout. */
export function EditorialSection({ spotlight }: { spotlight: Product }) {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-nova">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <MediaImage
              src="/media/hero-secondary.svg"
              alt="NOVA lookbook — abstract editorial artwork"
              width={1600}
              height={2000}
              aspect="aspect-[4/5] lg:aspect-[4/4.4]"
              className="h-full w-full"
              imgClassName="object-cover"
            />
          </motion.div>

          <div className="flex flex-col justify-center gap-8 lg:col-span-5">
            <div>
              <SectionHeading
                eyebrow="The Edit"
                title="Layering is the whole point"
                description="Every NOVA piece is designed to be worn over something else. The system is engineered across weights, so three layers still read as one silhouette."
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="border border-ink/10 bg-bone p-6"
            >
              <p className="eyebrow text-ink-soft">Spotlight</p>
              <Link href={productPath(spotlight.handle)} className="group mt-4 block">
                <div className="flex gap-5">
                  <MediaImage
                    src={spotlight.images[0].src}
                    alt={spotlight.images[0].alt}
                    width={spotlight.images[0].width}
                    height={spotlight.images[0].height}
                    className="w-28 shrink-0"
                  />
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg leading-tight group-hover:underline">{spotlight.name}</h3>
                      <p className="mt-1.5 text-xs text-ink-soft">{spotlight.subtitle}</p>
                    </div>
                    <p className="mt-4 text-sm tabular-nums">{formatPrice(spotlight.price.amount)}</p>
                  </div>
                </div>
                <p className="mt-5 inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.2em]">
                  View product
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </p>
              </Link>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/collections/outerwear">Shop Outerwear</ButtonLink>
              <ButtonLink href="/collections/new-season" variant="outline">
                View the lookbook
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
