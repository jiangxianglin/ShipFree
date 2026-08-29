import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import { PrintButton } from "@/components/PrintButton";

const SLUG = "two-truths-and-a-lie-for-students-printable";
const title =
  "Two Truths and a Lie for Students Printable: Classroom Worksheets + Prompt Banks";
const description =
  "Print student-safe Two Truths and a Lie worksheets for class, advisory, and orientation. Includes 3 ready-to-print sheets, example statements, and teacher facilitation tips.";
const imageUrl =
  "https://www.icebreakergames.site/small-group-icebreaker-activity.jpg";

const worksheets = [
  {
    name: "Worksheet A — First day / classroom",
    audience: "Middle school & high school first week",
    examples: [
      "I have lived in more than one city.",
      "I can cook one meal without a recipe.",
      "I have never broken a bone. (possible lie)",
      "I speak more than one language at home.",
      "I have a pet (or really want one).",
      "I prefer morning classes to afternoon ones.",
    ],
    prompts: [
      "Write two true statements about hobbies, school, or everyday life.",
      "Write one believable lie that stays classroom-safe.",
      "Do not use dating, body, salary, or private family drama.",
      "Keep each line under 12 words so guessing stays fast.",
    ],
  },
  {
    name: "Worksheet B — Clubs & advisory",
    audience: "Advisory, clubs, youth groups",
    examples: [
      "I have tried three different clubs this year.",
      "I can name five songs by the same artist.",
      "I once performed on a stage (or pretend I did).",
      "I prefer team sports to solo hobbies.",
      "I have volunteered for a community event.",
      "I am secretly great at board games.",
    ],
    prompts: [
      "Focus on clubs, hobbies, skills, and weekend habits.",
      "Make the lie plausible—not outrageous.",
      "Offer a pass if someone does not want to share aloud.",
      "Celebrate funny near-misses, not “gotchas.”",
    ],
  },
  {
    name: "Worksheet C — College / orientation",
    audience: "College orientation & new cohorts",
    examples: [
      "I have traveled outside my home country.",
      "I changed my intended major at least once.",
      "I can study for three hours without checking my phone.",
      "I have a part-time job (or had one last year).",
      "I prefer coffee shops to the library.",
      "I once got lost on campus on purpose.",
    ],
    prompts: [
      "Use campus life, travel, majors, and study habits.",
      "Keep statements light—no trauma or status flexes.",
      "In large rooms, run rounds in groups of 6–8.",
      "Timebox each person to about 45–60 seconds.",
    ],
  },
];

