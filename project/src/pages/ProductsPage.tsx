import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/products/ProductCard';
import Spinner from '../components/ui/Spinner';
import { ChevronDown, FilterX } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductsPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const initialCategory = queryParams.get('category') || '';
  const initialBrand = queryParams.get('brand') || '';
  const initialSearch = queryParams.get('search') || '';
  
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [search, setSearch] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  
  const { products, loading, error, fetchProducts } = useProductStore();
  
  const categories = ['clothing', 'accessories', 'electronics', 'home'];
  const brands = ['nike', 'adidas', 'apple', 'samsung', 'zara', 'ikea'];
  
  useEffect(() => {
    // Apply filters from URL on initial load
    fetchProducts({ category: initialCategory, brand: initialBrand, search: initialSearch });
  }, [fetchProducts, initialCategory, initialBrand, initialSearch]);
  
  const handleFilter = () => {
    fetchProducts({ category, brand, search });
    setShowFilters(false);
  };
  
  const clearFilters = () => {
    setCategory('');
    setBrand('');
    setSearch('');
    fetchProducts({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Products</h1>
          {(category || brand || search) && (
            <div className="flex items-center text-gray-600">
              <span>Filtered by: </span>
              {category && (
                <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Category: {category}
                </span>
              )}
              {brand && (
                <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Brand: {brand}
                </span>
              )}
              {search && (
                <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Search: "{search}"
                </span>
              )}
              <button 
                onClick={clearFilters}
                className="ml-3 flex items-center text-red-600 hover:text-red-800"
              >
                <FilterX size={16} />
                <span className="ml-1">Clear</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="lg:flex">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 mr-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat}
                        onChange={() => setCategory(cat)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-600 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((b) => (
                    <label key={b} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        checked={brand === b}
                        onChange={() => setBrand(b)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-600 capitalize">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleFilter}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
              >
                Apply Filters
              </button>
              
              <button
                onClick={clearFilters}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
          
          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white shadow rounded-lg px-4 py-3 flex justify-between items-center"
            >
              <span className="font-medium text-gray-700">Filters</span>
              <ChevronDown size={20} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            {showFilters && (
              <div className="bg-white rounded-lg shadow-md p-6 mt-2">
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={category === cat}
                          onChange={() => setCategory(cat)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-600 capitalize">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3">Brands</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map((b) => (
                      <label key={b} className="flex items-center">
                        <input
                          type="radio"
                          name="brand"
                          checked={brand === b}
                          onChange={() => setBrand(b)}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-600 capitalize">{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleFilter}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                  >
                    Apply
                  </button>
                  
                  <button
                    onClick={clearFilters}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
                <button
                  onClick={() => fetchProducts({})}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try changing your filters or search term.</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;