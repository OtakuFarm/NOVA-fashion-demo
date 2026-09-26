"use client";

import { ShieldCheck, Truck } from "lucide-react";

import { useStore } from "@/components/store";
import { useToast } from "@/components/toast";
import { formatPrice } from "@/lib/commerce";

/** Sticky order summary panel shown beside the cart line items. */
export function OrderSummary() {
  const { subtotal, shipping, total } = useStore();
  const notify = useToast();

  return (
    <aside aria-label="Order summary" className="lg:sticky lg:top-28 lg:self-start">
      <div className="border border-ink/10 p-6">
        <h2 className="text-lg">Order summary</h2>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Shipping</dt>
            <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Estimated tax</dt>
            <dd className="text-ink-soft">Calculated at checkout</dd>
          </div>
          <div className="flex justify-between border-t border-ink/10 pt-4 text-base">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatPrice(total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={() => notify("Checkout is disabled — this is a portfolio demo", "info")}
          className="mt-6 w-full bg-ink py-4 text-xs uppercase tracking-[0.2em] text-bone transition-colors hover:bg-ink-soft"
        >
          Proceed to checkout
        </button>
        <p className="mt-3 text-center text-[0.7rem] text-ink-soft">
          Demo storefront — no payment is processed and no data leaves your browser.
        </p>

        <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-5 text-xs text-ink-soft">
          <li className="flex items-center gap-2.5">
            <Truck className="size-3.5" aria-hidden="true" /> Free 30-day returns and exchanges
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck className="size-3.5" aria-hidden="true" /> Two-year complimentary repairs
          </li>
          <li className="flex items-center gap-2.5">
            <Truck className="size-3.5" aria-hidden="true" /> Orders dispatched within 24 hours
          </li>
        </ul>
      </div>
    </aside>
  );
}
