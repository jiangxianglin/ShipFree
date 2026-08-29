import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/types/game";
import type { RelatedGameItem } from "@/lib/games/related";
import { EditorialGameActions } from "./EditorialGameActions";
import { RelatedGames } from "./RelatedGames";
import styles from "./game-detail-editorial.module.css";

const HERO_SRC = "/img/games-like-two-truths-and-a-lie-hero.jpg";
const HERO_ALT =
  "Two Truths and a Lie icebreaker — diverse adults laughing during a storytelling circle";
const BAND_PLAY_SRC = "/img/icebreaker-games-for-small-groups-hero.jpg";
const BAND_PLAY_ALT =
  "Small group playing a get-to-know-you icebreaker in a bright meeting space";
const BAND_CLASSROOM_SRC = "/img/icebreaker-games-for-high-school-students-hero.jpg";
const BAND_CLASSROOM_ALT =
  "High school students laughing in a classroom icebreaker circle";

const faqs = [
  {
    q: "How do you play Two Truths and a Lie?",
    a: "Each person shares three statements about themselves: two true and one false. The group asks a few follow-up questions, then votes on which statement is the lie. Reveal the answer and move to the next person.",
  },
  {
    q: "How many people can play Two Truths and a Lie?",
    a: "It works best with about 5–40 people. For large groups, split into breakout rooms or limit follow-up questions to keep the pace moving.",
  },
  {
    q: "How long does Two Truths and a Lie take?",
    a: "Most groups finish in 8–15 minutes. A simple rule is 1–2 minutes per person for sharing, questions, and guessing.",
  },
  {
    q: "What are good Two Truths and a Lie examples?",
    a: 'Good statements are believable but interesting. Example set: "I have lived in three countries" (truth), "I can juggle" (truth), "I once met a celebrity" (lie). Avoid anything too personal for work or school settings.',
  },
  {
    q: "How do you run Two Truths and a Lie for virtual meetings?",
    a: "Have each person post their three statements in chat, then let others ask one or two questions before voting with reactions or a quick poll. Use breakout rooms for groups larger than 12–15.",
  },
];

type Props = {
  game: Game;
  relatedGames?: RelatedGameItem[];
};

