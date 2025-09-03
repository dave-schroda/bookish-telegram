import Link from "next/link";
import { wpFetch } from "@/lib/wp";
import { mapProduct } from "@/lib/mappers/product";
import ProductGrid from "@/components/category/ProductGrid";

export default async function HomePage() {
  // Example: latest products
  const raw = await wpFetch<any[]>('/wp-json/wc/v3/products?per_page=12', 300);
  const products = raw.map(mapProduct);
  return (
    <section>
      <h1>Welcome</h1>
      <p>Headless WooCommerce storefront using Next.js App Router.</p>
      <p><Link href="/shop">Browse all categories</Link></p>
      <ProductGrid products={products} />
    </section>
  );
}
