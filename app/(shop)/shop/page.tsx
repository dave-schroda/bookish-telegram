// app/(shop)/shop/page.tsx
import Link from "next/link";
import { wpFetch } from "@/lib/wp";
import { mapCategory } from "@/lib/mappers/category";

/**
 * Rebuild this page at most every 5 minutes.
 * If Woo is briefly unavailable or 401s during build, we render an empty state
 * and ISR will repopulate it on the next request once creds are correct.
 */
export const revalidate = 300;

type WooCategoryRaw = {
  id: number;
  name: string;
  slug: string;
  // ...other fields we don't need here
};

export default async function ShopIndex() {
  let cats: Array<{ id: number; name: string; slug: string }> = [];

  try {
    // REST v3 (requires Basic Auth via wpFetch)
    const raw = await wpFetch<WooCategoryRaw[]>(
      "/wp-json/wc/v3/products/categories?per_page=100&orderby=name&order=asc",
      600
    );

    cats = (raw || [])
      .filter((c) => c.slug !== "uncategorized")
      .map(mapCategory);
  } catch (err) {
    // Fail-soft during prerender so builds don't break on 401/connection issues.
    // The next request after credentials are fixed will revalidate and fill this content.
    console.error("[/shop] Failed to fetch categories from Woo REST v3:", err);
    cats = [];
  }

  return (
    <section>
      <h1>Shop Categories</h1>

      {cats.length === 0 ? (
        <div className="card">
          <p>
            No categories to show yet. If you just added your Woo REST keys or
            updated permissions, this page will populate on the next request.
          </p>
        </div>
      ) : (
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 16,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {cats.map((c) => (
            <li key={c.id} className="card">
              <Link href={`/shop/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
