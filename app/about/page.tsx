import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { Principles, Timeline, type Principle, type TimelineEntry } from "@/components/content/grids";
import { bestSellers } from "@/lib/commerce";
import { buildMetadata, site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "NOVA is a fictional premium streetwear label founded in 2019 around one idea: fabric before logo. Read our story, our principles and how we make.",
  path: "/about",
  image: "/media/about-1.svg",
});

const TIMELINE: TimelineEntry[] = [
  { year: "2019", title: "One hoodie, one mill", body: "NOVA starts in a Brooklyn studio with a single heavyweight fleece pattern and a complaint about the industry." },
  { year: "2021", title: "The core is born", body: "Five permanent pieces launch as the Essentials system — designed to be restyled together, not bought once." },
  { year: "2023", title: "Technical division", body: "The first bonded shells and DWR ripstop land, taking the range from lifestyle into four-season outerwear." },
  { year: "2026", title: "AW26, drop four", body: "Eight new pieces produced in single runs. Sold through, retired, never restocked." },
];

const PRINCIPLES: Principle[] = [
  { title: "Make less, make it properly", body: "Four drops a year, small runs, no artificial scarcity. If a run sells through, we make a new design rather than rerun the old one." },
  { title: "Pay the mill first", body: "Our production budget is weighted toward fabric and construction. We would rather cut a run than substitute a cheaper yarn." },
  { title: "Repair before replace", body: "Complimentary repairs on seams, cuffs and hardware for two years. A garment should outlive the season it was bought in." },
  { title: "Honest scarcity", body: "Stock counts on this site are real run sizes. When something is gone, it is genuinely gone." },
];
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Fabric before logo."
        description="NOVA is a fictional independent streetwear label, founded in 2019 and built around a single stubborn idea — that a garment should feel more expensive in the hand than it does in the photograph."
        image={{ src: "/media/about-1.svg", alt: "NOVA studio — abstract artwork", width: 1400, height: 1750 }}
      />

      <section className="container-nova py-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5 text-ink-soft">A note from the studio</p>
          <div className="space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
            <p>
              We started NOVA because we were tired of clothes that photograph beautifully and
              collapse after three washes. Everything cheap looks like luxury in a styled shot. The
              difference only shows up in month four, when the collar goes and the fleece pills.
            </p>
            <p>
              So we reversed the order of operations. We picked a mill first — a family-run mill in
              northern Portugal that had been spinning the same long-staple cotton for three
              generations. Then we designed around what that yarn could do at 520gsm. Only then did
              we decide what the garment should look like.
            </p>
            <p>
              That constraint is still the brand. Every piece begins with a fabric question, not a
              trend report. It is a slower way to build a company, and it is the only way we have
              found to make clothes that people still wear in year three.
            </p>
            <p className="text-ink">Move different — and take it to its actual limit.</p>
          </div>
          <p className="mt-8 text-sm text-ink-soft">— The NOVA studio, {site.address}</p>
        </Reveal>
      </section>

      <section className="container-nova pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <MediaImage
              src="/media/about-2.svg"
              alt="NOVA studio — abstract artwork"
              width={1400}
              height={1750}
              aspect="aspect-[4/5]"
              imgClassName="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <MediaImage
              src="/media/hero-secondary.svg"
              alt="NOVA lookbook — abstract artwork"
              width={1600}
              height={2000}
              aspect="aspect-[4/5]"
              imgClassName="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <div className="container-nova">
          <Timeline entries={TIMELINE} />
        </div>
      </section>

      <section id="sustainability" className="container-nova scroll-mt-28 py-20 md:py-28">
        <Principles
          eyebrow="What we believe"
          title="Four principles we do not bend"
          description="These are not values on a wall. They are the reasons we say no to most ideas."
          items={PRINCIPLES}
        />
      </section>

      <section className="border-t border-ink/10 bg-sand py-20">
        <div className="container-nova">
          <SectionHeading
            eyebrow="Start here"
            title="The pieces people keep"
            action={{ label: "Shop all", href: "/shop" }}
            className="mb-12"
          />
          <ProductGrid products={bestSellers().slice(0, 4)} columns={4} />
          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="/collections/essentials" size="lg">
              Shop Essentials
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Talk to the studio
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

