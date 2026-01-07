-- Insert SessionLab categorized games (English version)
-- This script adds the new games from SessionLab with English descriptions and tags

-- Begin transaction
BEGIN;

-- What Are You Bringing to the Meeting?
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('What Are You Bringing to the Meeting?', 
'A mindful check-in where participants write down worries, energy levels, and thoughts, then set them aside for better focus during the meeting. This helps team members transition from previous tasks and arrive mentally present.', 
'Team Building', 
'5-30 people', 
'5-10 minutes', 
'Easy', 
'Paper and pens', 
'Step 1: Ask participants to check-in with themselves
Step 2: Write down worries, energy levels, and thoughts
Step 3: Put these aside for the meeting duration
Step 4: Share how they''re feeling if comfortable', 
'mindful,check-in,focus,mental-reset,meeting-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Weather Check-in
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Weather Check-in', 
'Share feelings using weather metaphors for a quick group sentiment check. This simple yet effective activity is particularly suitable for remote teams, allowing everyone to share their current state in a safe way.', 
'Virtual Meeting', 
'5-25 people', 
'3-8 minutes', 
'Easy', 
'None required', 
'Step 1: Ask each person to describe their current feeling as weather
Step 2: Examples: ''mostly sunny skies with rain clouds looming''
Step 3: Go around the group quickly
Step 4: Acknowledge the group''s overall ''weather''', 
'check-in,metaphor,quick,remote-friendly,meeting-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Have You Ever? (Stand Up If)
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Have You Ever? (Stand Up If)', 
'Participants stand if they can answer yes to ''Have you ever...'' questions. This is an effective icebreaker to help the group start to see connections and share something about themselves in a low-pressure way.', 
'Team Building', 
'8-50 people', 
'5-10 minutes', 
'Easy', 
'None required', 
'Step 1: Ask ''Have you ever...'' questions to the group
Step 2: Participants who can answer yes stand up
Step 3: Those standing can ask the next question
Step 4: Continue with 5-8 questions', 
'movement,connections,low-pressure,inclusive,meeting-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- 5-4-3-2-1 Grounding Technique
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('5-4-3-2-1 Grounding Technique', 
'A mindful exercise engaging all senses to help participants be present. By asking participants to engage all their senses and take a breath, you can help bring them back to the present moment and manage anxiety and stress.', 
'Team Building', 
'5-30 people', 
'3-5 minutes', 
'Easy', 
'None required', 
'Step 1: Name 5 things you can see
Step 2: Name 4 things you can touch
Step 3: Name 3 things you can hear
Step 4: Name 2 things you can smell
Step 5: Name 1 thing you can taste', 
'mindful,grounding,present,stress-relief,meeting-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- One Word at a Time
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('One Word at a Time', 
'Groups create sentences by contributing one word each while going around the circle. This simple yet effective activity can easily be tailored to any group and encourages creative and collaborative thinking.', 
'Team Building', 
'6-20 people', 
'3-8 minutes', 
'Easy', 
'None required', 
'Step 1: Give a topic or starting word
Step 2: Go around circle, each person adds one word
Step 3: Try to create a complete sentence
Step 4: Speed up or add challenges for fun', 
'creative,collaborative,quick,adaptable,5-minute-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Count Up
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Count Up', 
'Group counts sequentially without speaking over each other or establishing patterns. This deceptively simple challenge requires patience, awareness, and teamwork, making it a great way to build focus and connection.', 
'Team Building', 
'8-25 people', 
'3-10 minutes', 
'Medium', 
'None required', 
'Step 1: Set a target number (like 20)
Step 2: Count from 1 without overlapping or patterns
Step 3: If two speak at once, start over
Step 4: Celebrate when target is reached', 
'focus,listening,teamwork,patience,5-minute-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Chat Waterfall
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Chat Waterfall', 
'Everyone types answers simultaneously then sends all at once, creating a ''waterfall'' effect. This is a high-energy virtual icebreaker that gets everyone participating at once, especially effective in larger groups.', 
'Virtual Meeting', 
'5-50 people', 
'3-8 minutes', 
'Easy', 
'Video conferencing with chat', 
'Step 1: Ask a question like ''favorite snack''
Step 2: Everyone types answer but doesn''t send
Step 3: On count of 3, everyone sends at once
Step 4: Enjoy the waterfall of responses', 
'high-energy,visual,simultaneous,chat,virtual-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Emoji Check-In
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Emoji Check-In', 
'Participants express their mood or energy using only emojis. This icebreaker creates space for emotional expression without putting anyone on the spot, making it fast, lighthearted, and accessible.', 
'Virtual Meeting', 
'5-50 people', 
'3-5 minutes', 
'Easy', 
'Video platform with emoji reactions or chat', 
'Step 1: Ask everyone to choose emojis for their current mood
Step 2: Share via reactions or chat
Step 3: Optional: explain emoji choices briefly
Step 4: Acknowledge the group''s overall energy', 
'quick,emotional,visual,check-in,virtual-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Portrait Gallery
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Portrait Gallery', 
'Teams create quick portraits of each other by rotating artists every 15 seconds. This creative activity results in wonderfully varied (and probably quite messy!) images that can be displayed in the meeting room once done.', 
'Team Building', 
'10-30 people', 
'10-15 minutes', 
'Easy', 
'Drawing materials, paper', 
'Step 1: Split into Team A (subjects) and Team B (artists)
Step 2: Artists draw for 15 seconds, then rotate
Step 3: Continue until everyone has drawn everyone
Step 4: Display the collaborative portraits', 
'creative,artistic,collaborative,fun,fun-icebreaker', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Marshmallow Challenge (update if exists)
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Marshmallow Challenge', 
'Build tallest tower using spaghetti, tape, string with marshmallow on top. This famous team building challenge practices prototyping and teamwork, often producing unexpected results and valuable lessons.', 
'Team Building', 
'8-40 people', 
'18-25 minutes', 
'Medium', 
'Spaghetti, tape, string, marshmallows', 
'Step 1: Form teams of 4-5 people
Step 2: Build tallest free-standing structure
Step 3: Marshmallow must be on top
Step 4: Measure and celebrate tallest tower', 
'engineering,collaboration,problem-solving,competition,teamwork-improvement', 
'https://www.sessionlab.com/blog/icebreaker-games/')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  players = EXCLUDED.players,
  duration = EXCLUDED.duration,
  difficulty = EXCLUDED.difficulty,
  materials = EXCLUDED.materials,
  steps = EXCLUDED.steps,
  tags = EXCLUDED.tags,
  source = EXCLUDED.source;

-- Commit transaction
COMMIT;

-- Update statistics
SELECT 'SessionLab games inserted successfully!' as status, COUNT(*) as total_games FROM games WHERE source LIKE '%sessionlab%';