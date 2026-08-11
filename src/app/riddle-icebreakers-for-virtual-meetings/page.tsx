import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./riddle-virtual.module.css";

export const revalidate = 86400;

const title = "12 Riddle Icebreakers for Virtual Meetings (2026)";
const description =
  "Riddle icebreakers for virtual meetings: 12 Zoom-friendly puzzle warm-ups with players, time, rules, facilitator scripts, and safer variations.";
const canonical =
  "https://www.icebreakergames.site/riddle-icebreakers-for-virtual-meetings";
/** Page hero (16:9) — used in-page + Article schema */
const heroImage =
  "https://www.icebreakergames.site/img/riddle-icebreakers-for-virtual-meetings-hero.jpg";
/** Social share crop (1200×630) — Open Graph / Twitter Card */
const ogImage =
  "https://www.icebreakergames.site/img/riddle-icebreakers-for-virtual-meetings-og.jpg";
const ogImageAlt =
  "Riddle icebreakers for virtual meetings: remote teammates solving a playful puzzle on a video call";
const ogTitle = "12 Riddle Icebreakers for Virtual Meetings (2026)";
const ogDescription =
  "12 Zoom-ready riddle icebreakers for virtual meetings. Players, time, rules, and facilitator tips for every warm-up.";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-07-25";
const dateModified = "2026-07-25";

