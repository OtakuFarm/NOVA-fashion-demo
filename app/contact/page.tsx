import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact-details";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to the NOVA studio about sizing, orders, returns or repairs. We reply to every message within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the studio"
        description="Sizing questions, order help, repairs or press — a real person reads every message, and we reply within one business day."
      />

      <section className="container-nova pb-20 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-20">
          <Reveal>
            <h2 className="mb-8 text-2xl">Send us a message</h2>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <h2 className="mb-8 text-2xl">Studio details</h2>
              <ContactDetails />

              <div className="mt-10 border border-ink/10 p-6">
                <h3 className="text-sm">Faster answers</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  Most questions are already covered in the FAQ — sizing charts, shipping times and
                  our repair policy all live there.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <ButtonLink href="/faq" size="sm" variant="outline">
                    Read the FAQ
                  </ButtonLink>
                  <ButtonLink href="/shipping-returns" size="sm" variant="outline">
                    Shipping &amp; returns
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
