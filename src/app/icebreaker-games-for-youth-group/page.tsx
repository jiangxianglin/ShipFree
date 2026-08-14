import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./youth-group.module.css";

export const revalidate = 86400;

const title = "14 Ice Breaker Games for Youth Group (2026)";
const description =
  "Ice breaker games for youth group nights, retreats, and small groups. 14 facilitator-ready activities with players, time, rules, safety notes, and variations.";
const canonical = "https://www.icebreakergames.site/icebreaker-games-for-youth-group";
const ogImage =
  "https://www.icebreakergames.site/img/icebreaker-games-for-youth-group-hero.jpg";
const ogImageAlt =
  "Ice breaker games for youth group — diverse teens laughing in a community hall circle";

const gameEntries = [
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "New youth group nights and mixed-age openers",
    players: "5–40",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each person shares two true statements and one false statement.",
      "The group guesses which statement is the lie.",
      "Reveal the answer and move to the next person.",
      "Keep prompts light: hobbies, food, school, sports—not private family issues.",
    ],
    variation: "In small groups, play in pairs first, then share one favorite lie with the full room.",
    safety: "Model a fun, low-stakes example first so nobody feels pressured to overshare.",
  },
  {
    slug: "human-bingo",
    name: "Human Bingo",
    bestFor: "Large youth gatherings and welcome-night mixers",
    players: "10–50",
    time: "15–25 min",
    materials: "Bingo cards and pens",
    steps: [
      "Hand out youth-friendly bingo cards with prompts like “plays an instrument” or “has a pet.”",
      "Students mingle to find people who match squares and collect signatures.",
      "First to complete a line wins a small prize or cheer.",
      "Invite a few winners to share one interesting match they found.",
    ],
    variation: "For smaller rooms, require four corners instead of a full line; for virtual nights, use chat checkmarks.",
    safety: "Avoid appearance-based or dating-related prompts.",
  },
  {
    slug: "beach-ball-qa",
    name: "Beach Ball Q&A",
    bestFor: "Outdoor or gym openers with light movement",
    players: "8–40",
    time: "8–12 min",
    materials: "Beach ball with written questions",
    steps: [
      "Write light questions on a beach ball with a marker.",
      "Toss the ball; whoever catches it answers the question under their thumb.",
      "Continue until most people have answered once.",
      "Offer a pass option every time.",
    ],
    variation: "Classroom version: pass a soft foam ball while seated; large group: run two circles at once.",
    safety: "Have a softer toss rule indoors; allow sitting participants to receive a short underhand pass.",
  },
  {
    slug: "would-you-rather",
    name: "Would You Rather",
    bestFor: "Quick energy and opinion sharing",
    players: "6–60",
    time: "5–10 min",
    materials: "Prompt list",
    steps: [
      "Read two options and have people move to sides of the room or raise hands.",
      "Ask 1–2 people from each side to explain in one sentence.",
      "Run 5–8 rounds, then close.",
      "Use funny, age-appropriate choices—not moral traps.",
    ],
    variation: "For shy groups, use raise-hands only; for retreats, add a third “either is fine” middle zone.",
    safety: "Skip prompts about money, body image, dating, or family conflict.",
  },
  {
    slug: "never-have-i-ever",
    name: "Never Have I Ever",
    bestFor: "Youth groups that already trust each other",
    players: "6–30",
    time: "8–12 min",
    materials: "Fingers or paper scorecards",
    steps: [
      "Everyone starts with five fingers up.",
      "Players take turns saying “Never have I ever…” with a clean prompt.",
      "Anyone who has done it puts a finger down.",
      "Stop before anyone feels singled out; celebrate stories lightly.",
    ],
    variation: "Leader-only prompts from a clean card deck so students never invent risky statements.",
    safety: "Use a pre-approved clean prompt list. Ban alcohol, dating, and illegal activity prompts.",
  },
  {
    slug: "rock-paper-scissors-tournament",
    name: "Rock Paper Scissors Tournament",
    bestFor: "Huge groups that need instant energy",
    players: "12–100+",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Pair up and play Rock Paper Scissors.",
      "Losers become the winner’s cheer squad; winners keep playing.",
      "Continue until one champion remains.",
      "Celebrate the loudest cheer section, not only the champion.",
    ],
    variation: "Best of three for smaller groups; for virtual, use gallery-view pair rounds with mute cheers.",
    safety: "Great low-risk opener before quieter discussion activities.",
  },
  {
    slug: "the-name-game",
    name: "The Name Game",
    bestFor: "First nights when names matter most",
    players: "8–20",
    time: "5–10 min",
    materials: "None (name tags help)",
    steps: [
      "Each person says their name plus one simple prompt (favorite snack, hobby, or emoji).",
      "The next person repeats a few previous names before adding theirs.",
      "Help quickly if someone blanks—names should feel supportive.",
      "End by challenging the group to greet two new people by name.",
    ],
    variation: "Large group: split into circles of 8–10; classroom: use name tents on desks.",
    safety: "Never punish forgetting a name; normalize group help.",
  },
  {
    slug: "skittles-sharing",
    name: "Skittles Sharing",
    bestFor: "Small groups and discussion openers",
    players: "6–24",
    time: "10–15 min",
    materials: "Colored candy or paper chips",
    steps: [
      "Give each person a few colored pieces.",
      "Assign a prompt to each color (red = favorite movie, green = weekend plan).",
      "People share based on the colors they drew.",
      "Keep shares to 20–30 seconds.",
    ],
    variation: "Workplace or allergy-safe nights: use colored paper chips instead of candy.",
    safety: "Offer non-food color chips for allergies and dietary needs.",
  },
  {
    slug: "human-knot",
    name: "Human Knot",
    bestFor: "Retreats and outdoor team challenges",
    players: "8–16 per knot",
    time: "10–15 min",
    materials: "Open space",
    steps: [
      "Form a circle, grab two non-adjacent hands, and untangle without letting go.",
      "Coach communication over force.",
      "Stop and reset if anyone feels uncomfortable.",
      "Debrief what helped the group get unstuck.",
    ],
    variation: "Contact-light version: hold soft ropes or bandanas instead of hands; race two small knots.",
    safety: "Offer rope/connector variants or non-contact alternatives for anyone who does not want hand-holding.",
  },
  {
    slug: "scavenger-hunt",
    name: "Scavenger Hunt",
    bestFor: "Campus, church building, or park nights",
    players: "10–60",
    time: "15–25 min",
    materials: "Clue sheets or photo checklist",
    steps: [
      "Send teams out with a short list of findable items or photo challenges.",
      "Set a clear boundary and return time.",
      "Review creative finds together.",
      "Award categories like fastest, funniest photo, and best teamwork.",
    ],
    variation: "Indoor church/campus version with photo checklist; virtual: find items on camera in 60 seconds.",
    safety: "Keep teams in public areas; assign adult checkpoints for younger teens.",
  },
  {
    slug: "train-wreck",
    name: "Train Wreck",
    bestFor: "High-energy youth nights in a gym or large room",
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
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Small groups forming new friendships",
    players: "6–30",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Split into groups of 4–6.",
      "Find three things everyone shares.",
      "Share one surprising commonality with the full room.",
      "Coach groups past obvious answers.",
    ],
    variation: "Theme rounds for retreats (hobbies, food, school) or virtual breakout rooms of 4.",
    safety: "Remind groups that nobody must reveal personal details they want private.",
  },
  {
    slug: "appreciation-circle",
    name: "Appreciation Circle",
    bestFor: "Closing a retreat or affirming existing groups",
    players: "6–20",
    time: "10–15 min",
    materials: "None",
    steps: [
      "Sit in a circle.",
      "Each person offers a short appreciation to the person on their right or to the group.",
      "Keep statements specific and kind.",
      "Close with one group cheer or prayer/reflection if that fits your setting.",
    ],
    variation: "Large group: write sticky-note appreciations; classroom: pair-share then two volunteers report.",
    safety: "Make appreciation optional; allow written notes instead of speaking.",
  },
  {
    slug: "find-your-match",
    name: "Find Your Match",
    bestFor: "Mixing cliques at the start of the night",
    players: "10–50",
    time: "10–15 min",
    materials: "Paired cards",
    steps: [
      "Hand out halves of famous pairs.",
      "Students ask yes/no questions to find their match.",
      "Matched pairs sit together for the next activity.",
      "Use this before small-group discussion so new combinations form.",
    ],
    variation: "Church nights: use Bible-story or worship-song pairs; virtual: DM clues to find a partner.",
    safety: "Choose wholesome pair themes and avoid romance-focused cards for younger groups.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      siteName: "Ice Breaker Games",
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
      images: {
        url: ogImage,
        alt: ogImageAlt,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function IcebreakerGamesForYouthGroupPage() {
  const games = await getAllGames();
  const featured = gameEntries
    .map((entry) => {
      const game = games.find((g) => g.slug === entry.slug);
      return game ? { ...entry, game } : { ...entry, game: null };
    })
    .filter((entry) => entry.game);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description,
    numberOfItems: featured.length,
    itemListElement: featured.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      url: `https://www.icebreakergames.site/games/${entry.slug}`,
    })),
  };

  const faqs = [
    {
      q: "What are the best ice breaker games for youth group?",
      a: "The strongest options are easy to explain, inclusive, and age-appropriate. Favorites include Two Truths and a Lie, Human Bingo, Beach Ball Q&A, Would You Rather, Rock Paper Scissors Tournament, and The Name Game.",
    },
    {
      q: "What icebreakers work for a large youth group?",
      a: "For large gatherings, use scalable youth group icebreakers like Human Bingo, Rock Paper Scissors Tournament, Scavenger Hunt, Train Wreck, and Find Your Match. These keep people moving and avoid long one-by-one speaking turns.",
    },
    {
      q: "What are good icebreakers for a shy youth group?",
      a: "Start with low-pressure activities such as The Name Game, Common Ground, Skittles Sharing with optional shares, or Would You Rather with movement instead of speeches. Always allow a pass option.",
    },
    {
      q: "How long should an opener take?",
      a: "Most rounds should take 5–15 minutes. Use longer 15–25 minute games like Human Bingo or Scavenger Hunt only when you have a full night or retreat block.",
    },
    {
      q: "How do you keep youth icebreakers safe and inclusive?",
      a: "Use clean prompts, avoid embarrassment games, offer opt-outs, watch for cliques excluding newcomers, and adapt physical games for different comfort and mobility levels. Leaders should model kind participation.",
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

      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroMedia}>
            <Image
              src="/img/icebreaker-games-for-youth-group-hero.jpg"
              alt="Ice breaker games for youth group — diverse teens laughing in a community hall circle"
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
              <span>Ice breaker games for youth group</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>14 Ice Breaker Games for Youth Group</h1>
            <p className={styles.heroLead}>
              Facilitator-ready openers for youth nights, retreats, and small groups—with players,
              time, rules, and safety notes so leaders can run them with confidence.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/two-truths-and-a-lie" className={styles.ctaPrimary}>
                Start with Two Truths and a Lie
              </Link>
              <Link href="/games" className={styles.ctaGhost}>
                Browse all games
              </Link>
              <Link href="/blog/icebreaker-games-for-students" className={styles.ctaGhost}>
                Student icebreakers
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <section className={styles.snapshot} aria-label="When these games work best">
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Best for</p>
              <p>
                Church teens, camps, retreats, and middle/high school small groups that need
                inclusive youth group icebreakers and age-appropriate openers.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most youth group icebreakers fit 6–40 students in 5–15 minutes; large mixers like
                Human Bingo or Scavenger Hunt may need 20+ minutes.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip high-energy openers when the room needs quiet reflection first, prompts feel
                too personal, or physical games are not adapted for comfort and safety.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best ice breaker games for youth group</h2>
            <p>
              Choose by energy and trust level first—then match group size, materials, and how much
              talking you want. Below are fourteen facilitator-ready options for youth nights.
            </p>
          </section>

          <section className={styles.gameList}>
            {featured.map((entry, index) => (
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
                  <p className={styles.variation}>
                    <strong>Facilitator note: </strong>
                    {entry.safety}
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
              “Tonight we are going to play a short icebreaker so everyone gets a chance to meet
              someone new. You can pass anytime. The goal is connection, not perfection. If you need
              a different role—scorekeeper, timer, or photographer—tell a leader and we will set you
              up.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Youth group icebreakers only work when students feel free to opt out and nobody is set
              up to be embarrassed. Use these notes every night.
            </p>
            <ul>
              <li>
                State a pass option upfront and offer alternate roles (timer, photographer,
                scorekeeper) for anyone who wants lower visibility.
              </li>
              <li>
                Use clean, age-appropriate prompts—skip dating, alcohol, body image, and private
                family topics.
              </li>
              <li>
                Watch for cliques excluding newcomers; mix groups with Find Your Match or Human Bingo
                before deeper discussion.
              </li>
              <li>
                Adapt physical games for comfort and mobility; offer seated or non-contact variants
                without calling anyone out.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose icebreakers for youth group</h2>
            <p>
              Pick by situation first. For a first night or new members, start with{" "}
              <Link href="/games/the-name-game">The Name Game</Link>,{" "}
              <Link href="/games/find-your-match">Find Your Match</Link>, or{" "}
              <Link href="/games/human-bingo">Human Bingo</Link>. When you need instant energy, use{" "}
              <Link href="/games/rock-paper-scissors-tournament">
                Rock Paper Scissors Tournament
              </Link>
              , <Link href="/games/train-wreck">Train Wreck</Link>, or Beach Ball Q&A. After trust is
              built, move into Common Ground, Skittles Sharing, or{" "}
              <Link href="/games/appreciation-circle">Appreciation Circle</Link>. Matching energy to
              the room keeps the night welcoming instead of awkward.
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>Who did you meet that you did not know well before?</li>
              <li>What made it easier to talk to someone new?</li>
              <li>How can we make new people feel welcome every week?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about ice breaker games for youth group</h2>
            {faqs.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Start from the{" "}
              <Link href="/">Ice Breaker Games home</Link>, then explore nearby group and teen
              guides:{" "}
              <Link href="/icebreaker-games-for-teens">ice breaker games for teens</Link>{" "}
              (student cluster hub),{" "}
              <Link href="/icebreakers-for-teens">icebreakers for teens</Link>,{" "}
              <Link href="/icebreaker-games-for-high-school-students">
                ice breaker games for high school students
              </Link>
              ,{" "}
              <Link href="/icebreaker-games-for-small-groups">
                ice breaker games for small groups
              </Link>{" "}
              (group cluster hub),{" "}
              <Link href="/best-icebreaker-games">best icebreaker games</Link>, and{" "}
              <Link href="/blog/icebreaker-games-for-students">
                icebreaker games for students
              </Link>
              . For more movement and mixer ideas, see{" "}
              <Link href="/games-like-the-human-knot">games like the Human Knot</Link> and{" "}
              <Link href="/games-like-human-bingo">games like Human Bingo</Link>, or open the{" "}
              <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
