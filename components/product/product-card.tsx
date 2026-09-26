"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

import { MediaImage } from "@/components/ui/media-image";
import { Stars } from "@/components/ui/stars";
import { useStore } from "@/components/store";
import { formatPrice, productPath } from "@/lib/commerce";
import type { Product } from "@/lib/types";

/** Editorial product tile with image swap on hover and a wishlist toggle. */
export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const { toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.handle);
  const soldOut = product.stock === "out-of-stock";
  const hover = product.images[1] ?? product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={productPath(product.handle)} className="block">
        <div className="relative overflow-hidden bg-sand">
          <MediaImage
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={product.images[0].width}
            height={product.images[0].height}
            priority={priority}
            imgClassName="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hover.src}
              alt=""
              width={hover.width}
              height={hover.height}
              loading="lazy"
              decoding="async"
              className="size-full scale-[1.04] object-cover"
            />
          </div>
        </div>
      </Link>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
        <div className="flex flex-col items-start gap-1.5">
          {product.tags.includes("new") && (
            <span className="bg-ink px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-bone">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="bg-accent px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-ink">
              Save {formatPrice(product.compareAtPrice.amount - product.price.amount)}
            </span>
          )}
          {soldOut && (
            <span className="bg-bone px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-ink-soft">
              Sold out
            </span>
          )}
          {!soldOut && product.stock === "low-stock" && (
            <span className="bg-clay px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-bone">
              {product.stockCount} left
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={saved}
        onClick={() => toggleWishlist(product.handle)}
        className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-bone/90 text-ink opacity-0 backdrop-blur transition-all duration-300 hover:bg-ink hover:text-bone focus-visible:opacity-100 group-hover:opacity-100 max-sm:opacity-100"
      >
        <Heart className="size-4" fill={saved ? "currentColor" : "none"} />
      </button>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm leading-snug">
            <Link href={productPath(product.handle)} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="shrink-0 text-sm tabular-nums">
            {product.compareAtPrice && (
              <span className="mr-2 text-ink-soft line-through">
                {formatPrice(product.compareAtPrice.amount)}
              </span>
            )}
            {formatPrice(product.price.amount)}
          </p>
        </div>
        <p className="mt-1 text-xs text-ink-soft">{product.subtitle}</p>
        <div className="mt-2 flex items-center gap-2.5">
          <Stars rating={product.rating} size={12} />
          <span className="text-[0.7rem] text-ink-soft">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>
        <div
          className="mt-2.5 flex items-center gap-1.5"
          aria-label={`${product.colors.length} colours available`}
        >
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="size-3.5 rounded-full ring-1 ring-ink/15 ring-offset-1 ring-offset-bone"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
