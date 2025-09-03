import { wpFetch } from "@/lib/wp";

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const products = await wpFetch<any[]>("/wp-json/wc/v3/products?per_page=100", 3600);
  const categories = await wpFetch<any[]>("/wp-json/wc/v3/products/categories?per_page=100", 3600);

  const productUrls = products.flatMap((p) => {
    const slug = p.slug;
    const firstCat = (p.categories?.[0]?.slug) || "all";
    return [{ url: `${base}/shop/${firstCat}/${slug}`, lastModified: p.date_modified || p.date_created }];
  });
  const categoryUrls = categories.map((c) => ({ url: `${base}/shop/${c.slug}`, lastModified: c.date_modified || c.date_created }));
  return [{ url: base, lastModified: new Date() }, ...productUrls, ...categoryUrls];
}
