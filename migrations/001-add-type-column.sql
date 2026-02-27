-- Migration: Add type column to games table
-- Date: 2026-02-27
-- Description: Adds a 'type' column to support game type filtering (Table Game, Christmas Game, etc.)

-- Add type column if it doesn't exist
ALTER TABLE games ADD COLUMN IF NOT EXISTS type VARCHAR(100);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_games_type ON games(type);

-- Add comment to document the column
COMMENT ON COLUMN games.type IS 'Game type classification: Table Game, Christmas Game, Icebreaker, Energizer, etc.';

-- Verify the column was added
SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'games' AND column_name = 'type';
