import {
  createContext,
  useContext,
  useCallback,
  type ReactNode,
} from "react";

/* ============================================
   AnalyticsProvider Component
   Context provider for analytics tracking across React islands.
   ============================================ */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

interface AnalyticsContextType {
  trackEvent: (event: AnalyticsEvent) => void;
  trackPageView: (path: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

interface AnalyticsProviderProps {
  children: ReactNode;
  /** Enable analytics tracking (disabled in dev by default) */
  enabled?: boolean;
}

export function AnalyticsProvider({
  children,
  enabled = import.meta.env.PROD,
}: AnalyticsProviderProps) {
  const trackEvent = useCallback(
    (event: AnalyticsEvent) => {
      if (!enabled) {
        console.log("[Analytics] Event:", event);
        return;
      }

      // Integration with analytics services (e.g., Google Analytics, Plausible)
      // This is a placeholder for actual implementation
      if (typeof window !== "undefined" && "gtag" in window) {
        (window as Window & { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          event.name,
          event.properties
        );
      }
    },
    [enabled]
  );

  const trackPageView = useCallback(
    (path: string) => {
      if (!enabled) {
        console.log("[Analytics] PageView:", path);
        return;
      }

      if (typeof window !== "undefined" && "gtag" in window) {
        (window as Window & { gtag: (...args: unknown[]) => void }).gtag(
          "config",
          import.meta.env.PUBLIC_GA_ID || "",
          {
            page_path: path,
          }
        );
      }
    },
    [enabled]
  );

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}

export default AnalyticsProvider;
