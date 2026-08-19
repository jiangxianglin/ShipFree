import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/types/game";
import { EditorialGameActions } from "./EditorialGameActions";
import styles from "./game-detail-editorial.module.css";

const HERO_SRC = "/img/games/portrait-gallery-hero.jpg";
const HERO_ALT =
  "Portrait Gallery icebreaker — diverse adults sketching quick portraits of each other at a sunlit workshop table";
const BAND_ROTATE_SRC = "/img/icebreaker-games-for-small-groups-hero.jpg";
const BAND_ROTATE_ALT =
  "Small group rotating through a creative icebreaker in a bright meeting space";
const BAND_WORK_SRC = "/img/icebreaker-games-for-meetings-hero.jpg";
const BAND_WORK_ALT =
  "Professionals laughing during a creative team meeting icebreaker";

export const portraitGalleryFaqs = [
  {
    q: "What is a portrait game?",
    a: "A portrait game is a creative icebreaker where people draw quick sketches of each other—often in short timed rounds—then display the results as a group “gallery.” Portrait Gallery is the classic timed, rotating version used in workshops, classrooms, and team offsites.",
  },
  {
    q: "What are some icebreaker games that use pictures?",
    a: "Picture-based icebreakers include Portrait Gallery, Picture Sharing, Emoji Introduction, Human Bingo with visual prompts, and Find Your Match with illustrated cards. They work well when you want energy without long introductions.",
  },
  {
    q: "What are some fun ice breaker activities for an art class?",
    a: "Portrait Gallery, Blind Portraits, Pass the Portrait, and a short gallery walk all fit art class openers. Keep rounds to 10–15 seconds so skill level does not matter and everyone finishes with a playful display.",
  },
  {
    q: "What is a good icebreaker drawing game?",
    a: "Portrait Gallery is one of the best drawing icebreakers for mixed skill levels: subjects stay still, artists rotate every 10–15 seconds, and the final collage is intentionally imperfect and funny.",
  },
  {
    q: "Can you play Portrait Gallery online or virtually?",
    a: "Yes. Use breakout rooms with one subject and several artists, or have everyone draw a partner from gallery view on paper at home. Share photos of sketches in chat, then run a virtual gallery walk by screensharing a few favorites.",
  },
  {
    q: "How many people and how long does Portrait Gallery take?",
    a: "Plan for about 6–30 people and 10–15 minutes. Smaller groups (6–12) finish faster; larger groups need more paper and a clearer rotate call so the room stays calm.",
  },
  {
    q: "Is Portrait Gallery related to HireVue's Portrait game?",
    a: "No. HireVue’s Portrait game is an AI interview assessment tool. Portrait Gallery here is an in-person (or virtual) icebreaker drawing activity for meetings, classrooms, and team building—not a hiring test.",
  },
];

type Props = {
  game: Game;
};

