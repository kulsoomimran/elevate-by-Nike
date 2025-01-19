import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import  client  from '@/sanity/lib/client';

interface RelatedProduct {
  _id: string;
  productName: string;
  price: number;
  slug: string;
  image: string;
}

interface RelatedProductsProps {
  category: string;
  currentSlug: string;
}

async function fetchRelatedProducts(category: string, currentSlug: string): Promise<RelatedProduct[]> {
  const relatedProducts: RelatedProduct[] = await client.fetch(
    `*[_type == "product" && category == $category && slug.current != $slug] {
      _id,
      productName,
      price,
      "slug": slug.current,
      "image": image.asset->url
    }`,
    { category, slug: currentSlug }
  );
  return relatedProducts;
}

const RelatedProducts: React.FC<RelatedProductsProps> = async ({ category, currentSlug }) => {
  const relatedProducts = await fetchRelatedProducts(category, currentSlug);

  // Return null if there are no related products
  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <div
            key={relatedProduct._id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/productDetails/${relatedProduct.slug}`}>
              <div className="relative">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.productName}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {relatedProduct.productName}
                </h3>
                <p className="text-blue-700 font-bold mt-2">${relatedProduct.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
