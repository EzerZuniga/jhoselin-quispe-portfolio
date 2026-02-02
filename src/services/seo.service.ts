/**
 * SEO Service
 * Utilities for generating SEO-related content and structured data.
 */

import { seoConfig } from "@seo/seo.config";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates breadcrumb structured data for a page.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generates FAQ structured data.
 */
export function generateFaqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates project/creative work structured data.
 */
export function generateProjectSchema(project: {
  name: string;
  description: string;
  url: string;
  image?: string;
  dateCreated?: string;
  technologies?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    image: project.image,
    dateCreated: project.dateCreated,
    creator: {
      "@type": "Person",
      name: seoConfig.author,
    },
    keywords: project.technologies?.join(", "),
  };
}

/**
 * Generates event structured data.
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url?: string;
  isOnline?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: event.isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: event.isOnline
      ? {
          "@type": "VirtualLocation",
          url: event.url,
        }
      : {
          "@type": "Place",
          name: event.location,
        },
    organizer: {
      "@type": "Person",
      name: seoConfig.author,
    },
  };
}

/**
 * Generates canonical URL for a path.
 */
export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${seoConfig.siteUrl}${cleanPath}`;
}

/**
 * Strips HTML tags from a string for meta descriptions.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/**
 * Truncates text for meta descriptions (recommended max 160 chars).
 */
export function truncateDescription(text: string, maxLength = 155): string {
  const stripped = stripHtml(text);

  if (stripped.length <= maxLength) {
    return stripped;
  }

  const truncated = stripped.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > 0
    ? `${truncated.substring(0, lastSpace)}…`
    : `${truncated}…`;
}
