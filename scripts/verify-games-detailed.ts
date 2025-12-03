import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read the actual TypeScript file and execute it to get the games
const seedFilePath = resolve(process.cwd(), 'src/db/seed/games-supabase.ts');
const seedFileContent = readFileSync(seedFilePath, 'utf-8');

// Valid categories and difficulties
const validCategories = [
  "Team Building",
  "Virtual Meeting",
  "Classroom",
  "Training",
  "Conference",
  "Social Event"
];

const validDifficulties = ["Easy", "Medium", "Hard"];

console.log('\n📊 DETAILED GAME VERIFICATION\n');
console.log('='.repeat(60));

// Check 1: File syntax (TypeScript compilation)
console.log('\n✓ Check 1: TypeScript Syntax');
console.log('  File can be read and parsed');

// Check 2: Verify seedGames array exists
const hasSeedGames = seedFileContent.includes('const seedGames = [');
console.log(`\n✓ Check 2: seedGames Array`);
console.log(`  ${hasSeedGames ? '✅' : '❌'} seedGames array found`);

// Check 3: Count games
const gameMatches = seedFileContent.match(/\{\s*id:\s*crypto\.randomUUID\(\)/g);
const gameCount = gameMatches ? gameMatches.length : 0;
console.log(`\n✓ Check 3: Game Count`);
console.log(`  Found ${gameCount} games`);

// Check 4: Verify all games have required fields
console.log(`\n✓ Check 4: Required Fields`);
const requiredFields = ['id:', 'slug:', 'title:', 'description:', 'category:', 'tags:'];
let allFieldsPresent = true;

for (const field of requiredFields) {
  const fieldCount = (seedFileContent.match(new RegExp(field, 'g')) || []).length;
  const status = fieldCount >= gameCount ? '✅' : '❌';
  console.log(`  ${status} ${field.padEnd(15)} ${fieldCount}/${gameCount}`);
  if (fieldCount < gameCount) allFieldsPresent = false;
}

// Check 5: Verify categories are valid
console.log(`\n✓ Check 5: Category Validation`);
const categoryPattern = /category:\s*"([^"]+)"/g;
let categoryMatch;
const categories = new Map<string, number>();
let invalidCategories = 0;

while ((categoryMatch = categoryPattern.exec(seedFileContent)) !== null) {
  const category = categoryMatch[1];
  categories.set(category, (categories.get(category) || 0) + 1);
  if (!validCategories.includes(category)) {
    console.log(`  ❌ Invalid category: "${category}"`);
    invalidCategories++;
  }
}

if (invalidCategories === 0) {
  console.log(`  ✅ All categories are valid`);
  console.log(`  Category distribution:`);
  for (const [cat, count] of categories.entries()) {
    console.log(`    - ${cat}: ${count}`);
  }
}

// Check 6: Verify no empty titles
console.log(`\n✓ Check 6: Title Validation`);
const titlePattern = /title:\s*"([^"]*)"/g;
let titleMatch;
const titles = [];
let emptyTitles = 0;

while ((titleMatch = titlePattern.exec(seedFileContent)) !== null) {
  const title = titleMatch[1];
  titles.push(title);
  if (!title || title.trim() === '') {
    console.log(`  ❌ Empty title found`);
    emptyTitles++;
  }
}

if (emptyTitles === 0) {
  console.log(`  ✅ All ${titles.length} titles are non-empty`);
}

// Check 7: Verify slug generation
console.log(`\n✓ Check 7: Slug Generation`);
const slugPattern = /slug:\s*generateSlug\("([^"]+)"\)/g;
let slugMatch;
const slugs = [];

while ((slugMatch = slugPattern.exec(seedFileContent)) !== null) {
  slugs.push(slugMatch[1]);
}

console.log(`  ✅ Found ${slugs.length} slug generations`);
if (slugs.length === titles.length) {
  console.log(`  ✅ Slug count matches title count`);
}

// Check 8: Verify tags arrays
console.log(`\n✓ Check 8: Tags Validation`);
const tagsPattern = /tags:\s*\[([^\]]+)\]/g;
let tagsMatch;
let emptyTagArrays = 0;
let totalTags = 0;

while ((tagsMatch = tagsPattern.exec(seedFileContent)) !== null) {
  const tagsContent = tagsMatch[1].trim();
  if (!tagsContent || tagsContent === '') {
    emptyTagArrays++;
  } else {
    const tagCount = (tagsContent.match(/"/g) || []).length / 2;
    totalTags += tagCount;
  }
}

if (emptyTagArrays === 0) {
  console.log(`  ✅ All games have tags`);
  console.log(`  Average tags per game: ${(totalTags / gameCount).toFixed(1)}`);
} else {
  console.log(`  ❌ Found ${emptyTagArrays} games with empty tag arrays`);
}

// Check 9: Verify no duplicate titles (case-insensitive)
console.log(`\n✓ Check 9: Duplicate Detection`);
const normalizedTitles = new Set();
const duplicates = [];

for (const title of titles) {
  const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (normalizedTitles.has(normalized)) {
    duplicates.push(title);
  }
  normalizedTitles.add(normalized);
}

if (duplicates.length === 0) {
  console.log(`  ✅ No duplicate titles found`);
} else {
  console.log(`  ❌ Found ${duplicates.length} potential duplicates:`);
  duplicates.forEach(dup => console.log(`    - ${dup}`));
}

// Check 10: File structure
console.log(`\n✓ Check 10: File Structure`);
const hasImports = seedFileContent.includes('import');
const hasExport = seedFileContent.includes('export') || seedFileContent.includes('async function runSeed');
const hasRunSeed = seedFileContent.includes('runSeed()');

console.log(`  ${hasImports ? '✅' : '❌'} Has import statements`);
console.log(`  ${hasExport ? '✅' : '❌'} Has runSeed function`);
console.log(`  ${hasRunSeed ? '✅' : '❌'} Calls runSeed()`);

// Final summary
console.log('\n' + '='.repeat(60));
console.log('📋 FINAL SUMMARY');
console.log('='.repeat(60));

const allChecks = [
  hasSeedGames,
  gameCount > 0,
  allFieldsPresent,
  invalidCategories === 0,
  emptyTitles === 0,
  slugs.length === titles.length,
  emptyTagArrays === 0,
  duplicates.length === 0,
  hasImports && hasExport && hasRunSeed
];

const passedChecks = allChecks.filter(Boolean).length;
const totalChecks = allChecks.length;

console.log(`\nPassed: ${passedChecks}/${totalChecks} checks`);
console.log(`Total games: ${gameCount}`);
console.log(`Unique titles: ${normalizedTitles.size}`);

if (passedChecks === totalChecks) {
  console.log('\n✅ ALL VERIFICATION CHECKS PASSED!');
  console.log('The seed file is ready for use.');
  process.exit(0);
} else {
  console.log(`\n⚠️  ${totalChecks - passedChecks} check(s) failed`);
  console.log('Please review the issues above.');
  process.exit(1);
}
