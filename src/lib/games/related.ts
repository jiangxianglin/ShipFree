import { getAllGames } from "@/db/queries/games";
import { getGameHeroPath } from "@/lib/games/media";
import type { Game } from "@/types/game";

export type RelatedGameItem = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  /** Visible / SEO anchor text for the link */
  anchorText: string;
};

/** Curated clusters — high-traffic pages push weight to weaker siblings first. */
const CURATED_RELATED: Record<string, string[]> = {
  chainlink: [
    "the-name-game",
    "emoji-introduction",
    "two-truths-and-a-lie",
    "find-your-match",
  ],
  "portrait-gallery": [
    "the-name-game",
    "emoji-introduction",
    "picture-sharing",
    "find-your-match",
  ],
  "emoji-introduction": [
    "portrait-gallery",
    "the-name-game",
    "picture-sharing",
    "emoji-check-in",
  ],
  "the-name-game": [
    "chainlink",
    "alliterative-name-game",
    "motion-name-game",
    "blind-name-tag",
  ],
  "two-truths-and-a-lie": [
    "emoji-introduction",
    "the-name-game",
    "find-your-match",
    "six-word-memoirs",
  ],
  "find-your-match": [
    "human-bingo",
    "the-name-game",
    "chainlink",
    "emoji-introduction",
  ],
  "human-bingo": [
    "find-your-match",
    "icebreaker-bingo",
    "mingle-bingo",
    "the-name-game",
  ],
  "name-that-movie-quote": [
    "two-truths-and-a-lie",
    "emoji-introduction",
    "storytelling-circle",
    "the-name-game",
  ],
};

/** Exact-ish anchors for SEO boosts (keep diversified elsewhere). */
const ANCHOR_OVERRIDES: Record<string, Record<string, string>> = {
  chainlink: {
    "the-name-game": "how to play the name game",
  },
  "portrait-gallery": {
    "the-name-game": "how to play the name game",
  },
};

function truncateBlurb(text: string, max = 110) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

function defaultAnchor(title: string) {
  return `${title} icebreaker`;
}

function toRelatedItem(
  game: Game,
  fromSlug: string
): RelatedGameItem {
  const override = ANCHOR_OVERRIDES[fromSlug]?.[game.slug];
  return {
    slug: game.slug,
    title: game.title,
    blurb: truncateBlurb(game.description),
    image: getGameHeroPath(game),
    anchorText: override ?? defaultAnchor(game.title),
  };
}

/**
 * Pick 3–4 related games: curated first, then same category, then fill.
 */
export async function getRelatedGames(
  game: Pick<Game, "slug" | "category" | "title">,
  limit = 4
): Promise<RelatedGameItem[]> {
  const all = await getAllGames();
  const bySlug = new Map(all.map((g) => [g.slug, g]));
  const picked: Game[] = [];
  const seen = new Set<string>([game.slug]);

  const pushSlug = (slug: string) => {
    if (seen.has(slug) || picked.length >= limit) return;
    const next = bySlug.get(slug);
    if (!next) return;
    seen.add(slug);
    picked.push(next);
  };

  for (const slug of CURATED_RELATED[game.slug] ?? []) {
    pushSlug(slug);
  }

  for (const candidate of all) {
    if (picked.length >= limit) break;
    if (candidate.category === game.category) pushSlug(candidate.slug);
  }

  for (const candidate of all) {
    if (picked.length >= limit) break;
    pushSlug(candidate.slug);
  }

  return picked.map((g) => toRelatedItem(g, game.slug));
}
