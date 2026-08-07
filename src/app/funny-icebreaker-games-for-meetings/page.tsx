import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./funny-meetings.module.css";

export const revalidate = 86400;

const title = "12 Funny Ice Breaker Games for Meetings (2026)";
const description =
  "Funny ice breaker games for meetings that get real laughs without cringe—12 professional openers with players, time, rules, silly scenes, and facilitator notes.";
const canonical =
  "https://www.icebreakergames.site/funny-icebreaker-games-for-meetings";
const ogImage =
  "https://www.icebreakergames.site/img/funny-icebreaker-games-for-meetings-hero.jpg";
const ogImageAlt =
  "Funny ice breaker games for meetings — diverse professionals laughing around a conference table";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-08-08";
const dateModified = "2026-08-08";

const gameEntries = [
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie (Meeting Edition)",
    bestFor: "Kickoffs when you want chuckles and quick bonding",
    players: "5–20",
    time: "10–15 min",
    materials: "None",
    funnyScene:
      "Someone claims they once presented to executives with their camera on… and a toddler photobombed with a dinosaur sock. The room loses it guessing which “truth” is fake.",
    steps: [
      "Each person shares two true statements and one false statement—keep them work-safe and vivid.",
      "The group votes on the lie.",
      "Reveal fast; celebrate creative lies more than “gotchas.”",
      "Rotate so multiple people get a turn without dragging the agenda.",
    ],
    variation:
      "Project-themed: two truths and a lie about the product, customer, or last sprint.",
    safety: "Ban dating, salary, and private family drama prompts.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather (Work-Safe)",
    bestFor: "Instant energy and opinion laughs before a workshop",
    players: "6–60",
    time: "5–8 min",
    materials: "Prompt list",
    funnyScene:
      "“Would you rather present with a squeaky mic or a slide deck that auto-advances every three seconds?” Half the room dramatically collapses toward squeaky-mic.",
    steps: [
      "Read two absurd-but-safe options.",
      "People move sides, raise hands, or reply A/B in chat.",
      "Ask one person per side for a one-sentence defense.",
      "Run 5–7 rounds, then start the real work.",
    ],
    variation: "Meeting tools theme: Slack threads vs. live debate; sticky notes vs. Miro.",
    safety: "Avoid moral traps, body jokes, and politics.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "Virtual meetings that need visual humor in under five minutes",
    players: "5–40",
    time: "5–8 min",
    materials: "Chat or whiteboard",
    funnyScene:
      "Someone posts 🦞💻🔥 and the team guesses “deadline lobster mode.” The reveal—“I’m calm but my inbox is on fire”—lands bigger laughs than a joke slide.",
    steps: [
      "Each person posts 2–3 emojis that represent them or their week.",
      "The group guesses once; the author clarifies in one sentence.",
      "For larger groups, only volunteers explain.",
      "Model a funny example first to set the tone.",
    ],
    variation: "Theme rounds: emoji for the project, the customer, or “my meeting energy.”",
    safety: "Keep explanations optional—emoji-only rounds work for shy teammates.",
  },
  {
    slug: "telephone-charades",
    name: "Telephone Charades",
    bestFor: "Teams that want physical comedy without needing a stage",
    players: "8–24",
    time: "8–12 min",
    materials: "Prompt cards",
    funnyScene:
      "The last person acts out “quarterly forecast” as someone fishing. The original phrase was “catch-up meeting.” Applause required.",
    steps: [
      "Line people up; whisper a phrase to the first person.",
      "They act it (no words) for the next person, who acts for the next, and so on.",
      "The last person guesses the phrase aloud.",
      "Reveal the original and enjoy the mutation.",
    ],
    variation:
      "Virtual: mute gallery-view rounds with breakout “actors.” Use meeting-themed phrases only.",
    safety: "No body-contact prompts; keep phrases workplace-appropriate.",
  },
  {
    slug: "virtual-background-story",
    name: "Virtual Background Story",
    bestFor: "Remote all-hands that need a visual laugh and quick shares",
    players: "6–40",
    time: "5–10 min",
    materials: "Video meeting with background change",
    funnyScene:
      "Someone joins from the moon, another from a 1990s mall food court. The “why this background” stories become the icebreaker—no forced joke required.",
    steps: [
      "Give 60 seconds for everyone to set a playful virtual background.",
      "Invite 4–6 people to explain their choice in one sentence.",
      "Collect themes (“escape,” “nostalgia,” “chaos”).",
      "Reset backgrounds and open the agenda.",
    ],
    variation: "Theme: “background that matches this project’s mood.”",
    safety: "Allow camera-off + chat description for anyone uncomfortable on video.",
  },
  {
    slug: "rock-paper-scissors-tournament",
    name: "Rock Paper Scissors Tournament",
    bestFor: "Large meetings that need instant noise and celebration",
    players: "12–100+",
    time: "5–10 min",
    materials: "None",
    funnyScene:
      "Losers become over-the-top cheer squads. By the finals, half the company is chanting someone’s name like a sports movie montage.",
    steps: [
      "Pair up and play Rock Paper Scissors.",
      "Losers join the winner’s cheer section; winners keep playing.",
      "Continue until one champion remains.",
      "Celebrate the loudest cheer section, not only the champion.",
    ],
    variation: "Virtual: gallery-view pair rounds with mute/unmute cheers.",
    safety: "Great low-risk opener before quieter discussion—keep it brief.",
  },
  {
    slug: "name-that-movie-quote",
    name: "Name That Movie Quote",
    bestFor: "Creative teams and workshops that enjoy pop-culture laughs",
    players: "6–30",
    time: "6–10 min",
    materials: "Quote list",
    funnyScene:
      "Someone delivers “I feel the need…” in a deadpan finance voice. The room erupts before the title is even guessed.",
    steps: [
      "Read or act a short, PG movie quote.",
      "Teams guess the movie (or show).",
      "Keep rounds fast—10–20 seconds max.",
      "Award bragging rights, not prizes that create pressure.",
    ],
    variation: "Work remix: invent “quotes” that sound like famous films but are about Slack.",
    safety: "Use widely known, non-offensive quotes; skip niche spoilers for new releases.",
  },
  {
    slug: "skribbl-pictionary-online",
    name: "Skribbl / Pictionary Online",
    bestFor: "Remote teams that want collaborative silly drawings",
    players: "4–16",
    time: "8–12 min",
    materials: "skribbl.io or shared whiteboard",
    funnyScene:
      "Someone tries to draw “synergy” and ends up with a stick figure high-fiving a spreadsheet. The guesses get funnier than the art.",
    steps: [
      "Open a shared drawing tool with meeting-safe word list.",
      "One person draws; others guess in chat.",
      "Rotate artists every round.",
      "Keep a custom word pack (standups, OKRs, coffee) for relevance.",
    ],
    variation: "In-person: whiteboard + markers with the same rules.",
    safety: "Moderate the word list; ban anything crude or exclusionary.",
  },
  {
    slug: "pterodactyl",
    name: "Pterodactyl",
    bestFor: "Small teams that want guaranteed giggles in under five minutes",
    players: "5–16",
    time: "3–6 min",
    materials: "None",
    funnyScene:
      "Everyone tries to say “pterodactyl” without showing teeth. The first smile loses—and the whole circle collapses into laughter by round two.",
    steps: [
      "Explain the rule: say “pterodactyl” with lips covering teeth.",
      "Go around the circle; anyone who shows teeth is out (cheerfully).",
      "Continue until one person remains—or the room is laughing too hard to continue.",
      "Reset once and move on while energy is high.",
    ],
    variation: "Virtual: gallery view close-ups; mute between turns to reduce chaos.",
    safety: "Keep it playful—never mock dental differences or force participation.",
  },
  {
    slug: "invention-pitch",
    name: "Invention Pitch",
    bestFor: "Product and innovation meetings that want creative humor",
    players: "6–24",
    time: "8–12 min",
    materials: "Timer; optional random object list",
    funnyScene:
      "A 60-second pitch for “self-tying shoelaces for standups that run long” somehow becomes the funniest—and oddly useful—idea of the day.",
    steps: [
      "Give each person or pair 60–90 seconds to invent a ridiculous-but-helpful product.",
      "Pitch in one breath: problem, product, one feature.",
      "Audience votes with snaps or chat reactions.",
      "Harvest any surprisingly good ideas for later.",
    ],
    variation: "Constraint round: must solve a real meeting pain (late starts, unclear owners).",
    safety: "Celebrate creativity; do not roast soft-spoken pitches.",
  },
  {
    slug: "news-headline-warm-up",
    name: "News Headline Warm-up",
    bestFor: "Writing-friendly teams and standup humor without performance anxiety",
    players: "5–30",
    time: "5–8 min",
    materials: "Chat, sticky notes, or whiteboard",
    funnyScene:
      "Headline of the week: “Engineer Survives Meeting That Could Have Been a Doc.” The room nods, then laughs, then the facilitator starts on time.",
    steps: [
      "Prompt: write a fake newspaper headline about your week or the project.",
      "Post in chat or on a wall.",
      "Read 4–6 favorites aloud.",
      "Bridge one headline theme into the agenda.",
    ],
    variation: "Strictly positive headlines only for stressed weeks.",
    safety: "No targeting individuals; keep satire kind and work-safe.",
  },
  {
    slug: "chat-waterfall",
    name: "Chat Waterfall (Funny Prompt)",
    bestFor: "Large Zoom meetings that need inclusive laughs at scale",
    players: "8–100+",
    time: "3–5 min",
    materials: "Meeting chat",
    funnyScene:
      "Prompt: “Worst meeting snack you’ve ever witnessed.” Answers hit at once—someone typed “cold pizza and regret”—and the host skims themes in 60 seconds.",
    steps: [
      "Pose a funny, low-stakes prompt.",
      "Everyone types but waits to send.",
      "On “3-2-1 send,” read themes aloud briefly.",
      "Thank the room and open the agenda.",
    ],
    variation:
      '“Caption this imaginary slide” or “emoji-only status of this project.”',
    safety: "Keep prompts light; skip anything that invites gossip about people.",
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

export default async function FunnyIcebreakerGamesForMeetingsPage() {
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
      q: "What are funny ice breaker games for meetings?",
      a: "Funny meeting icebreakers create shared laughs without putting anyone on the spot—Two Truths and a Lie, Would You Rather, Emoji Introduction, Telephone Charades, Pterodactyl, and Chat Waterfall are reliable starters.",
    },
    {
      q: "How do I keep funny icebreakers professional?",
      a: "Use work-safe prompts, time-box to 3–10 minutes, offer a pass option, and celebrate creativity instead of roasting people. Skip dating, politics, body jokes, and gossip.",
    },
    {
      q: "What funny icebreaker works for virtual meetings?",
      a: "Emoji Introduction, Virtual Background Story, Skribbl/Pictionary, and Chat Waterfall scale well on Zoom or Teams and keep shy teammates included via chat.",
    },
    {
      q: "How long should a funny meeting icebreaker take?",
      a: "Most funny openers fit 3–8 minutes. Save Two Truths and a Lie or Invention Pitch (10–15 minutes) for kickoffs and workshops with a clearer connection goal.",
    },
    {
      q: "Are funny icebreakers different from regular meeting icebreakers?",
      a: "Yes—this page prioritizes humor and laugh-out-loud scenes. For practical check-ins and low-energy openers, see ice breaker games for meetings.",
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
              src="/img/funny-icebreaker-games-for-meetings-hero.jpg"
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
              <span>Funny ice breaker games for meetings</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>12 Funny Ice Breaker Games for Meetings</h1>
            <p className={styles.heroLead}>
              Professional openers that get real laughs—without cringe, oversharing, or eating
              the agenda.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/would-you-rather" className={styles.ctaPrimary}>
                Start with Would You Rather
              </Link>
              <Link href="/icebreaker-games-for-meetings" className={styles.ctaGhost}>
                All meeting icebreakers
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
                Team meetings, kickoffs, and workshops that want funny ice breaker games for
                meetings—shared laughter without putting anyone on a roast stage.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most rounds fit 5–40 people in 3–10 minutes; tournaments and pitch games may need
                a little more.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip high-energy comedy if the room is processing hard news, trust is fragile, or
                you only have two minutes before a decision.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best funny ice breaker games for meetings</h2>
            <p>
              Pick by laugh style first—wordplay, visual jokes, or physical comedy—then match
              time and format. Each game below includes a concrete funny scene so you can picture
              the energy.
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
                  <p className={styles.variation}>
                    <strong>Funny scene: </strong>
                    {entry.funnyScene}
                  </p>
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
              “We’re going to play a short, funny icebreaker—nothing embarrassing, and you can
              pass anytime. The goal is shared laughter so we start the meeting warmer. Keep
              answers work-safe and we’ll wrap in a few minutes.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Funny icebreakers fail when the humor targets people. Aim the jokes at situations,
              tools, and shared workplace absurdity.
            </p>
            <ul>
              <li>State a pass option and celebrate chat answers equally with spoken ones.</li>
              <li>
                Pre-screen prompts for politics, body jokes, dating, and anything that could
                single someone out.
              </li>
              <li>Time-box tightly—funny openers lose goodwill when they run long.</li>
              <li>
                If energy gets chaotic, land the plane: thank the room and open the agenda while
                people are still smiling.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose funny icebreakers for meetings</h2>
            <p>
              For instant opinions, start with{" "}
              <Link href="/games/would-you-rather">Would You Rather</Link> or{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>. For physical
              comedy in small rooms, try <Link href="/games/pterodactyl">Pterodactyl</Link> or{" "}
              <Link href="/games/telephone-charades">Telephone Charades</Link>. For large Zoom
              rooms, use <Link href="/games/chat-waterfall">Chat Waterfall</Link> or{" "}
              <Link href="/games/rock-paper-scissors-tournament">
                Rock Paper Scissors Tournament
              </Link>
              . For practical check-ins without a humor focus, return to{" "}
              <Link href="/icebreaker-games-for-meetings">
                ice breaker games for meetings
              </Link>
              . Remote-heavy agendas can continue with{" "}
              <Link href="/short-virtual-icebreakers">short virtual icebreakers</Link> and the{" "}
              <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link> hub.
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>What made it easy to laugh together today?</li>
              <li>Which prompt should we reuse next month?</li>
              <li>Did anyone prefer chat over speaking—and how can we keep that option?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about funny ice breaker games for meetings</h2>
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
              Humor-forward facilitation still needs inclusion and timing discipline. These
              references support both:
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
                <Link href="/icebreaker-games-for-work">
                  Ice Breaker Games — Icebreaker games for work
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the <Link href="/">Ice Breaker Games home</Link>, then explore the
              workplace cluster:{" "}
              <Link href="/icebreaker-games-for-meetings">
                ice breaker games for meetings
              </Link>{" "}
              (hub), <Link href="/icebreaker-games-for-work">icebreaker games for work</Link>,{" "}
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
