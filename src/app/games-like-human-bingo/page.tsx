import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./human-bingo.module.css";

export const revalidate = 86400;

const title = "12 Games Like Human Bingo (2026) | Networking Icebreakers";
const description =
  "Looking for games like Human Bingo? Compare 12 mingling and networking icebreakers with players, time, rules, prompts, and facilitator tips for events and teams.";
const canonical = "https://www.icebreakergames.site/games-like-human-bingo";
const ogImage =
  "https://www.icebreakergames.site/img/games-like-human-bingo-hero.jpg";
const ogImageAlt =
  "Games like Human Bingo — professionals mingling with bingo cards at a sunlit networking mixer";

const gameEntries = [
  {
    slug: "human-bingo",
    name: "Human Bingo",
    bestFor: "Large mixers, orientations, and networking events that need a clear win condition",
    players: "10–50",
    time: "20–30 min",
    materials: "Bingo cards and pens",
    steps: [
      "Give each person a bingo card with personal prompts.",
      "Players mingle to find people who match each square and collect signatures.",
      "First to complete a line (or full card) wins.",
      "Invite winners to share one interesting person they met.",
    ],
    whySimilar: "The classic mingling format everyone compares against.",
    variation: "For shorter slots, require four corners or a single line instead of a blackout card.",
  },
  {
    slug: "icebreaker-bingo",
    name: "Icebreaker Bingo",
    bestFor: "Workshops and conferences that want a Human Bingo twin with custom prompts",
    players: "10–60",
    time: "15–25 min",
    materials: "Themed bingo cards",
    steps: [
      "Hand out theme-specific bingo cards (work, school, or event topics).",
      "Mingle, ask questions, and collect signatures.",
      "Celebrate first line and most signatures.",
      "Use this when you want Human Bingo energy with custom prompts.",
    ],
    whySimilar: "Same bingo mechanic with easier theme customization.",
    variation: "Build cards around your industry, school year, or conference tracks.",
  },
  {
    slug: "find-your-match",
    name: "Find Your Match",
    bestFor: "Fast pairing before small-group work when bingo cards feel too long",
    players: "10–50",
    time: "10–15 min",
    materials: "Paired cards",
    steps: [
      "Give each person half of a famous pair.",
      "Players ask yes/no questions to find their match.",
      "Matched pairs share one fact, then sit together.",
      "Works as a shorter, more targeted mixer than bingo.",
    ],
    whySimilar: "Encourages circulating and conversation with a clear win condition.",
    variation: "Use work pairs (product + customer, strategy + execution) for training days.",
  },
  {
    slug: "speed-networking",
    name: "Speed Networking",
    bestFor: "Professional events and structured introductions with timed rounds",
    players: "8–40",
    time: "15–25 min",
    materials: "Timer; optional prompt cards",
    steps: [
      "Pair people for 2–3 minute conversations.",
      "Use a shared prompt each round.",
      "Rotate on a timer until everyone has met several people.",
      "Close by asking people to shout out one useful connection.",
    ],
    whySimilar: "Same networking goal with timed rounds instead of bingo squares.",
    variation: "Run two prompt rounds, then one free-form “what are you working on?” round.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Smaller groups that want discovery without printing cards",
    players: "6–30",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Split into groups of 4–6.",
      "Find three things everyone shares.",
      "Share one surprising commonality with the room.",
      "Push beyond surface answers for better conversation.",
    ],
    whySimilar: "Focuses on discovering shared traits, like bingo prompts do.",
    variation: "Theme rounds: hobbies, travel, work habits, or food.",
  },
  {
    slug: "10-things-in-common",
    name: "10 Things in Common",
    bestFor: "Pairs or trios that need a deeper mixer after a big room opener",
    players: "6–30",
    time: "10–15 min",
    materials: "Paper optional",
    steps: [
      "Send pairs or trios to list 10 things they share.",
      "Ban obvious answers like “we are in this room.”",
      "Have each group share their favorite find.",
      "Use before team projects to accelerate trust.",
    ],
    whySimilar: "Turns the “find people who…” idea into a collaborative list.",
    variation: "Shorten to five things for a tighter 6-minute round.",
  },
  {
    slug: "category-mixer",
    name: "Category Mixer",
    bestFor: "Large rooms that need fast cluster movement with almost no prep",
    players: "12–60",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Call categories (morning people, tea drinkers, travel lovers).",
      "People move to matching zones and greet two strangers.",
      "Ask one person from each zone to share a one-line reason.",
      "Run 4–6 rounds, then transition to the main agenda.",
    ],
    whySimilar: "Creates Human Bingo style discovery through movement clusters.",
    variation: "Use workplace-safe categories like “remote today” or “first conference.”",
  },
  {
    slug: "reception-line",
    name: "Reception Line",
    bestFor: "Formal events and welcome receptions that need guaranteed introductions",
    players: "12–40",
    time: "10–15 min",
    materials: "None",
    steps: [
      "Form two facing lines.",
      "People introduce themselves to the person opposite for 45–60 seconds.",
      "One line shifts so everyone meets someone new.",
      "Repeat until energy dips, then sit for the program.",
    ],
    whySimilar: "Structured mingling with guaranteed new introductions.",
    variation: "Give each round a prompt: name + role + one hobby.",
  },
  {
    slug: "sole-mate",
    name: "Sole Mate",
    bestFor: "Playful groups and creative icebreakers that still want “find someone who…”",
    players: "8–30",
    time: "8–12 min",
    materials: "None (shoes stay on)",
    steps: [
      "Ask people to find someone with a similar shoe style, color, or story.",
      "Pairs share why they chose each other.",
      "Remix with a second prompt (favorite walk, commute style).",
      "Keep it light and optional for anyone uncomfortable focusing on clothing.",
    ],
    whySimilar: "A visual “find someone who…” prompt without printed cards.",
    variation: "Swap shoes for “similar commute” or “same favorite snack” if clothing focus feels awkward.",
  },
  {
    slug: "guess-who-personal-trivia",
    name: "Guess Who (Personal Trivia)",
    bestFor: "Teams that already know each other a little and want curiosity, not signatures",
    players: "8–30",
    time: "10–15 min",
    materials: "Index cards",
    steps: [
      "Each person writes a surprising true fact anonymously.",
      "Read facts aloud; the group guesses who wrote each one.",
      "Reveal and celebrate unexpected stories.",
      "Use workplace-safe facts only.",
    ],
    whySimilar: "Builds curiosity about people, like scanning bingo prompts.",
    variation: "Collect facts in advance for hybrid or shy groups.",
  },
  {
    slug: "scavenger-hunt",
    name: "Scavenger Hunt",
    bestFor: "Events with space to explore and checklist energy like bingo",
    players: "10–60",
    time: "15–25 min",
    materials: "Checklist or photo prompts",
    steps: [
      "Teams complete a checklist of finds or photo challenges.",
      "Include at least two prompts that require talking to someone new.",
      "Review creative completions together.",
      "Award teamwork and creativity, not only speed.",
    ],
    whySimilar: "Checklist completion feels like bingo with more movement.",
    variation: "Virtual version: find items on camera within 60 seconds per round.",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Smaller circles after a big mixer when you want storytelling, not more circulating",
    players: "5–40",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each person shares two truths and one lie.",
      "The group guesses the lie.",
      "Reveal and rotate quickly.",
      "Great follow-up once Human Bingo has warmed the room.",
    ],
    whySimilar: "Same get-to-know goal with storytelling instead of signatures.",
    variation: "Play in pairs first, then share one favorite lie with the full group.",
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

