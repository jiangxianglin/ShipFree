export default function GamesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section Skeleton */}
      <div className="mb-12">
        <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-6 animate-pulse" />
      </div>

      {/* Games Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden animate-pulse"
          >
            <div className="aspect-video bg-gray-200 dark:bg-gray-800" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mb-4" />
              <div className="flex gap-2 mb-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20" />
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20" />
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