const gameEntries = [
  {
    slug: "guess-who-personal-trivia",
    name: "Guess Who (Personal Trivia)",
    bestFor: "Riddle-style introductions when the team already knows each other a little",
    players: "6–24",
    time: "8–12 min",
    materials: "Chat or shared doc",
    steps: [
      "Ask each person to submit one true, slightly mysterious fact about themselves in advance (or in private chat).",
      "Read facts one at a time without names; the group guesses who wrote each clue.",
      "Reveal the author and invite a 10-second follow-up story.",
      "Keep clues light: hobbies, travel quirks, first jobs—not private life details.",
    ],
    variation:
      "Run three clues at once in chat and race to guess correctly in reactions.",
  },
  {
    slug: "mystery-envelope",
    name: "Mystery Envelope",
    bestFor: "Virtual meetings that need a shared puzzle and a quick win together",
    players: "5–20",
    time: "8–15 min",
    materials: "Slide with sealed “envelopes” or chat codes",
    steps: [
      "Prepare 4–6 digital envelopes (slides or chat messages) each holding a tiny riddle or team trivia clue.",
      "Open one envelope per round; the first correct unmute or chat answer unlocks the next.",
      "Celebrate creative wrong answers before revealing.",
      "End by connecting one riddle theme to today’s meeting goal.",
    ],
    variation:
      "Put envelopes in breakout rooms so small groups solve in parallel, then share one answer.",
  },
  {
    slug: "name-that-movie-quote",
    name: "Name That Movie Quote",
    bestFor: "Fast pop-culture riddles that wake up a quiet Zoom gallery",
    players: "6–40",
    time: "5–10 min",
    materials: "Quote list or short audio clips",
    steps: [
      "Read (or play) a short movie/TV quote with the title hidden.",
      "People guess in chat; first correct answer scores a point or chooses the next round.",
      "Rotate through 6–8 quotes so more voices win a round.",
      "Offer a workplace-safe quote list and skip anything violent or exclusive.",
    ],
    variation:
      "Swap movies for song lyrics, product slogans, or company mission phrases.",
  },
  {
    slug: "crossword-names",
    name: "Crossword Names",
    bestFor: "Name-learning riddles for new remote teammates",
    players: "6–20",
    time: "8–12 min",
    materials: "Shared whiteboard or collaborative doc",
    steps: [
      "Create a simple crossword grid with blank name clues (e.g., “three letters, starts with Jo”).",
      "Clues are soft riddles about people’s names or name meanings—not personal secrets.",
      "Solve as a full group, filling cells together on screen share.",
      "Have each person confirm pronunciation when their name is placed.",
    ],
    variation:
      "Skip the grid and do “name riddles” only: “My name rhymes with…” in chat waterfall style.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "Visual riddle icebreakers—decode what three emojis say about someone",
    players: "5–30",
    time: "5–10 min",
    materials: "Meeting chat",
    steps: [
      "Each person posts 2–3 emojis that represent them.",
      "The group guesses the meaning before the person explains in one sentence.",
      "Keep rounds tight so large groups stay under ten minutes.",
      "Model a fun example first to lower pressure.",
    ],
    variation:
      "Theme the round: “emoji riddle for your weekend,” “your role,” or “your coffee order.”",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Classic lie-detection riddles that work perfectly on camera or in chat",
    players: "5–30",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each person shares two true statements and one false statement.",
      "The group votes on the lie via chat reactions or hand raise.",
      "Reveal the answer and rotate quickly.",
      "Coach people toward surprising truths, not oversharing.",
    ],
    variation:
      "Chat-only mode: post all three statements numbered; everyone replies with the lie number.",
  },
  {
    slug: "telephone-charades",
    name: "Telephone Charades",
    bestFor: "Gesture-based riddles when you want energy without speaking over each other",
    players: "8–24",
    time: "10–15 min",
    materials: "Prompt list; mute-friendly calls",
    steps: [
      "Line up players in a breakout or use gallery order.",
      "Show a prompt only to the first person; they act it for the next person only.",
      "Continue down the line; the last person guesses the riddle aloud.",
      "Compare the final guess with the original prompt for laughs.",
    ],
    variation:
      "Fully remote: pass a private DM phrase; each person mimes on camera for 15 seconds.",
  },
  {
    slug: "virtual-background-story",
    name: "Virtual Background Story",
    bestFor: "Visual storytelling riddles—guess the story behind someone’s background",
    players: "5–20",
    time: "8–12 min",
    materials: "Virtual backgrounds or a prop in frame",
    steps: [
      "Everyone chooses a background (or holds up an object) that hints at a story.",
      "Others guess the connection before the person explains.",
      "Keep explanations to 20–30 seconds.",
      "Great opener before agenda-heavy meetings.",
    ],
    variation:
      "Host assigns a theme (favorite city, dream project, comfort food) so guesses stay on topic.",
  },
  {
    slug: "skribbl-pictionary-online",
    name: "Skribbl / Pictionary Online",
    bestFor: "Drawing riddles for creative teams and longer virtual socials",
    players: "4–12 per room",
    time: "10–15 min",
    materials: "Whiteboard or Skribbl-style tool",
    steps: [
      "One person draws a prompt while others guess in chat.",
      "Rotate drawers every 60–90 seconds.",
      "Use work-safe custom word lists (tools, hobbies, meeting jokes).",
      "Stop while energy is still high.",
    ],
    variation:
      "No external tool: use Zoom/Teams whiteboard with sticky-note prompts from the host.",
  },
  {
    slug: "guess-that-team-member",
    name: "Guess That Team Member",
    bestFor: "Anonymous riddle clues about teammates for distributed groups",
    players: "8–30",
    time: "8–12 min",
    materials: "Form or chat submissions",
    steps: [
      "Collect one anonymous clue per person in advance (“I once…”, “My desk always has…”).",
      "Read clues aloud; group guesses the teammate.",
      "Reveal and invite a quick reaction from the person.",
      "Avoid clues that could embarrass or out private information.",
    ],
    variation:
      "New-hire edition: only managers submit clues so newcomers are never put on the spot.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Poetic mini-riddles that spark curiosity without long monologues",
    players: "5–25",
    time: "5–10 min",
    materials: "Chat",
    steps: [
      "Everyone writes a six-word memoir about their week, role, or mood.",
      "Post in chat; invite 2–3 guesses about what a memoir means before the author clarifies.",
      "Celebrate vivid language over perfect grammar.",
      "Optional: vote with reactions for “most mysterious” and “most relatable.”",
    ],
    variation:
      "Prompt packs: “six words about remote work,” “six words about Friday,” “six words about your hobby.”",
  },
  {
    slug: "chat-waterfall",
    name: "Chat Waterfall",
    bestFor: "Simultaneous riddle answers that keep large virtual meetings inclusive",
    players: "8–100+",
    time: "3–6 min",
    materials: "Meeting chat",
    steps: [
      "Pose a short riddle or lateral-thinking prompt.",
      "Everyone types an answer but waits to hit send.",
      "On “3-2-1 send,” the chat fills at once; skim themes out loud.",
      "Reveal the intended answer, then highlight creative alternates.",
    ],
    variation:
      "Run two riddles: one classic brain teaser, one company-culture riddle.",
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
      locale: "en_US",
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: "Ice Breaker Games",
      publishedTime: datePublished,
      modifiedTime: dateModified,
      authors: [authorName],
      section: "Virtual Icebreakers",
      tags: [
        "riddle icebreakers",
        "virtual meetings",
        "Zoom icebreakers",
        "remote team building",
      ],
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          type: "image/jpeg",
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@icebreakergames",
      creator: "@icebreakergames",
      title: ogTitle,
      description: ogDescription,
      images: {
        url: ogImage,
        alt: ogImageAlt,
        width: 1200,
        height: 630,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function RiddleIcebreakersForVirtualMeetingsPage() {
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
      q: "What are the best riddle icebreakers for virtual meetings?",
      a: "The strongest options are short, inclusive, and easy on Zoom or Teams chat: Guess Who personal trivia, Mystery Envelope, Name That Movie Quote, Emoji Introduction, Two Truths and a Lie, and Chat Waterfall riddle rounds.",
    },
    {
      q: "How long should a virtual riddle icebreaker take?",
      a: "Aim for 5–12 minutes at the start of a meeting. Chat Waterfall and Emoji Introduction can finish in under six minutes; Mystery Envelope or Telephone Charades may need closer to 10–15 minutes.",
    },
    {
      q: "Are riddle icebreakers good for large Zoom meetings?",
      a: "Yes—prefer chat-based formats like Chat Waterfall, emoji decoding, or quote guessing so everyone can answer without fighting for airtime. Use breakout rooms if you run drawing or charades variants.",
    },
    {
      q: "How do I keep virtual riddle icebreakers inclusive?",
      a: "Avoid culture-specific trivia that only long-tenured teammates know, offer pass options, share prompts in chat for accessibility, and celebrate creative answers—not only “correct” ones.",
    },
    {
      q: "What if people dislike brain teasers?",
      a: "Frame activities as light curiosity games, not IQ tests. Use story riddles (backgrounds, six-word memoirs, two truths) instead of logic puzzles, and keep stakes low.",
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
    image: [ogImage, heroImage],
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
              src="/img/riddle-icebreakers-for-virtual-meetings-hero.jpg"
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
              <span>Riddle icebreakers</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>
              12 Riddle Icebreakers for Virtual Meetings
            </h1>
            <p className={styles.heroLead}>
              Need riddle icebreakers for virtual meetings? Use these 12 Zoom-friendly
              puzzle warm-ups with players, time, rules, and facilitator tips.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/virtual-icebreaker-games" className={styles.ctaPrimary}>
                All virtual icebreaker games
              </Link>
              <Link href="/short-virtual-icebreakers" className={styles.ctaGhost}>
                Short virtual icebreakers
              </Link>
              <Link href="/games/emoji-introduction" className={styles.ctaGhost}>
                Emoji Introduction
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
                Remote standups, hybrid workshops, and online training when you want
                curiosity and laughs without long introductions.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most riddle icebreakers for virtual meetings fit 5–40 people in 5–12
                minutes, including a quick reveal.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip hard logic puzzles if the group is tired, multilingual, or new—choose
                story riddles and chat formats instead.
              </p>
            </div>
          </section>

          <section className={styles.guide}>
            <h2>Why riddle icebreakers work on Zoom</h2>
            <p>
              Remote meetings lose the informal hallway energy that helps people settle in.
              Short, low-stakes puzzles restore shared attention without turning the call into
              a long go-around.
            </p>
            <blockquote className={styles.quote}>
              <p>
                Structured, time-boxed openers help remote teams recreate the connection that no
                longer happens in hallways—without forcing long personal monologues.
              </p>
              <cite className={styles.cite}>
                — {authorName}, summarizing guidance from{" "}
                <a
                  href="https://hbr.org/topic/subject/remote-work"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Harvard Business Review (Remote Work)
                </a>
                ,{" "}
                <a
                  href="https://sloanreview.mit.edu/tag/remote-work/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT Sloan Management Review
                </a>
                , and{" "}
                <a
                  href="https://www.sessionlab.com/library/icebreaker"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SessionLab’s icebreaker library
                </a>
                .
              </cite>
            </blockquote>
            <p>
              Our riddle formats stay chat-first so large Zoom rooms can answer together, then
              optionally unmute—matching the inclusion pattern used in established icebreaker
              libraries while keeping most rounds under twelve minutes.
            </p>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best riddle icebreakers for virtual meetings</h2>
            <p>
              Pick by format first: chat riddles for large calls, guessing games for
              mid-size teams, and drawing or charades when energy is already high.
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
              “We are going to warm up with a quick riddle-style icebreaker—not a test,
              just a curious puzzle we solve together. Type in chat if you prefer not to
              unmute. Wrong answers are welcome; they often make the best stories. Ready?
              Here is the first clue.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Virtual riddle icebreakers only work when people feel safe to guess wrong
              and to pass.
            </p>
            <ul>
              <li>
                Publish prompts in chat for screen-reader users and anyone joining late.
              </li>
              <li>
                Avoid riddles that rely on local slang, insider jokes, or culture-only
                knowledge unless you explain the context.
              </li>
              <li>
                Never force camera-on participation; chat and reaction answers count.
              </li>
              <li>
                Stop after a few rounds while energy is still high—short beats clever.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose riddle icebreakers for virtual meetings</h2>
            <p>
              If your call has more than 20 people, start with Chat Waterfall or emoji
              decoding so everyone can answer at once. For smaller teams, Guess Who,
              Mystery Envelope, or Virtual Background Story create richer conversation.
              Save drawing and charades for socials or creative workshops where people
              already feel warmed up.
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>Which clue was hardest, and what made it hard?</li>
              <li>What helped the group share guesses without interrupting?</li>
              <li>How is guessing together similar to solving work problems remotely?</li>
              <li>What would make the next riddle round more inclusive?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about riddle icebreakers for virtual meetings</h2>
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
              These references inform our timing, inclusion, and remote-meeting guidance. They
              are not endorsements; always adapt activities to your group’s culture and
              accessibility needs.
            </p>
            <ol>
              <li>
                <a
                  href="https://hbr.org/topic/subject/remote-work"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Harvard Business Review — Remote Work topic hub
                </a>
                : research and practitioner essays on designing effective virtual collaboration
                and meeting rituals.
              </li>
              <li>
                <a
                  href="https://sloanreview.mit.edu/tag/remote-work/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT Sloan Management Review — Remote Work
                </a>
                : evidence-informed perspectives on distributed-team communication.
              </li>
              <li>
                <a
                  href="https://www.sessionlab.com/library/icebreaker"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SessionLab — Icebreaker activity library
                </a>
                : established facilitation formats we adapt for chat-first virtual rooms.
              </li>
              <li>
                <a
                  href="https://www.icebreakergames.site/virtual-icebreaker-games"
                  rel="noopener noreferrer"
                >
                  Ice Breaker Games — Virtual icebreaker games hub
                </a>
                : our cluster guide for Zoom, Teams, and Meet warm-ups.
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Keep exploring with{" "}
              <Link href="/">Ice Breaker Games home</Link>,{" "}
              <Link href="/about">About Ice Breaker Games</Link>,{" "}
              <Link href="/contact">Contact</Link>,{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link>{" "}
              (cluster hub),{" "}
              <Link href="/short-virtual-icebreakers">
                short virtual icebreakers / 5 minute virtual ice breakers
              </Link>
              ,{" "}
              <Link href="/games-like-two-truths-and-a-lie">
                games like Two Truths and a Lie
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