export function TwoTruthsAndALieDetail({ game, relatedGames = [] }: Props) {
  const stepsList = game.steps ? game.steps.split("\n").filter(Boolean) : [];
  const materialsList = game.materials
    ? game.materials.split("\n").filter(Boolean)
    : [];

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={HERO_SRC}
            alt={HERO_ALT}
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
            <span>Two Truths and a Lie</span>
          </nav>
          <p className={styles.brand}>Ice Breaker Games</p>
          <h1 className={styles.heroTitle}>Two Truths and a Lie</h1>
          <p className={styles.heroLead}>
            Classic get-to-know-you icebreaker with rules, examples, and facilitator tips for
            teams, classrooms, and meetings.
          </p>
          <div className={styles.ctaRow}>
            <a href="#how-to-play" className={styles.ctaPrimary}>
              How to play
            </a>
            <Link href="/games-like-two-truths-and-a-lie" className={styles.ctaGhost}>
              Games like Two Truths
            </Link>
            <Link
              href="/icebreaker-games-for-high-school-students"
              className={styles.ctaGhost}
            >
              High school icebreakers
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.snapshot} aria-label="At a glance">
          <div className={styles.snapshotItem}>
            <p className={styles.snapshotLabel}>Best for</p>
            <p>
              New teams, first-week classes, advisory, kickoffs, and any group that needs a low-prep
              storytelling opener.
            </p>
          </div>
          <div className={styles.snapshotItem}>
            <p className={styles.snapshotLabel}>Players / Time</p>
            <p>
              {game.players || "5–40"} players · {game.duration || "8–15 min"}. Limit questions so
              each turn stays under two minutes.
            </p>
          </div>
          <div className={styles.snapshotItem}>
            <p className={styles.snapshotLabel}>Avoid when</p>
            <p>
              Trust is fragile, the agenda is under five minutes, or people have already signaled
              discomfort with personal questions.
            </p>
          </div>
        </section>

        <div className={styles.metaRow}>
          {game.players && <span className={styles.meta}>{game.players} players</span>}
          {game.duration && <span className={styles.meta}>{game.duration}</span>}
          {game.difficulty && <span className={styles.meta}>{game.difficulty}</span>}
          {game.category && <span className={styles.meta}>{game.category}</span>}
        </div>

        <EditorialGameActions
          title={game.title}
          players={game.players}
          duration={game.duration}
          materials={game.materials}
          steps={game.steps}
        />

        <section className={styles.guide}>
          <h2>What is Two Truths and a Lie?</h2>
          <p>
            {game.description ||
              "Two Truths and a Lie is a classic get-to-know-you icebreaker. Each person shares three statements about themselves—two true and one false—and the group guesses which is the lie."}
          </p>
          <h3>Why play it?</h3>
          <p>
            It works well for teams, classrooms, and workshops because it is simple, fun, and
            naturally creates follow-up conversation. People reveal surprising facts without a long
            monologue, and quieter participants can join by guessing before they share.
          </p>
        </section>

        <section className={styles.safety}>
          <h2>Facilitator tips</h2>
          <ul>
            <li>Keep statements safe for work or school, and make sharing optional</li>
            <li>Limit questions to 1–2 per person to keep the pace</li>
            <li>Use breakout rooms for large groups</li>
            <li>Ask people to make the lie believable, not extreme</li>
            <li>Model one fun, low-stakes example before the first volunteer</li>
          </ul>
        </section>

        <section className={styles.storyBand} aria-label="Playing the game">
          <div className={styles.storyMedia}>
            <Image src={BAND_PLAY_SRC} alt={BAND_PLAY_ALT} fill sizes="100vw" />
          </div>
          <div className={styles.storyScrim} aria-hidden="true" />
          <div className={styles.storyInner}>
            <p className={styles.storyEyebrow}>In the room</p>
            <h2 className={styles.storyTitle}>Share, guess, reveal</h2>
            <p className={styles.storyLead}>
              Celebrate creative stories more than “gotchas.” The goal is connection, not catching
              people out.
            </p>
          </div>
        </section>

        <section className={styles.guide} id="how-to-play">
          <h2>How to play</h2>
          {stepsList.length > 0 ? (
            <ol>
              {stepsList.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : (
            <ol>
              <li>Each person prepares two true statements and one false statement.</li>
              <li>Share all three in any order; the group guesses the lie.</li>
              <li>Reveal quickly and celebrate creative stories more than “gotchas.”</li>
              <li>Rotate so several people get a turn without dragging the agenda.</li>
            </ol>
          )}

          {materialsList.length > 0 && (
            <>
              <h3>Materials</h3>
              <ul>
                {materialsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className={styles.scriptBand}>
          <h2>Facilitator script</h2>
          <p>
            “Think of two true things about yourself and one believable lie. Share all three in any
            order. We’ll ask one or two questions, then vote on the lie. Keep it light—hobbies,
            travel, food, and weekend stories work great.”
          </p>
        </section>

        <section className={styles.guide}>
          <h2>Example statements</h2>
          <ul>
            <li>“I have lived in three countries.” / “I can juggle.” / “I once met a celebrity.”</li>
            <li>“I speak two languages.” / “I have never broken a bone.” / “I ran a half marathon.”</li>
            <li>“I play an instrument.” / “I hate coffee.” / “I once slept through a flight.”</li>
          </ul>
          <h3>Tips for success</h3>
          <ul>
            <li>Create a welcoming tone so people feel comfortable passing if they prefer</li>
            <li>Explain the rules clearly and model one example first</li>
            <li>Adapt pace to energy—fewer turns for short periods</li>
            <li>Close with a one-line theme (“lots of travelers and bakers today”) before the agenda</li>
          </ul>
        </section>

        <section className={styles.storyBand} aria-label="Classroom and school use">
          <div className={styles.storyMedia}>
            <Image
              src={BAND_CLASSROOM_SRC}
              alt={BAND_CLASSROOM_ALT}
              fill
              sizes="100vw"
            />
          </div>
          <div className={styles.storyScrim} aria-hidden="true" />
          <div className={styles.storyInner}>
            <p className={styles.storyEyebrow}>Schools &amp; teens</p>
            <h2 className={styles.storyTitle}>Classroom-safe prompts</h2>
            <p className={styles.storyLead}>
              Stick to hobbies, sports, food, and weekend plans. Ban dating, money, and
              family-conflict prompts in school settings.
            </p>
          </div>
        </section>

        <section className={styles.faq} aria-labelledby="ttl-faq">
          <h2 id="ttl-faq">Frequently asked questions</h2>
          {faqs.map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <>
          <RelatedGames
            items={relatedGames}
            heading="More games like Two Truths and a Lie"
            intro="Looking for alternatives or classroom-safe storytelling icebreakers? Continue with these games and guides."
            browseHref="/games-like-two-truths-and-a-lie"
            browseLabel="Browse all games like Two Truths and a Lie"
          />
          <section className={styles.related} aria-label="Related guides">
            <ul className={styles.relatedList}>
              <li>
                <Link href="/games-like-two-truths-and-a-lie">
                  Games like Two Truths and a Lie
                  <span>12 get-to-know substitutes with rules and variations</span>
                </Link>
              </li>
              <li>
                <Link href="/blog/two-truths-and-a-lie-for-students-printable">
                  Two Truths printable for students
                  <span>Classroom worksheets + school-safe prompt banks</span>
                </Link>
              </li>
              <li>
                <Link href="/icebreaker-games-for-high-school-students">
                  Ice breaker games for high school students
                  <span>14 classroom-safe openers with safety notes</span>
                </Link>
              </li>
              <li>
                <Link href="/icebreaker-games-for-teens">
                  Ice breaker games for teens
                  <span>Club and classroom openers for teen groups</span>
                </Link>
              </li>
              <li>
                <Link href="/virtual-icebreaker-games">
                  Virtual ice breaker games
                  <span>Zoom and Teams hub with chat-first warm-ups</span>
                </Link>
              </li>
            </ul>
          </section>
        </>
      </div>
    </div>
  );
}
