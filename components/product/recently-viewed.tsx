"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/button";
import { useStore } from "@/components/store";
import { formatPrice, productPath } from "@/lib/commerce";

/** "Recently viewed" rail, driven by the store's local history. */
export function RecentlyViewed({ currentHandle }: { currentHandle: string }) {
  const { recentlyViewed, clearRecentlyViewed } = useStore();
  const items = recentlyViewed.filter((p) => p.handle !== currentHandle).slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-ink/10 pt-14">
      <div className="mb-8 flex items-end justify-between gap-4">
        <SectionHeading title="Recently viewed" eyebrow="Pick up where you left off" />
        <button
          type="button"
          onClick={clearRecentlyViewed}
          className="flex shrink-0 items-center gap-1.5 text-xs text-ink-soft transition-colors hover:text-ink"
        >
          <X className="size-3.5" aria-hidden="true" /> Clear
        </button>
      </div>

      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.handle}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={productPath(item.handle)} className="group block">
                <MediaImage
                  src={item.image}
                  alt={item.name}
                  width={1200}
                  height={1500}
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <p className="mt-3 text-xs leading-snug group-hover:underline">{item.name}</p>
                <p className="mt-1 text-xs text-ink-soft">{formatPrice(item.price)}</p>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
}
