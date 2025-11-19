import Link from "next/link";

export default function GameNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the ice breaker game you're looking for. It
          may have been removed or the link might be incorrect.
        </p>
        <Link
          href="/games"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to All Games
        </Link>
      </div>
    </div>
  );
}
