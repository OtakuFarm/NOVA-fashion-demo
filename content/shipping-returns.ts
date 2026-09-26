import type { PolicySection } from "@/components/content/policy-document";

/** Shipping & Returns content. All figures are fictional demo content. */
export const SHIPPING_RETURNS: { intro: string; updated: string; sections: PolicySection[] } = {
  updated: "1 September 2026",
  intro:
    "We try to make both sides of this simple: fast, tracked shipping and returns that cost you nothing. This page sets out exactly how each part works.",
  sections: [
    {
      heading: "Shipping",
      body: [
        {
          type: "p",
          text: "Orders are packed and dispatched within one business day. You will receive a dispatch confirmation with a tracking link as soon as the label is created.",
        },
        {
          type: "ul",
          items: [
            "Free standard shipping on orders over $150 within the contiguous United States.",
            "$12 flat standard shipping on orders under $150.",
            "Express delivery available at checkout, typically 1–2 business days.",
            "International shipping calculated at checkout, 5–10 business days after dispatch.",
            "Duties and import taxes are the responsibility of the recipient outside the United States.",
          ],
        },
      ],
    },
    {
      heading: "Delivery estimates",
      body: [
        {
          type: "ul",
          items: [
            "United States — 2 to 4 business days after dispatch.",
            "Canada — 3 to 6 business days after dispatch.",
            "United Kingdom & Europe — 5 to 8 business days after dispatch.",
            "Rest of world — 7 to 12 business days after dispatch.",
          ],
        },
      ],
    },
    {
      heading: "Returns",
      body: [
        {
          type: "p",
          text: "You have 30 days from the day your order arrives to return any unworn item with its tags attached. Returns are always free — we include a prepaid label in every order, and there is no minimum order value.",
        },
        {
          type: "ul",
          items: [
            "Start a return by replying to your dispatch email or contacting the studio.",
            "Include the original packaging where possible.",
            "Refunds are issued to the original payment method within 5–7 business days of the return reaching our warehouse.",
            "Original shipping charges are not refunded unless the return is our error.",
          ],
        },
      ],
    },
    {
      heading: "Exchanges",
      body: [
        {
          type: "p",
          text: "Because every drop is a single run, we cannot always hold a replacement size. The most reliable route is to return the item and place a new order immediately — that guarantees the size is yours. Reply to your dispatch email and we will mark the return as priority so it turns around faster.",
        },
      ],
    },
    {
      heading: "Faulty or incorrect items",
      body: [
        {
          type: "p",
          text: "If something arrives damaged, faulty or simply not what you ordered, contact us within 30 days with a photo. We will arrange a replacement or a full refund including any shipping you paid, and cover the return postage. There is no restocking fee and no argument to have.",
        },
      ],
    },
    {
      heading: "Repairs",
      body: [
        {
          type: "p",
          text: "Every NOVA garment includes complimentary repairs on seams, cuffs and hardware for two years from delivery. Send a photo and your order number and we will arrange it — you cover postage to us, we cover the repair and return shipping.",
        },
        {
          type: "p",
          text: "Beyond two years we still repair, at cost, for as long as we make the piece.",
        },
      ],
    },
    {
      heading: "Cancellations",
      body: [
        {
          type: "p",
          text: "You can cancel any order before it is dispatched by contacting the studio immediately. Once a parcel has left our warehouse we can no longer intercept it, but a free return is always available instead.",
        },
      ],
    },
  ],
};
