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

  // Fetch wishlist data from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(savedWishlist);
  }, []);

  // Function to add an item to the wishlist
  const addToWishlist = (item: WishlistItem) => {
    const updatedWishlist = [...wishlistItems, item];
    setWishlistItems(updatedWishlist);
    
    // Save to localStorage
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);

    // Update localStorage after removal
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
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
            {/* Product List */}
            <div className="md:col-span-2 space-y-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id} // Ensure each item has a unique key
                  className="flex items-center space-x-4 border p-4 rounded-lg"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.productName}</h2>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  </div>

                  {/* Remove Button */}
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
        
        {/* Example: Add New Item to Wishlist */}
        <div className="mt-10 text-center">
          <button
            onClick={() => addToWishlist({
              id: '123',
              productName: 'Sample Product',
              price: 99.99,
              image: 'https://via.placeholder.com/150'
            })}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Sample Product to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
