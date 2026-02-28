import Link from "next/link";

interface CompactGameCardProps {
  number: number;
  title: string;
  description: string;
  players: string;
  duration: string;
  materials: string;
  link: string;
  category?: string;
}

export function CompactGameCard({
  number,
  title,
  description,
  players,
  duration,
  materials,
  link,
  category,
}: CompactGameCardProps) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 dark:border-gray-700/50 group">
      {/* Header with number and category */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl font-bold text-white mr-3">#{number}</span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        {category && (
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-start">
            <span className="text-red-500 mr-2">👥</span>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Players</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{players}</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">⏱️</span>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{duration}</div>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">🎁</span>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Materials</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{materials}</div>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          href={link}
          className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-red-600 to-green-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-green-700 transition-all duration-300 group-hover:shadow-lg"
        >
          View Full Game Details
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
