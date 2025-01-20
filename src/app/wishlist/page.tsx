'use client';

import { useState, useEffect } from 'react';

interface WishlistItem {
  id: string;
  productName: string;
  price: number;
  image: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(savedWishlist);
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    const updatedWishlist = [...wishlistItems, item];
    setWishlistItems(updatedWishlist);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">

        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-16 uppercase tracking-wide">
          Your Wishlist
        </h1>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center text-gray-500 font-medium">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="md:col-span-2 space-y-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id} 
                  className="flex items-center space-x-4 border p-4 rounded-lg"
                >

                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.productName}</h2>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  </div>

                  <button
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
