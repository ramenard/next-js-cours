// Loading state automatique du slot @sponsored
export default function SponsoredLoading() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="mb-6 h-7 w-56 rounded bg-amber-100 dark:bg-amber-900/30" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square rounded-2xl bg-amber-100 dark:bg-amber-900/20" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
}