import type { Collection, Product, ProductImage, Review } from "./types";

/**
 * ---------------------------------------------------------------------------
 * MOCK CATALOGUE
 * ---------------------------------------------------------------------------
 * Every product, review, customer and company detail in this file is fictional
 * and written for this portfolio demo. The data is intentionally shaped like a
 * headless-commerce payload so this module can be replaced by a real Shopify
 * Storefront API client later without touching the UI.
 */

const img = (slug: string, alt: string, i: number): ProductImage => ({
  src: `/media/${slug}-${i}.svg`,
  alt: `${alt} — editorial view ${i}`,
  width: 1200,
  height: 1500,
});

/** Builds the standard 4-image editorial set for a product. */
const gallery = (slug: string, alt: string): ProductImage[] =>
  [1, 2, 3, 4].map((i) => img(slug, alt, i));

type ReviewTuple = [author: string, location: string, rating: number, title: string, body: string, daysAgo: number];

/** Turns compact tuples into full review objects with deterministic dates. */
const buildReviews = (seed: string, tuples: ReviewTuple[]): Review[] =>
  tuples.map(([author, location, rating, title, body, daysAgo], i) => {
    const date = new Date(Date.UTC(2026, 8, 20) - daysAgo * 86_400_000);
    return {
      id: `${seed}-r${i + 1}`,
      author,
      location,
      rating,
      title,
      body,
      date: date.toISOString().slice(0, 10),
      verified: true,
    };
  });

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const PANTS = ["28", "30", "32", "34", "36", "38"];
const SHOE = ["39", "40", "41", "42", "43", "44", "45"];

