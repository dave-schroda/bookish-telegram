import { WooProduct } from "@/lib/types";

export function mapProduct(p: any): WooProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    permalink: p.permalink,
    price: p.price_html || p.price || "",
    images: (p.images || []).map((i: any) => ({ src: i.src, name: i.name })),
    categories: (p.categories || []).map((c: any) => ({ id: c.id, name: c.name, slug: c.slug })),
    description: p.description,
    short_description: p.short_description,
  };
}
