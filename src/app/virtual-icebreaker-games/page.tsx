import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./virtual.module.css";

export const revalidate = 86400;

const title = "14 Virtual Ice Breaker Games (2026)";
const description =
  "Virtual ice breaker games for Zoom, Teams, and online meetings—14 inclusive activities with players, time, rules, facilitator tips, and links to short & riddle warm-ups.";
const canonical = "https://www.icebreakergames.site/virtual-icebreaker-games";
const ogImage =
  "https://www.icebreakergames.site/img/virtual-icebreaker-games-hero.jpg";
const ogImageAlt =
  "Virtual ice breaker games — remote teammates laughing during an online meeting warm-up";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2025-11-01";
const dateModified = "2026-08-11";

const gameEntries = [
  {
    slug: "chat-waterfall",
    name: "Chat Waterfall",
    bestFor: "Large Zoom or Teams rooms that need inclusive energy in under five minutes",
    players: "8–100+",
    time: "3–5 min",
    materials: "Meeting chat",
    steps: [
      "Pose one clear, low-stakes prompt.",
      "Everyone types an answer but waits to send.",
      "On “3-2-1 send,” skim themes aloud for 60 seconds.",
      "Thank the room and open the agenda.",
    ],
    variation: "Emoji-only waterfall for multilingual or shy groups.",
  },
  {
    slug: "emoji-check-in",
    name: "Emoji Check-In",
    bestFor: "The fastest virtual mood pulse before a standup or all-hands",
    players: "5–100+",
    time: "2–5 min",
    materials: "Meeting chat or reactions",
    steps: [
      "Ask everyone to post one emoji for their current energy.",
      "Optionally add a three-word note in chat.",
      "Host summarizes themes (“lots of ☕ and 🔥 today”).",
      "Invite one volunteer to expand if time allows.",
    ],
    variation: "Project-mood check: emoji for the sprint, not personal life.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "New remote teams that want visual humor without long turn-taking",
    players: "5–40",
    time: "5–8 min",
    materials: "Chat or whiteboard",
    steps: [
      "Each person posts 2–3 emojis that represent them or their week.",
      "The group guesses once; the author clarifies in one sentence.",
      "For larger groups, only volunteers explain.",
      "Model a vivid example first to set the tone.",
    ],
    variation: "Theme rounds: emoji for the customer, the product, or “meeting energy.”",
  },
  {
    slug: "virtual-background-story",
    name: "Virtual Background Story",
    bestFor: "Video-on meetings that need a visual laugh and quick shares",
    players: "6–40",
    time: "5–10 min",
    materials: "Video meeting with background change",
    steps: [
      "Give 60 seconds for everyone to set a playful virtual background.",
      "Invite 4–6 people to explain their choice in one sentence.",
      "Collect themes (“escape,” “nostalgia,” “chaos”).",
      "Reset backgrounds and open the agenda.",
    ],
    variation: "Theme: “background that matches this project’s mood.”",
  },
  {
    slug: "one-word-check-in",
    name: "One Word Check-In",
    bestFor: "Formal remote meetings that still want a human open",
    players: "5–60",
    time: "3–6 min",
    materials: "Chat or spoken round",
    steps: [
      "Prompt: one word for how you’re arriving (or for the project).",
      "Collect answers in chat simultaneously for large groups.",
      "Read a few themes; avoid forcing every person to unmute.",
      "Bridge one word into the meeting purpose.",
    ],
    variation: "Two-word check-in for hybrid rooms with uneven trust.",
  },
  {
    slug: "weather-check-in",
    name: "Weather Check-In",
    bestFor: "Metaphorical mood sharing that stays light and inclusive",
    players: "5–40",
    time: "4–7 min",
    materials: "Chat or spoken round",
    steps: [
      "Ask people to describe their energy as weather (sunny, foggy, thunderstorm).",
      "Collect answers in chat for speed.",
      "Host reflects patterns without diagnosing anyone.",
      "Offer a pass option and move on while curiosity is warm.",
    ],
    variation: "“Forecast for this meeting” instead of personal mood.",
  },
  {
    slug: "take-a-picture-of-your-shoes",
    name: "Take a Picture of Your Shoes",
    bestFor: "Camera-friendly icebreakers that feel playful, not invasive",
    players: "6–30",
    time: "5–8 min",
    materials: "Phone or webcam",
    steps: [
      "Ask volunteers to show their shoes on camera (or a desk object).",
      "Each shares one sentence: why these shoes / what the day looks like.",
      "Keep the round voluntary—chat descriptions count.",
      "Thank participants and start the agenda.",
    ],
    variation: "Show a favorite mug, plant, or notebook instead of shoes.",
  },
  {
    slug: "picture-sharing",
    name: "Picture Sharing",
    bestFor: "Remote teams that want story energy without a lie/guess mechanic",
    players: "5–25",
    time: "8–12 min",
    materials: "Phone photos or screen share",
    steps: [
      "Prompt a safe theme (favorite view, pet, workspace corner).",
      "Volunteers share one photo for 20–30 seconds.",
      "Listeners ask one curious question max.",
      "Cap the number of shares so the meeting stays on time.",
    ],
    variation: "Async option: post photos in Slack before the call.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Instant participation at scale on Zoom or Teams",
    players: "5–100+",
    time: "3–8 min",
    materials: "Prompt list or poll",
    steps: [
      "Offer quick pairs (coffee/tea, docs/meetings, beach/mountains).",
      "Collect answers via reactions, polls, or simultaneous chat.",
      "Highlight funny splits; skip long debates.",
      "Bridge one theme into the work topic.",
    ],
    variation: "Work tools theme: Slack threads vs. live debate.",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Smaller virtual rooms that want storytelling and light guessing",
    players: "5–20",
    time: "8–15 min",
    materials: "None (chat votes optional)",
    steps: [
      "Each speaker shares two truths and one lie—work-safe and vivid.",
      "Others vote in chat on the lie.",
      "Reveal fast; celebrate creative stories.",
      "Limit speakers in large meetings or use breakouts.",
    ],
    variation: "See more get-to-know cousins on games like Two Truths and a Lie.",
  },
  {
    slug: "skribbl-pictionary-online",
    name: "Skribbl / Pictionary Online",
    bestFor: "Remote teams that want collaborative silly drawings",
    players: "4–16",
    time: "8–12 min",
    materials: "skribbl.io or shared whiteboard",
    steps: [
      "Open a shared drawing tool with meeting-safe words.",
      "One person draws; others guess in chat.",
      "Rotate artists every round.",
      "Keep a custom word pack (standups, OKRs, coffee) for relevance.",
    ],
    variation: "Whiteboard-only if you cannot leave the meeting platform.",
  },
  {
    slug: "telephone-charades",
    name: "Telephone Charades",
    bestFor: "Breakout comedy when mute/unmute chaos is welcome",
    players: "8–24",
    time: "8–12 min",
    materials: "Prompt cards; breakout rooms optional",
    steps: [
      "Line up or sequence people; show a prompt only to the first person.",
      "They act it (no words) for the next person only.",
      "Continue down the line; the last person guesses.",
      "Compare the final guess with the original prompt.",
    ],
    variation: "Use workplace phrases only (“quarterly forecast,” “catch-up meeting”).",
  },
  {
    slug: "show-and-tell",
    name: "Show and Tell",
    bestFor: "Recurring remote teams that want a warm, low-prep ritual",
    players: "5–20",
    time: "6–12 min",
    materials: "One object nearby",
    steps: [
      "Ask 3–5 volunteers to show one object and tell a 30-second story.",
      "Keep prompts optional and light.",
      "Celebrate variety; do not force camera-on for everyone.",
      "Rotate volunteers across weeks so the same people are not always on stage.",
    ],
    variation: "Theme weeks: favorite snack, tool that saved your week, childhood book.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Opinion laughs that work equally well in chat or on camera",
    players: "6–60",
    time: "5–8 min",
    materials: "Prompt list",
    steps: [
      "Read two absurd-but-safe options.",
      "People reply A/B in chat or use reactions.",
      "Ask one person per side for a one-sentence defense.",
      "Run 5–7 rounds, then start the real work.",
    ],
    variation: "Meeting-pain theme: squeaky mic vs. auto-advancing slides.",
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

export default async function VirtualIcebreakerGamesPage() {
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
      q: "What are good virtual ice breaker games for Zoom or Teams?",
      a: "Good virtual icebreaker games are fast, inclusive, and easy to run in chat or on camera. Try Chat Waterfall, Emoji Check-In, Emoji Introduction, Virtual Background Story, This or That, or One Word Check-In.",
    },
    {
      q: "What is a quick 5-minute virtual icebreaker?",
      a: "Emoji Check-In, One Word Check-In, Weather Check-In, or Chat Waterfall usually takes 2–5 minutes. For a full shortlist, see short virtual icebreakers / 5 minute ice breakers for virtual meetings.",
    },
    {
      q: "How do you make virtual icebreakers not awkward?",
      a: "Set a clear purpose, keep it short, give people an easy pass option, and use prompts that are light and optional. Prefer simultaneous formats (chat) for large groups to reduce spotlight pressure.",
    },
    {
      q: "What virtual icebreakers work for large groups?",
      a: "Use activities that scale: Chat Waterfall, Emoji Check-In, This or That polls, and Would You Rather via reactions. Avoid long turn-taking unless you use breakouts.",
    },
    {
      q: "Do virtual ice breaker games need special tools?",
      a: "Not usually. Most only require video and chat (Zoom, Teams, Meet). Drawing games can use a shared whiteboard or skribbl.io, but many warm-ups need nothing extra.",
    },
    {
      q: "Where can I find riddle-style virtual icebreakers?",
      a: "See riddle icebreakers for virtual meetings for puzzle and guessing formats that still stay inclusive and work-safe.",
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
              src="/img/virtual-icebreaker-games-hero.jpg"
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
              <span>Virtual ice breaker games</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>14 Virtual Ice Breaker Games</h1>
            <p className={styles.heroLead}>
              Zoom- and Teams-ready warm-ups with clear timing, chat-first options, and
              facilitator tips—so remote meetings start warmer without eating the agenda.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/short-virtual-icebreakers" className={styles.ctaPrimary}>
                Short / 5-minute virtual icebreakers
              </Link>
              <Link
                href="/riddle-icebreakers-for-virtual-meetings"
                className={styles.ctaGhost}
              >
                Riddle icebreakers for virtual meetings
              </Link>
              <Link href="/games/chat-waterfall" className={styles.ctaGhost}>
                Chat Waterfall
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
                Virtual ice breaker games suit remote standups, all-hands, hybrid workshops, and
                distributed teams that need inclusive energy on Zoom or Teams.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most rounds fit 5–100 people in 2–12 minutes. Chat-first formats scale; storytelling
                rounds work best under ~20 unmuted speakers.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip high-energy camera games if bandwidth is poor, trust is fragile, or you only
                have two minutes before a decision.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best virtual ice breaker games</h2>
            <p>
              Pick by format first—chat-at-scale, camera-optional, or playful tools—then match
              time. Need only five minutes? Jump to{" "}
              <Link href="/short-virtual-icebreakers">short virtual icebreakers</Link>. Want
              puzzle energy? Try{" "}
              <Link href="/riddle-icebreakers-for-virtual-meetings">
                riddle icebreakers for virtual meetings
              </Link>
              .
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
              “We’re going to do a short virtual icebreaker—nothing awkward, and you can pass or
              answer in chat. The goal is a warmer start so the meeting feels human. Keep answers
              light; we’ll wrap in a few minutes.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Remote icebreakers fail when they force camera performance. Design for chat-first
              inclusion and clear time boxes.
            </p>
            <ul>
              <li>State a pass option and celebrate chat answers equally with spoken ones.</li>
              <li>
                Prefer simultaneous formats for large groups so people are not trapped in long
                unmute queues.
              </li>
              <li>
                Pre-screen prompts for politics, body jokes, dating, and anything that could single
                someone out on a recorded call.
              </li>
              <li>
                If energy gets chaotic, land the plane: thank the room and open the agenda while
                people are still smiling.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose virtual icebreaker games</h2>
            <p>
              For instant scale, start with{" "}
              <Link href="/games/chat-waterfall">Chat Waterfall</Link>,{" "}
              <Link href="/games/emoji-check-in">Emoji Check-In</Link>, or{" "}
              <Link href="/games/this-or-that-questions">This or That</Link>. For visual laughs,
              try{" "}
              <Link href="/games/virtual-background-story">Virtual Background Story</Link> or{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>. For storytelling
              in smaller rooms, use{" "}
              <Link href="/games/two-truths-and-a-lie">Two Truths and a Lie</Link> or browse{" "}
              <Link href="/games-like-two-truths-and-a-lie">
                games like Two Truths and a Lie
              </Link>
              . In-person and hybrid agendas can continue with{" "}
              <Link href="/icebreaker-games-for-meetings">
                ice breaker games for meetings
              </Link>{" "}
              and{" "}
              <Link href="/funny-icebreaker-games-for-meetings">
                funny ice breaker games for meetings
              </Link>
              .
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>What made it easy to participate today—chat, camera, or both?</li>
              <li>Which prompt should we reuse for the next all-hands?</li>
              <li>Did anyone prefer staying off camera—and how can we keep that option?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about virtual ice breaker games</h2>
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
              Remote facilitation still needs inclusion and timing discipline. These references
              support both:
            </p>
            <ol>
              <li>
                <a
                  href="https://sloanreview.mit.edu/article/the-surprising-benefits-of-work-friends/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT Sloan — Research on workplace connection
                </a>
              </li>
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
                <Link href="/short-virtual-icebreakers">
                  Ice Breaker Games — Short virtual icebreakers
                </Link>
              </li>
              <li>
                <Link href="/riddle-icebreakers-for-virtual-meetings">
                  Ice Breaker Games — Riddle icebreakers for virtual meetings
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the <Link href="/">Ice Breaker Games home</Link>, then explore the online
              meeting cluster:{" "}
              <Link href="/short-virtual-icebreakers">
                short virtual icebreakers / 5 minute ice breakers for virtual meetings
              </Link>
              ,{" "}
              <Link href="/riddle-icebreakers-for-virtual-meetings">
                riddle icebreakers for virtual meetings
              </Link>
              ,{" "}
              <Link href="/emoji-icebreaker-games">emoji icebreaker games</Link>,{" "}
              <Link href="/icebreaker-games-for-meetings">
                ice breaker games for meetings
              </Link>
              ,{" "}
              <Link href="/funny-icebreaker-games-for-meetings">
                funny ice breaker games for meetings
              </Link>
              ,{" "}
              <Link href="/games-like-two-truths-and-a-lie">
                games like Two Truths and a Lie
              </Link>
              , and the <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