export default async function GamesLikeHumanBingoPage() {
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
      q: "What games are like Human Bingo?",
      a: "Games like Human Bingo help people mingle, ask questions, and discover shared traits. Close alternatives include Icebreaker Bingo, Find Your Match, Speed Networking, Common Ground, Category Mixer, and 10 Things in Common.",
    },
    {
      q: "What is a good alternative to Human Bingo for work events?",
      a: "For work events, try Speed Networking, Find Your Match, Common Ground, or a customized Icebreaker Bingo card with professional prompts. These keep networking structured and workplace-safe.",
    },
    {
      q: "How many people do you need for games like Human Bingo?",
      a: "Most games like Human Bingo work best with 10 or more people so mingling feels natural. For groups under 10, use Common Ground, 10 Things in Common, or Two Truths and a Lie instead.",
    },
    {
      q: "How long do games like Human Bingo take?",
      a: "Plan 15–30 minutes for bingo-style mixers. Faster alternatives such as Find Your Match or Category Mixer can finish in 8–15 minutes.",
    },
    {
      q: "Can I play games like Human Bingo virtually?",
      a: "Yes. Use breakout-room Speed Networking, chat-based bingo prompts, or Common Ground in small rooms. For more remote options, see virtual icebreaker games at https://www.icebreakergames.site/virtual-icebreaker-games.",
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
              src="/img/games-like-human-bingo-hero.jpg"
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
              <span>Games like Human Bingo</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>12 Games Like Human Bingo</h1>
            <p className={styles.heroLead}>
              Looking for games like Human Bingo? Compare 12 mingling icebreakers with the same
              discovery energy—players, time, rules, and facilitator tips included.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/human-bingo" className={styles.ctaPrimary}>
                Play Human Bingo
              </Link>
              <Link
                href="/blog/human-bingo-for-students-printable"
                className={styles.ctaGhost}
              >
                Printable student cards
              </Link>
              <Link href="/games-like-the-human-knot" className={styles.ctaGhost}>
                Games like Human Knot
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <section className={styles.snapshot} aria-label="When these games work best">
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Best for</p>
              <p>
                Networking mixers, orientations, conferences, and any room that needs people to ask
                questions and discover shared traits.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most games like Human Bingo fit 10–50 people in 8–30 minutes, depending on whether
                you use cards, timed rounds, or free mingling.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip bingo-style circulating when the group is under 10, mobility is limited without
                adaptations, or you only have five minutes before the main agenda.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best games like Human Bingo</h2>
            <p>
              Choose by format first—cards and a winner, timed pairing, or no-print discovery—then
              match group size and energy. Games like Human Bingo work because they give shy people a
              reason to approach strangers, create a light competitive finish line, and surface shared
              traits without forcing long speeches. Below are twelve proven alternatives and close
              cousins you can run at mixers, orientations, conferences, and team kickoffs.
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
                  <p className={styles.variation}>
                    <strong>Why it is like Human Bingo: </strong>
                    {entry.whySimilar}
                  </p>
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
              “We are going to mingle with a purpose—think of it as a lighter cousin to Human Bingo.
              Your job is to ask good questions and meet new people, not to rush. If you need a
              seated or low-mobility option, tell me and I will pair you with people who come to you.
              Ready? Cards up—let’s start.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; inclusion</h2>
            <p>
              Mingling icebreakers only work when everyone can participate without feeling exposed.
              Use these notes whenever you run Human Bingo or a close substitute.
            </p>
            <ul>
              <li>
                Vet prompts for workplace and school safety—skip appearance, dating, income, and
                other sensitive topics.
              </li>
              <li>
                Offer a seated lane or “people come to you” option for anyone who cannot circulate
                easily.
              </li>
              <li>
                Celebrate first line and creative conversations, not only full-card blackouts, so
                quieter players still win.
              </li>
              <li>
                For groups under 10, switch to Common Ground or 10 Things in Common instead of forcing
                a bingo grid.
              </li>
              <li>
                Preview prompts with a co-facilitator when the room mixes cultures, ages, or power
                levels—what feels fun to hosts can still exclude newcomers.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose among games like Human Bingo</h2>
            <p>
              Pick by format first. Need cards and a clear winner? Use Human Bingo or Icebreaker
              Bingo. Need faster pairing? Use Find Your Match or Speed Networking. Smaller group, no
              printouts? Use Common Ground or 10 Things in Common. Huge room, little prep? Use
              Category Mixer, then optionally roll into bingo once energy is up. If people already
              know each other a little, Guess Who or Two Truths and a Lie keeps curiosity high without
              another full circulating round.
            </p>
            <h3>Quick decision guide</h3>
            <ul>
              <li>
                <strong>Cards + winner:</strong> Human Bingo or Icebreaker Bingo
              </li>
              <li>
                <strong>Faster pairing:</strong> Find Your Match or Speed Networking
              </li>
              <li>
                <strong>No printouts:</strong> Common Ground, 10 Things in Common, or Category Mixer
              </li>
              <li>
                <strong>After the mixer:</strong> Two Truths and a Lie for smaller storytelling circles
              </li>
            </ul>
            <h3>Debrief questions</h3>
            <ul>
              <li>Who did you meet that you would not have approached otherwise?</li>
              <li>Which prompt or question created the most useful conversation?</li>
              <li>Where did people cluster or get stuck—and how could we redesign the room next time?</li>
              <li>What is one connection you want to follow up on after this session?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>Prompt writing tips for Human Bingo style mixers</h2>
            <p>
              Strong prompts make games like Human Bingo feel useful instead of awkward. Aim for
              traits people can answer in one sentence, that signal a story, and that stay
              workplace-safe or classroom-safe. Good squares sound like “has lived in another
              country,” “plays a team sport,” or “prefers tea over coffee.” Weak squares sound like
              “is popular,” “makes the most money,” or anything about appearance, dating, or private
              family details.
            </p>
            <p>
              For conferences, customize Icebreaker Bingo around tracks, tools, or roles so
              networking stays on-theme. For youth groups and schools, keep prompts light and
              printable—then point students to a ready card set. For remote rooms, shrink the grid,
              use chat checkmarks, or switch to breakout Speed Networking so nobody has to chase
              signatures across a noisy open call.
            </p>
            <p>
              Time-box the round before you start. Announce whether a single line, four corners, or
              blackout wins, and stop while energy is still high. Close by asking two or three people
              to share one interesting match—then move into your main agenda while the room still
              feels warm.
            </p>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about games like Human Bingo</h2>
            {faqs.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                {item.q === "Can I play games like Human Bingo virtually?" ? (
                  <p>
                    Yes. Use breakout-room Speed Networking, chat-based bingo prompts, or Common Ground
                    in small rooms. For more remote options, browse{" "}
                    <Link href="/virtual-icebreaker-games">virtual icebreaker games</Link>.
                  </p>
                ) : (
                  <p>{item.a}</p>
                )}
              </div>
            ))}
          </section>

          <section className={styles.related}>
            <h2>Related guides</h2>
            <p>
              Keep exploring games like Human Bingo with{" "}
              <Link href="/">Ice Breaker Games home</Link>,{" "}
              <Link href="/games/human-bingo">Human Bingo how-to</Link>,{" "}
              <Link href="/games-like-the-human-knot">games like the Human Knot</Link>,{" "}
              <Link href="/games-like-two-truths-and-a-lie">
                games like Two Truths and a Lie
              </Link>
              , <Link href="/games/never-have-i-ever">Never Have I Ever</Link> (games like
              cluster), <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link>,{" "}
              <Link href="/icebreaker-games-for-teens">
                ice breaker games for teens
              </Link>
              ,{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
              </Link>
              ,{" "}
              <Link href="/blog/human-bingo-for-students-printable">
                printable Human Bingo for students
              </Link>
              , <Link href="/best-icebreaker-games">best icebreaker games</Link>, and the{" "}
              <Link href="/games">full games library</Link>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
