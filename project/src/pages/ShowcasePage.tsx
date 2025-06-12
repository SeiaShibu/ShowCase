import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProductStore } from '../store/productStore';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';

const ShowcasePage: React.FC = () => {
  const { featuredProducts, loading, error, fetchFeaturedProducts } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
    window.scrollTo(0, 0);
  }, [fetchFeaturedProducts]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center flex-col">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
            alt="Showcase hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Discover Our Featured Collection
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Explore our handpicked selection of premium products
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative aspect-w-16 aspect-h-9">
                  <img
                    src={product.images[0] || 'https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg'}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.numReviews} reviews)
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Clothing', 'Electronics', 'Accessories', 'Home'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <Link to={`/products?category=${category.toLowerCase()}`}>
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={`https://images.pexels.com/photos/${[5632402, 3945683, 1152077, 1457842][index]}/pexels-photo-${[5632402, 3945683, 1152077, 1457842][index]}.jpeg`}
                      alt={category}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">{category}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8 opacity-90">
              Explore our full collection and find your perfect match
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Products
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShowcasePage;