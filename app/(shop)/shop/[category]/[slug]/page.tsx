import Image from "next/image";
import { wpFetch } from "@/lib/wp";
import { mapProduct } from "@/lib/mappers/product";
import AddToCartButton from "@/components/product/AddToCartButton";
import { Metadata } from "next";

type Params = { category: string; slug: string };

async function getProductBySlug(slug: string) {
  const raw = await wpFetch<any[]>(`/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}&_embed`, 600);
  return raw?.[0] ? mapProduct(raw[0]) : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await getProductBySlug(params.slug);
  return { title: p?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return <div>Not found</div>;

  const img = product.images?.[0];

  return (
    <section>
      <h1>{product.name}</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        <div>
          {img ? <Image src={img.src} width={800} height={600} alt={img.name || product.name} /> : <div className="skeleton" />}
        </div>
        <div>
          <div dangerouslySetInnerHTML={{__html: product.price}} />
          {/* Placeholder for options UI — wire up to your product option logic */}
          <AddToCartButton productId={product.id} />
          <article style={{marginTop:16}} dangerouslySetInnerHTML={{__html: product.short_description || ""}} />
        </div>
      </div>
      <article style={{marginTop:24}} dangerouslySetInnerHTML={{__html: product.description || ""}} />
    </section>
  );
}
