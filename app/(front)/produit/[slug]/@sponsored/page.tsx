import { SponsoredProducts } from "@/app/components/SponsoredProducts";

// Slot @sponsored — pas besoin du slug, fetch tous les produits sponsorisés
export default function SponsoredSlot() {
  return <SponsoredProducts />;
}