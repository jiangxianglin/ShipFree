import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

const SLUG = "ice-breaker-games-for-adults";
const title = "Ice Breaker Games for Adults for Work, Teams & Parties";
const description =
  "Discover ice breaker games for adults for work, team building, parties, and online meetings, with quick picks by group size and setting.";
const imageUrl =
  "https://www.icebreakergames.site/img/blog/icebreaker-games-for-adults-online-vs-inperson.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === SLUG);

  if (!post) {
    return {
      title,
      description,
    };
  }

  const url = `https://www.icebreakergames.site/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url,
      siteName: "Ice Breaker Games",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Ice breaker games for adults in online and in-person real groups",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function AdultsIcebreakersPage() {
  const post = blogPosts.find((p) => p.slug === SLUG);

  if (!post) {
    return null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a good icebreaker for shy adults?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shy adults usually prefer predictable, low-pressure ice breaker games. Start with The Check-In, Six Word Memoirs, or Ten Things in Common. These formats give everyone structure and choice without putting anyone on the spot.",
        },
      },
      {
        "@type": "Question",
        name: "How do I choose the right icebreaker for my group?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Look at four things: group size, how well people know each other, energy level, and time. Pick ice breaker games for adults that are easy to explain, match your space, and support the purpose of your meeting.",
        },
      },
      {
        "@type": "Question",
        name: "What are some quick icebreakers for large groups?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For large groups with limited time, choose fast, scalable activities such as Rock Paper Scissors Tournament, Icebreaker Bingo, Human Bingo, or This or That Questions. These icebreakers can be explained in under a minute and still feel fun and engaging.",
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Ice Breaker Games",
      logo: {
        "@type": "ImageObject",
        url: "https://www.icebreakergames.site/favicon.ico",
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.icebreakergames.site/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <Script
        id="faq-icebreaker-adults"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="article-icebreaker-adults"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto px-4 py-12 max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center px-4 py-2 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium mb-8 group transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg border border-emerald-100 dark:border-emerald-900/40"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap gap-3 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-full border border-emerald-100 dark:border-emerald-800/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            Icebreaker Games for Adults That Actually Work in Real Groups
          </h1>

          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-3">
            Awkward small talk is exhausting. After facilitating workshops, team offsites, church gatherings, and community
            events, I have seen how the right <strong>ice breaker games for adults</strong> can turn a stiff room into relaxed
            conversations, genuine laughter, and real connection.
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            This guide curates practical adult icebreakers I have seen work in real groups. You will find a quick game selector,
            recommendations by group size and setting, simple ratings, and answers to common questions so you can choose the best
            <span className="font-semibold"> ice breaker games for adults</span> for your next session.
          </p>
        </header>

        <div className="mb-10">
          <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
            <Image
              src="/img/blog/icebreaker-games-for-adults-hero.jpg"
              alt="Adults in a real-life workshop using icebreaker games to start a session"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Quick selector: choose a game in 30 seconds
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
            Use this path when you are standing in front of the room and need to decide fast which icebreaker to run.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/20 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                5–10 minutes, fewer than 10 adults
              </h3>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">
                Start with low-risk conversation starters that still count as real ice breaker games for adults.
              </p>
              <ul className="text-xs md:text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                <li>
                  <Link href="/games/six-word-memoirs" className="underline font-medium">
                    Six Word Memoirs
                  </Link>
                </li>
                <li>
                  <Link href="/games/would-you-rather" className="underline font-medium">
                    Would You Rather
                  </Link>
                </li>
                <li>
                  <Link href="/games/the-check-in" className="underline font-medium">
                    The Check-In
                  </Link>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                Large group (25+ adults)
              </h3>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">
                Choose scalable adult icebreakers that are easy to explain and control.
              </p>
              <ul className="text-xs md:text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                <li>
                  <Link href="/games/icebreaker-bingo" className="underline font-medium">
                    Icebreaker Bingo
                  </Link>{" "}
                  or{" "}
                  <Link href="/games/human-bingo" className="underline font-medium">
                    Human Bingo
                  </Link>
                </li>
                <li>
                  <Link href="/games/rock-paper-scissors-tournament" className="underline font-medium">
                    Rock Paper Scissors Tournament
                  </Link>
                </li>
                <li>
                  <Link href="/blog/ice-breaker-games-for-adults-large-groups" className="underline font-medium">
                    Large-group guide
                  </Link>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">
                Online or hybrid meeting
              </h3>
              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">
                Use remote-friendly ice breaker games for adults that respect screen fatigue.
              </p>
              <ul className="text-xs md:text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                <li>
                  <Link href="/games/beach-ball-qa" className="underline font-medium">
                    Beach Ball Q&amp;A
                  </Link>
                </li>
                <li>
                  <Link href="/games/this-or-that-questions" className="underline font-medium">
                    This or That Questions
                  </Link>
                </li>
                <li>
                  <Link href="/games/speed-networking" className="underline font-medium">
                    Speed Networking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            The best icebreaker games for adults by situation
          </h2>

          <div className="mb-8">
            <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src="/img/blog/icebreaker-games-for-adults-group-sizes.jpg"
                alt="Three different sizes of adult groups using icebreaker games: small, medium, and large"
                width={1000}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <SubSection
            title="1. Small groups (3–10 adults)"
            description="Small groups need ice breaker games for adults that feel conversational, not over-produced."
            items={[
              {
                name: "Six Word Memoirs",
                href: "/games/six-word-memoirs",
                text: "Everyone shares a six-word summary of their life; ideal for coaching-style sessions.",
              },
              {
                name: "Ten Things in Common",
                href: "/games/10-things-in-common",
                text: "Pairs or trios discover shared interests beyond the obvious job titles.",
              },
              {
                name: "Story Swap",
                href: "/games/story-swap",
                text: "Partners exchange short stories based on simple prompts about experiences or values.",
              },
            ]}
          />

          <SubSection
            title="2. Medium groups (10–25 adults)"
            description="With medium groups you can mix movement and conversation without losing intimacy."
            items={[
              {
                name: "The Check-In",
                href: "/games/the-check-in",
                text: "Fast, honest status round at the start of a workshop or training.",
              },
              {
                name: "Guess Who",
                href: "/games/guess-who",
                text: "Anonymous personal facts become a light guessing game that sparks stories.",
              },
              {
                name: "Reception Line",
                href: "/games/reception-line",
                text: "Rotating pairs answer one simple question each round to meet many people.",
              },
            ]}
          />

          <SubSection
            title="3. Large groups (25+ adults)"
            description="For bigger rooms, choose scalable adult party icebreakers with simple rules."
            items={[
              {
                name: "Icebreaker Bingo",
                href: "/games/icebreaker-bingo",
                text: "Structured mingling with prompts that reveal fun facts and shared experiences.",
              },
              {
                name: "Human Bingo",
                href: "/games/human-bingo",
                text: "Similar to Icebreaker Bingo but tailored to your specific audience or event.",
              },
              {
                name: "Rock Paper Scissors Tournament",
                href: "/games/rock-paper-scissors-tournament",
                text: "Instant, high-energy competition that works for dozens or even hundreds of adults.",
              },
            ]}
          />

          <div className="my-8 flex justify-center">
            <div className="w-full max-w-md md:max-w-lg rounded-3xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src="/img/blog/icebreaker-games-for-adults-online-vs-inperson.jpg"
                alt="Comparison of online and in-person icebreaker games for adult groups"
                width={450}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <SubSection
            title="4. Online / remote-friendly icebreakers"
            description="Remote teams still benefit from ice breaker games for adults, but the format must respect attention and bandwidth."
            items={[
              {
                name: "Beach Ball Q&A (virtual)",
                href: "/games/beach-ball-qa",
                text: "Use numbered questions instead of a physical ball and call out numbers at random.",
              },
              {
                name: "This or That Questions",
                href: "/games/this-or-that-questions",
                text: "Everyone chooses between two options via chat or a quick poll.",
              },
              {
                name: "Speed Networking",
                href: "/games/speed-networking",
                text: "Short breakout conversations with clear prompts to create quick connections.",
              },
            ]}
          />

          <SubSection
            title="5. Church and community groups"
            description="Community gatherings often mix ages and backgrounds; choose kind, inclusive, story-based icebreakers."
            items={[
              {
                name: "Story Swap",
                href: "/games/story-swap",
                text: "Use prompts about gratitude, mentors, or meaningful moments to spark reflection.",
              },
              {
                name: "Ten Things in Common",
                href: "/games/10-things-in-common",
                text: "Highlights shared values and experiences among people who may not know each other well.",
              },
              {
                name: "Beach Ball Q&A",
                href: "/games/beach-ball-qa",
                text: "Ask gentle, uplifting questions that work across cultures and ages.",
              },
            ]}
          />

          <SubSection
            title="6. Quick question-based icebreakers"
            description="Question-based formats are perfect when you want speed and flexibility."
            items={[
              {
                name: "Would You Rather",
                href: "/games/would-you-rather",
                text: "Playful choices that reveal preferences without forcing deep vulnerability.",
              },
              {
                name: "This or That Questions",
                href: "/games/this-or-that-questions",
                text: "Rapid-fire preferences that can energize a room in just a few minutes.",
              },
              {
                name: "The Check-In",
                href: "/games/the-check-in",
                text: "One-word or one-sentence responses that reveal mood and help people arrive.",
              },
            ]}
          />
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            How we rate these adult icebreakers
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            To compare different <span className="font-semibold">ice breaker games for adults</span>, use this simple three-part
            lens and adjust for your own context.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Energy level (1–5)</h3>
              <p>
                The Check-In: <strong>2/5</strong> (calm, reflective)
              </p>
              <p>
                Rock Paper Scissors Tournament: <strong>5/5</strong> (very high energy)
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Difficulty to explain (1–5)</h3>
              <p>
                Would You Rather: <strong>1/5</strong> (almost instant)
              </p>
              <p>
                Train Wreck: <strong>3/5</strong> (needs a clear demo and safety rules)
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Awkwardness level (1–5)</h3>
              <p>
                Ten Things in Common: <strong>2/5</strong> (gentle, structured)
              </p>
              <p>
                Human Bingo: <strong>3/5</strong> (requires walking up to strangers)
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
            When you browse individual game pages, quickly ask yourself: does this combination of energy, explanation difficulty,
            and awkwardness fit my group right now?
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Watch-outs and facilitation tips
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            Most lists of <span className="font-semibold">ice breaker games for adults</span> only describe the rules. In real
            rooms, a few extra habits make a big difference.
          </p>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Always offer a clear opt-out or “pass” option so shy or tired adults feel respected.</li>
            <li>Avoid topics that touch on politics, money, or deeply personal history unless your group has strong trust.</li>
            <li>Be honest about timing and stick to it; adults resent “just one more round” when the agenda is already full.</li>
            <li>Start with safer, lower-intensity activities and move to higher-energy icebreakers once the group is warmed up.</li>
            <li>Have a backup game ready in case the first option does not land well with your group.</li>
          </ul>
        </section>

        <section className="mt-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            FAQ about ice breaker games for adults
          </h2>

          <div className="space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                What is a good icebreaker for shy adults?
              </h3>
              <p>
                Shy participants usually prefer predictable, low-pressure{" "}
                <span className="font-semibold">ice breaker games for adults</span>. Start with{" "}
                <Link href="/games/the-check-in" className="underline font-medium">
                  The Check-In
                </Link>
                ,{" "}
                <Link href="/games/six-word-memoirs" className="underline font-medium">
                  Six Word Memoirs
                </Link>{" "}
                or{" "}
                <Link href="/games/10-things-in-common" className="underline font-medium">
                  Ten Things in Common
                </Link>
                . These formats give everyone structure and choice without putting anyone on the spot.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                How do I choose the right icebreaker for my group?
              </h3>
              <p>
                Look at four things: group size, how well people know each other, energy level, and time. Pick{" "}
                <span className="font-semibold">ice breaker games for adults</span> that are easy to explain, match your space,
                and support the purpose of your meeting. When in doubt, choose something slightly simpler than you think you
                need and add variety through questions rather than complex rules.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                What are some quick icebreakers for large groups?
              </h3>
              <p>
                For big rooms with limited time, choose fast, scalable activities such as{" "}
                <Link href="/games/rock-paper-scissors-tournament" className="underline font-medium">
                  Rock Paper Scissors Tournament
                </Link>
                ,{" "}
                <Link href="/games/icebreaker-bingo" className="underline font-medium">
                  Icebreaker Bingo
                </Link>
                ,{" "}
                <Link href="/games/human-bingo" className="underline font-medium">
                  Human Bingo
                </Link>{" "}
                or{" "}
                <Link href="/games/this-or-that-questions" className="underline font-medium">
                  This or That Questions
                </Link>
                . These adult icebreaker games can be explained in under a minute and still feel fun and engaging.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            Use this page as a hub: scan the scenarios, click into individual game pages for full instructions, and bookmark
            the <span className="font-semibold">ice breaker games for adults</span> that work best with your audiences.
          </p>
        </section>
      </article>
    </div>
  );
}

interface SubItem {
  name: string;
  href: string;
  text: string;
}

function SubSection({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: SubItem[];
}) {
  return (
    <div className="mb-8">
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">{description}</p>
      <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="font-semibold underline">
              {item.name}
            </Link>
            <span className="ml-1">– {item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
