"use client";

import { useMemo, useState } from "react";

import { ProductFiltersPanel, SortSelect } from "@/components/product/product-filters";
import { EmptyState, ProductGrid } from "@/components/product/product-grid";
import { applyFilters, defaultFilters, type Product, type ProductFilters } from "@/lib/commerce";

/**
 * Client-side listing shell: toolbar (count + sort), filter rail and results.
 * Shared by the Shop page and every Collection page.
 */
export function ProductListing({
  products,
  emptyAction,
  columns = 3,
}: {
  products: Product[];
  emptyAction?: { label: string; href: string };
  columns?: 2 | 3 | 4;
}) {
  const [filters, setFilters] = useState<ProductFilters>(() => defaultFilters());

  const results = useMemo(() => applyFilters(products, filters), [products, filters]);

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
      <div className="mb-8 lg:mb-0">
        <ProductFiltersPanel
          filters={filters}
          onChange={setFilters}
          resultCount={results.length}
        />
      </div>

      <div>
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-ink/10 pb-4">
          <p className="text-xs text-ink-soft" aria-live="polite">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
          <SortSelect value={filters.sort} onChange={(sort) => setFilters((f) => ({ ...f, sort }))} />
        </div>

        {results.length === 0 ? (
          <EmptyState
            action={emptyAction}
            body="Try widening your price range, or clear a filter or two to see more of the range."
          />
        ) : (
          <ProductGrid products={results} columns={columns} priorityCount={3} />
        )}
      </div>
    </div>
  );
}