export function PortraitGalleryDetail({ game }: Props) {
  const materialsText =
    game.materials ||
    "Paper (one sheet per subject), pencils or pens, a timer or phone, optional tape or clips for the gallery wall";

  const materialsList = materialsText
    .split("\n")
    .flatMap((line) => line.split(","))
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image src={HERO_SRC} alt={HERO_ALT} fill priority sizes="100vw" />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/games">Games</Link>
            <span>/</span>
            <span>Portrait Gallery</span>
          </nav>
          <p className={styles.brand}>Ice Breaker Games</p>
          <h1 className={styles.heroTitle}>Portrait Gallery Icebreaker Game</h1>
          <p className={styles.heroLead}>
            How to play step-by-step: subjects and artists, 10–15 second rotate rounds, gallery walk
            reveal, plus work and virtual variations.
          </p>
          <div className={styles.ctaRow}>
            <a href="#how-to-play" className={styles.ctaPrimary}>
              How to play
            </a>
            <Link href="/icebreaker-games-for-small-groups" className={styles.ctaGhost}>
              Small group icebreakers
            </Link>
            <Link href="/icebreaker-games-for-meetings" className={styles.ctaGhost}>
              Meeting icebreakers
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <section className={styles.snapshot} aria-label="At a glance">
          <div className={styles.snapshotItem}>
            <p className={styles.snapshotLabel}>Best for</p>
            <p>
              Workshops, kickoffs, art classes, team offsites, and any group that needs a creative
              opener without long introductions.
            </p>
          </div>
          <div className={styles.snapshotItem}>
            <p className={styles.snapshotLabel}>Players / Time</p>
            <p>
              {game.players || "6–30"} players · {game.duration || "10–15 min"}. Keep each drawing
              interval at 10–15 seconds.
            </p>
          </div>
          <div className={styles.snapshotItem}>
            <p className={styles.snapshotLabel}>Avoid when</p>
            <p>
              Someone has signaled discomfort with being looked at or drawn, the room has no writing
              surface, or you only have five minutes and no materials.
            </p>
          </div>
        </section>

        <div className={styles.metaRow}>
          {(game.players || "6–30 people") && (
            <span className={styles.meta}>{game.players || "6–30 people"}</span>
          )}
          {(game.duration || "10–15 minutes") && (
            <span className={styles.meta}>{game.duration || "10–15 minutes"}</span>
          )}
          {(game.difficulty || "Easy") && (
            <span className={styles.meta}>{game.difficulty || "Easy"}</span>
          )}
          {(game.category || "Team Building") && (
            <span className={styles.meta}>{game.category || "Team Building"}</span>
          )}
        </div>

        <EditorialGameActions
          title={game.title}
          players={game.players || "6–30 people"}
          duration={game.duration || "10–15 minutes"}
          materials={materialsText}
          steps={
            game.steps ||
            "Step 1: Split into subjects and artists (inner/outer circle works well)\nStep 2: Artists draw for 10–15 seconds\nStep 3: Call “Rotate!” and switch artists\nStep 4: Finish with a gallery walk reveal"
          }
          relatedHref="/icebreaker-games-for-small-groups"
          relatedLabel="Small group icebreakers"
        />

        <section className={styles.guide}>
          <h2>What is a Portrait Gallery?</h2>
          <p>
            {game.description ||
              "Portrait Gallery is a creative icebreaker where teams create quick portraits of each other by rotating artists every 10–15 seconds. The result is a set of wonderfully varied (and often messy) images you can display once the round ends."}
          </p>
          <p>
            Unlike a quiet “draw your neighbor” exercise, Portrait Gallery is designed as a{" "}
            <strong>portrait gallery icebreaker game</strong>: short timed bursts, clear roles
            (subjects and artists), a loud rotate cue, and a gallery walk at the end. Drawing skill
            does not matter—speed and laughter do. That is why it works for adults at work as well as
            teens in class.
          </p>
          <h3>Why play it?</h3>
          <p>
            It gets people moving and looking at each other without forcing personal stories. Quiet
            participants can contribute as artists. The gallery wall becomes a shared artifact you can
            reference for the rest of the day. Compared with talking-only openers, this drawing
            icebreaker lowers pressure while still creating memorable moments.
          </p>
        </section>

        <section className={styles.safety}>
          <h2>Facilitator notes &amp; safety</h2>
          <ul>
            <li>Make participation optional—offer a “sitter” role for anyone who does not want to be drawn</li>
            <li>Ban commentary on appearance; celebrate playful lines, not “accuracy”</li>
            <li>Use soft pencils and plenty of paper so mistakes feel cheap</li>
            <li>Keep intervals short (10–15 seconds) so perfectionism never starts</li>
            <li>For mixed-ability groups, say out loud: “Ugly drawings are the goal”</li>
          </ul>
        </section>

        <section className={styles.storyBand} aria-label="Rotate rounds">
          <div className={styles.storyMedia}>
            <Image src={BAND_ROTATE_SRC} alt={BAND_ROTATE_ALT} fill sizes="100vw" />
          </div>
          <div className={styles.storyScrim} aria-hidden="true" />
          <div className={styles.storyInner}>
            <p className={styles.storyEyebrow}>In the room</p>
            <h2 className={styles.storyTitle}>Draw, rotate, repeat</h2>
            <p className={styles.storyLead}>
              Call “Rotate!” on the timer. Artists move; subjects stay still. The collage builds
              itself.
            </p>
          </div>
        </section>

        <section className={styles.guide} id="how-to-play">
          <h2>How to play Portrait Gallery (step-by-step instructions)</h2>
          <p>
            Use this facilitator flow for an in-person group. Adjust the number of rotate rounds to
            fit your clock—most rooms need 6–10 short intervals plus a two-minute gallery walk.
          </p>

          <h3>1. Split into subjects and artists</h3>
          <p>
            Divide the group into Team A (subjects) and Team B (artists). A classic setup is an{" "}
            <strong>inner circle</strong> of subjects facing out and an <strong>outer circle</strong>{" "}
            of artists facing in—each artist starts opposite one subject. If chairs make circles hard,
            seat subjects along a table and have artists stand opposite them. Subjects should sit
            still and look roughly toward their current artist; artists hold paper and a pencil ready.
          </p>

          <h3>2. What you&apos;ll need</h3>
          <ul>
            {materialsList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            One sheet per subject is enough if artists rotate and keep adding to the same portrait.
            For cleaner results, give each artist a fresh sheet per subject and collate them later.
            Tape or binder clips help when you hang the gallery on a wall or whiteboard.
          </p>

          <h3>3. Draw, rotate, repeat (10–15 second intervals)</h3>
          <ol>
            <li>Start the timer for 10–15 seconds and say “Draw!”</li>
            <li>Artists sketch quickly—eyes, hair, smile, posture, whatever they notice first.</li>
            <li>
              When the timer ends, call <strong>“Rotate!”</strong> Artists move one seat (or one
              person) clockwise. Subjects stay put.
            </li>
            <li>
              Repeat until every artist has contributed to every subject, or until you hit your time
              box (usually 6–10 rounds).
            </li>
          </ol>
          <p>
            The rotate call is the heartbeat of the activity. Keep it consistent. If the room gets
            chaotic, freeze, reset positions, and restart the next interval. Remind people that
            unfinished lines are part of the charm.
          </p>

          <h3>4. The gallery walk reveal</h3>
          <p>
            Collect the portraits (or leave them on tables) and invite the group to stroll. Ask
            subjects to find “their” collage and notice which features different artists caught.
            Optional: each subject picks one detail they love and thanks the anonymous artists. End by
            hanging a few favorites where the group will see them during the rest of the session.
          </p>
        </section>

        <section className={styles.scriptBand}>
          <h2>Facilitator script</h2>
          <p>
            “We’re going to make a Portrait Gallery. Half of you are subjects—sit still and smile if
            you want. Half of you are artists—you get 15 seconds to sketch, then I will shout Rotate
            and you move to the next person. Ugly drawings win. When we finish, we’ll hang them and
            take a two-minute gallery walk. Ready? Draw!”
          </p>
        </section>

        <section className={styles.guide}>
          <h2>Portrait Gallery variations</h2>
          <p>
            Once the core rotate loop works, swap one rule to match your audience. These variations
            cover the most common search intents around portrait gallery activities.
          </p>

          <h3>Blind portraits</h3>
          <p>
            Artists draw without looking at the paper—eyes stay on the subject. Lines get wilder and
            the gallery becomes comedy gold. Great for energy after lunch or for groups that claim
            they “can’t draw.”
          </p>

          <h3>Pass the portrait (kids / simplified)</h3>
          <p>
            Everyone draws at once for 15 seconds, then passes the paper to the right. No standing
            circles required. Use this with elementary groups or tight classroom rows where an outer
            circle will not fit.
          </p>

          <h3>Virtual Portrait Gallery (online meetings)</h3>
          <p>
            Put one subject on camera in a breakout room; others draw from gallery view on paper or a
            tablet. After two minutes, screenshot or photo-upload sketches into chat. For larger Zoom
            groups, run two rounds of subjects, then screenshare a mosaic. Pair with other{" "}
            <Link href="/virtual-icebreaker-games">virtual ice breaker games</Link> if you need a
            full remote warm-up agenda.
          </p>
        </section>

        <section className={styles.storyBand} aria-label="Work and team building">
          <div className={styles.storyMedia}>
            <Image src={BAND_WORK_SRC} alt={BAND_WORK_ALT} fill sizes="100vw" />
          </div>
          <div className={styles.storyScrim} aria-hidden="true" />
          <div className={styles.storyInner}>
            <p className={styles.storyEyebrow}>Work &amp; adults</p>
            <h2 className={styles.storyTitle}>Drawing icebreakers for teams</h2>
            <p className={styles.storyLead}>
              Keep it professional: no commentary on looks, optional opt-out, and a clear rotate cue.
            </p>
          </div>
        </section>

        <section className={styles.guide}>
          <h2>Portrait Gallery for adults, work &amp; team building</h2>
          <p>
            For corporate kickoffs and offsites, frame Portrait Gallery as a{" "}
            <strong>drawing icebreaker for adults</strong>, not an art contest. Say up front that
            stick figures are welcome. Use it when you want movement after a long slide deck, or when
            a new cross-functional team needs a shared laugh before strategy work.
          </p>
          <p>
            Pair it with other creative openers from our{" "}
            <Link href="/icebreaker-games-for-meetings">ice breaker games for meetings</Link> hub, or
            follow with a talking game such as{" "}
            <Link href="/games/emoji-introduction">Emoji Introduction</Link> or{" "}
            <Link href="/games/the-name-game">The Name Game</Link> so people connect faces to names.
            For groups of 4–12, see{" "}
            <Link href="/icebreaker-games-for-small-groups">
              ice breaker games for small groups
            </Link>
            .
          </p>
        </section>

        <section className={styles.guide}>
          <h2>Portrait Gallery rules &amp; timing</h2>
          <ul>
            <li>
              <strong>Players:</strong> 6–30 works best; under 6, use Pass the Portrait instead
            </li>
            <li>
              <strong>Time:</strong> 10–15 minutes including setup and gallery walk
            </li>
            <li>
              <strong>Interval:</strong> 10–15 seconds per drawing burst (extend to 20 only if the
              room is very calm)
            </li>
            <li>
              <strong>Materials:</strong> paper, pencils/pens, timer; optional tape for display
            </li>
            <li>
              <strong>Roles:</strong> subjects stay still; artists rotate on the facilitator’s call
            </li>
            <li>
              <strong>Close:</strong> two-minute gallery walk, then move into your agenda
            </li>
          </ul>
          <h3>Debrief questions (optional, 2 minutes)</h3>
          <ul>
            <li>What feature did artists notice first?</li>
            <li>Where did the “Rotate!” call help or hurt the room’s focus?</li>
            <li>How is collaborating on a messy sketch like collaborating on a real project?</li>
          </ul>
        </section>

        <section className={styles.faq} aria-labelledby="pg-faq">
          <h2 id="pg-faq">Frequently asked questions</h2>
          {portraitGalleryFaqs.map((item) => (
            <details key={item.q} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>Related games &amp; guides</h2>
          <p>
            Keep the creative energy going with picture-based and get-to-know activities from the same
            cluster.
          </p>
          <ul className={styles.relatedList}>
            <li>
              <Link href="/games/emoji-introduction">
                Emoji Introduction
                <span>Low-pressure emoji icebreaker for meetings and classrooms</span>
              </Link>
            </li>
            <li>
              <Link href="/games/picture-sharing">
                Picture Sharing
                <span>Share a photo and the story behind it</span>
              </Link>
            </li>
            <li>
              <Link href="/games/the-name-game">
                The Name Game
                <span>Learn names quickly after the gallery walk</span>
              </Link>
            </li>
            <li>
              <Link href="/games/find-your-match">
                Find Your Match
                <span>Pairing icebreaker with famous pairs</span>
              </Link>
            </li>
            <li>
              <Link href="/icebreaker-games-for-small-groups">
                Ice breaker games for small groups
                <span>Hub for 4–12 person creative openers</span>
              </Link>
            </li>
            <li>
              <Link href="/virtual-icebreaker-games">
                Virtual ice breaker games
                <span>Remote-friendly warm-ups including drawing variants</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
