import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";
import React from "react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

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
      creator: "@icebreakergames",
      site: "@icebreakergames",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Enhanced Markdown Parser with Modern Styling
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="space-y-3 mb-8 pl-6">
          {currentList.map((item, i) => (
            <li key={i} className="relative text-gray-700 dark:text-gray-300 leading-relaxed">
              <span className="absolute -left-6 top-2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={key++} className="text-4xl md:text-5xl font-bold mt-12 mb-8 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
          {parseInline(line.substring(2))}
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={key++} className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white relative">
          <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
          {parseInline(line.substring(3))}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
            {elements.filter(el => React.isValidElement(el) && el.type === 'h3').length + 1}
          </span>
          {parseInline(line.substring(4))}
        </h3>
      );
      continue;
    }

    // Images
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      flushList();
      
      // Check if this is the hero image (first image)
      const isHeroImage = elements.length === 0 || elements.every(el => 
        React.isValidElement(el) && (el.type === 'h1' || el.type === 'script')
      );
      
      // Check if this is a small inline image (based on alt text keywords)
      const isSmallImage = imageMatch[1].toLowerCase().includes('small') || 
                          imageMatch[1].toLowerCase().includes('icon') ||
                          imageMatch[1].toLowerCase().includes('logo');
      
      if (isHeroImage) {
        // Hero image styling - larger and more prominent
        elements.push(
          <div key={key++} className="my-8 group">
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
              <img
                src={imageMatch[2]}
                alt={imageMatch[1]}
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            {imageMatch[1] && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic font-medium">
                {imageMatch[1]}
              </p>
            )}
          </div>
        );
      } else if (isSmallImage) {
        // Small inline images
        elements.push(
          <div key={key++} className="my-4 flex justify-center">
            <div className="relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 p-2 max-w-md">
              <img
                src={imageMatch[2]}
                alt={imageMatch[1]}
                className="w-full h-32 object-cover rounded group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          </div>
        );
      } else {
        // Content images - compact and integrated
        elements.push(
          <div key={key++} className="my-6 group">
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-2">
              <img
                src={imageMatch[2]}
                alt={imageMatch[1]}
                className="w-full h-40 md:h-48 object-cover rounded-lg group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-2 bg-gradient-to-t from-black/15 to-transparent rounded-lg pointer-events-none"></div>
            </div>
            {imageMatch[1] && (
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
                {imageMatch[1]}
              </p>
            )}
          </div>
        );
      }
      continue;
    }

    // List items
    if (line.startsWith('* ') || line.startsWith('- ')) {
      currentList.push(line.substring(2));
      continue;
    }
    
    // Numbered lists
    if (line.match(/^\d+\. /)) {
      flushList();
      elements.push(
        <p key={key++} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          {parseInline(line)}
        </p>
      );
      continue;
    }

    // Paragraphs
    flushList();
    elements.push(
      <p key={key++} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
        {parseInline(line)}
      </p>
    );
  }
  
  flushList();

  return (
    <div className="prose prose-lg max-w-none">
      {elements}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  const parts = [];
  let currentText = text;
  let key = 0;

  while (currentText.length > 0) {
    // Find first occurrence of ** or [
    const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
    const linkMatch = currentText.match(/\[(.*?)\]\((.*?)\)/);

    const boldIndex = boldMatch ? boldMatch.index! : Infinity;
    const linkIndex = linkMatch ? linkMatch.index! : Infinity;

    if (boldIndex === Infinity && linkIndex === Infinity) {
      parts.push(<span key={key++}>{currentText}</span>);
      break;
    }

    if (boldIndex < linkIndex) {
      // Handle bold
      if (boldIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, boldIndex)}</span>);
      }
      parts.push(
        <strong key={key++} className="font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {boldMatch![1]}
        </strong>
      );
      currentText = currentText.substring(boldIndex + boldMatch![0].length);
    } else {
      // Handle link
      if (linkIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, linkIndex)}</span>);
      }
      parts.push(
        <Link 
          key={key++} 
          href={linkMatch![2]} 
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-all duration-300"
        >
          {linkMatch![1]}
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      );
      currentText = currentText.substring(linkIndex + linkMatch![0].length);
    }
  }

  return parts;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

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
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 left-10 w-32 h-32 bg-purple-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <article className="relative container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-8 group transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-blue-100 dark:border-blue-900/50"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <header className="mb-12">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "description": post.excerpt,
                  "image": post.image || "/img/Hero.png",
                  "author": {
                    "@type": "Organization",
                    "name": post.author,
                    "url": "https://www.icebreakergames.site"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Ice Breaker Games",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.icebreakergames.site/img/Hero.png"
                    }
                  },
                  "datePublished": post.date,
                  "dateModified": post.date,
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://www.icebreakergames.site/blog/${post.slug}`
                  },
                  "keywords": post.tags.join(", "),
                  "articleSection": "Team Building",
                  "wordCount": post.content.split(' ').length
                })
              }}
            />
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
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
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{Math.ceil(post.content.split(' ').length / 200)} min read</span>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 md:p-12">
            <MarkdownRenderer content={post.content} />
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Team?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Explore our complete collection of ice breaker games and start building stronger connections today.
              </p>
              <Link
                href="/games"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Browse All Games
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
