"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { MediaImage } from "@/components/ui/media-image";
import { SectionHeading } from "@/components/ui/button";

type Tile = { src: string; alt: string; handle: string; likes: number };

/** Instagram-style community gallery. */
export function SocialGrid({ tiles }: { tiles: Tile[] }) {
  return (
    <section className="container-nova py-20 md:py-28">
      <SectionHeading
        eyebrow="@novamove"
        title="Worn by the community"
        description="Tag #NOVAMOVE to be featured. Every look below is fictional demo content."
        action={{ label: "Follow the brand", href: "https://instagram.com" }}
        className="mb-12"
      />

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {tiles.map((tile, i) => (
          <motion.li
            key={tile.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <MediaImage
                src={tile.src}
                alt={tile.alt}
                width={1000}
                height={1000}
                aspect="aspect-square"
                imgClassName="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              >
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-ink/45 text-bone opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <Heart className="size-5" aria-hidden="true" />
                  <span className="text-xs tabular-nums">
                    {tile.likes.toLocaleString("en-US")}
                  </span>
                  <span className="text-[0.65rem] opacity-80">{tile.handle}</span>
                </span>
              </MediaImage>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
