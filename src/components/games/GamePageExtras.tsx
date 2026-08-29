import type { GamePageExtrasContent } from "@/data/game-page-extras";
import { getGamePageExtras } from "@/data/game-page-extras";
import styles from "./game-detail.module.css";

type GamePageExtrasProps = {
  slug: string;
  /** When true, skip FAQ block (e.g. emoji already has FAQ in GameDetail) */
  skipFaq?: boolean;
};

function ExtrasBody({
  extras,
  skipFaq,
}: {
  extras: GamePageExtrasContent;
  skipFaq?: boolean;
}) {
  return (
    <>
      {extras.howToSteps && extras.howToSteps.length > 0 ? (
        <section className={styles.section}>
          <h2>How to facilitate (step-by-step)</h2>
          <ol>
            {extras.howToSteps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.body}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {extras.variations && extras.variations.length > 0 ? (
        <section className={styles.section}>
          <h2>Variations</h2>
          <div className={styles.variationGrid}>
            {extras.variations.map((item) => (
              <div key={item.title} className={styles.variationItem}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {extras.rulesTiming && extras.rulesTiming.length > 0 ? (
        <section className={styles.section}>
          <h2>Rules &amp; timing</h2>
          <ul>
            {extras.rulesTiming.map((item) => (
              <li key={item.label}>
                <strong>{item.label}:</strong> {item.body}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {extras.adultsWork ? (
        <section className={styles.section}>
          <h2>For adults, work &amp; meetings</h2>
          <p>{extras.adultsWork}</p>
        </section>
      ) : null}

      {!skipFaq && extras.faqs.length > 0 ? (
        <section className={styles.section} aria-labelledby="game-extras-faq">
          <h2 id="game-extras-faq">Frequently asked questions</h2>
          <div className={styles.faqList}>
            {extras.faqs.map((item) => (
              <details key={item.q} className={styles.faqItem}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

export function GamePageExtras({ slug, skipFaq }: GamePageExtrasProps) {
  const extras = getGamePageExtras(slug);
  if (!extras) return null;

  const hasBody =
    (extras.howToSteps && extras.howToSteps.length > 0) ||
    (extras.variations && extras.variations.length > 0) ||
    (extras.rulesTiming && extras.rulesTiming.length > 0) ||
    Boolean(extras.adultsWork) ||
    (!skipFaq && extras.faqs.length > 0);

  if (!hasBody) return null;

  return <ExtrasBody extras={extras} skipFaq={skipFaq} />;
}
