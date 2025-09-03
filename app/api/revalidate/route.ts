import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
  const { type, slug, category } = payload as { type?: string; slug?: string; category?: string };

  if (type === "product" && slug && category) revalidatePath(`/shop/${category}/${slug}`);
  if (type === "category" && category) revalidatePath(`/shop/${category}`);
  revalidatePath("/");
  return Response.json({ ok: true });
}
