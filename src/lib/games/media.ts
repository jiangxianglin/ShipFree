import { existsSync } from "fs";
import path from "path";
import type { Game, GameCategory } from "@/types/game";

const PUBLIC_IMG = path.join(process.cwd(), "public", "img", "games");

const CATEGORY_FALLBACK: Record<GameCategory, string> = {
  Classroom: "/img/games/_fallback-classroom.jpg",
  "Virtual Meeting": "/img/games/_fallback-virtual.jpg",
  "Team Building": "/img/games/_fallback-team.jpg",
  Training: "/img/games/_fallback-training.jpg",
  Conference: "/img/games/_fallback-conference.jpg",
  "Social Event": "/img/games/_fallback-social.jpg",
};

const DEFAULT_FALLBACK = "/img/games/_fallback-default.jpg";

function publicExists(webPath: string): boolean {
  const relative = webPath.replace(/^\//, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}

function isLifestyleJpg(src: string | null | undefined): src is string {
  if (!src) return false;
  const lower = src.toLowerCase();
  if (!lower.endsWith(".jpg") && !lower.endsWith(".jpeg")) return false;
  // Prefer editorial lifestyle assets; skip obvious legacy cartoon paths
  if (lower.includes("two-truths-and-a-lie.png")) return false;
  return true;
}

export function getGameHeroConventionPath(slug: string): string {
  return `/img/games/${slug}-hero.jpg`;
}

export function getGameSceneConventionPath(slug: string): string {
  return `/img/games/${slug}-scene.jpg`;
}

export function getCategoryFallback(category: GameCategory): string {
  return CATEGORY_FALLBACK[category] ?? DEFAULT_FALLBACK;
}

/**
 * Resolve hero image for a game detail page.
 * Prefer generated PNW lifestyle asset, then lifestyle JPG on the game record,
 * then category fallback.
 */
export function getGameHeroPath(game: Pick<Game, "slug" | "category" | "image">): string {
  const convention = getGameHeroConventionPath(game.slug);
  if (publicExists(convention)) return convention;

  if (isLifestyleJpg(game.image) && publicExists(game.image)) {
    return game.image;
  }

  const categoryPath = getCategoryFallback(game.category);
  if (publicExists(categoryPath)) return categoryPath;

  return DEFAULT_FALLBACK;
}

/**
 * Resolve mid-page scene image for a game detail page.
 */
export function getGameScenePath(game: Pick<Game, "slug" | "category" | "image">): string {
  const convention = getGameSceneConventionPath(game.slug);
  if (publicExists(convention)) return convention;

  // Fall back to hero (generated or category) so story band always has a photo
  return getGameHeroPath(game);
}

export function getGameHeroAbsoluteUrl(
  game: Pick<Game, "slug" | "category" | "image">,
  siteUrl = "https://www.icebreakergames.site"
): string {
  const rel = getGameHeroPath(game);
  try {
    return new URL(rel, siteUrl).toString();
  } catch {
    return new URL(DEFAULT_FALLBACK, siteUrl).toString();
  }
}

/** Used by generation scripts — absolute disk dir for game images */
export function getGamesImageDir(): string {
  return PUBLIC_IMG;
}
