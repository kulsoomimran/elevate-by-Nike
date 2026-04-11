import IProduct from "../types/productTypes"

export const addToCart = (product : IProduct) => {
    const cart : IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProductIndex = cart.findIndex(item => item._id === product._id)

    if(existingProductIndex > -1) {
        cart[existingProductIndex].inventory += 1
    }
    else {
        cart.push({
            ...product, inventory: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (productId : string) => {
    let cart : IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item._id !== productId)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateCartQuantity = (productId :string, quantity : number) => {
    const cart : IProduct[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if(productIndex > -1) {
        cart[productIndex].inventory = quantity;
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const getCartItems = () : IProduct[] => {
    return JSON.parse(localStorage.getItem('cart') || '[]')
}


interface OrderData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    cartItems: { id: string }[];
    totalPrice: number;
    discountedPrice: number;
}

export const createOrder = async (orderData: OrderData) => {
    try {
        const sanityOrderData = {
            _type: 'order',
            fullName: orderData.fullName,
            email: orderData.email,
            phone: orderData.phone,
            address: orderData.address,
            city: orderData.city,
            zipCode: orderData.zipCode,
            cartItems: orderData.cartItems.map(item => ({
                _type: 'reference',
                _ref: item.id,
            })),
            totalPrice: Number(orderData.totalPrice),
            discountedPrice: Number(orderData.discountedPrice),
            orderStatus: 'pending',
            orderDate: new Date().toISOString(),
        };

        const result = await client.create(sanityOrderData);
        return { success: true, orderId: result._id };
    } catch (error) {
        console.error('Error creating order:', error);
        return { success: false, error: 'Failed to create order' };
    }
}
