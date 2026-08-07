import { getAllGames } from "@/db/queries/games";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./human-knot.module.css";

export const revalidate = 86400;

const title = "12 Games Like the Human Knot (2026)";
const description =
  "Games Like the Human Knot for teams: 12 physical icebreakers with players, time, rules, safer variations, and facilitator tips.";
const canonical = "https://www.icebreakergames.site/games-like-the-human-knot";
const ogImage =
  "https://www.icebreakergames.site/img/games-like-the-human-knot-hero.jpg";

const gameEntries = [
  {
    slug: "human-knot",
    name: "Human Knot",
    bestFor: "The classic physical challenge people compare when looking for knot-style team icebreakers",
    players: "8–30",
    time: "10–15 min",
    materials: "Open space",
    steps: [
      "Form a tight circle standing shoulder to shoulder.",
      "Each person reaches across and holds two non-adjacent hands.",
      "Without letting go, the group untangles into a circle (or two linked circles).",
      "Debrief: what helped communication when the knot felt stuck?",
    ],
    variation: "Split groups larger than 16 into two knots racing side by side.",
  },
  {
    slug: "train-wreck",
    name: "Train Wreck",
    bestFor: "A high-energy Human Knot alternative when groups need movement and quick decisions",
    players: "10–40",
    time: "10–15 min",
    materials: "Chairs in a circle (one fewer than players)",
    steps: [
      "One person stands in the center and calls a category (e.g., “anyone wearing blue”).",
      "Matching people must switch seats; the center person tries to take an empty seat.",
      "Whoever is left standing becomes the new caller.",
      "Keep categories inclusive and avoid body-shaming prompts.",
    ],
    variation: "Use work-safe prompts like “worked remotely today” or “likes coffee.”",
  },
  {
    slug: "marshmallow-challenge",
    name: "Marshmallow Challenge",
    bestFor: "A problem-solving substitute for knot-style icebreakers with cross-functional teams",
    players: "8–40 (teams of 3–5)",
    time: "15–20 min",
    materials: "Spaghetti, tape, string, one marshmallow per team",
    steps: [
      "Give each team identical materials and 18 minutes to build the tallest free-standing tower.",
      "The marshmallow must sit on top.",
      "Measure heights at the end; celebrate process, not only height.",
      "Debrief prototyping, roles, and assumptions.",
    ],
    variation: "Shorten to 12 minutes for a sharper time-pressure lesson.",
  },
  {
    slug: "telephone-charades",
    name: "Telephone Charades",
    bestFor: "A no-contact alternative to the Human Knot that still teaches communication under pressure",
    players: "10–40",
    time: "10–15 min",
    materials: "Prompt cards",
    steps: [
      "Line up a team facing away from the front.",
      "Show a prompt only to the first person; they act it for the next person only.",
      "Continue down the line; the last person guesses.",
      "Compare the final guess with the original prompt.",
    ],
    variation: "Use workplace themes (product launch, client call) for training days.",
  },
  {
    slug: "line-up",
    name: "Line-Up",
    bestFor: "Quiet collaboration—similar teamwork payoff to tangled-circle icebreakers, without hand-holding",
    players: "8–30",
    time: "8–12 min",
    materials: "None",
    steps: [
      "Ask the group to line up by birthday month, height, or years at the company—without speaking.",
      "Allow gestures and written notes if needed for accessibility.",
      "Check the order together and celebrate near-misses.",
      "Debrief how the group negotiated without words.",
    ],
    variation: "For virtual groups, sort in a shared doc or Zoom gallery by number.",
  },
  {
    slug: "paper-bag-pickup",
    name: "Paper Bag Pickup",
    bestFor: "Light physical teamwork for groups who want knot-game energy with softer contact rules",
    players: "8–24",
    time: "8–12 min",
    materials: "Paper bags or soft objects",
    steps: [
      "Scatter bags in an open area.",
      "Teams race to collect bags under a rule (e.g., only elbows, or pairs must stay linked).",
      "Count scores and reset rules for a second round.",
      "Keep contact optional; offer seated adaptations.",
    ],
    variation: "Use soft balls indoors and remove racing for younger or mixed-ability groups.",
  },
  {
    slug: "two-truths-and-a-lie",
    name: "Two Truths and a Lie",
    bestFor: "Non-physical Human Knot substitute with the same get-to-know payoff",
    players: "5–40",
    time: "8–15 min",
    materials: "None",
    steps: [
      "Each person shares two true statements and one false statement.",
      "The group guesses the lie.",
      "Reveal the answer and rotate quickly.",
      "Use after a physical game to cool down into conversation.",
    ],
    variation: "Play in pairs first, then share one favorite lie with the full group.",
  },
  {
    slug: "rock-paper-scissors-tournament",
    name: "Rock Paper Scissors Tournament",
    bestFor: "Fast large-group energy when you need a Human Knot alternative but have zero materials",
    players: "12–100+",
    time: "5–10 min",
    materials: "None",
    steps: [
      "Everyone pairs up and plays Rock Paper Scissors.",
      "Losers cheer for winners; winners find new opponents.",
      "Continue until one champion remains with a large cheering crowd.",
      "End with a quick clap for the champion and the loudest cheer section.",
    ],
    variation: "Best of three for smaller groups so rounds last longer.",
  },
  {
    slug: "scavenger-hunt",
    name: "Scavenger Hunt",
    bestFor: "Exploration and pairing strangers—another physical alternative to tangled-circle icebreakers",
    players: "10–60",
    time: "15–25 min",
    materials: "Clue list or photo checklist",
    steps: [
      "Hand out a short list of findable items or photo challenges.",
      "Teams race or collaborate to complete as many as possible.",
      "Review creative finds together.",
      "Keep items accessible and avoid anything that could exclude mobility needs.",
    ],
    variation: "Virtual version: find items on camera within 60 seconds per round.",
  },
  {
    slug: "common-ground",
    name: "Common Ground",
    bestFor: "Connection without the physical tangle—ideal if classic knot games feel too contact-heavy",
    players: "6–30",
    time: "8–15 min",
    materials: "None (optional whiteboard)",
    steps: [
      "Split into small groups of 4–6.",
      "Groups find three surprising things everyone shares.",
      "Share one find with the full room.",
      "Coach groups away from surface-level answers (“we all breathe”).",
    ],
    variation: "Theme rounds: hobbies, travel, work habits, or food.",
  },
  {
    slug: "find-your-match",
    name: "Find Your Match",
    bestFor: "Mingling energy similar to knot games, with less physical contact than the Human Knot",
    players: "10–50",
    time: "10–15 min",
    materials: "Paired cards",
    steps: [
      "Give each person half of a famous pair.",
      "People mingle by asking yes/no questions to find their match.",
      "Matched pairs share one fun fact, then sit together.",
      "Great opener before deeper activities.",
    ],
    variation: "Use work pairs (product + customer, strategy + execution) for training.",
  },
  {
    slug: "chainlink",
    name: "Chainlink",
    bestFor: "Coordinated movement and group rhythm—closest motion cousin among Human Knot alternatives",
    players: "8–30",
    time: "8–12 min",
    materials: "Open space",
    steps: [
      "Participants link arms or hold a soft connector and move as one unit through a simple obstacle path.",
      "Add constraints (no talking, only two people lead) for harder rounds.",
      "Reset and let a different pair lead.",
      "Debrief leadership, listening, and pacing.",
    ],
    variation: "Skip physical linking; use a rope everyone holds for contact-sensitive groups.",
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
          alt: "Games Like the Human Knot — team icebreaker outdoors",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function GamesLikeTheHumanKnotPage() {
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
      q: "What are the best games like the Human Knot?",
      a: "Strong options emphasize teamwork, problem-solving, and communication under light physical or role constraints. Top Human Knot alternatives include Train Wreck, Marshmallow Challenge, Telephone Charades, Line-Up, and Rock Paper Scissors Tournament.",
    },
    {
      q: "What can I use instead of the Human Knot if people do not want to hold hands?",
      a: "Skip hand-holding and use non-contact substitutes such as Line-Up, Telephone Charades, Marshmallow Challenge, Common Ground, or Find Your Match. You can also adapt the classic knot with soft connectors or ropes.",
    },
    {
      q: "Are these knot-style icebreakers good for youth groups?",
      a: "Yes—Human Knot alternatives work for youth groups when you set safety boundaries, offer opt-outs, and avoid rough contact. Try Train Wreck, Rock Paper Scissors Tournament, Scavenger Hunt, or a consent-aware knot-style round.",
    },
    {
      q: "How long do these physical team icebreakers take?",
      a: "Most alternatives take 8–15 minutes. Problem-solving builds like the Marshmallow Challenge may need 15–20 minutes including debrief.",
    },
    {
      q: "What should facilitators watch for during physical icebreakers?",
      a: "For knot-style icebreakers and similar physical team challenges, watch consent, mobility needs, crowded space, and competitive pressure. Offer seated or non-contact variants and debrief collaboration rather than speed alone.",
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
              src="/img/games-like-the-human-knot-hero.jpg"
              alt="Games Like the Human Knot — diverse team untangling outdoors"
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
              <span>Games like the Human Knot</span>
            </nav>
            <p className={styles.brand}>Ice Breaker Games</p>
            <h1 className={styles.heroTitle}>12 Games Like the Human Knot</h1>
            <p className={styles.heroLead}>
              Looking for games like the Human Knot? Compare 12 physical and problem-solving
              substitutes with players, time, rules, and safer variations.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/games/human-knot" className={styles.ctaPrimary}>
                How to play Human Knot
              </Link>
              <Link href="/games-like-human-bingo" className={styles.ctaGhost}>
                Games like Human Bingo
              </Link>
              <Link href="/games/never-have-i-ever" className={styles.ctaGhost}>
                Never Have I Ever
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <section className={styles.snapshot} aria-label="When these games work best">
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Best for</p>
              <p>
                Knot-style team icebreakers suit in-person teams, camps, retreats, and groups ready
                for movement-based collaboration.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Players / Time</p>
              <p>
                Most Human Knot alternatives fit 8–40 people in 8–20 minutes, including a short
                debrief.
              </p>
            </div>
            <div className={styles.snapshotItem}>
              <p className={styles.snapshotLabel}>Avoid when</p>
              <p>
                Skip knot-style icebreakers when people prefer low contact, the space is tight, or
                mobility needs are unresolved without adaptations.
              </p>
            </div>
          </section>

          <section className={styles.sectionHead}>
            <h2>Best games like the Human Knot</h2>
            <p>
              Choose by contact level first—then match energy, materials, and how much laughter you
              want in the room. Below are twelve proven Human Knot substitutes and close cousins.
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
              “We are going to solve a small challenge together—think of it as a lighter cousin to
              knot-style icebreakers. The goal is clear communication, not speed. If you need a
              non-contact option or want to sit this round out, tell me and I will give you an
              observer or helper role. Ready? Let’s start.”
            </p>
          </section>

          <section className={styles.safety}>
            <h2>Facilitator notes &amp; safety</h2>
            <p>
              Physical teamwork only works when people feel free to opt out. Use these notes whenever
              you run the Human Knot or any close substitute.
            </p>
            <ul>
              <li>
                State consent upfront: holding hands or linking arms is optional; offer ropes, soft
                connectors, or observer roles.
              </li>
              <li>
                Check space and mobility before starting—crowded rooms and unresolved accessibility
                needs are signals to pick a non-contact alternative.
              </li>
              <li>
                Keep groups small enough to move safely (often under 16 per knot) and stop the round
                if anyone looks uncomfortable.
              </li>
              <li>
                Debrief collaboration and communication, not speed or “winning,” so competitive
                pressure does not embarrass quieter participants.
              </li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>How to choose among games like the Human Knot</h2>
            <p>
              Pick by contact level first. If the group is comfortable with movement and light
              physical teamwork, the classic knot, Train Wreck, or Chainlink can create fast energy.
              If you want the same collaboration lesson with less contact, use Marshmallow Challenge,
              Telephone Charades, Line-Up, or Common Ground as Human Knot substitutes.
            </p>
            <h3>Debrief questions</h3>
            <ul>
              <li>Where did communication break down first?</li>
              <li>Who stepped into leadership, and how did the group respond?</li>
              <li>What would you do differently with one more minute?</li>
              <li>How does this show up in real team work?</li>
            </ul>
          </section>

          <section className={styles.guide}>
            <h2>FAQ about games like the Human Knot</h2>
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
              Keep exploring games like the Human Knot with{" "}
              <Link href="/">Ice Breaker Games home</Link>,{" "}
              <Link href="/games/human-knot">Human Knot rules</Link>,{" "}
              <Link href="/games-like-human-bingo">games like Human Bingo</Link>,{" "}
              <Link href="/games/never-have-i-ever">Never Have I Ever</Link>{" "}
              (games like cluster),{" "}
              <Link href="/icebreaker-games-for-teens">
                ice breaker games for teens
              </Link>
              ,{" "}
              <Link href="/icebreaker-games-for-youth-group">
                ice breaker games for youth group
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
