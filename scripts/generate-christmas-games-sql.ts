import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ChristmasGame {
  title: string;
  description: string;
  category: string;
  players: string;
  duration: string;
  difficulty: string;
  materials: string;
  steps: string;
  tags: string[];
  source: string;
}

interface ChristmasGamesData {
  metadata: any;
  games: ChristmasGame[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

function escapeSQLString(str: string): string {
  return str.replace(/'/g, "''");
}

function generateSQL() {
  console.log('🎄 Generating SQL file for Christmas games...\n');

  // Read the JSON file
  const filePath = join(process.cwd(), 'data', 'christmas-icebreaker-games.json');
  const fileContent = readFileSync(filePath, 'utf-8');
  const data: ChristmasGamesData = JSON.parse(fileContent);

  let sql = `-- Christmas Icebreaker Games Seed Data
-- Generated on ${new Date().toISOString().split('T')[0]}
-- Total: ${data.games.length} games
-- Run this in your Supabase SQL Editor or via psql

BEGIN;

`;

  data.games.forEach((game, index) => {
    const slug = slugify(game.title);
    const escapedTitle = escapeSQLString(game.title);
    const escapedDescription = escapeSQLString(game.description);
    const escapedMaterials = escapeSQLString(game.materials);
    const escapedSteps = escapeSQLString(game.steps);
    const tagsArray = game.tags.map(t => `'${escapeSQLString(t)}'`).join(', ');

    sql += `-- Game ${index + 1}: ${game.title}
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  '${slug}',
  '${escapedTitle}',
  '${escapedDescription}',
  '${game.category}',
  '${game.players}',
  '${game.duration}',
  '${game.difficulty}',
  '${escapedMaterials}',
  E'${escapedSteps}',
  ARRAY[${tagsArray}],
  NULL
);

`;
  });

  sql += `COMMIT;

-- Verification queries
SELECT COUNT(*) as total_christmas_games 
FROM games 
WHERE 'christmas' = ANY(tags);

SELECT category, COUNT(*) as count
FROM games
WHERE 'christmas' = ANY(tags)
GROUP BY category
ORDER BY count DESC;

SELECT difficulty, COUNT(*) as count
FROM games
WHERE 'christmas' = ANY(tags)
GROUP BY difficulty
ORDER BY count DESC;
`;

  // Write SQL file
  const outputPath = join(process.cwd(), 'seed-christmas-games.sql');
  writeFileSync(outputPath, sql, 'utf-8');

  console.log(`✅ Generated SQL file with ${data.games.length} games`);
  console.log(`📁 File saved to: ${outputPath}`);
  console.log('\n📝 To import:');
  console.log('   1. Open Supabase Dashboard > SQL Editor');
  console.log('   2. Copy and paste the contents of seed-christmas-games.sql');
  console.log('   3. Click "Run" to execute');
  console.log('   OR');
  console.log('   Run: psql $DATABASE_URL < seed-christmas-games.sql\n');
}

generateSQL();
