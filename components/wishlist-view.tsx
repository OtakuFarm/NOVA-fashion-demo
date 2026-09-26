"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useStore } from "@/components/store";
import { getProductByHandle } from "@/lib/commerce";

/** Saved-items grid with an empty state. */
export function WishlistView() {
  const { wishlist, toggleWishlist, clearRecentlyViewed } = useStore();
  const items = wishlist
    .map((handle) => getProductByHandle(handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 border border-dashed border-ink/20 px-6 py-24 text-center">
        <Heart className="size-9 text-ink/30" aria-hidden="true" />
        <div>
          <h2 className="text-2xl">Nothing saved yet</h2>
          <p className="mt-2 max-w-sm text-sm text-ink-soft">
            Tap the heart on any product to save it here. Your wishlist is stored on this device
            only.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/shop">Browse the range</ButtonLink>
          <ButtonLink href="/collections/bestsellers" variant="outline">
            Shop bestsellers
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between border-b border-ink/10 pb-4">
        <p className="text-xs text-ink-soft">
          {items.length} {items.length === 1 ? "piece" : "pieces"} saved
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={clearRecentlyViewed}
            className="text-xs text-ink-soft transition-colors hover:text-ink"
          >
            Clear recent views
          </button>
          <button
            type="button"
            onClick={() => items.forEach((p) => toggleWishlist(p.handle))}
            className="text-xs text-ink-soft transition-colors hover:text-ink"
          >
            Clear all
          </button>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {items.map((product, i) => (
            <motion.li
              key={product.id}
              layout
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} index={i} priority={i < 4} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-16 border border-ink/10 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg">
              <ShoppingBag className="size-4" aria-hidden="true" /> Ready to decide?
            </h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              Your bag and wishlist are kept separately — move anything you like into the bag.
            </p>
          </div>
          <ButtonLink href="/cart">Go to bag</ButtonLink>
        </div>
      </div>
    </>
  );
}
