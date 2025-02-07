'use client';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface CartItem {
  id: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
}

interface AddtoCartButtonProps {
  product: CartItem;
}

export default function AddtoCartButton({ product }: AddtoCartButtonProps) {
  const router = useRouter();

  const handleAddToCart = () => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

    if (!Array.isArray(cart)) {
      cart = [];
    }

    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // ✅ Show SweetAlert2 notification
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.productName} has been added to your cart.`,
      icon: "success",
      confirmButtonText: "View Cart",
      showCancelButton: true,
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/cart');
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
    >
      Add to Cart
    </button>
  );
}
