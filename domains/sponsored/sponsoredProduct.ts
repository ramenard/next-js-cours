export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  currencyCode: string;
  imageUrl: string;
  imageAlt: string | null;
};

const MOCK_SHOP_ENDPOINT = "https://mock.shop/api";

const SPONSORED_QUERY = `
  query FeaturedCollection {
    collection(handle: "featured") {
      title
      products(first: 8) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function getSponsoredProducts(): Promise<SponsoredProduct[]> {
  const start = performance.now();

  const res = await fetch(MOCK_SHOP_ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({query: SPONSORED_QUERY}),
    // "force-cache"  → toujours servi depuis le cache (jamais de réseau)
    // "no-store"     → jamais mis en cache (toujours réseau)
    // next.revalidate → ISR : cache pendant N secondes, puis re-fetch en fond
    // next.tags      → permet revalidateTag("sponsored") pour invalider manuellement
    next: {revalidate: 3600, tags: ["sponsored"]},
  });

  if (!res.ok) throw new Error("Erreur lors du fetch mock.shop");

  const json = await res.json();
  const products = json.data?.collection?.products?.edges ?? [];

  return products.map(({node}: any) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    price: node.priceRange.minVariantPrice.amount,
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    imageUrl: node.images.edges[0]?.node.url ?? "",
    imageAlt: node.images.edges[0]?.node.altText ?? null,
  }));
}

const SPONSORED_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;

export async function getSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  const res = await fetch(MOCK_SHOP_ENDPOINT, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      query: SPONSORED_BY_HANDLE_QUERY,
      variables: {handle},
    }),
    next: {revalidate: 3600},
  });

  if (!res.ok) throw new Error("Erreur lors du fetch mock.shop");

  const json = await res.json();
  const node = json.data?.product;
  if (!node) return null;

  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    price: node.priceRange.minVariantPrice.amount,
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    imageUrl: node.images.edges[0]?.node.url ?? "",
    imageAlt: node.images.edges[0]?.node.altText ?? null,
  };
}