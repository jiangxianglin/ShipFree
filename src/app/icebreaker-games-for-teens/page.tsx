import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./teens.module.css";

export const revalidate = 86400;

const title = "14 Ice Breaker Games for Teens (2026)";
const description =
  "Ice breaker games for teens: 14 age-appropriate openers for classrooms, youth nights, and clubs—with players, time, rules, safety notes, and variations.";
const canonical = "https://www.icebreakergames.site/icebreaker-games-for-teens";
const ogImage =
  "https://www.icebreakergames.site/img/icebreaker-games-for-teens-hero.jpg";
const ogImageAlt =
  "Ice breaker games for teens — diverse teens laughing in a community hall icebreaker circle";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-08-04";
const dateModified = "2026-08-04";

const gameEntries = [
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "First-week classrooms and mixed teen groups that need a low-pressure opener",
    players: "5–40",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each teen shares two true statements and one false statement.",
      "The group guesses which statement is the lie.",
      "Reveal quickly and rotate so more voices get a turn.",
      "Keep prompts light: hobbies, sports, food, music—not private family issues.",
    ],
    variation:
      "Chat or whiteboard mode for hybrid classes: post three numbered statements and vote A/B/C.",
    safety: "Model a fun example first so nobody feels pressured to overshare.",
  },
  {
    slug: "human-bingo",
    name: "Human Bingo",
    bestFor: "Large teen mixers, club fairs, and welcome nights",
    players: "10–50",
    time: "15–25 min",
    materials: "Bingo cards and pens",
    steps: [
      "Hand out teen-friendly bingo cards (plays an instrument, has a pet, speaks two languages).",
      "Students mingle to find matches and collect signatures.",
      "First to complete a line wins a cheer or small prize.",
      "Invite a few winners to share one interesting match.",
    ],
    variation:
      "Smaller rooms: require four corners only. Virtual: use chat checkmarks instead of signatures.",
    safety: "Avoid appearance-based or dating-related prompts.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "New cohorts when learning names matters most",
    players: "8–20",
    time: "5–10 min",
    materials: "None (name tags help)",
    steps: [
      "Each person says their name plus one simple prompt (favorite snack, hobby, or emoji).",
      "The next person repeats a few previous names before adding theirs.",
      "Help quickly if someone blanks—names should feel supportive.",
      "End by challenging the group to greet two new people by name.",
    ],
    variation: "Large groups: split into circles of 8–10; classrooms: use name tents on desks.",
    safety: "Never punish forgetting a name; normalize group help.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Quick energy and opinion sharing with teens",
    players: "6–60",
    time: "5–10 min",
    materials: "Prompt list",
    steps: [
      "Read two options; teens move to sides of the room or raise hands.",
      "Ask 1–2 people from each side to explain in one sentence.",
      "Run 5–8 rounds, then close.",
      "Use funny, age-appropriate choices—not moral traps.",
    ],
    variation:
      "Shy groups: raise-hands only. Hybrid: A/B chat replies instead of movement.",
    safety: "Skip prompts about money, body image, dating, or family conflict.",
  },
  {
    slug: "rock-paper-scissors-tournament",
    name: "Rock Paper Scissors Tournament",
    bestFor: "Huge teen groups that need instant energy",
    players: "12–100+",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Pair up and play Rock Paper Scissors.",
      "Losers become the winner’s cheer squad; winners keep playing.",
      "Continue until one champion remains.",
      "Celebrate the loudest cheer section, not only the champion.",
    ],
    variation: "Best of three for smaller clubs; virtual: gallery-view pair rounds with mute cheers.",
    safety: "Great low-risk opener before quieter discussion activities.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "Visual icebreakers teens already understand",
    players: "5–30",
    time: "5–10 min",
    materials: "Chat, whiteboard, or sticky notes",
    steps: [
      "Each person posts 2–3 emojis that represent them.",
      "The group guesses once; the author clarifies in one sentence.",
      "For larger groups, only volunteers explain.",
      "Model a fun example first to lower pressure.",
    ],
    variation:
      "Theme rounds: weekend emoji, class energy emoji, or “emoji for your hobby.”",
    safety: "Keep explanations optional—emoji-only rounds work for shy teens.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Smaller teen circles forming new friendships",
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
    slug: "beach-ball-qa",
    name: "Beach Ball Q&A",
    bestFor: "Gym, outdoor, or youth-night openers with light movement",
    players: "8–40",
    time: "8–12 min",
    materials: "Beach ball with written questions",
    steps: [
      "Write light questions on a beach ball with a marker.",
      "Toss the ball; whoever catches it answers the question under their thumb.",
      "Continue until most people have answered once.",
      "Offer a pass option every time.",
    ],
    variation: "Classroom: pass a soft foam ball while seated; large group: run two circles.",
    safety: "Softer toss rule indoors; allow seated participants an underhand pass.",
  },
  {
    slug: "find-your-match",
    name: "Find Your Match",
    bestFor: "Mixing cliques at the start of a teen event",
    players: "10–50",
    time: "10–15 min",
    materials: "Paired cards",
    steps: [
      "Hand out halves of famous pairs.",
      "Students ask yes/no questions to find their match.",
      "Matched pairs sit together for the next activity.",
      "Use this before small-group discussion so new combinations form.",
    ],
    variation: "School nights: use book/character or sports-team pairs; virtual: DM clues.",
    safety: "Choose wholesome pair themes; avoid romance-focused cards for younger teens.",
  },
  {
    slug: "scavenger-hunt",
    name: "Scavenger Hunt",
    bestFor: "Campus, park, or building nights with adult checkpoints",
    players: "10–60",
    time: "15–25 min",
    materials: "Clue sheets or photo checklist",
    steps: [
      "Send teams out with a short list of findable items or photo challenges.",
      "Set a clear boundary and return time.",
      "Review creative finds together.",
      "Award categories like fastest, funniest photo, and best teamwork.",
    ],
    variation: "Indoor photo checklist; virtual: find items on camera in 60 seconds.",
    safety: "Keep teams in public areas; assign adult checkpoints for younger teens.",
  },
  {
    slug: "never-have-i-ever",
    name: "Never Have I Ever (Clean Edition)",
    bestFor: "Trusted teen groups with a pre-approved prompt list",
    players: "6–30",
    time: "8–12 min",
    materials: "Fingers or paper scorecards",
    steps: [
      "Everyone starts with five fingers up.",
      "Use only leader-approved clean prompts (“Never have I ever… tried sushi”).",
      "Anyone who has done it puts a finger down.",
      "Stop before anyone feels singled out; celebrate stories lightly.",
    ],
    variation: "Leader-only prompts from a card deck so teens never invent risky statements.",
    safety: "Ban alcohol, dating, and illegal-activity prompts. Prefer leader-read cards.",
  },
  {
    slug: "train-wreck",
    name: "Train Wreck",
    bestFor: "High-energy teen nights in a gym or large room",
    players: "10–40",
    time: "10–15 min",
    materials: "Chairs (one fewer than players)",
    steps: [
      "One caller stands in the middle and names a category.",
      "Matching players switch seats while the caller tries to sit.",
      "Whoever is left standing becomes the next caller.",
      "Use inclusive categories and clear no-shoving rules.",
    ],
    variation: "Smaller rooms: stand-and-swap spots on taped floor marks instead of chairs.",
    safety: "Clear walking lanes; pause if the room gets chaotic.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative teens who prefer writing over long speeches",
    players: "5–40",
    time: "5–10 min",
    materials: "Paper, sticky notes, or chat",
    steps: [
      "Prompt a six-word memoir about the week, class, or hobby.",
      "Share in pairs or post on a wall/chat.",
      "Spotlight 2–3 favorites without critiques.",
      "Bridge one memoir theme into the next activity.",
    ],
    variation: "Strict five minutes: write 60 seconds, share three aloud, then move on.",
    safety: "No grading language—celebrate vivid phrases over perfect grammar.",
  },
  {
    slug: "chat-waterfall",
    name: "Chat Waterfall",
    bestFor: "Hybrid or virtual teen meetings that need inclusive answers",
    players: "8–100+",
    time: "3–6 min",
    materials: "Meeting chat or shared board",
    steps: [
      "Pose a light prompt (favorite snack, win of the week, desk object).",
      "Everyone types but waits to send.",
      "On “3-2-1 send,” read themes aloud for 60–90 seconds.",
      "Thank the room and start the agenda.",
    ],
    variation: "In-person: sticky-note waterfall on a whiteboard wall.",
    safety: "Default to optional unmute; chat answers count fully.",
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

export default async function IcebreakerGamesForTeensPage() {
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
      q: "What are the best ice breaker games for teens?",
      a: "Two Truths and a Lie, Human Bingo, The Name Game, Would You Rather, Rock Paper Scissors Tournament, Emoji Introduction, and Common Ground work well for most teen groups. Pick by energy and trust level first.",
    },
    {
      q: "What icebreakers work for shy teens?",
      a: "Start with Emoji Introduction, Six Word Memoirs, Chat Waterfall, or The Name Game with a pass option. Avoid spotlight games until trust is built.",
    },
    {
      q: "How long should teen icebreakers take?",
      a: "Most openers fit 5–15 minutes. Save Human Bingo or Scavenger Hunt (15–25 minutes) for full club nights or retreats.",
    },
    {
      q: "Are these ice breaker games for teens school-safe?",
      a: "Yes—when you use clean prompts, skip dating/alcohol/body-image topics, offer opt-outs, and adapt physical games for comfort and mobility.",
    },
    {
      q: "How is this different from youth group icebreakers?",
      a: "This page focuses on school, club, and general teen settings. For church/camp nights with faith-context notes, see ice breaker games for youth group.",
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
              src="/img/icebreaker-games-for-teens-hero.jpg"
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
              <span>Ice breaker games for teens</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>14 Ice Breaker Games for Teens</h1>
            <p className={styles.heroLead}>
              Age-appropriate openers for classrooms, clubs, and youth nights—with players,
              time, rules, and safety notes facilitators can run today.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/two-truths-and-a-lie" className={styles.ctaPrimary}>
                Start with Two Truths and a Lie
              </Link>
              <Link href="/icebreaker-games-for-youth-group" className={styles.ctaGhost}>
                Youth group icebreakers
              </Link>
              <Link href="/icebreaker-games-for-small-groups" className={styles.ctaGhost}>
                Small group icebreakers
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
                Middle/high school classrooms, clubs, camps, and teen meetups that need
                inclusive ice breaker games for teens without awkward oversharing.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most rounds fit 6–40 teens in 5–15 minutes; large mixers like Human Bingo may
                need 20+ minutes.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip high-energy openers if the room needs quiet focus first, prompts feel too
                personal, or physical games are not adapted for comfort and safety.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best ice breaker games for teens</h2>
            <p>
              Choose by energy and trust level first—then match group size, materials, and how
              much talking you want. Below are fourteen facilitator-ready options.
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
              “We’re going to play a short icebreaker so everyone gets a chance to meet someone
              new. You can pass anytime. The goal is connection, not perfection. If you’d rather
              be timer, photographer, or scorekeeper, tell me and I’ll set you up.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Ice breaker games for teens only work when students feel free to opt out and nobody
              is set up to be embarrassed.
            </p>
            <ul>
              <li>
                State a pass option upfront and offer alternate roles for anyone who wants lower
                visibility.
              </li>
              <li>
                Use clean, age-appropriate prompts—skip dating, alcohol, body image, and private
                family topics.
              </li>
              <li>
                Watch for cliques excluding newcomers; mix groups with Find Your Match or Human
                Bingo before deeper discussion.
              </li>
              <li>
                Adapt physical games for comfort and mobility; offer seated or non-contact
                variants without calling anyone out.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose icebreaker games for teens</h2>
            <p>
              For a first class or new club, start with{" "}
              <Link href="/games/the-name-game">The Name Game</Link>,{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>, or{" "}
              <Link href="/games/human-bingo">Human Bingo</Link>. When you need instant energy,
              use{" "}
              <Link href="/games/rock-paper-scissors-tournament">
                Rock Paper Scissors Tournament
              </Link>{" "}
              or <Link href="/games/would-you-rather">Would You Rather</Link>. After trust is
              built, move into <Link href="/games/common-ground">Common Ground</Link> or Six Word
              Memoirs. For church/camp context, see{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              ; for quieter circles, see{" "}
              <Link href="/icebreaker-games-for-small-groups">
                ice breaker games for small groups
              </Link>
              .
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>Who did you meet that you did not know well before?</li>
              <li>What made it easier to talk to someone new?</li>
              <li>How can we make new people feel welcome every week?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about ice breaker games for teens</h2>
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
              student/youth cluster pages:
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
                <Link href="/blog/icebreaker-games-for-students">
                  Ice Breaker Games — Icebreaker games for students
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
              Start from the <Link href="/">Ice Breaker Games home</Link>, then explore this
              student cluster hub and nearby pages:{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              ,{" "}
              <Link href="/icebreaker-games-for-small-groups">
                ice breaker games for small groups
              </Link>
              ,{" "}
              <Link href="/blog/icebreaker-games-for-students">
                icebreaker games for students
              </Link>
              , <Link href="/games-like-human-bingo">games like Human Bingo</Link>, and the{" "}
              <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
