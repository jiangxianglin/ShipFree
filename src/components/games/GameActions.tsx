"use client";

import { trackEvent } from "@/lib/analytics";
import { useMemo, useState } from "react";

type GameActionsProps = {
  title: string;
  players?: string;
  duration?: string;
  materials?: string;
  steps?: string;
};

export function GameActions({ title, players, duration, materials, steps }: GameActionsProps) {
  const [copied, setCopied] = useState(false);

  const instructions = useMemo(() => {
    const parts = [
      `${title} icebreaker`,
      players ? `Players: ${players}` : null,
      duration ? `Time: ${duration}` : null,
      materials ? `Materials:\n${materials}` : null,
      steps ? `How to play:\n${steps}` : null,
    ].filter(Boolean);

    return parts.join("\n\n");
  }, [duration, materials, players, steps, title]);

  async function copyInstructions() {
    await navigator.clipboard.writeText(instructions);
    trackEvent("copy_game_instructions", {
      game_title: title,
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function printGame() {
    trackEvent("print_game", {
      game_title: title,
    });
    window.print();
  }

  function trackSimilarGamesClick() {
    trackEvent("click_related_game", {
      game_title: title,
      destination: "/games",
      link_text: "Browse similar games",
    });
  }

  return (
    <div className="print:hidden rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-200">
        Save this activity
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyInstructions}
          className="inline-flex items-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          {copied ? "Copied instructions" : "Copy instructions"}
        </button>
        <button
          type="button"
          onClick={printGame}
          className="inline-flex items-center rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:bg-gray-950 dark:text-emerald-200 dark:hover:bg-emerald-950"
        >
          Print this game
        </button>
        <a
          href="/games"
          onClick={trackSimilarGamesClick}
          className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-900"
        >
          Browse similar games
        </a>
      </div>
    </div>
  );
}
