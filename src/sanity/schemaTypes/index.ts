import { type SchemaTypeDefinition } from 'sanity'
import { allProducts } from './product'
import { customer } from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [allProducts,
    customer
  ],
}