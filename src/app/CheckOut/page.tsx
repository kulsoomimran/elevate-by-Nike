'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import client from '@/sanity/lib/client';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(03\d{9}|\+92\d{10})$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid Pakistani phone number';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Enter a valid 5-digit ZIP Code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartForCheckout') || '[]');
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountedPrice = discountApplied ? subtotal * 0.9 : subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyDiscount = () => {
    if (coupon === 'NIKE2021') {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
      Swal.fire({
        title: 'Invalid Coupon',
        text: 'The coupon code you entered is not valid.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const orderData = {
        _type: 'order',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        cartItems: cartItems.map(item => ({
          _type: 'reference',
          _ref: item.id,
        })),
        totalPrice: Number(subtotal),
        discountedPrice: Number(discountedPrice),
        orderStatus: 'pending',
        orderDate: new Date().toISOString(),
      };

      try {
        await client.create(orderData);
        localStorage.removeItem('cartForCheckout');

        Swal.fire({
          title: '🎉 Order Placed!',
          text: 'Your order has been placed successfully. You will receive a confirmation email shortly.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 5000,
        }).then(() => {
          setCartItems([]);
          setFormData({ fullName: '', email: '', phone: '', address: '', city: '', zipCode: '' });
        });
      } catch (error) {
        console.error('Error placing order:', error);
        Swal.fire({
          title: 'Oops!',
          text: 'There was an error while placing your order. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">🛒 Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 md:p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image src={item.image} alt={item.productName} width={64} height={64} className="rounded-lg object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm md:text-lg font-medium text-gray-800 leading-tight">{item.productName}</h3>
                      <p className="text-xs md:text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm md:text-lg font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">Your cart is empty.</p>
            )}

            <div className="mt-4 pt-2 border-t">
              {discountApplied ? (
                <div className="text-right">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Original Price: <span className="line-through text-gray-500">${subtotal.toFixed(2)}</span>
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Discounted Price: <span className="text-blue-600">${discountedPrice.toFixed(2)}</span>
                  </h3>
                </div>
              ) : (
                <h3 className="text-lg font-semibold text-gray-800 text-right">
                  Total: <span className="text-blue-600">${subtotal.toFixed(2)}</span>
                </h3>
              )}
            </div>


            <div className="mt-4">
              {!discountApplied ? (
                <>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={applyDiscount}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply Discount
                  </button>
                </>
              ) : (
                <p className="text-green-600 font-semibold text-center">✅ Discount Applied!</p>
              )}
            </div>

          </div>

          {cartItems.length > 0 ? (
            <div className="bg-gray-100 p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Billing Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {['fullName', 'email', 'phone', 'address', 'city', 'zipCode'].map((field) => (
                  <div key={field}>
                    <label className="block text-gray-700 font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder={`Enter your ${field}`}
                    />
                    {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Place Order
                </button>
              </form>
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">No items in cart, please add products before checkout.</p>
          )}
        </div>
      </div>
    </div>
  );
}
