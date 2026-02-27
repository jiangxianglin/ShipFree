-- Christmas Icebreaker Games Seed Data
-- Generated on 2026-02-26
-- Total: 52 games
-- Run this in your Supabase SQL Editor or via psql

BEGIN;

-- Game 1: How Many Decorations?
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'how-many-decorations',
  'How Many Decorations?',
  'A simple observation and guessing game where participants estimate the number of ornaments on a Christmas tree. Perfect for warming up a group at the start of a holiday event.',
  'Social Event',
  'Any size',
  '5-10 minutes',
  'Easy',
  'Christmas tree with decorations',
  E'Step 1: Decorate a Christmas tree with a counted number of ornaments.
Step 2: Give each person a few seconds to observe the tree.
Step 3: Ask participants to write down their guess.
Step 4: Reveal the correct number.
Step 5: Award a prize to the closest guess.',
  ARRAY['christmas', 'quick', 'observation', 'guessing-game', 'holiday', 'easy-setup'],
  NULL
);

-- Game 2: Word Association (Christmas Edition)
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'word-association-christmas-edition',
  'Word Association (Christmas Edition)',
  'A fast-paced word game where players sit in a circle and say Christmas-related words that associate with the previous word. Great for getting brains warmed up before meetings.',
  'Virtual Meeting',
  '5-20 people',
  '5-10 minutes',
  'Easy',
  'None required',
  E'Step 1: Players sit in a circle.
Step 2: First player says a Christmas-themed word (e.g., ''Santa'').
Step 3: Next player says a word they associate with it (e.g., ''red'' or ''presents'').
Step 4: Continue around the circle until time runs out.
Step 5: Keep the pace quick and energetic.',
  ARRAY['christmas', 'verbal', 'quick', 'thinking-game', 'no-materials', 'circle-game'],
  NULL
);

-- Game 3: Holiday Alphabet
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'holiday-alphabet',
  'Holiday Alphabet',
  'A quick-fire thinking game where players race to write Christmas-themed items for each letter of the alphabet. Perfect for activating minds before team activities.',
  'Team Building',
  'Any size',
  '5-10 minutes',
  'Easy',
  'Paper and pens for each player',
  E'Step 1: Give each player paper and pen.
Step 2: Ask them to write the alphabet vertically (A-Z).
Step 3: On ''Go!'', players write Christmas items for each letter.
Step 4: First to complete their alphabet wins.
Step 5: Share creative answers with the group.',
  ARRAY['christmas', 'writing', 'competitive', 'quick', 'thinking-game', 'individual'],
  NULL
);

-- Game 4: The Christmas Memory Game
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'the-christmas-memory-game',
  'The Christmas Memory Game',
  'A memory challenge where players observe Christmas items on a tray for one minute, then try to recall as many as possible. Tests short-term memory and observation skills.',
  'Social Event',
  '5-30 people',
  '10-15 minutes',
  'Easy',
  'Tray with 15-20 Christmas items, paper and pens',
  E'Step 1: Place Christmas items on a tray.
Step 2: Give players one minute to memorize the items.
Step 3: Remove the tray from view.
Step 4: Give players 30 seconds to write down items they remember.
Step 5: Award points for correct items and bonus points for details.',
  ARRAY['christmas', 'memory', 'observation', 'competitive', 'table-game'],
  NULL
);

-- Game 5: Name That Tune (Christmas Edition)
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'name-that-tune-christmas-edition',
  'Name That Tune (Christmas Edition)',
  'A classic music guessing game using only Christmas songs. Players compete to identify song titles and artists the fastest for points.',
  'Social Event',
  '5-50 people',
  '15-20 minutes',
  'Easy',
  'Music player with Christmas songs',
  E'Step 1: Play a few seconds of a Christmas song.
Step 2: First player to guess the song name gets points.
Step 3: Offer bonus points for guessing the artist.
Step 4: If they fail, others can guess for extra points.
Step 5: Player with most points wins.',
  ARRAY['christmas', 'music', 'competitive', 'fun', 'guessing-game', 'large-group'],
  NULL
);

-- Game 6: Who Am I? (Holiday Edition)
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'who-am-i-holiday-edition',
  'Who Am I? (Holiday Edition)',
  'Players guess the Christmas character written on their forehead by asking yes/no questions. A festive twist on the classic guessing game.',
  'Social Event',
  '6-30 people',
  '15-20 minutes',
  'Easy',
  'Sticky notes, pens',
  E'Step 1: Each player writes a Christmas character name on a sticky note.
Step 2: Stick the note on another player''s forehead without them seeing.
Step 3: Players ask yes/no questions to guess their character.
Step 4: Maximum 3 questions per person before moving to next player.
Step 5: Continue until everyone guesses their character.',
  ARRAY['christmas', 'guessing-game', 'questions', 'interactive', 'fun'],
  NULL
);

-- Game 7: Holiday Fortunes
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'holiday-fortunes',
  'Holiday Fortunes',
  'A fun conversation starter where players pop balloons containing humorous Christmas fortunes and read them aloud. Perfect for dinner tables or seated events.',
  'Social Event',
  '5-30 people',
  '10-15 minutes',
  'Easy',
  'Balloons, paper slips with fortunes written on them',
  E'Step 1: Write a fortune for each player on paper slips.
