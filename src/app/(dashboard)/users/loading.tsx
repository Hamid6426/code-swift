export default function Loading() {
  return (
    <div className="p-4 bg-background min-h-screen rounded-md">
      {/* Search Bar Skeleton */}
      <div className="mb-4 flex gap-2">
        <div className="h-10 w-full rounded-md bg-container animate-pulse border border-outline" />
        <div className="h-10 w-14 rounded-md bg-primary/30 animate-pulse shrink-0" />
      </div>

      {/* View Toggle / Controls Skeleton */}
      <div className="mb-6 flex justify-between items-center">
        <div className="h-8 w-32 bg-container animate-pulse rounded-md" />
        <div className="h-8 w-24 bg-container animate-pulse rounded-md" />
      </div>

      {/* Users Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-md border border-outline bg-surface flex flex-col gap-3"
          >
            <div className="h-5 w-3/4 bg-container animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-container animate-pulse rounded" />
            <div className="mt-2 h-3 w-1/3 bg-container animate-pulse rounded self-end" />
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center gap-2">
        <div className="h-9 w-9 bg-container animate-pulse rounded-md" />
        <div className="h-9 w-9 bg-container animate-pulse rounded-md" />
        <div className="h-9 w-9 bg-container animate-pulse rounded-md" />
      </div>
    </div>
  );
}
