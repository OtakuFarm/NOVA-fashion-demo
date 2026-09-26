import { collections, products, socialTiles, testimonials } from "./catalog";
import type {
  CartLine,
  Collection,
  Money,
  Product,
  ProductColor,
  ProductFilters,
  ProductImage,
  ProductOption,
  Review,
  SortKey,
  StockStatus,
} from "./types";

export type {
  CartLine,
  Collection,
  Money,
  Product,
  ProductColor,
  ProductFilters,
  ProductImage,
  ProductOption,
  Review,
  SortKey,
  StockStatus,
};
export { collections, products, socialTiles, testimonials };

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formats a numeric amount as USD, e.g. 68 -> "$68". */
export const formatPrice = (amount: number): string => currency.format(amount);

export const productPath = (handle: string): string => `/products/${handle}`;
export const collectionPath = (handle: string): string => `/collections/${handle}`;

export const getProductByHandle = (handle: string): Product | undefined =>
  products.find((p) => handle === p.handle);

export const getCollectionByHandle = (handle: string): Collection | undefined =>
  collections.find((c) => handle === c.handle);

export const getProductsInCollection = (handle: string): Product[] =>
  products.filter((p) => p.collectionHandles.includes(handle));

export const getAllCategories = (): string[] =>
  Array.from(new Set(products.map((p) => p.category))).sort();

export const getAllColors = (): { name: string; hex: string }[] => {
  const map = new Map<string, string>();
  for (const p of products) for (const c of p.colors) map.set(c.name, c.hex);
  return Array.from(map, ([name, hex]) => ({ name, hex })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
};

export const getAllSizes = (): string[] => {
  const set = new Set<string>();
  for (const p of products)
    for (const opt of p.options) if (opt.name === "Size") opt.values.forEach((v) => set.add(v));
  const order = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];
  return Array.from(set).sort((a, b) => {
    const ai = order.indexOf(a);
    const bi = order.indexOf(b);
    if (ai === -1 || bi === -1) return Number(a) - Number(b);
    return ai - bi;
  });
};

export const priceBounds = {
  min: Math.min(...products.map((p) => p.price.amount)),
  max: Math.max(...products.map((p) => p.price.amount)),
};

export const newArrivals = (): Product[] =>
  [...products].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const bestSellers = (): Product[] => products.filter((p) => p.bestSeller);

export const featuredProducts = (): Product[] => products.filter((p) => p.featured);