export const products: Product[] = [
  {
    id: "gid://nova/Product/tee-oversized",
    handle: "nova-essential-oversized-tee",
    name: "Nova Essential Oversized Tee",
    subtitle: "Heavyweight 240gsm organic cotton",
    price: { amount: 68, currencyCode: "USD" },
    description:
      "The foundation of the NOVA uniform. Cut with a dropped shoulder and a boxy body that holds its shape wash after wash, our Essential Oversized Tee is knitted from long-staple organic cotton at 240gsm — substantial enough to wear alone, engineered to layer under everything.",
    details: [
      "240gsm organic long-staple cotton jersey",
      "Dropped shoulder, boxy body, ribbed neck binding",
      "Pre-shrunk and colour-locked",
      "Made in Portugal",
      "Model is 6'1\" / 185cm wearing size M",
    ],
    images: gallery("tee-oversized", "Nova Essential Oversized Tee"),
    category: "Tops",
    tags: ["new", "essential", "cotton"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Bone", "Ink", "Clay"] },
    ],
    colors: [
      { name: "Bone", hex: "#efece5" },
      { name: "Ink", hex: "#131316" },
      { name: "Clay", hex: "#b09479" },
    ],
    rating: 4.8,
    reviewCount: 214,
    reviews: buildReviews("tee", [
      ["Marcus T.", "Brooklyn, NY", 5, "The weight is unreal", "Feels like a piece of clothing, not a t-shirt. Holds shape after ten washes.", 12],
      ["Aisha R.", "Atlanta, GA", 5, "Perfect oversized fit", "Shoulder drop is exactly right. I sized down and it's spot on.", 34],
      ["Dev P.", "Austin, TX", 4, "Great, slightly wide", "Love the fabric. If you want a regular fit, size down.", 58],
    ]),
    stock: "in-stock",
    stockCount: 42,
    collectionHandles: ["new-arrivals", "essentials", "new-season"],
    createdAt: "2026-08-28",
    featured: true,
    bestSeller: true,
  },
  {
    id: "gid://nova/Product/cargo-pants",
    handle: "nova-cargo-pants",
    name: "Nova Cargo Pants",
    subtitle: "Relaxed taper with articulated knee",
    price: { amount: 148, currencyCode: "USD" },
    description:
      "Built for movement, cut for the street. The Cargo Pant balances a relaxed thigh with a clean tapered leg, finished with six functional pockets, an articulated knee and a hidden waistband adjuster so the fit is yours, not ours.",
    details: [
      "Cotton-nylon twill with a soft mechanical stretch",
      "Six functional pockets, two zip-closure",
      "Articulated knee darts, gusseted crotch",
      "Internal waistband adjuster",
      "YKK zip hardware",
    ],
    images: gallery("cargo-pants", "Nova Cargo Pants"),
    category: "Bottoms",
    tags: ["utility", "bestseller", "tapered"],
    options: [
      { name: "Size", values: PANTS },
      { name: "Color", values: ["Ink", "Sand", "Olive"] },
    ],
    colors: [
      { name: "Ink", hex: "#15171a" },
      { name: "Sand", hex: "#d6cdbc" },
      { name: "Olive", hex: "#5c6047" },
    ],
    rating: 4.7,
    reviewCount: 168,
    reviews: buildReviews("cargo", [
      ["Jordan K.", "Toronto, ON", 5, "Best cargo I've owned", "The taper is what sells it. Not sloppy, not skintight.", 9],
      ["Sofia L.", "Miami, FL", 5, "Pockets are actually usable", "Phone, keys, card — all fit without bulk.", 27],
      ["Ben O.", "Chicago, IL", 4, "Great pant, size carefully", "Relaxed through the thigh. I went down one size.", 44],
    ]),
    stock: "in-stock",
    stockCount: 31,
    collectionHandles: ["essentials", "bestsellers", "new-season"],
    createdAt: "2026-06-14",
    featured: true,
    bestSeller: true,
  },
  {
    id: "gid://nova/Product/signature-hoodie",
    handle: "nova-signature-hoodie",
    name: "Nova Signature Hoodie",
    subtitle: "Brushed loopback fleece, boxed silhouette",
    price: { amount: 185, currencyCode: "USD" },
    compareAtPrice: { amount: 220, currencyCode: "USD" },
    description:
      "Our heaviest fleece, brushed twice for a broken-in hand from day one. A double-layered hood holds its architecture, the rib is dense and elastic, and the tonal NOVA mark is embroidered — never printed — so it sits flat through the wash.",
    details: [
      "520gsm brushed organic cotton loopback",
      "Double-layer hood with flat drawcord",
      "Tonal raised embroidery at chest",
      "Kangaroo pocket with hidden phone sleeve",
      "Ribbed cuffs and hem",
    ],
    images: gallery("signature-hoodie", "Nova Signature Hoodie"),
    category: "Tops",
    tags: ["bestseller", "fleece", "heavyweight"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Ink", "Bone", "Moss", "Clay"] },
    ],
    colors: [
      { name: "Ink", hex: "#131316" },
      { name: "Bone", hex: "#e9e5db" },
      { name: "Moss", hex: "#4a5340" },
      { name: "Clay", hex: "#a97f63" },
    ],
    rating: 4.9,
    reviewCount: 302,
    reviews: buildReviews("hoodie", [
      ["Elena V.", "Los Angeles, CA", 5, "Worth every dollar", "The heaviest hoodie I've owned. Hood alone is worth it.", 6],
      ["Tariq N.", "London, UK", 5, "No pilling, no sag", "Six months in and it still looks new.", 21],
      ["Grace H.", "Seattle, WA", 5, "The fit is perfect", "Boxy without looking oversized.", 39],
    ]),
    stock: "low-stock",
    stockCount: 6,
    collectionHandles: ["bestsellers", "essentials", "new-season"],
    createdAt: "2026-05-02",
    featured: true,
    bestSeller: true,
  },
  {
    id: "gid://nova/Product/runner-sneakers",
    handle: "nova-runner-sneakers",
    name: "Nova Runner Sneakers",
    subtitle: "Engineered knit upper, dual-density foam",
    price: { amount: 220, currencyCode: "USD" },
    description:
      "A daily trainer cut from engineered knit that breathes where you heat and holds where you need it. The midsole pairs a soft top layer for comfort with a denser base for stability, wrapped in a rubber outsole rated for city miles.",
    details: [
      "Engineered knit upper with welded cage",
      "Dual-density compression-moulded midsole",
      "Rubber outsole, 4mm drop",
      "Removable anti-bacterial insole",
      "Weighs 268g (UK 8)",
    ],
    images: gallery("runner-sneakers", "Nova Runner Sneakers"),
    category: "Footwear",
    tags: ["new", "footwear", "knit"],
    options: [
      { name: "Size", values: SHOE },
      { name: "Color", values: ["Bone", "Ink", "Signal"] },
    ],
    colors: [
      { name: "Bone", hex: "#ece8df" },
      { name: "Ink", hex: "#16181c" },
      { name: "Signal", hex: "#d6ff3f" },
    ],
    rating: 4.6,
    reviewCount: 97,
    reviews: buildReviews("runner", [
      ["Noah B.", "Melbourne, AU", 5, "All-day comfort", "Wore them across three markets straight. No break-in needed.", 15],
      ["Carla M.", "Barcelona, ES", 4, "Great, narrow fit", "Beautiful knit. If you have wide feet, size up.", 31],
    ]),
    stock: "in-stock",
    stockCount: 24,
    collectionHandles: ["new-arrivals", "footwear"],
    createdAt: "2026-08-19",
    featured: true,
  },
  {
    id: "gid://nova/Product/utility-jacket",
    handle: "nova-utility-jacket",
    name: "Nova Utility Jacket",
    subtitle: "Water-repellent ripstop, four-season",
    price: { amount: 340, currencyCode: "USD" },
    description:
      "The most technical piece we make. A water-repellent ripstop shell with taped seams, a two-way front zip and a modular pocket system that reconfigures from a clean city fit to full field capacity.",
    details: [
      "DWR-treated recycled ripstop, taped seams",
      "Two-way YKK AquaGuard zip",
      "Modular 8-pocket system with magnetic closures",
      "Underarm ventilation gussets",
      "Packs into its internal pocket",
    ],
    images: gallery("utility-jacket", "Nova Utility Jacket"),
    category: "Outerwear",
    tags: ["new", "technical", "outerwear"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Ink", "Sand", "Signal"] },
    ],
    colors: [
      { name: "Ink", hex: "#141519" },
      { name: "Sand", hex: "#cfc3ab" },
      { name: "Signal", hex: "#c9f03a" },
    ],
    rating: 4.8,
    reviewCount: 61,
    reviews: buildReviews("jacket", [
      ["Rui S.", "Singapore", 5, "Rain-proof and quiet", "Wore through a Singapore monsoon. Completely dry inside.", 11],
      ["Hannah D.", "Seattle, WA", 5, "The pockets are the feature", "Reconfiguring them changes the whole silhouette.", 29],
    ]),
    stock: "low-stock",
    stockCount: 4,
    collectionHandles: ["new-arrivals", "outerwear", "new-season"],
    createdAt: "2026-08-30",
    featured: true,
  },
  {
    id: "gid://nova/Product/relaxed-denim",
    handle: "nova-relaxed-denim",
    name: "Nova Relaxed Denim",
    subtitle: "Rigid Japanese selvedge, wide straight leg",
    price: { amount: 165, currencyCode: "USD" },
    description:
      "Rigid 13.5oz selvedge denim from a Japanese mill, cut wide and straight with a high rise and a clean break. It starts stiff and earns its character — expect fades unique to your wear pattern.",
    details: [
      "13.5oz Japanese selvedge denim",
      "High rise, wide straight leg",
      "Hidden rivets, tonal stitching",
      "Raw, unwashed — will fade with wear",
      "Made in Japan",
    ],
    images: gallery("relaxed-denim", "Nova Relaxed Denim"),
    category: "Bottoms",
    tags: ["denim", "selvedge", "japanese"],
    options: [
      { name: "Size", values: PANTS },
      { name: "Color", values: ["Raw Indigo", "Washed Black"] },
    ],
    colors: [
      { name: "Raw Indigo", hex: "#2b3550" },
      { name: "Washed Black", hex: "#1b1b1d" },
    ],
    rating: 4.7,
    reviewCount: 88,
    reviews: buildReviews("denim", [
      ["Omar F.", "Berlin, DE", 5, "Proper raw denim", "Stiff for two weeks then perfect. Fades beautifully.", 18],
      ["Lena W.", "Portland, OR", 4, "Wide is very wide", "Love the quality. Order a size down if you want taper.", 40],
    ]),
    stock: "in-stock",
    stockCount: 17,
    collectionHandles: ["denim", "new-season"],
    createdAt: "2026-07-11",
  },
  {
    id: "gid://nova/Product/core-cap",
    handle: "nova-core-cap",
    name: "Nova Core Cap",
    subtitle: "Six-panel, unstructured, tonal mark",
    price: { amount: 48, currencyCode: "USD" },
    description:
      "A six-panel unstructured cap in brushed cotton twill with a pre-curved brim and a tonal embroidered mark. Lightweight, packable, and shaped to sit naturally after a day of wear.",
    details: [
      "Brushed cotton twill, unstructured six-panel",
      "Pre-curved brim with cotton sweatband",
      "Tonal chain-stitch embroidery",
      "Adjustable brass slider closure",
    ],
    images: gallery("core-cap", "Nova Core Cap"),
    category: "Accessories",
    tags: ["essential", "accessories"],
    options: [
      { name: "Size", values: ["One Size"] },
      { name: "Color", values: ["Ink", "Bone", "Clay", "Olive"] },
    ],
    colors: [
      { name: "Ink", hex: "#141416" },
      { name: "Bone", hex: "#eae6dc" },
      { name: "Clay", hex: "#ac8266" },
      { name: "Olive", hex: "#585c43" },
    ],
    rating: 4.5,
    reviewCount: 143,
    reviews: buildReviews("cap", [
      ["Kayla J.", "Chicago, IL", 5, "Perfect broken-in cap", "The pre-curve is spot on. Wears well under a hood.", 22],
      ["Tom S.", "Manchester, UK", 4, "Great value", "Brushed cotton feels expensive. Sizing runs true.", 47],
    ]),
    stock: "in-stock",
    stockCount: 58,
    collectionHandles: ["essentials", "accessories"],
    createdAt: "2026-04-22",
    bestSeller: true,
  },
  {
    id: "gid://nova/Product/studio-shirt",
    handle: "nova-studio-shirt",
    name: "Nova Studio Shirt",
    subtitle: "Washed poplin, camp collar",
    price: { amount: 125, currencyCode: "USD" },
    description:
      "A camp-collar shirt in washed cotton poplin with a soft hand and an easy, open drape. Designed to be worn open over a tee or closed up — the most versatile piece in the range.",
    details: [
      "Washed cotton poplin, 120gsm",
      "Open camp collar, dropped shoulder",
      "Corozo nut buttons",
      "Curved hem, single chest pocket",
    ],
    images: gallery("studio-shirt", "Nova Studio Shirt"),
    category: "Tops",
    tags: ["new", "shirting"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Bone", "Sky", "Ink"] },
    ],
    colors: [
      { name: "Bone", hex: "#efebe2" },
      { name: "Sky", hex: "#b9c6cf" },
      { name: "Ink", hex: "#15161a" },
    ],
    rating: 4.6,
    reviewCount: 74,
    reviews: buildReviews("shirt", [
      ["Marta S.", "Lisbon, PT", 5, "Wears open or closed", "The drape is the whole point. Beautiful in person.", 16],
      ["Ibrahim A.", "Dubai, AE", 4, "Great value", "Fabric is soft but not flimsy.", 35],
    ]),
    stock: "in-stock",
    stockCount: 29,
    collectionHandles: ["new-arrivals", "new-season"],
    createdAt: "2026-09-02",
  },
  {
    id: "gid://nova/Product/tech-vest",
    handle: "nova-tech-vest",
    name: "Nova Tech Vest",
    subtitle: "Bonded shell, laser-cut ventilation",
    price: { amount: 210, currencyCode: "USD" },
    description:
      "A bonded, seam-light vest engineered for layering. Laser-cut ventilation sits under the arm, a bonded chest pocket keeps a phone flat against the body, and the hem extends to sit clean over a hoodie or tee.",
    details: [
      "Bonded three-layer technical shell",
      "Laser-cut underarm ventilation",
      "Bonded zip chest pocket",
      "Extended hem, no visible stitching",
    ],
    images: gallery("tech-vest", "Nova Tech Vest"),
    category: "Outerwear",
    tags: ["technical", "outerwear", "new"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Ink", "Signal", "Sand"] },
    ],
    colors: [
      { name: "Ink", hex: "#131418" },
      { name: "Signal", hex: "#c9f03a" },
      { name: "Sand", hex: "#cdc2ac" },
    ],
    rating: 4.4,
    reviewCount: 41,
    reviews: buildReviews("vest", [
      ["Chris P.", "Copenhagen, DK", 5, "Invisible seams", "Looks like one piece of fabric. Exactly the point.", 25],
      ["Amara N.", "Toronto, ON", 4, "Runs slim", "Sleek over a hoodie. Size up if layering thick.", 41],
    ]),
    stock: "in-stock",
    stockCount: 19,
    collectionHandles: ["new-arrivals", "outerwear"],
    createdAt: "2026-09-05",
  },
  {
    id: "gid://nova/Product/everyday-shorts",
    handle: "nova-everyday-shorts",
    name: "Nova Everyday Shorts",
    subtitle: '5" inseam, loopback terry',
    price: { amount: 98, currencyCode: "USD" },
    description:
      "Our everyday short in a loopback terry that breaks in soft. A 5-inch inseam keeps the proportion sharp, with an elastic waistband and an internal drawcord for a clean, adjustable fit.",
    details: [
      "Loopback cotton terry, 320gsm",
      '5" inseam with raw-finished hem',
      "Elastic waistband with internal drawcord",
      "Side seam pockets",
    ],
    images: gallery("everyday-shorts", "Nova Everyday Shorts"),
    category: "Bottoms",
    tags: ["essential", "summer"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Bone", "Ink", "Clay", "Olive"] },
    ],
    colors: [
      { name: "Bone", hex: "#eae5da" },
      { name: "Ink", hex: "#16171b" },
      { name: "Clay", hex: "#ac8266" },
      { name: "Olive", hex: "#585c43" },
    ],
    rating: 4.5,
    reviewCount: 112,
    reviews: buildReviews("shorts", [
      ["Tyler B.", "San Diego, CA", 5, "Perfect length", "Five inches is exactly where it should be.", 19],
      ["Nina W.", "Berlin, DE", 4, "Soft after one wash", "Great terry weight, holds shape.", 38],
    ]),
    stock: "in-stock",
    stockCount: 37,
    collectionHandles: ["essentials", "new-season"],
    createdAt: "2026-06-30",
  },
  {
    id: "gid://nova/Product/premium-sweatpants",
    handle: "nova-premium-sweatpants",
    name: "Nova Premium Sweatpants",
    subtitle: "Loopback terry, tapered ankle",
    price: { amount: 155, currencyCode: "USD" },
    description:
      "A tapered sweatpant with real structure. Heavy loopback terry, a flat-front leg that stays pressed, and a ribbed ankle cuff that sits clean over any boot or trainer without bunching.",
    details: [
      "420gsm organic loopback terry",
      "Flat front, tapered leg",
      "Ribbed ankle cuff with side gusset",
      "Zip pockets, internal drawcord",
    ],
    images: gallery("premium-sweatpants", "Nova Premium Sweatpants"),
    category: "Bottoms",
    tags: ["bestseller", "loungewear", "terry"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Bone", "Ink", "Moss"] },
    ],
    colors: [
      { name: "Bone", hex: "#e8e3d7" },
      { name: "Ink", hex: "#15161a" },
      { name: "Moss", hex: "#4d5542" },
    ],
    rating: 4.7,
    reviewCount: 156,
    reviews: buildReviews("sweatpants", [
      ["Jules M.", "Los Angeles, CA", 5, "Elevated loungewear", "Looks tailored, feels like home. My most-worn piece.", 14],
      ["Sam E.", "Manchester, UK", 5, "Cuff is the detail", "No bunching over boots. Perfect length.", 33],
    ]),
    stock: "in-stock",
    stockCount: 26,
    collectionHandles: ["bestsellers", "essentials"],
    createdAt: "2026-05-19",
    bestSeller: true,
  },
  {
    id: "gid://nova/Product/signature-bag",
    handle: "nova-signature-bag",
    name: "Nova Signature Bag",
    subtitle: "22L recycled sailcloth, padded laptop sleeve",
    price: { amount: 260, currencyCode: "USD" },
    description:
      "A 22-litre daily carry in recycled sailcloth with a padded 16-inch laptop sleeve, water-resistant base and a magnetic quick-access roll top. Built to move through a commute and still look right at 1am.",
    details: [
      "22L recycled sailcloth, PFC-free DWR",
      'Padded 16" laptop and tablet sleeves',
      "Magnetic roll-top, quick-access side pocket",
      "Water-resistant coated base",
      "Fits most airline cabin requirements",
    ],
    images: gallery("signature-bag", "Nova Signature Bag"),
    category: "Accessories",
    tags: ["bestseller", "carry", "technical"],
    options: [
      { name: "Size", values: ["One Size"] },
      { name: "Color", values: ["Ink", "Bone", "Olive"] },
    ],
    colors: [
      { name: "Ink", hex: "#141518" },
      { name: "Bone", hex: "#e9e5db" },
      { name: "Olive", hex: "#575b42" },
    ],
    rating: 4.9,
    reviewCount: 189,
    reviews: buildReviews("bag", [
      ["Rhea K.", "Singapore", 5, "Replaced my work bag", "Roamed through a 14-hour flight, laptop untouched.", 8],
      ["Diego F.", "Mexico City, MX", 5, "Looks minimal, holds everything", "22L is the sweet spot. Slim when empty.", 26],
    ]),
    stock: "in-stock",
    stockCount: 21,
    collectionHandles: ["bestsellers", "accessories", "new-season"],
    createdAt: "2026-07-28",
    bestSeller: true,
    featured: true,
  },
  {
    id: "gid://nova/Product/ribbed-beanie",
    handle: "nova-ribbed-beanie",
    name: "Nova Ribbed Beanie",
    subtitle: "Merino-blend rib, double-fold cuff",
    price: { amount: 52, currencyCode: "USD" },
    description:
      "A fine-gauge rib beanie in a merino-blend yarn that regulates temperature without itch. The double-fold cuff sits above the ear and holds its shape season after season.",
    details: ["Fine-gauge merino blend rib", "Double-fold cuff", "Woven label at fold"],
    images: gallery("ribbed-beanie", "Nova Ribbed Beanie"),
    category: "Accessories",
    tags: ["accessories", "essential"],
    options: [
      { name: "Size", values: ["One Size"] },
      { name: "Color", values: ["Ink", "Bone", "Clay", "Moss", "Signal"] },
    ],
    colors: [
      { name: "Ink", hex: "#141416" },
      { name: "Bone", hex: "#eae6db" },
      { name: "Clay", hex: "#ab8367" },
      { name: "Moss", hex: "#565b41" },
      { name: "Signal", hex: "#c9f03a" },
    ],
    rating: 4.6,
    reviewCount: 67,
    reviews: buildReviews("beanie", [
      ["Alex J.", "Oslo, NO", 5, "No itch", "Rare for wool. Wears through a Scandinavian winter.", 20],
      ["Priyanka S.", "Toronto, ON", 4, "Great colour", "Cuff holds shape perfectly.", 42],
    ]),
    stock: "in-stock",
    stockCount: 73,
    collectionHandles: ["essentials", "accessories"],
    createdAt: "2026-08-05",
  },
  {
    id: "gid://nova/Product/fleece-sweatshirt",
    handle: "nova-fleece-sweatshirt",
    name: "Nova Fleece Sweatshirt",
    subtitle: "Mid-weight brushed fleece, raglan sleeve",
    price: { amount: 135, currencyCode: "USD" },
    description:
      "The mid-weight answer to the Signature Hoodie. Brushed loopback fleece with a raglan sleeve for a cleaner shoulder line, sized to sit under a jacket or stand alone.",
    details: [
      "380gsm brushed organic loopback",
      "Raglan sleeve construction",
      "Ribbed cuffs, hem and neck binding",
      "Tonal chest embroidery",
    ],
    images: gallery("fleece-sweatshirt", "Nova Fleece Sweatshirt"),
    category: "Tops",
    tags: ["essential", "fleece"],
    options: [
      { name: "Size", values: APPAREL },
      { name: "Color", values: ["Bone", "Ink", "Clay", "Signal"] },
    ],
    colors: [
      { name: "Bone", hex: "#e9e4d8" },
      { name: "Ink", hex: "#141519" },
      { name: "Clay", hex: "#ab8062" },
      { name: "Signal", hex: "#c9f03a" },
    ],
    rating: 4.6,
    reviewCount: 129,
    reviews: buildReviews("sweatshirt", [
      ["Gia L.", "Rome, IT", 5, "Perfect under a jacket", "Raglan shoulder keeps the line clean.", 17],
      ["Owen D.", "Dublin, IE", 4, "Great mid-weight", "Right thickness for autumn layering.", 36],
    ]),
    stock: "in-stock",
    stockCount: 33,
    collectionHandles: ["essentials", "new-season"],
    createdAt: "2026-08-24",
    featured: true,
  },
];

