"use client";

import { trackEvent } from "@/lib/analytics";
import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./game-detail-editorial.module.css";

type EditorialGameActionsProps = {
  title: string;
  players?: string | null;
  duration?: string | null;
  materials?: string | null;
  steps?: string | null;
};

export function EditorialGameActions({
  title,
  players,
  duration,
  materials,
  steps,
}: EditorialGameActionsProps) {
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

  return (
    <div className={styles.actions}>
      <p className={styles.actionsLabel}>Save this activity</p>
      <div className={styles.actionsRow}>
        <button type="button" onClick={copyInstructions} className={styles.actionPrimary}>
          {copied ? "Copied instructions" : "Copy instructions"}
        </button>
        <button type="button" onClick={printGame} className={styles.actionGhost}>
          Print this game
        </button>
        <Link href="/games-like-two-truths-and-a-lie" className={styles.actionGhost}>
          Games like Two Truths
        </Link>
      </div>
    </div>
  );
}
