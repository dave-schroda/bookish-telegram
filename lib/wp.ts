// lib/wp.ts
import { env } from "./env";

export async function wpFetch<T>(path: string, revalidate = 300): Promise<T> {
  const url = new URL(path, env.WP_URL);
  const headers = new Headers();

  if (url.pathname.startsWith("/wp-json/wc/v3")) {
    const key = process.env.WC_CONSUMER_KEY || "";
    const secret = process.env.WC_CONSUMER_SECRET || "";
    const token = (globalThis as any).Buffer
      ? Buffer.from(`${key}:${secret}`, "utf8").toString("base64")
      : btoa(`${key}:${secret}`);
    headers.set("Authorization", `Basic ${token}`);
  }

  const res = await fetch(url.toString(), { headers, next: { revalidate } });
  if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
  return res.json();
}
