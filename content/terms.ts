import type { PolicySection } from "@/components/content/policy-document";

/** Terms of Service content. Fictional and written for this demo project. */
export const TERMS: { intro: string; updated: string; sections: PolicySection[] } = {
  updated: "1 September 2026",
  intro:
    "These terms cover your use of this site and any purchase you make from it. By ordering from NOVA you agree to them. They are written in plain language on purpose.",
  sections: [
    {
      heading: "About this store",
      body: [
        {
          type: "p",
          text: "NOVA is a fictional brand created as a portfolio demonstration project. Products, pricing, reviews, customer names and company details shown on this site are invented for the demo. No real goods are sold, no orders are fulfilled and no payment is ever processed.",
        },
      ],
    },
    {
      heading: "Eligibility to order",
      body: [
        {
          type: "p",
          text: "You must be at least 18 years old, or the age of majority where you live, to enter into a contract with us. If you are ordering on behalf of someone else, you confirm you have their authority to do so.",
        },
      ],
    },
    {
      heading: "Products and pricing",
      body: [
        {
          type: "p",
          text: "We aim to describe every garment accurately. Weights, measurements and colourways are given in good faith but may vary slightly between production runs. Prices are shown in US dollars and include applicable sales tax where required at checkout. If a piece is listed at an incorrect price, we will contact you before dispatch and you may cancel without charge.",
        },
      ],
    },
    {
      heading: "Orders and acceptance",
      body: [
        {
          type: "p",
          text: "Your order is an offer to buy. A contract forms only when we send the dispatch confirmation. Because every drop is produced in a single run, an item may sell out between your order and our dispatch — in that case we will refund you in full within three business days.",
        },
      ],
    },
    {
      heading: "Payment",
      body: [
        {
          type: "p",
          text: "Payment is taken at checkout through our payment processor. Full card details are never held on our systems. This demonstration site has checkout disabled and does not process any payment at all.",
        },
      ],
    },
    {
      heading: "Delivery",
      body: [
        {
          type: "p",
          text: "Delivery estimates are estimates, not guarantees. Risk of loss transfers to you on delivery. If a parcel is lost or arrives damaged, contact us and we will make it right — see our shipping and returns page for the full detail.",
        },
      ],
    },
    {
      heading: "Returns and cancellation",
      body: [
        {
          type: "p",
          text: "You may cancel within 14 days of ordering, and return any unworn item within 30 days of delivery, free of charge. Your statutory rights as a consumer are not affected by anything on this page.",
        },
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        {
          type: "p",
          text: "The NOVA name, wordmark, site design, product designs and copy are owned by the brand and protected by intellectual property law. You may not reproduce, resell or use them commercially without written permission. You may share links to our pages and use our content for personal, non-commercial purposes.",
        },
      ],
    },
    {
      heading: "Acceptable use",
      body: [
        {
          type: "ul",
          items: [
            "Do not attempt to disrupt, overload or gain unauthorised access to the site.",
            "Do not use the site for anything unlawful, or scrape content at a rate that degrades it for others.",
            "Do not submit reviews, reviews or content that is false, misleading or defamatory.",
            "Do not impersonate us or misrepresent your affiliation with the brand.",
          ],
        },
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        {
          type: "p",
          text: "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot lawfully be limited. Subject to that, our total liability arising from any order is limited to the amount you paid for that order.",
        },
      ],
    },
    {
      heading: "Governing law",
      body: [
        {
          type: "p",
          text: "These terms are governed by the laws of the jurisdiction in which the brand is established, and the courts of that jurisdiction have exclusive jurisdiction, without prejudice to any mandatory consumer protections available where you live.",
        },
      ],
    },
    {
      heading: "Contact",
      body: [
        {
          type: "p",
          text: "Questions about these terms can be sent to the studio using the contact page. We read every message and reply within one business day.",
        },
      ],
    },
  ],
};
