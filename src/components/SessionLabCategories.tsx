"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Game {
  title: string;
  description: string;
  duration: string;
  players: string;
  difficulty: string;
}

interface CategoryData {
  sessionLabCategories: Record<string, string>;
  gamesByCategory: Record<string, Game[]>;
}

// SessionLab category data in English
const categoryData: CategoryData = {
  "sessionLabCategories": {
    "meeting_icebreakers": "Meeting Icebreakers",
    "quick_5_minute": "Quick 5-Minute Icebreakers",
    "fun_icebreakers": "Fun Icebreakers",
    "virtual_icebreakers": "Virtual Icebreakers",
    "get_to_know": "Get to Know Each Other",
    "team_building_deep": "Team Building & Deep Connection",
    "large_group": "Large Group Activities",
    "teamwork_improvement": "Teamwork Improvement"
  },
  "gamesByCategory": {
    "meeting_icebreakers": [
      {
        "title": "What Are You Bringing to the Meeting?",
        "description": "A mindful check-in where participants write down worries and energy levels, then set them aside for better focus.",
        "duration": "5-10 minutes",
        "players": "5-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Weather Check-in",
        "description": "Share feelings using weather metaphors for a quick group sentiment check.",
        "duration": "3-8 minutes",
        "players": "5-25 people",
        "difficulty": "Easy"
      },
      {
        "title": "Have You Ever? (Stand Up If)",
        "description": "Participants stand if they can answer yes to 'Have you ever...' questions.",
        "duration": "5-10 minutes",
        "players": "8-50 people",
        "difficulty": "Easy"
      },
      {
        "title": "5-4-3-2-1 Grounding Technique",
        "description": "A mindful exercise engaging all senses to help participants be present.",
        "duration": "3-5 minutes",
        "players": "5-30 people",
        "difficulty": "Easy"
      }
    ],
    "quick_5_minute": [
      {
        "title": "One Word at a Time",
        "description": "Groups create sentences by contributing one word each while going around the circle.",
        "duration": "3-8 minutes",
        "players": "6-20 people",
        "difficulty": "Easy"
      },
      {
        "title": "Count Up",
        "description": "Group counts sequentially without speaking over each other or establishing patterns.",
        "duration": "3-10 minutes",
        "players": "8-25 people",
        "difficulty": "Medium"
      },
      {
        "title": "Apple, Orange and Banana",
        "description": "Physical energizer where participants move based on called fruit names.",
        "duration": "3-8 minutes",
        "players": "8-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Name Game",
        "description": "Learn names by repeating previous names before adding your own.",
        "duration": "5-10 minutes",
        "players": "8-20 people",
        "difficulty": "Easy"
      },
      {
        "title": "Line Up",
        "description": "Non-verbal challenge to arrange in order by given criteria without speaking.",
        "duration": "5-10 minutes",
        "players": "10-40 people",
        "difficulty": "Easy"
      }
    ],
    "virtual_icebreakers": [
      {
        "title": "Take a Picture of Your Shoes",
        "description": "Everyone shares a photo of their current shoes and tells the story behind them.",
        "duration": "5-10 minutes",
        "players": "5-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Chat Waterfall",
        "description": "Everyone types answers simultaneously then sends all at once, creating a 'waterfall' effect.",
        "duration": "3-8 minutes",
        "players": "5-50 people",
        "difficulty": "Easy"
      },
      {
        "title": "Emoji Check-In",
        "description": "Participants express their mood or energy using only emojis.",
        "duration": "3-5 minutes",
        "players": "5-50 people",
        "difficulty": "Easy"
      },
      {
        "title": "Remote Change 3 Things",
        "description": "One person changes 3 things about appearance/background while camera is off.",
        "duration": "5-10 minutes",
        "players": "5-20 people",
        "difficulty": "Easy"
      }
    ],
    "get_to_know": [
      {
        "title": "Two Truths and One Lie",
        "description": "Classic game where participants share two truths and one lie about themselves.",
        "duration": "10-15 minutes",
        "players": "4-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Diversity Bingo",
        "description": "Bingo cards with statements about experiences - find people who match each square.",
        "duration": "10-20 minutes",
        "players": "12-50 people",
        "difficulty": "Easy"
      },
      {
        "title": "Unique and Shared",
        "description": "Small groups discover commonalities and unique characteristics of each member.",
        "duration": "15-20 minutes",
        "players": "8-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Speed Dating Icebreaker",
        "description": "Rapid succession of short conversations to maximize networking.",
        "duration": "15-25 minutes",
        "players": "10-40 people",
        "difficulty": "Easy"
      }
    ],
    "fun_icebreakers": [
      {
        "title": "Portrait Gallery",
        "description": "Teams create quick portraits of each other by rotating artists every 15 seconds.",
        "duration": "10-15 minutes",
        "players": "10-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Minefield",
        "description": "Blindfolded participants navigate obstacles guided by teammates' voices.",
        "duration": "10-15 minutes",
        "players": "8-20 people",
        "difficulty": "Medium"
      },
      {
        "title": "Crazy Handshake",
        "description": "Pairs create unique handshakes and teach them to others in rotating partnerships.",
        "duration": "10-15 minutes",
        "players": "8-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "The Movie Pitch Icebreaker",
        "description": "Small groups create and pitch original movie ideas based on themes.",
        "duration": "15-20 minutes",
        "players": "8-30 people",
        "difficulty": "Easy"
      },
      {
        "title": "Bang!",
        "description": "Fast-paced elimination game with sheriff pointing and quick reactions.",
        "duration": "5-10 minutes",
        "players": "8-25 people",
        "difficulty": "Easy"
      }
    ],
    "large_group": [
      {
        "title": "Group Map",
        "description": "Participants position themselves on imaginary world map based on where they grew up.",
        "duration": "10-15 minutes",
        "players": "20-100+ people",
        "difficulty": "Easy"
      },
      {
        "title": "Passions Tic Tac Toe",
        "description": "Fill tic-tac-toe grid with passions, then find others with matching interests.",
        "duration": "15-20 minutes",
        "players": "15-100+ people",
        "difficulty": "Easy"
      }
    ],
    "teamwork_improvement": [
      {
        "title": "Marshmallow Challenge",
        "description": "Build tallest tower using spaghetti, tape, string with marshmallow on top.",
        "duration": "18-25 minutes",
        "players": "8-40 people",
        "difficulty": "Medium"
      },
      {
        "title": "Helium Stick",
        "description": "Team must lower a stick to ground while everyone keeps finger contact.",
        "duration": "10-15 minutes",
        "players": "8-20 people",
        "difficulty": "Medium"
      },
      {
        "title": "Desert Island",
        "description": "Group decides which items to keep for survival on desert island.",
        "duration": "15-25 minutes",
        "players": "6-30 people",
        "difficulty": "Medium"
      }
    ]
  }
};

