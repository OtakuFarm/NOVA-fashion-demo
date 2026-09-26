"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Stars } from "@/components/ui/stars";
import { ratingBreakdown, type Product, type SortKey } from "@/lib/commerce";

type ReviewSort = "recent" | "highest" | "lowest";

/** Rating summary, distribution bars and the review list. */
export function ReviewsSection({ product }: { product: Product }) {
  const [sort, setSort] = useState<ReviewSort>("recent");
  const breakdown = ratingBreakdown(product);

  const sorted = [...product.reviews].sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating;
    if (sort === "lowest") return a.rating - b.rating;
    return b.date.localeCompare(a.date);
  });

  return (
    <section id="reviews" className="scroll-mt-28 border-t border-ink/10 pt-16">
      <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Summary */}
        <div>
          <h2 className="text-3xl">Reviews</h2>
          <p className="mt-6 text-5xl tabular-nums">{product.rating.toFixed(1)}</p>
          <Stars rating={product.rating} size={16} className="mt-3" />
          <p className="mt-2 text-xs text-ink-soft">Based on {product.reviewCount} reviews</p>

          <ul className="mt-8 space-y-2.5">
            {breakdown.map((row) => (
              <li key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-8 shrink-0 text-ink-soft">{row.stars} ★</span>
                <span className="h-1.5 flex-1 bg-ink/10">
                  <motion.span
                    className="block h-full bg-ink"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right tabular-nums text-ink-soft">
                  {row.percentage}%
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 border border-ink/10 p-4 text-xs leading-relaxed text-ink-soft">
            Reviews shown are fictional demo content written for this portfolio project.
          </p>
        </div>

        {/* List */}
        <div>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
            <p className="text-xs text-ink-soft">Showing {sorted.length} of {product.reviewCount}</p>
            <label className="flex items-center gap-2 text-xs">
              <span className="text-ink-soft">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as ReviewSort)}
                className="border border-ink/20 bg-transparent px-3 py-1.5 focus:border-ink focus:outline-none"
              >
                <option value="recent">Most recent</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
              </select>
            </label>
          </div>

          <ul className="divide-y divide-ink/10">
            {sorted.map((review, i) => (
              <motion.li
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
                className="py-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-full bg-sand text-[0.65rem] tracking-[0.1em]"
                    >
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm">{review.author}</p>
                      <p className="text-xs text-ink-soft">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {review.verified && (
                      <span className="flex items-center gap-1.5 text-[0.65rem] text-ink-soft">
                        <CheckCircle2 className="size-3.5" aria-hidden="true" /> Verified
                      </span>
                    )}
                    <time dateTime={review.date} className="text-xs text-ink-soft">
                      {review.date}
                    </time>
                  </div>
                </div>
                <Stars rating={review.rating} size={12} className="mt-4" />
                <h3 className="mt-2.5 text-base">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{review.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export type { SortKey };
