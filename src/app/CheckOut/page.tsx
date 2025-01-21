'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Retrieve cart data stored in localStorage
    const cartForCheckout = localStorage.getItem('cartForCheckout');
    if (cartForCheckout) {
      setCartItems(JSON.parse(cartForCheckout));
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 text-center mb-12 uppercase tracking-wide">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 font-medium text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-12">
            <div className="text-lg font-semibold text-gray-800">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Your Items</h2>
              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center space-x-6 border p-5 rounded-lg bg-white shadow-lg transform transition-transform hover:scale-105 duration-200 ease-in-out"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-28 h-28 object-cover rounded-lg shadow-md"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-800">{item.productName}</h2>
                      <p className="text-sm text-gray-500 mt-1">Price: ${item.price}</p>
                      <p className="text-sm text-gray-400 mt-1">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border p-6 rounded-lg bg-white shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
              <p className="text-sm text-gray-500">
                Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800 mt-2">
                Total Price: $
                {cartItems
                  .reduce((total, item) => total + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
              <button className="mt-6 w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-200 transform hover:scale-105">
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
