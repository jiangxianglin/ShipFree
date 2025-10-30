-- Ice Breaker Games Database Setup
-- Run this SQL in Supabase SQL Editor

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id text PRIMARY KEY NOT NULL,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  category varchar(100) NOT NULL,
  players varchar(100),
  duration varchar(100),
  difficulty varchar(50),
  materials text,
  steps text,
  tags text[] DEFAULT ARRAY[]::text[] NOT NULL,
  image text,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at);

-- Verify table creation
SELECT 'Games table created successfully!' as status;
