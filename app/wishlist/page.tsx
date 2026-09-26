import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { WishlistView } from "@/components/wishlist-view";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Your Wishlist",
  description:
    "Pieces you have saved at NOVA. Keep an eye on your favourite heavyweight fleece, technical outerwear and selvedge denim.",
  path: "/wishlist",
});

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Saved"
        title="Your wishlist"
        description="Everything you have tapped the heart on. Saved on this device — no account needed for this demo."
      />
      <section className="container-nova pb-20 md:pb-28">
        <WishlistView />
      </section>
    </>
  );
}
