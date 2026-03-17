import products from '@/domains/catalog/data/products.json'
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  return (
    <div className="bg-black text-white flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 py-20 px-10">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}