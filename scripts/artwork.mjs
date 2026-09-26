/**
 * Shared artwork primitives for the NOVA demo site.
 *
 * All imagery is abstract, fictional editorial artwork drawn with vector
 * shapes — no third-party photography is used or required, so the site is
 * fully self-contained and renders instantly offline.
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");
mkdirSync(outDir, { recursive: true });

/* ------------------------------------------------------------------ colour */

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
};

const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("")}`;

export const shade = (hex, amount) => {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({ r: r + amount, g: g + amount, b: b + amount });
};

export const mix = (a, b, t) => {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex({
    r: A.r + (B.r - A.r) * t,
    g: A.g + (B.g - A.g) * t,
    b: A.b + (B.b - A.b) * t,
  });
};

/** Deterministic PRNG so generated artwork is byte-identical on every run. */
export const rng = (seed) => {
  let s = 0;
  for (const ch of String(seed)) s = (s * 31 + ch.charCodeAt(0)) % 2147483647;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

/* ---------------------------------------------------------------- palettes */

export const PALETTE = {
  ink: "#15161a",
  black: "#1b1b1d",
  bone: "#e9e4d8",
  clay: "#ab8266",
  sand: "#cfc3ab",
  olive: "#575b42",
  moss: "#4d5542",
  signal: "#c9f03a",
  sky: "#b9c6cf",
  indigo: "#2b3550",
};

/* -------------------------------------------------------------- primitives */

/** Soft draped-fabric blob suggesting a garment silhouette. */
const drape = (r, w, h, spread) => {
  const cx = w * (0.32 + r() * 0.36);
  const cy = h * (0.36 + r() * 0.3);
  const rx = w * (0.16 + r() * 0.1);
  const ry = h * (0.2 + r() * 0.1) * spread;
  const leftX = cx - rx;
  const leftY = cy - ry * (0.7 + r() * 0.5);
  const rightX = cx + rx * (0.85 + r() * 0.3);
  const rightY = cy + ry * (0.6 + r() * 0.5);
  return [
    `M ${leftX} ${cy}`,
    `C ${leftX - rx * 0.6} ${leftY} ${leftX} ${leftY - ry * 0.4} ${cx - rx * 0.25} ${cy - ry * 0.75}`,
    `C ${cx} ${cy - ry * 1.1} ${rightX} ${leftY + ry * 0.3} ${rightX} ${rightY}`,
    `C ${rightX + rx * 0.5} ${rightY + ry * 0.7} ${cx + rx * 0.2} ${cy + ry} ${cx - rx * 0.3} ${cy + ry * 0.85}`,
    `C ${cx - rx * 0.8} ${cy + ry * 0.6} ${leftX - rx * 0.3} ${cy + ry * 0.3} ${leftX} ${cy}`,
    "Z",
  ].join(" ");
};

/** Thin editorial rule/seam lines. */
const seams = (r, w, h, count) => {
  let out = "";
  for (let i = 0; i < count; i += 1) {
    const y = h * (0.12 + r() * 0.78);
    const x1 = w * (r() * 0.3);
    const x2 = x1 + w * (0.25 + r() * 0.6);
    out += `<line x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1"/>`;
  }
  return out;
};

const wordmark = (w, h, color, size, opacity = 0.85) =>
  `<text x="${(w * 0.06).toFixed(1)}" y="${(h * 0.93).toFixed(1)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${size}" letter-spacing="${(size * 0.42).toFixed(1)}" fill="${color}" fill-opacity="${opacity}">NOVA</text>`;

const caption = (w, h, text, color, size, opacity = 0.5) =>
  `<text x="${(w * 0.06).toFixed(1)}" y="${(h * 0.965).toFixed(1)}" font-family="Helvetica Neue, Arial, sans-serif" font-size="${size}" letter-spacing="${(size * 0.16).toFixed(1)}" fill="${color}" fill-opacity="${opacity}">${text.toUpperCase()}</text>`;

/**
 * Core artwork: an abstract duotone editorial frame.
 * `variant` shifts crop and tone so a set of four reads as four different shots.
 */
export const frame = ({ w, h, seed, base, accent, variant = 0, label = "", ratioLabel = "" }) => {
  const r = rng(seed + variant * 977);
  const bgA = shade(mix(base, PALETTE.ink, 0.12 + variant * 0.14), -8 + variant * 4);
  const bgB = mix(base, accent, 0.18 + r() * 0.22);
  const light = mix(bgB, "#ffffff", 0.55);
  const ink = shade(bgA, -26);
  const id = String(seed).replace(/[^a-z0-9]/gi, "") + variant;
  const zoom = [1, 1.28, 0.86, 1.14][variant % 4];
  const ox = [0, -8, 6, -3][variant % 4];
  const oy = [0, 5, -4, 3][variant % 4];
  const size = Math.round(Math.min(w, h) * 0.021);
  const soft = mix(bgA, "#ffffff", 0.82);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true">
<defs>
<linearGradient id="bg${id}" x1="0" y1="0" x2="0.6" y2="1">
<stop offset="0%" stop-color="${bgB}"/><stop offset="100%" stop-color="${bgA}"/>
</linearGradient>
<radialGradient id="lit${id}" cx="0.5" cy="0.34" r="0.62">
<stop offset="0%" stop-color="${light}" stop-opacity="0.55"/><stop offset="100%" stop-color="${light}" stop-opacity="0"/>
</radialGradient>
<radialGradient id="shd${id}" cx="0.52" cy="0.86" r="0.5">
<stop offset="0%" stop-color="${ink}" stop-opacity="0.6"/><stop offset="100%" stop-color="${ink}" stop-opacity="0"/>
</radialGradient>
<filter id="g${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7"/><feColorMatrix type="saturate" values="0"/></filter>
<clipPath id="cp${id}"><rect width="${w}" height="${h}"/></clipPath>
</defs>
<g clip-path="url(#cp${id})">
<rect width="${w}" height="${h}" fill="url(#bg${id})"/>
<g transform="translate(${((w * (1 - zoom)) / 2 + ox).toFixed(1)} ${((h * (1 - zoom)) / 2 + oy).toFixed(1)}) scale(${zoom})">
<rect width="${w}" height="${h}" fill="url(#lit${id})"/>
<path d="${drape(r, w, h, 1)}" fill="${shade(mix(base, "#000000", 0.25), -6)}" opacity="0.5"/>
<path d="${drape(r, w, h, 0.72)}" fill="${shade(bgB, 26)}" opacity="0.72"/>
<path d="${drape(r, w, h, 0.48)}" fill="${shade(mix(base, "#ffffff", 0.14), -14)}" opacity="0.6"/>
${seams(r, w, h, 3)}
</g>
<rect width="${w}" height="${h}" fill="url(#shd${id})"/>
<rect width="${w}" height="${h}" filter="url(#g${id})" opacity="0.09"/>
${wordmark(w, h, soft, size)}
${ratioLabel ? caption(w, h, ratioLabel, mix(bgA, "#ffffff", 0.7), Math.round(size * 0.62)) : ""}
${label ? caption(w, h, label, mix(bgA, "#ffffff", 0.7), Math.round(size * 0.62), 0.4) : ""}
</g>
</svg>`;
};

