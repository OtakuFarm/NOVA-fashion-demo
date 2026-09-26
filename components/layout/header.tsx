"use client";

import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { useStore } from "@/components/store";
import { site } from "@/lib/site";

/** Sticky site header: desktop nav, mobile drawer trigger, search + bag. */
export function Header() {
  const pathname = usePathname();
  const { count, wishlist, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close transient UI whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // "/" opens search, the way a real store would.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !/input|textarea/i.test((e.target as HTMLElement)?.tagName ?? "")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-ink/10 bg-bone/85 backdrop-blur-md" : "border-transparent bg-bone"
        }`}
      >
        <div className="container-nova flex h-18 items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="-ml-2 p-2 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="text-xl font-medium tracking-[0.35em] md:text-2xl"
          >
            {site.name}
          </Link>

          <DesktopNav />

          <div className="flex items-center gap-1 md:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 transition-opacity hover:opacity-60"
            >
              <Search className="size-5" />
            </button>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative hidden p-2 transition-opacity hover:opacity-60 sm:block"
            >
              <Heart className="size-5" />
              {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open bag, ${count} items`}
              className="relative p-2 transition-opacity hover:opacity-60"
            >
              <ShoppingBag className="size-5" />
              {count > 0 && <Badge>{count}</Badge>}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} wishlistCount={wishlist.length} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

/** Small count bubble used on the bag and wishlist icons. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="absolute top-0.5 right-0 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] leading-4 font-semibold text-ink">
      {children}
    </span>
  );
}
