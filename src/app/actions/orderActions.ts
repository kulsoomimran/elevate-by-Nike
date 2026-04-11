'use server';

import { createClient } from '@sanity/client';

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

// Server-side validation
const validateOrderData = (data: OrderData): { valid: boolean; error?: string } => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email) || data.email.length > 254) {
        return { valid: false, error: 'Invalid email address' };
    }

    // Validate phone
    const phoneRegex = /^(03\d{9}|\+92\d{10})$/;
    if (!phoneRegex.test(data.phone)) {
        return { valid: false, error: 'Invalid phone number' };
    }

    // Validate names and addresses
    if (data.fullName.trim().length < 2 || data.fullName.length > 100) {
        return { valid: false, error: 'Invalid name' };
    }

    if (data.address.trim().length < 5 || data.address.length > 500) {
        return { valid: false, error: 'Invalid address' };
    }

    if (data.city.trim().length < 2 || data.city.length > 100) {
        return { valid: false, error: 'Invalid city' };
    }

    // Validate zip code
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(data.zipCode)) {
        return { valid: false, error: 'Invalid ZIP code' };
    }

    // Validate prices (must be positive)
    if (data.totalPrice < 0 || data.discountedPrice < 0) {
        return { valid: false, error: 'Invalid price' };
    }

    // Validate cart items
    if (!Array.isArray(data.cartItems) || data.cartItems.length === 0) {
        return { valid: false, error: 'Cart is empty' };
    }

    return { valid: true };
};

// Sanitize input to prevent XSS
const sanitizeString = (input: string): string => {
    return input
        .trim()
        .replace(/[<>]/g, '')
        .substring(0, 500);
};

export const createOrder = async (orderData: OrderData) => {
    try {
        // Validate input
        const validation = validateOrderData(orderData);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error || 'Invalid order data',
            };
        }

        // Sanitize inputs
        const sanitizedData = {
            ...orderData,
            fullName: sanitizeString(orderData.fullName),
            email: sanitizeString(orderData.email),
            phone: sanitizeString(orderData.phone),
            address: sanitizeString(orderData.address),
            city: sanitizeString(orderData.city),
            zipCode: sanitizeString(orderData.zipCode),
        };

        // Create Sanity client
        const client = createClient({
            projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
            dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
            apiVersion: '2024-01-01',
            token: process.env.SANITY_API_TOKEN,
            useCdn: false,
        });

        const sanityOrderData = {
            _type: 'order',
            fullName: sanitizedData.fullName,
            email: sanitizedData.email,
            phone: sanitizedData.phone,
            address: sanitizedData.address,
            city: sanitizedData.city,
            zipCode: sanitizedData.zipCode,
            cartItems: sanitizedData.cartItems.map(item => ({
                _type: 'reference',
                _ref: item.id,
            })),
            totalPrice: Number(sanitizedData.totalPrice),
            discountedPrice: Number(sanitizedData.discountedPrice),
            orderStatus: 'pending',
            orderDate: new Date().toISOString(),
        };

        const result = await client.create(sanityOrderData);
        
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
            console.log('✓ Order created:', result._id);
        }
        
        return { 
            success: true, 
            orderId: result._id,
        };
    } catch (error: any) {
        // Don't expose detailed errors to client
        if (process.env.NODE_ENV === 'development') {
            console.error('✗ Order creation failed:', error.message);
        }
        
        // Fallback to file storage
        try {
            const { writeFile, readFile } = await import('fs/promises');
            const { join } = await import('path');
            
            const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const orderRecord = {
                orderId,
                ...orderData,
                orderStatus: 'pending',
                orderDate: new Date().toISOString(),
            };

            const ordersFilePath = join(process.cwd(), 'orders.json');
            let existingOrders = [];
            try {
                existingOrders = JSON.parse(await readFile(ordersFilePath, 'utf-8'));
            } catch {
                existingOrders = [];
            }
            existingOrders.push(orderRecord);
            await writeFile(ordersFilePath, JSON.stringify(existingOrders, null, 2));
            
            return { 
                success: true, 
                orderId: orderId,
                warning: 'Order saved locally'
            };
        } catch (fileError) {
            return { 
                success: false, 
                error: 'Failed to process order',
            };
        }
    }
}
