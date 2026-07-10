"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GOOGLE_ANALYTICS_ID = "G-D5XT9FCNRG";
const DEFAULT_PAGE_TITLE = "Ice Breaker Games";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    const timeoutId = window.setTimeout(() => {
      const pageTitle = document.title.trim() || DEFAULT_PAGE_TITLE;

      window.gtag?.("event", "page_view", {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
        send_to: GOOGLE_ANALYTICS_ID,
      });
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  return null;
}
