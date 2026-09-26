# NOVA — Premium Streetwear Storefront

A fictional, portfolio-grade fashion e-commerce site built to demonstrate premium storefront
UX: editorial art direction, product discovery, working cart and wishlist, and full responsive
behaviour.

> **NOVA is not a real brand.** Every product, price, review, customer, address and company
> detail is invented for this demo. No payment is processed, no order is fulfilled, and no data
> leaves the browser. There is no affiliation with, or endorsement by, any real company.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Data | Local mock catalogue, shaped like a headless-commerce payload |

Only four runtime dependencies. No UI kit, no state library, no external image or font service.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + typescript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run media` | Regenerate the SVG artwork in `public/media` |

## Project structure

```
app/
  layout.tsx              Root shell: metadata, providers, header/footer, skip link
  template.tsx            Page-transition wrapper (remounts per navigation)
  page.tsx                Home
  shop/                   All products + filters
  collections/[handle]/   8 collections, statically generated
  products/[handle]/      14 products, statically generated + JSON-LD
  cart/ wishlist/ search/ Client-state pages
  about/ contact/ faq/
  shipping-returns/ privacy/ terms/
  sitemap.ts robots.ts not-found.tsx

components/
  layout/    Header, desktop nav, mobile drawer, search overlay, footer, page hero
  product/   Card, grid, listing shell, filters, gallery, purchase panel, reviews
  home/      Hero, collections, editorial, bestsellers, story, testimonials, social grid
  content/   Timeline, principles, policy document renderer
  ui/        MediaImage, Reveal, Stars, Button
  store.tsx  Cart + wishlist + recently-viewed context (localStorage)
  toast.tsx  Toast provider, viewport and persistence hook
  cart-drawer.tsx  Slide-over bag

lib/
  types.ts     Commerce domain types
  catalog.ts   Mock products, collections, testimonials, social tiles
  commerce.ts  Query layer: pricing, search, filter/sort, recommendations
  site.ts      Brand config, navigation, SEO metadata builder

content/       Long-form policy copy as typed data
scripts/       Artwork generator (abstract SVG editorial imagery)
public/media/  85 generated artwork files
```

## How commerce state works

`StoreProvider` holds cart lines, wishlist handles and recently-viewed products in React state,
mirrored to `localStorage` under `nova.*` keys. State is only read from storage **after mount**,
so server and client markup match and hydration never mismatches.

Cart lines are keyed by `productId::size::color`, so adding the same variant increments the
existing line rather than duplicating it. Free shipping applies at $150; the progress bar in the
drawer reflects live subtotal.

## Connecting a real backend

The UI never imports `lib/catalog.ts` directly — it calls `lib/commerce.ts`, which is the single
seam for data. To connect Shopify or another headless commerce provider, reimplement that module's
exports (`getProductByHandle`, `getProductsInCollection`, `applyFilters`, `getRelatedProducts`, …)
against the Storefront API. The types in `lib/types.ts` already mirror the commerce shape, and
`Product.id` is written as a GraphQL-style `gid://` URI, so no component changes are required.

Product and collection pages use `generateStaticParams`, so switching to a live source should be
paired with `revalidate` for incremental regeneration.

## Imagery

All artwork is generated vector art committed to `public/media` by `npm run media` — no external
image requests, no licensing concerns, and the site renders identically offline. The generator
(`scripts/artwork.mjs`) is deterministic: the same seed always produces the same file.

`components/ui/media-image.tsx` uses a plain `<img>` with intrinsic sizing, `loading="lazy"` and
`decoding="async"` rather than `next/image`, because SVG is not optimizable and this avoids the
native `sharp` dependency. Swap it for `next/image` when real photography is added.

## Accessibility & SEO

Semantic landmarks and heading order, a skip-to-content link, visible focus rings, `aria-pressed`
on every toggle, `aria-live` regions for result counts and toasts, labelled form fields with
inline `role="alert"` errors, and full keyboard support in the dialogs, filters and accordion.
`prefers-reduced-motion` disables parallax and marquee motion.

Per-page `Metadata` with canonical URLs, Open Graph and Twitter cards, plus a dynamic
`sitemap.xml`, `robots.txt` and `Product` JSON-LD on detail pages.

## Notes

- Checkout is intentionally disabled; the button raises an informational toast.
- The contact form validates and simulates a send, but transmits nothing.
- Cart, wishlist and recent views are per-device via `localStorage` — there is no account system.
