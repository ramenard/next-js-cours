// Loading state automatique pour le slot principal (children)
// Next.js enveloppe page.tsx dans un <Suspense> avec ce fallback
export default function ProductDetailLoading() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 animate-pulse">
      <div className="aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
      <div className="space-y-4">
        <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-10 w-1/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-12 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}