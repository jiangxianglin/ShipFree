import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ice Breaker Games Blog - Tips, Tricks & Ideas",
  description: "Read our latest articles about ice breaker games, team building activities, and meeting energizers.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Ice Breaker Games Blog
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Expert advice, game collections, and tips to make your meetings and events more engaging.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <div className="p-6 flex-grow">
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
                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{post.date}</span>
                <span>{post.author}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