/** Builds the image/season payload shared by every collection entry. */
const ci = (handle: string, name: string, season: string) => ({
  image: { src: `/media/collection-${handle}.svg`, alt: `${name} collection`, width: 1200, height: 1500 },
  hero: { src: `/media/hero-collection-${handle}.svg`, alt: `${name} campaign`, width: 1920, height: 1200 },
  season,
});

export const collections: Collection[] = [
  {
    handle: "new-arrivals",
    name: "New Arrivals",
    description: "The latest drop — new pieces, restocked once and gone.",
    longDescription:
      "Season after season we release in small, deliberate runs. Nothing here is restocked twice, so when a size goes, it is gone. This is the newest expression of the NOVA system — technical outerwear, washed shirting and heavyweight jersey.",
    ...ci("new-arrivals", "New Arrivals", "AW26"),
  },
  {
    handle: "essentials",
    name: "Essentials",
    description: "The permanent NOVA core — reworked, never retired.",
    longDescription:
      "The pieces that make up the permanent NOVA uniform. Designed to be worn daily, washed hard and restyled constantly. If you only ever bought four things from us, these would be the four.",
    ...ci("essentials", "Essentials", "Core"),
  },
  {
    handle: "bestsellers",
    name: "Bestsellers",
    description: "Our most-worn, most-reordered, most-recommended pieces.",
    longDescription:
      "Ranked by reorders, not by marketing spend. Every piece below has been bought again by someone who already owned it. That is the only metric that matters to us.",
    ...ci("bestsellers", "Bestsellers", "All Time"),
  },
  {
    handle: "outerwear",
    name: "Outerwear",
    description: "Technical shells, bonded layers and all-season jackets.",
    longDescription:
      "Built for weather that does not cooperate. Water-repellent ripstops, bonded laminates and ventilation engineered into the pattern — never stuck on afterwards.",
    ...ci("outerwear", "Outerwear", "AW26"),
  },
  {
    handle: "accessories",
    name: "Accessories",
    description: "Caps, bags and knitwear that finish the silhouette.",
    longDescription:
      "The last five percent that makes a look read as considered. Unstructured caps, fine-gauge merino rib and a 22-litre carry built for commute and long-haul alike.",
    ...ci("accessories", "Accessories", "Core"),
  },
  {
    handle: "new-season",
    name: "AW26 Season",
    description: "The full autumn/winter 2026 system, end to end.",
    longDescription:
      "A complete system built for layering: heavyweight jersey, brushed fleece, technical shells and rigid denim that earns its fades over years. Designed to be worn together.",
    ...ci("new-season", "AW26 Season", "AW26"),
  },
  {
    handle: "denim",
    name: "Denim",
    description: "Rigid Japanese selvedge, cut to earn its fades.",
    longDescription:
      "We source denim the way we source everything: one mill, one weight, no compromise. Raw 13.5oz selvedge that starts stiff and becomes yours.",
    ...ci("denim", "Denim", "Core"),
  },
  {
    handle: "footwear",
    name: "Footwear",
    description: "Engineered trainers built for city miles.",
    longDescription:
      "A tight footwear focus. One silhouette, perfected across knit upper, midsole density and outsole compound, then offered in three colourways that work with everything else we make.",
    ...ci("footwear", "Footwear", "AW26"),
  },
];

