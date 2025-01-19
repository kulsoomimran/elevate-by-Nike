'use client';

import { useState, useMemo } from 'react';
import SearchBar from '../components/searchbar';
import { createClient } from '@sanity/client';
import IProduct from '../types/productTypes';
import Link from 'next/link';
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
  
  export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
    // Fetch products initially
    useMemo(() => {
      const getProducts = async () => {
        try {
          const fetchedProducts = await fetchProducts();
          setProducts(fetchedProducts);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      };
      getProducts();
    }, []);
  
    const uniqueCategories: string[] = useMemo(() => {
      return Array.from(new Set(products.map((product) => product.category || ''))).filter(Boolean);
    }, [products]);
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
  
    const filteredProducts = useMemo(() => {
      return products.filter((product) => {
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
      });
    }, [products, searchQuery, selectedCategory]);
  
    return (
      <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12 uppercase tracking-wide">
            Our Premium Collection
          </h1>

          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-12">
            <SearchBar
              onSearch={handleSearch}
              categories={uniqueCategories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group relative border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Link
                  href={`/productDetails/${product.slug}`}
                  className="block p-4 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.productName}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
  
                  <div className="p-6">
                    <p
                      className={`text-sm font-semibold uppercase tracking-wide ${
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }