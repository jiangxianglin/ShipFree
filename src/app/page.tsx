import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllGames } from "@/db/queries/games";
import { HomeFilterSection } from "@/components/home/HomeFilterSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import SessionLabCategories from "@/components/SessionLabCategories";
import styles from "./home.module.css";
import "./home-editorial.css";

export const revalidate = 86400;

const ogImage = "https://www.icebreakergames.site/img/home-hero.jpg";

export const metadata: Metadata = {
  title: "Icebreaker Games for Meetings, Work & Classrooms",
  description:
    "Find the right icebreaker game by setting, group size, time, and energy level. Browse free activities for meetings, work, virtual teams, and classrooms.",
  alternates: {
    canonical: "https://www.icebreakergames.site",
  },
  openGraph: {
    type: "website",
    url: "https://www.icebreakergames.site",
    title: "Icebreaker Games for Meetings, Work & Classrooms",
    description:
      "Find the right icebreaker game by setting, group size, time, and energy level. Browse free activities for meetings, work, virtual teams, and classrooms.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ice Breaker Games — facilitators running icebreaker activities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Icebreaker Games for Meetings, Work & Classrooms",
    description:
      "Find the right icebreaker game by setting, group size, time, and energy level. Browse free activities for meetings, work, virtual teams, and classrooms.",
    images: [ogImage],
  },
};

