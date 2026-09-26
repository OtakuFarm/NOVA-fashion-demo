"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { OrderSummary } from "@/components/order-summary";
import { useStore } from "@/components/store";
import { formatPrice, productPath } from "@/lib/commerce";

/** Full cart page: line items plus the order summary. */
export function CartView() {
  const { lines, setQuantity, removeLine, clearCart, count } = useStore();

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 border border-dashed border-ink/20 px-6 py-24 text-center">
        <ShoppingBag className="size-9 text-ink/30" aria-hidden="true" />
        <div>
          <h2 className="text-2xl">Your bag is empty</h2>
          <p className="mt-2 text-sm text-ink-soft">Nothing in here yet. The AW26 drop is live now.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="/collections/new-arrivals">Shop New Arrivals</ButtonLink>
          <ButtonLink href="/wishlist" variant="outline">
            View wishlist
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
      <section aria-label="Bag items">
        <div className="mb-6 flex items-center justify-between border-b border-ink/10 pb-4">
          <p className="text-xs text-ink-soft">
            {count} {count === 1 ? "item" : "items"}
          </p>
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-ink-soft transition-colors hover:text-ink"
          >
            Clear bag
          </button>
        </div>

        <ul className="divide-y divide-ink/10">
          <AnimatePresence initial={false}>
            {lines.map((line) => (
              <motion.li
                key={line.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-5 overflow-hidden py-6"
              >
                <Link href={productPath(line.handle)} className="shrink-0">
                  <MediaImage
                    src={line.image.src}
                    alt={line.image.alt}
                    width={line.image.width}
                    height={line.image.height}
                    className="w-28 sm:w-36"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={productPath(line.handle)}
                        className="text-base leading-tight hover:underline"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1.5 text-xs text-ink-soft">
                        {line.color} · Size {line.size}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-soft">
                        {formatPrice(line.price.amount)} each
                      </p>
                    </div>
                    <p className="shrink-0 tabular-nums">
                      {formatPrice(line.price.amount * line.quantity)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="inline-flex items-center border border-ink/15">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.name}`}
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                        className="px-3 py-2 transition-colors hover:bg-ink hover:text-bone"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="min-w-9 text-center text-sm tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.name}`}
                        disabled={line.quantity >= line.maxQuantity}
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                        className="px-3 py-2 transition-colors hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      className="flex items-center gap-1.5 text-xs text-ink-soft transition-colors hover:text-ink"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" /> Remove
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="mt-8">
          <Link href="/shop" className="link-underline text-xs uppercase tracking-[0.2em]">
            Continue shopping
          </Link>
        </div>
      </section>

      <OrderSummary />
    </div>
  );
}
