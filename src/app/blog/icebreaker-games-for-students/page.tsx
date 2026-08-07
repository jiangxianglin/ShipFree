import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

const SLUG = "icebreaker-games-for-students";
const title = "Icebreaker Games for Students for Class & Online";
const description =
  "Icebreaker Games for Students for class, high school, college, and online learning. Find low-prep, non-cheesy ideas and printable bingo.";
const imageUrl =
  "https://www.icebreakergames.site/img/blog/icebreakergamesforstudents-HighSchoolNon-Cheesy.png";

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
          alt: "High school students taking part in a natural, non-cheesy icebreaker activity",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@icebreakergames",
      site: "@icebreakergames",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are the best icebreaker games for shy students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best icebreaker games for shy students are low-pressure, structured, and optional. Start with One Word Check-In, This or That Questions, or Common Ground before moving into louder or more social activities.",
      },
    },
    {
      "@type": "Question",
      name: "What icebreakers work well for high school students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High school students usually respond best to icebreakers that feel quick, social, and not childish. Good options include Two Truths and a Lie, Line-Up, Common Ground, and Human Bingo with prompts that match teen interests.",
      },
    },
    {
      "@type": "Question",
      name: "What are good online icebreaker games for students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For online classes, use short formats that work well on video calls and chat. This or That Questions, Emoji Introduction, and Virtual Background Story are simple, fast, and screen-friendly choices.",
      },
    },
  ],
};

const comparisonRows = [
  {
    game: "One Word Check-In",
    href: "/games/one-word-check-in",
    bestFor: "First day, advisory, shy students",
    groupSize: "5-30",
    time: "5 min",
    prep: "None",
    risk: "1/5",
    online: "Yes",
  },
  {
    game: "This or That Questions",
    href: "/games/this-or-that-questions",
    bestFor: "Fast warm-ups, online classes",
    groupSize: "5-100+",
    time: "5-10 min",
    prep: "None",
    risk: "1/5",
    online: "Yes",
  },
  {
    game: "Common Ground",
    href: "/games/common-ground",
    bestFor: "Small classes, pair work",
    groupSize: "4-20",
    time: "10 min",
    prep: "Low",
    risk: "2/5",
    online: "Yes",
  },
  {
    game: "Two Truths and a Lie",
    href: "/games/two-truths-and-a-lie",
    bestFor: "High school, college seminars",
    groupSize: "6-30",
    time: "10-15 min",
    prep: "None",
    risk: "3/5",
    online: "Yes",
  },
  {
    game: "Human Bingo",
    href: "/games/human-bingo",
    bestFor: "Large classes, orientation",
    groupSize: "15-150",
    time: "15-20 min",
    prep: "Printable card",
    risk: "3/5",
    online: "No",
  },
  {
    game: "Speed Networking",
    href: "/games/speed-networking",
    bestFor: "College, orientation, clubs",
    groupSize: "12-80",
    time: "15-25 min",
    prep: "Prompt list",
    risk: "2/5",
    online: "Yes",
  },
];

const bingoPrompts = [
  "Has a sibling",
  "Prefers cats over dogs",
  "Likes spicy food",
  "Has been on a plane",
  "Can name three songs from the same artist",
  "Enjoys math more than history",
  "Has played on a team",
  "Watches YouTube every day",
  "Can speak more than one language",
];

const nonCheesyPrompts = [
  "A playlist you would defend forever",
  "A snack that is better than people admit",
  "A city you would revisit tomorrow",
  "A class topic you learn faster than most people",
  "A small skill you are oddly proud of",
];

