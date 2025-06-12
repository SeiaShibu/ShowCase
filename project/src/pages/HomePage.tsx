import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import FeaturedProducts from '../components/products/FeaturedProducts';

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover the Latest Trends in Fashion & Technology
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Shop the most exciting products with unbeatable prices and quality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                to="/products" 
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold inline-flex items-center hover:bg-gray-100 transition-colors shadow-lg"
              >
                Shop Now
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose StyleHub?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md text-center"
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Latest Trends</h3>
              <p className="text-gray-600">
                Stay ahead with the newest styles and products, updated weekly for the fashion-forward shopper.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md text-center"
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your order delivered quickly with our express shipping options and real-time tracking.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-xl shadow-md text-center"
              {...fadeIn}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Shopping</h3>
              <p className="text-gray-600">
                Shop with confidence knowing your transactions and personal data are protected.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 opacity-80">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive offers, and seasonal discounts.
            </p>
            
            <form className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-l-md text-gray-800 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600 sm:rounded-r-none"
              />
              <button
                type="submit"
                className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-md transition-colors sm:rounded-l-none"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm mt-4 opacity-70">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;