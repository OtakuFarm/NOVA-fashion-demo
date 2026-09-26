import type { Metadata, Viewport } from "next";

import "./globals.css";

import { AnnouncementBar } from "@/components/layout/announcement";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { StoreProvider } from "@/components/store";
import { ToastProvider } from "@/components/toast";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} Premium Streetwear`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "premium streetwear",
    "heavyweight hoodie",
    "oversized tee",
    "technical outerwear",
    "selvedge denim",
    "minimal fashion",
    "NOVA",
  ],
  authors: [{ name: `${site.name} Studio` }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/media/og.svg", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/media/og.svg"],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>
        <ToastProvider>
          <StoreProvider>
            <AnnouncementBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </StoreProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
