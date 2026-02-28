import Link from "next/link";

interface GameListItemProps {
  number: number;
  title: string;
  description: string;
  players: string;
  duration: string;
  link: string;
}

export function GameListItem({
  number,
  title,
  description,
  players,
  duration,
  link,
}: GameListItemProps) {
  return (
    <Link
      href={link}
      className="group flex gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-red-300 dark:hover:border-red-700"
    >
      {/* Number Badge */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="text-red-500">👥</span>
            {players}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-500">⏱️</span>
            {duration}
          </span>
        </div>
      </div>
    </Link>
  );
}
