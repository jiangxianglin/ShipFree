import Image from "next/image";
import Link from "next/link";
import type { RelatedGameItem } from "@/lib/games/related";
import styles from "./related-games.module.css";

type RelatedGamesProps = {
  items: RelatedGameItem[];
  heading?: string;
  intro?: string;
  browseHref?: string;
  browseLabel?: string;
};

export function RelatedGames({
  items,
  heading = "Related Ice Breaker Games",
  intro = "Keep the session going — try another activity from the same family.",
  browseHref = "/games",
  browseLabel = "Browse all ice breaker games",
}: RelatedGamesProps) {
  if (!items.length) return null;

  return (
    <section className={styles.section} aria-label={heading}>
      <h2 className={styles.heading}>{heading}</h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      <div className={styles.grid}>
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/games/${item.slug}`}
            className={styles.card}
          >
            <div className={styles.media}>
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 25vw"
              />
            </div>
            <div className={styles.body}>
              <p className={styles.title}>{item.anchorText}</p>
              <p className={styles.blurb}>{item.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href={browseHref} className={styles.cta}>
        {browseLabel}
      </Link>
    </section>
  );
}
