import { getCartWithItems, getOrCreateCart, addProductToCart, type CartWithItems } from "@/domains/catalog/data/cartData";

export async function getCart(cartId: string): Promise<CartWithItems | null> {
  return getCartWithItems(cartId);
}

export async function addItemToCart(productSlug: string, cartId?: string): Promise<CartWithItems> {
  const cart = await getOrCreateCart(cartId);
  return addProductToCart(cart.id, productSlug);
}