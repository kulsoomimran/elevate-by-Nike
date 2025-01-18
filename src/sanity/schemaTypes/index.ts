import { type SchemaTypeDefinition } from 'sanity'
import { allProducts } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [allProducts],
}
