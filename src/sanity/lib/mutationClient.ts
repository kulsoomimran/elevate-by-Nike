import { createClient } from '@sanity/client';

const mutationClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-08-31',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default mutationClient;
