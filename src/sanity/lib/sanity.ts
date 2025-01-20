// lib/sanity.ts
import { createClient } from '@sanity/client';
import IProduct from '@/app/types/productTypes';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  useCdn: false,
  apiVersion: '2021-08-31',
});

export async function fetchProducts(): Promise<IProduct[]> {
  const query = `*[_type == "product"] {
    _id,
    productName,
    price,
    "slug": slug.current,
    inventory,
    category,
    description,
    colors,
    status,
    "image": image.asset->url
  }`;
  return await sanityClient.fetch(query);
}
