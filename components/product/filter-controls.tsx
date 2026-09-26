"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { getAllCategories, getAllColors, getAllSizes, priceBounds } from "@/lib/commerce";
import type { ProductFilters, SortKey } from "@/lib/types";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export const toggleValue = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

/** The filter controls, shared by the desktop rail and the mobile sheet. */
export function FilterBody({
  filters,
  onChange,
}: {
  filters: ProductFilters;
  onChange: (patch: Partial<ProductFilters>) => void;
}) {
  return (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <ul className="space-y-2.5">
          {getAllCategories().map((c) => (
            <li key={c}>
              <Checkbox
                checked={filters.categories.includes(c)}
                onChange={() => onChange({ categories: toggleValue(filters.categories, c) })}
                label={c}
              />
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="Colour">
        <ul className="flex flex-wrap gap-2.5">
          {getAllColors().map((c) => {
            const checked = filters.colors.includes(c.name);
            return (
              <li key={c.name}>
                <button
                  type="button"
                  aria-pressed={checked}
                  onClick={() => onChange({ colors: toggleValue(filters.colors, c.name) })}
                  title={c.name}
                  className={`grid size-8 place-items-center rounded-full ring-1 transition-all ${
                    checked ? "ring-2 ring-ink ring-offset-2 ring-offset-bone" : "ring-ink/15"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {checked && (
                    <Check
                      className={`size-3.5 ${
                        c.name === "Signal" || c.name === "Bone" ? "text-ink" : "text-bone"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">{c.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title="Size">
        <ul className="flex flex-wrap gap-2">
          {getAllSizes().map((s) => {
            const checked = filters.sizes.includes(s);
            return (
              <li key={s}>
                <button
                  type="button"
                  aria-pressed={checked}
                  onClick={() => onChange({ sizes: toggleValue(filters.sizes, s) })}
                  className={`min-w-11 border px-3 py-2 text-xs transition-colors ${
                    checked ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      <FilterGroup title={`Price — $${filters.minPrice} to $${filters.maxPrice}`}>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs text-ink-soft">Minimum</span>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={5}
              value={filters.minPrice}
              onChange={(e) =>
                onChange({ minPrice: Math.min(Number(e.target.value), filters.maxPrice - 5) })
              }
              className="w-full accent-ink"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-ink-soft">Maximum</span>
            <input
              type="range"
              min={priceBounds.min}
              max={priceBounds.max}
              step={5}
              value={filters.maxPrice}
              onChange={(e) =>
                onChange({ maxPrice: Math.max(Number(e.target.value), filters.minPrice + 5) })
              }
              className="w-full accent-ink"
            />
          </label>
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox
          checked={filters.inStockOnly}
          onChange={() => onChange({ inStockOnly: !filters.inStockOnly })}
          label="In stock only"
        />
      </FilterGroup>
    </div>
  );
}

export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="eyebrow mb-3.5 border-b border-ink/10 pb-2.5 text-ink-soft">{title}</h3>
      {children}
    </section>
  );
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`grid size-4 shrink-0 place-items-center border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
          checked ? "border-ink bg-ink text-bone" : "border-ink/30"
        }`}
      >
        {checked && <Check className="size-3" />}
      </span>
      <span className="text-ink-soft">{label}</span>
    </label>
  );
}