Step 2: Insert fortunes into balloons and inflate them.
Step 3: Give one balloon to each player.
Step 4: Players take turns popping their balloons.
Step 5: Each player reads their fortune aloud to spark conversation.',
  ARRAY['christmas', 'conversation-starter', 'fun', 'table-game', 'seated', 'dinner-party'],
  NULL
);

-- Game 8: Holiday Charades
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'holiday-charades',
  'Holiday Charades',
  'Classic charades with Christmas-themed movies, songs, books, and TV shows. Always generates laughs and gets teams interacting.',
  'Social Event',
  '6-40 people',
  '20-30 minutes',
  'Easy',
  'Paper slips with Christmas titles, hat or bowl',
  E'Step 1: Write Christmas movie/song/book titles on paper slips.
Step 2: Put all slips in a hat.
Step 3: Players take turns drawing and acting out their title.
Step 4: No speaking or pointing allowed.
Step 5: First to guess correctly takes the next turn.',
  ARRAY['christmas', 'charades', 'acting', 'fun', 'team-game', 'classic'],
  NULL
);

-- Game 9: Gift Wrap Challenge
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'gift-wrap-challenge',
  'Gift Wrap Challenge',
  'Pairs work together with one hand each tied together to wrap a present. Forces communication and teamwork in a hilarious way.',
  'Team Building',
  '4-30 people (pairs)',
  '10-15 minutes',
  'Medium',
  'Gift boxes, wrapping paper, ribbon, tape, string to tie hands',
  E'Step 1: Divide into pairs standing side by side.
Step 2: Tie left hand of one to right hand of the other.
Step 3: Give each pair wrapping materials and a box.
Step 4: Pairs must wrap gift completely and tie with ribbon.
Step 5: Fastest pair with properly wrapped gift wins.',
  ARRAY['christmas', 'teamwork', 'pairs', 'communication', 'competitive', 'physical'],
  NULL
);

-- Game 10: Unwrap The Parcel
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'unwrap-the-parcel',
  'Unwrap The Parcel',
  'A high-tempo game where players roll dice and race to unwrap a multi-layered present while wearing oven mitts and a Santa hat. Always results in laughs.',
  'Social Event',
  '8-30 people',
  '15-20 minutes',
  'Easy',
  'Prize wrapped in multiple layers, die, Santa hat, oven mitts',
  E'Step 1: Arrange group in a circle with wrapped prize in center.
Step 2: Player rolls die; if they roll a 6, they rush to center.
Step 3: Put on Santa hat and oven mitts, remove one layer.
Step 4: Return to circle and pass die to next player.
Step 5: Person who unwraps final layer keeps the prize.',
  ARRAY['christmas', 'dice-game', 'competitive', 'fun', 'circle-game', 'fast-paced'],
  NULL
);

-- Game 11: Pop The Balloons
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'pop-the-balloons',
  'Pop The Balloons',
  'A physical team elimination game where teams try to pop the other team''s ankle-tied balloons. Last team with unpopped balloons wins.',
  'Team Building',
  '10-50 people',
  '10-15 minutes',
  'Easy',
  'Red and green balloons, string',
  E'Step 1: Divide into two equal teams.
Step 2: Give one team green balloons, other team red balloons.
Step 3: Players tie balloons to their ankles with string.
Step 4: On ''Go!'', teams try to pop opponents'' balloons.
Step 5: Eliminated players sit out; last team standing wins.',
  ARRAY['christmas', 'active', 'competitive', 'team-game', 'physical', 'energizer'],
  NULL
);

-- Game 12: Reindeer Antlers
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'reindeer-antlers',
  'Reindeer Antlers',
  'A hilarious creative challenge where teams build reindeer antlers using pantyhose and balloons. Encourages teamwork and creativity.',
  'Team Building',
  '8-40 people (teams of 3-5)',
  '10-15 minutes',
  'Easy',
  'Pantyhose with cut feet and belly hole, 14 small balloons per team, red ribbon',
  E'Step 1: Give each team pantyhose, balloons, and ribbon.
Step 2: One team member puts pantyhose on head (face through hole).
Step 3: Other members blow up balloons and stuff into pantyhose legs.
Step 4: Use ribbon to tie ends and decorate.
Step 5: Team with best antlers in 5 minutes wins.',
  ARRAY['christmas', 'creative', 'team-game', 'funny', 'craft', 'timed'],
  NULL
);

-- Game 13: Wreath Hoops
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'wreath-hoops',
  'Wreath Hoops',
  'A festive throwing game where teams toss balls through a hanging wreath. Perfect for energizing groups at the start of events.',
  'Team Building',
  '8-40 people (teams of 2-4)',
  '10-15 minutes',
  'Easy',
  'Large wreath or decorated hula hoop, ping pong balls or paper balls, buckets',
  E'Step 1: Hang wreath from ceiling.
