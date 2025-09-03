import Link from "next/link";
import { wpFetch } from "@/lib/wp";
import { mapCategory } from "@/lib/mappers/category";

export const revalidate = 600;

export default async function ShopIndex() {
  const raw = await wpFetch<any[]>('/wp-json/wc/v3/products/categories?per_page=100', 600);
  const cats = raw.map(mapCategory);
  return (
    <section>
      <h1>Shop Categories</h1>
      <ul style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16}}>
        {cats.map(c => (
          <li key={c.id} className="card">
            <Link href={`/shop/${c.slug}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