const faqs = [
  {
    q: "How do you play Two Truths and a Lie with students?",
    a: "Each student writes two true statements and one false statement, shares all three in any order, and classmates guess the lie. Reveal quickly, then rotate. Keep prompts school-safe and offer a pass option.",
  },
  {
    q: "What are good Two Truths and a Lie examples for high school?",
    a: "Use hobbies, sports, pets, travel, languages, and school routines. Avoid dating, body comments, family conflict, and anything that could embarrass a classmate.",
  },
  {
    q: "How long should a classroom round take?",
    a: "Plan 8–15 minutes. In classes over 20, split into small circles so everyone gets a turn without eating the whole period.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === SLUG);

  if (!post) {
    return { title, description };
  }

  const url = `https://www.icebreakergames.site/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
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
          alt: "Students writing Two Truths and a Lie statements during a classroom icebreaker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default function TwoTruthsStudentsPrintablePage() {
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
    author: { "@type": "Organization", name: post.author },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 print:bg-white">
      <Script
        id="article-two-truths-students-printable"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="faq-two-truths-students-printable"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                Two Truths and a Lie for Students Printable
              </h1>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-4 print:text-sm print:text-black">
                Ready-to-print worksheets and prompt banks for classroom icebreakers, advisory, clubs,
                and orientation. School-safe examples help students write strong statements without
                awkward oversharing.
              </p>
              <div className="flex flex-wrap gap-3 print:hidden">
                <PrintButton label="Print 3 worksheets" />
                <Link
                  href="/games/two-truths-and-a-lie"
                  className="inline-flex items-center px-5 py-3 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 rounded-2xl font-semibold border border-emerald-100 dark:border-emerald-900/40"
                >
                  Full Two Truths rules
                </Link>
                <Link
                  href="/games-like-two-truths-and-a-lie"
                  className="inline-flex items-center px-5 py-3 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 rounded-2xl font-semibold border border-emerald-100 dark:border-emerald-900/40"
                >
                  Games like Two Truths
                </Link>
              </div>
            </div>

            <div className="print:hidden">
              <div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/small-group-icebreaker-activity.jpg"
                  alt="Students in a small group writing icebreaker statements"
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
              First day of school, advisory, clubs, college orientation, and get-to-know-you lessons.
            </p>
          </div>
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">What you need</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Printed worksheets, pens, 8–15 minutes, and a quick teacher model statement.
            </p>
          </div>
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Safer than free-form</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Prompt banks steer students toward classroom-safe topics and away from embarrassing
              “gotcha” lies.
            </p>
          </div>
        </section>

        <section className="mb-8 print:mb-4">
          <div className="rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl print:shadow-none print:border-none print:bg-white print:p-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white print:text-xl print:mb-2 print:text-black">
              How to use these printable worksheets
            </h2>
            <ol className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 print:text-sm print:text-black">
              <li>1. Print one worksheet style for the group (or mix A/B/C so neighbors differ).</li>
              <li>2. Model your own two truths and one lie in 20 seconds.</li>
              <li>3. Give students 2–3 minutes to write on the sheet.</li>
              <li>4. Share in a circle or small groups; classmates guess the lie.</li>
              <li>5. Debrief with one question: “What surprised you?” then move on.</li>
            </ol>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 print:text-black">
              Prefer no lying? Use{" "}
              <Link href="/games/two-truths-and-a-dream" className="underline font-medium print:no-underline">
                Two Truths and a Dream
              </Link>{" "}
              or browse{" "}
              <Link
                href="/games-like-two-truths-and-a-lie"
                className="underline font-medium print:no-underline"
              >
                games like Two Truths and a Lie
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="space-y-8">
          {worksheets.map((sheet, index) => (
            <section
              key={sheet.name}
              className="rounded-3xl bg-white border border-gray-300 p-6 shadow-xl print:rounded-none print:shadow-none print:border-black print:p-4"
              style={{ pageBreakAfter: index < worksheets.length - 1 ? "always" : "auto" }}
            >
              <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 print:text-2xl">
                    Two Truths and a Lie
                  </h2>
                  <p className="text-gray-600 print:text-black font-medium">{sheet.name}</p>
                  <p className="text-sm text-gray-500 print:text-black">{sheet.audience}</p>
                </div>
                <div className="text-right text-sm text-gray-600 print:text-black">
                  <p>Name: ____________________</p>
                  <p>Date: ____________________</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <div className="border border-black p-4">
                  <p className="text-xs font-bold uppercase tracking-wide mb-2">My three statements</p>
                  <p className="text-sm mb-3 text-gray-700 print:text-black">
                    Write two truths and one lie. Mix the order when you share.
                  </p>
                  <ol className="space-y-4 text-sm text-gray-900">
                    <li>1. _______________________________________________</li>
                    <li>2. _______________________________________________</li>
                    <li>3. _______________________________________________</li>
                  </ol>
                  <p className="mt-4 text-sm text-gray-700 print:text-black">
                    The lie is statement #: ______
                  </p>
                </div>
                <div className="border border-black p-4">
                  <p className="text-xs font-bold uppercase tracking-wide mb-2">Teacher / facilitator notes</p>
                  <ul className="space-y-2 text-sm text-gray-800 print:text-black">
                    {sheet.prompts.map((tip) => (
                      <li key={tip}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border border-black p-4">
                <p className="text-xs font-bold uppercase tracking-wide mb-2">
                  Example bank (steal or remix)
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-900 print:text-black">
                  {sheet.examples.map((example) => (
                    <li key={example}>• {example}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm text-gray-700 print:text-black">
                Rule: keep it kind. No statements that put classmates on the spot.
              </p>
            </section>
          ))}
        </section>

        <section className="mt-10 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl print:hidden">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            FAQ for teachers
          </h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.q}</h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 p-6 shadow-xl print:hidden">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            More student icebreaker printables &amp; guides
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>
              <Link href="/blog/human-bingo-for-students-printable" className="underline font-medium">
                Human Bingo for Students printable
              </Link>{" "}
              — ready cards for large classes
            </li>
            <li>
              <Link href="/blog/icebreaker-games-for-students" className="underline font-medium">
                Icebreaker games for students
              </Link>{" "}
              — teacher comparison guide
            </li>
            <li>
              <Link href="/icebreaker-games-for-high-school-students" className="underline font-medium">
                Ice breaker games for high school students
              </Link>
            </li>
            <li>
              <Link href="/icebreaker-games-for-teens" className="underline font-medium">
                Ice breaker games for teens
              </Link>
            </li>
            <li>
              <Link href="/games/the-name-game" className="underline font-medium">
                The Name Game
              </Link>{" "}
              — pair after Two Truths for name recall
            </li>
          </ul>
        </section>
      </article>
    </div>
  );
}
