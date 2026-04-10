import { readFileSync, writeFileSync, copyFileSync, existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import { generateSlug } from "../src/lib/utils/slug";
import {
  RawGameData,
  GameValidator,
  DuplicateDetector,
  SlugGenerator,
  VALID_CATEGORIES,
} from "../src/lib/utils/game-enrichment";
import { GameCategory, GameDifficulty } from "../src/types/game";

/**
 * Processed game data ready for database insertion
 */
interface ProcessedGame {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  players: string | null;
  duration: string | null;
  difficulty: GameDifficulty | null;
  materials: string | null;
  steps: string | null;
  tags: string[];
  image: string | null;
}

/**
 * Statistics about the processing run
 */
interface ProcessingStats {
  totalCollected: number;
  validGames: number;
  invalidGames: number;
  duplicates: number;
  processed: number;
}

/**
 * Validation failure log entry
 */
interface ValidationFailure {
  title: string;
  timestamp: string;
  errors: string[];
  rawData: RawGameData;
}

/**
 * Map category strings to valid GameCategory values
 * Handles variations and common aliases
 */
function mapCategory(category: string | undefined): GameCategory {
  if (!category) {
    return "Team Building"; // Default category
  }

  // Normalize the category string
  const normalized = category.trim();

  // Check if it's already a valid category
  if (VALID_CATEGORIES.includes(normalized as GameCategory)) {
    return normalized as GameCategory;
  }

  // Map common variations
  const lowerCategory = normalized.toLowerCase();

  // Team Building - collaboration, teamwork
  if (
    lowerCategory.includes("team") ||
    lowerCategory.includes("collaboration")
  ) {
    return "Team Building";
  }

  // Virtual Meeting - remote, online, virtual
  if (
    lowerCategory.includes("virtual") ||
    lowerCategory.includes("remote")
  ) {
    return "Virtual Meeting";
  }

  // Classroom - education, student
  if (
    lowerCategory.includes("classroom") ||
    lowerCategory.includes("student") ||
    lowerCategory.includes("education")
  ) {
    return "Classroom";
  }

  // Training - workshop, professional development
  if (
    lowerCategory.includes("training") ||
    lowerCategory.includes("workshop") ||
    lowerCategory.includes("professional")
  ) {
    return "Training";
  }

  // Conference - networking, business events
  if (
    lowerCategory.includes("conference") ||
    lowerCategory.includes("networking")
  ) {
    return "Conference";
  }

  // Social Event - catch-all for social activities, games, icebreakers, etc.
  // This includes: introductions, ice breakers, games, energizers, fun activities,
  // problem-solving games, brainstorming, discussions, meetings
  if (
    lowerCategory.includes("social") ||
    lowerCategory.includes("party") ||
    lowerCategory.includes("ice breaker") ||
    lowerCategory.includes("icebreaker") ||
    lowerCategory.includes("introductions") ||
    lowerCategory.includes("games") ||
    lowerCategory.includes("energizer") ||
    lowerCategory.includes("fun") ||
    lowerCategory.includes("problem-solving") ||
    lowerCategory.includes("brainstorming") ||
    lowerCategory.includes("discussion") ||
    lowerCategory.includes("meeting") ||
    lowerCategory.includes("event")
  ) {
    return "Social Event";
  }

  // Default fallback
  return "Social Event";
}

/**
 * Map difficulty strings to valid GameDifficulty values
 */
function mapDifficulty(
  difficulty: string | undefined
): GameDifficulty | null {
  if (!difficulty) {
    return null;
  }

  const normalized = difficulty.trim().toLowerCase();

  if (normalized === "easy") return "Easy";
  if (normalized === "medium") return "Medium";
  if (normalized === "hard") return "Hard";

  // Default to Easy if unclear
  return "Easy";
}

/**
 * Load existing games from the seed file
 */
function loadExistingGames(): Array<{ title: string; slug: string }> {
  try {
    const seedFilePath = resolve(
      process.cwd(),
      "src/db/seed/games-supabase.ts"
    );
    const seedFileContent = readFileSync(seedFilePath, "utf-8");

    // Extract game titles and slugs from the seed file
    // This is a simple regex-based extraction
    const titleMatches = seedFileContent.matchAll(/title:\s*"([^"]+)"/g);
    const slugMatches = seedFileContent.matchAll(/slug:\s*generateSlug\("([^"]+)"\)/g);

    const titles = Array.from(titleMatches).map((match) => match[1]);
    const slugs = titles.map((title) => generateSlug(title));

    return titles.map((title, index) => ({
      title,
      slug: slugs[index],
    }));
  } catch (error) {
    console.error("Error loading existing games:", error);
    return [];
  }
}

