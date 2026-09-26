import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-nova flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow text-ink-soft">Error 404</p>
      <h1 className="mt-4 text-5xl md:text-7xl">This piece has moved on</h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
        The page you are looking for is no longer in the collection. Try the shop, or head back to
        the latest drop.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/shop">Shop All Products</ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to Home
        </ButtonLink>
      </div>
      <Link href="/faq" className="link-underline mt-8 text-xs uppercase tracking-[0.2em] text-ink-soft">
        Need help? Read the FAQ
      </Link>
    </section>
  );
}
