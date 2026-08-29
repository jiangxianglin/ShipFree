export type AnalyticsEventName =
  | "copy_game_instructions"
  | "print_game"
  | "click_related_game"
  | "use_game_filter"
  | "play_emoji_intro"
  | "play_chainlink";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  eventName: AnalyticsEventName,
  parameters: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, {
    page_location: window.location.href,
    page_title: document.title,
    ...parameters,
  });
}