Step 2: Divide into teams and give each a bucket of balls.
Step 3: Position teams at equal distances from wreath.
Step 4: Set timer for 1 minute.
Step 5: Team that throws most balls through wreath wins.',
  ARRAY['christmas', 'throwing', 'competitive', 'team-game', 'active', 'timed'],
  NULL
);

-- Game 14: Christmas Card Match
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-card-match',
  'Christmas Card Match',
  'A social mixing game where participants find others with matching Christmas card pieces. Great for forming random teams or encouraging new connections.',
  'Social Event',
  '10-60 people',
  '5-10 minutes',
  'Easy',
  'Old Christmas cards cut in halves or quarters',
  E'Step 1: Cut Christmas cards in half (for pairs) or quarters (for teams of 4).
Step 2: Mix pieces in a basket at entrance.
Step 3: Each person selects a card piece upon arrival.
Step 4: Participants find others with matching pieces.
Step 5: Use matched groups for activities or seating.',
  ARRAY['christmas', 'mingling', 'matching', 'team-formation', 'networking', 'quick'],
  NULL
);

-- Game 15: Holiday 30 Seconds
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'holiday-30-seconds',
  'Holiday 30 Seconds',
  'A fast-paced describing game where players have 30 seconds to get their team to guess as many Christmas items as possible. Classic party game with festive twist.',
  'Social Event',
  '8-40 people (teams of 2-6)',
  '20-30 minutes',
  'Medium',
  'Paper slips with Christmas items, hat or bowl',
  E'Step 1: Each player writes 5 Christmas-related items on paper.
Step 2: Collect all papers in a hat.
Step 3: Teams take turns; one player describes items in 30 seconds.
Step 4: Team members guess; correct guesses earn points.
Step 5: Team with most points after all papers are used wins.',
  ARRAY['christmas', 'describing', 'team-game', 'fast-paced', 'competitive', 'verbal'],
  NULL
);

-- Game 16: Snatch The Xmas Cup
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'snatch-the-xmas-cup',
  'Snatch The Xmas Cup',
  'A reaction-based pairs game where players try to grab a cup when the music stops. Builds focus and friendly competition.',
  'Social Event',
  '6-30 people (pairs)',
  '10-15 minutes',
  'Easy',
  'Plastic cups (one per pair), Christmas music player',
  E'Step 1: Divide into pairs sitting opposite each other.
Step 2: Place a plastic cup between each pair.
Step 3: Play Christmas music for a few seconds.
Step 4: When music pauses, players try to snatch the cup.
Step 5: Losers are eliminated; continue until one winner remains.',
  ARRAY['christmas', 'reaction', 'competitive', 'pairs', 'music', 'elimination'],
  NULL
);

-- Game 17: Santa's Helper Hunt
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'santas-helper-hunt',
  'Santa''s Helper Hunt',
  'An office scavenger hunt where teams search for hidden elves or ornaments. Gets people moving after sitting for long periods.',
  'Team Building',
  '10-50 people (teams)',
  '15-20 minutes',
  'Easy',
  'Miniature ornaments or printed elf pictures',
  E'Step 1: Hide Santa''s helpers (ornaments/elf pictures) around office.
Step 2: Divide participants into teams.
Step 3: Set a time limit (10-15 minutes).
Step 4: Teams search for as many helpers as possible.
Step 5: Team that finds the most wins.',
  ARRAY['christmas', 'scavenger-hunt', 'active', 'team-game', 'office', 'search'],
  NULL
);

-- Game 18: Christmas Hopscotch
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-hopscotch',
  'Christmas Hopscotch',
  'A high-intensity Squid Game-inspired challenge where players cross cardboard boxes, some hollow and some filled. Requires strategy and luck.',
  'Team Building',
  '10-40 people (teams)',
  '20-30 minutes',
  'Hard',
  'Cardboard boxes, newspapers, Christmas wrapping paper',
  E'Step 1: Create two parallel lines of wrapped boxes.
Step 2: Fill half with newspapers (can bear weight), leave half empty.
Step 3: Divide into two teams.
Step 4: Players cross one by one, choosing which boxes to step on.
Step 5: Team with most successful crossings wins.',
  ARRAY['christmas', 'physical', 'strategy', 'competitive', 'team-game', 'challenging'],
  NULL
);

-- Game 19: Secret Sentences
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'secret-sentences',
  'Secret Sentences',
  'An ongoing virtual game where players must say their secret Christmas sentence during a meeting without being detected. Adds fun to online events.',
  'Virtual Meeting',
  '5-30 people',
  'Throughout meeting (30-60 minutes)',
  'Medium',
  'List of secret sentences sent via private message',
  E'Step 1: Send each player a unique secret sentence before meeting.
Step 2: Players must say their sentence during the meeting naturally.
Step 3: Other players can accuse when they think someone said theirs.
Step 4: Wrong accusations eliminate the accuser.
Step 5: Reveal at end who successfully said their sentence.',
  ARRAY['christmas', 'virtual', 'stealth', 'conversation', 'online', 'ongoing'],
  NULL
);

