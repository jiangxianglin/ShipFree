# Ice Breaker Games - Manual Data Collection Guide

## Overview
This guide provides instructions for manually collecting ice breaker game data from online resources and preparing it for import into the database.

## Required Fields

Each game MUST include the following fields:

### 1. **title** (Required)
- The name of the ice breaker game
- Should be clear and descriptive
- Example: "Two Truths and a Lie"

### 2. **description** (Required)
- A detailed explanation of what the game is about
- Minimum 20 characters
- Should explain the purpose and basic concept
- Example: "A classic ice breaker where each person shares three statements about themselves - two true and one false. The group tries to guess which statement is the lie."

### 3. **category** (Required)
- Must be one of these six categories:
  - **Team Building**: Activities focused on building team cohesion
  - **Virtual Meeting**: Games designed for online/remote settings
  - **Classroom**: Educational settings and student groups
  - **Training**: Professional development and workshop settings
  - **Conference**: Networking events and large gatherings
  - **Social Event**: Parties, casual gatherings, social occasions

### 4. **tags** (Required)
- Array of descriptive tags (at least 1 tag)
- Use lowercase with hyphens
- Examples: "getting-to-know-you", "no-prep", "virtual-friendly", "active", "creative"
- Common tag categories:
  - Setting: indoor, outdoor, virtual, hybrid
  - Preparation: no-prep, minimal-prep, requires-setup
  - Activity level: active, passive, energetic
  - Group size: small-group, large-group, pairs
  - Purpose: networking, team-bonding, creative-thinking

### 5. **players** (Optional but recommended)
- Number or range of participants
- Examples: "5-20 people", "10+ people", "Any size", "3-15 people"

### 6. **duration** (Optional but recommended)
- Time needed to complete the activity
- Examples: "10-15 minutes", "30-45 minutes", "1 hour", "20-30 minutes"

### 7. **difficulty** (Optional)
- Must be one of: "Easy", "Medium", "Hard"
- Easy: Simple rules, minimal preparation
- Medium: Some complexity or preparation needed
- Hard: Complex rules, significant preparation, or facilitation skills required

### 8. **materials** (Optional)
- List of items needed to run the activity
- Use "None required" if no materials are needed
- Examples: "Paper and pens", "Ball of yarn", "Bingo cards", "Video conferencing software"

### 9. **steps** (Optional but recommended)
- Step-by-step instructions for running the game
- Separate each step with a newline character (\n)
- Be clear and specific
- Example format:
  ```
  Step 1: Arrange participants in a circle
  Step 2: Explain the rules
  Step 3: Start with the first person
  Step 4: Continue around the circle
  Step 5: Conclude with a debrief
  ```

### 10. **source** (For tracking)
- The URL where you found this game
- Helps with verification and avoiding duplicates

## Data Collection Process

### Step 1: Review the Source
- Visit each of the 8 provided URLs
- Scan for ice breaker games and activities
- Look for games that aren't already in our database (check existing 15 games)

### Step 2: Extract Information
- For each game, collect all available information
- Copy the game title, description, and instructions
- Note the context (what type of event it's designed for)
- Identify appropriate tags based on the game characteristics

### Step 3: Format the Data
- Use the template in `game-template.json` as a guide
- Ensure all required fields are filled
- Map the game to one of the six categories
- Create descriptive tags (at least 1, ideally 3-5)
- Format steps with newline separators

### Step 4: Add to Collection File
- Open `raw-games-collection.json`
- Add your formatted game object to the "games" array
- Ensure valid JSON syntax (commas, quotes, brackets)
- Save the file

## Category Mapping Guidelines

Use these keywords to help determine the appropriate category:

- **Team Building**: team, collaboration, trust, bonding, workplace
- **Virtual Meeting**: online, remote, zoom, video call, digital
- **Classroom**: student, education, learning, teacher, school
- **Training**: workshop, professional, development, skills, corporate
- **Conference**: networking, event, large group, professional gathering
- **Social Event**: party, casual, fun, social, entertainment

## Quality Checklist

Before adding a game to the collection, verify:

- [ ] Title is clear and descriptive
- [ ] Description is at least 20 characters
- [ ] Category is one of the six valid options
- [ ] At least one tag is included
- [ ] Steps are clear and actionable (if provided)
- [ ] No obvious duplicates with existing 15 games
- [ ] JSON syntax is valid

## Example Entry

```json
{
  "title": "Speed Networking",
  "description": "Participants pair up for quick one-on-one conversations, then rotate to meet new people. Great for conferences and large networking events.",
  "category": "Conference",
  "players": "10-100 people",
  "duration": "30-45 minutes",
  "difficulty": "Medium",
  "materials": "Timer or bell, name tags",
  "steps": "Arrange chairs in two rows facing each other\nAssign participants to seats\nSet a timer for 3-5 minutes per conversation\nRing a bell when time is up\nThe rotating row moves one seat to the right\nRepeat until everyone has met\nOptionally provide conversation prompts",
  "tags": ["networking", "structured", "large-group", "professional"],
  "source": "https://example.com/networking-games"
}
```

## Tips for Efficient Collection

1. **Avoid Duplicates**: Check against the 15 existing games before adding
2. **Be Consistent**: Use similar formatting for similar types of information
3. **Quality over Quantity**: Better to have well-documented games than many incomplete ones
4. **Use Clear Language**: Write descriptions and steps in clear, simple English
5. **Think About Users**: Consider what information would be most helpful for someone trying to run this activity

## Next Steps

After manual collection is complete:
1. The data will be validated using the GameValidator
2. Duplicate detection will run to catch any similar games
3. Slugs will be generated automatically
4. The processed games will be added to the seed file

## Questions?

If you encounter games that don't fit neatly into the categories, or if you're unsure about how to format something, make a note in the game's description or add a comment in the JSON file for later review.
