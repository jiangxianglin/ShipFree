import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./high-school.module.css";

export const revalidate = 86400;

const title = "14 Ice Breaker Games for High School Students (2026)";
const description =
  "Ice breaker games for high school students: 14 classroom-safe openers for advisory, first day, clubs, and PE—with players, time, rules, and facilitator tips.";
const canonical =
  "https://www.icebreakergames.site/icebreaker-games-for-high-school-students";
const ogImage =
  "https://www.icebreakergames.site/img/icebreaker-games-for-high-school-students-hero.jpg";
const ogImageAlt =
  "Ice breaker games for high school students — diverse students laughing in a classroom icebreaker circle";
const authorName = "Ice Breaker Games Editorial Team";
const datePublished = "2026-08-14";
const dateModified = "2026-08-14";

const gameEntries = [
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "First-week advisory and mixed classes that need a low-pressure opener",
    players: "5–35",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each student shares two true statements and one false statement.",
      "Classmates guess the lie; reveal quickly and rotate.",
      "Keep prompts school-safe: hobbies, sports, food, weekend plans.",
      "Model one fun example so quieter students know the tone.",
    ],
    variation:
      "Bell-schedule version: 6 volunteers only, then pair-share for the rest of the period.",
    safety: "Ban dating, money, and family-conflict prompts in school settings.",
  },
  {
    slug: "human-bingo",
    name: "Human Bingo",
    bestFor: "First day of school, club fairs, and large advisory mixes",
    players: "12–50",
    time: "15–25 min",
    materials: "Bingo cards and pens",
    steps: [
      "Hand out high-school-friendly bingo cards (plays an instrument, rides the bus, speaks two languages).",
      "Students mingle for signatures until someone completes a line.",
      "Invite a few winners to share one interesting match.",
      "Collect cards or leave them as desk name-helpers for week one.",
    ],
    variation:
      "Short period: four corners only. Virtual advisory: chat checkmarks instead of signatures.",
    safety: "Avoid appearance-based or popularity prompts.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "New cohorts when learning names matters most",
    players: "8–24",
    time: "5–10 min",
    materials: "None (name tents help)",
    steps: [
      "Each person says their name plus one simple prompt (favorite snack or class).",
      "The next student repeats a few previous names before adding theirs.",
      "Help quickly if someone blanks—names should feel supportive.",
      "Close by challenging the room to greet two classmates by name.",
    ],
    variation: "Large classes: split into circles of 8–10; use name tents on desks.",
    safety: "Never punish forgetting a name; normalize group help.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Quick energy between lessons or at the start of club meetings",
    players: "6–60",
    time: "5–10 min",
    materials: "Prompt list",
    steps: [
      "Read two options; students move sides or raise hands.",
      "Ask 1–2 people per side for a one-sentence reason.",
      "Run 5–8 rounds, then start the lesson.",
      "Use funny, age-appropriate choices—not moral traps.",
    ],
    variation: "Shy classes: raise-hands only. Hybrid: A/B chat replies.",
    safety: "Skip prompts about money, body image, dating, or grades as status.",
  },
  {
    slug: "rock-paper-scissors-tournament",
    name: "Rock Paper Scissors Tournament",
    bestFor: "Huge gym classes or assemblies that need instant energy",
    players: "12–100+",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Pair up and play Rock Paper Scissors.",
      "Losers become the winner’s cheer squad; winners keep playing.",
      "Continue until one champion remains.",
      "Celebrate the loudest cheer section, not only the champion.",
    ],
    variation: "Best of three for smaller clubs; hallway version with quiet cheers.",
    safety: "Great low-risk opener before quieter discussion work.",
  },
  {
    slug: "emoji-introduction",
    name: "Emoji Introduction",
    bestFor: "Visual openers high school students already understand",
    players: "5–30",
    time: "5–10 min",
    materials: "Whiteboard, sticky notes, or chat",
    steps: [
      "Each person posts 2–3 emojis that represent them.",
      "The group guesses once; the author clarifies in one sentence.",
      "For larger classes, only volunteers explain.",
      "Model a fun example first to lower pressure.",
    ],
    variation: "Theme rounds: weekend emoji, class energy emoji, or club hobby.",
    safety: "Keep explanations optional—emoji-only rounds work for shy students.",
  },
  {
    slug: "one-word-check-in",
    name: "One Word Check-In",
    bestFor: "Tight periods when you need a fast emotional temperature check",
    players: "5–40",
    time: "3–6 min",
    materials: "None",
    steps: [
      "Ask for one word that describes how people feel entering class.",
      "Go around quickly or collect words on the board.",
      "Reflect one theme (“lots of tired and curious today”).",
      "Bridge into the lesson without over-processing.",
    ],
    variation: "Anonymous sticky notes for high-stakes weeks (tests, tryouts).",
    safety: "Do not force personal stories; one word is enough.",
  },
  {
    slug: "this-or-that-questions",
    name: "This or That Questions",
    bestFor: "Low-pressure binary choices for shy or mixed-ability classes",
    players: "5–100+",
    time: "3–8 min",
    materials: "Prompt list or poll",
    steps: [
      "Offer quick pairs (morning/night, beach/mountains, group/solo project).",
      "Collect answers via hands, movement, or simultaneous chat.",
      "Highlight funny splits; skip long debates.",
      "Bridge one theme into today’s learning goal.",
    ],
    variation: "Virtual class: reactions or a one-click poll for large rooms.",
    safety: "Avoid status-laden pairs (popular/unpopular, rich/poor).",
  },
  {
    slug: "find-your-match",
    name: "Find Your Match",
    bestFor: "Mixing friend groups before group projects",
    players: "10–50",
    time: "10–15 min",
    materials: "Paired cards",
    steps: [
      "Hand out halves of famous pairs (book/character, invention/inventor).",
      "Students ask yes/no questions to find their match.",
      "Matched pairs sit together for the next activity.",
      "Use before small-group work so new combinations form.",
    ],
    variation: "Subject-themed pairs: science terms, history figures, vocab words.",
    safety: "Choose wholesome pair themes; avoid romance-focused cards.",
  },
  {
    slug: "line-up",
    name: "Line-Up",
    bestFor: "Silent teamwork warm-ups in hallways or classrooms",
    players: "8–40",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Challenge the class to line up by birthday, height, or first-name alphabet—without talking.",
      "Allow gestures only; time the round.",
      "Debrief what signals worked.",
      "Repeat once with a harder criterion if energy is high.",
    ],
    variation: "Seated version: rearrange desk row order with written cards.",
    safety: "Offer a seated observer role; never comment on body size.",
  },
  {
    slug: "six-word-memoirs",
    name: "Six Word Memoirs",
    bestFor: "Creative classes that prefer writing over long speeches",
    players: "5–40",
    time: "5–10 min",
    materials: "Paper, sticky notes, or chat",
    steps: [
      "Prompt a six-word memoir about the week, class, or hobby.",
      "Share in pairs or post on a wall/chat.",
      "Spotlight 2–3 favorites without critiques.",
      "Bridge one memoir theme into the lesson.",
    ],
    variation: "Strict five minutes: write 60 seconds, share three aloud, then move on.",
    safety: "No grading language—celebrate vivid phrases over perfect grammar.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Smaller advisory circles forming new friendships",
    players: "6–30",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Split into groups of 4–6.",
      "Find three things everyone shares.",
      "Share one surprising commonality with the full room.",
      "Coach groups past obvious answers (“we all have phones”).",
    ],
    variation: "Theme rounds (music, food, school routines) or virtual breakouts of 4.",
    safety: "Remind groups that nobody must reveal private family details.",
  },
  {
    slug: "take-a-picture-of-your-shoes",
    name: "Take a Picture of Your Shoes",
    bestFor: "Visual, low-talk openers that still feel personal",
    players: "6–40",
    time: "5–10 min",
    materials: "Phones optional; or describe shoes aloud",
    steps: [
      "Invite students to show or describe their shoes in one sentence.",
      "Partners guess a hobby or personality trait from the shoes.",
      "Authors clarify with one fun fact.",
      "Keep it light—no fashion judgment.",
    ],
    variation: "No-phone classrooms: describe shoes only; or use backpack stickers instead.",
    safety: "Never mock clothing or brand status; model respectful curiosity.",
  },
  {
    slug: "never-have-i-ever",
    name: "Never Have I Ever (Clean Edition)",
    bestFor: "Trusted classes with a teacher-approved prompt list",
    players: "6–30",
    time: "8–12 min",
    materials: "Fingers or paper scorecards",
    steps: [
      "Everyone starts with five fingers up.",
      "Use only teacher-approved clean prompts (“Never have I ever… tried sushi”).",
      "Anyone who has done it puts a finger down.",
      "Stop before anyone feels singled out; celebrate stories lightly.",
    ],
    variation: "Teacher-only prompts from a card deck so students never invent risky statements.",
    safety: "Ban alcohol, dating, and illegal-activity prompts. Prefer teacher-read cards.",
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

export default async function IcebreakerGamesForHighSchoolStudentsPage() {
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
      q: "What are the best ice breaker games for high school students?",
      a: "Two Truths and a Lie, Human Bingo, The Name Game, Would You Rather, Rock Paper Scissors Tournament, Emoji Introduction, One Word Check-In, and This or That work well in most high school classrooms. Pick by period length and trust level first.",
    },
    {
      q: "What icebreakers work on the first day of school?",
      a: "Start with The Name Game, Human Bingo, Emoji Introduction, or This or That. Save Never Have I Ever and deeper storytelling until students know classroom norms.",
    },
    {
      q: "How long should high school icebreakers take?",
      a: "Most openers fit 5–15 minutes so you still have time for content. Save Human Bingo (15–25 minutes) for advisory, club nights, or orientation blocks.",
    },
    {
      q: "Are these ice breaker games for high school students school-safe?",
      a: "Yes—when you use clean prompts, skip dating/alcohol/body-image topics, offer opt-outs, and adapt physical games for comfort and mobility.",
    },
    {
      q: "How is this different from icebreakers for teens?",
      a: "This page is written for high school classroom constraints (bell schedules, advisory, PE, first day). For the broader teen audience hub, see icebreakers for teens; for general teen scene lists, see ice breaker games for teens.",
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
              src="/img/icebreaker-games-for-high-school-students-hero.jpg"
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
              <span>Ice breaker games for high school students</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>
              14 Ice Breaker Games for High School Students
            </h1>
            <p className={styles.heroLead}>
              Classroom-safe openers for advisory, first day, clubs, and PE—with players,
              time, rules, and safety notes teachers can run between bells.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/two-truths-and-a-lie" className={styles.ctaPrimary}>
                Start with Two Truths and a Lie
              </Link>
              <Link href="/icebreaker-games-for-teens" className={styles.ctaGhost}>
                Ice breaker games for teens
              </Link>
              <Link href="/icebreakers-for-teens" className={styles.ctaGhost}>
                Icebreakers for teens
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
                High school classrooms, advisory, orientation, clubs, and PE groups that need
                inclusive ice breaker games for high school students without awkward oversharing.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most rounds fit 6–40 students in 5–15 minutes; large mixers like Human Bingo may
                need a full advisory block.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip high-energy openers if the period needs quiet focus first, prompts feel too
                personal, or physical games are not adapted for comfort and safety.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best ice breaker games for high school students</h2>
            <p>
              Choose by period length and trust level first—then match group size, materials, and
              how much talking you want. Below are fourteen facilitator-ready options built for
              school constraints.
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
              new before we start the lesson. You can pass anytime. The goal is connection, not
              perfection. If you’d rather be timer or scorekeeper, tell me and I’ll set you up.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Ice breaker games for high school students only work when students feel free to opt
              out and nobody is set up to be embarrassed in front of peers.
            </p>
            <ul>
              <li>
                State a pass option upfront and offer alternate roles for anyone who wants lower
                visibility.
              </li>
              <li>
                Use clean, school-safe prompts—skip dating, alcohol, body image, and private family
                topics.
              </li>
              <li>
                Watch for cliques excluding newcomers; mix groups with Find Your Match or Human
                Bingo before group projects.
              </li>
              <li>
                Adapt physical games for comfort and mobility; offer seated or non-contact variants
                without calling anyone out.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose icebreakers for high school</h2>
            <p>
              For first day or a new advisory, start with{" "}
              <Link href="/games/the-name-game">The Name Game</Link>,{" "}
              <Link href="/games/emoji-introduction">Emoji Introduction</Link>, or{" "}
              <Link href="/games/human-bingo">Human Bingo</Link>. When you need instant energy in
              PE or a large class, use{" "}
              <Link href="/games/rock-paper-scissors-tournament">
                Rock Paper Scissors Tournament
              </Link>{" "}
              or <Link href="/games/would-you-rather">Would You Rather</Link>. For a five-minute
              bell opener, pick{" "}
              <Link href="/games/one-word-check-in">One Word Check-In</Link> or{" "}
              <Link href="/games/this-or-that-questions">This or That</Link>. After trust is built,
              move into <Link href="/games/common-ground">Common Ground</Link> or Six Word Memoirs.
              For the broader teen audience hub, see{" "}
              <Link href="/icebreakers-for-teens">icebreakers for teens</Link>; for youth nights,
              see{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              .
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>Who did you meet that you did not know well before?</li>
              <li>What made it easier to talk to someone new in this class?</li>
              <li>How can we make new classmates feel welcome every week?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about ice breaker games for high school students</h2>
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
                <Link href="/blog/icebreaker-games-for-students">
                  Ice Breaker Games — Icebreaker games for students
                </Link>
              </li>
              <li>
                <Link href="/icebreaker-games-for-teens">
                  Ice Breaker Games — Ice breaker games for teens
                </Link>
              </li>
            </ol>
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the <Link href="/">Ice Breaker Games home</Link>, then explore this
              student cluster:{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>{" "}
              (cluster hub), <Link href="/icebreakers-for-teens">icebreakers for teens</Link>,{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
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
