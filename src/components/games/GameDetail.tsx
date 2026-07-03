import { CategoryBadge } from "./CategoryBadge";
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
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Description</h2>
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
              The Name Game is a simple icebreaker for learning names quickly. Each person repeats the names of everyone who went before them, then adds their own.
              It works well for new groups because it is structured, low-pressure, and gets everyone speaking early.
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

        {game.title === "Human Bingo" || game.title === "Chat Waterfall" ? (
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
              href="/games" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Browse All Ice Breaker Games
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
