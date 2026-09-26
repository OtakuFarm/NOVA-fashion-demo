"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { announcementMessages } from "@/lib/site";

/** Rotating announcement bar above the header. */
export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % announcementMessages.length),
      5000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative z-60 overflow-hidden bg-ink text-bone">
      <div className="container-nova flex h-9 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.65rem] tracking-[0.18em] uppercase"
          >
            {announcementMessages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Dismissible promotional strip shown once per session on the home page. */
export function PromoStrip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(window.sessionStorage.getItem("nova.promo.dismissed") !== "1");
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden border-b border-ink/10 bg-accent"
    >
      <div className="container-nova flex items-center justify-center gap-4 py-2.5 text-center">
        <p className="text-[0.7rem] tracking-[0.12em] uppercase">
          First order? Use code <strong className="font-semibold">MOVE10</strong> for 10% off
        </p>
        <button
          type="button"
          aria-label="Dismiss promotion"
          onClick={() => {
            window.sessionStorage.setItem("nova.promo.dismissed", "1");
            setVisible(false);
          }}
          className="absolute right-4 p-1 transition-opacity hover:opacity-60"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