-- Game 20: Lightning Scavenger Hunt (Holiday Edition)
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'lightning-scavenger-hunt-holiday-edition',
  'Lightning Scavenger Hunt (Holiday Edition)',
  'A fast-paced virtual scavenger hunt where players race to find Christmas items in their homes. Gets remote workers moving away from desks.',
  'Virtual Meeting',
  '5-50 people',
  '10-15 minutes',
  'Easy',
  'Video conferencing software, list of Christmas items',
  E'Step 1: Announce a Christmas-themed item to find.
Step 2: Players race to retrieve it from their home.
Step 3: First person back to their desk with the item wins that round.
Step 4: Continue with multiple items.
Step 5: Player with most round wins gets overall prize.',
  ARRAY['christmas', 'virtual', 'scavenger-hunt', 'fast-paced', 'active', 'online'],
  NULL
);

-- Game 21: Christmas Emoji Quiz
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-emoji-quiz',
  'Christmas Emoji Quiz',
  'A visual puzzle game where Christmas songs and movies are represented by emojis. Teams race to decode them all.',
  'Virtual Meeting',
  '5-40 people (teams of 2-4)',
  '15-20 minutes',
  'Medium',
  'Screen sharing capability, prepared emoji puzzles',
  E'Step 1: Prepare Christmas titles written as emoji sequences.
Step 2: Share screen showing emoji puzzles.
Step 3: Teams work together to decode titles.
Step 4: Set a time limit (10-15 minutes).
Step 5: Team with most correct answers wins.',
  ARRAY['christmas', 'virtual', 'puzzle', 'emoji', 'team-game', 'visual'],
  NULL
);

-- Game 22: The GIF Game (Holiday Edition)
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'the-gif-game-holiday-edition',
  'The GIF Game (Holiday Edition)',
  'A humor-based virtual game where players respond to Christmas statements with funny GIFs. Voting determines the funniest responses.',
  'Virtual Meeting',
  '5-30 people',
  '15-20 minutes',
  'Easy',
  'Video conferencing chat, access to GIF libraries',
  E'Step 1: Facilitator says a Christmas-related statement.
Step 2: Players find and post a funny GIF response in chat.
Step 3: Group votes for the funniest GIF.
Step 4: Winner gets a point.
Step 5: Player with most points at end wins.',
  ARRAY['christmas', 'virtual', 'humor', 'gif', 'creative', 'voting'],
  NULL
);

-- Game 23: Christmas Mini Quiz
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-mini-quiz',
  'Christmas Mini Quiz',
  'A short trivia quiz with multiple rounds testing Christmas knowledge. Perfect 10-15 minute opener for virtual events.',
  'Virtual Meeting',
  '5-100 people',
  '10-15 minutes',
  'Easy',
  'Quiz questions prepared in advance, screen sharing',
  E'Step 1: Prepare quiz with rounds (Famous People, Songs, General Knowledge).
Step 2: Share questions on screen.
Step 3: Players submit answers in chat or poll.
Step 4: Reveal answers after each round.
Step 5: Tally scores and announce winner.',
  ARRAY['christmas', 'virtual', 'trivia', 'quiz', 'knowledge', 'competitive'],
  NULL
);

-- Game 24: Christmas Show and Tell
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-show-and-tell',
  'Christmas Show and Tell',
  'A virtual public speaking exercise where participants present a Christmas item from their home for 1-2 minutes. Builds presentation skills.',
  'Virtual Meeting',
  '5-20 people',
  '20-40 minutes',
  'Easy',
  'Video conferencing, Christmas items from home',
  E'Step 1: Each player selects a Christmas item from their home.
Step 2: Players take turns presenting their item for 1-2 minutes.
Step 3: They can discuss its history, meaning, or materials.
Step 4: Allow Q&A after each presentation if time permits.
Step 5: Continue until everyone has presented.',
  ARRAY['christmas', 'virtual', 'presentation', 'show-and-tell', 'speaking', 'personal'],
  NULL
);

-- Game 25: Funny Family Christmas Card
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'funny-family-christmas-card',
  'Funny Family Christmas Card',
  'A virtual creative challenge where teams use digital whiteboards to create funny or awkward Christmas cards in 5 minutes.',
  'Virtual Meeting',
  '8-40 people (teams)',
  '15-20 minutes',
  'Easy',
  'Breakout rooms, virtual whiteboard feature',
  E'Step 1: Split into breakout rooms (teams of 3-5).
Step 2: Teams have 5 minutes to create a funny Christmas card on whiteboard.
Step 3: Bring everyone back to main room.
Step 4: Each team presents their creation.
Step 5: Vote for favorite card.',
  ARRAY['christmas', 'virtual', 'creative', 'drawing', 'team-game', 'humor'],
  NULL
);

-- Game 26: Never Have I Ever (Holiday Edition)
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'never-have-i-ever-holiday-edition',
  'Never Have I Ever (Holiday Edition)',
  'A revealing party game with Christmas-themed statements. Players raise hands if they''ve done the stated action, providing insight into personalities.',
  'Virtual Meeting',
  '5-30 people',
  '15-20 minutes',
  'Easy',
  'Video conferencing, list of Christmas statements',
  E'Step 1: One player gives a ''Never have I ever...'' Christmas statement.