/** Finds complementary products: same category first, then shared collections. */
export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.handle !== product.handle)
    .map((p) => {
      let score = 0;
      if (p.category === product.category) score += 3;
      if (p.collectionHandles.some((h) => product.collectionHandles.includes(h))) score += 2;
      if (p.colors.some((c) => product.colors.some((pc) => pc.name === c.name))) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);

/** Simple ranked full-text search across name, subtitle, category and tags. */
export const searchProducts = (query: string, limit?: number): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return limit ? products.slice(0, limit) : products;
  const terms = q.split(/\s+/);
  const scored = products
    .map((p) => {
      const name = p.name.toLowerCase();
      const haystack = `${p.name} ${p.subtitle} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (!haystack.includes(t)) return { p, score: -1 };
        if (name.startsWith(t)) score += 5;
        else if (name.includes(t)) score += 3;
        else score += 1;
      }
      return { p, score: score + p.rating };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return (limit ? scored.slice(0, limit) : scored).map((s) => s.p);
};

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  featured: (a, b) =>
    Number(b.featured ?? false) - Number(a.featured ?? false) || b.reviewCount - a.reviewCount,
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  "price-asc": (a, b) => a.price.amount - b.price.amount,
  "price-desc": (a, b) => b.price.amount - a.price.amount,
  rating: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
};

export const defaultFilters = (): ProductFilters => ({
  categories: [],
  colors: [],
  sizes: [],
  minPrice: priceBounds.min,
  maxPrice: priceBounds.max,
  inStockOnly: false,
  sort: "featured",
  query: "",
});

/** Applies every active filter + sort to a product list. */
export const applyFilters = (list: Product[], f: ProductFilters): Product[] => {
  const base = f.query.trim() ? searchProducts(f.query) : list;
  return base
    .filter((p) => (f.categories.length ? f.categories.includes(p.category) : true))
    .filter((p) => (f.colors.length ? p.colors.some((c) => f.colors.includes(c.name)) : true))
    .filter((p) =>
      f.sizes.length
        ? p.options.some((o) => o.name === "Size" && o.values.some((v) => f.sizes.includes(v)))
        : true,
    )
    .filter((p) => (f.inStockOnly ? p.stock !== "out-of-stock" : true))
    .filter((p) => p.price.amount >= f.minPrice && p.price.amount <= f.maxPrice)
    .sort(sorters[f.sort]);
};

export const countActiveFilters = (f: ProductFilters): number =>
  f.categories.length +
  f.colors.length +
  f.sizes.length +
  (f.inStockOnly ? 1 : 0) +
  (f.minPrice > priceBounds.min || f.maxPrice < priceBounds.max ? 1 : 0);

export const stockLabel: Record<Product["stock"], string> = {
  "in-stock": "In stock — ships within 24h",
  "low-stock": "Low stock — limited units left",
  "out-of-stock": "Sold out — restocking soon",
};

/**
 * Builds the rating histogram for the breakdown bars.
 *
 * `product.rating` / `product.reviewCount` are aggregate figures (e.g. 4.9 from
 * 302 reviews) while `product.reviews` only holds the handful of sample reviews
 * shown in the list. Counting those samples produced a "100% five star" chart
 * that contradicted the 4.9 headline, so the distribution is instead derived
 * from the aggregate instead, via a tilt solved to match the average exactly.
 *
 * Deterministic (no randomness) so SSR and client always agree.
 */
export const ratingBreakdown = ({ rating, reviewCount }: Product) => {
  const STARS = [5, 4, 3, 2, 1];
  const total = Math.max(reviewCount, 1);

  // Realistic base shape (a typical premium-brand skew), then tilted by a
  // single scalar `lambda` raised to the star count. Tilting keeps every weight
  // positive, so the mean sweeps smoothly across the full 1-5 range and can
  // always be solved for any rating — unlike a gaussian, which underflows and
  // collapses to a flat line for high averages.
  const BASE = [0.7, 0.2, 0.06, 0.025, 0.015];
  const tilted = (lambda: number) => BASE.map((b, i) => b * lambda ** STARS[i]);
  const meanAt = (lambda: number) => {
    const w = tilted(lambda);
    const sum = w.reduce((a, b) => a + b, 0);
    return STARS.reduce((a, s, i) => a + (s * w[i]) / sum, 0);
  };

  // Bisect for the tilt whose weighted mean equals the product's average.
  const target = Math.min(Math.max(rating, 1), 5);
  let lo = 0.001;
  let hi = 1000;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (meanAt(mid) < target) lo = mid;
    else hi = mid;
  }
  const weights = tilted((lo + hi) / 2);
  const weightSum = weights.reduce((a, b) => a + b, 0);

  // Largest-remainder rounding keeps the counts summing to exactly `total`.
  const exact = weights.map((w) => (w / weightSum) * total);
  const counts = exact.map((v) => Math.floor(v));
  let remainder = total - counts.reduce((a, b) => a + b, 0);
  const order = exact
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; remainder > 0; k = (k + 1) % order.length, remainder--) {
    counts[order[k].i] += 1;
  }

  // Percentages via the same largest-remainder pass, so they total exactly 100
  // and can't drift out of sync with the counts they describe.
  const pctExact = counts.map((c) => (c / total) * 100);
  const percentages = pctExact.map((v) => Math.floor(v));
  let pctRemainder = 100 - percentages.reduce((a, b) => a + b, 0);
  const pctOrder = pctExact
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; pctRemainder > 0; k = (k + 1) % pctOrder.length, pctRemainder--) {
    percentages[pctOrder[k].i] += 1;
  }

  return STARS.map((stars, i) => ({
    stars,
    count: counts[i],
    percentage: percentages[i],
  }));
};
