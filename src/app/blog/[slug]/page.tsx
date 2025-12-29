import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

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
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Simple Markdown Parser
function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentList: string[] = [];
  let key = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-5 mb-4">
          {currentList.map((item, i) => (
            <li key={i} className="mb-2">{parseInline(item)}</li>
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
      elements.push(<h1 key={key++} className="text-3xl font-bold mt-8 mb-4">{parseInline(line.substring(2))}</h1>);
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={key++} className="text-2xl font-bold mt-6 mb-3">{parseInline(line.substring(3))}</h2>);
      continue;
    }
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={key++} className="text-xl font-bold mt-5 mb-2">{parseInline(line.substring(4))}</h3>);
      continue;
    }

    // Images
    const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imageMatch) {
      flushList();
      elements.push(
        <div key={key++} className="my-8 flex flex-col items-center">
          <div className="relative w-full max-w-lg">
            <img
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>
          {imageMatch[1] && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">{imageMatch[1]}</p>
          )}
        </div>
      );
      continue;
    }

    // List items
    if (line.startsWith('* ')) {
      currentList.push(line.substring(2));
      continue;
    }
    
    // Numbered lists (treated as bullet points for simplicity in this custom parser, or we can handle them)
    if (line.match(/^\d+\. /)) {
        // For now, let's just treat them as paragraphs or we could implement an ordered list buffer
        // Let's just output them as a paragraph to avoid complex state
        flushList();
        elements.push(<p key={key++} className="mb-4">{parseInline(line)}</p>);
        continue;
    }

    // Paragraphs
    flushList();
    elements.push(<p key={key++} className="mb-4">{parseInline(line)}</p>);
  }
  
  flushList();

  return (
    <div className="prose prose-blue dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
      {elements}
    </div>
  );
}

function parseInline(text: string): React.ReactNode[] {
  // This is a very basic parser. 
  // It handles **bold** and [link](url)
  // It splits by special chars and maps
  
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
      parts.push(<strong key={key++}>{boldMatch![1]}</strong>);
      currentText = currentText.substring(boldIndex + boldMatch![0].length);
    } else {
      // Handle link
      if (linkIndex > 0) {
        parts.push(<span key={key++}>{currentText.substring(0, linkIndex)}</span>);
      }
      parts.push(
        <Link key={key++} href={linkMatch![2]} className="text-blue-600 hover:underline">
          {linkMatch![1]}
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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:underline mb-8"
        >
          ← Back to Blog
        </Link>
        
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>
        </header>

        <div className="prose prose-lg prose-blue dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
}
