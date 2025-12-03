import { readFileSync } from 'fs';
import { resolve } from 'path';

const seedFilePath = resolve(process.cwd(), 'src/db/seed/games-supabase.ts');
const content = readFileSync(seedFilePath, 'utf-8');

console.log('\n📝 DESCRIPTION LENGTH VERIFICATION\n');
console.log('='.repeat(60));

// Extract all description fields with their titles
const gameBlocks = content.split(/\{\s*id:\s*crypto\.randomUUID\(\)/).slice(1);

let shortDescriptions = 0;
let totalGames = 0;

gameBlocks.forEach((block) => {
  totalGames++;
  
  // Extract title
  const titleMatch = block.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : 'Unknown';
  
  // Extract description - handle escaped quotes and multi-line strings
  // Match description field, handling escaped quotes within the string
  const descMatch = block.match(/description:\s*"((?:[^"\\]|\\.)*)"/);
  const description = descMatch ? descMatch[1] : '';
  
  // Unescape the description
  const unescapedDesc = description
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
  
  const length = unescapedDesc.length;
  
  if (length < 20) {
    console.log(`❌ Game ${totalGames}: "${title}"`);
    console.log(`   Description: "${unescapedDesc}"`);
    console.log(`   Length: ${length} characters (need >= 20)\n`);
    shortDescriptions++;
  }
});

console.log('='.repeat(60));
console.log(`Total games checked: ${totalGames}`);
console.log(`Games with short descriptions: ${shortDescriptions}`);

if (shortDescriptions === 0) {
  console.log('\n✅ All game descriptions meet the 20-character minimum!');
  process.exit(0);
} else {
  console.log(`\n❌ Found ${shortDescriptions} game(s) with descriptions shorter than 20 characters`);
  process.exit(1);
}
