"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "./play-panel.module.css";

const EMOJI_PALETTE = [
  "😀",
  "🙂",
  "😎",
  "🤩",
  "😴",
  "🤯",
  "☕",
  "🍵",
  "🍕",
  "🍜",
  "🍩",
  "🥑",
  "📚",
  "💡",
  "🎧",
  "🎮",
  "🎨",
  "📷",
  "🚲",
  "✈️",
  "🏃",
  "🧘",
  "🐶",
  "🐱",
  "🌱",
  "🌊",
  "⛰️",
  "🏠",
  "💻",
  "📱",
  "🧠",
  "💪",
  "🎯",
  "🔥",
  "✨",
  "❤️",
  "🙌",
  "🤝",
  "🎉",
  "🌙",
] as const;

const MAX_PICK = 3;

export function EmojiIntroductionPlay() {
  const [selected, setSelected] = useState<string[]>([]);
  const [meaning, setMeaning] = useState("");
  const [copied, setCopied] = useState(false);

  const preview = useMemo(() => selected.join(""), [selected]);

  function toggleEmoji(emoji: string) {
    setSelected((prev) => {
      if (prev.includes(emoji)) return prev.filter((item) => item !== emoji);
      if (prev.length >= MAX_PICK) return prev;
      return [...prev, emoji];
    });
  }

  async function copyIntro() {
    if (!selected.length) return;
    const text = meaning.trim()
      ? `${preview} — ${meaning.trim()}`
      : `${preview} — (my emoji intro)`;
    await navigator.clipboard.writeText(text);
    trackEvent("play_emoji_intro", {
      game_slug: "emoji-introduction",
      emoji_count: selected.length,
      has_meaning: Boolean(meaning.trim()),
      action: "copy",
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  function reset() {
    setSelected([]);
    setMeaning("");
    setCopied(false);
    trackEvent("play_emoji_intro", {
      game_slug: "emoji-introduction",
      action: "reset",
    });
  }

  return (
    <section className={styles.panel} id="play-emoji" aria-labelledby="play-emoji-title">
      <p className={styles.eyebrow}>Try it here</p>
      <h2 className={styles.title} id="play-emoji-title">
        Build your emoji introduction
      </h2>
      <p className={styles.lead}>
        Pick 2–3 emojis that represent you, optionally add one sentence, then copy your intro into
        Zoom chat, Slack, or a slide.
      </p>

      <div className={styles.preview} aria-live="polite">
        <p className={styles.previewEmojis}>{preview || "· · ·"}</p>
        <p className={styles.previewHint}>
          {selected.length}/{MAX_PICK} selected
          {selected.length < 2 ? " — pick at least 2" : ""}
        </p>
      </div>

      <div className={styles.grid} role="group" aria-label="Emoji palette">
        {EMOJI_PALETTE.map((emoji) => {
          const isSelected = selected.includes(emoji);
          const disabled = !isSelected && selected.length >= MAX_PICK;
          return (
            <button
              key={emoji}
              type="button"
              className={`${styles.emojiBtn} ${isSelected ? styles.emojiBtnSelected : ""}`}
              aria-label={`${isSelected ? "Remove" : "Add"} ${emoji}`}
              aria-pressed={isSelected}
              disabled={disabled}
              onClick={() => toggleEmoji(emoji)}
            >
              {emoji}
            </button>
          );
        })}
      </div>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Optional one-line meaning</span>
        <input
          className={styles.input}
          type="text"
          maxLength={120}
          placeholder="e.g. Coffee, learning, and cycling are part of my week"
          value={meaning}
          onChange={(event) => setMeaning(event.target.value)}
        />
      </label>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primary}
          disabled={selected.length < 2}
          onClick={copyIntro}
        >
          {copied ? "Copied to clipboard" : "Copy my intro"}
        </button>
        <button type="button" className={styles.ghost} onClick={reset}>
          Clear
        </button>
      </div>
      {copied ? (
        <p className={styles.status}>Paste into chat and invite the group to guess what they mean.</p>
      ) : null}
    </section>
  );
}
