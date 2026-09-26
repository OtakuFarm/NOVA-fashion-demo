import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

/** Responsive product grid. `columns` adapts density per breakpoint. */
export function ProductGrid({
  products,
  columns = 3,
  priorityCount = 0,
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
}) {
  const cols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <ul className={`grid gap-x-5 gap-y-12 ${cols}`}>
      {products.map((product, i) => (
        <li key={product.id}>
          <ProductCard product={product} index={i} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}

/** Empty state shown when filters or search return nothing. */
export function EmptyState({
  title = "Nothing matches those filters",
  body = "Try widening your price range or clearing a filter or two.",
  action,
}: {
  title?: string;
  body?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center gap-4 border border-dashed border-ink/20 px-6 py-20 text-center">
      <h3 className="text-xl">{title}</h3>
      <p className="max-w-sm text-sm text-ink-soft">{body}</p>
      {action && (
        <a
          href={action.href}
          className="link-underline pb-1 text-xs uppercase tracking-[0.2em]"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
