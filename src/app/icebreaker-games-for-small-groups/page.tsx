import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./small-groups.module.css";

export const revalidate = 86400;

const title = "14 Ice Breaker Games for Small Groups (2026)";
const description =
  "Ice breaker games for small groups of 4–12 people. Fourteen facilitator-ready openers with players, time, rules, variations, and safety notes for meetings, classes, and retreats.";
const canonical =
  "https://www.icebreakergames.site/icebreaker-games-for-small-groups";
const ogImage =
  "https://www.icebreakergames.site/img/icebreaker-games-for-small-groups-hero.jpg";
const ogImageAlt =
  "Ice breaker games for small groups — diverse adults laughing in a cozy workshop circle";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-08-04";
const dateModified = "2026-08-04";

const gameEntries = [
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Small groups that can give everyone a speaking turn",
    players: "4–12",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each person shares two true statements and one false statement.",
      "The group guesses which statement is the lie.",
      "Reveal and move to the next person.",
      "Keep prompts light so nobody feels forced to overshare.",
    ],
    variation:
      "Pairs first: practice with one partner, then share one favorite “lie” with the circle.",
    safety: "Model a low-stakes example before asking volunteers.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Intimate circles forming new working relationships",
    players: "4–12",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Work as one group of 4–6, or two groups of 4–6.",
      "Find three non-obvious things everyone shares.",
      "Share one surprising commonality with the full room.",
      "Coach past obvious answers (“we all work here”).",
    ],
    variation: "Theme rounds: hobbies, food, remote-work quirks, or weekend rituals.",
    safety: "Remind people they can keep private details private.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "Brand-new small groups when names matter most",
    players: "4–12",
    time: "5–10 min",
    materials: "None (name tags help)",
    steps: [
      "Each person says their name plus one simple prompt.",
      "The next person repeats previous names before adding theirs.",
      "Help quickly if someone blanks.",
      "End by having everyone greet two people by name.",
    ],
    variation: "Alliterate optionally (“Joyful Jordan”) only if it feels natural.",
    safety: "Never punish forgetting a name; normalize group help.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative small groups that prefer writing over long speeches",
    players: "4–12",
    time: "5–10 min",
    materials: "Paper, sticky notes, or chat",
    steps: [
      "Prompt a six-word memoir about the week, project, or mood.",
      "Share around the circle or post on a shared board.",
      "Spotlight 2–3 favorites without critiques.",
      "Bridge one memoir theme into the agenda.",
    ],
    variation: "Strict five minutes: write 60 seconds, read three aloud, then start work.",
    safety: "Celebrate vivid phrases—no grading language.",
  },
  {
    slug: "emoji-check-in",
    name: "Emoji Check-In",
    bestFor: "The fastest small-group pulse check before a meeting",
    players: "4–20",
    time: "2–5 min",
    materials: "Chat, whiteboard, or sticky notes",
    steps: [
      "Ask everyone to share one emoji for energy right now.",
      "Optional: add a second emoji for focus or needs.",
      "Skim patterns out loud (“lots of ☕—let’s keep this crisp”).",
      "Move on; do not force every person to explain.",
    ],
    variation: "Theme it: weekend emoji, project-risk emoji, or agenda emoji.",
    safety: "Explanations are optional—emoji-only rounds include quieter people.",
  },
  {
    slug: "one-word-check-in",
    name: "One Word Check-In",
    bestFor: "Ultra-short icebreakers that still feel human",
    players: "4–16",
    time: "3–5 min",
    materials: "None or chat",
    steps: [
      "Prompt: “One word for how you are arriving today.”",
      "Go around once, or collect answers in chat.",
      "Reflect one theme briefly.",
      "Start the agenda within five minutes total.",
    ],
    variation: "Use two words max, or “one word + one emoji.”",
    safety: "Allow a pass; do not probe personal reasons for a word.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Playful opinion sparks in a tight circle",
    players: "4–16",
    time: "5–10 min",
    materials: "Prompt list",
    steps: [
      "Read two options; people raise hands or move left/right.",
      "Ask one person from each side for a one-sentence reason.",
      "Run 5–8 rounds, then close.",
      "Keep prompts funny and work- or school-safe.",
    ],
    variation: "Silent mode: point left/right only—no explanations for shy groups.",
    safety: "Skip money, body image, dating, and family-conflict prompts.",
  },
  {
    slug: "appreciation-circle",
    name: "Appreciation Circle",
    bestFor: "Closing a retreat or affirming an existing small group",
    players: "4–12",
    time: "10–15 min",
    materials: "None",
    steps: [
      "Sit in a circle.",
      "Each person offers a short appreciation to the person on their right or to the group.",
      "Keep statements specific and kind.",
      "Close with one group cheer or reflection if that fits your setting.",
    ],
    variation: "Write sticky-note appreciations if speaking feels too intense.",
    safety: "Make appreciation optional; allow written notes instead of speaking.",
  },
  {
    slug: "skittles-sharing",
    name: "Skittles Sharing",
    bestFor: "Discussion openers in classrooms and small teams",
    players: "4–12",
    time: "10–15 min",
    materials: "Colored candy or paper chips",
    steps: [
      "Give each person a few colored pieces.",
      "Assign a prompt to each color.",
      "People share based on the colors they drew.",
      "Keep shares to 20–30 seconds.",
    ],
    variation: "Allergy-safe nights: use colored paper chips instead of candy.",
    safety: "Always offer non-food color chips for dietary needs.",
  },
  {
    slug: "human-knot",
    name: "Human Knot",
    bestFor: "Retreat small groups that want a physical problem-solving challenge",
    players: "6–12 per knot",
    time: "10–15 min",
    materials: "Open space",
    steps: [
      "Form a circle, grab two non-adjacent hands, and untangle without letting go.",
      "Coach communication over force.",
      "Stop and reset if anyone feels uncomfortable.",
      "Debrief what helped the group get unstuck.",
    ],
    variation:
      "Contact-light version: hold soft ropes or bandanas instead of hands.",
    safety:
      "Offer rope/connector variants or non-contact alternatives for anyone who does not want hand-holding.",
  },
  {
    slug: "guess-who-personal-trivia",
    name: "Guess Who (Personal Trivia)",
    bestFor: "Small groups that already know each other a little",
    players: "4–12",
    time: "8–12 min",
    materials: "Chat or shared doc",
    steps: [
      "Each person submits one true, slightly mysterious fact.",
      "Read facts without names; the group guesses who wrote each clue.",
      "Reveal and invite a 10-second follow-up.",
      "Keep clues light: hobbies, travel quirks, first jobs.",
    ],
    variation: "Run three clues at once and race to guess correctly.",
    safety: "Ban private life details and anything that could embarrass someone.",
  },
  {
    slug: "mystery-envelope",
    name: "Mystery Envelope",
    bestFor: "Small workshops that want a shared puzzle and a quick win",
    players: "4–12",
    time: "8–15 min",
    materials: "Slides or paper envelopes with clues",
    steps: [
      "Prepare 4–6 envelopes each holding a tiny riddle or team trivia clue.",
      "Open one envelope per round; the first correct answer unlocks the next.",
      "Celebrate creative wrong answers before revealing.",
      "End by connecting one riddle theme to today’s goal.",
    ],
    variation: "Split into two pairs that solve in parallel, then share one answer.",
    safety: "Frame as curiosity, not an IQ test—wrong answers are welcome.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Rapid preference rounds when time is tight",
    players: "4–16",
    time: "4–8 min",
    materials: "Prompt list",
    steps: [
      "Offer two options (tea/coffee, early bird/night owl, slides/whiteboard).",
      "People point, raise hands, or reply A/B.",
      "Run 4–6 rapid rounds; skip long debate.",
      "Close with the funniest split.",
    ],
    variation: "Work-themed pairs: async/sync, deep work/collaboration day.",
    safety: "Keep options light; avoid identity or status traps.",
  },
  {
    slug: "never-have-i-ever",
    name: "Never Have I Ever (Clean Edition)",
    bestFor: "Trusted small groups with a pre-approved prompt list",
    players: "4–12",
    time: "8–12 min",
    materials: "Fingers or paper scorecards",
    steps: [
      "Everyone starts with five fingers up.",
      "Use only facilitator-approved clean prompts.",
      "Anyone who has done it puts a finger down.",
      "Stop before anyone feels singled out.",
    ],
    variation: "Work edition: “Never have I ever… shipped on a Friday.”",
    safety: "Ban alcohol, dating, and illegal-activity prompts.",
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

export default async function IcebreakerGamesForSmallGroupsPage() {
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
      q: "What are the best ice breaker games for small groups?",
      a: "Two Truths and a Lie, Common Ground, The Name Game, Six Word Memoirs, Emoji Check-In, One Word Check-In, Would You Rather, and Appreciation Circle are the most reliable for groups of 4–12.",
    },
    {
      q: "How many people count as a small group?",
      a: "For this guide, small groups usually means 4–12 people—enough for a circle conversation without needing breakouts or mixers built for 30+.",
    },
    {
      q: "What icebreakers work for shy small groups?",
      a: "Start with Emoji Check-In, One Word Check-In, Six Word Memoirs, or This or That with no speeches. Save Appreciation Circle and deep sharing for later.",
    },
    {
      q: "How long should a small-group icebreaker take?",
      a: "Most openers fit 5–15 minutes. Because everyone can speak, timebox aggressively so one person does not fill the whole round.",
    },
    {
      q: "Can these work for workplace small groups?",
      a: "Yes—prefer clean, professional prompts and chat-friendly formats. For larger meeting agendas, also see ice breaker games for meetings.",
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
              src="/img/icebreaker-games-for-small-groups-hero.jpg"
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
              <span>Ice breaker games for small groups</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>
              14 Ice Breaker Games for Small Groups
            </h1>
            <p className={styles.heroLead}>
              Facilitator-ready openers for circles of 4–12—meetings, classes, and
              retreats—with players, time, rules, and safety notes.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/common-ground" className={styles.ctaPrimary}>
                Start with Common Ground
              </Link>
              <Link href="/icebreaker-games-for-teens" className={styles.ctaGhost}>
                Ice breaker games for teens
              </Link>
              <Link href="/icebreaker-games-for-youth-group" className={styles.ctaGhost}>
                Youth group icebreakers
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
                Meetings, classrooms, coaching circles, and retreat pods of 4–12 people who
                need ice breaker games for small groups without large-mixer logistics.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most games fit 4–12 players in 5–15 minutes—short enough for a standup, deep
                enough for a workshop open.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip long go-arounds if the agenda is already tight, or physical contact games
                when comfort and mobility are unknown.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best ice breaker games for small groups</h2>
            <p>
              With fewer people, every voice matters—favor formats that timebox speaking turns
              and still leave room for a real conversation.
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
            <h2>Facilitator script (25 seconds)</h2>
            <p>
              “We’re a small group, so we’ll keep this icebreaker short and optional. You can
              pass anytime. The goal is to hear a few voices before we dive into the agenda—not
              to perform. Ready for the first prompt?”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Small groups feel intimate—protect psychological safety even more carefully than
              in a large room.
            </p>
            <ul>
              <li>Timebox speaking turns so one person does not fill the whole opener.</li>
              <li>Offer a pass and alternate roles (timer, note-taker) every round.</li>
              <li>
                Prefer clean prompts; avoid forcing personal disclosure in workplace settings.
              </li>
              <li>
                Adapt or skip contact-heavy games; offer rope/connector variants for Human Knot.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose icebreakers for small groups</h2>
            <p>
              If you only have five minutes, use{" "}
              <Link href="/games/emoji-check-in">Emoji Check-In</Link>,{" "}
              <Link href="/games/one-word-check-in">One Word Check-In</Link>, or This or That. For
              connection with a little more time, choose{" "}
              <Link href="/games/common-ground">Common Ground</Link>,{" "}
              <Link href="/games/two-truths-and-a-lie">Two Truths and a Lie</Link>, or Six Word
              Memoirs. Closing a retreat? Try{" "}
              <Link href="/games/appreciation-circle">Appreciation Circle</Link>. For teen-focused
              rooms, see{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>; for
              youth nights, see{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              ; for larger agendas, see{" "}
              <Link href="/icebreaker-games-for-meetings">
                ice breaker games for meetings
              </Link>
              .
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>What did we learn about each other that we did not know before?</li>
              <li>What helped people feel comfortable speaking?</li>
              <li>What should we protect in today’s agenda based on how people arrived?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about ice breaker games for small groups</h2>
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
              group/meeting cluster pages:
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
                <Link href="/icebreaker-games-for-meetings">
                  Ice Breaker Games — Ice breaker games for meetings
                </Link>
              </li>
              <li>
                <Link href="/icebreaker-games-for-youth-group">
                  Ice Breaker Games — Ice breaker games for youth group
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the <Link href="/">Ice Breaker Games home</Link> (group cluster hub),
              then explore{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>,{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              ,{" "}
              <Link href="/icebreaker-games-for-meetings">
                ice breaker games for meetings
              </Link>
              ,{" "}
              <Link href="/funny-icebreaker-games-for-meetings">
                funny ice breaker games for meetings
              </Link>
              , <Link href="/games-like-the-human-knot">games like the Human Knot</Link>, and
              the <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
