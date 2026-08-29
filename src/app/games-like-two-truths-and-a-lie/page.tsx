import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./two-truths.module.css";

export const revalidate = 86400;

const title = "12 Games Like Two Truths and a Lie (2026)";
const description =
  "Looking for games like Two Truths and a Lie? Compare 12 get-to-know substitutes for work, class, and Zoom—with rules, timing, safer variations, and facilitator tips.";
const canonical =
  "https://www.icebreakergames.site/games-like-two-truths-and-a-lie";
const ogImage =
  "https://www.icebreakergames.site/img/games-like-two-truths-and-a-lie-hero.jpg";
const ogImageAlt =
  "Games like Two Truths and a Lie — diverse adults laughing during a storytelling icebreaker circle";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-08-11";
const dateModified = "2026-08-29";

const scenarioPicks = [
  {
    title: "Work meetings & onboarding",
    body: "Prefer low-bluff formats: This or That, Emoji Introduction, Common Ground, or Two Truths and a Dream with work-safe themes.",
    href: "/icebreaker-games-for-meetings",
    linkLabel: "Meeting icebreakers hub",
  },
  {
    title: "Classrooms & students",
    body: "Use Six Word Memoirs, The Name Game, Would You Rather, or a short classic Two Truths with classroom-safe prompts and a pass option.",
    href: "/icebreaker-games-for-teens",
    linkLabel: "Icebreakers for teens",
  },
  {
    title: "Virtual / hybrid Zoom",
    body: "Chat-first wins: Emoji Introduction, This or That polls, or Guess Who with a shared doc. Keep turns under a minute.",
    href: "/virtual-icebreaker-games",
    linkLabel: "Virtual icebreaker games",
  },
  {
    title: "Shy groups / no lying",
    body: "Skip the lie mechanic. Run Two Truths and a Dream, Story Swap, Desert Island, or Common Ground so nobody has to invent a fake fact.",
    href: "/icebreaker-games-for-small-groups",
    linkLabel: "Small-group openers",
  },
];

const comparisonRows = [
  ["Two Truths and a Lie", "Medium", "8–15 min", "Classic bluff + reveal"],
  ["Two Truths and a Dream", "Low–Med", "8–12 min", "Aspiration instead of lying"],
  ["Never Have I Ever", "Medium", "8–15 min", "High energy, needs prompt guardrails"],
  ["Would You Rather", "Low", "5–10 min", "Fast opinions, little personal risk"],
  ["This or That", "Low", "3–8 min", "Best under-eight-minute substitute"],
  ["Six Word Memoirs", "Low–Med", "8–12 min", "Creative, low overshare risk"],
  ["Guess Who (trivia)", "Medium", "10–15 min", "Mystery + reveal like spotting a lie"],
  ["Common Ground", "Low", "8–15 min", "Connection without bluffing"],
  ["Emoji Introduction", "Low", "5–8 min", "Visual / virtual-friendly"],
  ["The Name Game", "Low", "8–12 min", "Name learning + light facts"],
  ["Story Swap", "Med–High", "10–15 min", "Deeper storytelling pairs"],
  ["Desert Island", "Low–Med", "8–12 min", "Imaginative preference sharing"],
];

