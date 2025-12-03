# Data Collection Directory

This directory contains files for manually collecting ice breaker game data from online resources.

## Files

- **COLLECTION_GUIDE.md**: Comprehensive guide for collecting and formatting game data
- **game-template.json**: Template showing the structure for each game entry
- **raw-games-collection.json**: Main file where collected games are stored
- **README.md**: This file

## Current Status

✅ Data collection infrastructure created
⏳ Awaiting 8 URL resources to begin manual collection
⏳ Games to be collected and added to raw-games-collection.json

## Workflow

1. **Receive URLs**: Get the 8 online resources for ice breaker games
2. **Manual Collection**: Visit each URL and extract game information
3. **Format Data**: Use the template and guide to format each game
4. **Add to Collection**: Add formatted games to raw-games-collection.json
5. **Validation**: Run automated validation and duplicate detection
6. **Processing**: Generate slugs and prepare for database import

## Required Fields

Each game must include:
- ✅ title (required)
- ✅ description (required, min 20 chars)
- ✅ category (required, one of 6 options)
- ✅ tags (required, at least 1)
- ⚠️ players (optional but recommended)
- ⚠️ duration (optional but recommended)
- ⚠️ difficulty (optional)
- ⚠️ materials (optional)
- ⚠️ steps (optional but recommended)

## Next Steps

Once the URLs are provided and games are collected, the next task will be to create the data processing script that will:
- Validate all collected games
- Detect duplicates against existing 15 games
- Generate unique slugs
- Format for database import
