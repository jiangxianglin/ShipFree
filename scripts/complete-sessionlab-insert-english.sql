-- Complete SessionLab Games Insert Script (English Version)
-- Generated on 2026-01-07T02:57:14.002Z
-- Total games to insert: 27

-- Begin transaction
BEGIN;

-- Game 1: What Are You Bringing to the Meeting?
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

-- Game 2: Weather Check-in
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

-- Game 3: Have You Ever? (Stand Up If)
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

-- Game 4: 5-4-3-2-1 Grounding Technique
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

-- Game 5: One Word at a Time
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

-- Game 6: Count Up
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

-- Game 7: Apple, Orange and Banana
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Apple, Orange and Banana', 
'Physical energizer where participants move based on called fruit names. Participants respond to different fruit commands with corresponding actions, helping the group synchronize and fully arrive in a space.', 
'Team Building', 
'8-30 people', 
'3-8 minutes', 
'Easy', 
'Open space', 
'Step 1: Stand in circle, hands on shoulders of person in front
Step 2: Apple = move forward, Orange = backward, Banana = spin
Step 3: Call out fruits, group responds
Step 4: Mix it up with multiple commands', 
'physical,energizer,fun,synchronization,5-minute-icebreaker', 
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

-- Game 8: Name Game
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Name Game', 
'Learn names by repeating previous names before adding your own. This is an effective icebreaker to use at the start of a course, workshop or meeting where people don''t know each other''s names.', 
'Team Building', 
'8-20 people', 
'5-10 minutes', 
'Easy', 
'None required', 
'Step 1: Sit in circle where everyone can see each other
Step 2: First person says their name
Step 3: Next person repeats first name, then adds theirs
Step 4: Continue building the chain around circle', 
'names,memory,introductions,circle,5-minute-icebreaker', 
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

-- Game 9: Line Up
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Line Up', 
'Non-verbal challenge to arrange in order by given criteria without speaking. This is a quick icebreaker game where players have to form an orderly line without any discussion or verbal cues.', 
'Team Building', 
'10-40 people', 
'5-10 minutes', 
'Easy', 
'None required', 
'Step 1: Announce ordering criteria (height, birthday, etc.)
Step 2: Participants arrange themselves without speaking
Step 3: Check the final order
Step 4: Debrief on non-verbal communication strategies', 
'non-verbal,collaboration,problem-solving,movement,5-minute-icebreaker', 
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

-- Game 10: Take a Picture of Your Shoes
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Take a Picture of Your Shoes', 
'Everyone shares a photo of their current shoes and tells the story behind them. This quirky and low-pressure activity sparks connection among virtual teammates and often leads to unexpected interesting stories.', 
'Virtual Meeting', 
'5-30 people', 
'5-10 minutes', 
'Easy', 
'Camera/phone, shared screen or chat', 
'Step 1: Ask everyone to take a photo of their shoes
Step 2: Share photos via screen share or chat
Step 3: Each person explains their shoe choice
Step 4: Optional: vote on most interesting pair', 
'remote-friendly,storytelling,personal,visual,virtual-icebreaker', 
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

-- Game 11: Chat Waterfall
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

-- Game 12: Emoji Check-In
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

-- Game 13: Remote Change 3 Things
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Remote Change 3 Things', 
'One person changes 3 things about appearance/background while camera is off. This activity sparks laughter and encourages attention to detail while breaking up the routine of virtual meetings.', 
'Virtual Meeting', 
'5-20 people', 
'5-10 minutes', 
'Easy', 
'Video conferencing platform', 
'Step 1: One participant turns off camera
Step 2: They change 3 small things (glasses, hat, background)
Step 3: Turn camera back on
Step 4: Others guess what changed', 
'observation,playful,attention,interactive,virtual-icebreaker', 
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

-- Game 14: Two Truths and One Lie
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Two Truths and One Lie', 
'Classic game where participants share two truths and one lie about themselves. This timeless icebreaker reveals surprising facts about colleagues and builds rapport through light humor and storytelling.', 
'Team Building', 
'4-30 people', 
'10-15 minutes', 
'Easy', 
'None required', 
'Step 1: Each person prepares two truths and one lie
Step 2: Share all three statements
Step 3: Group votes on which is the lie
Step 4: Reveal answer and discuss interesting truths', 
'classic,storytelling,guessing,personal,get-to-know', 
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

-- Game 15: Diversity Bingo
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Diversity Bingo', 
'Bingo cards with statements about experiences - find people who match each square. This is a great icebreaker that helps participants learn about one another and share what differentiates them as people.', 
'Team Building', 
'12-50 people', 
'10-20 minutes', 
'Easy', 
'Bingo cards, pens', 
'Step 1: Create 3x3 bingo cards with experience statements
Step 2: Mingle to find people who match statements
Step 3: Get signatures for matches
Step 4: Share interesting discoveries', 
'diversity,mixer,discovery,inclusive,get-to-know', 
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

-- Game 16: Unique and Shared
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Unique and Shared', 
'Small groups discover commonalities and unique characteristics of each member. This is a powerful icebreaker for use with breakout groups, especially at the start of a longer project or training program.', 
'Team Building', 
'8-30 people', 
'15-20 minutes', 
'Easy', 
'Paper, pens', 
'Step 1: Form groups of 4-5 people
Step 2: Find things everyone has in common
Step 3: Identify unique characteristics of each person
Step 4: Share findings with larger group', 
'commonalities,uniqueness,small-groups,discovery,get-to-know', 
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

