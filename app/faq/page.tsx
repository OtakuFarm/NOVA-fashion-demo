import type { Metadata } from "next";

import { FaqAccordion, type FaqGroup } from "@/components/faq-accordion";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers on NOVA sizing, shipping, returns, repairs, care and small-run availability — plus how to find your size before you order.",
  path: "/faq",
});

const GROUPS: FaqGroup[] = [
  {
    title: "Orders & shipping",
    items: [
      {
        id: "orders",
        q: "How do I track my order?",
        a: "You will receive a dispatch email within 24 hours of ordering, containing a tracking link. Tracking can take a few hours to activate. If it has not appeared after two business days, check the spam folder or contact the studio with your order number.",
      },
      {
        q: "When will my order arrive?",
        a: "Domestic orders typically arrive in 2–4 business days. International orders take 5–10 business days depending on the destination and customs clearance. Orders over $150 ship free within the contiguous United States.",
      },
      {
        q: "Can I change or cancel an order?",
        a: "Yes, if it has not yet been dispatched. Email us with your order number as soon as possible and we will catch it. Once an order leaves the warehouse it can be returned free of charge instead.",
      },
    ],
  },
  {
    title: "Sizing & fit",
    items: [
      {
        id: "sizing",
        q: "How does NOVA sizing run?",
        a: "Our apparel is cut boxy and relaxed by design. If you want a standard fit, size down. Tops: XS–XXL. Bottoms: 28–38 waist. Footwear is true to UK/EU sizing — if you are between sizes or have wide feet, size up. Every product page lists the exact garment measurements in the Details section.",
      },
      {
        q: "What should I measure myself for?",
        a: "For tops, measure chest flat across under the arms and compare to the garment measurement listed on the product page. For bottoms, measure the waist and the flat front waistband-to-hem length. Our fit team can also recommend a size from a photo of a garment you already own.",
      },
      {
        q: "What if my size sells out?",
        a: "Small runs mean sizes genuinely disappear, and we do not restock retired pieces. Join the newsletter to get restock and drop alerts, or contact the studio — occasionally we have a cancelled return in another size.",
      },
    ],
  },
  {
    title: "Returns & exchanges",
    items: [
      {
        q: "What is your returns policy?",
        a: "You have 30 days from delivery to return anything unworn with tags attached, and returns are always free. Refunds are issued to the original payment method within 5–7 business days of the return arriving at our warehouse.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes. The fastest route is to return the original item and place a new order for the size you want — that guarantees the size is held for you. Reply to your dispatch email and we will prioritise the return.",
      },
      {
        q: "Are sale or final-sale items returnable?",
        a: "Yes. Everything we sell is returnable within 30 days, including items at a reduced price. The only exception is physically damaged or altered goods.",
      },
    ],
  },
  {
    title: "Products & care",
    items: [
      {
        q: "How should I wash NOVA garments?",
        a: "Cold wash inside out, at 30°C or below, with similar colours. Tumble dry low or hang dry — high heat is what causes shrinkage in heavyweight jersey. Do not iron prints or bonded panels directly, and wash technical outerwear less often than you think you need to.",
      },
      {
        q: "Do you offer repairs?",
        a: "Yes — complimentary repairs on seams, cuffs and hardware for two years from delivery. Send us a photo and your order number and we will arrange it. Beyond two years we repair at cost.",
      },
      {
        q: "Why do you restock so little?",
        a: "Each drop is produced in a single run. When it sells through, the design is retired rather than rerun, so what you buy stays collectible and the production waste stays low. It also means a piece will not be restocked on a sale two years later.",
      },
      {
        q: "Where is NOVA made?",
        a: "Different pieces come from different specialist makers — our loopback fleece and jersey are knitted in Portugal, the selvedge denim is woven in Japan, and technical outerwear is produced in Taiwan. Each product page lists the origin for that specific garment.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently asked questions"
        description="Sizing, shipping, returns, repairs and care — everything people ask us most. If your question is not here, the studio is a message away."
      />

      <section className="container-nova pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-20">
          <FaqAccordion groups={GROUPS} />

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-ink/10 p-6">
              <h2 className="text-lg">Still stuck?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                A real person answers every message, usually within a few hours during studio time.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href="/contact">Contact the studio</ButtonLink>
                <ButtonLink href="/shipping-returns" variant="outline">
                  Shipping &amp; returns
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
