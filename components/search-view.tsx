"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EmptyState, ProductGrid } from "@/components/product/product-grid";
import { SORT_OPTIONS } from "@/components/product/filter-controls";
import { applyFilters, defaultFilters, type Product, type SortKey } from "@/lib/commerce";

const SUGGESTIONS = ["Hoodie", "Cargo pants", "Denim", "Oversized tee", "Bag", "Beanie", "Outerwear"];

/** Search results page: query input, sort and a ranked product grid. */
export function SearchView({ products }: { products: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [sort, setSort] = useState<SortKey>("featured");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const filters = { ...defaultFilters(), query, sort };
  const results = applyFilters(products, filters);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.replace(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  };

  return (
    <div>
      <form onSubmit={submit} className="mb-8">
        <div className="flex items-center gap-4 border-b border-ink pb-4">
          <SearchIcon className="size-5 shrink-0 text-ink-soft" aria-hidden="true" />
          <label htmlFor="search-input" className="sr-only">
            Search products
          </label>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent text-xl tracking-tight outline-none placeholder:text-ink/30 md:text-3xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                router.replace("/search");
              }}
              aria-label="Clear search"
              className="shrink-0 text-ink-soft transition-colors hover:text-ink"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </form>

      {query.trim() === "" ? (
        <div>
          <p className="eyebrow mb-4 text-ink-soft">Popular searches</p>
          <ul className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setQuery(s)}
                  className="border border-ink/20 px-4 py-2 text-xs capitalize transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
            <p className="text-xs text-ink-soft" aria-live="polite">
              {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
            </p>
            <label className="flex items-center gap-2 text-xs">
              <span className="hidden text-ink-soft sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-ink/20 bg-transparent px-3 py-2 text-xs focus:border-ink focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <EmptyState
              title={`No results for “${query}”`}
              body="Check the spelling, try a broader term, or browse the full range."
              action={{ label: "Shop all products", href: "/shop" }}
            />
          ) : (
            <ProductGrid products={results} columns={3} priorityCount={3} />
          )}
        </>
      )}
    </div>
  );
}
