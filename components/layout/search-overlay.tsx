"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MediaImage } from "@/components/ui/media-image";
import { formatPrice, productPath, searchProducts } from "@/lib/commerce";

/** Full-screen search overlay with live results. */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim() ? searchProducts(query, 6) : [];

  useEffect(() => {
    if (open) {
      setQuery("");
      window.setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-100 bg-bone"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div className="container-nova flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-ink/10 py-5">
              <span className="eyebrow text-ink-soft">Search</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-2 transition-colors hover:bg-ink/5"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={submit} className="mt-8 md:mt-14">
              <div className="flex items-center gap-4 border-b border-ink pb-4">
                <Search className="size-5 shrink-0 text-ink-soft" aria-hidden="true" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for hoodies, denim, cargo…"
                  aria-label="Search products"
                  className="w-full bg-transparent text-2xl tracking-tight outline-none placeholder:text-ink/30 md:text-5xl"
                />
                <button type="submit" aria-label="Submit search" className="shrink-0">
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </form>

            <div className="mt-8 flex-1 overflow-y-auto pb-10">
              {query.trim() === "" ? (
                <div>
                  <p className="eyebrow mb-4 text-ink-soft">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Hoodie", "Cargo", "Denim", "Oversized tee", "Bag", "Beanie", "Outerwear"].map(
                      (t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setQuery(t)}
                          className="border border-ink/20 px-4 py-2 text-xs capitalize transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                        >
                          {t}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="text-sm text-ink-soft">
                  No results for “{query}”. Try a shorter term or browse{" "}
                  <Link href="/shop" onClick={onClose} className="link-underline">
                    all products
                  </Link>
                  .
                </p>
              ) : (
                <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={productPath(p.handle)}
                        onClick={onClose}
                        className="group flex gap-4"
                      >
                        <MediaImage
                          src={p.images[0].src}
                          alt={p.images[0].alt}
                          width={120}
                          height={150}
                          aspect="aspect-[4/5]"
                          className="w-20 shrink-0"
                        />
                        <div className="flex flex-col justify-center">
                          <p className="text-sm">{p.name}</p>
                          <p className="mt-1 text-xs text-ink-soft">{formatPrice(p.price.amount)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