export default function StudentsIcebreakersPage() {
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
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      <Script
        id="faq-icebreaker-students"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="article-icebreaker-students"
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
            Icebreaker Games for Students That Actually Work in Real Classrooms
          </h1>

          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mb-3">
            Teachers, tutors, orientation leaders, and youth facilitators rarely need more game names. They need{" "}
            <strong>icebreaker games for students</strong> that are easy to explain, low-risk for shy learners, and appropriate
            for the age group in front of them.
          </p>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            This guide focuses on what actually matters in school and student settings: first-day nerves, high school
            resistance to cheesy activities, online attention spans, and large class logistics. You will find quick picks by
            setting, teacher notes, and links to full game instructions.
          </p>
        </header>

        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
            <Image
              src="/img/blog/icebreakergamesforstudents-hero.png"
              alt="Students using a simple classroom icebreaker in a small group"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Quick selector: choose a student icebreaker in 30 seconds
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">
            Start here if you are about to teach, facilitate, or run orientation and need the fastest useful answer.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <QuickCard
              title="First day of class"
              text="Use something low-pressure that gets everyone talking without forced oversharing."
              links={[
                { href: "/games/one-word-check-in", label: "One Word Check-In" },
                { href: "/games/this-or-that-questions", label: "This or That Questions" },
                { href: "/games/common-ground", label: "Common Ground" },
              ]}
              featured
            />
            <QuickCard
              title="High school students"
              text="Choose social formats that feel quick and not childish."
              links={[
                { href: "/icebreaker-games-for-teens", label: "Ice breaker games for teens" },
                { href: "/games/two-truths-and-a-lie", label: "Two Truths and a Lie" },
                { href: "/games/human-bingo", label: "Human Bingo" },
              ]}
            />
            <QuickCard
              title="College or orientation"
              text="Pick structured mingling games that help students meet many new people."
              links={[
                { href: "/games/icebreaker-bingo", label: "Icebreaker Bingo" },
                { href: "/games/human-bingo", label: "Human Bingo" },
                { href: "/games/speed-networking", label: "Speed Networking" },
              ]}
            />
            <QuickCard
              title="Online class"
              text="Keep it short, visible, and easy to run in chat or on camera."
              links={[
                { href: "/games/emoji-introduction", label: "Emoji Introduction" },
                { href: "/games/this-or-that-questions", label: "This or That Questions" },
                { href: "/games/virtual-background-story", label: "Virtual Background Story" },
              ]}
            />
          </div>
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            What makes a good icebreaker for students
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            A strong classroom icebreaker does more than fill five awkward minutes. It helps students feel safe enough to
            participate, gives the facilitator a quick read on the group, and creates a smoother transition into the real task
            of the lesson, orientation, or workshop.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-900/20 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What usually works</h3>
              <ul className="space-y-2">
                <li>Short instructions that can be understood in under one minute</li>
                <li>Low social risk for shy, new, or multilingual students</li>
                <li>Flexible prompts that can be adapted for age and culture</li>
                <li>Clear movement boundaries for classrooms and lecture halls</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What often fails</h3>
              <ul className="space-y-2">
                <li>Long explanations before students get to do anything</li>
                <li>Prompts that feel childish for teens or too personal too early</li>
                <li>Games that require lots of prep for very little payoff</li>
                <li>Activities with no opt-out path for reluctant students</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Comparison table: the fastest way to choose
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            This is the part most classroom pages skip. If you want a fast, practical choice, compare the games by prep,
            social risk, and whether they work online.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm text-left border-separate border-spacing-0">
              <thead>
                <tr className="text-gray-900 dark:text-white">
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Game</th>
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Best for</th>
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Group</th>
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Time</th>
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Prep</th>
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Social risk</th>
                  <th className="bg-emerald-50 dark:bg-emerald-900/20 p-3 border-b border-gray-200 dark:border-gray-700">Online?</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.href} className={index % 2 === 0 ? "bg-white/40 dark:bg-gray-900/20" : "bg-gray-50/70 dark:bg-gray-900/40"}>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                      <Link href={row.href} className="font-semibold underline text-gray-900 dark:text-white">
                        {row.game}
                      </Link>
                    </td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.bestFor}</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.groupSize}</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.time}</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.prep}</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.risk}</td>
                    <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{row.online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            The best icebreaker games for students by situation
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
            The keyword is broad, but the real search intent is practical. Most people searching for{" "}
            <span className="font-semibold">icebreaker games for students</span> need help with a specific context, so these
            recommendations are grouped by where and how they are likely to be used.
          </p>

          <SubSection
            title="1. First day of school or first class meeting"
            description="On day one, low-pressure is usually better than high-energy. You want students to speak once, learn a few names, and feel that the room is safe."
            items={[
              {
                name: "One Word Check-In",
                href: "/games/one-word-check-in",
                text: "A quick emotional temperature check that works especially well for older students and advisory groups.",
              },
              {
                name: "This or That Questions",
                href: "/games/this-or-that-questions",
                text: "Fast preference questions that can be answered out loud, by movement, or in chat.",
              },
              {
                name: "Common Ground",
                href: "/games/common-ground",
                text: "Pairs or small groups discover things they genuinely share beyond the obvious.",
              },
            ]}
          />

          <SubSection
            title="2. Elementary and middle school students"
            description="Younger students often respond well to visual prompts, movement, and simple matching formats. Keep directions short and celebrate completion, not performance."
            items={[
              {
                name: "Show and Tell",
                href: "/games/show-and-tell",
                text: "A familiar format that helps students share something meaningful with strong teacher control over pacing.",
              },
              {
                name: "Find Your Match",
                href: "/games/find-your-match",
                text: "A partner-finding activity that works well as a movement break and a first-name practice tool.",
              },
              {
                name: "Scavenger Hunt",
                href: "/games/scavenger-hunt",
                text: "Great for classroom tours, orientation stations, and getting students physically engaged.",
              },
            ]}
          />

          <SubSection
            title="3. High school students who hate cheesy icebreakers"
            description="High schoolers usually want social credibility. Choose games that feel fast, a little competitive, or genuinely interesting without being childish."
            items={[
              {
                name: "Two Truths and a Lie",
                href: "/games/two-truths-and-a-lie",
                text: "Still works when prompts are framed well and students are not forced into embarrassing facts.",
              },
              {
                name: "Line-Up",
                href: "/games/line-up",
                text: "Lets students sort themselves by birthdays, commute distance, or music habits in a visual, low-prep way.",
              },
              {
                name: "Human Bingo",
                href: "/games/human-bingo",
                text: "Strong for larger classes if the squares are customized around student interests rather than generic adult prompts.",
              },
            ]}
          />

          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src="/img/blog/icebreakergamesforstudents-HighSchoolNon-Cheesy.png"
                alt="High school students taking part in a natural, non-cheesy icebreaker activity"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="mb-8 rounded-3xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/70 dark:bg-amber-900/15 p-6">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              What makes an icebreaker feel cheesy in high school
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
              This is the pain point many pages miss. High school students usually do not reject icebreakers because they hate
              meeting people. They reject activities that feel childish, overly personal, or disconnected from their social reality.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm md:text-base">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common failure points</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Prompts that sound like elementary school circle time</li>
                  <li>Forced enthusiasm before students trust the room</li>
                  <li>Sharing that is too personal too early</li>
                  <li>Long turns while everyone else waits and judges</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How to make the same games work better</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Use current, specific prompts instead of generic “fun facts”</li>
                  <li>Keep answers short: one phrase, one choice, one story</li>
                  <li>Let students answer by movement, paper, or chat first</li>
                  <li>Choose prompts about taste, habits, and preferences before identity or family topics</li>
                </ul>
              </div>
            </div>
          </div>

          <SubSection
            title="4. College students and orientation groups"
            description="College and orientation settings often need scale. Students do not just need to speak once; they need to meet multiple new people quickly."
            items={[
              {
                name: "Icebreaker Bingo",
                href: "/games/icebreaker-bingo",
                text: "Structured mingling with prompts that can be themed around majors, campus life, or student services.",
              },
              {
                name: "Human Bingo",
                href: "/games/human-bingo",
                text: "A reliable choice for residence life, welcome week, and first-semester cohort events.",
              },
              {
                name: "Speed Networking",
                href: "/games/speed-networking",
                text: "Ideal when you want every student to have several short one-to-one conversations in one session.",
              },
            ]}
          />

          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src="/img/blog/icebreakergamesforstudents-Orientation.png"
                alt="Students meeting and talking during a school orientation icebreaker"
                width={1200}
                height={1200}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <SubSection
            title="5. Online and hybrid student groups"
            description="Virtual icebreakers need to respect screen fatigue. The best ones use chat, camera, or quick visuals without becoming another long discussion."
            items={[
              {
                name: "Emoji Introduction",
                href: "/games/emoji-introduction",
                text: "Students answer with emojis first, which lowers the barrier before speaking.",
              },
              {
                name: "This or That Questions",
                href: "/games/this-or-that-questions",
                text: "Easy to run through polls, reactions, or chat with almost no setup.",
              },
              {
                name: "Virtual Background Story",
                href: "/games/virtual-background-story",
                text: "Works well in online seminars when students can choose a background that says something about them.",
              },
            ]}
          />

          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src="/img/blog/icebreakergamesforstudents-OnlineIcebreaker.png"
                alt="Student using an online icebreaker in a virtual class setting"
                width={1200}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <SubSection
            title="6. Large student groups and assemblies"
            description="When you have 25, 50, or 200 students, simplicity beats cleverness. Use formats that scale cleanly and do not rely on long debriefs."
            items={[
              {
                name: "Line-Up",
                href: "/games/line-up",
                text: "A simple visual opener that creates movement and fast conversation in big rooms.",
              },
              {
                name: "Human Bingo",
                href: "/games/human-bingo",
                text: "Excellent for orientation, house systems, clubs, and large advisory sessions.",
              },
              {
                name: "Scavenger Hunt",
                href: "/games/scavenger-hunt",
                text: "Best when students need to learn the physical space as well as meet each other.",
              },
            ]}
          />
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Copy-and-use prompts for non-cheesy student icebreakers
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            If you want this page to save prep time, do not stop at game names. These prompt styles are safer for older students
            because they sound modern, specific, and optional.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {nonCheesyPrompts.map((prompt) => (
              <div
                key={prompt}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 p-4 text-sm md:text-base text-gray-700 dark:text-gray-300"
              >
                {prompt}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Printable asset starter: student bingo prompts
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            If you want a simple printable resource, start with these squares for a student-safe bingo card. They are broad
            enough for school use and avoid the awkward adult-style prompts that often miss the mark.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bingoPrompts.map((prompt) => (
              <div
                key={prompt}
                className="rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 p-4 bg-emerald-50/40 dark:bg-emerald-900/10 text-sm text-gray-700 dark:text-gray-300"
              >
                {prompt}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
            For high school, swap generic squares for music, hobbies, routines, or campus-life prompts. For college orientation,
            add majors, dorm life, hometown distance, or study habits.
          </p>
          <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
            If you want ready-to-print versions instead of building your own, use our{" "}
            <Link href="/blog/human-bingo-for-students-printable" className="underline font-medium">
              Human Bingo for Students printable page
            </Link>
            .
          </p>
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            How we rate these student icebreakers
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            Instead of ranking games only by fun, this guide uses a classroom lens. These three filters are usually what
            determine whether an activity succeeds with students.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Social risk</h3>
              <p>One Word Check-In: <strong>1/5</strong> (very safe)</p>
              <p>Two Truths and a Lie: <strong>3/5</strong> (depends on prompt quality)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Prep required</h3>
              <p>This or That Questions: <strong>1/5</strong> (almost none)</p>
              <p>Icebreaker Bingo: <strong>3/5</strong> (card prep needed)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Scalability</h3>
              <p>Common Ground: <strong>2/5</strong> (best for smaller groups)</p>
              <p>Human Bingo: <strong>5/5</strong> (excellent for large groups)</p>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
            If your group is hesitant, always optimize for lower social risk first. Students will forgive a simple game much
            faster than an awkward one.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Teacher notes: how to make student icebreakers land better
          </h2>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Explain why you are doing the activity. Students engage more when they know the purpose is to help the group work better.</li>
            <li>Use age-appropriate prompts. The same game can feel excellent in college and childish in high school if the prompt design is wrong.</li>
            <li>Offer a pass option. This protects shy students and increases trust for future participation.</li>
            <li>Keep the first round shorter than you think. Ending early usually leaves students with a better impression.</li>
            <li>For multilingual or mixed-confidence groups, give think time before asking people to speak.</li>
          </ul>
        </section>

        <section className="mb-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Editorial approach and trust notes
          </h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            This page was written for educators and facilitators serving student audiences in North American and English-speaking
            contexts. We prioritized activities that can be adapted for K-12 classrooms, tutoring groups, clubs, orientation
            programs, and online learning. The goal was not to produce the biggest list. The goal was to recommend activities
            that a teacher or facilitator could realistically run with limited time and mixed student confidence levels.
          </p>
          <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Selection criteria: low prep, clear instructions, age fit, and realistic classroom use.</li>
            <li>Review lens: social risk for shy students, class management friction, and usefulness across different group sizes.</li>
            <li>Editorial method: each recommendation was screened for first-day usefulness, teen resistance to cheesy prompts, and whether the game could be adapted for online or large-group use.</li>
            <li>Audience assumptions: this guide is most relevant for US, Canadian, UK, and similar English-speaking school contexts.</li>
            <li>Update note: reviewed and updated on May 5, 2026, to reflect current search intent around school, high school, college, and online use cases.</li>
          </ul>
        </section>

        <section className="mt-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            FAQ about icebreaker games for students
          </h2>

          <div className="space-y-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                What are the best icebreaker games for shy students?
              </h3>
              <p>
                Start with predictable, low-pressure formats such as{" "}
                <Link href="/games/one-word-check-in" className="underline font-medium">
                  One Word Check-In
                </Link>
                ,{" "}
                <Link href="/games/this-or-that-questions" className="underline font-medium">
                  This or That Questions
                </Link>
                , or{" "}
                <Link href="/games/common-ground" className="underline font-medium">
                  Common Ground
                </Link>
                . These options give students structure and reduce the fear of saying the wrong thing in front of peers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                What icebreakers work best for high school students?
              </h3>
              <p>
                High school students usually prefer activities that feel quick, social, and not childish. Start with our{" "}
                <Link href="/icebreaker-games-for-teens" className="underline font-medium">
                  ice breaker games for teens
                </Link>{" "}
                hub, then try{" "}
                <Link href="/games/two-truths-and-a-lie" className="underline font-medium">
                  Two Truths and a Lie
                </Link>
                ,{" "}
                <Link href="/games/line-up" className="underline font-medium">
                  Line-Up
                </Link>
                , and{" "}
                <Link href="/games/human-bingo" className="underline font-medium">
                  Human Bingo
                </Link>{" "}
                with teen-safe prompts and a fast pace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                What are good online icebreaker games for students?
              </h3>
              <p>
                Online classes usually benefit from short formats that work through chat, reactions, or a quick turn on camera.
                Good choices include{" "}
                <Link href="/games/emoji-introduction" className="underline font-medium">
                  Emoji Introduction
                </Link>
                ,{" "}
                <Link href="/games/this-or-that-questions" className="underline font-medium">
                  This or That Questions
                </Link>
                , and{" "}
                <Link href="/games/virtual-background-story" className="underline font-medium">
                  Virtual Background Story
                </Link>
                .
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm md:text-base text-gray-700 dark:text-gray-300">
            Use this page as your starting hub, then open the linked game pages for full instructions. For teen classrooms and
            clubs, continue with{" "}
            <Link href="/icebreaker-games-for-teens" className="underline font-medium">
              ice breaker games for teens
            </Link>
            . If you are building a student-friendly facilitation toolkit, also browse the full{" "}
            <Link href="/games" className="underline font-medium">
              icebreaker games library
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}

interface QuickLink {
  href: string;
  label: string;
}

function QuickCard({
  title,
  text,
  links,
  featured = false,
}: {
  title: string;
  text: string;
  links: QuickLink[];
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        featured
          ? "border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/20"
          : "border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40"
      }`}
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm md:text-base">{title}</h3>
      <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-3">{text}</p>
      <ul className="text-xs md:text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline font-medium">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
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
            <span className="ml-1">- {item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
