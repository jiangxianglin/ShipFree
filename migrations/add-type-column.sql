-- Add type column to games table
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);

-- Update existing Christmas table games with appropriate types
UPDATE games SET type = 'Table Game' WHERE tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[];
UPDATE games SET type = 'Christmas Game' WHERE tags @> ARRAY['christmas']::text[] OR tags @> ARRAY['Christmas Games']::text[];

-- You can also set specific types for specific games based on their characteristics
-- For example:
-- UPDATE games SET type = 'Quick Start' WHERE duration LIKE '%5%' OR duration LIKE '%10%';
-- UPDATE games SET type = 'Energizer' WHERE tags @> ARRAY['active']::text[];
-- UPDATE games SET type = 'Icebreaker' WHERE tags @> ARRAY['getting-to-know-you']::text[];
