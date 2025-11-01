import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateWebSiteSchema, generateLocalBusinessSchema } from "@/lib/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.klyx.fr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Klyx Blog - Création de sites web à Bordeaux",
    template: "%s | Klyx Blog",
  },
  description: "Blog officiel de Klyx Studio, agence de création de sites web à Bordeaux. Découvrez nos conseils, guides et actualités sur le développement web, le SEO et plus encore.",
  keywords: ["Klyx", "création site web", "agence web Bordeaux", "développement web", "SEO", "Bordeaux"],
  authors: [{ name: "Klyx Studio", email: "contact@klyx.fr" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Klyx Blog",
    title: "Klyx Blog - Création de sites web à Bordeaux",
    description: "Blog officiel de Klyx Studio - Conseils et actualités sur la création de sites web",
    images: [
      {
        url: `/assets/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Klyx Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klyx Blog - Création de sites web à Bordeaux",
    description: "Blog officiel de Klyx Studio - Conseils et actualités sur la création de sites web",
    images: [`/assets/og-default.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebSiteSchema();
  const businessSchema = generateLocalBusinessSchema();

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />

        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
