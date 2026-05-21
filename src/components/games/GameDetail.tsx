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
          ) : (
            <p className="text-base leading-relaxed text-muted-foreground">
              This ice breaker game is perfect for {game.category.toLowerCase()} settings. 
              It helps participants feel comfortable, encourages interaction, and creates a positive atmosphere. 
              Whether you're working with a small group or a large team, this activity is designed to break down barriers and foster meaningful connections.
            </p>
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