Step 2: Players raise hands if they HAVE done it.
Step 3: Keep hands down if they haven''t.
Step 4: Optionally ask someone to share their story.
Step 5: Continue with different players giving statements.',
  ARRAY['christmas', 'virtual', 'get-to-know-you', 'revealing', 'interactive', 'questions'],
  NULL
);

-- Game 27: Festive Background
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'festive-background',
  'Festive Background',
  'A simple virtual icebreaker where participants choose backgrounds representing their dream Christmas destination and explain their choice.',
  'Virtual Meeting',
  '5-50 people',
  '10-15 minutes',
  'Easy',
  'Video conferencing with background feature, Christmas images',
  E'Step 1: Ask participants to upload a Christmas destination background.
Step 2: Give them a few minutes to find and set their image.
Step 3: Go around the group one by one.
Step 4: Each person explains why they chose their background.
Step 5: Encourage questions and discussion.',
  ARRAY['christmas', 'virtual', 'backgrounds', 'sharing', 'travel', 'simple'],
  NULL
);

-- Game 28: Pitch to Santa
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'pitch-to-santa',
  'Pitch to Santa',
  'A Shark Tank-style virtual game where players pitch new toy ideas to ''Santa''. Improves public speaking and debate skills with Christmas fun.',
  'Virtual Meeting',
  '5-20 people',
  '20-30 minutes',
  'Medium',
  'Video conferencing, prepared toy ideas',
  E'Step 1: Each player prepares a pitch for a new toy idea.
Step 2: Players present their ideas for 2-3 minutes each.
Step 3: Other players (as Santa''s elves) critique or ask questions.
Step 4: After all presentations, players vote for best idea.
Step 5: Idea with most votes wins.',
  ARRAY['christmas', 'virtual', 'presentation', 'creative', 'debate', 'pitch'],
  NULL
);

-- Game 29: Ornament Guess
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'ornament-guess',
  'Ornament Guess',
  'A simple arrival game where guests guess the total number of ornaments on a tree as they enter. Closest guess wins a prize.',
  'Social Event',
  'Any size',
  '5 minutes',
  'Easy',
  'Christmas tree with ornaments, paper and pens',
  E'Step 1: Count ornaments on your Christmas tree.
Step 2: Place paper and pens near entrance.
Step 3: Guests write their guess as they arrive.
Step 4: Collect all guesses.
Step 5: Announce winner with closest guess.',
  ARRAY['christmas', 'arrival-game', 'guessing', 'quick', 'easy-setup', 'passive'],
  NULL
);

-- Game 30: Holiday Bingo
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'holiday-bingo',
  'Holiday Bingo',
  'A mingling bingo game with Christmas-themed prompts like ''baked cookies this week'' or ''owns an ugly sweater''. Players find people who match each square.',
  'Social Event',
  '10-50 people',
  '15-20 minutes',
  'Easy',
  'Printed 5x5 bingo cards with Christmas prompts, pens',
  E'Step 1: Create bingo cards with Christmas activity prompts.
Step 2: Give each player a card and pen.
Step 3: Players mingle to find people matching each square.
Step 4: Matching person signs that square.
Step 5: First to get 5 in a row (bingo) wins.',
  ARRAY['christmas', 'bingo', 'mingling', 'networking', 'get-to-know-you', 'printable'],
  NULL
);

-- Game 31: Snowball Name Toss
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'snowball-name-toss',
  'Snowball Name Toss',
  'An active circle game where players toss crumpled paper ''snowballs'' while calling out names. Drop two snowballs and you''re out.',
  'Team Building',
  '8-20 people',
  '10-15 minutes',
  'Easy',
  'White paper crumpled into 10-15 snowballs',
  E'Step 1: Crumple white paper into snowballs.
Step 2: Form a circle.
Step 3: Toss snowballs while calling recipient''s name.
Step 4: Anyone who drops 2 snowballs is eliminated.
Step 5: Last player remaining wins.',
  ARRAY['christmas', 'active', 'names', 'circle-game', 'elimination', 'energizer'],
  NULL
);

-- Game 32: Emoji Carol Quiz
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'emoji-carol-quiz',
  'Emoji Carol Quiz',
  'A visual puzzle where Christmas carols are written as emoji sequences. Players race to decode them all.',
  'Social Event',
  '5-40 people',
  '10-15 minutes',
  'Medium',
  'Printed sheets with emoji carol puzzles',
  E'Step 1: Prepare carol titles as emoji sequences (e.g., ❄️👦🏻➡️⛄ = Frosty the Snowman).
Step 2: Give each player a puzzle sheet.
Step 3: Set a time limit (5-10 minutes).
Step 4: Players decode as many as possible.
Step 5: First to complete or most correct wins.',
  ARRAY['christmas', 'puzzle', 'emoji', 'carols', 'visual', 'printable'],
  NULL
);

-- Game 33: Share a Favorite Holiday Memory
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'share-a-favorite-holiday-memory',
  'Share a Favorite Holiday Memory',
  'A dinner table conversation game where participants answer Christmas-themed questions to share personal stories and memories. Perfect for seated events.',
  'Social Event',
  '4-20 people',
  '20-30 minutes',
  'Easy',
  'List of Christmas questions',
  E'Step 1: Prepare questions like ''What was your best Christmas gift as a child?''
