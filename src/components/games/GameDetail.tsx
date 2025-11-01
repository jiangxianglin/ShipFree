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
        {game.title === "Two Truths and a Lie" ? (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src="/img/Two-Truths-and-a-Lie.png"
              alt="Two Truths and a Lie | Ice Breaker Games"
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
          <p className="text-base leading-relaxed text-muted-foreground">
            This ice breaker game is perfect for {game.category.toLowerCase()} settings. 
            It helps participants feel comfortable, encourages interaction, and creates a positive atmosphere. 
            Whether you're working with a small group or a large team, this activity is designed to break down barriers and foster meaningful connections.
          </p>
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
        </div>

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

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Related Ice Breaker Games</h3>
          <p className="text-base text-muted-foreground mb-4">
            Looking for more activities? Explore our collection of {game.category.toLowerCase()} ice breaker games 
            to find the perfect fit for your next event, meeting, or gathering.
          </p>
          <a 
            href="/games" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Browse All Games
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
