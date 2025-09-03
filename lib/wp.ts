import { env } from "./env";

export async function wpFetch<T>(path: string, revalidate = 300): Promise<T> {
  const res = await fetch(`${env.WP_URL}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
  return res.json();
}

// WooCommerce Store API root
export const STORE_API = `${process.env.WP_URL}/wp-json/wc/store/v1`;
