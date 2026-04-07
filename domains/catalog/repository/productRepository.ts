import type { Product } from "@/domains/catalog/entity/product";
import { findAllProducts, findProductBySlug as findProductBySlugInDb, findSimilarProducts as findSimilarProductsInDb } from "@/domains/catalog/data/productData";

// Simule une latence réseau pour démontrer le streaming avec Suspense
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(1000); // Simule 1s — ex: API produit distante
  return findProductBySlugInDb(slug);
}

export async function listProductsFromDb(): Promise<Product[]> {
  return getProducts();
}

export async function getSimilarProducts(slug: string): Promise<Product[]> {
  await delay(2000); // Simule 2s — ex: algorithme de recommandation lent
  return findSimilarProductsInDb(slug);
}
