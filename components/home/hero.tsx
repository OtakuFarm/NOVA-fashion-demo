"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

import { ButtonLink } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";

/** Full-bleed hero with parallax artwork and the primary CTA. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[88svh] min-h-[540px] overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <MediaImage
          src="/media/hero-home.svg"
          alt="NOVA AW26 campaign — abstract editorial artwork"
          width={1920}
          height={1280}
          aspect="h-full"
          priority
          className="h-full w-full"
          imgClassName="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/45" aria-hidden="true" />

      <motion.div
        style={{ opacity }}
        className="container-nova relative flex h-full flex-col justify-end pb-16 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-6 text-bone/70"
        >
          Autumn / Winter 2026 — Drop 04
        </motion.p>

        <h1 className="max-w-5xl text-[clamp(3.2rem,11vw,10rem)] leading-[0.85] text-bone">
          {["Move", "Different."].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <ButtonLink href="/collections/new-arrivals" variant="accent" size="lg">
            Shop New Arrivals
          </ButtonLink>
          <ButtonLink
            href="/shop"
            size="lg"
            className="border-bone/40 text-bone hover:border-bone"
          >
            Explore the full range
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.a
        href="#featured"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-bone/60 transition-colors hover:text-bone md:flex"
        aria-label="Scroll to featured collections"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
