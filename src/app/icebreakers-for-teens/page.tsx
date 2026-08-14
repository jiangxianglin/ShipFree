import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./icebreakers-teens.module.css";

export const revalidate = 86400;

const title = "12 Icebreakers for Teens That Actually Work (2026)";
const description =
  "Icebreakers for teens: 12 age-fit openers for shy, energetic, and mixed groups—with players, time, rules, safety notes, and how to pick by personality.";
const canonical = "https://www.icebreakergames.site/icebreakers-for-teens";
const ogImage = "https://www.icebreakergames.site/img/icebreakers-for-teens-hero.jpg";
const ogImageAlt =
  "Icebreakers for teens — diverse teens laughing outdoors during a high-energy icebreaker circle";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-08-14";
const dateModified = "2026-08-14";

const gameEntries = [
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "Shy teens who prefer visuals over long self-intro speeches",
    players: "5–30",
    time: "5–10 min",
    materials: "Chat, whiteboard, or sticky notes",
    steps: [
      "Each person posts 2–3 emojis that represent them.",
      "The group guesses once; the author clarifies in one sentence.",
      "For larger groups, only volunteers explain aloud.",
      "Model a fun example first so nobody feels put on the spot.",
    ],
    variation: "Theme rounds: weekend emoji, mood emoji, or “emoji for your hobby.”",
    safety: "Keep explanations optional—emoji-only rounds still count as participation.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Mixed teen groups that need low-pressure binary choices",
    players: "5–100+",
    time: "3–8 min",
    materials: "Prompt list or poll",
    steps: [
      "Offer quick pairs (coffee/tea, morning/night, beach/mountains).",
      "Collect answers via hands, movement, or simultaneous chat.",
      "Highlight funny splits; skip long debates.",
      "Bridge one theme into the next activity.",
    ],
    variation: "Virtual: use reactions or a one-click poll for large rooms.",
    safety: "Avoid status-laden pairs that invite teasing.",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Teens who enjoy storytelling once a little trust exists",
    players: "5–40",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each teen shares two true statements and one false statement.",
      "The group guesses which statement is the lie.",
      "Reveal quickly and rotate so more voices get a turn.",
      "Keep prompts light: hobbies, sports, food, music.",
    ],
    variation: "Chat or whiteboard mode: post three numbered statements and vote A/B/C.",
    safety: "Model a fun example first so nobody feels pressured to overshare.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Energetic teens who want opinions without deep personal history",
    players: "6–60",
    time: "5–10 min",
    materials: "Prompt list",
    steps: [
      "Read two options; teens move to sides of the room or raise hands.",
      "Ask 1–2 people from each side to explain in one sentence.",
      "Run 5–8 rounds, then close.",
      "Use funny, age-appropriate choices—not moral traps.",
    ],
    variation: "Shy groups: raise-hands only. Hybrid: A/B chat replies.",
    safety: "Skip prompts about money, body image, dating, or family conflict.",
  },
  {
    slug: "rock-paper-scissors-tournament",
    name: "Rock Paper Scissors Tournament",
    bestFor: "High-energy teens who warm up through play more than talk",
    players: "12–100+",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Pair up and play Rock Paper Scissors.",
      "Losers become the winner’s cheer squad; winners keep playing.",
      "Continue until one champion remains.",
      "Celebrate the loudest cheer section, not only the champion.",
    ],
    variation: "Best of three for smaller clubs; virtual: gallery-view pair rounds.",
    safety: "Great low-risk opener before quieter discussion activities.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "New teen cohorts when remembering names builds belonging",
    players: "8–20",
    time: "5–10 min",
    materials: "None (name tags help)",
    steps: [
      "Each person says their name plus one simple prompt (favorite snack or hobby).",
      "The next person repeats a few previous names before adding theirs.",
      "Help quickly if someone blanks—names should feel supportive.",
      "End by challenging the group to greet two new people by name.",
    ],
    variation: "Large groups: split into circles of 8–10.",
    safety: "Never punish forgetting a name; normalize group help.",
  },
  {
    slug: "human-bingo",
    name: "Human Bingo",
    bestFor: "Social teens at mixers who like moving and meeting many people",
    players: "10–50",
    time: "15–25 min",
    materials: "Bingo cards and pens",
    steps: [
      "Hand out teen-friendly bingo cards (plays an instrument, has a pet, speaks two languages).",
      "Students mingle to find matches and collect signatures.",
      "First to complete a line wins a cheer or small prize.",
      "Invite a few winners to share one interesting match.",
    ],
    variation: "Smaller rooms: require four corners only.",
    safety: "Avoid appearance-based or dating-related prompts.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Smaller teen circles forming friendships after an energetic opener",
    players: "6–30",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Split into groups of 4–6.",
      "Find three things everyone shares.",
      "Share one surprising commonality with the full room.",
      "Coach groups past obvious answers (“we all have phones”).",
    ],
    variation: "Theme rounds (music, food, school) or virtual breakout rooms of 4.",
    safety: "Remind groups that nobody must reveal personal details they want private.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative or introverted teens who prefer writing over spotlight talk",
    players: "5–40",
    time: "5–10 min",
    materials: "Paper, sticky notes, or chat",
    steps: [
      "Prompt a six-word memoir about the week, hobby, or mood.",
      "Share in pairs or post on a wall/chat.",
      "Spotlight 2–3 favorites without critiques.",
      "Bridge one memoir theme into the next activity.",
    ],
    variation: "Strict five minutes: write 60 seconds, share three aloud, then move on.",
    safety: "No grading language—celebrate vivid phrases over perfect grammar.",
  },
  {
    slug: "one-word-check-in",
    name: "One Word Check-In",
    bestFor: "Teens who need a fast, low-stakes emotional temperature check",
    players: "5–40",
    time: "3–6 min",
    materials: "None",
    steps: [
      "Ask for one word that describes how people feel entering the room.",
      "Go around quickly or collect words on the board.",
      "Reflect one theme without over-analyzing anyone.",
      "Bridge into the agenda.",
    ],
    variation: "Anonymous sticky notes for high-stakes weeks.",
    safety: "Do not force personal stories; one word is enough.",
  },
  {
    slug: "find-your-match",
    name: "Find Your Match",
    bestFor: "Breaking up cliques so quieter teens meet new partners",
    players: "10–50",
    time: "10–15 min",
    materials: "Paired cards",
    steps: [
      "Hand out halves of famous pairs.",
      "Teens ask yes/no questions to find their match.",
      "Matched pairs sit together for the next activity.",
      "Use this before small-group discussion so new combinations form.",
    ],
    variation: "Use book/character or sports-team pairs; virtual: DM clues.",
    safety: "Choose wholesome pair themes; avoid romance-focused cards.",
  },
  {
    slug: "beach-ball-qa",
    name: "Beach Ball Q&A",
    bestFor: "Active teens at outdoor or gym nights who like light movement",
    players: "8–40",
    time: "8–12 min",
    materials: "Beach ball with written questions",
    steps: [
      "Write light questions on a beach ball with a marker.",
      "Toss the ball; whoever catches it answers the question under their thumb.",
      "Continue until most people have answered once.",
      "Offer a pass option every time.",
    ],
    variation: "Classroom: pass a soft foam ball while seated.",
    safety: "Softer toss rule indoors; allow seated participants an underhand pass.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    authors: [{ name: authorName, url: "https://www.icebreakergames.site/about" }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: "Ice Breaker Games",
      publishedTime: datePublished,
      modifiedTime: dateModified,
      authors: [authorName],
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          type: "image/jpeg",
          width: 1600,
          height: 900,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: { url: ogImage, alt: ogImageAlt },
    },
    robots: { index: true, follow: true },
  };
}

