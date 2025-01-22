'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]); // Fixed: used CartItem instead of WishlistItem
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '{}');
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '{}');

    setCartItems(Object.values(savedCart) as CartItem[]);
    setWishlistItems(Object.values(savedWishlist) as CartItem[]); // Fixed: used CartItem instead of WishlistItem
  }, []);

  const updateLocalStorage = (key: string, items: CartItem[]) => {
    const newStorage = items.reduce((acc: Record<string, CartItem>, item) => { // Fixed: used Record<string, CartItem>
      acc[item.id] = item;
      return acc;
    }, {});
    localStorage.setItem(key, JSON.stringify(newStorage));
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, quantity: item.quantity + delta };
          return updatedItem.quantity > 0 ? updatedItem : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setCartItems(updatedCartItems);
    updateLocalStorage('cart', updatedCartItems);
  };

  const removeFromCart = (productId: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    updateLocalStorage('cart', updatedCartItems);
  };

  const handleCheckout = () => {
    localStorage.setItem('cartForCheckout', JSON.stringify(cartItems));
    router.push('/CheckOut');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-12 uppercase tracking-wide">
          Your Cart
        </h1>

        {cartItems.length === 0 && wishlistItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 font-medium mb-6">Your cart is empty.</p>
            <button
              onClick={() => router.push('/Products')}
              className="mt-4 py-2 px-6 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
            {cartItems.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart Items</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 border p-4 rounded-lg bg-white shadow"
                      >
                        <Image
                          src={item.image}
                          alt={item.productName}
                          className="w-24 h-24 object-cover rounded-lg"
                          width={96} 
                          height={96}
                        />
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold">{item.productName}</h2>
                          <p className="text-sm text-gray-500 mt-1">Price: ${item.price}</p>
                          <p className="text-sm text-gray-400 mt-1">Quantity: {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="bg-gray-200 text-gray-900 px-3 py-1 rounded-md hover:bg-gray-300"
                          >
                            -
                          </button>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="bg-gray-200 text-gray-900 px-3 py-1 rounded-md hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border p-6 rounded-lg bg-white shadow-md">
                    <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                    <p className="text-sm text-gray-500">
                      Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                      Total Price: $
                      {cartItems
                        .reduce((total, item) => total + item.price * item.quantity, 0)
                        .toFixed(2)}
                    </p>
                    <button
                      onClick={handleCheckout}
                      className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
