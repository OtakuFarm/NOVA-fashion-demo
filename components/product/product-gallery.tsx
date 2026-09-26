"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { ProductImage } from "@/lib/commerce";

/** Product gallery: main frame with thumbnail rail and keyboard/tap navigation. */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <ul className="flex gap-3 lg:w-20 lg:flex-col" aria-label="Product images">
        {images.map((image, i) => (
          <li key={image.src} className="flex-1 lg:flex-none">
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className={`block w-full overflow-hidden border transition-all ${
                i === index ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Main frame */}
      <div className="group relative flex-1 overflow-hidden bg-sand">
        <div className="relative aspect-[4/5] w-full">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt}
              width={images[index].width}
              height={images[index].height}
              custom={direction}
              initial={{ opacity: 0, scale: 1.03, x: direction * 24 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 size-full object-cover"
            />
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous image"
          className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-bone/90 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-lg:hidden"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next image"
          className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-bone/90 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 max-lg:hidden"
        >
          <ChevronRight className="size-4" />
        </button>

        <p className="absolute bottom-3 left-3 bg-bone/90 px-2.5 py-1 text-[0.65rem] tracking-[0.15em] uppercase">
          {index + 1} / {images.length}
        </p>
        <span className="sr-only">{name}</span>
      </div>
    </div>
  );
}
