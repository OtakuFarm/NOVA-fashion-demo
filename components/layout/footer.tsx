import Link from "next/link";

import { NewsletterForm } from "@/components/newsletter-form";
import { footerNavigation, site } from "@/lib/site";

/** Site footer: newsletter, navigation columns, legal and social links. */
export function Footer() {
  const year = 2026;

  return (
    <footer className="bg-ink text-bone">
      <div className="container-nova">
        {/* Newsletter */}
        <section className="grid gap-10 border-b border-bone/15 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-3xl md:text-4xl">Join the movement</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/60">
              Early access to every drop, restock alerts and 10% off your first order. No noise —
              roughly two emails a month.
            </p>
          </div>
          <div className="md:pt-8">
            <NewsletterForm tone="dark" />
          </div>
        </section>

        {/* Navigation */}
        <section className="grid gap-10 border-b border-bone/15 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl tracking-[0.35em]">
              {site.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/60">{site.tagline} Premium
              streetwear, made in small runs and built to be worn daily.</p>
            <address className="mt-6 space-y-1 text-sm not-italic text-bone/50">
              <p>{site.address}</p>
              <p>
                <a href={`mailto:${site.email}`} className="link-underline">
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {footerNavigation.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow mb-5 text-bone/40">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </section>

        {/* Legal bar */}
        <section className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-bone/50 md:flex-row">
          <p>© {year} {site.name}. A fictional brand built as a portfolio demo — not a real store.</p>
          <ul className="flex flex-wrap items-center gap-5">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-bone">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-bone">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/shipping-returns" className="transition-colors hover:text-bone">
                Shipping &amp; Returns
              </Link>
            </li>
          </ul>
          <ul className="flex items-center gap-4">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </footer>
  );
}
