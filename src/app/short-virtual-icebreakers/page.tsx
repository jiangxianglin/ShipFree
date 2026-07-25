import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./short-virtual.module.css";

export const revalidate = 86400;

const title = "14 Short Virtual Icebreakers & 5-Minute Zoom Warm-Ups (2026)";
const description =
  "Short virtual icebreakers and 5 minute ice breakers for virtual meetings. Fourteen Zoom-ready warm-ups with players, time, rules, and facilitator tips.";
const canonical = "https://www.icebreakergames.site/short-virtual-icebreakers";
const ogImage =
  "https://www.icebreakergames.site/img/short-virtual-icebreakers-hero.jpg";
const ogImageAlt =
  "Short virtual icebreakers — remote teammates laughing during a five-minute Zoom warm-up";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-07-25";
const dateModified = "2026-07-25";

const gameEntries = [
  {
    slug: "emoji-check-in",
    name: "Emoji Check-In",
    bestFor: "The fastest 5 minute ice breaker for virtual meetings when you need a mood pulse",
    players: "5–100+",
    time: "2–5 min",
    materials: "Meeting chat",
    steps: [
      "Ask everyone to post one emoji for energy right now.",
      "Optional: add a second emoji for focus or what they need from the call.",
      "Skim patterns out loud (“lots of ☕ and 🔋—let’s keep this crisp”).",
      "Move on; do not force every person to explain.",
    ],
    variation:
      "Theme it: weekend emoji, project-risk emoji, or “one emoji for this agenda item.”",
  },
  {
    slug: "one-word-check-in",
    name: "One Word Check-In",
    bestFor: "Ultra-short virtual icebreakers that still feel human",
    players: "5–60",
    time: "3–5 min",
    materials: "Chat or unmute round",
    steps: [
      "Prompt: “One word for how you are arriving today.”",
      "Collect answers in chat waterfall or a quick go-around for small groups.",
      "Reflect one theme (“many ‘rushed’—we’ll protect the parking lot”).",
      "Start the agenda within five minutes total.",
    ],
    variation:
      "Use two words max, or “one word + one emoji” for hybrid energy.",
  },
  {
    slug: "weather-check-in",
    name: "Weather Check-In",
    bestFor: "Metaphorical short virtual icebreakers that avoid oversharing",
    players: "5–40",
    time: "3–6 min",
    materials: "None",
    steps: [
      "Ask people to describe their current state as weather (sunny, foggy, stormy).",
      "Collect answers in chat; invite 1–2 volunteers to expand in ten seconds.",
      "Acknowledge the forecast without diagnosing anyone.",
      "Bridge into the meeting purpose.",
    ],
    variation:
      "Add “what would improve the weather by one notch?” for coaching-style sessions.",
  },
  {
    slug: "chat-waterfall",
    name: "Chat Waterfall",
    bestFor: "Large-group 5 minute ice breakers for virtual meetings with high inclusion",
    players: "8–100+",
    time: "3–6 min",
    materials: "Meeting chat",
    steps: [
      "Pose a light prompt (favorite snack, win of the week, desk object).",
      "Everyone types but waits to send.",
      "On “3-2-1 send,” read themes aloud for 60–90 seconds.",
      "Thank the room and start work.",
    ],
    variation:
      "Use a tiny riddle prompt and link to longer riddle icebreakers afterward.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Opinion sparks that finish in under five minutes on Zoom",
    players: "6–80",
    time: "4–8 min",
    materials: "Prompt list; reactions or chat",
    steps: [
      "Offer two options (tea/coffee, early bird/night owl, slides/whiteboard).",
      "People react or reply A/B in chat.",
      "Run 4–6 rapid rounds; skip long debate.",
      "Close with the funniest split.",
    ],
    variation:
      "Work-themed pairs: async/sync, camera on/off optional, deep work/collaboration day.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Playful short virtual icebreakers with clear A/B movement in chat",
    players: "6–60",
    time: "5–8 min",
    materials: "Prompt list",
    steps: [
      "Read two options; people answer in chat or with reactions.",
      "Ask one volunteer from each side for a one-sentence reason.",
      "Keep prompts funny and work-safe.",
      "Cap at five rounds for true five-minute timing.",
    ],
    variation:
      "Silent mode: chat answers only—no unmute—for shy or multilingual teams.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "New remote teammates who need a five-minute get-to-know round",
    players: "5–25",
    time: "5–10 min",
    materials: "Chat",
    steps: [
      "Each person posts 2–3 emojis that represent them.",
      "Group guesses once; author clarifies in one sentence.",
      "For larger groups, only volunteer explains.",
      "Park longer stories for later networking.",
    ],
    variation:
      "Timebox to “emoji only, no explanations” when you need a strict 5-minute cap.",
  },
  {
    slug: "take-a-picture-of-your-shoes",
    name: "Take a Picture of Your Shoes",
    bestFor: "Visual short icebreakers that break camera awkwardness fast",
    players: "5–30",
    time: "4–7 min",
    materials: "Camera or phone photo",
    steps: [
      "Ask everyone to show their shoes on camera (or a photo).",
      "Invite a few people to share a one-line shoe story.",
      "Laugh, then move on—do not critique style.",
      "Offer a pass for anyone who prefers not to show.",
    ],
    variation:
      "Desk-object version: show one item within arm’s reach instead of shoes.",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Classic short virtual icebreakers when you can spare ~8 minutes",
    players: "5–20",
    time: "6–10 min",
    materials: "None",
    steps: [
      "Limit to 4–6 speakers for a five-to-eight-minute window.",
      "Each shares two truths and one lie; group votes in chat.",
      "Reveal quickly; no long stories.",
      "Save full-group rounds for longer socials.",
    ],
    variation:
      "Host-only round: facilitator shares three statements; team guesses—90 seconds total.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative 5 minute ice breakers for virtual meetings with writers and makers",
    players: "5–40",
    time: "4–8 min",
    materials: "Chat",
    steps: [
      "Prompt a six-word memoir about the week or the project.",
      "Post in chat; spotlight 2–3 favorites.",
      "No critiques—celebrate vivid phrases.",
      "Bridge one memoir theme into the agenda.",
    ],
    variation:
      "Strict five minutes: write 60 seconds, send together, host reads three aloud.",
  },
  {
    slug: "picture-sharing",
    name: "Picture Sharing",
    bestFor: "Show-and-tell energy in a short virtual window",
    players: "5–20",
    time: "5–10 min",
    materials: "Phone photo or screen share",
    steps: [
      "Ask for one photo that answers a prompt (favorite view, pet, lunch).",
      "People hold phones to camera or drop images in chat.",
      "Invite two volunteers to narrate for 15 seconds.",
      "Keep the rest as gallery appreciation only.",
    ],
    variation:
      "Async-first: collect photos in a channel before the meeting, then review live for three minutes.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "Brand-new remote cohorts that must learn names in under ten minutes",
    players: "6–20",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Each person says name + one simple prompt (favorite snack or hobby).",
      "Next person repeats previous names if the group is small.",
      "Drop the memory chain for groups above twelve—just go around once.",
      "Correct pronunciations gently and write names in chat.",
    ],
    variation:
      "Alliterate: “Joyful Jordan,” “Mango Maya”—optional if it feels forced.",
  },
  {
    slug: "never-have-i-ever",
    name: "Never Have I Ever",
    bestFor: "High-energy short virtual icebreakers for teams that already trust each other",
    players: "6–25",
    time: "5–8 min",
    materials: "Fingers or chat score",
    steps: [
      "Use a clean, pre-approved prompt list only.",
      "Players show fingers on camera or track in chat.",
      "Run 5–6 prompts max for a five-minute feel.",
      "Ban alcohol, dating, and illegal-activity prompts.",
    ],
    variation:
      "Work edition: “Never have I ever… shipped on a Friday / joined a meeting from a train.”",
  },
  {
    slug: "virtual-background-story",
    name: "Virtual Background Story",
    bestFor: "Slightly longer short virtual icebreakers with visual storytelling",
    players: "5–16",
    time: "6–10 min",
    materials: "Virtual background or prop",
    steps: [
      "Everyone sets a background that hints at a story.",
      "Others guess; author explains in 20 seconds.",
      "Limit to a handful of shares if time is tight.",
      "Great before creative workshops.",
    ],
    variation:
      "Host picks one theme so guesses stay fast and on-topic.",
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

export default async function ShortVirtualIcebreakersPage() {
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
      q: "What are the best short virtual icebreakers?",
      a: "Emoji Check-In, One Word Check-In, Weather Check-In, Chat Waterfall, This or That, and Would You Rather are the most reliable short virtual icebreakers. Most finish in 3–8 minutes on Zoom or Teams.",
    },
    {
      q: "What are good 5 minute ice breakers for virtual meetings?",
      a: "Stick to chat-first formats: emoji or one-word check-ins, chat waterfall prompts, and rapid This or That rounds. Avoid full-group Two Truths unless you limit speakers.",
    },
    {
      q: "How do I keep a virtual icebreaker under five minutes?",
      a: "Use one prompt, collect answers in chat, reflect themes for 30–60 seconds, and start the agenda. Do not ask every person to unmute.",
    },
    {
      q: "Are short virtual icebreakers okay for large Zoom webinars?",
      a: "Yes—Chat Waterfall and emoji check-ins scale past 50 people. Skip go-arounds and charades unless you use breakouts.",
    },
    {
      q: "Should I use the same short icebreaker every week?",
      a: "Rotate two or three formats so the ritual stays fresh. Keep the time box consistent so people know what to expect.",
    },
  ];

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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
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
              src="/img/short-virtual-icebreakers-hero.jpg"
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
              <Link href="/virtual-icebreaker-games">Virtual</Link>
              <span>/</span>
              <span>Short virtual icebreakers</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>
              14 Short Virtual Icebreakers (5-Minute Zoom Warm-Ups)
            </h1>
            <p className={styles.heroLead}>
              Looking for short virtual icebreakers or 5 minute ice breakers for virtual
              meetings? Pick a Zoom-ready warm-up with clear timing and steps.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/virtual-icebreaker-games" className={styles.ctaPrimary}>
                Virtual ice breaker games hub
              </Link>
              <Link
                href="/riddle-icebreakers-for-virtual-meetings"
                className={styles.ctaGhost}
              >
                Riddle icebreakers for virtual meetings
              </Link>
              <Link href="/games/emoji-check-in" className={styles.ctaGhost}>
                Emoji Check-In
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <p className={styles.byline}>
            By{" "}
            <Link href="/about">{authorName}</Link>
            <span aria-hidden="true"> · </span>
            <time dateTime={datePublished}>Published {datePublished}</time>
            <span aria-hidden="true"> · </span>
            <time dateTime={dateModified}>Updated {dateModified}</time>
          </p>

          <section className={styles.snapshot} aria-label="When these games work best">
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Best for</p>
              <p>
                Standups, kickoffs, and hybrid meetings when you need short virtual
                icebreakers that respect the clock.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most 5 minute ice breakers for virtual meetings fit any gallery size in
                3–8 minutes with chat-first participation.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip long go-arounds, deep personal prompts, or multi-round games when
                the agenda is already tight.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best short virtual icebreakers &amp; 5-minute warm-ups</h2>
            <p>
              Start with chat formats for large calls. Use camera show-and-tell only when
              the group is small and already comfortable on video.
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
            <h2>Facilitator script (20 seconds)</h2>
            <p>
              “Before we dive in, one short virtual icebreaker—ninety seconds in chat.
              Type your answer but wait to send. On three, hit enter. There is no wrong
              answer; we are just waking up the room. Ready? Three, two, one—send.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Short does not mean careless. Protect psychological safety even in a
              five-minute window.
            </p>
            <ul>
              <li>Default to chat so camera-off and muted people can join equally.</li>
              <li>
                Avoid appearance-based prompts and anything that pressures personal
                disclosure.
              </li>
              <li>
                Timebox ruthlessly: one prompt, one reflection, then the agenda.
              </li>
              <li>
                Offer a pass every time—participation is invited, not required.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>
              How to pick short virtual icebreakers vs longer virtual games
            </h2>
            <p>
              If you only have five minutes, use Emoji Check-In, One Word Check-In,
              Weather Check-In, or Chat Waterfall. If you have eight to twelve minutes and
              a smaller room, Two Truths, Picture Sharing, or Virtual Background Story
              add more connection. For puzzle energy, switch to{" "}
              <Link href="/riddle-icebreakers-for-virtual-meetings">
                riddle icebreakers for virtual meetings
              </Link>
              .
            </p>
            <h3>Debrief questions (optional—30 seconds)</h3>
            <ul>
              <li>What theme showed up most in the chat?</li>
              <li>What do we want to protect in today’s agenda based on that?</li>
              <li>Did this format feel long, short, or just right?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about short virtual icebreakers</h2>
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
              Timing and inclusion guidance draws on remote-meeting practice and established
              facilitation libraries:
            </p>
            <ol>
              <li>
                <a
                  href="https://hbr.org/topic/subject/remote-work"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Harvard Business Review — Remote Work
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
                <Link href="/virtual-icebreaker-games">
                  Ice Breaker Games — Virtual icebreaker games hub
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Keep exploring with{" "}
              <Link href="/">Ice Breaker Games home</Link>,{" "}
              <Link href="/about">About</Link>,{" "}
              <Link href="/contact">Contact</Link>,{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link>{" "}
              (cluster hub),{" "}
              <Link href="/riddle-icebreakers-for-virtual-meetings">
                riddle icebreakers for virtual meetings
              </Link>
              , <Link href="/icebreaker-games-for-meetings">ice breaker games for meetings</Link>,{" "}
              <Link href="/emoji-icebreaker-games">emoji icebreaker games</Link>, and the{" "}
              <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
