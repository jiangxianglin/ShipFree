"use client";

import { trackEvent } from "@/lib/analytics";
import { useMemo, useState } from "react";
import styles from "./game-detail.module.css";

type GameActionsProps = {
  title: string;
  players?: string;
  duration?: string;
  materials?: string;
  steps?: string;
  /** When true, render ghost CTAs for dark hero backgrounds */
  variant?: "hero" | "body";
};

export function GameActions({
  title,
  players,
  duration,
  materials,
  steps,
  variant = "body",
}: GameActionsProps) {
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

  const primaryClass = styles.ctaPrimary;
  const ghostClass = variant === "hero" ? styles.ctaGhost : styles.ctaGhostDark;

  if (variant === "hero") {
    return (
      <div className={`${styles.ctaRow} print:hidden`}>
        <button type="button" onClick={copyInstructions} className={primaryClass}>
          {copied ? "Copied instructions" : "Copy instructions"}
        </button>
        <button type="button" onClick={printGame} className={ghostClass}>
          Print this game
        </button>
        <a href="/games" onClick={trackSimilarGamesClick} className={ghostClass}>
          Browse all games
        </a>
      </div>
    );
  }

  return (
    <div className={`${styles.actionsBand} print:hidden`}>
      <p className={styles.actionsLabel}>Save this activity</p>
      <div className={styles.actionsRow}>
        <button type="button" onClick={copyInstructions} className={primaryClass}>
          {copied ? "Copied instructions" : "Copy instructions"}
        </button>
        <button type="button" onClick={printGame} className={ghostClass}>
          Print this game
        </button>
        <a href="/games" onClick={trackSimilarGamesClick} className={ghostClass}>
          Browse similar games
        </a>
      </div>
    </div>
  );
}