-- Game 17: Speed Dating Icebreaker
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Speed Dating Icebreaker', 
'Rapid succession of short conversations to maximize networking. The goal of this icebreaker is to have a succession of very rapid conversations in an extremely short amount of time with as many people as possible.', 
'Team Building', 
'10-40 people', 
'15-25 minutes', 
'Easy', 
'Timer, chairs', 
'Step 1: Arrange chairs in pairs
Step 2: Set 3-minute timer for each conversation
Step 3: Focus on professional information exchange
Step 4: Rotate partners when timer rings', 
'networking,professional,rotation,efficient,get-to-know', 
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

-- Game 18: Portrait Gallery
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

-- Game 19: Minefield
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Minefield', 
'Blindfolded participants navigate obstacles guided by teammates'' voices. This fun physical game can help build trust and more effective group communication through clear directions and active listening.', 
'Team Building', 
'8-20 people', 
'10-15 minutes', 
'Medium', 
'Blindfolds, soft obstacles (books, cushions, toys)', 
'Step 1: Set up harmless obstacles on floor
Step 2: Participants take turns being blindfolded
Step 3: Teammates guide them through the course
Step 4: Debrief on communication and trust', 
'trust,communication,physical,teamwork,fun-icebreaker', 
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

-- Game 20: Crazy Handshake
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Crazy Handshake', 
'Pairs create unique handshakes and teach them to others in rotating partnerships. This is a lighthearted and memorable game where pairs must create a new, fun handshake before teaching it to other people.', 
'Team Building', 
'8-30 people', 
'10-15 minutes', 
'Easy', 
'None required', 
'Step 1: Pairs introduce themselves and create a handshake
Step 2: Split and partner with someone new
Step 3: Teach original handshakes and create new one
Step 4: Repeat and share all learned handshakes', 
'creative,physical,memorable,partnership,fun-icebreaker', 
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

-- Game 21: The Movie Pitch Icebreaker
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('The Movie Pitch Icebreaker', 
'Small groups create and pitch original movie ideas based on themes. This is a fun, fast-paced activity where small groups create and pitch an original movie idea based on a random or chosen theme.', 
'Team Building', 
'8-30 people', 
'15-20 minutes', 
'Easy', 
'None required', 
'Step 1: Form small groups and give theme
Step 2: Create movie title, plot, and cast
Step 3: Present pitch to group as if selling to studio
Step 4: Optional: vote on best pitch', 
'creative,storytelling,presentation,teamwork,fun-icebreaker', 
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

-- Game 22: Bang!
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Bang!', 
'Fast-paced elimination game with sheriff pointing and quick reactions. This is a fast-paced icebreaker where you have to have quick reactions or you''ll be eliminated, creating high energy and laughter.', 
'Team Building', 
'8-25 people', 
'5-10 minutes', 
'Easy', 
'None required', 
'Step 1: Stand in circle with one person as sheriff in middle
Step 2: Sheriff points at someone who must quickly crouch
Step 3: People on either side must ''draw'' weapons quickly
Step 4: Slowest person becomes new sheriff', 
'energizer,reactions,elimination,fun,fun-icebreaker', 
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

-- Game 23: Group Map
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Group Map', 
'Participants position themselves on imaginary world map based on where they grew up. This is a fun, active icebreaker that gets people moving while also learning a little about one another and their cultural backgrounds.', 
'Team Building', 
'20-100+ people', 
'10-15 minutes', 
'Easy', 
'Large open space', 
'Step 1: Designate room as world map
Step 2: Participants position themselves by birthplace/hometown
Step 3: Share briefly about their location
Step 4: Optional: share a value learned from that place', 
'geography,cultural,movement,large-scale,large-group', 
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

-- Game 24: Passions Tic Tac Toe
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Passions Tic Tac Toe', 
'Fill tic-tac-toe grid with passions, then find others with matching interests. The goal of this icebreaker is to help participants get to know each other at the beginning of an event or training session.', 
'Team Building', 
'15-100+ people', 
'15-20 minutes', 
'Easy', 
'3x3 grids, pens', 
'Step 1: Fill 3x3 grid with personal passions
Step 2: Mingle to find others with same passions
Step 3: Get signatures for matching squares
Step 4: First to get three in a row wins', 
'passions,networking,competition,discovery,large-group', 
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

-- Game 25: Marshmallow Challenge
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

-- Game 26: Helium Stick
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Helium Stick', 
'Team must lower a stick to ground while everyone keeps finger contact. This seemingly simple game requires the team to work together while aiming to lower a stick to the ground while staying synchronized.', 
'Team Building', 
'8-20 people', 
'10-15 minutes', 
'Medium', 
'Long lightweight stick or rod', 
'Step 1: Line up in two rows facing each other
Step 2: Place stick on everyone''s index fingers
Step 3: Lower stick to ground without losing contact
Step 4: Restart if anyone loses contact', 
'coordination,patience,teamwork,challenge,teamwork-improvement', 
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

-- Game 27: Desert Island
INSERT INTO games (title, description, category, players, duration, difficulty, materials, steps, tags, source) VALUES
('Desert Island', 
'Group decides which items to keep for survival on desert island. This classic team-building exercise puts problem-solving and negotiation skills to the test through collaborative decision-making.', 
'Team Building', 
'6-30 people', 
'15-25 minutes', 
'Medium', 
'List of items, paper', 
'Step 1: Present list of available items
Step 2: Group must agree on limited number to keep
Step 3: Discuss and negotiate priorities
Step 4: Debrief on decision-making process', 
'decision-making,negotiation,priorities,discussion,teamwork-improvement', 
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
