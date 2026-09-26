"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FilterBody, SORT_OPTIONS } from "@/components/product/filter-controls";
import { countActiveFilters, defaultFilters } from "@/lib/commerce";
import type { ProductFilters, SortKey } from "@/lib/types";

/** Desktop filter rail + mobile filter sheet, driven by the page's filter state. */
export function ProductFiltersPanel({
  filters,
  onChange,
  resultCount,
}: {
  filters: ProductFilters;
  onChange: (next: ProductFilters) => void;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);
  const active = countActiveFilters(filters);
  const update = (patch: Partial<ProductFilters>) => onChange({ ...filters, ...patch });

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <h2 className="eyebrow mb-6 flex items-center gap-2 text-ink-soft">
            <SlidersHorizontal className="size-3.5" aria-hidden="true" /> Filters
            {active > 0 && <span className="text-ink">({active})</span>}
          </h2>
          <FilterBody filters={filters} onChange={update} />
          {active > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="mt-8 w-full"
              onClick={() => onChange(defaultFilters())}
            >
              Reset filters
            </Button>
          )}
        </div>
      </aside>

      <div className="lg:hidden">
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <SlidersHorizontal className="size-3.5" aria-hidden="true" /> Filters
          {active > 0 && <span className="ml-1 text-ink-soft">({active})</span>}
        </Button>

        <AnimatePresence>
          {open && (
            <>
              <motion.button
                type="button"
                aria-label="Close filters"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-90 cursor-default bg-ink/40"
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Product filters"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-0 bottom-0 z-95 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-bone p-6"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close filters"
                    className="rounded-full p-1.5 transition-colors hover:bg-ink/5"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <FilterBody filters={filters} onChange={update} />
                <div className="sticky bottom-0 mt-6 flex gap-3 bg-bone pt-4">
                  {active > 0 && (
                    <Button variant="outline" onClick={() => onChange(defaultFilters())}>
                      Reset
                    </Button>
                  )}
                  <Button className="flex-1" onClick={() => setOpen(false)}>
                    Show {resultCount} {resultCount === 1 ? "result" : "results"}
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/** Sort dropdown shown next to the result count. */
export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="hidden text-ink-soft sm:inline">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="border border-ink/20 bg-transparent px-3 py-2 text-xs tracking-wide focus:border-ink focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
