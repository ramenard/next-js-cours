import { SimilarProducts } from "@/app/components/SimilarProducts";

// Slot @similar — reçoit les mêmes params que le segment parent [slug]
export default async function SimilarSlot({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SimilarProducts slug={slug} />;
}
