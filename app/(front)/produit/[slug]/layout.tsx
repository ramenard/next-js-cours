// Parallel Routes layout
// Next.js injecte automatiquement chaque @slot comme prop.
// Chaque slot a son propre loading.tsx → Suspense automatique indépendant.
export default function ProductLayout({
  children,
  similar,
  sponsored,
}: {
  children: React.ReactNode;
  similar: React.ReactNode;
  sponsored: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Slot principal : ProductDetail */}
      {children}

      {/* Slot @similar : SimilarProducts — loading indépendant */}
      {similar}

      {/* Slot @sponsored : SponsoredProducts — loading indépendant */}
      {sponsored}
    </div>
  );
}