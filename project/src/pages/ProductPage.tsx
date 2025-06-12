import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import Spinner from '../components/ui/Spinner';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Clock, Truck } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  
  const { product, loading, error, fetchProductDetails } = useProductStore();
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
    window.scrollTo(0, 0);
  }, [fetchProductDetails, id]);

  const handleQtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        name: product.name,
        qty,
        image: product.images[0],
        price: product.price,
        countInStock: product.countInStock
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center flex-col">
        <p className="text-red-600 mb-4">{error || "Product not found"}</p>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Go Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-gray-500 hover:text-blue-600">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden h-80 sm:h-96 relative">
              <motion.img
                key={activeImage}
                src={product.images[activeImage] || 'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg'}
                alt={`${product.name} - view ${activeImage + 1}`}
                className="w-full h-full object-cover object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 ${
                      activeImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img || 'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg'}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-medium text-blue-600 uppercase">{product.brand}</span>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              
              <div className="flex items-center mt-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.numReviews} reviews)
                </span>
                <button 
                  onClick={() => setShowReviews(!showReviews)}
                  className="ml-4 text-blue-600 text-sm hover:underline"
                >
                  {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</h2>
              <span className={`inline-block mt-1 px-3 py-1 rounded text-sm font-medium ${
                product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="mb-6 border-t border-b border-gray-200 py-6">
              <div className="prose text-gray-600 max-w-none">
                <p>{product.description}</p>
              </div>
            </div>
            
            {/* Add to Cart Section */}
            <div className="mb-8">
              {product.countInStock > 0 && (
                <div className="flex items-center mb-4">
                  <label htmlFor="quantity" className="mr-4 text-gray-700 font-medium">
                    Quantity:
                  </label>
                  <select
                    id="quantity"
                    value={qty}
                    onChange={handleQtyChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className={`flex-1 py-3 px-6 flex items-center justify-center rounded-lg font-medium transition-colors ${
                    product.countInStock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                
                <button className="p-3 rounded-lg border border-gray-300 hover:border-red-500 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                  <Truck size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Free shipping on orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery within 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <AnimatePresence>
          {showReviews && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-16 overflow-hidden"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
              
              {product.reviews.length === 0 ? (
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              ) : (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductPage;