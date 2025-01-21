'use client';

import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface WishlistButtonProps {
  product: {
    id: string;
    productName: string;
    price: number;
    image: string;
    inventory: number;
    category: string;
    description: string;
    colors: string[];
    status: string;
  };
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ product }) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (Array.isArray(wishlist)) {
        const productInWishlist = wishlist.find((item: { id: string }) => item.id === product.id);
        setIsInWishlist(!!productInWishlist);
      } else {
        localStorage.setItem('wishlist', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Error parsing wishlist from localStorage:', error);
      localStorage.setItem('wishlist', JSON.stringify([])); 
    }
  }, [product.id]);

  const toggleWishlist = () => {
    try {
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!Array.isArray(wishlist)) {
        wishlist = []; 
      }

      if (isInWishlist) {

        wishlist = wishlist.filter((item: { id: string }) => item.id !== product.id);
      } else {

        wishlist.push(product);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`p-2 rounded-full border-2 ${
        isInWishlist
          ? 'bg-red-100 border-red-500 text-red-500'
          : 'bg-gray-100 border-gray-300 text-gray-500'
      } hover:bg-red-500 hover:border-red-500 hover:text-white transition`}
      aria-label="Add to Wishlist"
    >
      {isInWishlist ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
    </button>
  );
};

export default WishlistButton;
