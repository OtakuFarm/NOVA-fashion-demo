"use client";

import { motion } from "framer-motion";

import { ButtonLink } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { Reveal } from "@/components/ui/reveal";

const PRINCIPLES = [
  {
    index: "01",
    title: "Small runs, no reruns",
    body: "Every drop is produced once. When a run sells through it is retired, not restocked — scarcity is a consequence of making properly, not a marketing tactic.",
  },
  {
    index: "02",
    title: "Fabric before logo",
    body: "We spend more on the mill than the marketing. 520gsm loopback, 13.5oz Japanese selvedge, DWR ripstop. If the handfeel is wrong, the piece does not ship.",
  },
  {
    index: "03",
    title: "Built to be restyled",
    body: "Each piece is designed to work with at least four others in the range. The system matters more than any single item, which is why we release it as a system.",
  },
  {
    index: "04",
    title: "Repair, not replace",
    body: "Complimentary repairs on seams, cuffs and hardware for the first two years. Garments should outlive trends, and that takes aftercare.",
  },
];

/** Brand story: editorial image pair plus numbered principles. */
export function BrandStory() {
  return (
    <section id="story" className="container-nova py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <MediaImage
            src="/media/hero-editorial.svg"
            alt="NOVA studio — abstract editorial artwork"
            width={1600}
            height={2000}
            aspect="aspect-[4/5]"
            imgClassName="object-cover"
          />
        </Reveal>

        <div>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-3 text-ink-soft">Our Story</p>
            <h2 className="text-3xl md:text-5xl">
              We started with one hoodie that would not wash out.
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft md:text-base">
              <p>
                NOVA began in 2019 in a Brooklyn studio with a single complaint: everything looked
                expensive in a photograph and cheap in the hand. So we started with fabric. One
                mill, one weight, brushed twice, and a boxy cut that holds after fifty washes.
              </p>
              <p>
                Seven years later the approach has not changed. We release four times a year, in
                small runs, and we make fewer things than we would like to sell. Everything is
                designed as part of one system — so a tee, a fleece and a shell still look
                deliberate together two seasons apart.
              </p>
              <p>
                That is the whole brand. Move different, and take the thing you bought to its
                actual limit.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/about" variant="outline">
                Read our story
              </ButtonLink>
              <ButtonLink href="/collections/essentials">Shop the core</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      <ul className="mt-20 grid gap-x-8 gap-y-10 border-t border-ink/10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((p, i) => (
          <motion.li
            key={p.index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4 text-ink-soft">{p.index}</p>
            <h3 className="text-lg">{p.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