export default async function IcebreakersForTeensPage() {
  const games = await getAllGames();
  const featured = gameEntries
    .map((entry) => {
      const game = games.find((g) => g.slug === entry.slug);
      return game ? { ...entry, game } : { ...entry, game: null };
    })
    .filter((entry) => entry.game);

  const listSource = featured.length > 0 ? featured : gameEntries;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description,
    numberOfItems: listSource.length,
    itemListElement: listSource.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: `https://www.icebreakergames.site/games/${entry.slug}`,
    })),
  };

  const faqs = [
    {
      q: "What icebreakers for teens actually work?",
      a: "Emoji Introduction, This or That, Two Truths and a Lie, Would You Rather, Rock Paper Scissors Tournament, The Name Game, and Human Bingo work for most teen groups when you match energy and offer a pass option.",
    },
    {
      q: "What icebreakers work for shy teens?",
      a: "Start with Emoji Introduction, Six Word Memoirs, One Word Check-In, or This or That. Avoid spotlight storytelling until trust is built.",
    },
    {
      q: "How is “icebreakers for teens” different from “ice breaker games for teens”?",
      a: "This page is the audience hub: how to pick icebreakers for teens by personality and comfort. The ice breaker games for teens page is the scenario hub with a longer classroom/club game list.",
    },
    {
      q: "How long should icebreakers for teens take?",
      a: "Most openers fit 5–15 minutes. Save Human Bingo or Beach Ball Q&A (10–25 minutes) for full club nights or retreats.",
    },
    {
      q: "Are these icebreakers for teens school-safe?",
      a: "Yes—when you use clean prompts, skip dating/alcohol/body-image topics, offer opt-outs, and adapt physical games for comfort and mobility. For classroom-specific picks, see ice breaker games for high school students.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [ogImage],
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://www.icebreakergames.site/about",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.icebreakergames.site/#organization",
      name: "Ice Breaker Games",
      logo: {
        "@type": "ImageObject",
        url: "https://www.icebreakergames.site/img/home-hero.jpg",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroMedia}>
            <Image
              src="/img/icebreakers-for-teens-hero.jpg"
              alt={ogImageAlt}
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
              <Link href="/games">Games</Link>
              <span>/</span>
              <span>Icebreakers for teens</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>12 Icebreakers for Teens That Actually Work</h1>
            <p className={styles.heroLead}>
              Age-fit openers for shy, energetic, and mixed teen groups—pick by personality first,
              then run rules that respect opt-outs.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/emoji-introduction" className={styles.ctaPrimary}>
                Start with Emoji Introduction
              </Link>
              <Link href="/icebreaker-games-for-teens" className={styles.ctaGhost}>
                Ice breaker games for teens
              </Link>
              <Link
                href="/icebreaker-games-for-high-school-students"
                className={styles.ctaGhost}
              >
                High school icebreakers
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <p className={styles.byline}>
            By <Link href="/about">{authorName}</Link>
            <span aria-hidden="true"> · </span>
            <time dateTime={datePublished}>Published {datePublished}</time>
            <span aria-hidden="true"> · </span>
            <time dateTime={dateModified}>Updated {dateModified}</time>
          </p>

          <section className={styles.snapshot} aria-label="When these games work best">
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Best for</p>
              <p>
                Facilitators choosing icebreakers for teens by comfort level—shy, energetic, or
                mixed—across clubs, camps, and youth spaces.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most rounds fit 5–40 teens in 3–15 minutes; mixers like Human Bingo may need
                20+ minutes.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip spotlight games if trust is low, prompts feel too personal, or physical play
                is not adapted for comfort and safety.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best icebreakers for teens (by personality)</h2>
            <p>
              Start with energy and trust—not a random list. Shy teens need low-visibility
              options; energetic teens need play before talk; mixed rooms need a bridge game.
              Below are twelve facilitator-ready icebreakers for teens.
            </p>
          </section>

          <section className={styles.gameList}>
            {listSource.map((entry, index) => (
              <article key={entry.slug} className={styles.gameItem}>
                <div className={styles.gameIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h2 className={styles.gameTitle}>
                    <Link href={`/games/${entry.slug}`}>{entry.name}</Link>
                  </h2>
                  <p className={styles.gameBestFor}>{entry.bestFor}</p>
                  <div className={styles.metaRow}>
                    <span className={styles.meta}>Players: {entry.players}</span>
                    <span className={styles.meta}>Time: {entry.time}</span>
                    <span className={styles.meta}>Materials: {entry.materials}</span>
                  </div>
                  <div className={styles.howTo}>
                    <h3>How to play</h3>
                    <ol>
                      {entry.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <p className={styles.variation}>
                    <strong>Variation: </strong>
                    {entry.variation}
                  </p>
                  {"safety" in entry && entry.safety ? (
                    <p className={styles.variation}>
                      <strong>Facilitator note: </strong>
                      {entry.safety}
                    </p>
                  ) : null}
                  <Link href={`/games/${entry.slug}`} className={styles.gameLink}>
                    Full facilitator guide →
                  </Link>
                </div>
              </article>
            ))}
          </section>

          <section className={styles.scriptBand}>
            <h2>Facilitator script (30 seconds)</h2>
            <p>
              “We’re going to try a short icebreaker so everyone gets a chance to connect. You can
              pass anytime. The goal is belonging, not performance. If you’d rather be timer or
              scorekeeper, tell me and I’ll set you up.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Icebreakers for teens only work when students feel free to opt out and nobody is set
              up to be embarrassed in front of peers.
            </p>
            <ul>
              <li>
                Match the first game to the shyest person in the room—then raise energy if the
                group wants it.
              </li>
              <li>
                State a pass option upfront and offer alternate roles for anyone who wants lower
                visibility.
              </li>
              <li>
                Use clean, age-appropriate prompts—skip dating, alcohol, body image, and private
                family topics.
              </li>
              <li>
                Adapt physical games for comfort and mobility; offer seated or non-contact variants
                without calling anyone out.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose icebreakers for teens</h2>
            <p>
              For shy or new groups, start with{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>,{" "}
              <Link href="/games/this-or-that-questions">This or That</Link>, or{" "}
              <Link href="/games/one-word-check-in">One Word Check-In</Link>. For energetic rooms,
              use{" "}
              <Link href="/games/rock-paper-scissors-tournament">
                Rock Paper Scissors Tournament
              </Link>{" "}
              or <Link href="/games/would-you-rather">Would You Rather</Link>. After trust is
              built, move into <Link href="/games/two-truths-and-a-lie">Two Truths and a Lie</Link>{" "}
              or <Link href="/games/common-ground">Common Ground</Link>. Need classroom constraints?
              See{" "}
              <Link href="/icebreaker-games-for-high-school-students">
                ice breaker games for high school students
              </Link>
              . Want the longer scenario list? See{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>. For
              church/camp nights, see{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              .
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>Who did you meet that you did not know well before?</li>
              <li>What made it easier to talk to someone new?</li>
              <li>Which style felt more comfortable: quiet, playful, or storytelling?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about icebreakers for teens</h2>
            {faqs.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>

          <section className={styles.sources} aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources &amp; further reading</h2>
            <p>
              Timing and inclusion guidance draws on established facilitation libraries and our
              student cluster pages:
            </p>
            <ol>
              <li>
                <a
                  href="https://www.sessionlab.com/library/icebreaker"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SessionLab — Icebreaker library
                </a>
              </li>
              <li>
                <Link href="/icebreaker-games-for-teens">
                  Ice Breaker Games — Ice breaker games for teens
                </Link>
              </li>
              <li>
                <Link href="/blog/icebreaker-games-for-students">
                  Ice Breaker Games — Icebreaker games for students
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the <Link href="/">Ice Breaker Games home</Link>, then explore the
              student cluster:{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>{" "}
              (scenario hub),{" "}
              <Link href="/icebreaker-games-for-high-school-students">
                ice breaker games for high school students
              </Link>
              ,{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              ,{" "}
              <Link href="/blog/icebreaker-games-for-students">
                icebreaker games for students
              </Link>
              , and the <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
