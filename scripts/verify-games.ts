import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read the seed file
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

// Extract games from the file
const gamesMatch = seedFileContent.match(/const seedGames = \[([\s\S]*?)\];/);
if (!gamesMatch) {
  console.error('❌ Could not find seedGames array in file');
  process.exit(1);
}

// Parse games (simplified - just check the structure)
const gamesText = gamesMatch[1];
const gameBlocks = gamesText.split(/\},\s*\{/).map((block, index, arr) => {
  if (index === 0) return block + '}';
  if (index === arr.length - 1) return '{' + block;
  return '{' + block + '}';
});

console.log(`\n📊 Found ${gameBlocks.length} games in seed file\n`);

let errors = 0;
let warnings = 0;
const titles = new Set<string>();
const slugs = new Set<string>();

gameBlocks.forEach((gameBlock, index) => {
  const gameNum = index + 1;
  
  // Extract title
  const titleMatch = gameBlock.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : null;
  
  // Extract description
  const descMatch = gameBlock.match(/description:\s*"([^"]+)"/);
  const description = descMatch ? descMatch[1] : null;
  
  // Extract category
  const categoryMatch = gameBlock.match(/category:\s*"([^"]+)"/);
  const category = categoryMatch ? categoryMatch[1] : null;
  
  // Extract tags
  const tagsMatch = gameBlock.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/"/g, '')) : [];
  
  // Extract slug
  const slugMatch = gameBlock.match(/slug:\s*generateSlug\("([^"]+)"\)/);
  const slug = slugMatch ? slugMatch[1] : null;
  
  console.log(`Game ${gameNum}: ${title || 'UNKNOWN'}`);
  
  // Requirement 5.1: Check title is not empty
  if (!title || title.trim() === '') {
    console.log(`  ❌ ERROR: Title is empty`);
    errors++;
  } else {
    console.log(`  ✅ Title: "${title}"`);
    
    // Check for duplicate titles
    const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (titles.has(normalizedTitle)) {
      console.log(`  ⚠️  WARNING: Potential duplicate title detected`);
      warnings++;
    }
    titles.add(normalizedTitle);
  }
  
  // Requirement 5.2: Check description length >= 20 characters
  if (!description || description.length < 20) {
    console.log(`  ❌ ERROR: Description too short (${description?.length || 0} chars, need >= 20)`);
    errors++;
  } else {
    console.log(`  ✅ Description: ${description.length} characters`);
  }
  
  // Requirement 5.3: Check at least one tag
  if (tags.length === 0 || (tags.length === 1 && tags[0] === '')) {
    console.log(`  ❌ ERROR: No tags found`);
    errors++;
  } else {
    console.log(`  ✅ Tags: ${tags.length} tag(s)`);
  }
  
  // Requirement 5.4: Check category is valid
  if (!category || !validCategories.includes(category)) {
    console.log(`  ❌ ERROR: Invalid category "${category}"`);
    errors++;
  } else {
    console.log(`  ✅ Category: "${category}"`);
  }
  
  // Requirement 3.3: Check slug uniqueness
  if (slug) {
    const slugKey = slug.toLowerCase();
    if (slugs.has(slugKey)) {
      console.log(`  ⚠️  WARNING: Potential duplicate slug detected`);
      warnings++;
    }
    slugs.add(slugKey);
  }
  
  console.log('');
});

console.log('\n' + '='.repeat(60));
console.log('📋 VERIFICATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total games: ${gameBlocks.length}`);
console.log(`Unique titles: ${titles.size}`);
console.log(`Unique slugs: ${slugs.size}`);
console.log(`Errors: ${errors}`);
console.log(`Warnings: ${warnings}`);

if (errors === 0) {
  console.log('\n✅ All games meet schema requirements!');
  process.exit(0);
} else {
  console.log(`\n❌ Found ${errors} error(s) that need to be fixed`);
  process.exit(1);
}
