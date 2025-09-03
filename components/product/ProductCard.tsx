import Image from "next/image";
import Link from "next/link";
import { WooProduct } from "@/lib/types";

export default function ProductCard({ product }: { product: WooProduct }) {
  const img = product.images?.[0];
  // Build the canonical URL /shop/<first-category>/<slug>
  const cat = product.categories?.[0]?.slug || "all";
  const href = `/shop/${cat}/${product.slug}`;
  return (
    <div className="card">
      {img ? (
        <Image src={img.src} alt={img.name || product.name} width={400} height={300} />
      ) : (
        <div className="skeleton" />
      )}
      <h3 style={{margin:'8px 0'}}><Link href={href}>{product.name}</Link></h3>
      <div dangerouslySetInnerHTML={{__html: product.price}} />
    </div>
  );
}
