import { getAllGames } from "@/db/queries/games";
import { FilterableGameGrid } from "@/components/games/FilterableGameGrid";
import { EmptyState } from "@/components/games/EmptyState";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./games.module.css";

export const revalidate = 86400;

const title = "Browse All Ice Breaker Games (2026) | Filter by Time & Size";
const description =
  "Browse free ice breaker games and filter by time, group size, type, and audience. Open full rules for meetings, work, virtual calls, and classrooms.";
const canonical = "https://www.icebreakergames.site/games";
const ogImage = "https://www.icebreakergames.site/img/games-og.jpg";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ice breaker games",
    "browse icebreaker games",
    "team building activities",
    "virtual icebreakers",
    "meeting icebreakers",
    "classroom games",
  ],
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical,
    siteName: "Ice Breaker Games",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Browse all ice breaker games — facilitators planning activities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

const clusterGuides = [
  {
    href: "/icebreaker-games-for-meetings",
    title: "Ice breaker games for meetings",
    description:
      "Workplace hub: quick openers for standups, workshops, and team meetings.",
  },
  {
    href: "/funny-icebreaker-games-for-meetings",
    title: "Funny ice breaker games for meetings",
    description:
      "Humor-forward meeting openers with funny scenes and work-safe prompts.",
  },
  {
    href: "/virtual-icebreaker-games",
    title: "Virtual ice breaker games",
    description:
      "Online hub: Zoom and Teams warm-ups, including short and riddle formats.",
  },
  {
    href: "/short-virtual-icebreakers",
    title: "Short virtual icebreakers",
    description:
      "5-minute virtual icebreakers that respect tight agendas.",
  },
  {
    href: "/riddle-icebreakers-for-virtual-meetings",
    title: "Riddle icebreakers for virtual meetings",
    description:
      "Puzzle and guessing games for remote teams who want low-pressure laughs.",
  },
  {
    href: "/icebreaker-games-for-teens",
    title: "Ice breaker games for teens",
    description:
      "Student-cluster hub: classroom and club openers with safety notes.",
  },
  {
    href: "/icebreaker-games-for-small-groups",
    title: "Ice breaker games for small groups",
    description:
      "Group-cluster hub: facilitator-ready activities for circles of 4–12.",
  },
  {
    href: "/icebreaker-games-for-youth-group",
    title: "Ice breaker games for youth group",
    description:
      "Age-appropriate openers for youth nights, retreats, and small groups.",
  },
  {
    href: "/games-like-human-bingo",
    title: "Games like Human Bingo",
    description:
      "Mingling and networking alternatives with rules and comparison tips.",
  },
  {
    href: "/games-like-the-human-knot",
    title: "Games like the Human Knot",
    description:
      "Physical and problem-solving challenges when you want knot-style energy.",
  },
  {
    href: "/icebreaker-games-for-work",
    title: "Icebreaker games for work",
    description:
      "Professional, low-pressure activities for teams, onboarding, and training.",
  },
];

const faqs = [
  {
    q: "What are ice breaker games?",
    a: "Ice breaker games are short, structured activities that help people feel comfortable, start talking, and connect quickly. They are commonly used in meetings, workshops, classrooms, and team building events.",
  },
  {
    q: "What is a good 5-minute ice breaker game?",
    a: "For a quick 5-minute ice breaker, try One Word Check-In, Emoji Check-In, or a short This or That round. These require no materials and work well for most groups.",
    linkHref: "/short-virtual-icebreakers",
    linkLabel: "Browse short virtual icebreakers",
  },
  {
    q: "What ice breaker games work best for meetings?",
    a: "Meeting-friendly ice breaker games are low-pressure and time-boxed. One Word Check-In, Weather Check-In, and This or That Questions help everyone participate without long turns.",
    linkHref: "/icebreaker-games-for-meetings",
    linkLabel: "See ice breaker games for meetings",
  },
  {
    q: "What are the best virtual ice breaker games?",
    a: "Virtual ice breaker games that work well online include Chat Waterfall, Emoji Introduction, Emoji Check-In, and Virtual Background Story. These formats make it easy for everyone to join using chat and quick sharing.",
    linkHref: "/virtual-icebreaker-games",
    linkLabel: "Explore virtual ice breaker games",
  },
  {
    q: "How do I choose the right ice breaker game?",
    a: "Choose based on time, group size, comfort level, and setting (in-person or virtual). If the group is new, use predictable formats. If time is tight, use a check-in style activity. Use the filters above to narrow by duration and people.",
  },
];

