'use client';

import { useState } from 'react';

interface GameCardProps {
  number: number;
  title: string;
  description: string;
  players: string;
  duration: string;
  materials: string;
  fullContent: string;
}

export function GameCard({ number, title, description, players, duration, materials, fullContent }: GameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-red-50/30 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-100 dark:border-red-900/30 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              {number}
            </span>
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Players</div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{players}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{duration}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🎁</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Materials</div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate" title={materials}>
              {materials.length > 15 ? materials.substring(0, 15) + '...' : materials}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span>{isExpanded ? 'Hide Details' : 'View Full Instructions'}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 animate-fadeIn">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {fullContent}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
