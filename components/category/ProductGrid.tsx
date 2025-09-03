import ProductCard from "@/components/product/ProductCard";
import { WooProduct } from "@/lib/types";

export default function ProductGrid({ products }: { products: WooProduct[] }) {
  return (
    <div className="grid">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
