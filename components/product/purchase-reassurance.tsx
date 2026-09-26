"use client";

import { RotateCcw, ShieldCheck, Truck } from "lucide-react";

/** Reassurance list shown under the add-to-bag button. */
export function PurchaseReassurance() {
  const items = [
    { Icon: Truck, text: "Free shipping over $150 · dispatched within 24 hours" },
    { Icon: RotateCcw, text: "Free 30-day returns and exchanges" },
    { Icon: ShieldCheck, text: "Two-year complimentary repair on seams and hardware" },
  ];
  return (
    <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-xs text-ink-soft">
      {items.map(({ Icon, text }) => (
        <li key={text} className="flex items-center gap-3">
          <Icon className="size-4 shrink-0" aria-hidden="true" />
          {text}
        </li>
      ))}
    </ul>
  );
}
