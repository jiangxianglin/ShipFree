import { CategoryBadge } from "./CategoryBadge";
import { GameActions } from "./GameActions";
import { TagBadge } from "./TagBadge";
import type { GameDetailProps } from "@/types/game";

export function GameDetail({ game }: GameDetailProps) {
  const materialsList = game.materials
    ? game.materials.split("\n").filter(Boolean)
    : [];
  const stepsList = game.steps ? game.steps.split("\n").filter(Boolean) : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <h1 className="text-4xl font-bold flex-1">{game.title}</h1>
          <CategoryBadge category={game.category} />
        </div>

        {/* Main image - use Two Truths and a Lie main image if available */}
        {game.title === "Find Your Match" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/find-your-match-hero.png"
              alt="Find Your Match | Ice Breaker Games - Diverse adults matching cards in a modern conference room for networking ice breaker activities"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Two Truths and a Lie" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/Two-Truths-and-a-Lie.png"
              alt="Two Truths and a Lie | Ice Breaker Games"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Human Bingo" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/Human-Bingo-Hero.png"
              alt="Human Bingo | Ice Breaker Games"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Speed Networking" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/SpeedNetworking-hero.jpg"
              alt="Speed Networking | Ice Breaker Games"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Virtual Background Story" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/VirtualBackgroundStory_Hero.jpg"
              alt="icebreakergames Virtual Background Story - Creative Video Conference Scenes"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Chat Waterfall" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/ChatWaterfall.png"
              alt="Chat Waterfall | Ice Breaker Games - Simultaneous chat waterfall effect in virtual meeting ice breaker"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Emoji Introduction" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/EmojiIntroduction-hero.png"
              alt="Emoji Introduction | Ice Breaker Games - Participants introduce themselves using creative emojis in virtual meeting ice breaker game"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.title === "Emoji Check-In" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/EmojiCheck-In-hero.png"
              alt="Emoji Check-In ice breaker game - Participants share mood using emojis in virtual meeting icebreaker"
              className="object-cover w-full h-full"
            />
          </div>
        ) : game.image ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src={game.image}
              alt={`${game.title} | Ice Breaker Games`}
              className="object-cover w-full h-full"
            />
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3 mb-6">
          {game.players && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-lg">👥</span>
              <span className="font-medium">{game.players}</span>
            </div>
          )}
          {game.duration && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-lg">⏱️</span>
              <span className="font-medium">{game.duration}</span>
            </div>
          )}
          {game.difficulty && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
              <span className="text-lg">📊</span>
              <span className="font-medium">{game.difficulty}</span>
            </div>
          )}
        </div>

        <GameActions
          title={game.title}
          players={game.players}
          duration={game.duration}
          materials={game.materials}
          steps={game.steps}
        />
      </div>

      <div className="space-y-8">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-2xl font-semibold mb-3">What is {game.title}?</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {game.description}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Why Play {game.title}?</h3>
          {game.title === "Find Your Match" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Find Your Match is one of the most engaging ice breaker games for social events and networking. 
              This pairing ice breaker game helps participants connect through fun interactions while learning about famous pairs and shared interests. 
              Find Your Match works perfectly as an ice breaker for parties, conferences, team building sessions, and social gatherings. 
              The game encourages movement, conversation, and makes name learning easy - ideal as an opening activity for any group event. 
              As an ice breaker game, Find Your Match is easy to set up, requires minimal materials, and guarantees everyone will have a great time getting to know each other.
            </p>
          ) : game.title === "Human Bingo" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Human Bingo is one of the most popular ice breaker games for social events and networking. 
              This engaging ice breaker game helps participants connect through fun interactions while learning interesting facts about each other. 
              Human Bingo works perfectly as an ice breaker game for parties, conferences, team building sessions, and social gatherings. 
              Whether you're hosting a small meetup or a large event, Human Bingo creates an energetic atmosphere that encourages mingling and conversation. 
              As an ice breaker game, Human Bingo is easy to set up, requires minimal materials, and guarantees everyone will have a great time getting to know each other.
            </p>
          ) : game.title === "Alliterative Name Game" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              The Alliterative Name Game (also called the Adjective Name Game) is a fast way to learn names and warm up a group.
              Each person pairs their name with a positive adjective that starts with the same letter, and the group repeats the growing list.
              It works especially well at the start of workshops, work meetings, and first-day-of-class sessions because it is structured, low-pressure, and surprisingly memorable.
            </p>
          ) : game.title === "One Word Check-In" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              One Word Check-In is a quick, low-pressure icebreaker for meetings and workshops. Each person shares one word to describe their
              mood, energy, or focus. It gets everyone speaking early, helps the facilitator read the room, and can be done in a few minutes
              without any materials.
            </p>
          ) : game.title === "Two Truths and a Lie" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Two Truths and a Lie is a classic get-to-know-you icebreaker. Each person shares three statements about themselves (two true, one false),
              and everyone guesses the lie. It works well for teams, classrooms, and workshops because it is simple, fun, and naturally creates follow-up conversation.
            </p>
          ) : game.title === "Minefield" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Minefield is a trust and communication team building game. One person walks through a simple obstacle course while blindfolded,
              guided only by a partner’s verbal instructions. It is especially effective when followed by a short debrief on clarity, assumptions, and trust.
            </p>
          ) : game.title === "The Name Game" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              The Name Game is a simple name game icebreaker for helping a new group learn names quickly. Each person repeats the names of everyone who went before them, then adds their own name with a short memory cue such as a role, adjective, or hobby.
              It works well for meetings, classrooms, and workshops because it is structured, low-pressure, and gets everyone speaking early without needing materials.
            </p>
          ) : game.title === "Emoji Introduction" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Emoji Introduction is a low-pressure emoji icebreaker where each person introduces themselves using two or three emojis instead of a long verbal introduction.
              It works especially well for virtual meetings, online classrooms, and hybrid teams because people can answer in chat first, then explain only as much as they feel comfortable sharing.
            </p>
          ) : game.title === "Emoji Check-In" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Emoji Check-In is a quick mood-sharing activity for meetings, classes, and remote teams. Participants choose one emoji to represent their energy, focus, or feeling right now.
              It helps the facilitator read the room in 3–5 minutes while giving quieter participants a safe, simple way to participate.
            </p>
          ) : game.title === "The Question Web" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              The Question Web is a get-to-know-you activity that uses a ball of yarn or string. As people ask and answer questions, the string forms a visible web,
              helping the group notice how connection builds through attention and curiosity.
            </p>
          ) : game.title === "Count Up" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Count Up is a deceptively simple teamwork game. The group tries to count upward together, but only one person can speak at a time. If two people speak
              at once, the group restarts. It quickly builds listening, patience, and shared coordination.
            </p>
          ) : game.title === "Dicebreakers" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Dicebreakers is a quick conversation starter where a simple die roll selects a prompt. It keeps things structured while still feeling natural,
              making it a great option for meetings, workshops, and classrooms when you want everyone talking within minutes.
            </p>
          ) : game.slug === "topics-tables" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Topics Tables is an easy way to spark conversation in groups that are already seated. Each table uses a small set of themed prompts, discusses for a few minutes,
              then optionally rotates tables or switches prompt cards to meet new people and explore new topics.
            </p>
          ) : game.slug === "unique-and-shared" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Unique and Shared is a low-pressure get-to-know activity where people identify one thing that is unique about themselves and one thing they share in common
              with a partner or small group. It balances belonging (shared) with individuality (unique), which helps rapport form quickly.
            </p>
          ) : game.title === "Common Ground" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Common Ground is a simple connection game where people try to find as many shared interests or experiences as possible in a short time.
              It is fast, low-pressure, and works well for new teams, classrooms, and workshops because it helps people notice similarity without forcing personal disclosure.
            </p>
          ) : game.title === "The Check-In" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              The Check-In is a quick meeting icebreaker where each person shares a short update using a single prompt (for example: one word, a color, or a weather report).
              It improves presence, alignment, and psychological safety, and it is easy to time-box for teams of any size.
            </p>
          ) : game.slug === "remote-change-3-things" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Remote Change 3 Things is a playful virtual icebreaker for observation and laughter. One person changes three small things off camera, returns, and the group tries to spot the changes.
              It is a great warm-up for remote meetings because everyone can participate by guessing in chat.
            </p>
          ) : game.slug === "ornament-guess" ? (
            <p className="text-base leading-relaxed text-muted-foreground">
              Ornament Guess is a light guessing game where someone shares an ornament (or any meaningful object) and gives a clue. The group guesses what it represents,
              then the person reveals the story. It is especially good for seasonal gatherings and team socials when you want quick, friendly conversation.
            </p>
          ) : (
            <p className="text-base leading-relaxed text-muted-foreground">
              This ice breaker game is perfect for {game.category.toLowerCase()} settings. 
              It helps participants feel comfortable, encourages interaction, and creates a positive atmosphere. 
              Whether you're working with a small group or a large team, this activity is designed to break down barriers and foster meaningful connections.
            </p>
          )}

          {game.title === "Alliterative Name Game" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Examples</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Brave Ben</li>
                <li>Curious Carlos</li>
                <li>Helpful Hannah</li>
                <li>Joyful Jordan</li>
                <li>Witty Will</li>
              </ul>
            </div>
          )}

          {game.title === "One Word Check-In" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>One word for your energy today</li>
                <li>One word for your focus right now</li>
                <li>One word for what you need from this meeting</li>
                <li>One word for your mood</li>
                <li>One word for your bandwidth</li>
              </ul>
            </div>
          )}

          {game.title === "Two Truths and a Lie" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Facilitator tips</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Keep statements safe for work and optional</li>
                <li>Limit questions to 1–2 per person to keep the pace</li>
                <li>Use breakout rooms for large groups</li>
                <li>Ask people to make the lie believable, not extreme</li>
              </ul>
            </div>
          )}

          {game.title === "Minefield" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Debrief questions</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>What instructions helped most?</li>
                <li>When did you feel the most trust?</li>
                <li>What assumptions showed up?</li>
                <li>How does this relate to communication at work?</li>
              </ul>
            </div>
          )}

          {game.title === "The Name Game" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Variations</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Name + role (for work meetings)</li>
                <li>Name + a gesture (for better memory)</li>
                <li>Split into small circles for large groups</li>
                <li>Virtual: type your name in chat as a backup</li>
              </ul>
            </div>
          )}

          {game.title === "The Question Web" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>What is one small win this week?</li>
                <li>What is a hobby you enjoy?</li>
                <li>What is something you want to learn this year?</li>
                <li>What is a value you care about?</li>
              </ul>
            </div>
          )}

          {game.title === "Count Up" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Debrief questions</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>What helped us succeed?</li>
                <li>What caused resets?</li>
                <li>How did we adapt as a group?</li>
                <li>How does this relate to coordination at work?</li>
              </ul>
            </div>
          )}

          {game.title === "Dicebreakers" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>A small win this week</li>
                <li>A hobby you enjoy</li>
                <li>A favorite snack</li>
                <li>Something you are learning</li>
                <li>A place you want to visit</li>
                <li>One thing you are grateful for</li>
              </ul>
            </div>
          )}

          {game.slug === "topics-tables" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">How to run it</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Place 6–10 prompts at each table</li>
                <li>Set a 5–8 minute timer per round</li>
                <li>Rotate tables or swap prompt cards between rounds</li>
                <li>Close with a quick share-out of favorite answers</li>
              </ul>
            </div>
          )}

          {game.slug === "unique-and-shared" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Facilitator tips</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Use safe categories (hobbies, food, routines, learning goals)</li>
                <li>Time-box the search to 2–4 minutes</li>
                <li>Encourage curiosity, not debate</li>
                <li>For large groups, rotate partners and keep share-outs short</li>
              </ul>
            </div>
          )}

          {game.title === "Common Ground" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Category ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Hobbies you enjoy</li>
                <li>Favorite foods or snacks</li>
                <li>Music or podcasts</li>
                <li>Morning routines</li>
                <li>Things you are learning</li>
                <li>Work preferences (focus time, communication style)</li>
              </ul>
            </div>
          )}

          {game.title === "The Check-In" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>One word for your energy</li>
                <li>A color for your mood</li>
                <li>Weather report (sunny, cloudy, stormy)</li>
                <li>A small win from this week</li>
                <li>One thing you need to be successful today</li>
              </ul>
            </div>
          )}

          {game.slug === "remote-change-3-things" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Good changes</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Swap glasses, hat, or headphones</li>
                <li>Move a mug or notebook</li>
                <li>Add or remove a background item</li>
                <li>Change lighting or camera angle slightly</li>
              </ul>
            </div>
          )}

          {game.slug === "ornament-guess" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Facilitator tips</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Frame it as “meaningful object guess” to keep it inclusive</li>
                <li>Keep clues short (one sentence) and time-box guesses</li>
                <li>Let people pass or share a neutral object if they prefer</li>
                <li>Use breakout rooms for large groups</li>
              </ul>
            </div>
          )}

          {game.title === "Virtual Background Story" && (
            <div className="flex justify-center my-6">
              <div className="relative overflow-hidden rounded-lg max-w-md w-full">
                <img
                  src="/img/VirtualBackgroundStory_Setup.jpg"
                  alt="icebreakergames Virtual Background Story - Team Building Activity Setup"
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          )}

          {game.title === "Icebreaker Bingo" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Facilitator tips</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Print more cards than you think you need — extra copies keep groups moving</li>
                <li>Announce the first bingo winner early to create energy, then let others finish the card</li>
                <li>Walk the room to help shy participants connect and keep the conversation going</li>
                <li>For mixed groups, use prompts that are broad enough for everyone to find matches</li>
              </ul>
            </div>
          )}

          {game.title === "Find Your Match" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">How to prepare pairs</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Prepare one card per person with a famous pair (peanut butter & jelly, Batman & Robin)</li>
                <li>Make sure there are enough pairs so everyone participates</li>
                <li>Consider themed pairs for conferences (product names, industry references)</li>
                <li>Have participants keep their card visible to make pairing faster</li>
              </ul>
            </div>
          )}

          {game.title === "Wheel of Fortune Introductions" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Biggest pet peeve</li>
                <li>Strangest thing you have eaten</li>
                <li>Favorite comfort food</li>
                <li>Most spontaneous thing you have done</li>
                <li>Hidden talent</li>
                <li>Dream travel destination</li>
              </ul>
            </div>
          )}

          {game.title === "Six Word Memoirs" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Writing prompts</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Six words about your day</li>
                <li>Six words about your team right now</li>
                <li>Six words about a goal you are working toward</li>
                <li>Six words about why you do what you do</li>
                <li>A humorous or surprising six-word life summary</li>
              </ul>
            </div>
          )}

          {game.title === "Where Do We Come From & What Is Famous?" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Tips for facilitators</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Use a world map or slide to visualize locations — it adds energy and engagement</li>
                <li>Encourage people to share something quirky or personal, not just obvious facts</li>
                <li>For diverse groups, acknowledge how different backgrounds enrich the team</li>
                <li>Keep each share to 30–60 seconds to maintain pace</li>
              </ul>
            </div>
          )}

          {game.title === "Never Have I Ever" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Never have I ever traveled solo</li>
                <li>Never have I ever cooked a meal for more than five people</li>
                <li>Never have I ever given a speech to 50+ people</li>
                <li>Never have I ever learned a new language</li>
                <li>Never have I ever worked remotely for more than a year</li>
              </ul>
            </div>
          )}

          {game.title === "This or That Questions" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Coffee or tea?</li>
                <li>Morning person or night owl?</li>
                <li>Books or movies?</li>
                <li>Mountain or beach?</li>
                <li>Sweet or savory?</li>
                <li>Indoor or outdoor?</li>
              </ul>
            </div>
          )}

          {game.title === "Would You Rather" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Question ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Would you rather be able to fly or be invisible?</li>
                <li>Would you rather never use social media again or never watch TV again?</li>
                <li>Would you rather travel to the past or the future?</li>
                <li>Would you rather have unlimited money or unlimited time?</li>
                <li>Would you rather be famous or anonymous but respected?</li>
              </ul>
            </div>
          )}

          {game.title === "Rock Paper Scissors Tournament" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Facilitator tips</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Use a visible bracket board — it builds excitement and keeps everyone informed</li>
                <li>Keep rounds fast (15–30 seconds) with a clear start signal</li>
                <li>Have losers form a cheering section for the next round — it keeps everyone engaged</li>
                <li>Use a drumroll or sound effect for dramatic moments</li>
              </ul>
            </div>
          )}

          {game.title === "Fantasy Vacation" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Share your dream destination and one thing you would do there</li>
                <li>Describe the most unusual place you have ever wanted to visit</li>
                <li>What is your ideal vacation activity — adventure or relaxation?</li>
                <li>If money was no object, where would you go?</li>
              </ul>
            </div>
          )}

          {game.title === "Mystery Envelope" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Envelope prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Tell the story of your first day at work</li>
                <li>Act out your morning routine without using your hands</li>
                <li>Share a quick win from this week</li>
                <li>Describe your ideal weekend in three words</li>
                <li>Show us a skill or trick you can do in 10 seconds</li>
              </ul>
            </div>
          )}

          {game.title === "Invention Pitch" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Pitch prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Invent an app that nobody needs but everyone would love</li>
                <li>Design a gadget that solves a first-world problem</li>
                <li>Create a new holiday and its signature activity</li>
                <li>Invent a new flavor of ice cream and its catchy name</li>
              </ul>
            </div>
          )}

          {game.title === "Scavenger Hunt" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Challenge ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Find something red and something blue</li>
                <li>Take a team photo doing jumping jacks</li>
                <li>Record a 10-second team cheer</li>
                <li>Find a business card from someone outside your team</li>
                <li>Create a paper airplane from office supplies</li>
              </ul>
            </div>
          )}

          {game.title === "Show and Tell" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Object ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>A gift from someone meaningful</li>
                <li>A souvenir from a meaningful trip</li>
                <li>A book that changed your perspective</li>
                <li>A hobby item you are proud of</li>
                <li>Something inherited from family</li>
              </ul>
            </div>
          )}

          {game.title === "Appreciation Circle" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Facilitator tips</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Model specific appreciation first — it sets the tone</li>
                <li>Set the expectation that everyone participates</li>
                <li>Allow people to pass if they genuinely have nothing</li>
                <li>Close with a moment of reflection or gratitude</li>
              </ul>
            </div>
          )}

          {game.title === "Line-Up" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Criterion ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Birth month (January = one end)</li>
                <li>Alphabetical by first name</li>
                <li>Years working in the industry</li>
                <li>How you take your coffee</li>
                <li>How you spent last weekend (staycation = one end, adventure = other)</li>
              </ul>
            </div>
          )}

          {game.title === "Take a Picture of Your Shoes" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Story prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Where have these shoes taken you?</li>
                <li>Why did you choose these shoes today?</li>
                <li>What is the most memorable place these shoes have been?</li>
                <li>Do these shoes say anything about your personality?</li>
              </ul>
            </div>
          )}

          {game.title === "Near and Far" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>How much do you enjoy public speaking?</li>
                <li>How connected do you feel to this team?</li>
                <li>How often do you work from home?</li>
                <li>How much do you enjoy planning vs. improvising?</li>
                <li>How optimistic are you about the future?</li>
              </ul>
            </div>
          )}

          {game.title === "Desert Island Scenario" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Item ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>A guitar for entertainment</li>
                <li>A satellite phone for emergencies</li>
                <li>A good knife for survival and crafting</li>
                <li>A year's supply of coffee</li>
                <li>Photography equipment</li>
              </ul>
            </div>
          )}

          {game.title === "Guess Who (Personal Trivia)" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Fact ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Has traveled to 10+ countries</li>
                <li>Once met a celebrity</li>
                <li>Plays a musical instrument</li>
                <li>Volunteers on weekends</li>
                <li>Has a hidden talent</li>
              </ul>
            </div>
          )}

          {game.title === "Team Trivia" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Category ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>General knowledge (history, science, geography)</li>
                <li>Pop culture (movies, music, TV shows)</li>
                <li>Company or industry trivia</li>
                <li>World facts and geography</li>
                <li>Fun and surprising facts</li>
              </ul>
            </div>
          )}

          {game.title === "Hot Takes" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Hot take ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Pineapple belongs on pizza</li>
                <li>The best season is autumn</li>
                <li>Mondays are actually great</li>
                <li>Email is better than Slack for complex decisions</li>
                <li>The best team lunch is pizza</li>
              </ul>
            </div>
          )}

          {game.title === "Online Charades" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Making coffee in the morning</li>
                <li>Working from home</li>
                <li>A team meeting on Zoom</li>
                <li>Sending a tricky email</li>
                <li>Taking a coffee break</li>
              </ul>
            </div>
          )}

          {game.title === "Mingle Bingo" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Prompt ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Has traveled abroad</li>
                <li>Speaks two languages</li>
                <li>Enjoys cooking</li>
                <li>Has a pet</li>
                <li>Prefers morning coffee</li>
              </ul>
            </div>
          )}

          {game.title === "What's Missing" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Item ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>A colorful pen</li>
                <li>A printed photo</li>
                <li>A coffee mug</li>
                <li>A sticky note with a word</li>
                <li>A small toy or figurine</li>
              </ul>
            </div>
          )}

          {game.title === "Storytelling Circle" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Opening line ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Once upon a time, in a very unusual office...</li>
                <li>A mysterious package arrived at the office that nobody expected...</li>
                <li>The team discovered a hidden room behind the printer...</li>
                <li>On the first day back in the office, something strange happened...</li>
              </ul>
            </div>
          )}

          {game.title === "Word Association" && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">Starting word ideas</h4>
              <ul className="list-disc list-inside space-y-1 text-base text-muted-foreground">
                <li>Summer</li>
                <li>Coffee</li>
                <li>Monday</li>
                <li>Success</li>
                <li>Creativity</li>
              </ul>
            </div>
          )}

          {game.title === "Speed Networking" && (
            <div className="flex justify-center my-6">
              <div className="relative overflow-hidden rounded-lg max-w-md w-full">
                <img
                  src="/img/SpeedNetworking-Setup.jpg"
                  alt="Speed Networking | Ice Breaker Games - Setup"
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          )}

          {game.title === "Emoji Introduction" && (
            <div className="flex justify-center my-6">
              <div className="relative overflow-hidden rounded-lg max-w-2xl w-full">
                <img
                  src="/img/EmojiIntroduction-GameplayScene.png"
                  alt="Emoji Introduction | Ice Breaker Games - Gameplay Scene"
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>

        {materialsList.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Materials Needed</h2>
            <ul className="list-disc list-inside space-y-2">
              {materialsList.map((material, index) => (
                <li key={index} className="text-lg text-muted-foreground">
                  {material}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Materials image for Human Bingo */}
        {game.title === "Human Bingo" && (
          <div className="flex justify-center my-4">
            <div className="relative overflow-hidden rounded-lg max-w-sm w-full shadow-sm">
              <img
                src="/img/Human-Bingo-Materis.png"
                alt="Human Bingo | Ice Breaker Games - Materials Needed"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* First scene image for Two Truths and a Lie */}
        {game.title === "Two Truths and a Lie" && (
          <div className="flex justify-center my-6">
            <div className="relative overflow-hidden rounded-lg max-w-md w-full">
              <img
                src="/img/Two-Truths-and-a-Lie1.png"
                alt="Two Truths and a Lie | Ice Breaker Games - Group Playing Together"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        )}

        {stepsList.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">How to Play</h2>
            <ol className="list-decimal list-inside space-y-3">
              {stepsList.map((step, index) => (
                <li
                  key={index}
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        <GameActions
          title={game.title}
          players={game.players}
          duration={game.duration}
          materials={game.materials}
          steps={game.steps}
        />

        {(game.title === "Emoji Introduction" || game.title === "Emoji Check-In") && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-3">Best Variations</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">For meetings</h3>
                <p className="text-sm text-muted-foreground">Ask for one emoji for energy, one for focus, and one word about what people need from the meeting.</p>
              </div>
              <div>
                <h3 className="font-semibold">For students</h3>
                <p className="text-sm text-muted-foreground">Use three safe prompts: mood today, favorite activity, and one thing they are curious about.</p>
              </div>
              <div>
                <h3 className="font-semibold">For remote teams</h3>
                <p className="text-sm text-muted-foreground">Have everyone post at the same time in chat, then invite only volunteers to explain their emoji choices.</p>
              </div>
              <div>
                <h3 className="font-semibold">For large groups</h3>
                <p className="text-sm text-muted-foreground">Keep it to one emoji per person and discuss patterns instead of asking everyone to explain individually.</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
              <h3 className="font-semibold">Facilitator script</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Pick one to three emojis that show how you are arriving today. You can explain your choices in one sentence, or simply share the emojis and pass.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              See more options in our <a href="/emoji-icebreaker-games" className="font-medium text-blue-600 hover:underline dark:text-blue-400">emoji icebreaker games guide</a>.
            </p>
          </div>
        )}

        {game.title === "Emoji Introduction" && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-3">Emoji Introduction Examples</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-2xl">☕📚🚲</p>
                <p className="mt-2 text-sm text-muted-foreground">Coffee, learning, and cycling are part of my week.</p>
              </div>
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-2xl">🎧🌱💡</p>
                <p className="mt-2 text-sm text-muted-foreground">I like music, gardening, and new ideas.</p>
              </div>
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-2xl">🐶🍕✈️</p>
                <p className="mt-2 text-sm text-muted-foreground">My dog, pizza, and travel tell you a lot about me.</p>
              </div>
            </div>
          </div>
        )}

        {game.title === "Emoji Check-In" && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-3">Emoji Check-In Prompts</h2>
            <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
              <li>Choose one emoji for your energy right now.</li>
              <li>Choose one emoji for your focus today.</li>
              <li>Choose one emoji for what you need from this meeting.</li>
              <li>Choose one emoji for how your week is going.</li>
              <li>Choose one emoji for the kind of support that would help you participate.</li>
            </ul>
          </div>
        )}

        {game.title === "The Name Game" && (
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-3">Variations for Different Groups</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">For classrooms</h3>
                <p className="text-sm text-muted-foreground">Pair each name with a favorite subject, hobby, or simple adjective so students have a memory hook.</p>
              </div>
              <div>
                <h3 className="font-semibold">For work meetings</h3>
                <p className="text-sm text-muted-foreground">Use name, role, and one current project. This keeps the activity professional and useful.</p>
              </div>
              <div>
                <h3 className="font-semibold">For large groups</h3>
                <p className="text-sm text-muted-foreground">Split into circles of 6–10 people instead of one long round, then invite a few names to be shared back.</p>
              </div>
              <div>
                <h3 className="font-semibold">For shy groups</h3>
                <p className="text-sm text-muted-foreground">Let people read from visible name tags and avoid turning forgotten names into a test.</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
              <h3 className="font-semibold">Facilitator script</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We are going to learn names in a simple chain. Say your name and one short memory cue. Each person will repeat the names before them, then add their own. It is okay to ask for help; this is practice, not a test.
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Compare more options in our <a href="/name-game-icebreakers" className="font-medium text-blue-600 hover:underline dark:text-blue-400">name game icebreakers guide</a>.
            </p>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-3">Tips for Success</h3>
          <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
            <li>Create a welcoming and inclusive environment where everyone feels comfortable participating</li>
            <li>Clearly explain the rules and objectives before starting the activity</li>
            <li>Be flexible and adapt the game based on your group's energy and engagement levels</li>
            <li>Encourage participation but respect those who prefer to observe</li>
            <li>Follow up with a brief reflection or discussion to reinforce connections made during the game</li>
          </ul>

          {game.title === "Virtual Background Story" && (
            <div className="flex justify-center my-6">
              <div className="relative overflow-hidden rounded-lg max-w-md w-full">
                <img
                  src="/img/VirtualBackgroundStory_Interaction.jpg"
                  alt="icebreakergames Virtual Background Story - Engaging Group Interaction"
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          )}

          {game.title === "Speed Networking" && (
            <div className="flex justify-center my-6">
              <div className="relative overflow-hidden rounded-lg max-w-md w-full">
                <img
                  src="/img/SpeedNetworking-Interaction.jpg"
                  alt="Speed Networking | Ice Breaker Games - Interaction"
                  className="object-contain w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>

        {/* Scene image for Human Bingo */}
        {game.title === "Human Bingo" && (
          <div className="flex justify-center my-4">
            <div className="relative overflow-hidden rounded-lg max-w-sm w-full shadow-sm">
              <img
                src="/img/Human-Bingo-Scene.png"
                alt="Human Bingo | Ice Breaker Games - Playing Scene"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Second scene image for Two Truths and a Lie */}
        {game.title === "Two Truths and a Lie" && (
          <div className="flex justify-center my-6">
            <div className="relative overflow-hidden rounded-lg max-w-md w-full">
              <img
                src="/img/Two-Truths-and-a-Lie2.png"
                alt="Two Truths and a Lie | Ice Breaker Games - Example Statements"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Content image for Find Your Match */}
        {game.title === "Find Your Match" && (
          <div className="flex justify-center my-6">
            <div className="relative overflow-hidden rounded-lg max-w-md w-full">
              <img
                src="/img/find-your-match-pairs.png"
                alt="Find Your Match | Ice Breaker Games - Participants showing matching cards and laughing together during ice breaker activity"
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        )}

        {game.tags.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </div>
        )}

        {game.title === "Emoji Introduction" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-2">
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  How do you play Emoji Introduction?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  Participants think of 3-5 emojis that represent themselves. Each person then posts their emojis in the chat or shares their screen. The group tries to guess what each emoji represents, and the person explains the meaning behind their choices. This continues until everyone has shared.
                </p>
              </details>
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  How many people can play Emoji Introduction?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  Emoji Introduction works best with 5-30 people. For smaller groups of 5-10, everyone can share and discuss each person&apos;s emojis in detail. For larger groups of 10-30, you may want to limit sharing time or use breakout rooms to keep the activity moving.
                </p>
              </details>
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  What materials do you need for Emoji Introduction?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  You need a chat function in your video conferencing tool or a shared digital space where participants can post their emojis. If playing in person, you can use paper and markers for participants to write or draw their emojis. That&apos;s it - no special materials required!
                </p>
              </details>
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  How long does Emoji Introduction take?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  Emoji Introduction typically takes 10-15 minutes, depending on group size. With a small group of 5-8 people, you can spend 1-2 minutes on each person for a total of 10-15 minutes. Larger groups may need to move faster, keeping introductions to 30-60 seconds each.
                </p>
              </details>
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  What are good emojis to use for self-introduction?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  Choose emojis that represent your hobbies, interests, or personality. For example: 🏋️ for fitness lovers, 📚 for readers, 🎮 for gamers, 🍕 for foodies, 🐕 for pet owners, ✈️ for travelers. Try to pick emojis that spark conversation and reveal something meaningful about you.
                </p>
              </details>
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  Can Emoji Introduction be used in classroom settings?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  Absolutely! Emoji Introduction is perfect for online classrooms, virtual training sessions, and hybrid learning environments. It&apos;s especially great for getting students comfortable with each other at the start of a new semester or course. Teachers can also use it as a fun way to check understanding of concepts.
                </p>
              </details>
              <details className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                  What tips make Emoji Introduction more engaging?
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                  First, create a welcoming environment where everyone feels comfortable participating. Give participants time to think about their emoji choices before sharing. Encourage creative emoji combinations rather than obvious ones. Allow discussion after each reveal. And follow up with a brief reflection to reinforce the connections made during the game.
                </p>
              </details>
            </div>
          </div>
        )}

        {game.title === "Emoji Check-In" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                ["What is an Emoji Check-In icebreaker?", "Emoji Check-In is a quick mood-sharing activity where each participant uses one or more emojis to show how they feel, then optionally adds a short explanation."],
                ["How long should Emoji Check-In take?", "Most groups can run it in 3–5 minutes. For larger groups, ask everyone to post one emoji and discuss only the overall pattern."],
                ["Is Emoji Check-In good for meetings?", "Yes. It gives facilitators a fast read on energy and helps everyone participate before the main agenda starts."],
                ["Can Emoji Check-In work in classrooms?", "Yes. Use simple, safe prompts such as mood, energy, or one thing students are looking forward to, and always allow a text alternative."],
                ["What are good Emoji Check-In prompts?", "Try: choose one emoji for your energy, one emoji for your focus, or one emoji for what you need from today&apos;s session."],
              ].map(([question, answer]) => (
                <details key={question} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                    {question}
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {game.title === "The Name Game" && (
          <div>
            <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {[
                ["How do you play The Name Game icebreaker?", "Each person says their name, the next person repeats previous names, then adds their own. You can add a simple prompt such as role, hobby, adjective, or motion."],
                ["How many people can play The Name Game?", "It works best with 6–20 people. For larger groups, split into smaller circles so the memory challenge stays supportive."],
                ["Is The Name Game good for students?", "Yes. It helps students learn names quickly, especially when paired with a light prompt or movement that makes names easier to remember."],
                ["How do you make The Name Game less awkward?", "Use visible name tags, model the first turn, allow help immediately, and avoid making forgotten names feel like failure."],
                ["What are good Name Game variations?", "Try adjective names, motion names, role-and-project introductions, or small-group rounds for large classes and workshops."],
              ].map(([question, answer]) => (
                <details key={question} className="group border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <summary className="flex items-center justify-between cursor-pointer text-base font-medium">
                    {question}
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {game.title === "Human Bingo" && (
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Benefits of Human Bingo as an Ice Breaker Game</h3>
            <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
              <li>Human Bingo encourages natural conversation and networking among participants</li>
              <li>This ice breaker game works well for groups of any size, from 10 to 100+ people</li>
              <li>Human Bingo helps shy participants feel more comfortable approaching others</li>
              <li>As an ice breaker game, Human Bingo creates a fun, competitive atmosphere</li>
              <li>Human Bingo can be customized to fit any theme or group demographic</li>
            </ul>
          </div>
        )}

        {game.title === "Find Your Match" && (
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Benefits of Find Your Match as an Ice Breaker Game</h3>
            <ul className="list-disc list-inside space-y-2 text-base text-muted-foreground">
              <li>Find Your Match encourages natural conversation and movement among participants</li>
              <li>This ice breaker game is perfect for groups of 10-50 people, ideal for networking events</li>
              <li>Find Your Match helps participants learn names quickly through active interaction</li>
              <li>As an ice breaker game, Find Your Match creates a fun, memorable experience for first meetings</li>
              <li>Find Your Match works well with diverse groups, making it easy for everyone to participate equally</li>
              <li>The famous pairs theme adds a playful element that reduces social anxiety and awkwardness</li>
            </ul>
          </div>
        )}

        {game.title === "Human Knot" ? (
          <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">More Games Like the Human Knot</h3>
            <p className="text-base text-muted-foreground mb-4">
              Want physical or problem-solving alternatives to Human Knot? Compare team challenges with the same collaboration energy and safer non-contact options.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <a href="/games-like-the-human-knot" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="font-medium text-gray-900 dark:text-gray-100">Games like the Human Knot</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">12 team-building alternatives with rules</div>
              </a>
              <a href="/icebreaker-games-for-youth-group" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                <div className="font-medium text-gray-900 dark:text-gray-100">Youth group icebreakers</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Age-appropriate physical and social games</div>
              </a>
            </div>
            <a
              href="/games-like-the-human-knot"
              className="inline-flex items-center text-teal-700 dark:text-teal-400 font-medium hover:underline"
            >
              Browse all games like the Human Knot
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ) : game.title === "Human Bingo" || game.title === "Chat Waterfall" ? (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              {game.title === "Human Bingo" 
                ? "More Ice Breaker Games Like Human Bingo" 
                : "Virtual Ice Breaker Games Like Chat Waterfall"}
            </h3>
            <p className="text-base text-muted-foreground mb-4">
              {game.title === "Human Bingo" 
                ? "If you enjoyed Human Bingo, explore our collection of other engaging ice breaker games perfect for social events, networking, and team building. Find more ice breaker games that create memorable experiences."
                : "Chat Waterfall works great with other virtual ice breaker games. Try these interactive activities for your next online meeting or team event!"}
            </p>
            {game.title === "Human Bingo" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <a href="/games-like-human-bingo" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Games like Human Bingo</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">12 networking alternatives with rules and comparisons</div>
                </a>
                <a href="/games/icebreaker-bingo" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Icebreaker Bingo</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Themed bingo cards for workshops and events</div>
                </a>
                <a href="/games/find-your-match" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Find Your Match</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Faster pairing mixer with famous pairs</div>
                </a>
                <a href="/icebreaker-games-for-youth-group" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Youth group icebreakers</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Age-appropriate games for youth nights</div>
                </a>
              </div>
            )}
            {game.title === "Chat Waterfall" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <a href="/games/speed-networking" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Speed Networking</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fast-paced networking for virtual meetings</div>
                </a>
                <a href="/games/virtual-background-story" className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Virtual Background Story</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Creative ice breaker for video calls</div>
                </a>
              </div>
            )}
            <a 
              href={game.title === "Human Bingo" ? "/games-like-human-bingo" : "/games"} 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {game.title === "Human Bingo" ? "Browse all games like Human Bingo" : "Browse All Ice Breaker Games"}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ) : (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Related Ice Breaker Games</h3>
            <p className="text-base text-muted-foreground mb-4">
              Looking for more activities? Explore our collection of {game.category.toLowerCase()} ice breaker games to find the perfect fit for your next event, meeting, or gathering.
            </p>
            <a 
              href="/games" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Browse All Ice Breaker Games
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
