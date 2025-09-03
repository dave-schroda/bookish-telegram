import { wpFetch } from "@/lib/wp";
import { mapProduct } from "@/lib/mappers/product";
import ProductGrid from "@/components/category/ProductGrid";
import { Metadata } from "next";

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `${params.category} · Shop` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = params;
  const raw = await wpFetch<any[]>(`/wp-json/wc/v3/products?category=${encodeURIComponent(category)}&per_page=24`, 300);
  // If your Woo API requires category ID, you may need a lookup by slug → id.
  const products = raw.map(mapProduct);
  return (
    <section>
      <h1>Category: {category}</h1>
      <ProductGrid products={products} />
    </section>
  );
}
