import type { Metadata } from "next";

import { PolicyDocument } from "@/components/content/policy-document";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { SHIPPING_RETURNS } from "@/content/shipping-returns";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Shipping & Returns",
  description:
    "NOVA shipping times, costs and destinations, plus our free 30-day return and exchange policy and two-year repair service.",
  path: "/shipping-returns",
});

export default function ShippingReturnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer Care"
        title="Shipping & returns"
        description="Free returns on everything, free shipping over $150, and a two-year repair service on every piece we make."
      />

      <section className="container-nova pb-20 md:pb-28">
        <PolicyDocument
          updated={SHIPPING_RETURNS.updated}
          intro={SHIPPING_RETURNS.intro}
          sections={SHIPPING_RETURNS.sections}
        />

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-between gap-6 border border-ink/10 p-6">
          <div>
            <h2 className="text-lg">Need something resolved now?</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              The studio replies to every message within one business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/faq" variant="outline">
              Read the FAQ
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
