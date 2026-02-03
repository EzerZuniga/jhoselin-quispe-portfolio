/**
 * SEO Configuration
 * Centralized SEO defaults and metadata helpers for the portfolio.
 */

export interface SeoConfig {
  /** Site name used in titles and meta */
  siteName: string;
  /** Default page title */
  defaultTitle: string;
  /** Default meta description */
  defaultDescription: string;
  /** Site URL (without trailing slash) */
  siteUrl: string;
  /** Default Open Graph image */
  defaultImage: string;
  /** Twitter handle (without @) */
  twitterHandle?: string;
  /** Author name */
  author: string;
  /** Site language */
  language: string;
  /** Keywords for SEO */
  keywords: string[];
}

export const seoConfig: SeoConfig = {
  siteName: "Jhoselin",
  defaultTitle: "Jhoselin · estudiante de Ingenieria Industrial",
  defaultDescription:
    "Portafolio profesional de Jhoselin. Desarrolladora frontend especializada en crear experiencias digitales accesibles, intuitivas y visualmente atractivas con React, TypeScript y Tailwind CSS.",
  siteUrl: "https://jhoselin-quispe-luque.netlify.app",
  defaultImage: "/images/og-image.jpg",
  twitterHandle: "jhoselinquispe",
  author: "Jhoselin",
  language: "es",
  keywords: [
    "Jhoselin",
    "Jhoselin Quispe",
    "Jhoselin Quispe Luque",
  ],
};

/**
 * Generates page-specific SEO metadata.
 */
export interface PageSeoOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  publishedAt?: string;
  modifiedAt?: string;
  noIndex?: boolean;
}

export function generatePageSeo(
  path: string,
  options: PageSeoOptions = {}
): {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article";
} {
  const {
    title = seoConfig.defaultTitle,
    description = seoConfig.defaultDescription,
    image = seoConfig.defaultImage,
    type = "website",
  } = options;

  const fullTitle =
    title === seoConfig.defaultTitle
      ? title
      : `${title} | ${seoConfig.siteName}`;

  const canonical = `${seoConfig.siteUrl}${path}`;
  const fullImage = image.startsWith("http")
    ? image
    : `${seoConfig.siteUrl}${image}`;

  return {
    title: fullTitle,
    description,
    canonical,
    image: fullImage,
    type,
  };
}

/**
 * JSON-LD structured data generators.
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: seoConfig.author,
    alternateName: ["Jhoselin Quispe", "Jhoselin Quispe Luque"],
    url: seoConfig.siteUrl,
    jobTitle: "Frontend Developer & UI Designer",
    sameAs: [
      `https://twitter.com/${seoConfig.twitterHandle}`,
      "https://github.com/jhoselinquispe",
      "https://linkedin.com/in/jhoselinquispe",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    author: {
      "@type": "Person",
      name: seoConfig.author,
    },
  };
}

export function generateArticleSchema(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    image: options.image ?? seoConfig.defaultImage,
    datePublished: options.publishedAt,
    dateModified: options.modifiedAt ?? options.publishedAt,
    author: {
      "@type": "Person",
      name: seoConfig.author,
      url: seoConfig.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: seoConfig.author,
    },
  };
}