const categoryIcons: Record<string, string> = {
  meeting_icebreakers: "🏢",
  quick_5_minute: "⚡",
  fun_icebreakers: "🎉",
  virtual_icebreakers: "💻",
  get_to_know: "🤝",
  team_building_deep: "💪",
  large_group: "👥",
  teamwork_improvement: "🚀"
};

const categoryColors: Record<string, string> = {
  meeting_icebreakers: "from-blue-500 to-blue-600",
  quick_5_minute: "from-yellow-500 to-orange-500",
  fun_icebreakers: "from-purple-500 to-pink-500",
  virtual_icebreakers: "from-green-500 to-teal-500",
  get_to_know: "from-indigo-500 to-purple-500",
  team_building_deep: "from-red-500 to-pink-500",
  large_group: "from-cyan-500 to-blue-500",
  teamwork_improvement: "from-emerald-500 to-green-500"
};

const categoryDescriptions: Record<string, string> = {
  meeting_icebreakers: "Perfect for starting team meetings and helping participants mentally arrive",
  quick_5_minute: "Fast activities for tight agendas and quick warm-ups",
  fun_icebreakers: "Entertaining activities that strengthen bonds and create inclusive atmosphere",
  virtual_icebreakers: "Activities designed specifically for online meetings and remote teams",
  get_to_know: "Activities focused on building personal connections and learning about team members",
  team_building_deep: "Activities for building stronger team bonds and deeper relationships",
  large_group: "Icebreakers designed for big groups and events",
  teamwork_improvement: "Games specifically designed to enhance collaboration and team dynamics"
};

export default function SessionLabCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
          <span className="mr-2">🎯</span>
          SessionLab Professional Classification System
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Choose the Perfect Ice Breaker Game by Scenario
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Based on SessionLab's professional classification system, we organize ice breaker games into 8 major categories, each targeting specific use cases and objectives.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Object.entries(categoryData.sessionLabCategories).map(([key, name]) => {
          const gameCount = categoryData.gamesByCategory[key]?.length || 0;
          const isSelected = selectedCategory === key;
          
          return (
            <div
              key={key}
              onClick={() => setSelectedCategory(isSelected ? null : key)}
              className={`
                relative cursor-pointer group transition-all duration-300 transform hover:scale-105
                ${isSelected ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
              `}
            >
              <div className={`
                bg-gradient-to-br ${categoryColors[key]} 
                rounded-2xl p-6 text-white shadow-lg hover:shadow-2xl
                transition-all duration-300
              `}>
                <div className="text-4xl mb-4">{categoryIcons[key]}</div>
                <h3 className="text-lg font-bold mb-2">{name}</h3>
                <p className="text-sm opacity-90 mb-4">
                  {gameCount} games
                </p>
                <div className="flex items-center text-sm opacity-75">
                  <span>Click to explore</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Category Details */}
      {selectedCategory && categoryData.gamesByCategory[selectedCategory] && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <span className="text-4xl mr-4">{categoryIcons[selectedCategory]}</span>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {categoryData.sessionLabCategories[selectedCategory]}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {categoryData.gamesByCategory[selectedCategory].length} curated games
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {categoryDescriptions[selectedCategory]}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryData.gamesByCategory[selectedCategory].map((game, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {game.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {game.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {game.duration}
                  </div>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    {game.players}
                  </div>
                  <div className="flex items-center text-purple-600 dark:text-purple-400">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                    {game.difficulty}
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link
                    href={`/games?search=${encodeURIComponent(game.title)}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    View Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/games?category=${selectedCategory}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              View All {categoryData.sessionLabCategories[selectedCategory]}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Start Using SessionLab's Classification System</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Choose the most suitable ice breaker game category based on your specific needs to achieve optimal results for every activity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/games"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Browse All Games
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}