import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-08-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiHost: 'https://api.sanity.io',
});

console.log('Testing Sanity connection...');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('Token exists:', !!process.env.SANITY_API_TOKEN);
console.log('Token length:', process.env.SANITY_API_TOKEN?.length);

// Test read permission
try {
  console.log('\n✓ Testing READ permission...');
  const products = await client.fetch('*[_type == "product"][0...1]');
  console.log('✓ READ permission: OK - Found', products.length, 'product(s)');
} catch (error) {
  console.error('✗ READ permission: FAILED', error.message);
}

// Test create permission
try {
  console.log('\n✓ Testing CREATE permission...');
  const testDoc = await client.create({
    _type: 'order',
    fullName: 'Test Order',
    email: 'test@test.com',
    phone: '1234567890',
    address: 'Test Address',
    city: 'Test City',
    zipCode: '12345',
    cartItems: [],
    totalPrice: 0,
    discountedPrice: 0,
    orderStatus: 'pending',
    orderDate: new Date().toISOString(),
  });
  console.log('✓ CREATE permission: OK - Created test order:', testDoc._id);
  
  // Clean up test order
  await client.delete(testDoc._id);
  console.log('✓ Cleaned up test order');
} catch (error) {
  console.error('✗ CREATE permission: FAILED');
  console.error('Error:', error.message);
  console.error('Status:', error.statusCode);
  console.error('Details:', error.details);
}
