import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-08-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, 
});

export default client;
