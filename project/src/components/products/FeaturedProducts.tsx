import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProductStore } from '../../store/productStore';
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProducts: React.FC = () => {
  const { featuredProducts, loading, error, fetchFeaturedProducts } = useProductStore();
  
  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);
  
  if (loading) return <Spinner />;
  
  if (error) return <div className="text-center text-red-500">{error}</div>;
  
  if (featuredProducts.length === 0) {
    return null;
  }
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <Link 
            to="/products" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;