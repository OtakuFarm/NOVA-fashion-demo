"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";

import { Stars } from "@/components/ui/stars";
import { SectionHeading } from "@/components/ui/button";
import type { Review } from "@/lib/types";

/** Customer review carousel with a large editorial pull-quote. */
export function Testimonials({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const active = reviews[index];

  return (
    <section className="bg-ink py-20 text-bone md:py-28">
      <div className="container-nova">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What people actually say"
          className="mb-14 [&_a]:text-bone [&_p]:text-bone/60"
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <motion.figure
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <Quote className="mb-8 size-8 text-accent" aria-hidden="true" />
            <blockquote>
              <p className="text-2xl leading-[1.25] tracking-tight md:text-4xl">
                “{active.body}”
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-bone/10 text-sm tracking-[0.1em]"
              >
                {active.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm">{active.author}</p>
                <p className="text-xs text-bone/50">{active.location}</p>
                <Stars rating={active.rating} size={12} className="mt-1.5" />
              </div>
            </figcaption>
          </motion.figure>

          <div className="flex flex-col justify-end">
            <ul className="divide-y divide-bone/15 border-y border-bone/15">
              {reviews.map((review, i) => (
                <li key={review.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-bone/5"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm">{review.title}</span>
                      <span className="block text-xs text-bone/50">{review.author}</span>
                    </span>
                    <Stars rating={review.rating} size={12} className="shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-bone/40">
              4.8 average from 2,140 verified reviews — all fictional demo content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
