import Footer from "@/app/_components/footer";
import { SITE_NAME, SITE_DESCRIPTION, HOME_OG_IMAGE_URL, SITE_URL, SITE_KEYWORDS, AUTHOR } from "@/lib/constants";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { ScrollToTop } from "@/app/_components/scroll-to-top";
import { ProjectInfo } from "@/app/_components/project-info";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Blog Lập Trình & Công Nghệ`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: "technology",
  classification: "Blog",
  openGraph: {
    title: {
      default: `${SITE_NAME} - Blog Lập Trình & Công Nghệ`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}&author=${encodeURIComponent(AUTHOR.name)}`,
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION,
        type: "image/png",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: `${SITE_NAME} - Blog Lập Trình & Công Nghệ`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/api/og?title=${encodeURIComponent(SITE_NAME)}&author=${encodeURIComponent(AUTHOR.name)}`],
    creator: "@trahoangdev",
    site: "@trahoangdev",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} RSS Feed` }],
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  other: {
    "msapplication-TileColor": "#0f172a",
  },
};

import { Analytics } from "@vercel/analytics/react";

// JSON-LD Structured Data for Website
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  author: {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.url,
    image: `${SITE_URL}${AUTHOR.image}`,
    jobTitle: AUTHOR.jobTitle,
    sameAs: AUTHOR.sameAs,
  },
  publisher: {
    "@type": "Person",
    name: AUTHOR.name,
    url: AUTHOR.url,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/tags/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "vi-VN",
};

// JSON-LD for Organization/Person
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  url: SITE_URL,
  image: `${SITE_URL}${AUTHOR.image}`,
  jobTitle: AUTHOR.jobTitle,
  worksFor: {
    "@type": "Organization",
    name: "HUTECH",
  },
  sameAs: AUTHOR.sameAs,
  knowsAbout: ["Java", "Spring Boot", "JavaScript", "TypeScript", "React", "Next.js", "Web Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(inter.className, "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200")}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="min-h-screen flex flex-col justify-between" suppressHydrationWarning>
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <ProjectInfo />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
