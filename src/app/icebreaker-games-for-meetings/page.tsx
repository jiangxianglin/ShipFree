import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./meetings.module.css";

export const revalidate = 86400;

const title = "14 Ice Breaker Games for Meetings (2026)";
const description =
  "Ice breaker games for meetings: 14 quick, low-pressure openers for standups, workshops, and team meetings—with players, time, rules, and facilitator scripts.";
const canonical = "https://www.icebreakergames.site/icebreaker-games-for-meetings";
const ogImage =
  "https://www.icebreakergames.site/img/icebreaker-games-for-meetings-hero.jpg";
const ogImageAlt =
  "Ice breaker games for meetings — professionals connecting in a bright workshop circle";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-05-05";
const dateModified = "2026-08-08";

const gameEntries = [
  {
    slug: "one-word-check-in",
    name: "One Word Check-In",
    bestFor: "Daily standups and recurring meetings that need a 3-minute arrival ritual",
    players: "4–40",
    time: "3–5 min",
    materials: "None (chat optional)",
    steps: [
      "Pose one prompt: “One word for your focus today” or “One word for your energy.”",
      "Go around the room—or collect answers in chat for larger groups.",
      "Mirror 1–2 themes aloud (“I hear focused and curious…”).",
      "Start the agenda without forcing follow-up questions.",
    ],
    variation:
      "Hybrid: everyone types first, then unmute volunteers only. Recurring teams: rotate the prompt weekly.",
    safety: "Keep words optional—silence or “pass” is a valid contribution.",
  },
  {
    slug: "weather-check-in",
    name: "Weather Check-In",
    bestFor: "Teams that want a metaphorical mood share without oversharing",
    players: "4–30",
    time: "3–6 min",
    materials: "None",
    steps: [
      "Ask each person to describe their current state as weather (sunny, foggy, stormy).",
      "Optionally add one sentence of context—keep it optional.",
      "Note patterns without diagnosing (“Looks like a mixed forecast today”).",
      "Bridge into the meeting purpose.",
    ],
    variation:
      "Virtual: emoji weather in chat. Large groups: sample 5–6 voices instead of full circle.",
    safety: "Never probe why someone chose “stormy”; offer a private check-in later if needed.",
  },
  {
    slug: "emoji-check-in",
    name: "Emoji Check-In",
    bestFor: "Virtual and hybrid meetings that need inclusive, low-pressure participation",
    players: "5–100+",
    time: "2–5 min",
    materials: "Meeting chat or reactions",
    steps: [
      "Ask everyone to drop one emoji for how they are arriving.",
      "On “3-2-1 send,” read the mood board aloud in 20–30 seconds.",
      "Invite 1–2 volunteers to explain if they want.",
      "Thank the room and move on.",
    ],
    variation: "Theme rounds: emoji for the project, the week, or the meeting goal.",
    safety: "Emoji-only is enough—do not require verbal explanation.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Quick energy and opinion sharing before workshops or brainstorms",
    players: "6–60",
    time: "5–8 min",
    materials: "Prompt list",
    steps: [
      "Read two options (coffee or tea; async docs or live debate).",
      "People raise hands, move sides, or reply A/B in chat.",
      "Ask one person from each side for a one-sentence reason.",
      "Run 4–6 rounds, then start the working agenda.",
    ],
    variation:
      "Work-themed prompts: “slide deck or live demo?” Keep personal prompts light.",
    safety: "Avoid polarizing political or personal-finance prompts in professional rooms.",
  },
  {
    slug: "the-check-in",
    name: "The Check-In",
    bestFor: "Retrospectives and workshops where psychological safety matters",
    players: "4–20",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Share a simple frame: “What do you need from this meeting to leave useful?”",
      "Each person answers in one sentence (or writes first).",
      "Capture themes on a whiteboard or shared doc.",
      "Adjust facilitation lightly based on what you heard.",
    ],
    variation: "Time-box to 60 seconds each in small rooms; chat-first in large rooms.",
    safety: "Model a concise answer so people do not feel pressure to overshare.",
  },
  {
    slug: "what-are-you-bringing-to-the-meeting",
    name: "What Are You Bringing to the Meeting?",
    bestFor: "Kickoffs and workshops that want intention without small talk fluff",
    players: "4–25",
    time: "5–8 min",
    materials: "None",
    steps: [
      "Ask: “What are you bringing today—energy, a question, a decision, or a blocker?”",
      "Go around or collect in chat.",
      "Group similar intentions so the agenda feels owned.",
      "Revisit one “bringing” at the close if useful.",
    ],
    variation: "Virtual: sticky-note board with four columns. Standups: one-word version only.",
    safety: "Allow “I’m here to listen” as a complete, respected answer.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative teams and writing-friendly groups who dislike long introductions",
    players: "5–30",
    time: "5–10 min",
    materials: "Paper, sticky notes, or chat",
    steps: [
      "Prompt a six-word memoir about the week, project, or role.",
      "Share in pairs or post to a board.",
      "Spotlight 2–3 vivid lines without critique.",
      "Connect one theme to the meeting goal.",
    ],
    variation: "Strict five minutes: write 60 seconds, share three aloud, move on.",
    safety: "No grading language—celebrate clarity over cleverness.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Cross-functional meetings and new project teams forming trust",
    players: "6–30",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Split into groups of 3–5.",
      "Find three non-obvious things everyone shares.",
      "Share one surprising commonality with the full room.",
      "Coach groups past “we all work here.”",
    ],
    variation: "Theme rounds (tools, hobbies, work style). Virtual: breakout rooms of 4.",
    safety: "Remind groups that nobody must reveal private details.",
  },
  {
    slug: "topics-tables",
    name: "Topics Tables",
    bestFor: "Networking-style workshops and multi-topic meetings",
    players: "12–40",
    time: "15–25 min",
    materials: "Table signs or breakout rooms",
    steps: [
      "Label tables or rooms with discussion topics.",
      "People choose a table for a timed round (5–7 minutes).",
      "Rotate once or twice so people meet new voices.",
      "Harvest one insight per table for the full group.",
    ],
    variation: "Small meetings: use corner spots instead of tables. Virtual: topic channels.",
    safety: "Offer a “floater” role for anyone who prefers observing first.",
  },
  {
    slug: "desert-island-scenario",
    name: "Desert Island Scenario",
    bestFor: "Creative warm-ups before brainstorming or product workshops",
    players: "5–25",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Prompt: “You can bring three work tools to a desert island—what and why?”",
      "Share in pairs, then invite a few examples.",
      "Listen for values (simplicity, collaboration, craft).",
      "Bridge those values into the real workshop task.",
    ],
    variation: "Meeting-safe version: three apps you cannot live without this quarter.",
    safety: "Keep it playful; avoid survival anxiety framing for stressed teams.",
  },
  {
    slug: "the-question-web",
    name: "The Question Web",
    bestFor: "Small in-person meetings that need connection before deep work",
    players: "6–16",
    time: "8–12 min",
    materials: "Ball of yarn (optional)",
    steps: [
      "One person asks a light question and tosses the yarn (or points) to someone.",
      "That person answers, then asks a new question for the next person.",
      "Continue until most people are connected.",
      "Close by naming one pattern you noticed.",
    ],
    variation: "No yarn: verbal “web” with raised hands. Virtual: spotlight + chat queue.",
    safety: "Use prepared question cards so nobody invents awkward prompts.",
  },
  {
    slug: "chat-waterfall",
    name: "Chat Waterfall",
    bestFor: "Large Zoom/Teams meetings that need inclusive answers fast",
    players: "8–100+",
    time: "3–6 min",
    materials: "Meeting chat",
    steps: [
      "Pose a light prompt (small win, desk object, one hope for the meeting).",
      "Everyone types but waits to send.",
      "On “3-2-1 send,” skim themes aloud for 60–90 seconds.",
      "Thank the room and open the agenda.",
    ],
    variation: "In-person: sticky-note waterfall on a whiteboard wall.",
    safety: "Default to optional unmute; chat answers count fully.",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Kickoffs and offsites when the group has 10+ minutes and some trust",
    players: "5–25",
    time: "10–15 min",
    materials: "None",
    steps: [
      "Each person shares two true statements and one false statement.",
      "The group guesses the lie.",
      "Reveal quickly and rotate.",
      "Keep prompts work-safe: hobbies, skills, travel—not private drama.",
    ],
    variation: "Meeting version: truths about the project or role this quarter.",
    safety: "Model a fun example first; never pressure personal disclosures.",
  },
  {
    slug: "speed-networking",
    name: "Speed Networking",
    bestFor: "Larger all-hands or cross-team meetings that need rapid introductions",
    players: "10–60",
    time: "10–20 min",
    materials: "Timer; breakout rooms optional",
    steps: [
      "Pair people for 2–3 minute rounds with one prompt.",
      "Rotate 3–4 times.",
      "Invite 2–3 highlights to the full room.",
      "Use prompts tied to the meeting goal when possible.",
    ],
    variation: "Virtual: timed breakouts. Small rooms: standing pair swaps.",
    safety: "Offer a solo “observer journal” option for anyone who wants lower intensity.",
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

export default async function IcebreakerGamesForMeetingsPage() {
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
      q: "What are good ice breaker games for meetings?",
      a: "Good meeting icebreakers are short, inclusive, and easy to explain. One Word Check-In, Weather Check-In, Emoji Check-In, This or That, and Chat Waterfall get everyone participating quickly without cringe.",
    },
    {
      q: "How long should a meeting icebreaker take?",
      a: "Most meeting icebreakers should take 3–10 minutes. For recurring meetings, keep it closer to 3–5 minutes. For workshops, you can extend to 10–15 minutes if it supports the agenda.",
    },
    {
      q: "What icebreakers work for shy or introverted people?",
      a: "Use predictable, low-pressure formats like One Word Check-In, writing-first prompts, Emoji Check-In, or chat-based answers. Keep questions optional and avoid putting anyone on the spot.",
    },
    {
      q: "What is a good icebreaker question for a meeting?",
      a: "Try a single, safe prompt like: “One word for your focus today,” “What is one small win from this week?,” or “What do you want to leave this meeting with?” Keep it short and relevant.",
    },
    {
      q: "Can meeting icebreakers be used online?",
      a: "Yes. For online meetings, use chat-based check-ins, emoji reactions, or short sharing activities. Chat formats scale better for large groups and reduce pressure. See also short virtual icebreakers.",
    },
    {
      q: "Where can I find funny ice breaker games for meetings?",
      a: "For humor-forward openers that still stay professional, see our guide to funny ice breaker games for meetings—built for laughs without awkward oversharing.",
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
              src="/img/icebreaker-games-for-meetings-hero.jpg"
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
              <span>Ice breaker games for meetings</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>14 Ice Breaker Games for Meetings</h1>
            <p className={styles.heroLead}>
              Quick, low-pressure openers for standups, workshops, and team meetings—with
              players, time, rules, and scripts facilitators can run today.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/one-word-check-in" className={styles.ctaPrimary}>
                Start with One Word Check-In
              </Link>
              <Link href="/funny-icebreaker-games-for-meetings" className={styles.ctaGhost}>
                Funny meeting icebreakers
              </Link>
              <Link href="/icebreaker-games-for-work" className={styles.ctaGhost}>
                Work icebreakers
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
                Standups, team meetings, workshops, and retrospectives that need ice breaker
                games for meetings without awkward oversharing.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most rounds fit 4–40 people in 3–10 minutes; Topics Tables and Speed Networking
                may need 15–20 minutes.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip long personal-sharing games if the agenda is already tight, trust is low,
                or people need quiet focus before a hard decision.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best ice breaker games for meetings</h2>
            <p>
              Choose by time box and participation style first—then match group size and whether
              you are in-person, hybrid, or fully remote. Below are fourteen facilitator-ready
              options.
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
              “We’re going to do a short icebreaker so everyone arrives together. You can pass
              anytime—chat answers count. The goal is connection, not performance. We’ll keep it
              to a few minutes, then jump into the agenda.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Ice breaker games for meetings work when people feel free to opt out and nobody is
              set up to be embarrassed in front of their manager.
            </p>
            <ul>
              <li>
                State a pass option upfront and offer chat or written options for quieter voices.
              </li>
              <li>
                Time-box ruthlessly—meeting icebreakers lose trust when they eat the working
                agenda.
              </li>
              <li>
                Prefer work-safe prompts; save deep personal stories for trusted offsites.
              </li>
              <li>
                In hybrid rooms, design for remote first so in-room voices do not dominate.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose icebreaker games for meetings</h2>
            <p>
              For a 5-minute standup, start with{" "}
              <Link href="/games/one-word-check-in">One Word Check-In</Link>,{" "}
              <Link href="/games/emoji-check-in">Emoji Check-In</Link>, or{" "}
              <Link href="/games/chat-waterfall">Chat Waterfall</Link>. For workshops, use{" "}
              <Link href="/games/common-ground">Common Ground</Link>,{" "}
              <Link href="/games/topics-tables">Topics Tables</Link>, or{" "}
              <Link href="/games/speed-networking">Speed Networking</Link>. When you want laughs
              without losing professionalism, see{" "}
              <Link href="/funny-icebreaker-games-for-meetings">
                funny ice breaker games for meetings
              </Link>
              . For remote-heavy agendas, continue with{" "}
              <Link href="/short-virtual-icebreakers">short virtual icebreakers</Link> or the{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link> hub. For
              broader workplace contexts, see{" "}
              <Link href="/icebreaker-games-for-work">icebreaker games for work</Link>.
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>What helped you feel ready to contribute today?</li>
              <li>Whose perspective surprised you in a useful way?</li>
              <li>What should we keep or drop in next week’s opener?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about ice breaker games for meetings</h2>
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
              workplace cluster pages:
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
                <Link href="/icebreaker-games-for-work">
                  Ice Breaker Games — Icebreaker games for work
                </Link>
              </li>
              <li>
                <Link href="/virtual-icebreaker-games">
                  Ice Breaker Games — Virtual ice breaker games
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the <Link href="/">Ice Breaker Games home</Link>, then explore this
              workplace hub and nearby pages:{" "}
              <Link href="/funny-icebreaker-games-for-meetings">
                funny ice breaker games for meetings
              </Link>
              , <Link href="/icebreaker-games-for-work">icebreaker games for work</Link>,{" "}
              <Link href="/short-virtual-icebreakers">short virtual icebreakers</Link>,{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link>,{" "}
              <Link href="/icebreaker-games-for-small-groups">
                ice breaker games for small groups
              </Link>
              , and the <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