/** Fictional sitewide customer reviews used on the home page. */
export const testimonials: Review[] = [
  {
    id: "t1",
    author: "Amara Okonkwo",
    location: "London, UK",
    rating: 5,
    title: "The fleece changed my wardrobe",
    body: "I bought the Signature Hoodie on a whim in March. It is now the only hoodie I own — I have three, all NOVA. The weight is the difference. Nothing else feels like this out of the box.",
    date: "2026-09-01",
    verified: true,
  },
  {
    id: "t2",
    author: "Diego Ferreira",
    location: "São Paulo, BR",
    rating: 5,
    title: "Finally, a brand that fits",
    body: "Every NOVA piece fits the same way: boxy but deliberate, sized true. I stopped guessing my size three years ago. That consistency is rarer than it should be in this category.",
    date: "2026-08-24",
    verified: true,
  },
  {
    id: "t3",
    author: "Sofia Lindqvist",
    location: "Stockholm, SE",
    rating: 5,
    title: "The bag survives everything",
    body: "Six months of daily commute, one long-haul flight and a lot of rain. The sailcloth has not sagged and the laptop sleeve is still perfect. I did not expect to write a review about a backpack.",
    date: "2026-08-11",
    verified: true,
  },
  {
    id: "t4",
    author: "Jayden Ruiz",
    location: "New York, US",
    rating: 4,
    title: "Exceptional quality, size up if unsure",
    body: "Build quality is honestly a tier above. The Utility Jacket is structured, not shapeless. Only note — it fits close over a hoodie, so I sized up and it is perfect.",
    date: "2026-07-29",
    verified: true,
  },
  {
    id: "t5",
    author: "Mei Tanaka",
    location: "Tokyo, JP",
    rating: 5,
    title: "The denim was worth the wait",
    body: "Six months in and the fades are starting to come in exactly where they should. This is what raw denim is supposed to feel like — a garment that records where you are in it.",
    date: "2026-07-15",
    verified: true,
  },
  {
    id: "t6",
    author: "Noah Bennett",
    location: "Melbourne, AU",
    rating: 5,
    title: "Support answered in an hour",
    body: "Had a sizing question at 11pm. Got a real answer — not a bot — in under an hour, and they helped me order the right size first time. Rare combination with a product this good.",
    date: "2026-06-30",
    verified: true,
  },
];

/** Instagram-style gallery tiles (fictional handles, local artwork). */
export const socialTiles = [
  { src: "/media/social-1.svg", alt: "Community look 1 — @nova.wardrobe", handle: "@nova.wardrobe", likes: 4823 },
  { src: "/media/social-2.svg", alt: "Community look 2 — @mika.nova", handle: "@mika.nova", likes: 3157 },
  { src: "/media/social-3.svg", alt: "Community look 3 — @thequietuniform", handle: "@thequietuniform", likes: 9014 },
  { src: "/media/social-4.svg", alt: "Community look 4 — @studioravine", handle: "@studioravine", likes: 2241 },
  { src: "/media/social-5.svg", alt: "Community look 5 — @oddnrams", handle: "@oddnrams", likes: 6740 },
  { src: "/media/social-6.svg", alt: "Community look 6 — @kinfolk.studio", handle: "@kinfolk.studio", likes: 1388 },
];
