import { christmasTableGamesOptimized } from "@/data/christmas-table-games-blog-optimized";
import { GameCard } from "@/components/blog/GameCard";
import { SimpleTableOfContents } from "@/components/blog/SimpleTableOfContents";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const post = christmasTableGamesOptimized;
  const url = `https://www.icebreakergames.site/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      url: url,
      siteName: "Ice Breaker Games",
      images: [
        {
          url: post.image || "/img/Hero.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/img/Hero.png"],
    },
    keywords: [
      'christmas table games',
      'christmas icebreaker games',
      'holiday dinner games',
      'christmas party games',
      'table icebreakers',
    ],
  };
}

export default function ChristmasTableGamesOptimized() {
  const post = christmasTableGamesOptimized;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-D5XT9FCNRG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D5XT9FCNRG');
        `}
      </Script>
      
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Table of Contents - Fixed on right side */}
        <SimpleTableOfContents />
        
        <article className="relative container mx-auto px-4 py-12 max-w-5xl lg:pr-96">
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

          {/* Introduction */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                {post.intro}
              </p>
            </div>
          </div>

          {/* Games Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
              <span className="text-4xl mr-3">🎄</span>
              15 Christmas Table Games
            </h2>
            
            <div className="grid gap-6">
              {post.games.map((game) => (
                <GameCard
                  key={game.number}
                  number={game.number}
                  title={game.title}
                  description={game.description}
                  players={game.players}
                  duration={game.duration}
                  materials={game.materials}
                  fullContent={game.fullContent}
                />
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-red-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-xl p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.quickTips}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.faq}
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-red-100 to-green-100 dark:from-red-900/30 dark:to-green-900/30 rounded-3xl shadow-xl p-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {post.conclusion}
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">🎄 Ready for Your Best Christmas Dinner Yet?</h3>
              <p className="text-red-100 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of Christmas icebreaker games and make this holiday season unforgettable!
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
        </article>
      </div>
    </>
  );
}
