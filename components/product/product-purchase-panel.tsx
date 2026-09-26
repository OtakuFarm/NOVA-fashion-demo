"use client";

import { motion } from "framer-motion";
import { Check, Heart, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Stars } from "@/components/ui/stars";
import { PurchaseReassurance } from "@/components/product/purchase-reassurance";
import { formatPrice, stockLabel, type Product } from "@/lib/commerce";
import { useStore } from "@/components/store";
import { useToast } from "@/components/toast";

const LIGHT_SWATCHES = ["Bone", "Signal", "Sand", "Sky", "Raw Indigo", "Olive", "Clay", "Moss"];

/** Size, colour and quantity selectors plus add-to-bag and wishlist actions. */
export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, trackView } = useStore();
  const notify = useToast();

  const sizes = product.options.find((o) => o.name === "Size")?.values ?? [];
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null);
  const [color, setColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const saved = isWishlisted(product.handle);
  const soldOut = product.stock === "out-of-stock";
  const max = Math.max(1, Math.min(10, product.stockCount));

  // Record the view for the "recently viewed" rail.
  useEffect(() => {
    trackView(product);
  }, [product, trackView]);

  const submit = () => {
    if (soldOut) {
      notify("This piece is sold out", "error");
      return;
    }
    if (!size) {
      setError("Please select a size before adding to your bag.");
      notify("Select a size first", "error");
      return;
    }
    setError(null);
    addToCart(product, { size, color, quantity });
  };

  return (
    <div className="lg:sticky lg:top-28">
      <p className="eyebrow text-ink-soft">{product.category}</p>
      <h1 className="mt-3 text-3xl md:text-4xl">{product.name}</h1>
      <p className="mt-2 text-sm text-ink-soft">{product.subtitle}</p>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <p className="text-2xl tabular-nums">
          {product.compareAtPrice && (
            <span className="mr-3 text-ink-soft line-through">
              {formatPrice(product.compareAtPrice.amount)}
            </span>
          )}
          {formatPrice(product.price.amount)}
        </p>
        <a href="#reviews" className="flex items-center gap-2 text-xs text-ink-soft hover:text-ink">
          <Stars rating={product.rating} size={13} />
          {product.rating.toFixed(1)} · {product.reviewCount} reviews
        </a>
      </div>

      <p
        className={`mt-4 text-xs ${
          product.stock === "low-stock" ? "text-clay" : "text-ink-soft"
        } ${soldOut ? "line-through" : ""}`}
      >
        {stockLabel[product.stock]}
      </p>

      <fieldset className="mt-8">
        <legend className="eyebrow mb-3 text-ink-soft">
          Colour — <span className="text-ink">{color}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              aria-pressed={color === c.name}
              title={c.name}
              className={`grid size-9 place-items-center rounded-full ring-1 transition-all ${
                color === c.name
                  ? "ring-2 ring-ink ring-offset-2 ring-offset-bone"
                  : "ring-ink/15 hover:ring-ink/40"
              }`}
              style={{ backgroundColor: c.hex }}
            >
              {color === c.name && (
                <Check
                  className={`size-3.5 ${LIGHT_SWATCHES.includes(c.name) ? "text-ink" : "text-bone"}`}
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">{c.name}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {sizes.length > 0 && (
        <fieldset className="mt-7">
          <legend className="eyebrow mb-3 flex w-full items-center justify-between text-ink-soft">
            <span>Size</span>
            <a href="/faq#sizing" className="normal-case tracking-normal underline">
              Size guide
            </a>
          </legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSize(s);
                  setError(null);
                }}
                aria-pressed={size === s}
                className={`min-w-14 border px-4 py-3 text-xs tracking-wide transition-all ${
                  size === s ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {error && (
            <p role="alert" className="mt-3 text-xs text-clay">
              {error}
            </p>
          )}
        </fieldset>
      )}

      <div className="mt-7">
        <span className="eyebrow mb-3 block text-ink-soft">Quantity</span>
        <div className="inline-flex items-center border border-ink/15">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-3 transition-colors hover:bg-ink hover:text-bone"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="min-w-10 text-center text-sm tabular-nums" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= max}
            onClick={() => setQuantity((q) => Math.min(max, q + 1))}
            className="px-4 py-3 transition-colors hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <motion.button
          type="button"
          onClick={submit}
          disabled={soldOut}
          whileTap={{ scale: 0.985 }}
          className="flex-1 bg-ink py-4 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:bg-ink/30"
        >
          {soldOut ? "Sold out" : "Add to bag"}
        </motion.button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.handle)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="grid w-14 place-items-center border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
        >
          <Heart className="size-4" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <PurchaseReassurance />
    </div>
  );
}
