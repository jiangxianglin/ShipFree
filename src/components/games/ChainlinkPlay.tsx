"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "./play-panel.module.css";

type ChainLink = {
  id: string;
  name: string;
  link: string;
  fact: string;
};

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ChainlinkPlay() {
  const [links, setLinks] = useState<ChainLink[]>([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [fact, setFact] = useState("");
  const [copied, setCopied] = useState(false);

  const isFirst = links.length === 0;

  function addLink() {
    const trimmedFact = fact.trim();
    const trimmedLink = link.trim();
    if (!trimmedFact) return;
    if (!isFirst && !trimmedLink) return;

    const next: ChainLink = {
      id: makeId(),
      name: name.trim() || `Person ${links.length + 1}`,
      link: isFirst ? "" : trimmedLink,
      fact: trimmedFact,
    };

    setLinks((prev) => [...prev, next]);
    setName("");
    setLink("");
    setFact("");
    trackEvent("play_chainlink", {
      game_slug: "chainlink",
      chain_length: links.length + 1,
      action: "add",
    });
  }

  function undoLast() {
    setLinks((prev) => prev.slice(0, -1));
    trackEvent("play_chainlink", {
      game_slug: "chainlink",
      action: "undo",
    });
  }

  function reset() {
    setLinks([]);
    setName("");
    setLink("");
    setFact("");
    setCopied(false);
    trackEvent("play_chainlink", {
      game_slug: "chainlink",
      action: "reset",
    });
  }

  async function copyChain() {
    if (!links.length) return;
    const text = links
      .map((item, index) => {
        if (index === 0) return `${item.name}: ${item.fact}`;
        return `${item.name}: linked via “${item.link}” → ${item.fact}`;
      })
      .join("\n");
    await navigator.clipboard.writeText(text);
    trackEvent("play_chainlink", {
      game_slug: "chainlink",
      chain_length: links.length,
      action: "copy",
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className={styles.panel} id="play-chainlink" aria-labelledby="play-chainlink-title">
      <p className={styles.eyebrow}>Try it here</p>
      <h2 className={styles.title} id="play-chainlink-title">
        Practice a Chainlink round
      </h2>
      <p className={styles.lead}>
        Start with one fact, then each next person names a shared trait and adds a new fact. Use this
        panel to demo the chain before you run it live with the group.
      </p>

      {links.length === 0 ? (
        <p className={styles.emptyChain}>No links yet — add the first fact to start the chain.</p>
      ) : (
        <div className={styles.chain} aria-live="polite">
          {links.map((item, index) => (
            <article key={item.id} className={styles.chainItem}>
              <span className={styles.chainIndex}>Link {index + 1}</span>
              <p className={styles.chainText}>
                <strong>{item.name}:</strong> {item.fact}
              </p>
              {item.link ? (
                <p className={styles.chainLink}>Shared link: {item.link}</p>
              ) : null}
            </article>
          ))}
        </div>
      )}

      <div className={`${styles.formRow} ${styles.formRowSplit}`}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Name (optional)</span>
          <input
            className={styles.input}
            type="text"
            maxLength={40}
            placeholder="Alex"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        {!isFirst ? (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Shared trait with previous person</span>
            <input
              className={styles.input}
              type="text"
              maxLength={80}
              placeholder="e.g. also runs on weekends"
              value={link}
              onChange={(event) => setLink(event.target.value)}
            />
          </label>
        ) : (
          <div />
        )}
      </div>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>
          {isFirst ? "First fact" : "New fact to add"}
        </span>
        <input
          className={styles.input}
          type="text"
          maxLength={120}
          placeholder={
            isFirst ? "e.g. I run on weekends" : "e.g. I have a dog named Mochi"
          }
          value={fact}
          onChange={(event) => setFact(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addLink();
            }
          }}
        />
      </label>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primary}
          disabled={!fact.trim() || (!isFirst && !link.trim())}
          onClick={addLink}
        >
          {isFirst ? "Start the chain" : "Add next link"}
        </button>
        <button
          type="button"
          className={styles.ghost}
          disabled={!links.length}
          onClick={copyChain}
        >
          {copied ? "Copied chain" : "Copy chain"}
        </button>
        <button
          type="button"
          className={styles.ghost}
          disabled={!links.length}
          onClick={undoLast}
        >
          Undo last
        </button>
        <button type="button" className={styles.ghost} onClick={reset}>
          Clear
        </button>
      </div>
      {copied ? (
        <p className={styles.status}>Share the chain on a screen or paste into your facilitator notes.</p>
      ) : null}
    </section>
  );
}
