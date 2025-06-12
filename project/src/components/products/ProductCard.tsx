import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      qty: 1,
      image: product.images[0],
      price: product.price,
      countInStock: product.countInStock
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative group">
        <Link to={`/product/${product._id}`} className="block">
          <img
            src={product.images[0] || 'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg'}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {/* Quick action buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-2">
          <motion.button
            className="bg-white rounded-full p-3 hover:bg-blue-600 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </motion.button>
          <motion.button
            className="bg-white rounded-full p-3 hover:bg-red-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </motion.button>
        </div>
        
        {/* Product badges */}
        {product.featured && (
          <div className="absolute top-2 left-2">
            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
        
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex items-center">
          <span className="text-yellow-400 flex items-center">
            <Star size={16} fill="currentColor" />
          </span>
          <span className="ml-1 text-sm text-gray-600">
            {product.rating} ({product.numReviews} reviews)
          </span>
        </div>
        
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mt-2 mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              product.countInStock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;