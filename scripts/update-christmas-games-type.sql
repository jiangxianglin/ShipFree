-- Update Christmas table games with appropriate type values based on the blog post categories

-- Quick Start Games (5-10 min)
UPDATE games SET type = 'Table Game' 
WHERE title IN (
  'Holiday Fortunes',
  'Christmas Roll & Poll',
  'Ornament Guess'
) AND (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[]);

-- Conversation Starter Games (10-20 min)
UPDATE games SET type = 'Table Game'
WHERE title IN (
  'Two Truths and a Tinsel',
  'Share a Favorite Holiday Memory',
  'Around the World Traditions'
) AND (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[]);

-- Interactive Games (15-30 min)
UPDATE games SET type = 'Table Game'
WHERE title IN (
  'The Great Christmas Candy Pass',
  'Message Under a Plate',
  'Christmas Connection'
) AND (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[]);

-- Creative & Fun Games
UPDATE games SET type = 'Table Game'
WHERE title IN (
  'Holiday Bingo',
  'What''s on Your Phone? Christmas Edition',
  'Christmas Pick a Side'
) AND (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[]);

-- Passive Games
UPDATE games SET type = 'Table Game'
WHERE title IN (
  'Ornament Guess'
) AND (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[]);

-- Large Dinner Games
UPDATE games SET type = 'Table Game'
WHERE title IN (
  'Topics Tables',
  'Guess the Gift by Sound',
  'Photo Booth Prompt Jar'
) AND (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[]);

-- Mark all Christmas games as Christmas Game type as well (they can have multiple characteristics)
UPDATE games SET type = 'Christmas Game' 
WHERE tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[] OR tags @> ARRAY['Holiday Party']::text[];

-- For games that should be both Table Game and Christmas Game, we'll use 'Table Game' as primary
-- since that's the most specific filter for the blog page
UPDATE games SET type = 'Table Game'
WHERE (tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[])
  AND (tags @> ARRAY['table-game']::text[] OR tags @> ARRAY['Table Games']::text[] OR tags @> ARRAY['Dinner Party']::text[]);
