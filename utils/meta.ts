import type { Metadata } from "next";

// Usage in a page or layout:
// export const metadata = buildMeta({ title: "About", description: "Who we are", path: "/about" });
//
// Pass `path` on every indexable page. It sets the canonical URL, and it's left
// out when omitted so pages don't inherit another page's canonical (e.g. the
// root layout's) and tell search engines they're a duplicate of it.

export interface MetaOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
}

export const SITE = {
  name: "Stanley Garage Door Specialist",
  baseUrl: "https://stanleygaragedoorspecialist.com",
  defaultImage: "/home-hero.png",
  defaultDescription:
    "Garage door repair, installation, and maintenance in Tampa Bay and Pinellas County. Fast, reliable service for springs, openers, cables, and more. Call today for a free quote.",
} as const;

export function buildMeta({
  title,
  description = SITE.defaultDescription,
  path,
  image = SITE.defaultImage,
  type = "website",
  noindex = false,
}: MetaOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;

  return {
    metadataBase: new URL(SITE.baseUrl),
    title: fullTitle,
    description,
    alternates: path ? { canonical: path } : undefined,
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      ...(path && { url: path }),
      siteName: SITE.name,
      type,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