export default async function Home() {
  const allGames = await getAllGames();
  const featuredGames = allGames.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ice Breaker Games",
    url: "https://www.icebreakergames.site",
    description:
      "Find the right icebreaker game by setting, group size, time, and energy level. Browse free activities for meetings, work, virtual teams, and classrooms.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.icebreakergames.site/games?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const quickPaths = [
    {
      href: "/icebreaker-games-for-meetings",
      label: "Meetings",
      title: "Meeting icebreakers",
      description: "Quick openers for standups, workshops, retrospectives, and team meetings.",
    },
    {
      href: "/icebreaker-games-for-work",
      label: "Work",
      title: "Work icebreakers",
      description: "Professional activities for teams, trainings, onboarding, and team building.",
    },
    {
      href: "/virtual-icebreaker-games",
      label: "Virtual",
      title: "Virtual icebreakers",
      description: "Remote-friendly games for Zoom, Teams, hybrid calls, and distributed groups.",
    },
    {
      href: "/games",
      label: "Library",
      title: "Browse the library",
      description: "Filter all games by duration, group size, category, and facilitation needs.",
    },
  ];

  const popularGames = [
    {
      href: "/icebreaker-games-for-teens",
      title: "Ice breaker games for teens",
      description: "Age-appropriate openers for classrooms, clubs, and youth nights with safety notes.",
    },
    {
      href: "/icebreaker-games-for-small-groups",
      title: "Ice breaker games for small groups",
      description: "Facilitator-ready activities for circles of 4–12 in meetings, classes, and retreats.",
    },
    {
      href: "/games-like-human-bingo",
      title: "Games like Human Bingo",
      description: "Mingling and networking alternatives with rules, prompts, and comparison tips.",
    },
    {
      href: "/short-virtual-icebreakers",
      title: "Short virtual icebreakers",
      description: "5-minute Zoom warm-ups and short virtual icebreakers that respect the clock.",
    },
    {
      href: "/riddle-icebreakers-for-virtual-meetings",
      title: "Riddle icebreakers for virtual meetings",
      description: "Puzzle-style Zoom warm-ups with chat formats, guessing games, and facilitator tips.",
    },
    {
      href: "/icebreaker-games-for-youth-group",
      title: "Ice breaker games for youth group",
      description: "Age-appropriate openers for youth nights, retreats, and small groups.",
    },
  ];

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/img/home-hero.jpg"
            alt="Ice Breaker Games — diverse group laughing during a facilitator-led icebreaker"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.brand}>Ice Breaker Games</p>
          <h1 className={styles.heroTitle}>Icebreaker games for meetings, work & classrooms</h1>
          <p className={styles.heroLead}>
            Find free ice breaker games by setting, group size, and time—each with rules,
            materials, and facilitation tips you can run today.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/games" className={styles.ctaPrimary}>
              Browse all games
            </Link>
            <Link href="/icebreaker-games-for-meetings" className={styles.ctaGhost}>
              Meeting icebreakers
            </Link>
            <Link href="/games-like-human-bingo" className={styles.ctaGhost}>
              Games like Human Bingo
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.bodyBand} aria-labelledby="quick-start-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Plan by setting</p>
          <h2 id="quick-start-heading">Start with the situation you are planning for</h2>
          <p>Choose a path to match your audience, format, and time limit faster.</p>
        </div>
        <div className={styles.pathGrid}>
          {quickPaths.map((path) => (
            <Link key={path.href} href={path.href} className={styles.pathItem}>
              <p className={styles.pathLabel}>{path.label}</p>
              <h3 className={styles.pathTitle}>{path.title}</h3>
              <p className={styles.pathDesc}>{path.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.popularBand} aria-labelledby="popular-games-heading">
        <div className={styles.popularInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Most used guides</p>
            <h2 id="popular-games-heading">Popular Games</h2>
            <p>
              Start with the guides people use most—then open full rules and related alternatives.
            </p>
          </div>
          <div className={styles.popularList}>
            {popularGames.map((item, index) => (
              <Link key={item.href} href={item.href} className={styles.popularItem}>
                <span className={styles.popularIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.popularTitle}>{item.title}</h3>
                  <p className={styles.popularDesc}>{item.description}</p>
                </div>
                <span className={styles.popularLink}>Open guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ibg-story" aria-label="Outdoor team icebreaker">
        <div className="ibg-story__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/home-band-retreat.jpg"
            alt="Diverse team laughing outdoors during a retreat icebreaker"
            width={1800}
            height={1013}
          />
        </div>
        <div className="ibg-story__scrim" aria-hidden="true" />
        <div className="ibg-story__inner">
          <p className="ibg-story__eyebrow">Built for real rooms</p>
          <h2 className="ibg-story__title">Activities that feel natural—not forced</h2>
          <p className="ibg-story__lead">
            From retreat lawns to conference halls, every guide is written for facilitators who
            need clear steps, inclusive prompts, and a warm start.
          </p>
          <Link href="/best-icebreaker-games" className="ibg-story__cta">
            See best icebreaker games
          </Link>
        </div>
      </section>

      <HomeFilterSection games={allGames} />

      <section className={styles.statsBand} aria-label="Library snapshot">
        <div className={styles.statsInner}>
          <div>
            <div className={styles.statValue}>{allGames.length}+</div>
            <div className={styles.statLabel}>Ice breaker games</div>
          </div>
          <div>
            <div className={styles.statValueAccent}>6</div>
            <div className={styles.statLabel}>Occasion categories</div>
          </div>
          <div>
            <div className={styles.statValue}>100%</div>
            <div className={styles.statLabel}>Free to use</div>
          </div>
        </div>
      </section>

      <section className="ibg-occasions" aria-labelledby="occasions-heading">
        <div className="ibg-occasions__hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/home-band-meeting.jpg"
            alt="Facilitator leading a warm-up icebreaker in a sunlit meeting room"
            width={1800}
            height={771}
          />
        </div>
        <div className="ibg-occasions__intro">
          <p className="ibg-occasions__eyebrow">By occasion</p>
          <h2 id="occasions-heading">Ice breaker games for every occasion and group size</h2>
          <p>
            Finding the right activity matters. Our library of{" "}
            <strong>ice breaker games</strong> covers virtual meetings, team building,
            classrooms, training, conferences, and social events.
          </p>
          <p>
            Choose quick 5-minute energizers for tight agendas or longer exercises for deeper
            bonding—each with clear rules you can run today.
          </p>
        </div>
        <div className="ibg-occasions__grid">
          {[
            {
              name: "Team Building",
              href: "/games?category=Team%20Building",
              image: "/img/home-cat-team.jpg",
              description:
                "Strengthen collaboration and trust with specialized ice breaker games for teams.",
            },
            {
              name: "Virtual Meeting",
              href: "/virtual-icebreaker-games",
              image: "/img/home-cat-virtual.jpg",
              description:
                "Engage remote and hybrid groups with digital-friendly ice breaker games.",
            },
            {
              name: "Classroom",
              href: "/games?category=Classroom",
              image: "/img/home-cat-classroom.jpg",
              description:
                "Warm up students and create a welcoming learning environment.",
            },
            {
              name: "Training",
              href: "/games?category=Training",
              image: "/img/home-cat-training.jpg",
              description:
                "Energize workshops and onboarding sessions with active openers.",
            },
            {
              name: "Conference",
              href: "/games?category=Conference",
              image: "/img/home-cat-conference.jpg",
              description:
                "Help attendees network at large events with scalable mixers.",
            },
            {
              name: "Social Event",
              href: "/games?category=Social%20Event",
              image: "/img/home-cat-social.jpg",
              description:
                "Keep parties and gatherings lively with light, inclusive activities.",
            },
          ].map((category) => (
            <Link key={category.name} href={category.href} className="ibg-occasions__card">
              <span className="ibg-occasions__photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={category.image} alt="" width={900} height={675} />
              </span>
              <h3 className="ibg-occasions__name">{category.name}</h3>
              <p className="ibg-occasions__desc">{category.description}</p>
              <span className="ibg-occasions__more">Browse games →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contentShellAlt} aria-labelledby="scenario-heading">
        <div className={styles.contentInner}>
          <div className={styles.sectionHeadWide}>
            <p className={styles.eyebrow}>By scenario</p>
            <h2 id="scenario-heading">Choose ice breaker games by scenario</h2>
            <p>
              Eight practical scenario groups—pick a category to preview curated
              activities, then open the full library for filters and rules.
            </p>
          </div>
          <SessionLabCategories />
        </div>
      </section>

      <section id="featured" className={styles.contentShell} aria-labelledby="featured-heading">
        <div className={styles.sectionHeadWide}>
          <p className={styles.eyebrow}>From the library</p>
          <h2 id="featured-heading">Featured ice breaker games</h2>
        </div>
        <div className={styles.proseBlock}>
          <p>
            Start with proven <strong>ice breaker games</strong> facilitators return to often—clear
            steps, practical materials, and variations for different rooms.
          </p>
          <p>
            Each featured activity includes facilitation tips so beginners can run it without
            guesswork.
          </p>
        </div>
        <div className={styles.featuredList}>
          {featuredGames.map((game, index) => (
            <Link
              key={game.id}
              href={`/games/${game.slug}`}
              className={styles.featuredItem}
            >
              <span className={styles.popularIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={styles.popularTitle}>{game.title}</h3>
                <p className={styles.popularDesc}>
                  {game.description.length > 140
                    ? `${game.description.slice(0, 140).trim()}…`
                    : game.description}
                </p>
                <div className={styles.featuredMeta}>
                  {game.players ? <span className={styles.metaChip}>{game.players}</span> : null}
                  {game.duration ? <span className={styles.metaChip}>{game.duration}</span> : null}
                  {game.difficulty ? (
                    <span className={styles.metaChip}>{game.difficulty}</span>
                  ) : null}
                </div>
              </div>
              <span className={styles.popularLink}>Open game →</span>
            </Link>
          ))}
        </div>
        <div className={styles.featuredCtaWrap}>
          <Link href="/games" className={styles.ctaPrimary}>
            View all {allGames.length} games
          </Link>
        </div>
      </section>

      <section className={styles.contentShellAlt} aria-labelledby="how-heading">
        <div className={styles.contentInner}>
          <div className={styles.sectionHeadWide}>
            <p className={styles.eyebrow}>How it works</p>
            <h2 id="how-heading">How to run ice breaker games successfully</h2>
          </div>
          <div className={styles.proseBlock}>
            <p>
              Integrating <strong>ice breaker games</strong> into meetings and events is
              straightforward when you match the activity to your group, time, and setting.
            </p>
            <p>
              Every game includes objectives, materials, and facilitation tips—so teachers, managers,
              and facilitators can pick up and run.
            </p>
          </div>
          <div className={styles.stepsList}>
            {[
              {
                title: "Browse games",
                desc: (
                  <>
                    Explore <strong>ice breaker games</strong> by category, difficulty, group size,
                    and duration. Use filters to match your agenda.
                  </>
                ),
              },
              {
                title: "Choose your game",
                desc: (
                  <>
                    Pick based on group size, available time, and in-person or virtual setting. Read
                    the rules before you facilitate.
                  </>
                ),
              },
              {
                title: "Play and connect",
                desc: (
                  <>
                    Follow the steps, keep psychological safety in mind, and let the group connect
                    through the activity.
                  </>
                ),
              },
            ].map((step, index) => (
              <div key={step.title} className={styles.stepItem}>
                <span className={styles.popularIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contentShell} aria-labelledby="benefits-heading">
        <div className={styles.benefitsLayout}>
          <div className={styles.benefitsPhoto}>
            <Image
              src="/img/home-band-group.jpg"
              alt="Young adults laughing together during a community icebreaker circle"
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
            />
          </div>
          <div>
            <div className={styles.sectionHeadWide}>
              <p className={styles.eyebrow}>Why it works</p>
              <h2 id="benefits-heading">Benefits of ice breaker games</h2>
            </div>
            <div className={styles.proseBlock}>
              <p>
                <strong>Ice breaker games</strong> go beyond introductions. They turn awkward silence
                into structured conversation and help people feel safe enough to participate.
              </p>
              <p>
                Groups that open with a short activity often show higher participation and clearer
                collaboration—especially in remote or hybrid rooms.
              </p>
            </div>
            <div className={styles.benefitGrid}>
              {[
                {
                  label: "Connect",
                  title: "Build connections",
                  desc: (
                    <>
                      Help people get to know each other through structured{" "}
                      <strong>ice breaker games</strong>.
                    </>
                  ),
                },
                {
                  label: "Energy",
                  title: "Boost energy",
                  desc: <>Wake up the room with active openers before the real agenda begins.</>,
                },
                {
                  label: "Voice",
                  title: "Encourage communication",
                  desc: (
                    <>Lower barriers so quieter participants feel comfortable contributing.</>
                  ),
                },
                {
                  label: "Tone",
                  title: "Set the tone",
                  desc: <>Create an inclusive start that supports the rest of the session.</>,
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className={styles.benefitLabel}>{item.label}</p>
                  <h3 className={styles.benefitTitle}>{item.title}</h3>
                  <p className={styles.benefitDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentShellAlt} aria-labelledby="tips-heading">
        <div className={styles.contentInner}>
          <div className={styles.sectionHeadWide}>
            <p className={styles.eyebrow}>Facilitation</p>
            <h2 id="tips-heading">Facilitator tips for ice breaker games</h2>
            <p>Six practical habits that keep activities inclusive, energetic, and on time.</p>
          </div>
          <div className={styles.tipsList}>
            {[
              {
                title: "Know your audience",
                desc: (
                  <>
                    Match <strong>ice breaker games</strong> to group size, familiarity, and
                    professional context—what works for students may not fit executives.
                  </>
                ),
              },
              {
                title: "Explain the why",
                desc: (
                  <>
                    Share the purpose before you start so people engage with intention, not
                    awkwardness.
                  </>
                ),
              },
              {
                title: "Bring steady energy",
                desc: (
                  <>
                    Your tone sets the room. Enthusiasm (without pressure) invites participation.
                  </>
                ),
              },
              {
                title: "Participate when it helps",
                desc: (
                  <>
                    Joining can flatten hierarchy—but some games work better when you facilitate from
                    the side.
                  </>
                ),
              },
              {
                title: "Adapt on the fly",
                desc: (
                  <>
                    Shorten rounds, change prompts, or offer opt-outs if the energy shifts.
                  </>
                ),
              },
              {
                title: "Watch the clock",
                desc: (
                  <>
                    Keep openers crisp. A focused 5–15 minutes beats a game that overstays.
                  </>
                ),
              },
            ].map((tip, index) => (
              <div key={tip.title} className={styles.tipItem}>
                <span className={styles.popularIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.tipTitle}>{tip.title}</h3>
                  <p className={styles.tipDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contentShell} aria-labelledby="faq-heading">
        <div className={styles.sectionHeadWide}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-heading">Frequently asked questions about ice breaker games</h2>
        </div>
        <div className={styles.faqList}>
          {[
            {
              q: "What are the best ice breaker games for large groups?",
              a: (
                <>
                  Prefer mixers and small-subgroup formats.{" "}
                  <Link href="/games/human-bingo">Human Bingo</Link> and tournament-style games scale
                  well and keep energy high.
                </>
              ),
            },
            {
              q: "Can ice breaker games be played virtually?",
              a: (
                <>
                  Yes. See our{" "}
                  <Link href="/virtual-icebreaker-games">virtual icebreaker games</Link> for Zoom,
                  Teams, and hybrid calls.
                </>
              ),
            },
            {
              q: "How long should ice breaker games last?",
              a: (
                <>
                  Most agendas fit 5–15 minutes. We also list longer{" "}
                  <strong>ice breaker games</strong> when you have a workshop block.
                </>
              ),
            },
            {
              q: "Do I need equipment for ice breaker games?",
              a: (
                <>
                  Many need none. Others use pen and paper or simple props—each page lists materials
                  clearly.
                </>
              ),
            },
            {
              q: "Are ice breaker games suitable for professional settings?",
              a: (
                <>
                  Yes—when you choose respectful, inclusive prompts. Start with{" "}
                  <Link href="/icebreaker-games-for-meetings">meeting icebreakers</Link> or{" "}
                  <Link href="/icebreaker-games-for-work">work icebreakers</Link>.
                </>
              ),
            },
          ].map((item) => (
            <div key={item.q} className={styles.faqItem}>
              <h3 className={styles.faqQ}>{item.q}</h3>
              <p className={styles.faqA}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <TestimonialsSection />

      <section className={styles.closingCta}>
        <div className={styles.closingInner}>
          <h2>Ready for your next icebreaker?</h2>
          <p>
            Browse free ice breaker games with clear rules, materials, and facilitation tips—then
            pick one that fits your meeting, classroom, or team.
          </p>
          <Link href="/games" className={styles.ctaPrimary}>
            Browse all games
          </Link>
        </div>
      </section>
    </div>
  );
}
