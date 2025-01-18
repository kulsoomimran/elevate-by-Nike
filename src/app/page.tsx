import { createClient } from '@sanity/client';
import IProduct from './types/productTypes';
import Image from 'next/image';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
  useCdn: false,
  apiVersion: '2021-08-31',
});

async function fetchProducts(): Promise<IProduct[]> {
  const query = `*[_type == "product"] {
    _id,
    productName,
    price,
    inventory,
    category,
    description,
    colors,
    status,
    "image": image.asset->url
  }`;
  return await sanityClient.fetch(query);
}

export default async function ProductsPage() {
  let products: IProduct[] = [];
  let error: string | null = null;

  try {
    products = await fetchProducts();
  } catch (err: any) {
    console.error('Error fetching products:', err.message);
    error = 'Failed to fetch products. Please try again later.';
  }

  if (error) {
    return <div className="text-red-500 font-bold text-center">{error}</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-16 uppercase tracking-wide">
          Our Premium Collection
        </h1>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id} 
              className="group relative border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.productName}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <p
                  className={`text-sm font-semibold ${
                    product.status === 'Just In' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.status}
                </p>
                <h2 className="text-lg font-bold text-gray-800 mt-2 truncate">
                  {product.productName}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                <p className="text-sm text-gray-400">{product.colors}</p>
                <p className="text-xl font-semibold text-gray-800 mt-4">${product.price}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="p-4 text-center">
                <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-950 transition duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