const gameEntries = [
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "The classic storytelling icebreaker people compare when searching for alternatives",
    players: "5–40",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each person prepares two true statements and one false statement.",
      "Share all three in any order; the group guesses the lie.",
      "Reveal quickly and celebrate creative stories more than “gotchas.”",
      "Rotate so several people get a turn without dragging the agenda.",
    ],
    variation: "Theme rounds: work-safe travel, hobbies, or “something from this project.”",
  },
  {
    slug: "two-truths-and-a-dream",
    name: "Two Truths and a Dream",
    bestFor: "A hopeful Two Truths alternative when you want aspiration instead of deception",
    players: "4–30",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Each person shares two true facts and one dream or aspiration.",
      "Listeners may ask one clarifying question.",
      "Optionally guess which item is the dream before the reveal.",
      "Close by noting shared themes (travel, craft, career growth).",
    ],
    variation: "Make the dream work-related for onboarding or team kickoffs.",
  },
  {
    slug: "never-have-i-ever",
    name: "Never Have I Ever",
    bestFor: "A high-energy cousin of Two Truths with quick reveals and shared laughs",
    players: "6–40",
    time: "8–15 min",
    materials: "Fingers or chat reactions",
    steps: [
      "Everyone starts with five fingers up (or five chat lives).",
      "Players take turns saying “Never have I ever…” with a light, inclusive prompt.",
      "Anyone who has done it puts a finger down or reacts in chat.",
      "Stop while energy is high; debrief surprises, not shame.",
    ],
    variation: "Work-safe only: meetings, travel, hobbies—ban dating and body topics.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Faster opinion rounds when full Two Truths storytelling feels too long",
    players: "6–60",
    time: "5–10 min",
    materials: "Prompt list",
    steps: [
      "Read two vivid, work-safe options.",
      "People move sides, raise hands, or reply A/B in chat.",
      "Ask one person per side for a one-sentence defense.",
      "Run 5–7 rounds, then open the real agenda.",
    ],
    variation: "Classroom theme: study habits, snacks, or weekend plans.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Low-pressure binary choices—great Two Truths substitute for shy groups",
    players: "5–100+",
    time: "3–8 min",
    materials: "Prompt list or poll",
    steps: [
      "Offer quick pairs (coffee/tea, morning/night, beach/mountains).",
      "Collect answers via hands, movement, or simultaneous chat.",
      "Highlight funny splits; skip long debates.",
      "Bridge one theme into the meeting or lesson.",
    ],
    variation: "Virtual: use reactions or a one-click poll for large rooms.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative storytelling like Two Truths, with less personal risk",
    players: "5–30",
    time: "8–12 min",
    materials: "Paper or chat",
    steps: [
      "Ask everyone to describe their week (or themselves) in exactly six words.",
      "Share in small groups or post in chat.",
      "Invite a few volunteers to expand one word into a 20-second story.",
      "Collect themes on a whiteboard if useful for the agenda.",
    ],
    variation: "Prompt: “six words about this team” for kickoffs.",
  },
  {
    slug: "guess-who-personal-trivia",
    name: "Guess Who (Personal Trivia)",
    bestFor: "Mystery + reveal energy similar to spotting the lie in Two Truths",
    players: "6–24",
    time: "10–15 min",
    materials: "Index cards or shared doc",
    steps: [
      "Each person writes one surprising true fact anonymously.",
      "Shuffle and read facts one by one.",
      "The group guesses who wrote each fact.",
      "Author reveals; keep teasing kind and brief.",
    ],
    variation: "Virtual: collect facts in a form, then share screen to guess.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Connection without the bluffing mechanic—ideal small-group Two Truths alternative",
    players: "6–30",
    time: "8–15 min",
    materials: "None (optional whiteboard)",
    steps: [
      "Split into groups of 4–6.",
      "Find three surprising things everyone shares.",
      "Share one find with the full room.",
      "Coach groups away from surface answers (“we all breathe”).",
    ],
    variation: "Theme rounds: hobbies, food, work habits, or travel.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "A visual Two Truths substitute for virtual or hybrid rooms",
    players: "5–40",
    time: "5–8 min",
    materials: "Chat or whiteboard",
    steps: [
      "Each person posts 2–3 emojis that represent them or their week.",
      "The group guesses once; the author clarifies in one sentence.",
      "For larger groups, only volunteers explain.",
      "Model a vivid example first to set the tone.",
    ],
    variation: "Add a “fake emoji” round that mirrors Two Truths guessing.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "Name learning plus light personal facts—pairs well after or instead of Two Truths",
    players: "6–24",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Go around with name + a short associated word or memory tip.",
      "Each person repeats previous names before adding theirs.",
      "Keep memory pressure light; cheer near-misses.",
      "Optional second round with a fun fact instead of an adjective.",
    ],
    variation: "Classroom: subject-themed adjectives or favorite book titles.",
  },
  {
    slug: "story-swap",
    name: "Story Swap",
    bestFor: "Deeper storytelling when Two Truths feels too short for the room",
    players: "6–20",
    time: "10–15 min",
    materials: "Timer",
    steps: [
      "Pair people and give a prompt (best small win this month, funny travel mishap).",
      "Each person speaks for 60–90 seconds while the partner listens.",
      "Partners introduce each other with a one-sentence highlight.",
      "Thank the room and open the agenda while energy is warm.",
    ],
    variation: "Virtual: breakout rooms of two, then return for highlight shares.",
  },
  {
    slug: "desert-island-scenario",
    name: "Desert Island Scenario",
    bestFor: "Imaginative preference sharing—another classic get-to-know cousin of Two Truths",
    players: "5–30",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Prompt: three items you’d bring to a desert island (or remote cabin).",
      "Share in small groups or take turns in a circle.",
      "Ask one follow-up: “Why that item?”",
      "Optional vote for the most creative survival kit.",
    ],
    variation: "Work remix: three tools for a product desert island sprint.",
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

