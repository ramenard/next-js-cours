import products from '@/domains/catalog/data/products.json'
import {Product} from "@/components/ProductCard";
import ImageDetail from "@/components/ImageDetail";

export function getProductsBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export default async function ProductDetail(props: PageProps<"/detail/[slug]">) {
  const {slug} = await props.params;

  const product = getProductsBySlug(slug);

  if (!product) {
    return (
      <div>
        not found
      </div>
    )
  }

  return (
    <div className="flex justify-center pt-4">
      <div className="flex flex-row bg-gray-800 p-4 rounded-2xl gap-4">
        <ImageDetail product={product} />
        <div className="flex flex-col w-80 gap-2">
          {product.name}
          <div>
            {product.brand}
          </div>
          <div className="pt-4">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  )
}