Step 2: After dinner, go around the table.
Step 3: Each person picks and answers a question.
Step 4: Encourage follow-up questions and discussion.
Step 5: Continue until everyone has shared.',
  ARRAY['christmas', 'dinner-table', 'conversation', 'storytelling', 'seated', 'personal'],
  NULL
);

-- Game 34: Message Under a Plate
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'message-under-a-plate',
  'Message Under a Plate',
  'A dinner party game where guests try to naturally insert strange phrases into conversation without being caught. Adds humor to meals.',
  'Social Event',
  '6-20 people',
  'Throughout dinner (45-90 minutes)',
  'Medium',
  'Paper slips with phrases, plates',
  E'Step 1: Write unusual phrases on paper slips.
Step 2: Place one slip under each plate before guests sit.
Step 3: Guests read their phrase secretly.
Step 4: Try to insert phrase naturally into dinner conversation.
Step 5: If accused incorrectly, accuser is out; reveal successes at end.',
  ARRAY['christmas', 'dinner-table', 'conversation', 'stealth', 'humor', 'ongoing'],
  NULL
);

-- Game 35: Topics Tables
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'topics-tables',
  'Topics Tables',
  'A strategic seating arrangement where guests sit at tables matching their interests, ensuring shared conversation topics. Great for large dinner parties.',
  'Social Event',
  '20-100 people',
  'Throughout event',
  'Easy',
  'Table signs with interest topics',
  E'Step 1: Create tables labeled with interests (travel, cooking, pets, etc.).
Step 2: Guests choose which table matches their interests.
Step 3: Everyone at a table shares that common interest.
Step 4: Natural conversations flow from shared topics.
Step 5: Optionally rotate tables between courses.',
  ARRAY['christmas', 'seating', 'networking', 'interests', 'large-group', 'dinner-party'],
  NULL
);

-- Game 36: Two Truths and a Tinsel
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'two-truths-and-a-tinsel',
  'Two Truths and a Tinsel',
  'A festive twist on Two Truths and a Lie where players share two true holiday facts and one festive fib. Others guess the lie.',
  'Social Event',
  '6-20 people',
  '15-20 minutes',
  'Easy',
  'None required',
  E'Step 1: Go around the table or circle.
Step 2: Each person shares two true Christmas facts about themselves.
Step 3: They also share one Christmas-related lie.
Step 4: Others discuss and vote on which is the lie.
Step 5: Person reveals the truth and continues to next player.',
  ARRAY['christmas', 'guessing-game', 'get-to-know-you', 'table-game', 'conversation', 'classic'],
  NULL
);

-- Game 37: Around the World Traditions
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'around-the-world-traditions',
  'Around the World Traditions',
  'A cultural learning game where guests pick cards describing global holiday traditions and discuss whether they''d adopt them. Educational and conversational.',
  'Social Event',
  '6-30 people',
  '15-20 minutes',
  'Easy',
  'Tent cards with international Christmas traditions',
  E'Step 1: Prepare cards with traditions from different countries.
Step 2: Place cards on table or pass them around.
Step 3: Each person picks a card and reads the tradition.
Step 4: They share whether they''d adopt it and why.
Step 5: Encourage group discussion about cultural differences.',
  ARRAY['christmas', 'cultural', 'educational', 'conversation', 'table-game', 'discussion'],
  NULL
);

-- Game 38: Sticker Stalkers
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'sticker-stalkers',
  'Sticker Stalkers',
  'A party-long stealth game where players secretly place Christmas stickers on others. If caught, they take the sticker back plus one more.',
  'Social Event',
  '10-50 people',
  '30-60 minutes (ongoing)',
  'Easy',
  '10 Christmas stickers per player',
  E'Step 1: Give each player 10 Christmas stickers.
Step 2: Goal is to stick all stickers on different people without being caught.
Step 3: Only one sticker per person allowed.
Step 4: If caught, take sticker back plus one from that person.
Step 5: First to get rid of all original stickers wins.',
  ARRAY['christmas', 'stealth', 'ongoing', 'mingling', 'party-game', 'competitive'],
  NULL
);

-- Game 39: Guess the Gift by Sound
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'guess-the-gift-by-sound',
  'Guess the Gift by Sound',
  'A sensory guessing game where players shake wrapped boxes and identify contents by sound alone. Uses common items like beans, bells, or crayons.',
  'Social Event',
  '5-30 people',
  '10-15 minutes',
  'Easy',
  'Small objects wrapped in identical boxes (beans, bells, crayons, marshmallows, puzzle pieces)',
  E'Step 1: Wrap different small items in identical boxes.
Step 2: Players take turns shaking a box for 3 seconds.
Step 3: They guess what''s inside based on sound.
Step 4: Write down guesses.
Step 5: Reveal contents and award points for correct guesses.',
  ARRAY['christmas', 'sensory', 'guessing-game', 'sound', 'fun', 'gifts'],
  NULL
);

