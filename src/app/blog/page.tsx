import { blogPosts } from "@/data/blog";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./blog.module.css";

const title = "Ice Breaker Games Blog (2026) | Tips, Guides & Printables";
const description =
  "Expert ice breaker games guides for meetings, classrooms, adults, and holidays—plus facilitation tips and printable Human Bingo cards you can use today.";
const canonical = "https://www.icebreakergames.site/blog";
const ogImage = "https://www.icebreakergames.site/img/blog-og.jpg";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ice breaker games blog",
    "icebreaker tips",
    "team building guides",
    "meeting icebreakers",
    "student icebreakers",
    "printable human bingo",
  ],
  alternates: { canonical },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical,
    siteName: "Ice Breaker Games",
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Ice Breaker Games blog — facilitators reviewing activity guides",
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

const clusterGuides = [
  {
    href: "/games",
    title: "Browse all ice breaker games",
    description:
      "Filter the full library by time, group size, type, and audience—then open step-by-step rules.",
  },
  {
    href: "/icebreaker-games-for-meetings",
    title: "Ice breaker games for meetings",
    description:
      "Workplace hub: quick openers for standups, workshops, and team meetings.",
  },
  {
    href: "/virtual-icebreaker-games",
    title: "Virtual ice breaker games",
    description:
      "Online hub: Zoom and Teams warm-ups, including short and riddle formats.",
  },
  {
    href: "/short-virtual-icebreakers",
    title: "Short virtual icebreakers",
    description: "5-minute virtual icebreakers that respect tight agendas.",
  },
  {
    href: "/games-like-human-bingo",
    title: "Games like Human Bingo",
    description:
      "Mingling and networking alternatives with rules and comparison tips.",
  },
  {
    href: "/icebreaker-games-for-youth-group",
    title: "Ice breaker games for youth group",
    description:
      "Age-appropriate openers for youth nights, retreats, and small groups.",
  },
];

const faqs = [
  {
    q: "What will I find on the Ice Breaker Games blog?",
    a: "Practical guides on choosing and facilitating ice breaker games—for meetings, classrooms, adult groups, holidays—plus printable resources like Human Bingo cards.",
  },
  {
    q: "Where can I browse games instead of reading a long guide?",
    a: "Use the games library to filter by time, group size, and type, then open full rules and facilitator tips for any activity.",
    linkHref: "/games",
    linkLabel: "Browse all ice breaker games",
  },
  {
    q: "What ice breaker games work best for meetings?",
    a: "Meeting-friendly games are low-pressure and time-boxed. Start with One Word Check-In, Weather Check-In, or This or That—then read our meetings hub for curated lists.",
    linkHref: "/icebreaker-games-for-meetings",
    linkLabel: "See ice breaker games for meetings",
  },
  {
    q: "Do you have printable icebreaker activities?",
    a: "Yes. Our Human Bingo for students printable includes ready-to-print cards for class, orientation, and first-day activities.",
    linkHref: "/blog/human-bingo-for-students-printable",
    linkLabel: "Download Human Bingo printables",
  },
  {
    q: "How do I run icebreakers without them feeling cheesy?",
    a: "Explain the purpose in one sentence, pick low-risk formats for new groups, keep time limits short, and always offer a pass option. Our facilitation tips guide covers framing and psychological safety.",
    linkHref: "/blog/tips-for-running-effective-icebreakers",
    linkLabel: "Read facilitation tips",
  },
];

