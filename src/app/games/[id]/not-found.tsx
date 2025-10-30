import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold mb-4">Game Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the game you're looking for. It may have been
          removed or the link might be incorrect.
        </p>
        <Link
          href="/games"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Browse All Games
        </Link>
      </div>
    </div>
  );
}
