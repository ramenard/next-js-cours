"use server";

import { revalidateTag } from "next/cache";

export async function revalidateSponsoredAction() {
  // Invalide tous les fetch() taggués "sponsored"
  // → prochain rendu de SponsoredProducts refera le vrai appel réseau
  revalidateTag("sponsored", "");
}