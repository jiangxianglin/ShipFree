import { GameCategory, GameDifficulty } from "@/types/game";

/**
 * Raw game data collected from external sources
 */
export interface RawGameData {
  title: string;
  description: string;
  category?: string;
  players?: string;
  duration?: string;
  difficulty?: string;
  materials?: string;
  steps?: string;
  tags?: string[];
}

/**
 * Validation result for game data
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valid game categories
 */
export const VALID_CATEGORIES: GameCategory[] = [
  "Team Building",
  "Virtual Meeting",
  "Classroom",
  "Training",
  "Conference",
  "Social Event",
];

/**
 * Valid game difficulties
 */
export const VALID_DIFFICULTIES: GameDifficulty[] = ["Easy", "Medium", "Hard"];

/**
 * Normalize a title for comparison by converting to lowercase,
 * removing punctuation, and normalizing whitespace
 */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove punctuation
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for measuring similarity between titles
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  // Fill matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Calculate similarity percentage between two titles (0-100)
 * Uses normalized Levenshtein distance
 */
export function calculateSimilarity(title1: string, title2: string): number {
  const normalized1 = normalizeTitle(title1);
  const normalized2 = normalizeTitle(title2);

  if (normalized1 === normalized2) {
    return 100;
  }

  const distance = levenshteinDistance(normalized1, normalized2);
  const maxLength = Math.max(normalized1.length, normalized2.length);

  if (maxLength === 0) {
    return 100;
  }

  const similarity = ((maxLength - distance) / maxLength) * 100;
  return Math.max(0, Math.min(100, similarity));
}

/**
 * Check if a category string is valid
 */
export function isValidCategory(category: string): category is GameCategory {
  return VALID_CATEGORIES.includes(category as GameCategory);
}

/**
 * Check if a difficulty string is valid
 */
export function isValidDifficulty(
  difficulty: string
): difficulty is GameDifficulty {
  return VALID_DIFFICULTIES.includes(difficulty as GameDifficulty);
}

/**
 * Validate game data according to requirements
 * Requirements: 1.3, 5.1, 5.2, 5.3, 5.4
 */
export function validateGameData(game: RawGameData): ValidationResult {
  const errors: string[] = [];

  // Requirement 5.1: Check title is not empty
  if (!game.title || game.title.trim().length === 0) {
    errors.push("Title field is required and cannot be empty");
  }

  // Requirement 5.2: Check description length is at least 20 characters
  if (!game.description || game.description.trim().length < 20) {
    errors.push("Description field must be at least 20 characters long");
  }

  // Requirement 5.3: Check at least one tag exists
  if (!game.tags || game.tags.length === 0) {
    errors.push("At least one tag is required");
  }

  // Requirement 5.4: Check category is valid
  if (game.category && !isValidCategory(game.category)) {
    errors.push(
      `Category must be one of: ${VALID_CATEGORIES.join(", ")}. Got: ${game.category}`
    );
  }

  // Check difficulty is valid if provided
  if (game.difficulty && !isValidDifficulty(game.difficulty)) {
    errors.push(
      `Difficulty must be one of: ${VALID_DIFFICULTIES.join(", ")}. Got: ${game.difficulty}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Duplicate Detector class for identifying duplicate games
 */
export class DuplicateDetector {
  private readonly similarityThreshold: number;

  constructor(similarityThreshold: number = 90) {
    this.similarityThreshold = similarityThreshold;
  }

  /**
   * Check if a new game is a duplicate of any existing game
   * Requirement 2.1, 2.2, 2.3: Compare titles using normalized string comparison
   */
  isDuplicate(
    newGameTitle: string,
    existingGameTitles: string[]
  ): boolean {
    for (const existingTitle of existingGameTitles) {
      const similarity = calculateSimilarity(newGameTitle, existingTitle);
      if (similarity >= this.similarityThreshold) {
        return true;
      }
    }
    return false;
  }

  /**
   * Find all potential duplicates with similarity scores
   */
  findDuplicates(
    newGameTitle: string,
    existingGameTitles: string[]
  ): Array<{ title: string; similarity: number }> {
    const duplicates: Array<{ title: string; similarity: number }> = [];

    for (const existingTitle of existingGameTitles) {
      const similarity = calculateSimilarity(newGameTitle, existingTitle);
      if (similarity >= this.similarityThreshold) {
        duplicates.push({ title: existingTitle, similarity });
      }
    }

    return duplicates;
  }
}

/**
 * Game Validator class for validating game data
 */
export class GameValidator {
  /**
   * Validate a game and return validation result
   */
  validate(game: RawGameData): ValidationResult {
    return validateGameData(game);
  }

  /**
   * Check if category is valid
   */
  isValidCategory(category: string): boolean {
    return isValidCategory(category);
  }

  /**
   * Check if difficulty is valid
   */
  isValidDifficulty(difficulty: string): boolean {
    return isValidDifficulty(difficulty);
  }
}

/**
 * Generate a URL-friendly slug from a string
 * Requirement 3.1, 3.2: Generate slug with lowercase letters, numbers, and hyphens
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Ensure a slug is unique by adding numeric suffix if needed
 * Requirement 3.3: Add numeric suffix to resolve slug conflicts
 * @param slug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug with numeric suffix if needed
 */
export function ensureUniqueSlug(
  slug: string,
  existingSlugs: string[]
): string {
  // If slug is already unique, return it
  if (!existingSlugs.includes(slug)) {
    return slug;
  }

  // Find a unique slug by adding numeric suffix
  let counter = 2;
  let uniqueSlug = `${slug}-${counter}`;

  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }

  return uniqueSlug;
}

/**
 * Generate a unique slug from a title, checking against existing slugs
 * Requirement 3.1, 3.2, 3.3, 3.4: Complete slug generation with uniqueness guarantee
 * @param title - The game title to convert to slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique, URL-friendly slug
 */
export function generateUniqueSlug(
  title: string,
  existingSlugs: string[]
): string {
  const baseSlug = generateSlug(title);
  return ensureUniqueSlug(baseSlug, existingSlugs);
}

/**
 * Slug Generator class for generating unique slugs
 */
export class SlugGenerator {
  private existingSlugs: Set<string>;

  constructor(existingSlugs: string[] = []) {
    this.existingSlugs = new Set(existingSlugs);
  }

  /**
   * Generate a slug from a title
   * Requirement 3.1, 3.2: Generate URL-friendly slug
   */
  generateSlug(title: string): string {
    return generateSlug(title);
  }

  /**
   * Ensure a slug is unique by adding numeric suffix if needed
   * Requirement 3.3: Resolve slug conflicts with numeric suffix
   */
  ensureUnique(slug: string): string {
    const uniqueSlug = ensureUniqueSlug(slug, Array.from(this.existingSlugs));
    this.existingSlugs.add(uniqueSlug);
    return uniqueSlug;
  }

  /**
   * Generate a unique slug from a title
   * Requirement 3.1, 3.2, 3.3, 3.4: Complete slug generation with uniqueness
   */
  generateUniqueSlug(title: string): string {
    const baseSlug = this.generateSlug(title);
    return this.ensureUnique(baseSlug);
  }

  /**
   * Add a slug to the set of existing slugs
   */
  addSlug(slug: string): void {
    this.existingSlugs.add(slug);
  }

  /**
   * Check if a slug already exists
   */
  hasSlug(slug: string): boolean {
    return this.existingSlugs.has(slug);
  }
}
