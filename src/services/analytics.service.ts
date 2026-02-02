/**
 * Analytics Service
 * Centralized analytics tracking for the portfolio.
 */

export interface AnalyticsEvent {
  /** Event name/action */
  name: string;
  /** Event category */
  category?: string;
  /** Event label */
  label?: string;
  /** Event value */
  value?: number;
  /** Additional properties */
  properties?: Record<string, string | number | boolean>;
}

export interface PageViewEvent {
  path: string;
  title?: string;
  referrer?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
  }
}

/**
 * Checks if we're in production environment.
 */
function isProduction(): boolean {
  return import.meta.env.PROD;
}

/**
 * Tracks a custom analytics event.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!isProduction()) {
    console.log("[Analytics] Event:", event);
    return;
  }

  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event.name, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.properties,
    });
  }

  // Plausible Analytics
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event.name, {
      props: {
        category: event.category,
        label: event.label,
        ...event.properties,
      },
    });
  }
}

/**
 * Tracks a page view.
 */
export function trackPageView(event: PageViewEvent): void {
  if (!isProduction()) {
    console.log("[Analytics] PageView:", event);
    return;
  }

  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: event.path,
      page_title: event.title,
      page_referrer: event.referrer,
    });
  }
}

/**
 * Tracks an outbound link click.
 */
export function trackOutboundLink(url: string, label?: string): void {
  trackEvent({
    name: "click",
    category: "outbound",
    label: label || url,
    properties: {
      url,
    },
  });
}

/**
 * Tracks a file download.
 */
export function trackDownload(fileName: string, fileType?: string): void {
  trackEvent({
    name: "file_download",
    category: "download",
    label: fileName,
    properties: {
      file_name: fileName,
      file_extension: fileType || fileName.split(".").pop() || "unknown",
    },
  });
}

/**
 * Tracks a form submission.
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent({
    name: "form_submission",
    category: "form",
    label: formName,
    properties: {
      form_name: formName,
      success,
    },
  });
}

/**
 * Tracks a scroll depth milestone.
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 100): void {
  trackEvent({
    name: "scroll",
    category: "engagement",
    label: `${depth}%`,
    value: depth,
  });
}

/**
 * Tracks time spent on page.
 */
export function trackTimeOnPage(seconds: number, path: string): void {
  trackEvent({
    name: "time_on_page",
    category: "engagement",
    value: seconds,
    properties: {
      page_path: path,
      duration_seconds: seconds,
    },
  });
}

/**
 * Tracks a search query.
 */
export function trackSearch(query: string, resultsCount?: number): void {
  trackEvent({
    name: "search",
    category: "search",
    label: query,
    properties: {
      search_term: query,
      results_count: resultsCount ?? 0,
    },
  });
}