function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Ice Breaker Games",
      url: "https://www.icebreakergames.site",
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ice Breaker Games blog articles",
    description,
    numberOfItems: sortedPosts.length,
    itemListElement: sortedPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `https://www.icebreakergames.site/blog/${post.slug}`,
    })),
  };

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
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src="/img/blog-hero.jpg"
            alt="Ice Breaker Games — facilitators reviewing icebreaker activity guides at a retreat table"
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
            <span>Blog</span>
          </nav>
          <p className={styles.brand}>Ice Breaker Games</p>
          <h1 className={styles.heroTitle}>Ice breaker games blog</h1>
          <p className={styles.heroLead}>
            Facilitation tips, classroom and meeting guides, and printables—so you
            can run the next opener with confidence.
          </p>
          <div className={styles.ctaRow}>
            <a href="#articles" className={styles.ctaPrimary}>
              Browse articles
            </a>
            <Link href="/games" className={styles.ctaGhost}>
              Try these games
            </Link>
            <Link
              href="/blog/human-bingo-for-students-printable"
              className={styles.ctaGhost}
            >
              Download printable
            </Link>
          </div>
        </div>
      </header>

      <section className={styles.snapshot} aria-label="What this blog covers">
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Best for</p>
          <p>
            Teachers, managers, and facilitators who want clear how-to advice—not
            vague “just have fun” tips—before they open a game.
          </p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Inside</p>
          <p>
            {sortedPosts.length} guides on meetings, students, adults, holidays,
            and facilitation—updated as we ship new blue-ocean lists.
          </p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Then explore</p>
          <p>
            Jump from any article into the games library or a curated hub for
            meetings, virtual calls, and similar-game lists.
          </p>
        </div>
      </section>

      <section
        id="articles"
        className={styles.articlesBand}
        aria-labelledby="articles-heading"
      >
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Guides &amp; printables</p>
          <h2 id="articles-heading">Latest ice breaker games articles</h2>
          <p>
            Deep-dive guides and classroom resources. Prefer a filtered library?
            Browse games by time and group size instead.
          </p>
        </div>

        <div className={styles.articleList}>
          {sortedPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.articleItem}
            >
              <span className={styles.articleIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className={styles.articleMeta}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={styles.metaTag}>
                      {tag}
                    </span>
                  ))}
                  <span className={styles.metaTag}>
                    {readingMinutes(post.content)} min read
                  </span>
                </div>
                <h3 className={styles.articleTitle}>{post.title}</h3>
                <p className={styles.articleDesc}>{post.excerpt}</p>
                <p className={styles.articleByline}>
                  {formatDate(post.date)} · {post.author}
                </p>
              </div>
              <span className={styles.articleLink}>Read article →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.guidesBand} aria-labelledby="guides-heading">
        <div className={styles.guidesInner}>
          <div className={styles.sectionHead}>
            <p className={styles.eyebrow}>Ready to play</p>
            <h2 id="guides-heading">Explore related games &amp; hubs</h2>
            <p>
              After you read a guide, open a curated list or the full library—these
              links keep you one click from rules you can run today.
            </p>
          </div>
          <div className={styles.guideList}>
            {clusterGuides.map((guide, index) => (
              <Link key={guide.href} href={guide.href} className={styles.guideItem}>
                <span className={styles.guideIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.guideTitle}>{guide.title}</h3>
                  <p className={styles.guideDesc}>{guide.description}</p>
                </div>
                <span className={styles.guideLink}>Open →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howtoBand} aria-labelledby="howto-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>How to use this blog</p>
          <h2 id="howto-heading">From article to activity in three steps</h2>
          <p>
            Treat each post as prep—then move into a game detail page or hub so
            your group actually plays something.
          </p>
        </div>
        <div className={styles.howtoSteps}>
          <div className={styles.howtoStep}>
            <span className={styles.howtoNum}>01</span>
            <h3>Match the occasion</h3>
            <p>
              Pick a student, meeting, adult, or holiday article that matches your
              next session—not a generic “fun games” dump.
            </p>
          </div>
          <div className={styles.howtoStep}>
            <span className={styles.howtoNum}>02</span>
            <h3>Open a playable game</h3>
            <p>
              Follow in-article links to `/games/[slug]` for materials, steps, and
              facilitator scripts you can read aloud.
            </p>
          </div>
          <div className={styles.howtoStep}>
            <span className={styles.howtoNum}>03</span>
            <h3>Compare a hub list</h3>
            <p>
              Use meetings, virtual, or games-like hubs when you need more options
              than one article can cover.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.faqBand} aria-labelledby="faq-heading">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2 id="faq-heading">Ice breaker games blog — common questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item) => (
            <div key={item.q} className={styles.faqItem}>
              <h3>{item.q}</h3>
              <p>
                {item.a}
                {"linkHref" in item && item.linkHref && item.linkLabel ? (
                  <>
                    {" "}
                    <Link href={item.linkHref}>{item.linkLabel}</Link>.
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
