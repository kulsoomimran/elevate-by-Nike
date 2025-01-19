import  client  from '@/sanity/lib/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import IProduct from '@/app/types/productTypes';
import AddtoCartButton from '@/app/components/button';
import WishlistButton from '@/app/components/wishlist';
import RelatedProducts from '@/app/components/relatedProduct'; 

interface ProductPageProps {
  params: Promise<{ slug: string }>; 
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; 

  const product: IProduct | null = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
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
    }`,
    { slug }
  );

  if (!product) {
    return notFound();
  }

  const formattedProduct = {
    id: product._id,
    productName: product.productName,
    price: product.price,
    image: product.image,
    inventory: product.inventory,
    category: product.category,
    description: product.description,
    colors: product.colors,
    status: product.status,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg overflow-hidden">

        <div className="relative bg-gray-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.productName}
              width={600}
              height={600}
              className="object-cover w-full h-full rounded-lg"
            />
          )}
        </div>

        <div className="p-8 flex flex-col justify-between">

          <div className="flex items-center justify-between mb-6">
            <span
              className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
                product.status === 'Just In'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {product.status}
            </span>
            <WishlistButton product={formattedProduct} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{product.productName}</h1>
            <p className="text-2xl text-blue-700 font-bold">${product.price}</p>
          </div>

          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-sm text-gray-600">{' '}
              <span className="inline-flex space-x-2">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="w-5 h-5 inline-block rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </span>
            </p>
          </div>

          {/* Add to Cart */}
          <div className="mt-10">
            <AddtoCartButton product={formattedProduct} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts category={product.category} currentSlug={slug} />
      </div>
    </div>
  );
}