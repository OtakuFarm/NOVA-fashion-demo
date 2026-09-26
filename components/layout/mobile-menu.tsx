"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Heart, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { footerNavigation, site } from "@/lib/site";

/** Full-height navigation drawer for small screens. */
export function MobileMenu({
  open,
  onClose,
  wishlistCount,
}: {
  open: boolean;
  onClose: () => void;
  wishlistCount: number;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 cursor-default bg-ink/40 lg:hidden"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-90 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-bone lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <span className="text-lg tracking-[0.35em]">{site.name}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-1.5 transition-colors hover:bg-ink/5"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 px-6 py-6">
              <ul className="space-y-1">
                {[
                  { label: "Shop All", href: "/shop" },
                  { label: "New Arrivals", href: "/collections/new-arrivals" },
                  { label: "Essentials", href: "/collections/essentials" },
                  { label: "Bestsellers", href: "/collections/bestsellers" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block border-b border-ink/10 py-4 text-2xl tracking-tight"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <Link
                href="/wishlist"
                onClick={onClose}
                className="mt-6 flex items-center gap-2 text-sm text-ink-soft"
              >
                <Heart className="size-4" aria-hidden="true" /> Wishlist ({wishlistCount})
              </Link>
            </nav>

            <div className="border-t border-ink/10 px-6 py-5">
              <p className="eyebrow mb-3 text-ink-soft">Collections</p>
              <ul className="space-y-2">
                {footerNavigation[0].links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex items-center justify-between text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {l.label}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