export default async function GamesPage() {
  const games = await getAllGames();

  if (games.length === 0) {
    return <EmptyState />;
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ice Breaker Games library",
    description,
    numberOfItems: Math.min(games.length, 24),
    itemListElement: games.slice(0, 24).map((game, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: game.title,
      url: `https://www.icebreakergames.site/games/${game.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Ice Breaker Games",
      url: "https://www.icebreakergames.site",
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/img/games-hero.jpg"
            alt="Ice Breaker Games — facilitators browsing and planning icebreaker activities"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Games</span>
          </nav>
          <p className={styles.brand}>Ice Breaker Games</p>
          <h1 className={styles.heroTitle}>Browse all ice breaker games</h1>
          <p className={styles.heroLead}>
            Filter {games.length}+ free activities by time, group size, type, and
            audience—then open full rules and facilitation tips.
          </p>
          <div className={styles.ctaRow}>
            <a href="#game-library" className={styles.ctaPrimary}>
              Filter the library
            </a>
            <Link href="/icebreaker-games-for-meetings" className={styles.ctaGhost}>
              Meeting games
            </Link>
            <Link href="/virtual-icebreaker-games" className={styles.ctaGhost}>
              Virtual games
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.snapshot} aria-label="How to use this library">
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Best for</p>
          <p>
            Facilitators who need to compare ice breaker games by setting, then open
            step-by-step rules without digging through long blog posts.
          </p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Filter by</p>
          <p>
            Activity type, game type, time, difficulty, people, and audience—or search
            keywords like students, online, or orientation.
          </p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Then explore</p>
          <p>
            Jump into a game detail page for facilitator scripts, variations, and related
            guides from our meetings, virtual, and games-like clusters.
          </p>
        </div>
      </section>

      <section
        id="game-library"
        className={styles.libraryBand}
        aria-labelledby="library-heading"
      >
        <div className={styles.libraryHead}>
          <p className={styles.eyebrow}>Game library</p>
          <h2 id="library-heading">Find games by time, size &amp; type</h2>
          <p>
            Use the filters to narrow the full library, then open any game for materials,
            how-to steps, and print-friendly instructions.
          </p>
        </div>

        <Suspense
          fallback={
            <p className={styles.countLine}>Loading filters…</p>
          }
        >
          <FilterableGameGrid games={games} />
        </Suspense>
      </section>

      <section className={styles.guidesBand} aria-labelledby="guides-heading">
        <div className={styles.guidesInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Curated guides</p>
            <h2 id="guides-heading">Browse by occasion &amp; similar games</h2>
            <p>
              Prefer a ready-made list? These hub and blue-ocean guides match common search
              intents and link back into the library.
            </p>
          </div>
          <div className={styles.guideList}>
            {clusterGuides.map((guide, index) => (
              <Link key={guide.href} href={guide.href} className={styles.guideItem}>
                <span className={styles.guideIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.guideTitle}>{guide.title}</h3>
                  <p className={styles.guideDesc}>{guide.description}</p>
                </div>
                <span className={styles.guideLink}>Open guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howtoBand} aria-labelledby="howto-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Facilitator tip</p>
          <h2 id="howto-heading">How to choose the right ice breaker games</h2>
          <p>
            Match time and psychological safety first—then pick a format your group can
            finish without rushing the debrief.
          </p>
        </div>
        <div className={styles.howtoSteps}>
          <div className={styles.howtoStep}>
            <span className={styles.howtoNum}>01</span>
            <h3>Filter by constraints</h3>
            <p>
              Start with time and group size. A 5-minute check-in for 8 people is a
              different game than a 20-minute mixer for 40.
            </p>
          </div>
          <div className={styles.howtoStep}>
            <span className={styles.howtoNum}>02</span>
            <h3>Open the detail page</h3>
            <p>
              Confirm materials, difficulty, and facilitator notes. Prefer games with a
              clear script when the group is new or hybrid.
            </p>
          </div>
          <div className={styles.howtoStep}>
            <span className={styles.howtoNum}>03</span>
            <h3>Compare related guides</h3>
            <p>
              Use meeting, virtual, or games-like guides when you want curated picks instead
              of scanning the full library alone.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.faqBand} aria-labelledby="faq-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-heading">Ice breaker games — common questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item) => (
            <div key={item.q} className={styles.faqItem}>
              <h3>{item.q}</h3>
              <p>
                {item.a}
                {"linkHref" in item && item.linkHref && item.linkLabel ? (
                  <>
                    {" "}
                    <Link href={item.linkHref}>{item.linkLabel}</Link>.
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
