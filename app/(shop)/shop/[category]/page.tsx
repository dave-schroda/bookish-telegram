import { wpFetch } from "@/lib/wp";
import { mapProduct } from "@/lib/mappers/product";
import ProductGrid from "@/components/category/ProductGrid";
import type { Metadata } from "next";

type Params = { category: string };

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { category } = await params;
  return { title: `${category} · Shop` };
}

export default async function CategoryPage(
  { params }: { params: Promise<Params> }
) {
  const { category } = await params;
  const raw = await wpFetch<any[]>(
    `/wp-json/wc/v3/products?category=${encodeURIComponent(category)}&per_page=24`,
    300
  );
  const products = raw.map(mapProduct);
  return (
    <section>
      <h1>Category: {category}</h1>
      <ProductGrid products={products} />
    </section>
  );
}