-- Game 40: Photo Booth Prompt Jar
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'photo-booth-prompt-jar',
  'Photo Booth Prompt Jar',
  'A mingling activity using a photo booth with prompt cards. Encourages group photos and interaction at the start of events.',
  'Social Event',
  '10-100 people',
  'Throughout event (ongoing)',
  'Easy',
  'Photo backdrop, camera or phone, jar with prompt cards',
  E'Step 1: Set up simple photo backdrop.
Step 2: Create prompt cards (''everyone who loves cocoa'', ''goofiest face'', ''reenact a carol lyric'').
Step 3: Place jar of prompts near photo area.
Step 4: Groups draw prompts and take photos.
Step 5: Share photos during or after event.',
  ARRAY['christmas', 'photo', 'mingling', 'creative', 'ongoing', 'social-media'],
  NULL
);

-- Game 41: Right and Left Gift Giving
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'right-and-left-gift-giving',
  'Right and Left Gift Giving',
  'A story-based gift passing game where participants pass gifts left or right based on words in a Christmas story. Gift you hold at the end is yours.',
  'Social Event',
  '8-40 people',
  '10-15 minutes',
  'Easy',
  'Wrapped gifts (one per person), Christmas story with ''left'' and ''right'' words',
  E'Step 1: Everyone sits in a circle with a wrapped gift.
Step 2: Read a Christmas story aloud.
Step 3: Every time ''left'' is said, pass gifts left.
Step 4: Every time ''right'' is said, pass gifts right.
Step 5: Gift you''re holding when story ends is yours to keep.',
  ARRAY['christmas', 'gift-exchange', 'circle-game', 'story', 'passing', 'fun'],
  NULL
);

-- Game 42: Dicey White Elephant
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'dicey-white-elephant',
  'Dicey White Elephant',
  'A dice-based gift exchange where rolls determine actions: take from center, steal, swap, unwrap, or wild card. Adds excitement to traditional exchanges.',
  'Social Event',
  '8-30 people',
  '20-30 minutes',
  'Easy',
  'Wrapped gifts in center, one die, timer',
  E'Step 1: Place wrapped gifts in center circle.
Step 2: Players sit in circle and take turns rolling die.
Step 3: Roll 1=take from center, 2=steal, 3=swap left, 4=swap right, 5=unwrap any gift, 6=wild card.
Step 4: Play continues for set time (10 minutes).
Step 5: Keep whatever gift you have when timer ends.',
  ARRAY['christmas', 'gift-exchange', 'dice-game', 'white-elephant', 'competitive', 'party-game'],
  NULL
);

-- Game 43: Speed Wrapping Relay
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'speed-wrapping-relay',
  'Speed Wrapping Relay',
  'A three-person relay where teams wrap, decorate, and transport a gift through an obstacle course. Tests coordination and speed.',
  'Team Building',
  '9-30 people (teams of 3)',
  '15-20 minutes',
  'Medium',
  'Gifts to wrap, wrapping paper, bows, tags, serving trays, simple obstacles',
  E'Step 1: Divide into teams of 3.
Step 2: Player 1 wraps the gift.
Step 3: Player 2 adds bow and gift tag.
Step 4: Player 3 carries gift on tray through obstacle path.
Step 5: Fastest team with intact wrapping wins.',
  ARRAY['christmas', 'relay', 'team-game', 'wrapping', 'competitive', 'active'],
  NULL
);

-- Game 44: Carol Code Breakers
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'carol-code-breakers',
  'Carol Code Breakers',
  'A puzzle-solving team game where teams decode trivia clues or rebus puzzles that reveal Christmas carol titles. Winners earn small prizes.',
  'Team Building',
  '8-40 people (teams)',
  '15-20 minutes',
  'Medium',
  'Printed clue sheets with 10 puzzles per team',
  E'Step 1: Create 10 trivia or rebus clues that decode to carol titles.
Step 2: Give each team a clue sheet.
Step 3: Teams work together to solve all clues.
Step 4: First team to solve all correctly wins.
Step 5: Award small prizes or advantages for next game.',
  ARRAY['christmas', 'puzzle', 'team-game', 'carols', 'trivia', 'problem-solving'],
  NULL
);

-- Game 45: Christmas Connection
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-connection',
  'Christmas Connection',
  'An interactive mingling game that uncovers Christmas preferences and experiences, connecting people with similar holiday traditions and tastes.',
  'Social Event',
  '10-50 people',
  '15-20 minutes',
  'Easy',
  'Question cards or list',
  E'Step 1: Prepare Christmas preference questions.
Step 2: Players mingle and ask each other questions.
Step 3: Find people with similar answers.
Step 4: Form small groups based on connections.
Step 5: Groups share why they have those preferences.',
  ARRAY['christmas', 'mingling', 'get-to-know-you', 'networking', 'preferences', 'interactive'],
  NULL
);

-- Game 46: Christmas Pick a Side
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-pick-a-side',
  'Christmas Pick a Side',
  'A preference-revealing game where participants physically move to sides of the room based on Christmas choices. Great for large and small groups.',
  'Social Event',
  '10-100 people',
  '10-15 minutes',
  'Easy',
  'List of either/or Christmas questions',
  E'Step 1: Designate two sides of the room.
