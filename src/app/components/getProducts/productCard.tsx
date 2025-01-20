import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IProduct from '@/app/types/productTypes';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product._id} className="group relative border border-gray-200 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/productDetails/${product.slug}`} className="block p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="relative w-full h-64 bg-gray-100 rounded-t-lg overflow-hidden">
          <Image src={product.image} alt={product.productName} layout="fill" objectFit="cover" className="rounded-t-lg group-hover:scale-105 transition-transform duration-300" />
        </div>

        <div className="p-6">
          <p className={`text-sm font-semibold uppercase tracking-wide ${product.status === 'Just In' ? 'text-green-600' : 'text-red-600'}`}>
            {product.status}
          </p>
          <h2 className="text-lg font-bold text-gray-800 mt-2 truncate">{product.productName}</h2>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          <p className="text-sm text-gray-400">{product.colors}</p>
          <p className="text-xl font-semibold text-gray-800 mt-4">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
