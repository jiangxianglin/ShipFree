export function EmptyState() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold mb-4">No Games Yet</h2>
        <p className="text-muted-foreground mb-6">
          The game library is currently empty. Check back soon for exciting ice
          breaker activities!
        </p>
      </div>
    </div>
  );
}
