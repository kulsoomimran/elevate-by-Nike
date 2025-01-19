'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddtoCartButtonProps {
  product: {
    id: string;
    productName: string;
    price: number;
    image: string;
    quantity?: number;
  };
}

export default function AddtoCartButton({ product }: AddtoCartButtonProps) {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');

    if (cart[product.id]) {
      cart[product.id].quantity += 1;
    } else {
      cart[product.id] = {
        id: product.id,
        productName: product.productName,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show custom message
    setMessage(`${product.productName} has been added to your cart!`);
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Add to Cart
      </button>

      {message && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">{message}</p>
          <button
            onClick={() => router.push('/cart')}
            className="mt-2 text-blue-500 underline hover:text-blue-600"
          >
            View Your Cart
          </button>
        </div>
      )}
    </div>
  );
}
