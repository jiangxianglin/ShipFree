"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./session-lab.module.css";

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

const categoryDescriptions: Record<string, string> = {
  meeting_icebreakers:
    "Perfect for starting team meetings and helping participants mentally arrive",
  quick_5_minute: "Fast activities for tight agendas and quick warm-ups",
  fun_icebreakers:
    "Entertaining activities that strengthen bonds and create an inclusive atmosphere",
  virtual_icebreakers:
    "Activities designed specifically for online meetings and remote teams",
  get_to_know:
    "Activities focused on building personal connections and learning about teammates",
  team_building_deep:
    "Activities for building stronger team bonds and deeper relationships",
  large_group: "Icebreakers designed for big groups and events",
  teamwork_improvement:
    "Games designed to enhance collaboration and team dynamics",
};

/** Scenario picker only — section heading lives in page.tsx (SSR). */
export default function SessionLabCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className={styles.root} data-scenario-picker="v2">
      <div className={styles.catGrid}>
        {Object.entries(categoryData.sessionLabCategories).map(([key, name]) => {
          const gameCount = categoryData.gamesByCategory[key]?.length || 0;
          const isSelected = selectedCategory === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedCategory(isSelected ? null : key)}
              className={`${styles.catBtn} ${isSelected ? styles.catBtnSelected : ""}`}
              aria-pressed={isSelected}
            >
              <span className={styles.catLabel}>{gameCount} games</span>
              <span className={styles.catName}>{name}</span>
              <span className={styles.catMeta}>
                {isSelected ? "Hide list" : "Show sample games"}
              </span>
            </button>
          );
        })}
      </div>

      {selectedCategory && categoryData.gamesByCategory[selectedCategory] && (
        <div className={styles.detail}>
          <div className={styles.detailHead}>
            <h3>{categoryData.sessionLabCategories[selectedCategory]}</h3>
            <p>{categoryDescriptions[selectedCategory]}</p>
          </div>

          <div className={styles.gameList}>
            {categoryData.gamesByCategory[selectedCategory].map((game) => (
              <article key={game.title} className={styles.gameItem}>
                <h4 className={styles.gameTitle}>{game.title}</h4>
                <p className={styles.gameDesc}>{game.description}</p>
                <div className={styles.metaRow}>
                  <span className={styles.meta}>{game.duration}</span>
                  <span className={styles.meta}>{game.players}</span>
                  <span className={styles.meta}>{game.difficulty}</span>
                </div>
                <Link
                  href={`/games?search=${encodeURIComponent(game.title)}`}
                  className={styles.gameLink}
                >
                  Search in library →
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.detailCta}>
            <Link href="/games" className={styles.ctaPrimary}>
              Browse all games
            </Link>
          </div>
        </div>
      )}

      <div className={styles.footerLinks}>
        <Link href="/games">Browse the full library →</Link>
        <Link href="/blog">Facilitator guides →</Link>
      </div>
    </div>
  );
}