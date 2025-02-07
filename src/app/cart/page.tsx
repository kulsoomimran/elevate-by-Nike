'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthGuard from '../components/AuthGuard';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    setCartItems(Array.isArray(savedCart) ? savedCart : []);
  }, []);

  const updateCartStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    updateCartStorage(updatedCart);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCartStorage(updatedCart);
  };

  const handleCheckout = () => {
    localStorage.setItem('cartForCheckout', JSON.stringify(cartItems));
    router.push('/CheckOut');
  };

  return (
    <AuthGuard>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-lg">
            <p className="text-gray-600 text-lg mb-4">Your cart is currently empty.</p>
            <button
              onClick={() => router.push('/Products')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 🛒 Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 bg-white shadow-md rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-700 leading-tight">
                      {item.productName}
                    </h2>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 mt-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-lg"
                      >
                        −
                      </button>
                      <span className="text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Cart Summary</h2>
              <p className="text-gray-600 text-md">
                Total Items: <span className="font-semibold">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
              </p>
              <p className="text-xl font-semibold text-gray-800 mt-3">
                Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </AuthGuard>
  );
}
