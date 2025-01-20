// hooks/useFilteredProducts.ts
import { useMemo, useState } from 'react';
import IProduct from '@/app/types/productTypes';

interface Filter {
  category: string | null;
  price: string | null;
  status: string | null;
}

export function useFilteredProducts(products: IProduct[], searchQuery: string, selectedCategory: string | null, selectedFilter: Filter) {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });

    if (selectedFilter.price === 'low-to-high') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilter.price === 'high-to-low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    if (selectedFilter.category) {
      filtered = filtered.filter((product) => product.category === selectedFilter.category);
    }

    if (selectedFilter.status) {
      filtered = filtered.filter((product) => product.status === selectedFilter.status);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, selectedFilter]);

  return filteredProducts;
}
