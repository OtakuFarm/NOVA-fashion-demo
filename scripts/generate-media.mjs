/**
 * Generates the local SVG artwork used across the NOVA demo site.
 *
 * Usage: npm run media
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { frame, outDir, PALETTE } from "./artwork.mjs";

const { ink, black, bone, clay, sand, olive, moss, signal, sky, indigo } = PALETTE;

const PRODUCT_ART = {
  "tee-oversized": [bone, clay],
  "cargo-pants": [ink, olive],
  "signature-hoodie": [ink, "#2a2c31"],
  "runner-sneakers": [bone, signal],
  "utility-jacket": [sand, ink],
  "relaxed-denim": [indigo, black],
  "core-cap": [clay, bone],
  "studio-shirt": [bone, sky],
  "tech-vest": [ink, signal],
  "everyday-shorts": [moss, bone],
  "premium-sweatpants": [bone, moss],
  "signature-bag": [ink, olive],
  "ribbed-beanie": [signal, ink],
  "fleece-sweatshirt": [clay, ink],
};

const COLLECTION_ART = {
  "new-arrivals": [ink, signal],
  essentials: [bone, sand],
  bestsellers: [ink, clay],
  outerwear: [sand, ink],
  accessories: [clay, olive],
  "new-season": [black, indigo],
  denim: [indigo, clay],
  footwear: [bone, signal],
};

const SOCIAL_ART = [
  [bone, sand],
  [ink, clay],
  [moss, bone],
  [sand, ink],
  [clay, bone],
  [indigo, sky],
];

const RATIO_LABELS = ["detail", "front", "fabric", "editorial"];

const written = [];
const write = (name, svg) => {
  writeFileSync(join(outDir, name), svg.replace(/\n\s*/g, " ").trim(), "utf8");
  written.push(name);
};

// 1. Product galleries — four editorial frames each.
for (const [slug, [base, accent]] of Object.entries(PRODUCT_ART)) {
  for (let v = 0; v < 4; v += 1) {
    write(
      `${slug}-${v + 1}.svg`,
      frame({ w: 1200, h: 1500, seed: slug, base, accent, variant: v, ratioLabel: RATIO_LABELS[v] }),
    );
  }
}

// 2. Collection cards (4:5) and campaign heroes (16:9).
for (const [handle, [base, accent]] of Object.entries(COLLECTION_ART)) {
  write(`collection-${handle}.svg`, frame({ w: 1200, h: 1500, seed: handle, base, accent, variant: 1, label: "NOVA" }));
  write(
    `hero-collection-${handle}.svg`,
    frame({ w: 1920, h: 1200, seed: `${handle}-hero`, base, accent, variant: 2, label: "AW26" }),
  );
}

// 3. Community gallery tiles.
SOCIAL_ART.forEach(([base, accent], i) => {
  write(`social-${i + 1}.svg`, frame({ w: 1000, h: 1000, seed: `social${i}`, base, accent, variant: i % 4, label: "#NOVAMOVE" }));
});

// 4. Home, editorial and about heroes.
write("hero-home.svg", frame({ w: 1920, h: 1280, seed: "home-hero", base: ink, accent: sand, variant: 1, label: "Move Different." }));
write("hero-editorial.svg", frame({ w: 1600, h: 2000, seed: "editorial", base: clay, accent: bone, variant: 3 }));
write("hero-secondary.svg", frame({ w: 1600, h: 2000, seed: "secondary", base: indigo, accent: sky, variant: 0 }));
write("about-1.svg", frame({ w: 1400, h: 1750, seed: "about-one", base: bone, accent: sand, variant: 2 }));
write("about-2.svg", frame({ w: 1400, h: 1750, seed: "about-two", base: ink, accent: olive, variant: 1 }));
write("contact-1.svg", frame({ w: 1600, h: 1200, seed: "contact", base: sand, accent: ink, variant: 0 }));

// 5. Open Graph share card.
write("og.svg", frame({ w: 1200, h: 630, seed: "og-card", base: ink, accent: signal, variant: 1, label: "Move Different." }));

console.log(`Generated ${written.length} artwork files in public/media`);
