export type WooImage = { src: string; name?: string };
export type WooCategory = { id: number; name: string; slug: string; };
export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  images: WooImage[];
  categories: WooCategory[];
  description?: string;
  short_description?: string;
};