Step 2: Ask either/or questions (''Elf or It''s a Wonderful Life?'').
Step 3: Participants move to the side matching their preference.
Step 4: Optionally ask a few people to explain their choice.
Step 5: Continue with multiple questions.',
  ARRAY['christmas', 'active', 'preferences', 'either-or', 'large-group', 'movement'],
  NULL
);

-- Game 47: Christmas Roll & Poll
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'christmas-roll-poll',
  'Christmas Roll & Poll',
  'A dice-based table game where players answer different Christmas questions based on their dice roll. Different every time you play.',
  'Social Event',
  '4-30 people (at tables)',
  '15-20 minutes',
  'Easy',
  'Dice, question sheets with 6 questions per number',
  E'Step 1: Create question sheet with 6 different questions (numbered 1-6).
Step 2: Players sit at tables with dice.
Step 3: Players take turns rolling die.
Step 4: Answer the question matching their roll number.
Step 5: Continue around table for set time or rounds.',
  ARRAY['christmas', 'dice-game', 'questions', 'table-game', 'conversation', 'seated'],
  NULL
);

-- Game 48: The Great Christmas Candy Pass
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'the-great-christmas-candy-pass',
  'The Great Christmas Candy Pass',
  'A popular candy-passing game where players answer questions to earn wrapped Christmas candies. Simple setup with just candy and questions.',
  'Social Event',
  '8-40 people',
  '15-20 minutes',
  'Easy',
  'Wrapped Christmas candies, question list',
  E'Step 1: Gather wrapped Christmas candies.
Step 2: Sit in circle or around tables.
Step 3: Ask Christmas questions to the group.
Step 4: First to answer correctly gets a candy.
Step 5: Continue until all candies are distributed.',
  ARRAY['christmas', 'candy', 'questions', 'competitive', 'rewards', 'popular'],
  NULL
);

-- Game 49: What's on ur phone? Christmas Version
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'whats-on-ur-phone-christmas-version',
  'What''s on ur phone? Christmas Version',
  'A modern scavenger hunt where participants search their phones for Christmas-related items like photos, apps, or messages. Can be played in teams.',
  'Social Event',
  '8-50 people',
  '10-15 minutes',
  'Easy',
  'Smartphones, checklist of Christmas items to find',
  E'Step 1: Create checklist of Christmas items (holiday photo, carol in playlist, etc.).
Step 2: Give everyone the checklist.
Step 3: Players search their phones for items.
Step 4: Award points for each item found.
Step 5: Highest score wins; can play individually or in teams.',
  ARRAY['christmas', 'phone', 'scavenger-hunt', 'modern', 'technology', 'competitive'],
  NULL
);

-- Game 50: Wrap It Up Game
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'wrap-it-up-game',
  'Wrap It Up Game',
  'A wrapping skills competition with a unique twist. Participants showcase their gift-wrapping abilities under time pressure or special conditions.',
  'Social Event',
  '6-30 people',
  '15-20 minutes',
  'Medium',
  'Boxes, wrapping paper, tape, ribbons, scissors',
  E'Step 1: Give each participant wrapping supplies and a box.
Step 2: Announce the twist (blindfolded, one hand, wearing mittens, etc.).
Step 3: Set timer for 5 minutes.
Step 4: Participants wrap their gift with the constraint.
Step 5: Judge based on neatness, creativity, and completion.',
  ARRAY['christmas', 'wrapping', 'competitive', 'creative', 'timed', 'skills'],
  NULL
);

-- Game 51: The Sticker Challenge
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'the-sticker-challenge',
  'The Sticker Challenge',
  'An energizing mingling game where players secretly stick Christmas stickers on others without being caught. Gets people moving and interacting.',
  'Social Event',
  '10-50 people',
  '15-30 minutes',
  'Easy',
  '10 stickers per player (Christmas-themed)',
  E'Step 1: Give each player a page with 10 stickers.
Step 2: Players must stick all stickers on others without being noticed.
Step 3: Cannot stick more than one sticker per person.
Step 4: If caught, take sticker back plus one from that person.
Step 5: First to stick all stickers wins.',
  ARRAY['christmas', 'active', 'mingling', 'stealth', 'energizer', 'party-game'],
  NULL
);

-- Game 52: Inflatable Beach Ball Questions
INSERT INTO games (id, slug, title, description, category, players, duration, difficulty, materials, steps, tags, image)
VALUES (
  gen_random_uuid(),
  'inflatable-beach-ball-questions',
  'Inflatable Beach Ball Questions',
  'An inclusive get-to-know-you game where players pass a beach ball and answer Christmas questions when they catch it. Great for introverts as it prevents interruptions.',
  'Team Building',
  '8-40 people',
  '15-20 minutes',
  'Easy',
  'Inflatable beach ball, list of Christmas questions',
  E'Step 1: Arrange group in a circle.
Step 2: Pass beach ball to a random player.
Step 3: When they catch it, facilitator asks a Christmas question.
Step 4: Player answers, then bounces ball to someone else.
Step 5: Continue for desired duration.',
  ARRAY['christmas', 'questions', 'circle-game', 'inclusive', 'get-to-know-you'],
  NULL
);

COMMIT;

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
