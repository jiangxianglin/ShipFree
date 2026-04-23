import { christmasTableGamesOptimized } from "@/data/christmas-table-games-blog-optimized";
import { GameListItem } from "@/components/blog/GameListItem";
import { SimpleTableOfContents } from "@/components/blog/SimpleTableOfContents";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const post = christmasTableGamesOptimized;
  const url = `https://www.icebreakergames.site/blog/${post.slug}`;

  return {
    title: "15 Best Christmas Table Icebreaker Games for Holiday Dinners 2026",
    description: "Discover 15 engaging Christmas table icebreaker games perfect for holiday dinners. Easy-to-play activities that keep guests entertained while seated.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "15 Best Christmas Table Icebreaker Games for Holiday Dinners 2026",
      description: "Discover 15 engaging Christmas table icebreaker games perfect for holiday dinners. Easy-to-play activities that keep guests entertained while seated.",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: url,
      siteName: "Ice Breaker Games",
      images: [
        {
          url: "/christmas-dinner-connection.jpg",
          width: 800,
          height: 600,
          alt: "Christmas table icebreaker games for holiday dinners",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "15 Best Christmas Table Icebreaker Games for Holiday Dinners 2026",
      description: "Discover 15 engaging Christmas table icebreaker games perfect for holiday dinners. Easy-to-play activities that keep guests entertained while seated.",
      images: ["/christmas-dinner-connection.jpg"],
      creator: "@icebreakergames",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function ChristmasTableGamesPage() {
  const post = christmasTableGamesOptimized;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "15 Best Christmas Table Icebreaker Games for Holiday Dinners 2026",
            "description": "Discover 15 engaging Christmas table icebreaker games perfect for holiday dinners. Easy-to-play activities that keep guests entertained while seated.",
            "image": "https://www.icebreakergames.site/christmas-dinner-connection.jpg",
            "author": {
              "@type": "Organization",
              "name": "Ice Breaker Games"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Ice Breaker Games",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.icebreakergames.site/favicon.ico"
              }
            },
            "datePublished": "${post.date}",
            "dateModified": "${post.date}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.icebreakergames.site/blog/christmas-table-icebreaker-games"
            },
            "keywords": "Christmas table icebreaker games, holiday dinner games, Christmas party activities, festive table games, seated Christmas games",
            "articleSection": "Holiday Activities",
            "wordCount": "3500"
          }
        `}
      </Script>
      
      <Script id="breadcrumb-schema" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.icebreakergames.site/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.icebreakergames.site/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Christmas Table Icebreaker Games",
                "item": "https://www.icebreakergames.site/blog/christmas-table-icebreaker-games"
              }
            ]
          }
        `}
      </Script>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        {/* Table of Contents - Fixed on right side */}
        <SimpleTableOfContents />
        
        <article className="relative container mx-auto px-4 py-12 max-w-4xl md:pr-56">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-gray-900 dark:text-white font-medium">
                Christmas Table Icebreaker Games
              </li>
            </ol>
          </nav>

          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:text-green-600 font-medium mb-8 group transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-red-100 to-green-100 dark:from-red-900/30 dark:to-green-900/30 text-red-800 dark:text-red-200 text-sm font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-green-600 to-red-600 dark:from-red-400 dark:via-green-400 dark:to-red-400 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">⏱️ 8 min read</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="mb-12 max-w-2xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/christmas-table-games-hero.jpg"
                alt="Christmas table icebreaker games with dice and cards on festive dinner table"
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Introduction */}
          <div id="intro" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span className="text-4xl mr-3">🎅</span>
              Introduction
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {post.intro}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mt-4">
                Looking for more ways to energize your gatherings? Check out our <Link href="/" className="text-red-600 hover:text-green-600 font-semibold underline">complete collection of icebreaker games</Link> or explore our <Link href="/blog/fun-icebreaker-games-ultimate-guide" className="text-red-600 hover:text-green-600 font-semibold underline">ultimate guide to fun icebreaker games</Link> for all occasions.
              </p>
            </div>
          </div>

          {/* Quick Tips with Image */}
          <div id="quick-tips" className="mb-12">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-red-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                {/* Image Side */}
                <div className="relative h-80 md:h-96">
                  <Image
                    src="/christmas-family-table-games.jpg"
                    alt="Multi-generational family playing Christmas icebreaker games at dinner table"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content Side */}
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                    <span className="text-4xl mr-3">💡</span>
                    Quick Success Tips
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base">
                      {post.quickTips}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mt-4">
                      Want to become a master facilitator? Read our expert guide on <Link href="/blog/tips-for-running-effective-icebreakers" className="text-red-600 hover:text-green-600 font-semibold underline">running effective icebreaker games</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div id="faq" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span className="text-4xl mr-3">❓</span>
              Frequently Asked Questions
            </h2>
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.faq}
              </div>
            </div>
          </div>

          {/* Conclusion with Image */}
          <div id="conclusion" className="mb-12">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-100 to-green-100 dark:from-red-900/30 dark:to-green-900/30 rounded-3xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0 items-center">
                {/* Content Side */}
                <div className="p-8 md:p-10 order-2 md:order-1">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                    <span className="text-4xl mr-3">🎁</span>
                    Ready for Your Best Christmas Dinner?
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-base">
                      {post.conclusion}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm mt-4">
                      Planning other types of gatherings? Discover our <Link href="/blog/ice-breaker-games-for-meetings" className="text-red-600 hover:text-green-600 font-semibold underline">best ice breaker games for meetings</Link> to energize your professional events, or explore our <Link href="/blog" className="text-red-600 hover:text-green-600 font-semibold underline">complete blog collection</Link> for more expert tips and game ideas.
                    </p>
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="relative h-80 md:h-96 order-1 md:order-2">
                  <Image
                    src="/christmas-dinner-connection.jpg"
                    alt="Friends celebrating and connecting at Christmas dinner party with games"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Games List */}
          <div id="games" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
              <span className="text-4xl mr-3">🎄</span>
              15 Christmas Table Games
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
              Click any game below to view complete instructions, variations, and pro tips on its dedicated page.
            </p>

            <div className="space-y-3">
              {post.games.map((game) => (
                <GameListItem
                  key={game.number}
                  number={game.number}
                  title={game.title}
                  description={game.description}
                  players={game.players}
                  duration={game.duration}
                  link={game.link}
                />
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">🎄 Ready for Your Best Christmas Dinner Yet?</h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of Christmas table icebreaker games and make this holiday season unforgettable!
              </p>
              <Link
                href="/games?tag=christmas"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Browse All Christmas Games
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Related Links Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Explore More Icebreaker Games & Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">🏠</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Home - All Games
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Discover our complete collection
                  </div>
                </div>
              </Link>
              <Link
                href="/blog"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">📚</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Blog - Expert Tips
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Read more guides and articles
                  </div>
                </div>
              </Link>
              <Link
                href="/blog/tips-for-running-effective-icebreakers"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">💡</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Effective Icebreaker Tips
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Master facilitation skills
                  </div>
                </div>
              </Link>
              <Link
                href="/blog/fun-icebreaker-games-ultimate-guide"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">🎯</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Fun Games Guide
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Ultimate collection for teams
                  </div>
                </div>
              </Link>
              <Link
                href="/blog/ice-breaker-games-for-meetings"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">💼</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Meeting Icebreakers
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Perfect for professional settings
                  </div>
                </div>
              </Link>
              <Link
                href="/games?category=team-building"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">👥</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Team Building Games
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Build stronger teams
                  </div>
                </div>
              </Link>
              <Link
                href="/games?category=virtual-meeting"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">💻</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Virtual Meeting Games
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Great for remote teams
                  </div>
                </div>
              </Link>
              <Link
                href="/games?category=social-event"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-3xl mr-4">🎉</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">
                    Social Event Games
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Fun for parties and gatherings
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
