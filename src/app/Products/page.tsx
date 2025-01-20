'use client'
import { useState, useMemo, useEffect } from 'react';
import SearchBar from '../components/searchbar';
import Dropdown from '../components/filter/filterDropdown';
import ProductsGrid from '../components/getProducts/productGrid';
import { fetchProducts } from '@/sanity/lib/sanity';
import IProduct from '../types/productTypes';
import { useFilteredProducts } from '../components/getProducts/filteredProducts';

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState({
    category: null,
    price: null,
    status: null,
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    getProducts();
  }, []);

  const uniqueCategories: string[] = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category || ''))).filter(Boolean);
  }, [products]);

  const uniqueStatuses: string[] = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.status || ''))).filter(Boolean);
  }, [products]);

  const filteredProducts = useFilteredProducts(products, searchQuery, selectedCategory, selectedFilter);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-12">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <SearchBar onSearch={setSearchQuery} />
        <Dropdown
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          uniqueCategories={uniqueCategories}
          uniqueStatuses={uniqueStatuses}
        />
      </div>
      <ProductsGrid products={filteredProducts} />
    </div>
  );
}