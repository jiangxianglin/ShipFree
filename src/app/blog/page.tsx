import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icebreaker Games Blog - Expert Tips & Team Building Ideas",
  description: "Discover expert tips for icebreaker games, team building activities, and meeting energizers. Learn from professionals to engage your team effectively.",
  alternates: {
    canonical: "https://www.icebreakergames.site/blog",
  },
  openGraph: {
    title: "Icebreaker Games Blog - Expert Tips & Team Building Ideas",
    description: "Discover expert tips for icebreaker games, team building activities, and meeting energizers. Learn from professionals to engage your team effectively.",
    type: "website",
    url: "https://www.icebreakergames.site/blog",
    siteName: "Ice Breaker Games",
    images: [
      {
        url: "/img/Hero.png",
        width: 1200,
        height: 630,
        alt: "Icebreaker Games Blog - Expert Tips & Ideas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Icebreaker Games Blog - Expert Tips & Team Building Ideas",
    description: "Discover expert tips for icebreaker games, team building activities, and meeting energizers. Learn from professionals to engage your team effectively.",
    images: ["/img/Hero.png"],
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

export default function BlogIndex() {
  return (
    <>
      {/* Preload critical images */}
      <link rel="preload" as="image" href="/icebreaker-facilitator-training.jpg" />
      <link rel="preload" as="image" href="/team-building-activities.jpg" />
      <link rel="preload" as="image" href="/img/IceBreakerGamesforMeeting-Hero.jpg" />
      
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-100/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-emerald-100/25 rounded-full blur-xl animate-pulse delay-500"></div>
          
          <div className="relative container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-50/90 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6 backdrop-blur-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Expert Insights & Proven Strategies
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Ice Breaker Games
                <span className="block text-4xl md:text-5xl lg:text-6xl mt-2">Blog</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover expert advice, innovative game collections, and proven strategies to transform your meetings and events into engaging, memorable experiences.
              </p>
              
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {blogPosts.length} Expert Articles
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Updated Weekly
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100 dark:border-gray-700/60 hover:scale-[1.02] transform animate-fade-in-up hover:border-emerald-200/70 dark:hover:border-emerald-600/70 modern-card`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Article Image */}
                <div className="h-48 relative overflow-hidden group">
                  <img
                    src={post.image || "/img/Hero.png"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Reading Time Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </span>
                  </div>
                  {/* Latest Badge for newest post */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        Latest
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300 line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-emerald-700 dark:text-emerald-300 font-medium group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors duration-300">
                      <span>Read Article</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {/* Author Avatar */}
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50/90 dark:bg-gray-700/60 px-6 py-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 backdrop-blur-sm border-t border-gray-100/50 dark:border-gray-600/50">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{post.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
