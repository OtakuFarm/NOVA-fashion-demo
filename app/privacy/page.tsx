import type { Metadata } from "next";

import { PolicyDocument } from "@/components/content/policy-document";
import { PageHero } from "@/components/layout/page-hero";
import { PRIVACY } from "@/content/privacy";
import { buildMetadata } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How NOVA collects, uses and protects your personal data — including exactly what this demo site stores locally in your browser and why.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="What we collect, why we collect it, and the control you have over it. Written to be read, not to be survived."
      />
      <section className="container-nova pb-20 md:pb-28">
        <PolicyDocument updated={PRIVACY.updated} intro={PRIVACY.intro} sections={PRIVACY.sections} />
      </section>
    </>
  );
}