/**
 * Load raw game data from the collection file
 */
function loadRawGames(): RawGameData[] {
  try {
    const dataFilePath = resolve(
      process.cwd(),
      "data/raw-games-collection.json"
    );
    const fileContent = readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(fileContent);

    return data.games || [];
  } catch (error) {
    console.error("Error loading raw games:", error);
    throw error;
  }
}

/**
 * Process raw game data into database-ready format
 * Requirements: 1.2, 1.3, 1.4, 1.5, 2.5, 3.1, 3.4
 */
function processGames(): {
  games: ProcessedGame[];
  stats: ProcessingStats;
} {
  console.log("Starting game data processing...\n");

  // Initialize utilities
  const validator = new GameValidator();
  const duplicateDetector = new DuplicateDetector(90); // 90% similarity threshold

  // Load existing games
  const existingGames = loadExistingGames();
  const existingTitles = existingGames.map((g) => g.title);
  const existingSlugs = existingGames.map((g) => g.slug);

  console.log(`Loaded ${existingGames.length} existing games from seed file\n`);

  // Initialize slug generator with existing slugs
  const slugGenerator = new SlugGenerator(existingSlugs);

  // Load raw games
  const rawGames = loadRawGames();
  console.log(`Loaded ${rawGames.length} raw games from collection\n`);

  // Statistics
  const stats: ProcessingStats = {
    totalCollected: rawGames.length,
    validGames: 0,
    invalidGames: 0,
    duplicates: 0,
    processed: 0,
  };

  const processedGames: ProcessedGame[] = [];
  const skippedGames: Array<{
    title: string;
    reason: string;
    details?: string;
  }> = [];
  
  // Requirement 4.5: Track validation failures for logging
  const validationFailures: ValidationFailure[] = [];

  // Process each raw game
  for (const rawGame of rawGames) {
    // Requirement 1.4, 1.5: Map category and difficulty FIRST
    // This ensures validation works with mapped values
    const mappedCategory = mapCategory(rawGame.category);
    const mappedDifficulty = mapDifficulty(rawGame.difficulty);

    // Create a game object with mapped values for validation
    const gameToValidate: RawGameData = {
      ...rawGame,
      category: mappedCategory,
      difficulty: mappedDifficulty || undefined,
    };

    // Requirement 1.3, 5.1-5.5: Validate game data
    const validationResult = validator.validate(gameToValidate);

    if (!validationResult.isValid) {
      stats.invalidGames++;
      
      // Requirement 4.5: Log validation failure
      validationFailures.push({
        title: rawGame.title || "Unknown",
        timestamp: new Date().toISOString(),
        errors: validationResult.errors,
        rawData: rawGame
      });
      
      skippedGames.push({
        title: rawGame.title || "Unknown",
        reason: "Validation failed",
        details: validationResult.errors.join("; "),
      });
      console.log(
        `❌ Skipped "${rawGame.title}": ${validationResult.errors.join(", ")}`
      );
      continue;
    }

    stats.validGames++;

    // Requirement 2.1, 2.2, 2.3, 2.4: Check for duplicates
    const isDuplicate = duplicateDetector.isDuplicate(
      rawGame.title,
      existingTitles
    );

    if (isDuplicate) {
      stats.duplicates++;
      const duplicateMatches = duplicateDetector.findDuplicates(
        rawGame.title,
        existingTitles
      );
      skippedGames.push({
        title: rawGame.title,
        reason: "Duplicate detected",
        details: `Similar to: ${duplicateMatches.map((d) => `${d.title} (${d.similarity.toFixed(1)}%)`).join(", ")}`,
      });
      console.log(
        `⚠️  Skipped "${rawGame.title}": Duplicate (similar to ${duplicateMatches[0].title})`
      );
      continue;
    }

    // Requirement 3.1, 3.2, 3.3, 3.4: Generate unique slug
    const slug = slugGenerator.generateUniqueSlug(rawGame.title);

    // Create processed game object (using already-mapped values)
    const processedGame: ProcessedGame = {
      id: crypto.randomUUID(),
      slug,
      title: rawGame.title,
      description: rawGame.description,
      category: mappedCategory,
      players: rawGame.players || null,
      duration: rawGame.duration || null,
      difficulty: mappedDifficulty,
      materials: rawGame.materials || null,
      steps: rawGame.steps || null,
      tags: rawGame.tags || [],
      image: null,
    };

    processedGames.push(processedGame);
    stats.processed++;

    // Add to existing titles to check future duplicates
    existingTitles.push(rawGame.title);

    console.log(`✅ Processed "${rawGame.title}" → ${mappedCategory} (${slug})`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("PROCESSING SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total collected games: ${stats.totalCollected}`);
  console.log(`Valid games: ${stats.validGames}`);
  console.log(`Invalid games: ${stats.invalidGames}`);
  console.log(`Duplicates detected: ${stats.duplicates}`);
  console.log(`Successfully processed: ${stats.processed}`);
  console.log("=".repeat(60) + "\n");

  if (skippedGames.length > 0) {
    console.log("SKIPPED GAMES:");
    console.log("-".repeat(60));
    skippedGames.forEach((game) => {
      console.log(`\n"${game.title}"`);
      console.log(`  Reason: ${game.reason}`);
      if (game.details) {
        console.log(`  Details: ${game.details}`);
      }
    });
    console.log("\n" + "-".repeat(60) + "\n");
  }

  // Requirement 4.5: Log validation failures
  if (validationFailures.length > 0) {
    logValidationFailures(validationFailures);
  }

  return { games: processedGames, stats };
}

/**
 * Read the existing seed file content
 * Requirements: 4.1
 */
function readSeedFile(): string {
  try {
    const seedFilePath = resolve(
      process.cwd(),
      "src/db/seed/games-supabase.ts"
    );
    return readFileSync(seedFilePath, "utf-8");
  } catch (error) {
    console.error("Error reading seed file:", error);
    throw error;
  }
}

/**
 * Format a processed game as a TypeScript object string
 * Requirements: 4.3
 */
function formatGameObject(game: ProcessedGame, indent: string = "  "): string {
  const lines: string[] = [];
  
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: crypto.randomUUID(),`);
  lines.push(`${indent}  slug: generateSlug("${game.title.replace(/"/g, '\\"')}"),`);
  lines.push(`${indent}  title: "${game.title.replace(/"/g, '\\"')}",`);
  lines.push(`${indent}  description: "${game.description.replace(/"/g, '\\"').replace(/\n/g, ' ')}",`);
  lines.push(`${indent}  category: "${game.category}",`);
  lines.push(`${indent}  players: ${game.players ? `"${game.players.replace(/"/g, '\\"')}"` : 'null'},`);
  lines.push(`${indent}  duration: ${game.duration ? `"${game.duration.replace(/"/g, '\\"')}"` : 'null'},`);
  lines.push(`${indent}  difficulty: ${game.difficulty ? `"${game.difficulty}"` : 'null'},`);
  lines.push(`${indent}  materials: ${game.materials ? `"${game.materials.replace(/"/g, '\\"').replace(/\n/g, ' ')}"` : 'null'},`);
  lines.push(`${indent}  steps: ${game.steps ? `"${game.steps.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"` : 'null'},`);
  lines.push(`${indent}  tags: [${game.tags.map(tag => `"${tag.replace(/"/g, '\\"')}"`).join(", ")}],`);
  lines.push(`${indent}  image: null,`);
  lines.push(`${indent}},`);
  
  return lines.join('\n');
}

