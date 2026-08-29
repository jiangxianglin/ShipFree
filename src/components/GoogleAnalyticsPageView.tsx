"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

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

/**
 * SPA-safe GA4 pageviews + engagement.
 * Custom `page_view` events alone often report ~0s engagement time because
 * GA4 never receives `user_engagement` / config-driven page transitions.
 */
export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageStartRef = useRef(Date.now());
  const pathRef = useRef("");
  const engagedMsRef = useRef(0);
  const visibleRef = useRef(
    typeof document === "undefined" ? true : document.visibilityState === "visible"
  );

  useEffect(() => {
    const search = searchParams.toString();
    const pagePath = search ? `${pathname}?${search}` : pathname;

    const flushEngagement = (reason: "route" | "hide") => {
      if (!window.gtag || !pathRef.current) return;

      if (visibleRef.current) {
        engagedMsRef.current += Math.max(0, Date.now() - pageStartRef.current);
      }

      const engaged = Math.round(engagedMsRef.current);
      if (engaged < 50) {
        if (reason === "route") {
          engagedMsRef.current = 0;
          pageStartRef.current = Date.now();
        }
        return;
      }

      window.gtag("event", "user_engagement", {
        engagement_time_msec: engaged,
        page_path: pathRef.current,
        send_to: GOOGLE_ANALYTICS_ID,
      });

      engagedMsRef.current = 0;
      pageStartRef.current = Date.now();
    };

    // Close out previous virtual page before opening the new one
    if (pathRef.current && pathRef.current !== pagePath) {
      flushEngagement("route");
    }

    pathRef.current = pagePath;
    pageStartRef.current = Date.now();
    engagedMsRef.current = 0;
    visibleRef.current = document.visibilityState === "visible";

    const timeoutId = window.setTimeout(() => {
      const pageTitle = document.title.trim() || DEFAULT_PAGE_TITLE;
      // `config` page_path is the supported SPA pattern (resets engagement clock)
      window.gtag?.("config", GOOGLE_ANALYTICS_ID, {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: pagePath,
      });
    }, 120);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushEngagement("hide");
        visibleRef.current = false;
      } else {
        visibleRef.current = true;
        pageStartRef.current = Date.now();
      }
    };

    const onPageHide = () => flushEngagement("hide");

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname, searchParams]);

  return null;
}
