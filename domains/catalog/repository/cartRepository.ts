import {Cart} from "@/generated/prisma";
import {addItemToCartInDB, getCartById} from "@/domains/catalog/data/cartData";

export async function getCart(cartId: string): Promise<Cart> {
  return getCartById(cartId);
}

export async function addItemToCart(itemSlug: string, cardId?: string): Promise<Cart> {
  return addItemToCartInDB(itemSlug);
}
