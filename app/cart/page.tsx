import type { Metadata } from "next";

import { CartView } from "@/components/cart-view";
import { PageHero } from "@/components/layout/page-hero";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Your Bag",
  description:
    "Review the items in your NOVA bag, adjust quantities and continue to checkout. Free shipping on orders over $150.",
  path: "/cart",
});

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Your bag"
        description="Review your pieces before checkout. Free shipping applies over $150, and returns are free for 30 days."
      />
      <section className="container-nova pb-20 md:pb-28">
        <CartView />
      </section>
    </>
  );
}
