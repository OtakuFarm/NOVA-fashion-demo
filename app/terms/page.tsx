import type { Metadata } from "next";

import { PolicyDocument } from "@/components/content/policy-document";
import { PageHero } from "@/components/layout/page-hero";
import { TERMS } from "@/content/terms";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that apply when you browse the NOVA site or place an order — pricing, delivery, returns, acceptable use and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service"
        description="The agreement that applies when you browse this site or place an order. Plain language, no surprises buried at the bottom."
      />
      <section className="container-nova pb-20 md:pb-28">
        <PolicyDocument updated={TERMS.updated} intro={TERMS.intro} sections={TERMS.sections} />
      </section>
    </>
  );
}
