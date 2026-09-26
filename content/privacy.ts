import type { PolicySection } from "@/components/content/policy-document";

/** Privacy Policy content. Fictional and written for this demo project. */
export const PRIVACY: { intro: string; updated: string; sections: PolicySection[] } = {
  updated: "1 September 2026",
  intro:
    "This policy explains what NOVA collects, why we collect it and the control you have over it. It is written to be read — if anything here is unclear, contact us and we will explain it properly.",
  sections: [
    {
      heading: "The short version",
      body: [
        {
          type: "p",
          text: "We collect only what we need to run a store and serve you: your contact details, your order history and the minimum technical data required to keep the site working. We do not sell personal data, and we do not build advertising profiles of you.",
        },
      ],
    },
    {
      heading: "What we collect",
      body: [
        {
          type: "ul",
          items: [
            "Order information — name, delivery address, email address and what you bought.",
            "Account information — if you create an account, your email address and order history.",
            "Payment confirmation — we receive confirmation that a payment succeeded; we never see or store full card numbers.",
            "Technical data — IP address, browser type and pages visited, collected in aggregate to keep the site secure and fast.",
            "Marketing preferences — only if you choose to subscribe, and only the email address you provide.",
          ],
        },
      ],
    },
    {
      heading: "How we use it",
      body: [
        {
          type: "ul",
          items: [
            "To take payment, ship your order and handle returns or repairs.",
            "To answer your questions and provide support.",
            "To send order updates, and marketing email only if you have opted in.",
            "To detect fraud and abuse, and to meet our legal and tax obligations.",
            "To understand which pages are useful so we can improve the store.",
          ],
        },
      ],
    },
    {
      heading: "Cookies and local storage",
      body: [
        {
          type: "p",
          text: "This demonstration site uses no advertising or cross-site tracking cookies. Your bag, wishlist and recently viewed products are stored in your browser's local storage so the site remembers them between visits. That data stays on your device, is readable only by this site, and is never transmitted to a server. Clearing your browser storage removes it permanently.",
        },
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        {
          type: "p",
          text: "We share only what is necessary to fulfil your order: your name and address with the payment processor and the carrier delivering your parcel. We do not share your details with advertisers, data brokers or social platforms, and we never sell data under any circumstances.",
        },
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        {
          type: "p",
          text: "Order records are kept for as long as required by tax and accounting law, typically seven years. Marketing subscriptions are kept until you unsubscribe. Support correspondence is kept for two years so we have context if you contact us again about the same issue.",
        },
      ],
    },
    {
      heading: "Your rights",
      body: [
        {
          type: "ul",
          items: [
            "Request a copy of the personal data we hold about you.",
            "Ask us to correct anything inaccurate.",
            "Ask us to delete your data, where we are not required to keep it.",
            "Object to how we use your data, or withdraw marketing consent at any time.",
            "Complain to your local data protection authority.",
          ],
        },
        {
          type: "p",
          text: "To exercise any of these rights, email us. We respond within 30 days and there is no charge.",
        },
      ],
    },
    {
      heading: "Security",
      body: [
        {
          type: "p",
          text: "All traffic to this site is encrypted in transit. Access to customer data inside the studio is limited to those who need it to do their job, and every account uses strong authentication. No system is perfect, but we treat a data breach as a serious incident and would notify you and the relevant authority promptly if one occurred.",
        },
      ],
    },
    {
      heading: "Children",
      body: [
        {
          type: "p",
          text: "This store is not directed at anyone under 16, and we do not knowingly collect data from children. If you believe a child has given us personal information, contact us and we will delete it.",
        },
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        {
          type: "p",
          text: "We update this policy when our practices change. The date at the top always reflects the current version, and for material changes we will notify customers by email before they take effect.",
        },
      ],
    },
  ],
};
