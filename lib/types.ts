/**
 * NOVA commerce domain types.
 *
 * These interfaces mirror the shape of a headless-commerce product
 * (e.g. the Shopify Storefront API). Keeping them decoupled from the UI means
 * the mock catalogue in `lib/catalog.ts` can be swapped for a live API client
 * without touching a single component.
 */

export interface Money {
  amount: number;
  currencyCode: "USD";
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductColor {
  name: string;
  /** CSS colour used for the swatch chip. */
  hex: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Product {
  id: string;
  handle: string;
  name: string;
  /** Short editorial subtitle shown under the title. */
  subtitle: string;
  price: Money;
  compareAtPrice?: Money;
  description: string;
  details: string[];
  images: ProductImage[];
  category: string;
  tags: string[];
  options: ProductOption[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  stock: StockStatus;
  stockCount: number;
  collectionHandles: string[];
  createdAt: string;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface Collection {
  handle: string;
  name: string;
  description: string;
  longDescription: string;
  image: ProductImage;
  hero: ProductImage;
  season: string;
}

export interface CartLine {
  id: string;
  productId: string;
  handle: string;
  name: string;
  image: ProductImage;
  price: Money;
  size: string;
  color: string;
  quantity: number;
  maxQuantity: number;
}

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

export interface ProductFilters {
  categories: string[];
  colors: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sort: SortKey;
  query: string;
}
