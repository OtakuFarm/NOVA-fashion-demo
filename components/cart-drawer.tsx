"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";

import { formatPrice } from "@/lib/commerce";
import { useStore } from "@/components/store";

/** Slide-over cart, mounted once by the store provider. */
export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, setQuantity, removeLine, freeShippingRemaining } =
    useStore();
  const progress = Math.min(100, Math.round((subtotal / 150) * 100));

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            onClick={() => setCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 cursor-default bg-ink/45 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-95 flex w-full max-w-md flex-col bg-bone"
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg">
                <ShoppingBag className="size-4" aria-hidden="true" /> Bag
                <span className="text-sm text-ink-soft">({lines.length})</span>
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="rounded-full p-1.5 transition-colors hover:bg-ink/5"
              >
                <X className="size-5" />
              </button>
            </header>

            {lines.length > 0 && (
              <div className="border-b border-ink/10 px-6 py-4">
                <p className="text-xs text-ink-soft">
                  {freeShippingRemaining > 0
                    ? `${formatPrice(freeShippingRemaining)} away from free shipping`
                    : "You have unlocked free shipping"}
                </p>
                <div className="mt-2 h-[3px] w-full bg-ink/10">
                  <motion.div
                    className="h-full bg-ink"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="size-8 text-ink/30" aria-hidden="true" />
                  <p className="text-ink-soft">Your bag is empty.</p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="link-underline text-sm uppercase tracking-[0.2em]"
                  >
                    Shop New Arrivals
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 overflow-hidden py-5"
                      >
                        <Link
                          href={`/products/${line.handle}`}
                          onClick={() => setCartOpen(false)}
                          className="shrink-0"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={line.image.src}
                            alt={line.image.alt}
                            width={80}
                            height={100}
                            className="h-25 w-20 bg-sand object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-3">
                            <Link
                              href={`/products/${line.handle}`}
                              onClick={() => setCartOpen(false)}
                              className="text-sm leading-tight hover:underline"
                            >
                              {line.name}
                            </Link>
                            <span className="text-sm tabular-nums">
                              {formatPrice(line.price.amount * line.quantity)}
                            </span>
                          </div>
                          <p className="text-xs text-ink-soft">
                            {line.color} · Size {line.size}
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center border border-ink/15">
                              <button
                                type="button"
                                aria-label={`Decrease quantity of ${line.name}`}
                                onClick={() => setQuantity(line.id, line.quantity - 1)}
                                className="px-2.5 py-1.5 transition-colors hover:bg-ink hover:text-bone"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="min-w-8 text-center text-sm tabular-nums">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase quantity of ${line.name}`}
                                disabled={line.quantity >= line.maxQuantity}
                                onClick={() => setQuantity(line.id, line.quantity + 1)}
                                className="px-2.5 py-1.5 transition-colors hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink"
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
              )}
            </div>

            {lines.length > 0 && (
              <footer className="space-y-3 border-t border-ink/10 px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-ink-soft">Subtotal</span>
                  <span className="text-lg tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-ink-soft">
                  Taxes and shipping calculated at checkout. This is a demo — no payment is taken.
                </p>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="block w-full bg-ink py-4 text-center text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-ink-soft"
                >
                  View Bag
                </Link>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
