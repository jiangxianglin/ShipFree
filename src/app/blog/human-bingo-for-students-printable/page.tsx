import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { PrintButton } from "@/components/PrintButton";

const SLUG = "human-bingo-for-students-printable";
const title = "Human Bingo for Students Printable: 3 Ready-to-Print Cards for Class and Orientation";
const description =
  "Print student-friendly Human Bingo cards for class, orientation, and first day of school activities. Includes 3 unique versions, simple directions, and prompts for high school and college groups.";
const imageUrl = "https://www.icebreakergames.site/large-group-icebreaker-event.jpg";

const bingoCards = [
  {
    name: "Card A",
    prompts: [
      "Has a sibling",
      "Likes spicy food",
      "Has played a sport",
      "Can name 3 songs by one artist",
      "Has traveled out of town this year",
      "FREE",
      "Prefers mornings to late nights",
      "Can speak more than one language",
      "Would rather text than call",
    ],
  },
  {
    name: "Card B",
    prompts: [
      "Watches YouTube every day",
      "Enjoys science more than history",
      "Has a pet at home",
      "Likes rainy weather",
      "Has read a book this month",
      "FREE",
      "Prefers pizza over burgers",
      "Has tried a club or team activity",
      "Knows how to cook one meal",
    ],
  },
  {
    name: "Card C",
    prompts: [
      "Has been on a plane",
      "Likes working in groups",
      "Has a favorite podcast or creator",
      "Would revisit the same city twice",
      "Prefers tea over coffee or soda",
      "FREE",
      "Has changed their mind about a subject this year",
      "Enjoys art, music, or design",
      "Can recommend a good movie",
    ],
  },
];

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
          alt: "Large student group using printable human bingo cards in a school setting",
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

export default function HumanBingoPrintablePage() {
  const post = blogPosts.find((p) => p.slug === SLUG);

  if (!post) {
    return null;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: [imageUrl],
    author: {
      "@type": "Organization",
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
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 print:bg-white">
      <Script
        id="article-human-bingo-students-printable"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container mx-auto px-4 py-12 max-w-6xl print:max-w-none print:px-0 print:py-0">
        <div className="print:hidden">
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
        </div>

        <header className="mb-10 print:mb-6">
          <div className="flex flex-wrap gap-3 mb-4 print:hidden">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-full border border-emerald-100 dark:border-emerald-800/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center print:grid-cols-1">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight print:text-3xl print:mb-2">
                Human Bingo for Students Printable
              </h1>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-4 print:text-sm print:text-black">
                Use these ready-to-print Human Bingo cards for first day of school, orientation, advisory, clubs, and large
                student groups. The prompts are broad enough for classroom use and avoid the awkward adult-style squares that
                often make student bingo feel forced.
              </p>
              <div className="flex flex-wrap gap-3 print:hidden">
                <PrintButton label="Print 3 bingo cards" />
                <Link
                  href="/blog/icebreaker-games-for-students"
                  className="inline-flex items-center px-5 py-3 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 rounded-2xl font-semibold border border-emerald-100 dark:border-emerald-900/40"
                >
                  Back to student guide
                </Link>
                <Link
                  href="/icebreaker-games-for-teens"
                  className="inline-flex items-center px-5 py-3 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 rounded-2xl font-semibold border border-emerald-100 dark:border-emerald-900/40"
                >
                  Ice breaker games for teens
                </Link>
              </div>
            </div>

            <div className="print:hidden">
              <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/large-group-icebreaker-event.jpg"
                  alt="Students taking part in a large-group icebreaker activity"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mb-10 grid lg:grid-cols-3 gap-4 print:hidden">
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Best for</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              High school, college orientation, first day of school, clubs, advisory, and large mixed student groups.
            </p>
          </div>
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">What you need</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Printed cards, pens, 10 to 20 minutes, and enough space for students to circulate safely.
            </p>
          </div>
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Why this version works</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              The prompts stay light and social without asking for embarrassing facts, which makes them safer for student groups.
            </p>
          </div>
        </section>

        <section className="mb-8 print:mb-4">
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl print:shadow-none print:border-none print:bg-white print:p-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white print:text-xl print:mb-2 print:text-black">
              How to use these printable bingo cards
            </h2>
            <ol className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 print:text-sm print:text-black">
              <li>1. Print enough copies so students around the room are not all holding the same card.</li>
              <li>2. Give each student one card and a pen.</li>
              <li>3. Students move around and find classmates who match a square.</li>
              <li>4. Each person should sign only one or two squares per card to encourage more mixing.</li>
              <li>5. Stop when someone gets three in a row, fills the full card, or time runs out.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-8">
          {bingoCards.map((card, index) => (
            <section
              key={card.name}
              className="rounded-3xl bg-white border border-gray-300 p-6 shadow-xl print:rounded-none print:shadow-none print:border-black print:p-4"
              style={{ pageBreakAfter: index < bingoCards.length - 1 ? "always" : "auto" }}
            >
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 print:text-2xl">Human Bingo for Students</h2>
                  <p className="text-gray-600 print:text-black">{card.name}</p>
                </div>
                <div className="text-right text-sm text-gray-600 print:text-black">
                  <p>Name: ____________________</p>
                  <p>Date: ____________________</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-0 border border-black">
                {card.prompts.map((prompt, promptIndex) => (
                  <div
                    key={`${card.name}-${promptIndex}`}
                    className={`min-h-36 border border-black p-3 flex items-center justify-center text-center text-sm font-medium text-gray-900 ${
                      prompt === "FREE" ? "bg-emerald-100" : "bg-white"
                    }`}
                  >
                    {prompt}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-700 print:text-black">
                <p>Rule: find a classmate who matches each square and ask them to sign it.</p>
              </div>
            </section>
          ))}
        </section>

        <section className="mt-10 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl print:hidden">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Adaptation tips for high school and college
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>For high school, replace broad squares with music, hobbies, commute habits, clubs, or school routines.</li>
            <li>For college orientation, add hometown distance, intended major, dorm life, study habits, or campus interests.</li>
            <li>For shy groups, allow students to complete three in a row instead of a full card.</li>
            <li>For very large rooms, project the stop time and remind students not to cluster with existing friends.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
