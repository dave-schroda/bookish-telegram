import { WooCategory } from "@/lib/types";
export function mapCategory(c: any): WooCategory {
  return { id: c.id, name: c.name, slug: c.slug };
}