/**
 * Create a backup of the seed file
 * Requirements: 4.5
 */
function createBackup(filePath: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = filePath.replace('.ts', `.backup-${timestamp}.ts`);
  
  try {
    copyFileSync(filePath, backupPath);
    console.log(`📦 Backup created: ${backupPath}`);
    return backupPath;
  } catch (error) {
    console.error("Error creating backup:", error);
    throw new Error(`Failed to create backup: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Restore from backup
 * Requirements: 4.5
 */
function restoreFromBackup(originalPath: string, backupPath: string): void {
  try {
    if (existsSync(backupPath)) {
      copyFileSync(backupPath, originalPath);
      console.log(`♻️  Restored from backup: ${backupPath}`);
    } else {
      throw new Error(`Backup file not found: ${backupPath}`);
    }
  } catch (error) {
    console.error("Error restoring from backup:", error);
    throw new Error(`Failed to restore from backup: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Clean up backup file
 * Requirements: 4.5
 */
function cleanupBackup(backupPath: string): void {
  try {
    if (existsSync(backupPath)) {
      unlinkSync(backupPath);
      console.log(`🗑️  Backup cleaned up: ${backupPath}`);
    }
  } catch (error) {
    console.warn(`Warning: Could not clean up backup file: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Log validation failures to a file
 * Requirements: 4.5
 */
function logValidationFailures(failures: ValidationFailure[]): void {
  if (failures.length === 0) {
    return;
  }

  try {
    const logFilePath = resolve(process.cwd(), "data/validation-failures.json");
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      timestamp,
      totalFailures: failures.length,
      failures: failures.map(f => ({
        title: f.title,
        timestamp: f.timestamp,
        errors: f.errors,
        rawData: f.rawData
      }))
    };

    // Read existing log if it exists
    let existingLog: any[] = [];
    if (existsSync(logFilePath)) {
      try {
        const existingContent = readFileSync(logFilePath, "utf-8");
        existingLog = JSON.parse(existingContent);
        if (!Array.isArray(existingLog)) {
          existingLog = [existingLog];
        }
      } catch (parseError) {
        console.warn("Warning: Could not parse existing validation log, creating new log");
        existingLog = [];
      }
    }

    // Append new log entry
    existingLog.push(logEntry);

    // Write updated log
    writeFileSync(logFilePath, JSON.stringify(existingLog, null, 2), "utf-8");
    console.log(`📝 Validation failures logged to: ${logFilePath}`);
  } catch (error) {
    console.error("Error logging validation failures:", error);
    // Don't throw - logging failures shouldn't stop the process
  }
}

/**
 * Append new games to the seed file with backup and error handling
 * Requirements: 4.2, 4.3, 4.4, 4.5
 */
function appendToSeedFile(newGames: ProcessedGame[]): void {
  if (newGames.length === 0) {
    console.log("No new games to append to seed file.");
    return;
  }

  const seedFilePath = resolve(
    process.cwd(),
    "src/db/seed/games-supabase.ts"
  );
  
  let backupPath: string | null = null;

  try {
    // Requirement 4.5: Create backup before modifying the file
    backupPath = createBackup(seedFilePath);
    
    // Read the existing file content
    const fileContent = readSeedFile();
    
    // Find the position to insert new games
    // Look for the closing bracket of the seedGames array
    const seedGamesArrayEndPattern = /\];[\s\n]*async function runSeed\(\)/;
    const match = fileContent.match(seedGamesArrayEndPattern);
    
    if (!match || match.index === undefined) {
      throw new Error("Could not find the end of seedGames array in the seed file");
    }
    
    // Find the position just before the closing bracket
    const insertPosition = match.index;
    
    // Format the new games
    const formattedGames = newGames.map(game => formatGameObject(game)).join('\n');
    
    // Insert the new games before the closing bracket
    const beforeInsert = fileContent.substring(0, insertPosition);
    const afterInsert = fileContent.substring(insertPosition);
    
    // Construct the new file content
    const newFileContent = beforeInsert + formattedGames + '\n' + afterInsert;
    
    // Requirement 4.5: Write with error handling
    try {
      writeFileSync(seedFilePath, newFileContent, "utf-8");
    } catch (writeError) {
      throw new Error(`Failed to write to seed file: ${writeError instanceof Error ? writeError.message : String(writeError)}`);
    }
    
    console.log(`\n✅ Successfully appended ${newGames.length} new games to seed file!`);
    console.log(`   File: ${seedFilePath}\n`);
    
    // Requirement 4.5: Clean up backup after successful write
    if (backupPath) {
      cleanupBackup(backupPath);
    }
  } catch (error) {
    console.error("\n❌ Error appending to seed file:", error);
    
    // Requirement 4.5: Restore from backup on error
    if (backupPath) {
      console.log("\n🔄 Attempting to restore from backup...");
      try {
        restoreFromBackup(seedFilePath, backupPath);
        console.log("✅ Successfully restored from backup");
      } catch (restoreError) {
        console.error("❌ Failed to restore from backup:", restoreError);
        console.error("⚠️  Manual intervention required!");
        console.error(`   Backup location: ${backupPath}`);
      }
    }
    
    throw error;
  }
}

/**
 * Main execution function
 */
function main() {
  try {
    const { games, stats } = processGames();

    console.log("\nPROCESSED GAMES:");
    console.log("=".repeat(60));
    games.forEach((game, index) => {
      console.log(
        `${index + 1}. ${game.title} (${game.category}) - ${game.slug}`
      );
    });
    console.log("=".repeat(60) + "\n");

    console.log(
      `\n✨ Processing complete! ${stats.processed} new games ready to be added.\n`
    );

    // Append new games to seed file
    if (games.length > 0) {
      console.log("Updating seed file...");
      appendToSeedFile(games);
    }

    // Export the games array for use in other scripts
    return games;
  } catch (error) {
    console.error("Error processing games:", error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export for use in other scripts
export { 
  processGames, 
  appendToSeedFile, 
  readSeedFile,
  createBackup,
  restoreFromBackup,
  logValidationFailures
};
export type { ProcessedGame, ValidationFailure };
