"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProductByHandle } from "@/lib/commerce";
import type { CartLine, Product } from "@/lib/types";
import { usePersistentState, useToast } from "@/components/toast";
import { CartDrawer } from "@/components/cart-drawer";

const FREE_SHIPPING_THRESHOLD = 150;
const MAX_LINE_QUANTITY = 10;

export type RecentlyViewed = { handle: string; name: string; image: string; price: number };

type StoreValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  addToCart: (product: Product, opts: { size: string; color: string; quantity: number }) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (handle: string) => void;
  isWishlisted: (handle: string) => boolean;
  recentlyViewed: RecentlyViewed[];
  trackView: (product: Product) => void;
  clearRecentlyViewed: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  hydrated: boolean;
};

const StoreContext = createContext<StoreValue | null>(null);

const lineId = (productId: string, size: string, color: string) => `${productId}::${size}::${color}`;

/**
 * Client-side commerce state: cart, wishlist and recently viewed.
 * Persisted to localStorage so the demo behaves like a real session.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  const notify = useToast();
  const [lines, setLines, cartHydrated] = usePersistentState<CartLine[]>("nova.cart.v1", []);
  const [wishlist, setWishlist] = usePersistentState<string[]>("nova.wishlist.v1", []);
  const [recentlyViewed, setRecentlyViewed] = usePersistentState<RecentlyViewed[]>("nova.recent.v1", []);
  const [cartOpen, setCartOpen] = useState(false);

  // Lock background scroll while the cart drawer is open.
  useEffect(() => {
    if (!cartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [cartOpen]);

  const addToCart = useCallback<StoreValue["addToCart"]>(
    (product, { size, color, quantity }) => {
      const id = lineId(product.id, size, color);
      setLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) =>
            l.id === id ? { ...l, quantity: Math.min(MAX_LINE_QUANTITY, l.quantity + quantity) } : l,
          );
        }
        return [
          ...prev,
          {
            id,
            productId: product.id,
            handle: product.handle,
            name: product.name,
            image: product.images[0],
            price: product.price,
            size,
            color,
            quantity: Math.min(MAX_LINE_QUANTITY, Math.max(1, quantity)),
            maxQuantity: Math.min(MAX_LINE_QUANTITY, Math.max(1, product.stockCount)),
          },
        ];
      });
      notify(`${product.name} — ${color} / ${size} added to bag`);
      setCartOpen(true);
    },
    [notify, setLines],
  );

  const removeLine = useCallback(
    (id: string) => {
      const line = lines.find((l) => l.id === id);
      setLines((prev) => prev.filter((l) => l.id !== id));
      if (line) notify(`${line.name} removed from bag`, "info");
    },
    [lines, notify, setLines],
  );

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      setLines((prev) =>
        prev
          .map((l) =>
            l.id === id ? { ...l, quantity: Math.max(0, Math.min(l.maxQuantity, quantity)) } : l,
          )
          .filter((l) => l.quantity > 0),
      );
    },
    [setLines],
  );

  const clearCart = useCallback(() => {
    setLines([]);
    notify("Bag cleared", "info");
  }, [notify, setLines]);

  const toggleWishlist = useCallback(
    (handle: string) => {
      const product = getProductByHandle(handle);
      setWishlist((prev) => {
        const inList = prev.includes(handle);
        notify(
          inList
            ? `${product?.name ?? "Item"} removed from wishlist`
            : `${product?.name ?? "Item"} saved to wishlist`,
          inList ? "info" : "success",
        );
        return inList ? prev.filter((h) => h !== handle) : [...prev, handle];
      });
    },
    [notify, setWishlist],
  );

  const isWishlisted = useCallback((handle: string) => wishlist.includes(handle), [wishlist]);

  const trackView = useCallback(
    (product: Product) => {
      setRecentlyViewed((prev) =>
        [
          {
            handle: product.handle,
            name: product.name,
            image: product.images[0].src,
            price: product.price.amount,
          },
          ...prev.filter((p) => p.handle !== product.handle),
        ].slice(0, 8),
      );
    },
    [setRecentlyViewed],
  );

  const clearRecentlyViewed = useCallback(() => setRecentlyViewed([]), [setRecentlyViewed]);

  const value = useMemo<StoreValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 12;
    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      addToCart,
      removeLine,
      setQuantity,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
      recentlyViewed,
      trackView,
      clearRecentlyViewed,
      cartOpen,
      setCartOpen,
      hydrated: cartHydrated,
    };
  }, [
    lines, addToCart, removeLine, setQuantity, clearCart, wishlist, toggleWishlist,
    isWishlisted, recentlyViewed, trackView, clearRecentlyViewed, cartOpen, cartHydrated,
  ]);

  return (
    <StoreContext.Provider value={value}>
      {children}
      <CartDrawer />
    </StoreContext.Provider>
  );
}

/** Access cart/wishlist state from any client component. */
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider />");
  return ctx;
}