export default async function GamesLikeTwoTruthsAndALiePage() {
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
      q: "What are the best games like Two Truths and a Lie?",
      a: "Strong alternatives keep the get-to-know payoff with less or different guessing pressure. Top options include Two Truths and a Dream, Never Have I Ever, Would You Rather, This or That, Six Word Memoirs, Guess Who personal trivia, Common Ground, and Emoji Introduction.",
    },
    {
      q: "What can I use instead of Two Truths and a Lie if people dislike lying?",
      a: "Skip the lie mechanic and use Two Truths and a Dream, Six Word Memoirs, Common Ground, Story Swap, or Desert Island Scenario. You still get personal stories without asking anyone to invent a fake fact.",
    },
    {
      q: "Are games like Two Truths and a Lie good for work meetings?",
      a: "Yes—when prompts stay work-safe. Prefer This or That, Emoji Introduction, Common Ground, or a short Two Truths round with professional themes (projects, tools, travel for work). Avoid dating, salary, and private family drama.",
    },
    {
      q: "Can you play games like Two Truths and a Lie virtually on Zoom?",
      a: "Yes. Use chat for simultaneous answers (This or That, Emoji Introduction), breakout rooms for Story Swap or Common Ground, and a shared doc for Guess Who. Cap each spoken turn at 30–60 seconds so remote energy does not stall.",
    },
    {
      q: "What are good Two Truths and a Lie examples for adults or students?",
      a: "Keep statements specific and light: “I have run a half marathon,” “I once lived in three countries,” “I speak conversational Japanese.” For students, use hobbies and school-safe experiences. Avoid trauma, romance, and status flexes.",
    },
    {
      q: "How long do these Two Truths alternatives take?",
      a: "Most alternatives take 5–15 minutes. Binary formats like This or That can finish in under eight minutes; storytelling rounds like Story Swap may need 10–15 minutes including a brief debrief.",
    },
    {
      q: "What should facilitators watch for during storytelling icebreakers?",
      a: "Watch oversharing, status pressure, and competitive “gotcha” energy. Offer a pass option, model a light example first, and celebrate curiosity rather than catching people out.",
    },
    {
      q: "Which Two Truths alternative works for large groups?",
      a: "For 30+ people, prefer This or That, Would You Rather, or Emoji Introduction in chat. Classic Two Truths and Story Swap work better in breakouts of 6–10 so turns stay short.",
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
              src="/img/games-like-two-truths-and-a-lie-hero.jpg"
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
              <span>Games like Two Truths and a Lie</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>12 Games Like Two Truths and a Lie</h1>
            <p className={styles.heroLead}>
              Looking for games like Two Truths and a Lie? Compare 12 get-to-know substitutes by
              risk, time, and setting—plus safer variations for work, class, and Zoom.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/two-truths-and-a-lie" className={styles.ctaPrimary}>
                How to play Two Truths and a Lie
              </Link>
              <Link href="/games/emoji-introduction" className={styles.ctaGhost}>
                Try Emoji Introduction
              </Link>
              <Link href="/games-like-human-bingo" className={styles.ctaGhost}>
                Games like Human Bingo
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
                Storytelling icebreakers like Two Truths suit new teams, classrooms, kickoffs, and
                groups ready for light personal sharing.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most Two Truths alternatives fit 5–40 people in 5–15 minutes, including a short
                reveal or debrief.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip bluffing games when trust is fragile, the agenda is under five minutes, or
                people have already signaled discomfort with personal questions.
              </p>
            </div>
          </section>

          <section className={styles.guide}>
            <h2>What people mean by “games like Two Truths and a Lie”</h2>
            <p>
              Searchers usually want a{" "}
              <strong>get-to-know-you icebreaker with a small reveal</strong>—not necessarily the
              exact “two truths + one lie” mechanic. Good substitutes keep curiosity, short turns,
              and optional depth, while changing the risk level (bluffing, opinion-only, or pure
              storytelling).
            </p>
            <p>
              If you need the classic rules first, start with our{" "}
              <Link href="/games/two-truths-and-a-lie">Two Truths and a Lie how-to</Link>. If the
              room dislikes lying, jump to{" "}
              <Link href="/games/two-truths-and-a-dream">Two Truths and a Dream</Link> or{" "}
              <Link href="/games/six-word-memoirs">Six Word Memoirs</Link>. For virtual rooms, try the
              in-page builder on{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>.
            </p>
          </section>

          <section className={styles.sectionHead}>
            <h2>Pick by scenario</h2>
            <p>
              Match the format to the room before you open the full list. Risk and time matter more
              than novelty.
            </p>
          </section>
          <div className={styles.scenarioGrid}>
            {scenarioPicks.map((item) => (
              <article key={item.title} className={styles.scenarioCard}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link href={item.href}>{item.linkLabel} →</Link>
              </article>
            ))}
          </div>

          <section className={styles.guide}>
            <h2>Quick comparison: risk, time, and vibe</h2>
            <p>
              Use this table to shortlist 2–3 options, then open the detailed how-to cards below.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th scope="col">Game</th>
                    <th scope="col">Risk</th>
                    <th scope="col">Time</th>
                    <th scope="col">Best vibe</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([game, risk, time, vibe]) => (
                    <tr key={game}>
                      <td>{game}</td>
                      <td>{risk}</td>
                      <td>{time}</td>
                      <td>{vibe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best games like Two Truths and a Lie</h2>
            <p>
              Choose by risk level first—then match energy, format, and how much storytelling you
              want. Below are twelve proven Two Truths substitutes and close cousins.
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
              “We’re going to play a short get-to-know-you round—think of it as a cousin to Two
              Truths and a Lie. Keep answers light, you can pass anytime, and we’re here for
              curiosity not gotchas. I’ll model first, then we’ll rotate quickly.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Storytelling icebreakers work when people feel free to stay surface-level. Use these
              notes whenever you run Two Truths or any close substitute.
            </p>
            <ul>
              <li>
                Model a work-safe or classroom-safe example first so people know the tone and
                depth you expect.
              </li>
              <li>
                Ban dating, salary, body, and private family drama prompts—especially at work.
              </li>
              <li>
                Offer a pass option and celebrate chat answers equally with spoken ones in hybrid
                rooms.
              </li>
              <li>
                Debrief connection and listening, not who “won” at spotting lies, so quieter
                participants stay included.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose among games like Two Truths and a Lie</h2>
            <p>
              Pick by risk and time. If the group enjoys light bluffing, classic Two Truths or
              Never Have I Ever creates fast energy. If people dislike lying, use Two Truths and a
              Dream, Six Word Memoirs, Common Ground, or Story Swap. Need something under eight
              minutes? This or That, Would You Rather, or Emoji Introduction keep the connection
              payoff without long turns.
            </p>
            <h3>For work &amp; adults</h3>
            <p>
              Keep prompts professional and optional. Strong picks:{" "}
              <Link href="/games/this-or-that-questions">This or That</Link>,{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>,{" "}
              <Link href="/games/common-ground">Common Ground</Link>, and themed Two Truths (“one
              work fact, one hobby, one travel”). More meeting-ready openers live in{" "}
              <Link href="/icebreaker-games-for-meetings">ice breaker games for meetings</Link>.
            </p>
            <h3>For classrooms &amp; teens</h3>
            <p>
              Favor pass options and school-safe examples. Try{" "}
              <Link href="/games/six-word-memoirs">Six Word Memoirs</Link>,{" "}
              <Link href="/games/the-name-game">The Name Game</Link>, or{" "}
              <Link href="/games/would-you-rather">Would You Rather</Link>. Print ready worksheets from{" "}
              <Link href="/blog/two-truths-and-a-lie-for-students-printable">
                Two Truths and a Lie for students printable
              </Link>
              . See also{" "}
              <Link href="/icebreaker-games-for-high-school-students">
                ice breaker games for high school students
              </Link>{" "}
              and{" "}
              <Link href="/blog/icebreaker-games-for-students">icebreaker games for students</Link>.
            </p>
            <h3>For virtual teams</h3>
            <p>
              Simultaneous chat beats long mute/unmute loops. Use emoji intros, reaction polls, or
              breakout Story Swap. Browse the{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link> hub and{" "}
              <Link href="/short-virtual-icebreakers">short virtual icebreakers</Link> when the
              agenda is tight.
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>What surprised you about someone else’s story?</li>
              <li>Which format felt easiest to join—and why?</li>
              <li>What should we reuse next time for a new group?</li>
              <li>How does listening carefully show up in our real work or class?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about games like Two Truths and a Lie</h2>
            {faqs.map((item) => (
              <div key={item.q} className={styles.faqItem}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>

          <section className={styles.sources} aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources &amp; further reading</h2>
            <p>
              Get-to-know formats work best with clear consent and time-boxing. These references
              support inclusive facilitation:
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
                <Link href="/games/two-truths-and-a-lie">
                  Ice Breaker Games — Two Truths and a Lie rules
                </Link>
              </li>
              <li>
                <Link href="/games-like-human-bingo">
                  Ice Breaker Games — Games like Human Bingo
                </Link>
              </li>
              <li>
                <Link href="/emoji-icebreaker-games">
                  Ice Breaker Games — Emoji icebreaker games
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Keep exploring games like Two Truths and a Lie with{" "}
              <Link href="/games/two-truths-and-a-lie">Two Truths and a Lie rules</Link>,{" "}
              <Link href="/blog/two-truths-and-a-lie-for-students-printable">
                Two Truths printable for students
              </Link>
              , <Link href="/games/two-truths-and-a-dream">Two Truths and a Dream</Link>,{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>,{" "}
              <Link href="/games-like-human-bingo">games like Human Bingo</Link>,{" "}
              <Link href="/games-like-the-human-knot">games like the Human Knot</Link>,{" "}
              <Link href="/icebreaker-games-for-meetings">meeting icebreakers</Link>,{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>,{" "}
              <Link href="/icebreaker-games-for-small-groups">
                ice breaker games for small groups
              </Link>
              ,{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link>, and the{" "}
              <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
